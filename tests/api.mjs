import {DatabaseSync} from 'node:sqlite';import fs from 'node:fs';import worker from '../worker/index.js';import assert from 'node:assert/strict';
export function localDB(filename=':memory:'){const db=new DatabaseSync(filename);for(const name of fs.readdirSync(new URL('../drizzle/',import.meta.url)).filter(n=>n.endsWith('.sql')).sort())db.exec(fs.readFileSync(new URL('../drizzle/'+name,import.meta.url),'utf8').replaceAll('--> statement-breakpoint',''));const wrap=(sql,args=[])=>({bind(...values){return wrap(sql,values)},async first(){return db.prepare(sql).get(...args)||null},async all(){return {results:db.prepare(sql).all(...args)}},sql,args});return {prepare:sql=>wrap(sql),async batch(statements){db.exec('BEGIN IMMEDIATE');try{const result=statements.map(s=>({results:db.prepare(s.sql).all(...s.args)}));db.exec('COMMIT');return result}catch(e){db.exec('ROLLBACK');throw e}},close:()=>db.close()}}
if(process.argv[1]===import.meta.filename){
const env={DB:localDB(),ASSETS:{fetch:()=>new Response('asset')}};
const state={l:{ocak:6,yurt:3},r:{odun:500,et:120,demir:20},ch:{lv:4},t:Date.now()};
async function req(method='GET',user='a',body,origin='https://game.test',path='/api/save'){return worker.fetch(new Request('https://game.test'+path,{method,headers:{...(user?{'oai-authenticated-user-id':user}:{}),origin,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined}),env)}
assert.equal((await req('GET',null)).status,401);assert.equal((await req()).status,200);assert.equal((await(await req()).json()).save,null);
assert.equal((await req('PUT','a',{baseRevision:4,state})).status,409);
let r=await req('PUT','a',{baseRevision:0,state});assert.equal(r.status,200);assert.equal((await r.json()).revision,1);
assert.equal((await(await req('GET','b')).json()).save,null);
assert.equal((await req('PUT','a',{baseRevision:0,state:{...state,l:{ocak:1}}})).status,409);assert.equal((await(await req()).json()).save.state.l.ocak,6);
assert.equal((await req('PUT','a',{baseRevision:1,state},'https://evil.test')).status,403);
assert.equal((await req('PUT','a',{baseRevision:1,state:{}})).status,400);
r=await req('PUT','a',{baseRevision:1,state:{...state,l:{ocak:7}}});assert.equal((await r.json()).revision,2);
assert.equal((await(await req('GET','a',undefined,undefined,'/api/save/backups')).json()).backups[0].state.l.ocak,6);
assert.equal((await(await req()).json()).save.state.l.ocak,7);
console.log('PASS: identity isolation, validation, same-origin writes, initial revision, stale write rejection, atomic revision updates, backups.');env.DB.close();}
