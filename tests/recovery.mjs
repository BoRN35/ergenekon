import assert from 'node:assert/strict';
import worker from '../worker/index.js';
import {localDB} from './api.mjs';
const env={DB:localDB(),ASSETS:{fetch:()=>new Response('asset')}};
const state={l:{ocak:6,oba:5,yurt:3},r:{odun:500,et:120,demir:20},ch:{lv:4,inv:[]},t:Date.now()};
let now=Date.now();const realNow=Date.now;Date.now=()=>now;
async function req(user='a',path='/api/save/recovery',method='POST',body={state},origin='https://game.test',raw){
 now+=1000;
 return worker.fetch(new Request('https://game.test'+path,{method,headers:{...(user?{'oai-authenticated-user-id':user}:{}),origin,'Content-Type':'application/json'},body:['GET','HEAD'].includes(method)?undefined:raw??JSON.stringify(body)}),env);
}
try{
 assert.equal((await req(null)).status,401);
 assert.equal((await req('a',undefined,undefined,undefined,'https://evil.test')).status,403);
 for(const body of [{},{state:{}},null,[],{state:{...state,l:{ocak:41}}}])assert.equal((await req('a',undefined,undefined,body)).status,400);
 assert.equal((await req('a',undefined,undefined,undefined,undefined,'not-json')).status,400);
 assert.equal((await req('a',undefined,undefined,{state:{...state,notes:'x'.repeat(500000)}})).status,413);
 assert.equal((await req('a',undefined,undefined,{state:{...state,notes:'ş'.repeat(260000)}})).status,413);
 assert.equal((await req('a',undefined,'GET')).status,405);
 assert.equal((await req('a',undefined,'PUT')).status,405);
 assert.equal((await req('a','/api/save/backups','POST')).status,405);
 assert.equal((await req('a','/api/save','PUT',{state,baseRevision:0})).status,200);
 assert.equal((await req('a','/api/save','PUT',{state:{...state,l:{...state.l,ocak:7}},baseRevision:1})).status,200);
 const alternative={...state,l:{...state.l,ocak:5},q:{k:'sifa',left:90,tot:100},q2:{k:'yurt',left:30,tot:120}};
 const saved=await(await req('a',undefined,undefined,{state:alternative,reason:'automatic-conflict'})).json();
 assert.equal(typeof saved.recoveryId,'string');assert.equal(saved.updatedAt,now);
 let backups=(await(await req('a','/api/save/backups','GET')).json()).backups;
 assert.equal(backups.length,2);assert.equal(backups[0].id,saved.recoveryId);assert.equal(backups[0].source,'recovery');assert.equal(backups[0].state.l.ocak,5);assert.equal(backups[0].state.q2.k,'yurt');assert.equal(backups[1].source,'revision');assert.equal(backups[1].state.l.ocak,6);assert.ok(backups[0].updated_at>backups[1].updated_at);assert.ok(!JSON.stringify(backups).includes('user_id'));
 let canonical=(await(await req('a','/api/save','GET')).json()).save;assert.equal(canonical.revision,2);assert.equal(canonical.state.l.ocak,7);
 assert.deepEqual((await(await req('b','/api/save/backups','GET')).json()).backups,[]);
 await req('b',undefined,undefined,{state:{...state,boyName:'Only B'}});
 backups=(await(await req('a','/api/save/backups','GET')).json()).backups;assert.ok(!backups.some(row=>row.state.boyName==='Only B'));
 for(let i=0;i<25;i++)assert.equal((await req('a',undefined,undefined,{state:{...alternative,recoveryIndex:i}})).status,200);
 const rows=(await env.DB.prepare('SELECT snapshot FROM game_save_recovery WHERE user_id=?').bind('a').all()).results;
 assert.equal(rows.length,20);const indexes=rows.map(row=>JSON.parse(row.snapshot).recoveryIndex);assert.equal(Math.min(...indexes),5);assert.equal(Math.max(...indexes),24);
 assert.equal((await env.DB.prepare('SELECT id FROM game_save_recovery WHERE user_id=?').bind('b').all()).results.length,1);
 backups=(await(await req('a','/api/save/backups','GET')).json()).backups;assert.equal(backups.length,20);assert.equal(backups[0].state.recoveryIndex,24);assert.equal(backups.at(-1).state.recoveryIndex,5);assert.ok(backups.every((row,i)=>i===0||backups[i-1].updated_at>=row.updated_at));
 canonical=(await(await req('a','/api/save','GET')).json()).save;assert.equal(canonical.revision,2);assert.equal(canonical.state.l.ocak,7);
 console.log('PASS: recovery archives authenticated/isolated, validated and byte-bounded, same-origin only, newest20 retained, normal/recovery backups merged, canonical CAS/world left intact.');
}finally{Date.now=realNow;env.DB.close();}
