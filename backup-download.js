/* The private account snapshot is added in the signed-in browser, never to a public asset. */
const utf8 = new TextEncoder();
const crcTable = Array.from({length:256},(_,index)=>{let value=index;for(let bit=0;bit<8;bit++)value=value&1?0xedb88320^(value>>>1):value>>>1;return value>>>0});
export function crc32(bytes){let crc=0xffffffff;for(const value of bytes)crc=crcTable[(crc^value)&255]^(crc>>>8);return (crc^0xffffffff)>>>0}
export function encodeSave(state){const bytes=utf8.encode(JSON.stringify(state));let binary='';for(let i=0;i<bytes.length;i+=32768)binary+=String.fromCharCode(...bytes.subarray(i,i+32768));return btoa(binary)}
export function validSave(state){return !!(state&&typeof state==='object'&&!Array.isArray(state)&&state.l&&state.r&&state.ch&&Number.isFinite(state.t)&&Object.values(state.l).every(v=>Number.isInteger(v)&&v>=0&&v<=40)&&Object.values(state.r).every(v=>typeof v==='number'&&Number.isFinite(v)&&v>=0))}
async function directory(base){
 if(!(base instanceof Blob)||base.size<22)throw Error('Proje arşivi eksik. Yeniden dene.');
 const start=Math.max(0,base.size-65557),tail=new Uint8Array(await base.slice(start).arrayBuffer()),view=new DataView(tail.buffer);let found=-1;
 for(let i=tail.length-22;i>=0;i--)if(view.getUint32(i,true)===0x06054b50&&i+22+view.getUint16(i+20,true)===tail.length){found=i;break}
 if(found<0)throw Error('ZIP son kaydı doğrulanamadı.');
 const count=view.getUint16(found+10,true),size=view.getUint32(found+12,true),offset=view.getUint32(found+16,true);
 if(view.getUint16(found+4,true)||view.getUint16(found+6,true)||view.getUint16(found+8,true)!==count||count===65535||offset+size!==start+found)throw Error('Desteklenmeyen veya eksik ZIP arşivi.');
 const central=new Uint8Array(await base.slice(offset,offset+size).arrayBuffer()),cv=new DataView(central.buffer);let position=0;const names=new Set();
 for(let i=0;i<count;i++){
  if(position+46>central.length||cv.getUint32(position,true)!==0x02014b50)throw Error('ZIP dosya listesi doğrulanamadı.');
  const n=cv.getUint16(position+28,true),extra=cv.getUint16(position+30,true),comment=cv.getUint16(position+32,true),end=position+46+n+extra+comment;
  if(end>central.length)throw Error('ZIP dosya listesi eksik.');
  names.add(new TextDecoder().decode(central.subarray(position+46,position+46+n)));position=end;
 }
 if(position!==central.length)throw Error('ZIP dosya listesi tutarsız.');
 return {count,central,names,comment:tail.slice(found+22)};
}
export async function appendZipFiles(base,files){
 const original=await directory(base),locals=[],entries=[];let offset=base.size;
 if(original.count+files.length>=65535)throw Error('ZIP dosya sayısı sınırı aşıldı.');
 const now=new Date(),year=Math.max(1980,Math.min(2107,now.getFullYear())),day=((year-1980)<<9)|((now.getMonth()+1)<<5)|now.getDate(),time=(now.getHours()<<11)|(now.getMinutes()<<5)|(now.getSeconds()>>>1);
 for(const file of files){
  if(!file.name||file.name.startsWith('/')||file.name.includes('\\')||file.name.includes('\0')||file.name.split('/').some(p=>p==='..')||original.names.has(file.name))throw Error('Geçersiz veya tekrarlanan ZIP dosya adı.');
  original.names.add(file.name);const name=utf8.encode(file.name),data=typeof file.data==='string'?utf8.encode(file.data):new Uint8Array(file.data);
  if(name.length>65535||offset+data.length+name.length+30>=0xffffffff)throw Error('ZIP boyutu sınırı aşıldı.');
  const crc=crc32(data),local=new Uint8Array(30+name.length),lv=new DataView(local.buffer);
  lv.setUint32(0,0x04034b50,true);lv.setUint16(4,20,true);lv.setUint16(6,0x800,true);lv.setUint16(10,time,true);lv.setUint16(12,day,true);lv.setUint32(14,crc,true);lv.setUint32(18,data.length,true);lv.setUint32(22,data.length,true);lv.setUint16(26,name.length,true);local.set(name,30);
  const central=new Uint8Array(46+name.length),cv=new DataView(central.buffer);
  cv.setUint32(0,0x02014b50,true);cv.setUint16(4,20,true);cv.setUint16(6,20,true);cv.setUint16(8,0x800,true);cv.setUint16(12,time,true);cv.setUint16(14,day,true);cv.setUint32(16,crc,true);cv.setUint32(20,data.length,true);cv.setUint32(24,data.length,true);cv.setUint16(28,name.length,true);cv.setUint32(42,offset,true);central.set(name,46);
  locals.push(local,data);entries.push(central);offset+=local.length+data.length;
 }
 const centralSize=original.central.length+entries.reduce((n,entry)=>n+entry.length,0),end=new Uint8Array(22+original.comment.length),ev=new DataView(end.buffer),count=original.count+files.length;
 ev.setUint32(0,0x06054b50,true);ev.setUint16(8,count,true);ev.setUint16(10,count,true);ev.setUint32(12,centralSize,true);ev.setUint32(16,offset,true);ev.setUint16(20,original.comment.length,true);end.set(original.comment,22);
 return new Blob([base,...locals,original.central,...entries,end],{type:'application/zip'});
}
async function account(){
 const response=await fetch('/api/save',{credentials:'same-origin',cache:'no-store',signal:AbortSignal.timeout(15000)});if(!response.ok)throw Error('Hesap kaydına ulaşılamadı. Önce oyunu hesabınla aç, sonra yeniden dene.');
 const body=await response.json();if(!body.save||!validSave(body.save.state)||!Number.isSafeInteger(body.save.revision)||!Number.isFinite(body.save.updatedAt))throw Error('Hesabında doğrulanmış bir oyun kaydı bulunamadı.');
 return body.save;
}
async function sourceZip(onProgress){
 const response=await fetch('./downloads/project-manifest.json',{credentials:'same-origin',cache:'no-store',signal:AbortSignal.timeout(15000)});if(!response.ok)throw Error('Proje indirme bilgisi alınamadı.');
 const manifest=await response.json();if(!Array.isArray(manifest.parts)||manifest.parts.length<1)throw Error('Proje indirme bilgisi eksik.');
 const parts=[];let completed=0;
 for(const part of manifest.parts){
  if(!/^project-[0-9]+\.part$/.test(part.file))throw Error('Geçersiz proje dosyası.');
  const result=await fetch('./downloads/'+part.file,{credentials:'same-origin',cache:'no-store',signal:AbortSignal.timeout(240000)});if(!result.ok)throw Error('Proje dosyası indirilemedi. Yeniden dene.');
  let blob;if(result.body){const reader=result.body.getReader(),chunks=[];let bytes=0;for(;;){const {value,done}=await reader.read();if(done)break;chunks.push(value);bytes+=value.byteLength;if(bytes>part.bytes){await reader.cancel();throw Error('Proje dosyası boyutu doğrulanamadı.')}onProgress((completed+bytes)/manifest.bytes,completed+bytes,manifest.bytes)}blob=new Blob(chunks)}else blob=await result.blob();
  if(blob.size!==part.bytes)throw Error('İndirme tamamlanmadı. Yeniden dene.');
  const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',await blob.arrayBuffer()))).map(v=>v.toString(16).padStart(2,'0')).join('');
  if(digest!==part.sha256)throw Error('İndirilen dosyanın doğrulaması başarısız. Yeniden dene.');
  parts.push(blob);completed+=blob.size;onProgress(completed/manifest.bytes,completed,manifest.bytes);
 }
 if(completed!==manifest.bytes)throw Error('Proje arşivi eksik indirildi.');
 return {blob:new Blob(parts,{type:'application/zip'}),manifest};
}
function snapshotFiles(save,manifest){
 const state=save.state,raw=JSON.stringify(state),at=new Date(save.updatedAt).toISOString(),prefix='ergenekon/hesap-yedegi/';
 const files=[{name:prefix+'oyun-kaydi.json',data:raw},{name:prefix+'kayit-kodu.txt',data:encodeSave(state)},{name:prefix+'yedek-bilgisi.json',data:JSON.stringify({format:'ergenekon-account-backup-v1',revision:save.revision,savedAtUtc:at,exportedAtUtc:new Date().toISOString(),projectSourceCommit:manifest.sourceCommit,buildings:state.l},null,2)},{name:'ergenekon/HESAP-YEDEGI-OKU.txt',data:'Bu ZIP proje dosyalarıyla birlikte hesabının oyun kaydını içerir.\n\nGeri yükleme:\n1. Oyunu aç.\n2. Oba Düzeni > Kayıt ve bulut bölümüne git.\n3. hesap-yedegi/kayit-kodu.txt içeriğini kayıt alanına yapıştır.\n4. Kaydı içe aktar düğmesine bas.\n\noyun-kaydi.json doğrudan oyun state dosyasıdır. JSON içine metadata eklenmemiştir. Kaydın asıl _autosave bilgisi korunmuştur.\nNormal bulut eşitlemesi daha yeni ilerlemeyi koruyabilir; bu ZIP bulut kaydını zorla değiştirmez.\nProje README belgesindeki genel ZIP açıklamasına ek olarak bu pakette hesap-yedegi klasörü de vardır.\nHesap parolası veya oturum anahtarı ZIP içinde bulunmaz.\n'}];
 return files;
}
if(typeof document!=='undefined'){
 const status=document.getElementById('download-status'),progress=document.getElementById('download-progress'),buttons=Array.from(document.querySelectorAll('[data-download]'));
 async function download(withAccount){
  buttons.forEach(b=>b.disabled=true);status.classList.remove('error');progress.hidden=false;progress.value=0;
  try{
   if(withAccount){status.textContent='Hesabın doğrulanıyor…';await account()}
   status.textContent='Proje dosyaları hazırlanıyor…';
   const {blob,manifest}=await sourceZip((fraction,bytes,total)=>{progress.value=Math.round(fraction*90);status.textContent='Dosyalar indiriliyor: '+(bytes/1048576).toFixed(1)+' / '+(total/1048576).toFixed(1)+' MB'});
   let zip=blob,save;if(withAccount){status.textContent='Güncel hesap kaydın ZIP’e ekleniyor…';save=await account();zip=await appendZipFiles(blob,snapshotFiles(save,manifest))}
   const link=document.createElement('a'),url=URL.createObjectURL(zip);link.href=url;link.download=withAccount?'Ergenekon-hesap-yedekli-'+new Date().toISOString().slice(0,10)+'.zip':'Ergenekon-proje.zip';link.textContent='İndirme başlamadıysa buraya dokun';link.className='download-again';
   document.querySelector('.download-again')?.remove();document.getElementById('download-result').appendChild(link);link.click();setTimeout(()=>URL.revokeObjectURL(url),600000);
   progress.value=100;status.textContent=withAccount?'ZIP hazır. Hesap kaydın eklendi · Kutsal Ocak Sv '+save.state.l.ocak+' · '+new Date(save.updatedAt).toLocaleString('tr-TR',{timeZone:'Europe/Istanbul'}):'Proje ZIP’i hazır. Bu seçenek hesap kaydı içermez.';
  }catch(error){status.classList.add('error');status.textContent=error.message||'İndirme tamamlanamadı. Yeniden dene.'}finally{buttons.forEach(b=>b.disabled=false)}
 }
 buttons.forEach(button=>button.addEventListener('click',()=>download(button.dataset.download==='account')));
}
