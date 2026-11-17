import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {deflateRawSync} from 'node:zlib';
import {appendZipFiles,crc32,encodeSave,validSave} from '../public/backup-download.js';

const utf8=new TextEncoder();
assert.equal(crc32(utf8.encode('123456789')),0xcbf43926,'Known CRC-32 vector');
const state={l:{ocak:5,oba:5},r:{odun:8123,et:6727,demir:12},ch:{lv:5},t:123456789,boyName:'Kök Börü · 土耳其 🐺',_autosave:{actionAt:123456780,actionId:'original-intent'}};
const before=JSON.stringify(state),code=encodeSave(state);
assert.equal(Buffer.from(code,'base64').toString('utf8'),before,'Portable code is exact UTF-8 JSON');
assert.ok(validSave(state));
for(const bad of [null,[],{}, {...state,t:NaN},{...state,l:{ocak:41}},{...state,l:{ocak:1.2}},{...state,r:{odun:-1}},{...state,r:{odun:Infinity}}])assert.equal(validSave(bad),false);

// A small, independent ZIP fixture includes both a deflated original and an archive comment.
function fixture(){
 const name=Buffer.from('ergenekon/original.txt'),raw=Buffer.from('Original project content · Türkçe'),packed=deflateRawSync(raw),crc=crc32(raw),local=Buffer.alloc(30+name.length);
 local.writeUInt32LE(0x04034b50);local.writeUInt16LE(20,4);local.writeUInt16LE(0x800,6);local.writeUInt16LE(8,8);local.writeUInt32LE(crc,14);local.writeUInt32LE(packed.length,18);local.writeUInt32LE(raw.length,22);local.writeUInt16LE(name.length,26);name.copy(local,30);
 const central=Buffer.alloc(46+name.length);central.writeUInt32LE(0x02014b50);central.writeUInt16LE(20,4);central.writeUInt16LE(20,6);central.writeUInt16LE(0x800,8);central.writeUInt16LE(8,10);central.writeUInt32LE(crc,16);central.writeUInt32LE(packed.length,20);central.writeUInt32LE(raw.length,24);central.writeUInt16LE(name.length,28);name.copy(central,46);
 const comment=Buffer.from('872ab6bffe3e8b812aac347aa1d98fead2ba81c2'),end=Buffer.alloc(22+comment.length);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(1,8);end.writeUInt16LE(1,10);end.writeUInt32LE(central.length,12);end.writeUInt32LE(local.length+packed.length,16);end.writeUInt16LE(comment.length,20);comment.copy(end,22);
 return new Blob([local,packed,central,end],{type:'application/zip'});
}
const base=fixture(),files=[{name:'ergenekon/hesap-yedegi/oyun-kaydi.json',data:before},{name:'ergenekon/hesap-yedegi/kayit-kodu.txt',data:code},{name:'ergenekon/hesap-yedegi/geri-yükle.txt',data:'Oba Düzeni → Kayıt ve bulut → Kaydı içe aktar.'}],result=await appendZipFiles(base,files);
assert.equal(result.type,'application/zip');assert.ok(result.size>base.size);assert.equal(JSON.stringify(state),before,'Archival never mutates account progress');
const script=`import io,sys,zipfile,json,base64
with zipfile.ZipFile(io.BytesIO(sys.stdin.buffer.read())) as z:
 assert z.testzip() is None
 print(json.dumps({'comment':z.comment.decode(), 'files':{n:base64.b64encode(z.read(n)).decode() for n in z.namelist()}}))
`;
const checked=spawnSync('python',['-c',script],{input:Buffer.from(await result.arrayBuffer()),encoding:'utf8'});
assert.equal(checked.status,0,checked.stderr);const archive=JSON.parse(checked.stdout);
assert.equal(archive.comment,'872ab6bffe3e8b812aac347aa1d98fead2ba81c2');
assert.deepEqual(Object.keys(archive.files).sort(),['ergenekon/original.txt',...files.map(f=>f.name)].sort());
assert.equal(Buffer.from(archive.files['ergenekon/original.txt'],'base64').toString('utf8'),'Original project content · Türkçe');
for(const file of files)assert.equal(Buffer.from(archive.files[file.name],'base64').toString('utf8'),file.data,'Independent ZIP reader checks new file bytes');
const decoded=JSON.parse(Buffer.from(Buffer.from(archive.files[files[1].name],'base64').toString(),'base64').toString('utf8'));
assert.deepEqual(decoded,state,'Real game import code round-trips the complete saved account');

// Invalid archives and names must fail before a plausible download can be produced.
for(const invalid of [new Blob([]),new Blob(['not a ZIP']),base.slice(0,base.size-1)])await assert.rejects(appendZipFiles(invalid,files));
for(const name of ['/absolute.txt','../escape.txt','ergenekon/../escape.txt','bad\\path.txt','nul\0name.txt','ergenekon/original.txt'])await assert.rejects(appendZipFiles(base,[{name,data:'x'}]));
await assert.rejects(appendZipFiles(base,[{name:'same.txt',data:'x'},{name:'same.txt',data:'y'}]));
const corrupt=new Uint8Array(await base.arrayBuffer()),end=corrupt.length-62;new DataView(corrupt.buffer).setUint16(end+4,1,true);await assert.rejects(appendZipFiles(new Blob([corrupt]),files),'Multidisk ZIP is rejected');
console.log('PASS private backup ZIP append: independent Python ZIP/CRC/deflate/UTF-8 verification, original entries/comment retained, full save-code round-trip, unchanged state and invalid input/path rejection.');
