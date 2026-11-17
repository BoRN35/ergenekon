// Optional real-DOM art/geometry regression:
// LINKEDOM_PATH=/absolute/path/to/linkedom/esm/index.js node tests/reference-design.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const {parseHTML}=await import(process.env.LINKEDOM_PATH||'linkedom');
const repo=fileURLToPath(new URL('..',import.meta.url));
const html=fs.readFileSync(repo+'/public/index.html','utf8');
const {document,window:dom}=parseHTML(html.replace(/<script\b[\s\S]*?<\/script>/g,''));
Object.defineProperty(document,'hidden',{value:false,writable:true});
for(const [name,get] of Object.entries({offsetHeight(){return this.id==='top'?76:400},clientHeight(){return 400},clientWidth(){return 800}}))Object.defineProperty(dom.HTMLElement.prototype,name,{get});
dom.HTMLElement.prototype.getBoundingClientRect=function(){return {x:0,y:0,left:0,top:0,width:800,height:400}};
dom.HTMLElement.prototype.scrollTo=function(options){this.scrollTop=options.top||0;this.scrollLeft=options.left||0};
let warnings=[];
const ctx={console:{...console,warn(...args){warnings.push(args.map(String).join(' '))}},document,Element:dom.Element,Event:dom.Event,innerWidth:1440,innerHeight:900,localStorage:{getItem(){return null},setItem(){}},setTimeout(){},clearTimeout(){},setInterval(){},clearInterval(){},requestAnimationFrame(fn){fn();return 1},cancelAnimationFrame(){},matchMedia(query){const max=query.match(/max-width:\s*(\d+)/),min=query.match(/min-width:\s*(\d+)/);return {matches:!!((max&&ctx.innerWidth<=+max[1])||(min&&ctx.innerWidth>=+min[1]))}},addEventListener(){},location:{search:'',hash:'',href:'https://test/'},URL,Blob,atob,btoa,performance:{now(){return 0}},Audio:function(){}};
ctx.window=ctx;vm.createContext(ctx);
// Load the same classic helpers, in the same order, as the production HTML.
const main=html.match(/<script>([\s\S]*?)<\/script>/);
const scripts=[...html.slice(0,main.index).matchAll(/<script\b([^>]*)\bsrc=["']([^"']+)["'][^>]*><\/script>/g)].filter(m=>!(/\btype=["']module["']/.test(m[1]))).map(m=>m[2].split('?')[0]);
for(const path of scripts){assert.match(path,/^\.\//,'Only project-local classic helpers are loaded');vm.runInContext(fs.readFileSync(repo+'/public/'+path.slice(2),'utf8'),ctx)}
let source=main[1];source=source.slice(0,source.indexOf('try{(function(){for(var k in IMG)'));vm.runInContext(source,ctx);
const queue=html.match(/function pilotQueuePlace\(\)\{[\s\S]*?\}\nwindow\.addEventListener\('resize',pilotQueuePlace\);/);if(queue)vm.runInContext(queue[0],ctx);
const E=js=>vm.runInContext(js,ctx),read=js=>JSON.parse(E('JSON.stringify('+js+')'));
E("s=fresh();mig();s.snd=false;s.l.ocak=15;s.l.bilgelik=10;s.l.yurt=5;s.l.kisla=5;s.l.sifa=5;s.r={odun:100000,et:100000,demir:100000,komur:100000,celik:100000,kristal:0,kristalParcasi:0,aritilmisKristal:0};rCity=function(){};rMap=function(){};tutR=function(){};awayR=function(){};nxtR=function(){};snd=function(){};save=function(){};actionSave=function(){};");
assert.equal(typeof ctx.paintedGameArt,'function');
assert.equal(typeof ctx.paintedGameIconHtml,'function');
const atlas=ctx.paintedGameArt.atlas,bytes=fs.readFileSync(repo+'/public/'+atlas.url.slice(2));
assert.equal(bytes.toString('hex',0,8),'89504e470d0a1a0a');
assert.equal(bytes.readUInt32BE(16),atlas.width);assert.equal(bytes.readUInt32BE(20),atlas.height);
assert.ok(atlas.width>=1024&&atlas.height>=1024,'Real illustrated atlas has sufficient detail');
assert.equal(ctx.paintedGameArt.keys.length,16);
const tiles=ctx.paintedGameArt.keys.map(k=>ctx.paintedGameArt(k));
assert.equal(new Set(tiles.map(a=>a.position)).size,16);
for(const [index,tile] of tiles.entries()){assert.equal(tile.index,index);assert.equal(tile.cols,4);assert.equal(tile.rows,4);assert.ok(tile.x>=0&&tile.x<4&&tile.y>=0&&tile.y<4)}
const subjects={'wos_tooling-up-i':'toolbox','wos_ward-expansion-i':'medicalyurt','wos_trainer-tools-i':'trainingrack','wos_bandaging-i':'bandages','wos_tool-enhancement-i':'astrolabe','wos_command-tactics-i':'banner','wos_camp-expansion-i':'encampment',odun:'wood',et:'food',demir:'ore',komur:'coal',celik:'steel',kristal:'crystal'};
for(const [key,expected] of Object.entries(subjects))assert.equal(ctx.paintedGameArt(key).key,expected,key+' uses the correct illustrated subject');
assert.equal(ctx.paintedGameArt('unknown-key'),null);
assert.doesNotMatch(ctx.paintedGameIconHtml('toolbox'),/data:image/);
console.log('PASS sixteen real illustrated atlas cells, correct research/resource subjects, high-resolution file and cacheable markup.');
const before=E('JSON.stringify(s)');
for(const viewport of [1440,390,320,760,761,1440]){
 ctx.innerWidth=viewport;let total=0;
 for(const branch of ['b','e','s','war']){
  E(`RTT='${branch}';RN2=''`);
  const layout=read(`researchView.layout('${branch}')`),rendered=E('rTree()');total+=layout.nodes.length;
  assert.equal(layout.compact,viewport<=760);
  if(viewport>760){assert.ok(layout.medallion>=125,'Desktop medallions are large enough for the detailed painted art');assert.ok(layout.nodeWidth>=170)}else assert.ok(layout.width<=viewport-20,'Mobile tree fits within its own screen');
  const positions=Object.values(layout.positions);
  for(const p of positions){assert.ok(p.x-layout.nodeWidth/2>=0);assert.ok(p.x+layout.nodeWidth/2<=layout.width);assert.ok(p.y-layout.topOffset>=0);assert.ok(p.y-layout.topOffset+layout.nodeHeight<=layout.height)}
  for(let i=0;i<positions.length;i++)for(let j=i+1;j<positions.length;j++)assert.ok(Math.abs(positions[i].x-positions[j].x)>=layout.nodeWidth-.001||Math.abs(positions[i].y-positions[j].y)>=layout.nodeHeight-.001,'New visual hitboxes never overlap');
  assert.equal((rendered.match(/class="research-node(?: |")/g)||[]).length,layout.nodes.length);
  assert.match(rendered,/data-painted-kind=/);assert.match(rendered,/data-rs=/);assert.match(rendered,/research-connections/);assert.doesNotMatch(rendered,/NaN|undefined|data:image\//);
 }
 assert.equal(total,287);assert.equal(E('JSON.stringify(s)'),before,'Resizing and drawing preserves save data');
}
console.log('PASS all287 research nodes remain readable, bounded and non-overlapping on desktop/mobile and after repeated resize.');
for(const page of ['c','m','r','a','k','y','p','g','u','e','z']){
 // Native pages may initialize their own daily records on first entry.
 E(`tab='${page}';BMK='';render()`);const entered=E('JSON.stringify(s)');E('render();render()');
 assert.equal(document.body.dataset.gamePage,page);
 assert.equal(E('JSON.stringify(s)'),entered,page+' repeated visual presentation does not alter progress');
 if(page==='r'){
  assert.equal(document.querySelectorAll('#tr .research-screen').length,1);
  assert.ok(document.querySelector('#tr .research-node [data-painted-kind]'));
 }else if(!['c','m'].includes(page))assert.equal(document.querySelectorAll('#t'+page+' > .game-page-header').length,1);
}
assert.deepEqual(warnings,[]);
console.log('PASS production helper loading and all11 player/management pages preserve game state and unique working surfaces.');
