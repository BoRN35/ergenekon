# Whiteout Survival Wiki sayfalarını indirir, tabloları JSON yapar. Kullanım: python3 -I scripts/collect-whiteout-wiki.py <çalışma_klasörü> buildings,pets,...  (klasörde en_<tür>.txt URL listeleri olmalı; site haritası: /sitemap.xml)
import urllib.request, re, html, json, sys, os, concurrent.futures, hashlib
W=sys.argv[1]; types=sys.argv[2].split(',')
def fetch(u):
    p=os.path.join(W,'html',hashlib.md5(u.encode()).hexdigest()+'.html')
    if os.path.exists(p): return open(p,encoding='utf-8').read()
    for i in range(3):
        try:
            s=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=40).read().decode('utf-8','replace'); open(p,'w',encoding='utf-8').write(s); return s
        except Exception as e: err=e
    return ''
def txt(s): return ' '.join(html.unescape(re.sub(r'<[^>]+>',' ',s)).split())
def cell(c):
    t=txt(c); ims=[m.rsplit('/',1)[-1] for m in re.findall(r'<img[^>]+src="([^"]+)"',c)]
    return {'t':t,'i':ims} if ims else t
def parse(u):
    s=fetch(u)
    if not s: return {'url':u,'error':'fetch'}
    body=re.search(r'<(article|main)\b.*?</\1>',s,re.S); b=body.group(0) if body else s
    title=re.search(r'<h1[^>]*>(.*?)</h1>',b,re.S) or re.search(r'<title>(.*?)</title>',s,re.S)
    tables=[]
    for tb in re.findall(r'<table\b.*?</table>',b,re.S):
        rows=[]
        for tr in re.findall(r'<tr\b.*?</tr>',tb,re.S):
            cs=re.findall(r'<t[hd]\b[^>]*>(.*?)</t[hd]>',tr,re.S)
            if cs: rows.append([cell(c) for c in cs])
        if rows: tables.append(rows)
    heads=[txt(h) for h in re.findall(r'<h[2-4][^>]*>(.*?)</h[2-4]>',b,re.S)][:40]
    paras=[txt(p) for p in re.findall(r'<p\b[^>]*>(.*?)</p>',b,re.S)]
    paras=[p for p in paras if len(p)>25][:40]
    return {'url':u,'title':txt(title.group(1)) if title else '','headings':heads,'text':paras,'tables':tables}
for t in types:
    urls=[l.strip() for l in open(os.path.join(W,'en_'+t+'.txt')) if l.strip()]
    with concurrent.futures.ThreadPoolExecutor(6) as ex: out=list(ex.map(parse,urls))
    json.dump(out,open(os.path.join(W,'d_'+t+'.json'),'w'),ensure_ascii=False)
    print(t,len(out),'hata',sum(1 for o in out if 'error' in o),'tablo',sum(len(o.get('tables',[])) for o in out),flush=True)
