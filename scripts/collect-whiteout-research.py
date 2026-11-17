import urllib.request,re,html,json,concurrent.futures
from pathlib import Path
base='https://www.whiteoutsurvival.wiki'
def fetch(url):
 return urllib.request.urlopen(url,timeout=45).read().decode()
def txt(s):return ' '.join(html.unescape(re.sub('<[^>]+>',' ',s)).split())
s=fetch(base+'/research/')
links=list(dict.fromkeys(re.findall(r'href=[\"\x27](https://www.whiteoutsurvival.wiki/research/[^\"\x27?#]+)',s)))
links=[u for u in links if u!=base+'/research/']
print('Research pages',len(links),flush=True)
def parse(u):
 try:
  s=fetch(u); title=re.search(r'<h[12][^>]*>(.*?)</h[12]>',s,re.S)
  rows=[]
  for table in re.findall(r'<table\b.*?</table>',s,re.S):
   if 'Research Cost' not in table:continue
   for tr in re.findall(r'<tr\b.*?</tr>',table,re.S):
    cells=re.findall(r'<td\b[^>]*>(.*?)</td>',tr,re.S)
    if len(cells)<6 or not txt(cells[0]).isdigit():continue
    costs=[]
    for im,n in re.findall(r'<img[^>]+src="([^"]+)"[^>]*>\s*<span[^>]*>(.*?)</span>',cells[2],re.S):costs.append({'icon':im.rsplit('/',1)[-1],'amount':txt(n)})
    rows.append({'level':int(txt(cells[0])),'prerequisites':re.findall(r'<span[^>]*>(.*?)</span>',cells[1],re.S),'costs':costs,'time':txt(cells[3]),'bonus':txt(cells[4]),'power':txt(cells[5])})
  for row in rows:row['prerequisites']=[txt(v) for v in row['prerequisites']]
  return {'key':u.rstrip('/').rsplit('/',1)[-1],'name':txt(title[1]) if title else '', 'source':u,'levels':rows}
 except Exception as e:return {'source':u,'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
 out=[]
 for v in pool.map(parse,links):
  out.append(v)
  if len(out)%25==0:print('Read',len(out),flush=True)
(Path(__file__).resolve().parents[1]/'data/whiteout-research-source.json').write_text(json.dumps({'source':base+'/research/','retrieved':'2026-11-17','research':out},ensure_ascii=False,indent=2))
print('Done',len(out),'rows',sum(len(v.get('levels',[])) for v in out),'errors',sum('error'in v for v in out),flush=True)
