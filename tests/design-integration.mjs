import assert from 'node:assert/strict';
import fs from 'node:fs';
import {E} from './game.mjs';
const read=js=>JSON.parse(E(`JSON.stringify(${js})`));
E('s=fresh();mig();s.snd=false');
const seen=new Set();
for(const branch of ['b','e','s','war']){
 E(`RTT='${branch}';RN2=''`);
 const before=E('JSON.stringify(s)'),html=E('rTree()'),layout=read(`researchView.layout('${branch}')`);
 const rendered=[...html.matchAll(/<button[^>]*class="research-node[^\"]*"[^>]*data-wos-node="([^\"]+)"/g)].map(m=>m[1]);
 assert.deepEqual(new Set(rendered),new Set(layout.nodes.map(z=>z.k)),`${branch}: every real research node is reachable`);
 for(const key of rendered)seen.add(key);
 const allowed=new Set(layout.nodes.map(z=>z.k));
 for(const z of layout.nodes){
  const p=layout.positions[z.k];assert.ok(Number.isFinite(p.x)&&Number.isFinite(p.y));assert.ok(p.x>=68&&p.x+68<=layout.width);assert.ok(p.y>=54&&p.y+89<=layout.height);
  const realParents=read(`WOS_RESEARCH.by[${JSON.stringify(z.k)}].levels.flatMap(l=>l.requirements).filter(r=>!r.building&&!r.unresolved&&r.key!==${JSON.stringify(z.k)}).map(r=>r.key)`);
  assert.deepEqual(new Set(layout.parents[z.k]),new Set(realParents.filter(k=>allowed.has(k))),`${z.k}: lines derive from actual source prerequisites`);
 }
 for(let i=0;i<layout.nodes.length;i++)for(let j=i+1;j<layout.nodes.length;j++){const a=layout.positions[layout.nodes[i].k],b=layout.positions[layout.nodes[j].k];assert.ok(Math.abs(a.x-b.x)>=136||Math.abs(a.y-b.y)>=143,'Research touch cards do not overlap');}
 assert.equal(E('JSON.stringify(s)'),before,'Rendering must not mutate a save');
 assert.ok(html.length<180000,'Cached artwork prevents megabyte-sized research renders');assert.doesNotMatch(html,/data:image\/[^;]+;base64,/);assert.match(html,/data-research-scroll=/);
}
assert.equal(seen.size,287,'All source research is accessible across the four branches');
// The redesigned button submits the same paid action index and respects real rules.
E("RTT='b';RN2='wos_tooling-up-i';s.l.bilgelik=1;s.r={et:0,odun:0,komur:0,demir:0,celik:0,kristal:0,kristalParcasi:0,aritilmisKristal:0}");
let html=E('rTree()');let cta=html.match(/<button[^>]*class="research-cta"[^>]*>/)[0];assert.match(cta,/ disabled/);assert.ok(cta.includes(`data-rs="${E("rIdx('wos_tooling-up-i')")}"`));
E("Object.assign(s.r,researchQuote('wos_tooling-up-i').cost)");html=E('rTree()');cta=html.match(/<button[^>]*class="research-cta"[^>]*>/)[0];assert.doesNotMatch(cta,/ disabled/);E("startRs(rIdx('wos_tooling-up-i'))");assert.equal(E('s.rq.k'),'wos_tooling-up-i');html=E('rTree()');assert.match(html,/research-queue is-running/);assert.match(html,/data-rqs="1"/);assert.match(html,/Araştırılıyor/);
E("RN2='bld';RTT='b'");assert.match(E('rTree()'),/Usta İşçilik/,'Existing legacy work remains readable');
// Every theme picture is a real local asset, not a reference to the concept screenshot.
for(const key of ['growth','medicaltent','hammer','scroll','command','military','economy','heroes','events','mail','settings','alliance','chronicle']){const path=E(`gameThemeArt('${key}')`);assert.match(path,/^\.\/assets\/interface\/icons\/.+\.webp$/);assert.ok(fs.statSync(new URL('../public/'+path.slice(2),import.meta.url)).size>100);}
const index=fs.readFileSync(new URL('../public/index.html',import.meta.url),'utf8');for(const file of ['research-view.css','imperial-theme.css','theme-icons.js','research-view.js','page-presentation.js']){assert.ok(index.includes(file));assert.ok(fs.existsSync(new URL('../public/'+file,import.meta.url)));}
assert.ok(index.indexOf('installWhiteoutResearch();')<index.indexOf('installResearchView();'));assert.ok(index.indexOf('installResearchView();')<index.indexOf('installPagePresentation();'));
console.log('PASS: all287 real research nodes, actual prerequisite connections, non-overlapping touch cards, save-pure lightweight renders, action/disabled/queue parity, legacy work, real art assets and source installation order.');
