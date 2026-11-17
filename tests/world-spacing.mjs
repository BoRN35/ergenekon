import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {E} from './game.mjs';

let materialDisposals=0;const originalMaterialDispose=THREE.Material.prototype.dispose;THREE.Material.prototype.dispose=function(){materialDisposals++;return originalMaterialDispose.call(this)};
class Classes{constructor(){this.values=new Set()}add(...v){v.forEach(x=>this.values.add(x))}remove(...v){v.forEach(x=>this.values.delete(x))}contains(v){return this.values.has(v)}toggle(v){if(this.values.has(v)){this.values.delete(v);return false}this.values.add(v);return true}}
class Element{
 constructor(tag='div'){this.tagName=tag.toUpperCase();this.children=[];this.parentNode=null;this.dataset={};this.style={};this.classList=new Classes();this.clientWidth=1000;this.clientHeight=800;this.attributes={};this.listeners={};this.hidden=false;this.textContent='';}
 set className(value){this._className=value;this.classList=new Classes();value.split(/\s+/).filter(Boolean).forEach(v=>this.classList.add(v))}get className(){return this._className||''}
 set innerHTML(value){this._innerHTML=value;this.replaceChildren()}get innerHTML(){return this._innerHTML||''}
 append(...children){for(const child of children){child.parentNode?.removeChild(child);child.parentNode=this;this.children.push(child)}}appendChild(child){this.append(child);return child}
 removeChild(child){const i=this.children.indexOf(child);if(i>=0)this.children.splice(i,1);child.parentNode=null;return child}
 replaceChildren(...children){for(const child of this.children)child.parentNode=null;this.children=[];this.append(...children)}remove(){this.parentNode?.removeChild(this)}
 get childNodes(){return this.children}
 setAttribute(key,value){this.attributes[key]=String(value)}getAttribute(key){return this.attributes[key]??null}
 addEventListener(key,fn){(this.listeners[key]??=[]).push(fn)}removeEventListener(key,fn){this.listeners[key]=(this.listeners[key]||[]).filter(v=>v!==fn)}
 getClientRects(){return this.hidden?[]:[this.getBoundingClientRect()]}getBoundingClientRect(){return {left:0,top:0,x:0,y:0,width:this.clientWidth,height:this.clientHeight}}
 matches(selector){if(selector.startsWith('.'))return this.classList.contains(selector.slice(1));const match=selector.match(/^\[data-([a-z-]+)(?:="([^"]*)")?\]$/);if(match){const key=match[1].replace(/-([a-z])/g,(_,letter)=>letter.toUpperCase());return key in this.dataset&&(match[2]===undefined||String(this.dataset[key])===match[2])}return false}
 querySelector(selector){for(const child of this.children){if(child.matches(selector))return child;const nested=child.querySelector(selector);if(nested)return nested}return null}
 querySelectorAll(selector){const results=[];for(const child of this.children){if(child.matches(selector))results.push(child);results.push(...child.querySelectorAll(selector))}return results}
 closest(selector){let e=this;while(e){if(e.matches(selector))return e;e=e.parentNode}return null}
}
class Canvas extends Element{constructor(){super('canvas');this.width=256;this.height=128}getContext(){return {beginPath(){},roundRect(){},fill(){},stroke(){},fillRect(){},fillText(){},measureText(text){return {width:String(text).length*14}},createRadialGradient(){return {addColorStop(){}}}}}}
const mapv=new Element(),tm=new Element(),head=new Element('head'),mapi=new Element(),sqv=new Element();tm.append(mapv,mapi,sqv);const elements={mapv,tm,mapi,sqv};
globalThis.window=globalThis;globalThis.document={head,hidden:false,getElementById:id=>elements[id]||null,createElement:tag=>tag==='canvas'?new Canvas():new Element(tag),addEventListener(){},removeEventListener(){}};
globalThis.ResizeObserver=class{observe(){}disconnect(){this.disconnected=true}};
let nextTimer=1;const intervalTimers=new Map();globalThis.setInterval=(fn,ms)=>{const id=nextTimer++;intervalTimers.set(id,{fn,ms});return id};globalThis.clearInterval=id=>intervalTimers.delete(id);
let nextRaf=1;const frames=new Map();globalThis.requestAnimationFrame=fn=>{const id=nextRaf++;frames.set(id,fn);return id};globalThis.cancelAnimationFrame=id=>frames.delete(id);
class FakeRenderer{
 constructor(){this.domElement=new Canvas();this.shadowMap={};this.info={render:{triangles:0,calls:0},memory:{geometries:0,textures:0}};this.width=0;this.height=0;this.disposed=false}
 setPixelRatio(){}getSize(target){return target.set(this.width,this.height)}setSize(w,h){this.width=w;this.height=h;this.domElement.clientWidth=w;this.domElement.clientHeight=h}
 render(scene){const geometries=new Set(),textures=new Set();let calls=0,triangles=0;scene.traverseVisible(object=>{if(object.geometry){geometries.add(object.geometry);calls++;triangles+=(object.geometry.index?.count||object.geometry.attributes?.position?.count||0)/3*(object.isInstancedMesh?object.count:1)}for(const material of Array.isArray(object.material)?object.material:[object.material])if(material)for(const value of Object.values(material))if(value?.isTexture)textures.add(value)});this.info={render:{triangles,calls},memory:{geometries:geometries.size,textures:textures.size}}}
 dispose(){this.disposed=true}
}
class FakeOrbitControls{constructor(camera){this.camera=camera;this.target=new THREE.Vector3();this.mouseButtons={};this.touches={};this.disposed=false}update(){this.camera.lookAt(this.target);this.camera.updateMatrixWorld()}dispose(){this.disposed=true}}
globalThis.FakeRenderer=FakeRenderer;globalThis.FakeOrbitControls=FakeOrbitControls;

// Use the actual game data, including all 114 resources and 180 monsters.
const fixture=JSON.parse(E("JSON.stringify({s:s,M:M,CHS:CHS,KY:KY,positions:s.nodes.map((_,i)=>pos(i))})"));
assert.equal(fixture.s.nodes.length,114);assert.equal(fixture.M.length,180);
let payload={self:'owner',players:[{id:'owner',name:'Ergenekon',level:40,obaLevel:40,wallLevel:40,x:0,z:0},{id:'other',name:'Diğer Boy',level:40,obaLevel:40,wallLevel:40,x:150,z:0}]};
globalThis.fetch=async()=>({ok:true,status:200,json:async()=>structuredClone(payload)});
Object.assign(globalThis,{tab:'m',SC:'m',MZ:1,s:structuredClone(fixture.s),M:fixture.M,CHS:fixture.CHS,KY:fixture.KY,sel:-1,selM:-1});
s.l.ocak=40;s.fx=100;s.noan=false;s.tz={x:50,y:52,exp:Date.now()+600000};s.mk=M.map(()=>0);s.sq=[{st:1,n:0,left:50,tot:100}];
let hideAll=false,azman=false;
globalThis.pos=i=>fixture.positions[i];globalThis.monsterBase=i=>M[i][5]??i;globalThis.fog=()=>hideAll;globalThis.poiVis=()=>true;globalThis.maxLv=()=>40;
globalThis.X6={isAz:i=>azman&&i<=10,rfOn:i=>i<=10,rf:()=>({hp:100,rt:0,sol:[]})};globalThis.mt=()=>100;globalThis.expT=()=>100;globalThis.ft=value=>Math.ceil(value)+' sn';
globalThis.rMap=()=>{};globalThis.render=()=>globalThis.rMap();
const saved=JSON.stringify({s,M,positions:fixture.positions}),originalMap=globalThis.rMap;
const source=await fs.readFile(new URL('../src/world3d.js',import.meta.url),'utf8');
const transformed=source.replace("import * as THREE from 'three';",'import * as THREE from '+JSON.stringify(import.meta.resolve('three'))+';').replace("import {OrbitControls} from 'three/addons/controls/OrbitControls.js';",'').replace('new THREE.WebGLRenderer(', 'new globalThis.FakeRenderer(').replace('new OrbitControls(', 'new globalThis.FakeOrbitControls(');
const {addWorld3D}=await import('data:text/javascript;base64,'+Buffer.from(transformed).toString('base64'));
const flush=()=>new Promise(resolve=>setImmediate(resolve));
function frame(time){const item=[...frames.entries()][0];assert.ok(item);frames.delete(item[0]);item[1](time)}
function counts(api){const result={geometry:new Set(),material:new Set(),texture:new Set()};api.scene.traverse(object=>{if(object.geometry)result.geometry.add(object.geometry);for(const material of Array.isArray(object.material)?object.material:[object.material])if(material){result.material.add(material);for(const value of Object.values(material))if(value?.isTexture)result.texture.add(value)}});return result}
function totalCounts(api){return Object.fromEntries(Object.entries(counts(api)).map(([key,set])=>[key,set.size]))}
function idFor(group){const {kind,index}=group.userData.worldAction;return kind==='merchant'?'merchant':({node:'n',monster:'m',rift:'r',poi:'p'})[kind]+index}
function boxGap(a,b){const dx=Math.max(0,a.min.x-b.max.x,b.min.x-a.max.x),dz=Math.max(0,a.min.z-b.max.z,b.min.z-a.max.z);return Math.hypot(dx,dz)}
let minCircle=Infinity,minActual=Infinity,minRiverGap=Infinity,maxRadius=0;
function pointSegmentDistance(px,pz,ax,az,bx,bz){const dx=bx-ax,dz=bz-az,t=Math.max(0,Math.min(1,((px-ax)*dx+(pz-az)*dz)/(dx*dx+dz*dz)));return Math.hypot(px-ax-t*dx,pz-az-t*dz)}
function verify(api){
 const spacing=api.spacing,targets=spacing.targets,byId=new Map(targets.map(t=>[t.id,t]));
 // Read the actual generated water ribbon, rather than duplicating the layout's river formula.
 const water=api.scene.children.find(object=>object.isMesh&&object.material.color?.getHexString()==='377e8b');assert.ok(water,'World river mesh exists');const waterVertices=water.geometry.attributes.position,riverCenters=[];for(let i=0;i<waterVertices.count;i+=2)riverCenters.push({x:(waterVertices.getX(i)+waterVertices.getX(i+1))/2,z:(waterVertices.getZ(i)+waterVertices.getZ(i+1))/2,radius:Math.hypot(waterVertices.getX(i)-waterVertices.getX(i+1),waterVertices.getZ(i)-waterVertices.getZ(i+1))/2});assert.equal(targets.filter(t=>t.id.startsWith('n')).length,114);assert.equal(targets.filter(t=>t.id.startsWith('m')&&t.id!=='merchant').length,180);assert.equal(new Set(targets.map(t=>t.id)).size,targets.length);
 for(const target of targets){
  const cityX=Math.round(target.x/150)*150,cityZ=Math.round(target.z/150)*150;
  assert.ok(Math.hypot(target.x-cityX,target.z-cityZ)>=20+target.radius-1e-6,`${target.id} clips a future player city`);
  assert.ok(Math.hypot(target.x-api.selfPosition.x,target.z-api.selfPosition.z)>=20+target.radius-1e-6,`${target.id} clips home`);
  assert.ok(target.x-target.radius>=api.bounds.minX&&target.x+target.radius<=api.bounds.maxX&&target.z-target.radius>=api.bounds.minZ&&target.z+target.radius<=api.bounds.maxZ,`${target.id} exceeds world bounds`);
  let riverDistance=Infinity;for(let i=1;i<riverCenters.length;i++){const a=riverCenters[i-1],b=riverCenters[i];riverDistance=Math.min(riverDistance,pointSegmentDistance(target.x,target.z,a.x,a.z,b.x,b.z)-Math.max(a.radius,b.radius))}const riverGap=riverDistance-target.radius;minRiverGap=Math.min(minRiverGap,riverGap);assert.ok(riverGap>=2-1e-3,`${target.id} reserved circle/actual model clips generated river: ${riverGap}`);
  maxRadius=Math.max(maxRadius,Math.hypot(target.x-api.selfPosition.x,target.z-api.selfPosition.z)+target.radius);
 }
 for(let i=0;i<targets.length;i++)for(let j=i+1;j<targets.length;j++){const a=targets[i],b=targets[j],gap=Math.hypot(a.x-b.x,a.z-b.z)-a.radius-b.radius;minCircle=Math.min(minCircle,gap);assert.ok(gap>=3-1e-6,`${a.id}/${b.id} circle gap ${gap}`)}
 const boxes=[];for(const group of api.pveGroup.children){if(!group.visible)continue;const id=idFor(group),target=byId.get(id);assert.ok(target,id+' has a packed clearing');const box=new THREE.Box3().setFromObject(group);assert.equal(group.position.x,target.x);assert.equal(group.position.z,target.z);for(const x of [box.min.x,box.max.x])for(const z of [box.min.z,box.max.z])assert.ok(Math.hypot(x-target.x,z-target.z)<=target.radius+1e-5,`${id} actual footprint exceeds reserved future size`);boxes.push({id,box})}
 for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){const gap=boxGap(boxes[i].box,boxes[j].box);minActual=Math.min(minActual,gap);assert.ok(gap>=3-1e-5,`${boxes[i].id}/${boxes[j].id} actual bounding-box gap ${gap}`)}
 for(const tree of spacing.trees)if(tree.visible){for(const target of targets)assert.ok(Math.hypot(tree.x-target.x,tree.z-target.z)-tree.radius-target.radius>=3-1e-6,'Tree overlaps clearing at '+target.id);for(const city of api.players)assert.ok(Math.hypot(tree.x-city.x,tree.z-city.z)>=20+tree.radius-1e-6,'Tree clips player city')}
 assert.ok(spacing.trees.some(t=>t.visible),'Some forest remains');
 return targets;
}
hideAll=true;const api=addWorld3D();await flush();await api.refresh();await flush();frame(1000);assert.equal(api.ready,true);assert.equal(api.pveVisibleCount,0);const initiallyHiddenLayout=JSON.stringify(api.spacing.targets);
hideAll=false;globalThis.rMap();frame(1500);const normalLayout=JSON.stringify(verify(api)),normalCounts=totalCounts(api);assert.equal(normalLayout,initiallyHiddenLayout,'Initial fog must reserve every hidden target before revealing');
assert.ok(api.pveVisibleCount>=288,'All monsters and resources are revealed');
const firstNode=api.pveTargets.find(t=>t.id==='n0'),caravan=api.caravans[0];assert.deepEqual(caravan.target,{x:firstNode.worldX,z:firstNode.worldZ});assert.ok(caravan.progress>=.5&&caravan.progress<=.506,'Animation only interpolates within the saved half-complete journey');assert.equal(caravan.direction,'GİDİŞ');
// Fog changes, kills, cooldowns, level locks, merchant expiration and Azman growth never reshuffle static targets.
hideAll=true;globalThis.rMap();frame(2000);assert.ok(api.pveGroup.children.every(group=>!group.visible));assert.equal(JSON.stringify(api.spacing.targets),normalLayout);
hideAll=false;globalThis.rMap();frame(3000);assert.equal(JSON.stringify(verify(api)),normalLayout);assert.deepEqual(totalCounts(api),normalCounts);
azman=true;globalThis.rMap();frame(4000);assert.equal(JSON.stringify(verify(api)),normalLayout);
const withAzman=totalCounts(api);for(let i=0;i<8;i++){globalThis.rMap();frame(5000+i*1000);assert.equal(JSON.stringify(api.spacing.targets),normalLayout)}assert.deepEqual(totalCounts(api),withAzman,'Repeated rendering must not leak GPU resources');
assert.equal(JSON.stringify({s,M,positions:fixture.positions}),saved,'Scene must not rewrite saved progress, logical coordinates or caravan queues');
s.nodes[0].rg=60;s.mk[0]=60;s.l.ocak=1;s.tz.exp=0;globalThis.rMap();frame(14000);assert.equal(JSON.stringify(api.spacing.targets),normalLayout);s.nodes[0].rg=fixture.s.nodes[0].rg;s.mk[0]=0;s.l.ocak=40;s.tz.exp=JSON.parse(saved).s.tz.exp;
// Player refreshes and newly visible real players use reserved grid clearings.
payload.players.push({id:'new-player',name:'Yeni Boy',level:40,obaLevel:40,wallLevel:40,x:-150,z:150});await api.refresh();frame(15000);assert.equal(JSON.stringify(verify(api)),normalLayout);
payload.players[0].name='Değişen Boy';await api.refresh();frame(16000);assert.equal(JSON.stringify(api.spacing.targets),normalLayout);
// Moving the same owner's city by one grid cell changes the river phase beneath its local map.
payload.players[0].x=150;payload.players[0].z=0;payload.players[1].x=0;await api.refresh();frame(16500);const riverShiftLayout=JSON.stringify(verify(api));assert.notEqual(riverShiftLayout,normalLayout);assert.equal(api.focusPlayer('other'),true);globalThis.rMap();assert.equal(JSON.stringify(api.spacing.targets),riverShiftLayout,'Focusing another city must not repack the owner map');
// Layout also respects global geography when the owner's real city is away from the world origin.
payload={self:'shifted',players:[{id:'shifted',name:'Uzak Boy',level:40,obaLevel:40,wallLevel:40,x:750,z:-600}]};await api.refresh();frame(17000);verify(api);const movedNode=api.pveTargets.find(t=>t.id==='n0');assert.deepEqual(api.caravans[0].target,{x:movedNode.worldX,z:movedNode.worldZ});
// Dispose every scene-owned resource and stop polling/animation.
const resources=counts(api),disposed={geometry:new Set(),material:new Set(),texture:new Set()};for(const [kind,set]of Object.entries(resources))for(const item of set)item.addEventListener('dispose',()=>disposed[kind].add(item));const renderer=api.renderer;api.dispose();for(const [kind,set]of Object.entries(resources))assert.equal(disposed[kind].size,set.size,`All ${kind} resources are disposed`);assert.equal(renderer.disposed,true);assert.equal(intervalTimers.size,0);assert.equal(frames.size,0);assert.equal(globalThis.rMap,originalMap);assert.equal(mapv.children.length,0);
// A fresh scene recreates the same layout from the same saved logical positions.
payload={self:'owner',players:[{id:'owner',name:'Ergenekon',level:40,obaLevel:40,wallLevel:40,x:0,z:0}]};azman=false;const reloaded=addWorld3D();await flush();await reloaded.refresh();await flush();frame(18000);assert.equal(JSON.stringify(verify(reloaded)),normalLayout,'Reloading the scene must not change placements');reloaded.dispose();assert.equal(intervalTimers.size,0);assert.equal(frames.size,0);THREE.Material.prototype.dispose=originalMaterialDispose;
console.log(`PASS: real 114-resource/180-monster map, all ${JSON.parse(normalLayout).length} target clearings, future Azman bounds, city/tree clearance, stable fog/reveal/refresh, aligned saved caravans and GPU cleanup. Minimum circle gap ${minCircle.toFixed(3)}, actual box gap ${minActual.toFixed(3)}, water edge gap ${minRiverGap.toFixed(3)}, field radius ${maxRadius.toFixed(1)}.`);
