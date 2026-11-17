const json=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
function worldPosition(id){if(id===1)return{x:0,z:0};var n=id-1,k=Math.ceil((Math.sqrt(n+1)-1)/2),t=2*k,m=(2*k+1)**2-1,d=m-n,x,z;if(d<t){x=k-d;z=-k}else if(d<2*t){x=-k;z=-k+d-t}else if(d<3*t){x=-k+d-2*t;z=k}else{x=k;z=k-(d-3*t)}return{x:x*150,z:z*150}}
function valid(s){return s&&typeof s==='object'&&!Array.isArray(s)&&s.l&&s.r&&s.ch&&Object.values(s.l).every(v=>Number.isInteger(v)&&v>=0&&v<=40)&&Object.values(s.r).every(v=>typeof v==='number'&&Number.isFinite(v)&&v>=0)&&Number.isFinite(s.t);}
export default {async fetch(request,env){
 const url=new URL(request.url);
 if(!url.pathname.startsWith('/api/'))return env.ASSETS.fetch(request);
 const uid=request.headers.get('oai-authenticated-user-id');if(!uid)return json({error:'Hesap kaydı için giriş yapmalısın.'},401);
 if(!env.DB)return json({error:'Hesap kayıt hizmeti hazır değil.'},503);
 if(!['/api/save','/api/save/backups','/api/save/recovery','/api/world'].includes(url.pathname))return json({error:'Bulunamadı'},404);
 try{
  if(request.method==='GET'){
   if(url.pathname==='/api/save/recovery')return json({error:'Yöntem desteklenmiyor'},405);
   if(url.pathname==='/api/world'){
    const own=await env.DB.prepare('SELECT public_id FROM world_players WHERE user_id=?').bind(uid).first();
    const rows=await env.DB.prepare('SELECT id,public_id,name,level,oba_level,wall_level,updated_at FROM world_players ORDER BY id LIMIT 2000').all();
    return json({self:own?.public_id||null,players:rows.results.map(p=>({id:p.public_id,name:p.name||('Boy '+p.id),level:p.level,obaLevel:p.oba_level,wallLevel:p.wall_level,...worldPosition(p.id),updatedAt:p.updated_at})),serverTime:Date.now()});
   }
   if(url.pathname.endsWith('/backups')){
    const [normal,recovery]=await Promise.all([
     env.DB.prepare('SELECT revision,snapshot,updated_at FROM game_save_backups WHERE user_id=? ORDER BY revision DESC LIMIT 20').bind(uid).all(),
     env.DB.prepare('SELECT id,snapshot,created_at AS updated_at FROM game_save_recovery WHERE user_id=? ORDER BY created_at DESC,rowid DESC LIMIT 20').bind(uid).all()
    ]);
    const backups=[...recovery.results.map(row=>({...row,source:'recovery'})),...normal.results.map(row=>({...row,source:'revision'}))].sort((a,b)=>b.updated_at-a.updated_at).slice(0,20).map(row=>({...row,state:JSON.parse(row.snapshot),snapshot:undefined}));
    return json({userId:uid,backups});
   }
   const row=await env.DB.prepare('SELECT snapshot,revision,updated_at FROM game_saves WHERE user_id=?').bind(uid).first();return json({userId:uid,save:row?{state:JSON.parse(row.snapshot),revision:row.revision,updatedAt:row.updated_at}:null});
  }
  const recovery=request.method==='POST'&&url.pathname==='/api/save/recovery';
  if(!recovery&&(request.method!=='PUT'||url.pathname!=='/api/save'))return json({error:'Yöntem desteklenmiyor'},405);
  const origin=request.headers.get('origin');if(origin&&origin!==url.origin)return json({error:'Geçersiz kaynak'},403);
  if(Number(request.headers.get('content-length')||0)>500000)return json({error:'Kayıt boyutu sınırı aşıldı'},413);
  const text=await request.text();if(new TextEncoder().encode(text).byteLength>500000)return json({error:'Kayıt boyutu sınırı aşıldı'},413);
  let body;try{body=JSON.parse(text)}catch{return json({error:'Geçersiz kayıt'},400)}
  if(!body||typeof body!=='object'||Array.isArray(body)||!valid(body.state)||(!recovery&&(!Number.isSafeInteger(body.baseRevision)||body.baseRevision<0)))return json({error:'Geçersiz oyun kaydı'},400);
  const now=Date.now(),payload=JSON.stringify(body.state);
  if(recovery){
   const id=crypto.randomUUID();
   await env.DB.batch([
    env.DB.prepare('INSERT INTO game_save_recovery (id,user_id,snapshot,created_at) VALUES (?,?,?,?)').bind(id,uid,payload,now),
    env.DB.prepare('DELETE FROM game_save_recovery WHERE user_id=? AND id NOT IN (SELECT id FROM game_save_recovery WHERE user_id=? ORDER BY created_at DESC,rowid DESC LIMIT 20)').bind(uid,uid)
   ]);
   return json({userId:uid,recoveryId:id,updatedAt:now});
  }
  const rev=body.baseRevision;
  const result=await env.DB.batch([
   env.DB.prepare('INSERT OR IGNORE INTO game_save_backups (user_id,revision,snapshot,updated_at) SELECT user_id,revision,snapshot,updated_at FROM game_saves WHERE user_id=? AND revision=?').bind(uid,rev),
   env.DB.prepare('INSERT INTO game_saves (user_id,snapshot,revision,updated_at) SELECT ?,?,1,? WHERE ?=0 OR EXISTS(SELECT 1 FROM game_saves WHERE user_id=?) ON CONFLICT(user_id) DO UPDATE SET snapshot=excluded.snapshot,revision=game_saves.revision+1,updated_at=excluded.updated_at WHERE game_saves.revision=? RETURNING revision').bind(uid,payload,now,rev,uid,rev),
   env.DB.prepare('DELETE FROM game_save_backups WHERE user_id=? AND revision NOT IN (SELECT revision FROM game_save_backups WHERE user_id=? ORDER BY revision DESC LIMIT 50)').bind(uid,uid)
  ]);
  const saved=result[1].results?.[0];
  if(!saved){const row=await env.DB.prepare('SELECT snapshot,revision,updated_at FROM game_saves WHERE user_id=?').bind(uid).first();return json({error:'Başka bir cihazda daha yeni bir kayıt var.',userId:uid,save:row?{state:JSON.parse(row.snapshot),revision:row.revision,updatedAt:row.updated_at}:null},409);}
  try{const name=typeof body.state.boyName==='string'?body.state.boyName.replace(/[\x00-\x1f<>]/g,'').trim().slice(0,32):'';
   await env.DB.batch([env.DB.prepare('INSERT INTO world_players (user_id,public_id,name,level,oba_level,wall_level,updated_at) SELECT ?,?,?,?,?,?,? WHERE NOT EXISTS (SELECT 1 FROM world_players WHERE user_id=?)').bind(uid,crypto.randomUUID(),name,body.state.l.ocak||1,body.state.l.oba||0,body.state.l.sur||0,now,uid),env.DB.prepare('UPDATE world_players SET name=?,level=?,oba_level=?,wall_level=?,updated_at=? WHERE user_id=?').bind(name,body.state.l.ocak||1,body.state.l.oba||0,body.state.l.sur||0,now,uid)]);
  }catch(error){console.error('World presence failed',String(error?.message||error));}
  return json({userId:uid,revision:saved.revision,updatedAt:now});
 }catch(error){console.error('Account save failed',String(error?.message||error));return json({error:'Hesap kaydı şu anda yazılamadı. Bu cihazdaki kayıt korunuyor.'},503);}
}};
