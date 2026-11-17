import assert from 'node:assert/strict';import {E} from './game.mjs';
const read=js=>JSON.parse(E(`JSON.stringify(${js})`));
assert.equal(E('WHITEOUT_RESEARCH_DATA.length'),287);assert.equal(E('WHITEOUT_RESEARCH_DATA.reduce((n,z)=>n+z.levels.length,0)'),2643);
E('s=fresh();mig();s.l.ocak=30;s.l.bilgelik=30;s.r={odun:1e12,et:1e12,komur:1e12,demir:1e12,celik:1e12,kristalParcasi:1e12,aritilmisKristal:1e12,kristal:1e12};');
assert.deepEqual(read("researchQuote('wos_tooling-up-i',0).cost"),{et:2700,odun:2700,komur:540,demir:130,celik:160});assert.equal(E("researchQuote('wos_tooling-up-i',0).seconds"),2);assert.equal(E("WOS_RESEARCH.by['wos_tooling-up-i'].levels.length"),3);
E("s.l.bilgelik=0;var money=JSON.stringify(s.r);startRs(rIdx('wos_tooling-up-i'))");assert.equal(E('s.rq'),null);assert.equal(E('JSON.stringify(s.r)'),E('money'));
E("s.l.bilgelik=1;s.r.komur=0;startRs(rIdx('wos_tooling-up-i'))");assert.equal(E('s.rq'),null);
E("s.r.komur=1000;var before=JSON.stringify(s.r);startRs(rIdx('wos_tooling-up-i'))");const before=JSON.parse(E('before')),after=read('s.r');for(const [r,n]of Object.entries(read("researchQuote('wos_tooling-up-i',0).cost")))assert.equal(before[r]-after[r],n);assert.equal(E('s.rq.tot'),2);
E("var paid=JSON.stringify(s.r);startRs(rIdx('wos_tooling-up-i'))");assert.equal(E('JSON.stringify(s.r)'),E('paid'));E('tick(2,true)');assert.equal(E("s.rs['wos_tooling-up-i']"),1);assert.equal(E('s.rq'),null);assert.equal(E("wosBonus('Construction Speed')"),.004);
// Actual source incremental bonuses, not generic3% or10-level formulas.
E("s.rs['wos_tool-enhancement-i']=3");assert.ok(Math.abs(E("wosBonus('Research Speed')")-.013)<1e-12);assert.equal(E("researchQuote('wos_tool-enhancement-i',3)"),null);
E("s.rs['wos_exalted-blunderbuss']=3");assert.equal(E("wosBonus('Marksman Health')"),.09);
E("var baseWard=wcap();s.rs['wos_ward-expansion-i']=1");assert.equal(E('wcap()-baseWard'),540);E("s.rs['wos_ward-expansion-i']=0;var deployment=marchTroopCapacity();s.rs['wos_regimental-expansion-i']=1");assert.equal(E('marchTroopCapacity()-deployment'),320);
E("s.rs['wos_molten-shot-i']=3");assert.equal(E("wosBonus('Marksman Attack')"),.03);E("s.rs['wos_exalted-marksman-healing']=2");assert.equal(E("wosBonus('Exalted Marksman Healing Cost Reduction')"),.1);assert.equal(E("researchQuote('wos_starfire',0).blocked"),true);
// Every available source quote reproduces the source cost and unmodified base time.
for(const z of read('WHITEOUT_RESEARCH_DATA'))for(const row of z.levels){const q=read(`WOS_RESEARCH.quote(${JSON.stringify(z.key)},${row.level-1})`);assert.deepEqual(q.cost,row.cost);assert.equal(q.seconds,row.seconds);}
E('s.rq=null;RS.forEach(z=>s.rs[z.k]=0);s.l.harpakademi=5;');assert.ok(E("researchRequirements('wos_helios-infantry').some(r=>r.key==='harpakademi')"),'FC5 is not the fifthsublevel');
E("s.l.harpakademi=21;s.rs['wos_flame-tomahawk']=12;s.rs['wos_flame-protection']=12;s.rs['wos_flame-legion-2']=12");assert.equal(E("researchRequirements('wos_helios-infantry').length"),0);
E("s.rs['wos_helios-infantry']=1");assert.equal(E('unlockedTroopTier(0)'),11);assert.notEqual(E('unlockedTroopTier(1)'),11);E('s.ttiers=[11,2,3];mig()');assert.equal(E('troopTier(0)'),11);
E("s.rs['wos_exalted-blunderbuss']=0;s.l.harpakademi=46");assert.equal(E("researchQuote('wos_exalted-blunderbuss',0).blocked"),true);assert.equal(E("canResearch('wos_exalted-blunderbuss')"),false);
E("s.l.ocak=8;s.l.bilgelik=0;s.q=s.q2=null");assert.equal(E("can('bilgelik')"),false);E('s.l.ocak=9');assert.equal(E("can('bilgelik')"),true);assert.equal(E("dur('bilgelik')"),2);assert.deepEqual(read("cost('bilgelik')"),{odun:105});
E("s.l.bilgelik=1;s.rs={'wos_tooling-up-i':2,bld:4};s.rq={k:'wos_tooling-up-i',n:'Usta Araçları',left:17,tot:40};var snapshot=JSON.stringify([s.rs,s.rq]);mig()");assert.equal(E('JSON.stringify([s.rs,s.rq])'),E('snapshot'));
E("RN2='';RTT='b';s.rq=null");const ui=E('rTree()');assert.match(ui,/Usta Araçları I/);assert.match(ui,/data-wos-node/);assert.doesNotMatch(ui,/Seviye maliyetleri|Yükseltme planı/);
E("s.l.ocak=30;s.r.celik=0;s.dg.n=3;s.ch.hp=1e9;cs=function(){return{atk:1e9,def:1e9,hp:1e9}};var steel=s.r.celik;dungeon()");assert.ok(E('s.r.celik>steel'));
console.log('PASS:287 source research nodes/2643 exact level quotes, genuine variable caps and bonuses, per-resource paid queue, FC sublevel guards, class-specificXI unlock and savedtier migration, source omissions blocked, research buildings, old queues and playable research UI.');
// Laboratory spending, quotas, odds and the daily discount follow the official numeric rules.
E("s=fresh();mig();s.l.ocak=40;s.r={et:1e8,odun:1e8,komur:1e8,demir:1e8,celik:1234,kristal:10000,kristalParcasi:7,aritilmisKristal:0};var randomBefore=Math.random;Math.random=function(){return 0}");
const firstLab=read('crystalRefinementQuote(false)');assert.deepEqual(firstLab.cost,{et:5000,odun:5000,komur:5000,demir:5000});assert.equal(firstLab.remaining,8);E('var crystalStart=s.r.kristal;refineCrystal(false)');assert.equal(E('s.r.kristal-crystalStart'),1);assert.equal(E('crystalRefinementQuote(false).cost.odun'),10000);
E('for(var j=0;j<7;j++)refineCrystal(false);var quotaWallet=JSON.stringify(s.r)');assert.equal(E('crystalRefinementQuote(false)'),null);assert.equal(E('refineCrystal(false)'),false);assert.equal(E('JSON.stringify(s.r)'),E('quotaWallet'));
assert.equal(E('crystalRefinementQuote(true).cost.kristal'),10);E('refineCrystal(true)');assert.equal(E('s.r.aritilmisKristal'),1);assert.equal(E('crystalRefinementQuote(true).cost.kristal'),20);
E('s.wosRefinery.w=20');assert.equal(E('crystalRefinementQuote(true).cost.kristal'),50);E('s.wosRefinery.w=100');assert.equal(E('refineCrystal(true)'),false);
E("s.wosRefinery.day='old';s.wosRefinery.discountDay='old'");assert.equal(E('crystalRefinementQuote(false).remaining'),8);E('s.wosRefinery.w=0');assert.equal(E('crystalRefinementQuote(true).cost.kristal'),10);
E("var premium=JSON.stringify([s.r.celik,s.r.kristal,s.r.kristalParcasi,s.r.aritilmisKristal]);s.lg.d='';lgClaim();tick(1,true)");assert.equal(E('JSON.stringify([s.r.celik,s.r.kristal,s.r.kristalParcasi,s.r.aritilmisKristal])'),E('premium'),'rawmaterial rewards/caps never create or reduce premium currencies');
E('raidAtk=function(){return 1e20};raidDef=function(){return 1};raid()');assert.equal(E('JSON.stringify([s.r.celik,s.r.kristal,s.r.kristalParcasi,s.r.aritilmisKristal])'),E('premium'),'raid never loots premium currencies');E('Math.random=randomBefore');
console.log('PASS: source laboratory prices and quotas, weighted outputs, weekly tiers/daily discount and premium currency reward/raid/cap isolation.');
