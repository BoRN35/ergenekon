import assert from 'node:assert/strict';import worker from '../worker/index.js';import {localDB} from './api.mjs';
const env={DB:localDB(),ASSETS:{fetch:()=>new Response('asset')}};
const state={l:{ocak:6,oba:5,sur:3},r:{odun:100,et:20,demir:2},ch:{lv:3},t:Date.now(),boyName:'Kök Börü'};
async function req(user,path='/api/world',method='GET',body){return worker.fetch(new Request('https://game.test'+path,{method,headers:{...(user?{'oai-authenticated-user-id':user}:{}),'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined}),env)}
assert.equal((await req(null)).status,401);assert.deepEqual((await(await req('a')).json()).players,[]);
let rev=0;for(let i=0;i<10;i++){const r=await(await req('a','/api/save','PUT',{state,baseRevision:rev})).json();rev=r.revision;}
let world=await(await req('a')).json();assert.equal(world.players.length,1);const first=world.players[0];assert.equal(world.self,first.id);assert.equal(first.name,'Kök Börü');assert.equal(first.obaLevel,5);assert.equal(first.x,0);assert.equal(first.z,0);assert.ok(!JSON.stringify(world).includes('user_id'));
await req('b','/api/save','PUT',{state:{...state,boyName:'İkinci boy'},baseRevision:0});const a=await(await req('a')).json(),b=await(await req('b')).json();assert.deepEqual(a.players,b.players);assert.notEqual(a.self,b.self);assert.equal(a.players[0].id,first.id);assert.equal(Math.max(Math.abs(a.players[1].x),Math.abs(a.players[1].z)),150);
await req('a','/api/save','PUT',{state:{...state,boyName:'Stale'},baseRevision:0});assert.equal((await(await req('a')).json()).players[0].name,'Kök Börü');
for(let i=0;i<30;i++)await req('p'+i,'/api/save','PUT',{state,baseRevision:0});world=await(await req('a')).json();const positions=new Set(world.players.map(p=>p.x+','+p.z));assert.equal(positions.size,32);assert.equal(world.players.length,32);assert.ok(world.players.every(p=>!('userId'in p)&&!('snapshot'in p)&&!('email'in p)));
console.log('PASS: authenticated shared world, empty means no fabricated players, stable public IDs/positions, no private profile leakage, identical map for two accounts, stale writes do not alter presence,32 unique positions.');env.DB.close();
