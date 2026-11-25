import assert from 'node:assert/strict';
import {E} from './game.mjs';
const read=js=>JSON.parse(E(`JSON.stringify(${js})`));
function ready(level){E(`s=fresh();mig();s.r={odun:1e12,et:1e12,demir:1e12,komur:1e12,celik:1e12,kristal:1e12,aritilmisKristal:1e12,kristalParcasi:1e12};s.ek=s.ek||{};s.ek.fcs={};Object.keys(B).forEach(k=>s.l[k]=${level});s.q=s.q2=null;s.raid.t=1e9;s.evt=1e9;`);}
// These are the same guards used by tapping a building and by Kurultay.
ready(5);E('s.l.demirci=4');assert.equal(E("can('ocak')"),false);assert.deepEqual(read("buildingRequirements('ocak')"),[{key:'demirci',level:5}]);assert.match(E("bmReq('ocak').join('')"),/data-bm="demirci"/);
E("var wallet=JSON.stringify(s.r);start('ocak')");assert.equal(E('s.q'),null);assert.equal(E('JSON.stringify(s.r)'),E('wallet'));
E('s.l.demirci=5');assert.equal(E("can('ocak')"),true);
ready(10);E('s.l.oba=9;s.l.kisla=9');const needs=read("buildingRequirements('ocak')");assert.ok(needs.some(r=>r.key==='oba'&&r.level===10));assert.ok(needs.some(r=>r.key==='kisla'&&r.level===10));
E('s.l.oba=10;s.l.kisla=10');assert.equal(E("can('ocak')"),true);
// New actual prices and times are charged once and use the real queue.
ready(15);E("s.rs.masonry=5;var price=cost('ocak'),seconds=dur('ocak'),before=JSON.stringify(s.r);start('ocak')");const before=JSON.parse(E('before')),price=read('price'),charged=read('s.r');for(const r of Object.keys(price))assert.equal(before[r]-charged[r],price[r]);assert.equal(E('s.q.tot'),E('seconds'));assert.equal(E('s.q.left'),E('seconds'));
E("var after=JSON.stringify(s.r);start('ocak')");assert.equal(E('JSON.stringify(s.r)'),E('after'));E('s.q.left=.01;tick(1,true)');assert.equal(E('s.l.ocak'),16);assert.equal(E('s.q'),null);
ready(20);E("s.q={k:'sifa',left:111,tot:900,h:0};s.q2={k:'odunluk',left:222,tot:800,h:0};var ongoing=JSON.stringify([s.q,s.q2]);mig()");assert.equal(E('JSON.stringify([s.q,s.q2])'),E('ongoing'));
ready(40);assert.equal(E("can('ocak')"),false);assert.equal(E("can('oba')"),false);assert.doesNotMatch(E("bmHtml('ocak')"),/→ 41|Maliyet:/);assert.match(E("bmHtml('ocak')"),/En yüksek seviye/);
// Kor ara aşamaları (wiki 30-1…30-4, FC 1): seviye değişmez, s.ek.fcs sayılır; beşinci aşama Ocak'ı 31 yapar
ready(30);for(let i=1;i<=4;i++){E("start('ocak')");assert.equal(E('s.q.sub'),1);E('s.q.left=.01;tick(1,true)');assert.equal(E('s.l.ocak'),30);assert.equal(E('s.ek.fcs.ocak'),i);assert.equal(E("buildingLevelText('ocak',30)"),'Sv 30 · ara '+i+'/4');}
E("start('ocak')");assert.ok(!E('s.q.sub'));E('s.q.left=.01;tick(1,true)');assert.equal(E('s.l.ocak'),31);assert.equal(E('s.ek.fcs.ocak'),0);assert.equal(E("buildingLevelText('ocak',31)"),'Kor 1');
assert.deepEqual(read("buildingRequirements('ocak')"),[{key:'oba',level:31},{key:'kisla',level:31}],'Kor 1-1 wiki gereği: Boy Obası ve Kışla Kor 1');E('s.l.oba=31;s.l.kisla=31');assert.deepEqual(read("buildingRequirements('ocak')"),[]);
console.log('PASS: wiki building prerequisites, Kor sub-steps, actual building prerequisite guards and links, insufficient prerequisite no-charge, discounted price deduction once, timed completion, existing parallel jobs preserved and max-level action display.');
