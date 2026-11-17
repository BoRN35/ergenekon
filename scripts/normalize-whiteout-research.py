"""Normalize public numerical research facts; never invent missing source values."""
import json,re,html,unicodedata,urllib.request
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
raw=json.loads((ROOT/'data/whiteout-research-source.json').read_text())['research']
raw=[r for r in raw if r.get('levels')]
ICONS={'item_icon_100011.png':'et','item_icon_102.png':'et','Meat.webp':'et','item_icon_103.png':'odun','Wood.webp':'odun','item_icon_104.png':'komur','Coal.webp':'komur','item_icon_105.png':'demir','Iron.webp':'demir','item_icon_106.png':'celik','20250617-144040.png':'celik','item_icon_100083.png':'kristalParcasi','item_icon_100082.png':'aritilmisKristal','item_icon_100081.png':'kristal'}
def txt(v):return ' '.join(html.unescape(re.sub('<[^>]+>',' ',v)).split())
def num(v):
 v=re.sub(r'[\s,]','',v)
 if not re.fullmatch(r'\d+(?:\.\d+)?',v):raise ValueError('Unparsed amount '+v)
 return float(v) if '.' in v else int(v)
def seconds(v):
 m=re.fullmatch(r'(?:(\d+)\s*[dD]\s*)?(\d+):(\d+):(\d+)',v)
 return int(m[1] or 0)*86400+int(m[2])*3600+int(m[3])*60+int(m[4]) if m else None
def norm(v):
 v=unicodedata.normalize('NFKC',v).lower().strip()
 for a,b in [('assaut','assault'),('marskman','marksman'),('minning','mining'),('iorn','iron'),('ion mining','iron mining'),('bulwark formations','bulwark formation'),('survival expansion','survival techniques'),('helios marksmen','helios marksman')]:v=v.replace(a,b)
 return ' '.join(v.split())
lookup={}
unit='Infantry'
for i,r in enumerate(raw):
 if r['name']=='Flame Squad':unit=['Infantry','Marksman','Lancer'][sum(x['name']=='Flame Squad' for x in raw[:i])]
 if r['name']=='Exalted Blunderbuss':unit='Marksman'
 if r['name']=='Exalted Armament':unit='Infantry'
 if r['name']=='Exalted Pike':unit='Lancer'
 r['unit']=unit
 lookup.setdefault(norm(r['name']),[]).append(r)
# Explicit source spelling omissions.
for alias,target in [('tooling up','tooling up i'),('weapons prep','weapons prep i')]:lookup[alias]=lookup[target]
def requirement(v,owner):
 original=v;v=txt(v)
 m=re.fullmatch(r'Research Center\s*(\d+)',v,re.I)
 if m:return {'key':'bilgelik','level':int(m[1]),'building':True}
 m=re.fullmatch(r'War Academy\s*FC\s*(\d+)',v,re.I)
 if m:return {'key':'harpakademi','level':int(m[1]),'building':True,'fireCrystal':True}
 # Source typo Camp Expansion II1 has no separator.
 v=re.sub(r'Camp Expansion II1$','Camp Expansion II 1',v)
 m=re.match(r'^(.*?)\s*(?:Lv[lL]?\.?\s*|LV\.?\s*|\s)(\d+)$',v,re.I)
 name,level=(m[1].strip(),int(m[2])) if m else (v,1)
 choices=lookup.get(norm(name),[])
 if len(choices)>1:choices=[r for r in choices if r['unit']==owner['unit']]
 if len(choices)==1:return {'key':'wos_'+choices[0]['key'],'level':level}
 return {'key':'unresolved_'+re.sub('[^a-z0-9]+','_',norm(name)),'level':level,'unresolved':original}
def costs(rows):
 out={}
 for c in rows:
  k=ICONS.get(c['icon'],'item_'+c['icon'].removesuffix('.png').removesuffix('.webp'))
  out[k]=out.get(k,0)+num(c['amount'])
 return out
out=[]
for r in raw:
 ls=[];inherited={}
 for l in r['levels']:
  for p in filter(None,l['prerequisites']):
   q=requirement(p,r);old=inherited.get(q['key'])
   if old is None or q['level']>old['level']:inherited[q['key']]=q
  effects={label.strip(' %'):num(n) for label,n in re.findall(r'([^:]+):\s*([\d.,]+)\s*%?',l['bonus'])}
  known=' '.join(effects)
  branch='war' if any(x['key']=='harpakademi' for x in inherited.values()) else 'e' if any(z in known for z in ['Gathering','Output']) else 'b' if any(z in known for z in ['Construction','Healing Speed','Research Speed','Infirmary','Training','March Queue']) else 's'
  ls.append({'level':l['level'],'requirements':list(inherited.values()),'cost':costs(l['costs']),'seconds':seconds(l['time']),'effects':effects,'bonusText':l['bonus'],'unlock':({'type':('Infantry' if 'Infantry' in l['bonus'] else 'Lancer' if 'Lancer' in l['bonus'] else 'Marksman'),'tier':11} if 'Unlock XI Helios' in l['bonus'] else None),'sourceIssues':([] if seconds(l['time']) is not None else ['missing-or-malformed-time']),'power':num(l['power']) if l['power'] else 0})
 out.append({'key':'wos_'+r['key'],'name':r['name'],'source':r['source'],'branch':branch,'unit':r['unit'],'effectMode':('cumulative' if r['name'].startswith(('Exalted ','Molten ')) or r['name'] in ['Solar Supremacy','Starfire','Indomitable Wall','Meridian Phalanx'] else 'incremental'),'levels':ls})
# Public building facts are fetched independently; FC labels remain exact source labels.
buildings={}
for slug,key in [('research-center','bilgelik'),('war-academy','harpakademi'),('coal-mine','komurluk')]:
 url='https://www.whiteoutsurvival.wiki/buildings/'+slug+'/'
 text=urllib.request.urlopen(url,timeout=40).read().decode();levels=[]
 for table in re.findall(r'<table\b.*?</table>',text,re.S):
  if 'Construction Time' not in table:continue
  for tr in re.findall(r'<tr\b.*?</tr>',table,re.S):
   c=re.findall(r'<td\b[^>]*>(.*?)</td>',tr,re.S)
   if len(c)<5:continue
   label=txt(c[0]);co=[]
   for im,n in re.findall(r'<img[^>]+src="([^"]+)"[^>]*>\s*(?:<span[^>]*>)?\s*([\d\s,.]+)',c[2],re.S):co.append({'icon':im.rsplit('/',1)[-1],'amount':txt(n)})
   req=[txt(x) for x in re.split(r'<br\s*/?>',c[1]) if txt(x)]
   levels.append({'label':label,'prerequisites':req,'cost':costs(co),'seconds':seconds(txt(c[3])),'power':txt(c[4])})
 buildings[key]={'source':url,'levels':levels}
 if key=='komurluk':buildings[key].update({'productionPerHour':None,'sourceIssues':['hourly-production-rate-not-published']})
target=ROOT/'public/whiteout-research-data.js'
target.write_text('/* Numerical facts from official Whiteout Survival Wiki; retrieved 2026-11-17. Source URLs are attached to each record. item_icon_100083 = Fire Crystal Shard; item_icon_100082 = Refined Fire Crystal, verified against official /items/ pages. */\n(function(root){root.WHITEOUT_RESEARCH_DATA='+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';root.WHITEOUT_RESEARCH_BUILDINGS='+json.dumps(buildings,ensure_ascii=False,separators=(',',':'))+';})(typeof window!=="undefined"?window:globalThis);\n')
issues=sorted(set(q['unresolved'] for r in out for l in r['levels'] for q in l['requirements'] if q.get('unresolved')))
print('Research',len(out),'levels',sum(len(r['levels']) for r in out),'unresolved',len(issues),'buildings',[(k,len(v['levels']))for k,v in buildings.items()]);print('\n'.join(issues))
print('Missing/malformed times',sum(l['seconds'] is None for r in out for l in r['levels']))
assert len({r['key'] for r in out})==len(out)
