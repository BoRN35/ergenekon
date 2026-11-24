(function(){
 const META=KEY+'_account_sync',RECOVERY=KEY+'_auto_recovery';let meta={};try{meta=JSON.parse(localStorage.getItem(META)||'{}')}catch{}
 const C={ready:false,busy:false,revision:0,userId:null,last:0,error:'',conflict:false,queued:false,initializing:false,resolving:false};window.ACCOUNT_SAVE=C;
 let timer=null,maxTimer=null,lastPayload='',recoveryBusy=false,pendingActionBefore=null,logicalActionAt=Number(s._autosave?.actionAt)||0;
 const clone=value=>JSON.parse(JSON.stringify(value));
 const uuid=()=>globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
 function metaSave(state){meta={userId:C.userId,revision:C.revision,savedTime:state?.t||Date.now()};try{localStorage.setItem(META,JSON.stringify(meta))}catch{}}
 function preserve(value,label='local'){try{localStorage.setItem(KEY+'_before_'+label,JSON.stringify(value))}catch{}}
 function signature(value){return JSON.stringify({...value,t:undefined,_autosave:undefined})}
 function stamp(){logicalActionAt=Math.max(Date.now(),logicalActionAt+1,(Number(s._autosave?.actionAt)||0)+1);s._autosave={actionAt:logicalActionAt,actionId:uuid()};}
 function compareIntent(local,remote){const a=local?._autosave,b=remote?._autosave;const delta=(Number(a?.actionAt)||0)-(Number(b?.actionAt)||0);return delta||String(a?.actionId||'').localeCompare(String(b?.actionId||''));}
 function badge(){document.querySelectorAll('.save-state').forEach(e=>{e.textContent=C.error?'⚠ Cihazda kayıtlı · Hesap bağlantısı bekleniyor':C.resolving?'☁ Kayıt otomatik eşitleniyor…':C.busy?'☁ Hesaba kaydediliyor…':C.ready&&C.last?'☁ Hesabına kaydedildi':C.ready?'☁ Otomatik kayıt açık':'☁ Cihazda kayıtlı · Hesaba bağlanıyor…';e.title=C.error||('Cihaz kaydı '+(LOCAL_SAVE.ok?'açık':'yazılamadı')+(C.last?' · Son hesap kaydı '+new Date(C.last).toLocaleTimeString('tr-TR'):''));e.classList.toggle('save-error',Boolean(C.error));});}
 window.saveBadge=badge;
 async function api(path,options={}){const response=await fetch(path,{credentials:'same-origin',cache:'no-store',...options,signal:AbortSignal.timeout(12000)});if(response.status===404){C.noApi=Date.now();}let body;try{body=await response.json()}catch{throw Error('Hesap kaydına ulaşılamadı. Cihazdaki ilerleme korunuyor.')}if(!response.ok&&response.status!==409)throw Error(body.error||'Hesap kaydı yazılamadı');return {body,status:response.status};}
 function apply(state,message){preserve(s,'account_load');window.applyCloud(JSON.stringify(state),message);lastPayload='';}
 function recoveries(){try{return JSON.parse(localStorage.getItem(RECOVERY)||'[]')}catch{return[]}}
 function archive(local,remote,reason){preserve(local,'conflict_local');preserve(remote,'conflict_remote');const entries=recoveries();entries.push({id:uuid(),userId:C.userId,state:clone(local),reason});while(entries.length>3)entries.shift();try{localStorage.setItem(RECOVERY,JSON.stringify(entries))}catch{} }
 async function flushRecovery(){if(recoveryBusy||!C.userId)return;const entries=recoveries().filter(entry=>entry.userId===C.userId);if(!entries.length)return;recoveryBusy=true;try{for(const entry of entries){await api('/api/save/recovery',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:entry.state,reason:entry.reason})});const remaining=recoveries().filter(value=>value.id!==entry.id);try{localStorage.setItem(RECOVERY,JSON.stringify(remaining))}catch{}}}catch{/* Keep the on-device archive and retry automatically. */}finally{recoveryBusy=false;}}
 // Resolve complete snapshots. Never merge resource maxima: spending and resets are valid changes.
 async function reconcile(remote,reason){const local=clone(s);if(window.ACCOUNT_BOOT_RAW||meta.userId||local._autosave)archive(local,remote.state,reason);C.resolving=true;badge();flushRecovery();const useLocal=compareIntent(local,remote.state)>0;logicalActionAt=Math.max(logicalActionAt,Number(remote.state._autosave?.actionAt)||0);C.revision=remote.revision;C.last=remote.updatedAt;C.ready=true;if(!useLocal){apply(remote.state,'☁️ Hesap kaydın otomatik eşitlendi.');metaSave(s);}C.resolving=false;C.error='';return useLocal;}
 async function init(){if(C.initializing||C.ready)return;if(C.noApi&&Date.now()-C.noApi<600000)return;C.initializing=true;badge();try{const {body}=await api('/api/save');C.userId=body.userId;const remote=body.save;let adoptedRemote=false;
 if(meta.userId&&meta.userId!==C.userId){preserve(s,'other_account');if(remote)apply(remote.state,'☁️ Bu hesaba ait ilerleme yüklendi.');else{window.s=fresh();mig();save();render();}C.revision=remote?.revision||0;C.last=remote?.updatedAt||0;}
 else if(remote){C.revision=remote.revision;C.last=remote.updatedAt;
  if(meta.userId===C.userId&&meta.revision===remote.revision){/* Keep unsynced changes based on the same account revision. */}
  else adoptedRemote=!(await reconcile(remote,'Cihaz açılışında otomatik eşitleme'));
 }else C.revision=0;
 C.ready=true;C.error='';badge();if(!adoptedRemote)await saveCloud(true);flushRecovery();
 }catch(error){C.error=String(error.message||error);badge();}finally{C.initializing=false;}}
 async function saveCloud(force=false){finishActions();save();if(TST)return;if(!C.ready){init();return;}if(C.busy){C.queued=true;return;}if(!force&&Date.now()-C.last<750)return;
 let state=clone(s),payload=JSON.stringify(state);if(new TextEncoder().encode(payload).byteLength>480000){C.error='Kayıt boyutu sınırı aşıldı; cihaz yedeğin korunuyor.';badge();return;}if(payload===lastPayload)return;C.busy=true;C.error='';badge();let adoptedRemote=false;
 try{for(let attempt=0;attempt<3;attempt++){
  state=clone(s);payload=JSON.stringify(state);const bodyText=JSON.stringify({baseRevision:C.revision,state});const {body,status}=await api('/api/save',{method:'PUT',headers:{'Content-Type':'application/json'},body:bodyText,keepalive:new TextEncoder().encode(bodyText).byteLength<60000});
  if(status===409){if(!body.save)throw Error('Hesap kaydı yeniden bağlanıyor; cihaz kaydı korunuyor.');if(await reconcile(body.save,'Aynı hesapta eşzamanlı kayıt'))continue;adoptedRemote=true;C.queued=false;break;}
  C.userId=body.userId;C.revision=body.revision;C.last=body.updatedAt;lastPayload=payload;metaSave(state);C.error='';flushRecovery();break;
 }}catch(error){C.error=String(error.message||error)}finally{C.busy=false;C.resolving=false;badge();if(C.queued&&!adoptedRemote){C.queued=false;soon();}}}
 function soon(){clearTimeout(timer);timer=setTimeout(flush,120);if(!maxTimer)maxTimer=setTimeout(flush,700);}
 function flush(){clearTimeout(timer);clearTimeout(maxTimer);timer=null;maxTimer=null;saveCloud(true);}
 window.cloudSave=saveCloud;window.cloudInit=init;
 window.cloudLine=function(){return C.error?'☁️ Cihaz kaydı açık; hesap bağlantısı yeniden deneniyor.':C.ready?'☁️ Otomatik hesap kaydı açık. Değişiklikler ve çakışmalar onay sorulmadan eşitlenir.'+(C.last?' Son kayıt: '+new Date(C.last).toLocaleTimeString('tr-TR'):''):'☁️ Cihaz kaydı açık; hesaba bağlanıyor…';};
 window.cloudBak=async function(){try{const {body}=await api('/api/save/backups');const backup=body.backups[0];if(!backup){add('☁️ Henüz hesap yedeği yok.');render();return;}archive(s,backup.state,'Yedekten geri yükleme öncesi');apply(backup.state,'☁️ Hesap yedeği yüklendi.');stamp();save();await saveCloud(true);}catch(error){C.error=error.message;badge()}};
 // Capture before a UI action and inspect after its handlers. Passive ticks never become user intent.
 function finishActions(){if(pendingActionBefore!==null){if(signature(s)!==pendingActionBefore)stamp();pendingActionBefore=null;}}
 function afterAction(){if(pendingActionBefore===null)pendingActionBefore=signature(s);setTimeout(()=>{finishActions();save();soon();},0);}
 ['click','change','keyup'].forEach(type=>document.addEventListener(type,afterAction,true));
 const originalActionSave=window.actionSave;window.actionSave=function(){originalActionSave();soon()};
 function background(){finishActions();save();saveCloud(true);}
 document.addEventListener('visibilitychange',()=>{if(document.hidden)background();else if(C.ready)saveCloud(true);else init()});window.addEventListener('pagehide',background);
 window.addEventListener('online',()=>{if(C.ready)saveCloud(true);else init();flushRecovery()});
 setInterval(()=>{save();if(C.ready)saveCloud(false);else init()},1000);
 // Existing local saves are available immediately; account checks never ask for a save choice.
 init();
})();
