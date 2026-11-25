import assert from 'node:assert/strict';import {E} from './game.mjs';
// 26.11.2026: yapı bedel/süre/ön koşulları Whiteout Survival Wiki'den birebir (public/wos-buildings-data.js)
E('s=fresh();mig();s.ek=s.ek||{};s.ek.fcs={};window.savedPlanState=JSON.stringify(s)');
const keys=JSON.parse(E('JSON.stringify(Object.keys(WOS_BUILDINGS))'));assert.equal(keys.length,11);
for(const k of keys)assert.ok(E(`!!B['${k}']`),k+' oyunda var');
const q=(k,l)=>JSON.parse(E(`JSON.stringify(buildingUpgradeAt('${k}',${l}))`));
// wiki örnekleri (Furnace 10, 25, 30; Embassy 1; Barricade 10)
assert.deepEqual(q('ocak',9),{fromLevel:9,targetLevel:10,cost:{odun:460000,komur:92000,demir:23000},seconds:21600,sub:false,step:0,label:'10'});
assert.deepEqual(q('ocak',24).cost,{et:81000000,odun:81000000,komur:16000000,demir:4000000});assert.equal(q('ocak',24).seconds,18*86400+8*3600+22*60);
assert.equal(q('ocak',29).seconds,40*86400+4*3600+27*60);assert.equal(q('ocak',30).label,'30-1');assert.equal(q('ocak',30).sub,true);assert.equal(q('ocak',39).label,'FC 9-1');
assert.equal(E("buildingMaxLevel('sur')"),10);assert.equal(q('sur',10),null);assert.equal(E("buildingMaxLevel('ocak')"),40);
for(const k of keys){const max=E(`buildingMaxLevel('${k}')`);for(let lv=0;lv<max;lv++){const p=q(k,lv);assert.equal(p.fromLevel,lv);assert.ok(p.targetLevel===lv+1||(p.sub&&p.targetLevel===lv));assert.ok(Number.isSafeInteger(p.seconds)&&p.seconds>=0);assert.ok(Object.values(p.cost).every(n=>Number.isSafeInteger(n)&&n>0));}
  assert.equal(q(k,max),null);}
assert.equal(E('JSON.stringify(s)'),E('savedPlanState'));assert.equal(E("buildingUpgradeAt('unknown',0)"),null);for(const n of [-1,.5,40,NaN])assert.equal(E(`buildingUpgradeAt('ocak',${n})`),null);
for(const k of keys)for(const lv of [0,1,3,5,9]){E(`s.l['${k}']=${lv};s.rs.masonry=0;var next=buildingUpgradeAt('${k}',${lv})`);assert.equal(E('JSON.stringify(next.cost)'),E(`JSON.stringify(cost('${k}'))`));assert.equal(E('next.seconds'),E(`dur('${k}')`));}
console.log('PASS: wiki building quotes for 11 structures, exact Furnace/Barricade examples, Kor sub-step labels, valid costs/times, no save mutation, parity with actual charges.');
