"""Whiteout Survival Wiki yapı tablolarını (data/wos/buildings.json) Ergenekon yapılarına birebir aktarır.

Kullanıcı kararı (26 Kasım 2026, "A"): Ocak ve diğer yapıların bedel, süre ve ön koşulları wiki'den birebir.
- Ocak 1–30 = Furnace 1–30; Ocak 31–40 = Fire Crystal 1–10. Wiki'de her Kor seviyesine 4 ara aşama + ana aşama
  ile çıkılır (30-1..30-4, FC 1, FC 1-1.. FC 2 ...). Bunlar 80 satır olarak korunur, oyun ara aşamaları seviye içinde sayar.
- Wiki'nin vermediği seviyeler (ör. Barricade 10'dan sonrası) mevcut Ergenekon eğrisinin büyüme oranıyla sürdürülür
  ve satırda x:1 ile işaretlenir.
Çıktı: public/wos-buildings-data.js  (root.WOS_BUILDINGS)
Kullanım: python3 -I scripts/wos-buildings.py
"""
import json, re, subprocess, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
pages = {p['url'].rstrip('/').rsplit('/', 1)[-1]: p for p in json.loads((ROOT / 'data/wos/buildings.json').read_text())['pages']}
ICONS = {'item_icon_100011': 'et', 'item_icon_102': 'et', 'item_icon_103': 'odun', 'item_icon_104': 'komur', 'item_icon_105': 'demir',
         'item_icon_106': 'celik', 'item_icon_100083': 'kristalParcasi', 'item_icon_100082': 'aritilmisKristal', 'item_icon_100081': 'kristal'}
NAMES = [('Furnace', 'ocak'), ('Embassy', 'oba'), ('Research Center', 'bilgelik'), ('Infantry Camp', 'kisla'), ('Marksman Camp', 'kisla'),
         ('Lancer Camp', 'kisla'), ('Infirmary', 'sifa'), ('Command Center', 'gozcu'), ('Storehouse', 'ambar'), ('Barricade', 'sur'),
         ('Shelter', 'yurt'), ('Sawmill', 'odunluk'), ("Hunters' Hut", 'avci'), ("Hunter's Hut", 'avci'), ('Hunters Hut', 'avci'), ('Iron Mine', 'demirci'),
         ('Coal Mine', 'komurluk'), ('War Academy', 'harpakademi'), ('Hero Hall', None), ('Cookhouse', None), ('Clinic', None)]
PRE = re.compile(r"(" + '|'.join(re.escape(n) for n, _ in NAMES) + r")(?:\s+\d+)?\s*(?:Lv\.?\s*(\d+)|FC\s*(\d+))?", re.I)

def T(c): return c if isinstance(c, str) else c.get('t', '')
def secs(v):
    m = re.fullmatch(r'(?:(\d+)\s*d\s*)?(\d+):(\d+):(\d+)', v.strip(), re.I)
    return int(m[1] or 0) * 86400 + int(m[2]) * 3600 + int(m[3]) * 60 + int(m[4]) if m else None
def cost(c):
    if isinstance(c, str): return {}
    nums = [int(x.replace(',', '')) for x in re.findall(r'\d[\d,]*', c.get('t', ''))]
    icons = [i.rsplit('.', 1)[0] for i in c.get('i', [])]
    if len(nums) != len(icons): raise ValueError('bedel/simge sayısı uyuşmuyor: %r' % c)
    out = {}
    for n, i in zip(nums, icons):
        k = ICONS.get(i)
        if not k: raise ValueError('bilinmeyen kaynak simgesi ' + i)
        out[k] = out.get(k, 0) + n
    return out
def reqs(text):
    out = {}
    for m in PRE.finditer(text):
        key = dict((n.lower(), k) for n, k in NAMES).get(m[1].lower())
        if not key: continue
        lv = int(m[2]) if m[2] else (30 + int(m[3]) if m[3] else 1)
        out[key] = max(out.get(key, 0), lv)
    return out
def rows(slug):
    t = pages[slug]['tables'][0]
    assert [T(c) for c in t[0]][:4] == ['Level', 'Prerequisites', 'Build Cost', 'Construction Time'], slug
    out = []
    for r in t[1:]:
        lb = T(r[0]); s = secs(T(r[3]))
        if s is None: raise ValueError(slug + ' süre okunamadı ' + T(r[3]))
        out.append({'lb': lb, 'c': cost(r[2]), 't': s, 'p': reqs(T(r[1])), 'sub': bool(re.search(r'-\d+$', lb))})
    return out

adapted = json.loads(subprocess.run(['node', '-e', """
global.window=global;require(process.argv[1]);const Q=window.ERGENEKON_UPGRADE_BALANCE,o={};
for(const k of ['ocak','oba','yurt','odunluk','avci','demirci','sifa','kisla','sur','ambar','gozcu']){o[k]=[];for(let L=0;L<40;L++){const q=Q.quote(k,L);o[k].push(q?{c:q.cost,t:q.seconds}:null)}}
process.stdout.write(JSON.stringify(o))""", str(ROOT / 'public/upgrade-balance.js')], capture_output=True, text=True, check=True).stdout)

MAP = {  # anahtar: (ana tablo, Kor tablosu ya da None, ana tablodan kaç satır)
    'ocak': ('furnace', 'fire-crystal-furnace', 30), 'oba': ('embassy', 'fire-crystal-embassy', 30),
    'sifa': ('infirmary', 'fire-crystal-infirmary', 30), 'kisla': ('infantry-camp', 'fire-crystal-infantry-camp', 30),
    'gozcu': ('command-center', 'fire-crystal-command-center', 30),
    'odunluk': ('sawmill', None, 30), 'avci': ('hunters-hut', None, 30), 'demirci': ('iron-mine', None, 30),
    'ambar': ('storehouse', None, 30), 'yurt': ('shelter', None, 10), 'sur': ('barricade', None, 10)}
CAP = {'sur': 10}  # wiki'de Barricade 10 seviye (Furnace 1–30'a yayılı); sürdürülmez
out = {}
for key, (main, fc, take) in MAP.items():
    R = rows(main)[:take]
    for i, r in enumerate(R):  # piramit: yapı Ocak'ı geçemez
        if key != 'ocak': r['p']['ocak'] = max(r['p'].get('ocak', 0), i + 1 if i < 30 else 31)
        r['p'].pop(key, None)
    if fc:
        F = rows(fc); assert len(F) == 50, (fc, len(F))
        for j, r in enumerate(F):
            target = 31 + j // 5
            if key != 'ocak': r['p']['ocak'] = max(r['p'].get('ocak', 0), target)
            r['p'].pop(key, None)
        R += F
    # wiki'nin vermediği üst seviyeler: mevcut eğrinin büyüme oranıyla sürdür (yalnız ana satırlarla 40'a tamamla)
    mains = sum(1 for r in R if not r['sub'])
    A = adapted[key]
    while mains < CAP.get(key, 40):
        lv = mains  # 0 tabanlı satır = lv -> lv+1
        prev = R[-1]; a0, a1 = A[lv - 1], A[lv]
        g = sum(a1['c'].values()) / max(1, sum(a0['c'].values())); gt = a1['t'] / max(1, a0['t'])
        R.append({'lb': str(lv + 1), 'c': {k: int(round(v * g, -2 if v * g > 1000 else 0)) for k, v in prev['c'].items()}, 't': int(prev['t'] * gt),
                  'p': {'ocak': lv + 1} if key != 'ocak' else {}, 'sub': False, 'x': 1})
        mains += 1
    out[key] = {'max': CAP.get(key, 40), 'src': 'https://www.whiteoutsurvival.wiki/buildings/' + main + '/' + (' + /buildings/' + fc + '/' if fc else ''), 'fc': bool(fc), 'rows': R}
    print(key.ljust(8), 'satır', len(R), 'wiki', sum(1 for r in R if not r.get('x')), 'sürdürülen', sum(1 for r in R if r.get('x')))
(ROOT / 'public/wos-buildings-data.js').write_text(
    '/* Whiteout Survival Wiki yapı tabloları, 26.11.2026 alındı (data/wos/buildings.json). Üretici: scripts/wos-buildings.py.\n'
    '   rows[i]: lb=wiki etiketi, c=bedel, t=süre (sn), p=ön koşul {yapı: seviye}, sub=Kor ara aşaması, x=1 wiki dışı (eğriyle sürdürüldü). */\n'
    '(function(root){root.WOS_BUILDINGS=' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';})(typeof window!=="undefined"?window:globalThis);\n')
print('yazıldı', (ROOT / 'public/wos-buildings-data.js').stat().st_size, 'bayt')
