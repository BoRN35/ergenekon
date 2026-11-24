#!/usr/bin/env python3
"""Tripo GLB -> oyun sprite'ı (şeffaf PNG). Yalnız numpy + Pillow; GPU/three gerekmez.
Kullanım: python3 -I scripts/glb-sprite.py model.glb cikti.png [yaw=0] [egim=25] [genislik=1400] [ornek=5]
  yaw: modelin etrafında dönüş (0/90/180/270 dene, ön yüzü seç). egim: kameranın aşağı bakış açısı (oyun 25°).
Sonra kırp/küçült: Pillow ile im.crop(im.getbbox()).resize(...).save('x.webp', quality=88, method=6).
68 MB / 2M üçgenlik modelde ~30 sn sürer. Tekrar eden şerit örneği: yamac_duvar.webp (25 Kasım)."""
import json, struct, sys, io
import numpy as np
from PIL import Image

def load(path):
    f = open(path, 'rb').read(); off = 12; ch = []
    while off < len(f):
        l, t = struct.unpack('<II', f[off:off + 8]); ch.append(f[off + 8:off + 8 + l]); off += 8 + l
    j = json.loads(ch[0]); B = ch[1]
    CT = {5126: np.float32, 5125: np.uint32, 5123: np.uint16, 5121: np.uint8}; NC = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4}
    def acc(i):
        a = j['accessors'][i]; bv = j['bufferViews'][a['bufferView']]
        o = bv.get('byteOffset', 0) + a.get('byteOffset', 0); dt = np.dtype(CT[a['componentType']]); n = NC[a['type']]
        st = bv.get('byteStride', 0)
        if st and st != dt.itemsize * n:
            raw = np.frombuffer(B, np.uint8, count=st * a['count'], offset=o).reshape(a['count'], st)[:, :dt.itemsize * n]
            return np.ascontiguousarray(raw).view(dt).reshape(a['count'], n)
        return np.frombuffer(B, dt, count=a['count'] * n, offset=o).reshape(a['count'], n)
    p = j['meshes'][0]['primitives'][0]
    mat = j['materials'][p.get('material', 0)]
    ti = mat['pbrMetallicRoughness']['baseColorTexture']['index']; im = j['images'][j['textures'][ti]['source']]
    bv = j['bufferViews'][im['bufferView']]; o = bv.get('byteOffset', 0)
    tex = np.asarray(Image.open(io.BytesIO(B[o:o + bv['byteLength']])).convert('RGB'))
    return (acc(p['attributes']['POSITION']).astype(np.float64), acc(p['attributes']['NORMAL']).astype(np.float64),
            acc(p['attributes']['TEXCOORD_0']), acc(p['indices']).reshape(-1, 3).astype(np.int64), tex)

def render(P, N, UV, I, tex, yaw=0, pitch=25, W=1400, k=5):
    yaw, pitch = np.radians(yaw), np.radians(pitch); c, s = np.cos(pitch), np.sin(pitch)
    f = np.array([-np.cos(yaw) * c, -s, -np.sin(yaw) * c]); r = np.cross(f, [0, 1, 0]); r /= np.linalg.norm(r); u = np.cross(r, f)
    sx, sy, sz = P @ r, P @ u, P @ f; x0, x1, y0, y1 = sx.min(), sx.max(), sy.min(), sy.max()
    sc = (W - 1) / (x1 - x0); H = int((y1 - y0) * sc) + 2; T = tex.shape[0] - 1
    bs = np.array([(a / k, b / k, 1 - a / k - b / k) for a in range(k + 1) for b in range(k + 1 - a)])
    zb = np.full(H * W, np.inf); col = np.zeros((H * W, 3), np.float32)
    L = -0.55 * r + 0.75 * u - 0.45 * f; L /= np.linalg.norm(L)  # ışık sol üstten
    for st in range(0, len(I), 200000):
        t = I[st:st + 200000]
        for w0, w1, w2 in bs:
            mix = lambda a: w0 * a[t[:, 0]] + w1 * a[t[:, 1]] + w2 * a[t[:, 2]]
            X = (mix(sx) - x0) * sc; Y = (y1 - mix(sy)) * sc; Z = mix(sz); uv = mix(UV); nn = mix(N)
            pix = np.clip(Y.astype(np.int64), 0, H - 1) * W + np.clip(X.astype(np.int64), 0, W - 1)
            cc = tex[np.clip((uv[:, 1] % 1) * T, 0, T).astype(int), np.clip((uv[:, 0] % 1) * T, 0, T).astype(int)].astype(np.float32)
            cc *= (0.62 + 0.5 * np.clip((nn / np.linalg.norm(nn, axis=1, keepdims=True)) @ L, 0, 1))[:, None]
            o = np.lexsort((-Z, pix)); ps, zs, cs = pix[o], Z[o], cc[o]; last = np.r_[ps[1:] != ps[:-1], True]
            pp, zz, cl = ps[last], zs[last], cs[last]; b = zz < zb[pp]; zb[pp[b]] = zz[b]; col[pp[b]] = cl[b]
    img = np.zeros((H, W, 4), np.uint8); img[..., :3] = np.clip(col.reshape(H, W, 3), 0, 255); img[..., 3] = np.isfinite(zb.reshape(H, W)) * 255
    return Image.fromarray(img)

if __name__ == '__main__':
    a = sys.argv; P, N, UV, I, tex = load(a[1])
    im = render(P, N, UV, I, tex, *(float(x) for x in a[3:5]), *(int(x) for x in a[5:7]))
    im.crop(im.getbbox()).save(a[2]); print(a[2], im.size, 'üçgen', len(I))
