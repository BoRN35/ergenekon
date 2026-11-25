import assert from 'node:assert/strict';
import {E,ctx} from './game.mjs';
import {runArenaBattle} from '../src/arena-battle.js';

ctx.ARENA_BATTLE_ENGINE=runArenaBattle;
const read=js=>JSON.parse(E(`JSON.stringify(${js})`));
const legacy=['prod','cap','bld','war','hero','mine','heal','camp','wood','meat','iron','trap','xpb','spd','bandage'];
const added=['rspeed','batch','march','logistics','ward','medicine','masonry','command','gatherwood','gathermeat','gatheriron','fuel','rations','barter','protection','infatk','cavatk','archatk','infdef','cavdef','archdef','infhp','cavhp','archhp','triage'];
function reset(){E("s=fresh();mig();s.snd=false;s.l.ocak=30;s.l.yurt=10;s.l.kisla=10;s.l.sifa=5;s.l.odunluk=5;s.l.avci=5;s.l.demirci=5;s.l.ambar=5;s.r={odun:10000,et:10000,demir:10000};s.au=false;s.evt=1e9;s.raid.t=1e9;");}
function levels(key,n){E(`s.rs[${JSON.stringify(key)}]=${n}`);}
function better(key,expression,direction=1){reset();const before=E(expression);levels(key,10);const after=E(expression);assert.ok(direction>0?after>before:after<before,`${key} changes ${expression}: ${before} → ${after}`);}

reset();
const keys=read('RS.filter(z=>!WOS_RESEARCH.by[z.k]).map(z=>z.k)');
assert.equal(keys.length,40);assert.equal(new Set(keys).size,40);
for(const key of [...legacy,...added])assert.ok(keys.includes(key),`research ${key} exists`);
assert.deepEqual(new Set(read('Object.values(TREE).flat().map(z=>z[0])')),new Set(keys));

// Every new research is reachable, charges its own quote once and finishes once.
for(const key of added){
 reset();
 let quote=read(`researchQuote(${JSON.stringify(key)},0)`);
 assert.ok(quote&&quote.seconds>0,`valid quote for ${key}`);
 assert.ok(quote.requiredOcak<=40,`${key} unlock fits max level`);
 assert.ok(Object.values(quote.cost).every(n=>Number.isSafeInteger(n)&&n>0));
 E(`s.l.ocak=40;s.r={odun:1e15,et:1e15,demir:1e15};RS.forEach(z=>s.rs[z.k]=10);s.rs[${JSON.stringify(key)}]=0`);
 quote=read(`researchQuote(${JSON.stringify(key)},0)`);
 assert.equal(E(`canResearch(${JSON.stringify(key)})`),true,`${key} can begin with requirements met`);
 const before=read('s.r');E(`startRs(rIdx(${JSON.stringify(key)}))`);
 assert.equal(E('s.rq.k'),key);assert.equal(E('s.rq.tot'),quote.seconds);
 const charged=read('s.r');
 for(const resource of Object.keys(quote.cost))assert.equal(before[resource]-charged[resource],quote.cost[resource],`${key} deducts ${resource}`);
 const snapshot=E('JSON.stringify(s.r)');E(`startRs(rIdx(${JSON.stringify(key)}))`);assert.equal(E('JSON.stringify(s.r)'),snapshot,'busy queue cannot charge twice');
 E('s.rq.left=.01;tick(1,true)');assert.equal(E(`s.rs[${JSON.stringify(key)}]`),1);assert.equal(E('s.rq'),null);
 E('tick(1,true)');assert.equal(E(`s.rs[${JSON.stringify(key)}]`),1,'completed queue cannot award twice');
}

// Ocak, parent and resource requirements apply to the same action used by the UI.
reset();E('s.l.ocak=1');assert.equal(E("canResearch('bld')"),false);E("startRs(rIdx('bld'))");assert.equal(E('s.rq'),null);
reset();assert.equal(E("canResearch('cap')"),false);E("startRs(rIdx('cap'))");assert.equal(E('s.rq'),null);
E('s.rs.bld=1;s.r={odun:0,et:0,demir:0}');assert.equal(E("canResearch('cap')"),false);
reset();const noAction=E('JSON.stringify(s)');for(const index of [-1,999,NaN,0.5,null]){E(`startRs(${JSON.stringify(index)})`);assert.equal(E('JSON.stringify(s)'),noAction,'invalid research indices do not mutate state');}
E('s.rs.bld=10');assert.equal(E("researchQuote('bld',10)"),null);assert.equal(E("canResearch('bld')"),false);

// Loading a save keeps earned research and every in-progress job unchanged.
reset();E("s.rs={prod:7,bld:4,bandage:2};s.rq={k:'bld',n:'Usta İşçilik',left:321,tot:900};s.q={k:'yurt',left:222,tot:800,h:0};s.tq={k:0,n:10,left:123,tot:500};s.hq={n:[1,2,3],left:456,tot:700};var savedProgress=JSON.stringify([s.rs,s.rq,s.q,s.tq,s.hq]);mig()");
assert.equal(E('JSON.stringify([s.rs,s.rq,s.q,s.tq,s.hq])'),E('savedProgress'));

// Research effects change actual gameplay quantities, not only their descriptions.
better('batch','tb()');better('march','mt(0)',-1);better('logistics','marchCapacity()');better('ward','wcap()');
better('command','tcap()');reset();const slots=E('sqn()');levels('command',4);assert.equal(E('sqn()'),slots);levels('command',5);assert.equal(E('sqn()'),slots+1);levels('command',10);assert.equal(E('sqn()'),slots+2);
reset();E('HV=[10,20,30]');const healCost=read('hcost()');levels('medicine',10);const discounted=read('hcost()');for(const resource of Object.keys(healCost))assert.ok(discounted[resource]<healCost[resource]);
better('rspeed',"researchQuote('bld',0).seconds",-1);
reset();const buildCost=read("cost('ocak')");levels('masonry',10);const cheapBuild=read("cost('ocak')");assert.ok(cheapBuild.odun<buildCost.odun);
// 26.11: Boy Obası artık Ocak×1,4 değil, wiki Embassy tablosu; Taş Ustalığı indirimi wiki bedeline uygulanır
for(const level of [1,3,10,25]){E(`s.l.oba=${level}`);const base=read(`buildingUpgradeAt('oba',${level})`).cost,oba=read("cost('oba')");for(const resource of Object.keys(base))assert.equal(oba[resource],Math.ceil(base[resource]*0.9),'Boy Obası wiki bedeli + %10 Taş Ustalığı indirimi');}

function produced(key,resource){reset();levels(key,10);E('tick(1,true)');return E(`s.r.${resource}`);}
for(const [key,resource] of [['wood','odun'],['meat','et'],['iron','demir'],['fuel','odun'],['rations','et']]){reset();E('tick(1,true)');const plain=E(`s.r.${resource}`);assert.ok(produced(key,resource)>plain,`${key} changes real production or upkeep`);}
function cargo(resource,key){reset();if(key)levels(key,10);E(`var ni=s.nodes.findIndex(n=>n.t===${JSON.stringify(resource)}&&n.lv===1);s.sq=[{st:2,n:ni,left:0,cargo:0,capacity:1e9,resource:${JSON.stringify(resource)}}];tick(1,true)`);return E('s.sq[0].cargo');}
for(const [key,resource] of [['gatherwood','odun'],['gathermeat','et'],['gatheriron','demir']]){assert.ok(cargo(resource,key)>cargo(resource),`${key} boosts matching resource gathering`);const other=resource==='demir'?'et':'demir';assert.equal(cargo(other,key),cargo(other),`${key} does not boost another resource`);}
reset();E("trade('01')");const plainTrade=E('s.r.et');reset();levels('barter',10);E("trade('01')");assert.ok(E('s.r.et')>plainTrade);
reset();E('raidAtk=function(){return 1e20};raidDef=function(){return 1};raid()');const raided=E('s.r.odun');reset();levels('protection',10);E('raid()');assert.ok(E('s.r.odun')>raided);

// Attack, defense and health upgrades are distinct and class-specific.
for(const [type,prefix] of [[0,'inf'],[1,'cav'],[2,'arch']]){
 for(const [suffix,hook] of [['atk','Attack'],['def','Defense'],['hp','Health']]){
  reset();E('s.tr=[1000,1000,1000]');const plain=E('tpow()');levels(prefix+suffix,10);
  assert.ok(E(`troopResearch${hook}(${type})`)>1);assert.equal(E(`troopResearch${hook}((${type}+1)%3)`),1);
  assert.ok(E('tpow()')>plain,`${prefix+suffix} contributes to army strength`);
 }
 reset();E('s.tr=[1000,1000,1000];woundArmy(.5)');const losses=read('s.wd');reset();levels(prefix+'def',10);E('s.tr=[1000,1000,1000];woundArmy(.5)');const armored=read('s.wd');assert.ok(armored[type]<losses[type]);assert.equal(armored[(type+1)%3],losses[(type+1)%3]);
 reset();levels(prefix+'hp',10);E('s.tr=[1000,1000,1000];woundArmy(.5)');assert.ok(E(`s.wd[${type}]`)<losses[type]);
}
reset();E('s.tr=[1000,1000,1000];woundArmy(.5)');const normalWounded=E('wsum()');reset();levels('triage',10);E('s.tr=[1000,1000,1000];woundArmy(.5)');assert.ok(E('wsum()')<normalWounded);

// Arena uses research in its persisted combat snapshot before simulation/replay.
reset();E('s.tr=[100,100,100];var plainArena=startArenaMatch(0);var plainStats=JSON.stringify(plainArena.playerStats)');const plainStats=read('plainArena.playerStats');
for(const [key,stat] of [['infatk','atk'],['infdef','def'],['infhp','hp']]){reset();E('s.tr=[100,100,100]');levels(key,10);E('var researchedArena=startArenaMatch(0)');assert.ok(E(`researchedArena.playerStats.${stat}`)>plainStats[stat],`${key} affects real arena ${stat}`);}

reset();E("RTT='b';RN2='bld'");const html=E('rTree()');assert.match(html,/Usta İşçilik/);assert.match(html,new RegExp(E("ft(researchQuote('bld',0).seconds)")));assert.doesNotMatch(html,/Yükseltme planı|Seviye maliyetleri/);
console.log('PASS: 40 playable research types, prerequisite and resource enforcement, single-charge timed completion, old-save jobs preserved, real growth/economy/class combat effects, arena snapshots and action quote parity.');
