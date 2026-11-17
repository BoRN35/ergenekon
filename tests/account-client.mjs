import vm from 'node:vm';import fs from 'node:fs';import assert from 'node:assert/strict';import worker from '../worker/index.js';import {localDB} from './api.mjs';
const env={DB:localDB(),ASSETS:{fetch(){return new Response('asset')}}};
const base={l:{ocak:1,oba:0},r:{odun:200,et:120,demir:0},ch:{lv:1,inv:[],xp:0},stat:{kills:0},t:Date.now()};
const source=fs.readFileSync(new URL('../src/account-save.js',import.meta.url),'utf8');
const marker=(at,id)=>({actionAt:at,actionId:id});
function device(uid,local=null,meta=null,offline=false){
 const storage=new Map(),elements=new Map(),timeouts=new Map(),intervals=new Map(),requests=[],events={document:new Map(),window:new Map()};let timerId=0,now=Date.now(),held=null,holdNextPut=false,heldRecovery=null,confirmCalls=0;
 if(local)storage.set('game',JSON.stringify(local));if(meta)storage.set('game_account_sync',JSON.stringify(meta));
 function element(tag){return{tag,children:[],className:'',textContent:'',append(...children){this.children.push(...children);for(const child of children)if(child.id)elements.set(child.id,child)},remove(){elements.delete(this.id)}}}
 function listen(kind,type,fn){const map=events[kind];if(!map.has(type))map.set(type,[]);map.get(type).push(fn)}
 class Clock extends Date{static now(){return now}}
 const body=element('body'),control={offline};
 const ctx={KEY:'game',ACCOUNT_BOOT_RAW:local?JSON.stringify(local):null,s:structuredClone(local||base),TST:false,LOCAL_SAVE:{ok:true},console,JSON,Date:Clock,AbortSignal,TextEncoder,crypto:globalThis.crypto,
  confirm(){confirmCalls++;throw Error('Automatic saves must not ask for confirmation')},prompt(){throw Error('Automatic saves must not prompt')},esc:x=>x,
  setTimeout(fn,delay=0){const id=++timerId;timeouts.set(id,{fn,delay});return id},clearTimeout(id){timeouts.delete(id)},setInterval(fn,delay){const id=++timerId;intervals.set(id,{fn,delay});return id},clearInterval(id){intervals.delete(id)},addEventListener(type,fn){listen('window',type,fn)},
  document:{body,hidden:false,querySelectorAll(){return[]},getElementById(id){return elements.get(id)},createElement:element,addEventListener(type,fn){listen('document',type,fn)}},
  localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},fresh:()=>structuredClone(base),mig(){},render(){},add(){},actionSave(){},
  save(){ctx.s.t=now;storage.set('game',JSON.stringify(ctx.s))},applyCloud(raw){ctx.s=JSON.parse(raw);ctx.save()},
  async fetch(path,options={}){
   const record={path,...options};requests.push(record);if(control.offline)throw Error('Offline');
   const dispatch=async()=>{const response=await worker.fetch(new Request('https://game.test'+path,{...options,headers:{...options.headers,'oai-authenticated-user-id':uid}}),env);record.status=response.status;return response};
   if(control.holdRecovery&&path==='/api/save/recovery'){return new Promise((resolve,reject)=>{heldRecovery=()=>dispatch().then(resolve,reject)})}
   if(holdNextPut&&path==='/api/save'&&options.method==='PUT'){holdNextPut=false;return new Promise((resolve,reject)=>{held=()=>dispatch().then(resolve,reject)})}return dispatch();
  }
 };
 ctx.window=ctx;vm.createContext(ctx);vm.runInContext(source,ctx);
 return{ctx,storage,elements,body,timeouts,intervals,requests,control,get confirmCalls(){return confirmCalls},advance(ms=1000){now+=ms},emit(kind,type){for(const fn of events[kind].get(type)||[])fn({type})},runTimers(delay){for(let loops=0;loops<100;loops++){const entries=[...timeouts].filter(([,value])=>value.delay<=delay);if(!entries.length)return;for(const[id,value]of entries){if(!timeouts.delete(id))continue;value.fn()}}throw Error('Timer loop exceeded')},releaseRecovery(){assert.ok(heldRecovery);control.holdRecovery=false;const fn=heldRecovery;heldRecovery=null;fn()},heartbeat(){for(const {fn,delay}of intervals.values())if(delay===1000)fn()},holdPut(){holdNextPut=true},release(){assert.ok(held,'A held PUT must exist');const fn=held;held=null;fn()}};
}
async function idle(d){for(let i=0;i<100;i++){await new Promise(resolve=>setImmediate(resolve));if(!d.ctx.ACCOUNT_SAVE.initializing&&!d.ctx.ACCOUNT_SAVE.busy&&!d.ctx.ACCOUNT_SAVE.resolving){await new Promise(resolve=>setImmediate(resolve));await new Promise(resolve=>setImmediate(resolve));return}}throw Error('Account client did not settle')}
async function api(uid,method='GET',body,path='/api/save'){return worker.fetch(new Request('https://game.test'+path,{method,headers:{'oai-authenticated-user-id':uid,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined}),env)}
async function canonical(uid){return(await(await api(uid)).json()).save}
async function seed(uid,state,revision=0){const response=await api(uid,'PUT',{state,baseRevision:revision});assert.equal(response.status,200);return(await response.json()).revision}
function noPrompts(d){assert.equal(d.confirmCalls,0);assert.equal(d.ctx.ACCOUNT_SAVE.conflict,false);assert.equal(d.elements.has('account-conflict'),false);assert.equal(d.elements.has('account-loading'),false);assert.equal(d.body.children.length,0)}
try{
 const existing={...structuredClone(base),l:{ocak:9,oba:5},q:{k:'sifa',left:100,tot:200},q2:{k:'yurt',left:50,tot:300}};
 const first=device('owner',existing);await idle(first);assert.equal(first.ctx.ACCOUNT_SAVE.ready,true);assert.equal((await canonical('owner')).state.l.ocak,9);assert.equal(first.ctx.ACCOUNT_SAVE.revision,1);noPrompts(first);
 const second=device('owner');await idle(second);assert.equal(second.ctx.s.l.ocak,9);assert.equal(second.ctx.s.q2.k,'yurt');assert.equal(second.ctx.s.q.left,100);assert.equal(second.requests.filter(r=>r.path==='/api/save'&&r.method==='PUT').length,0);assert.equal(second.requests.filter(r=>r.path==='/api/save/recovery').length,0);noPrompts(second);
 const other=device('other',existing,{userId:'owner',revision:1});await idle(other);assert.equal(other.ctx.s.l.ocak,1);assert.equal((await canonical('other')).state.l.ocak,1);assert.ok(other.storage.has('game_before_other_account'));noPrompts(other);

 // A newer server action wins whole state despite stale local progress/resource maxima and a newer passive save timestamp.
 await seed('remote-wins',{...structuredClone(base),l:{ocak:6,oba:5},_autosave:marker(100,'base')});
 const stale=device('remote-wins');await idle(stale);const oldRevision=stale.ctx.ACCOUNT_SAVE.revision;
 await seed('remote-wins',{...structuredClone(base),l:{ocak:4,oba:0},r:{odun:7,et:2,demir:0},_autosave:marker(300,'server-action')},oldRevision);
 stale.ctx.s.l.ocak=12;stale.ctx.s.r.odun=9000;stale.ctx.s._autosave=marker(200,'stale-action');stale.advance(100000);
 const putsBefore=stale.requests.filter(r=>r.path==='/api/save'&&r.method==='PUT').length;
 stale.control.holdRecovery=true;await stale.ctx.cloudSave(true);await idle(stale);assert.equal(stale.ctx.s.l.ocak,4);assert.equal(stale.ctx.s.r.odun,7);assert.equal(stale.ctx.s._autosave.actionId,'server-action');assert.equal(stale.ctx.ACCOUNT_SAVE.revision,oldRevision+1);assert.equal(stale.requests.filter(r=>r.path==='/api/save'&&r.method==='PUT').length,putsBefore+1);assert.ok(stale.storage.has('game_before_conflict_local'));assert.ok(stale.storage.has('game_before_conflict_remote'));assert.equal(JSON.parse(stale.storage.get('game_auto_recovery')).length,1);stale.releaseRecovery();await idle(stale);noPrompts(stale);
 stale.advance(2000);stale.heartbeat();await idle(stale);assert.equal((await canonical('remote-wins')).state._autosave.actionId,'server-action');assert.equal((await canonical('remote-wins')).state.r.odun,7);
 const archives=(await(await api('remote-wins','GET',undefined,'/api/save/backups')).json()).backups;assert.ok(archives.some(row=>row.source==='recovery'&&row.state.r.odun===9000));

 // A newer local action may deliberately spend/reset to lower values; CAS retries preserve the complete local snapshot.
 await seed('local-wins',{...structuredClone(base),l:{ocak:6,oba:5},_autosave:marker(100,'base')});
 const newer=device('local-wins');await idle(newer);const beforeLocal=newer.ctx.ACCOUNT_SAVE.revision;
 await seed('local-wins',{...structuredClone(base),l:{ocak:10,oba:5},r:{odun:8000,et:500,demir:90},_autosave:marker(300,'remote')},beforeLocal);
 newer.ctx.s.l.ocak=3;newer.ctx.s.l.oba=0;newer.ctx.s.r={odun:3,et:1,demir:0};newer.ctx.s._autosave=marker(400,'intentional-reset');
 await newer.ctx.cloudSave(true);await idle(newer);const localWon=await canonical('local-wins');assert.equal(localWon.state.l.ocak,3);assert.equal(localWon.state.l.oba,0);assert.equal(localWon.state.r.odun,3);assert.equal(localWon.state._autosave.actionId,'intentional-reset');assert.equal(localWon.revision,beforeLocal+2);noPrompts(newer);

 // A failed initial GET must later reconcile the latest live state, rather than the original empty boot draft.
 await seed('offline-start',{...structuredClone(base),l:{ocak:4,oba:0},_autosave:marker(10,'old-cloud')});
 const offline=device('offline-start',structuredClone(base),null,true);await idle(offline);assert.equal(offline.ctx.ACCOUNT_SAVE.ready,false);
 offline.emit('document','click');offline.ctx.s.l.ocak=8;offline.ctx.s.r.odun=4;offline.runTimers(0);assert.equal(JSON.parse(offline.storage.get('game')).l.ocak,8);assert.ok(offline.ctx.s._autosave.actionId);
 offline.control.offline=false;offline.emit('window','online');await idle(offline);assert.equal(offline.ctx.ACCOUNT_SAVE.ready,true);assert.equal((await canonical('offline-start')).state.l.ocak,8);assert.equal((await canonical('offline-start')).state.r.odun,4);noPrompts(offline);

 // Once connected, offline changes stay on-device immediately and flush on the online event.
 const disconnected=device('offline-put',{...structuredClone(base),l:{ocak:3,oba:0}});await idle(disconnected);disconnected.control.offline=true;
 disconnected.emit('document','change');disconnected.ctx.s.l.ocak=4;disconnected.ctx.s.r.odun=1;disconnected.runTimers(0);assert.equal(JSON.parse(disconnected.storage.get('game')).l.ocak,4);disconnected.runTimers(120);await idle(disconnected);assert.ok(disconnected.ctx.ACCOUNT_SAVE.error);assert.equal((await canonical('offline-put')).state.l.ocak,3);
 disconnected.control.offline=false;disconnected.emit('window','online');await idle(disconnected);assert.equal((await canonical('offline-put')).state.l.ocak,4);assert.equal((await canonical('offline-put')).state.r.odun,1);noPrompts(disconnected);

 // While a PUT is in flight, pagehide persists the newest state before queueing the next network write.
 const busy=device('busy',existing);await idle(busy);busy.holdPut();busy.ctx.s.notes='first in-flight snapshot';const pending=busy.ctx.cloudSave(true);await new Promise(resolve=>setImmediate(resolve));assert.equal(busy.ctx.ACCOUNT_SAVE.busy,true);
 busy.ctx.s.q2.left=321;busy.ctx.s._autosave=marker(Date.now(),'latest-close-action');busy.emit('window','pagehide');assert.equal(JSON.parse(busy.storage.get('game')).q2.left,321);assert.equal(busy.ctx.ACCOUNT_SAVE.queued,true);busy.release();await pending;await idle(busy);busy.runTimers(120);await idle(busy);assert.equal((await canonical('busy')).state.q2.left,321);
 assert.equal([...busy.intervals.values()].filter(t=>t.delay===1000).length,1);const heartbeatPuts=busy.requests.filter(r=>r.path==='/api/save'&&r.method==='PUT').length;busy.advance(2000);busy.heartbeat();await idle(busy);assert.equal(busy.requests.filter(r=>r.path==='/api/save'&&r.method==='PUT').length,heartbeatPuts+1);noPrompts(busy);

 // Closing directly after a UI handler finishes its action marker even before its0ms callback runs.
 const instant=device('instant-close',existing);await idle(instant);instant.emit('document','click');instant.ctx.s.r.odun=2;assert.equal(instant.ctx.s._autosave,undefined);instant.emit('window','pagehide');const closed=JSON.parse(instant.storage.get('game'));assert.equal(closed.r.odun,2);assert.ok(closed._autosave.actionId);await idle(instant);assert.equal((await canonical('instant-close')).state._autosave.actionId,closed._autosave.actionId);noPrompts(instant);
 const future=Date.now()+10000000;const monotonic=device('monotonic',{...structuredClone(base),nested:{t:1},_autosave:marker(future,'future-clock')});await idle(monotonic);monotonic.emit('document','keyup');monotonic.ctx.s.nested.t=2;monotonic.runTimers(0);assert.equal(monotonic.ctx.s._autosave.actionAt,future+1);assert.equal(JSON.parse(monotonic.storage.get('game')).nested.t,2);

 // Keepalive measures UTF8 bytes of the entire JSON envelope, including revision and multibyte text.
 busy.ctx.s.notes='ş'.repeat(32000);await busy.ctx.cloudSave(true);await idle(busy);let request=busy.requests.filter(r=>r.path==='/api/save'&&r.method==='PUT').at(-1);assert.ok(request.body.length<60000);assert.ok(new TextEncoder().encode(request.body).byteLength>60000);assert.equal(request.keepalive,false);assert.equal(request.status,200);
 busy.ctx.s.notes='small state';await busy.ctx.cloudSave(true);await idle(busy);request=busy.requests.filter(r=>r.path==='/api/save'&&r.method==='PUT').at(-1);assert.ok(new TextEncoder().encode(request.body).byteLength<60000);assert.equal(request.keepalive,true);
 await stale.ctx.cloudBak();await idle(stale);noPrompts(stale);
 console.log('PASS: prompt-free migration/restoration, account isolation, automatic whole-snapshot CAS conflicts, no resource maxima, latest-live offline retry, immediate local saves during busy/pagehide,1s heartbeat, online flush and UTF8 keepalive envelope budget.');
}finally{env.DB.close();}
