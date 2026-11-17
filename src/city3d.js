import {addCityLandscape} from './city-landscape.js';
import {addArena3D} from './arena3d.js';
import {addGameHub} from './game-hub.js';
import {addOba} from './oba.js';
import {addWorld3D} from './world3d.js';
import {addBuildingModels} from './building-models.js';
import {createHearthGallery} from './hearth-gallery.js';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {createHearthModelManager} from './hearth-models.js';
addArena3D();
window.gameHub=addGameHub({openBuildings:()=>{window.city3d?.hearthGallery?.close();window.city3d?.buildingModels?.show()},openHearth:()=>{window.city3d?.buildingModels?.close();window.city3d?.hearthGallery?.open()}});
const host=document.getElementById('cityv');
const panel=document.createElement('div');panel.className='world3d';
const info=document.createElement('div');info.className='world-info';info.innerHTML='<span>ERGENEKON / BOY MEYDANI</span><b>Kutsal Ocak</b><small id="world-status">Model yükleniyor…</small><small class="save-state" aria-live="polite"></small>';
panel.append(info);
const buildTools=document.createElement('div');buildTools.className='world-build';buildTools.innerHTML='<button data-fort="view">Şehri gör</button><button data-fort="kurultay">Kurultay</button>';panel.append(buildTools);

const tools=document.createElement('div');tools.className='world-tools';tools.innerHTML='<button aria-label="Yakınlaş" data-cam="in">＋</button><button aria-label="Uzaklaş" data-cam="out">−</button><button aria-label="Ocağa odaklan" data-cam="home">⌖</button><button data-cam="open">Ocağı aç ↗</button>';panel.append(tools);
const help=document.createElement('div');help.className='world-help';help.textContent='Sürükle: gezin · Tekerlek / iki parmak: yakınlaş';panel.append(help);
const status=()=>panel.querySelector('#world-status');
let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});}catch(e){status().textContent='3D açılamadı; 2D görünüm kullanılıyor.';console.error(e);throw e;}
const compactView=matchMedia('(max-width:700px)').matches;renderer.setPixelRatio(Math.min(devicePixelRatio,compactView?1.5:1.75));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
renderer.domElement.setAttribute('aria-label','Kaydırılabilir ve yakınlaştırılabilir üç boyutlu Ergenekon meydanı');panel.append(renderer.domElement);
const scene=new THREE.Scene();scene.background=new THREE.Color('#d8d4b7');scene.fog=new THREE.Fog('#d8d4b7',165,445);
const camera=new THREE.PerspectiveCamera(45,1,.1,700);
const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.09;controls.screenSpacePanning=false;controls.minDistance=7;controls.maxDistance=210;controls.minPolarAngle=.3;controls.maxPolarAngle=Math.PI*.43;controls.maxTargetRadius=62;controls.mouseButtons={LEFT:THREE.MOUSE.PAN,MIDDLE:THREE.MOUSE.DOLLY,RIGHT:THREE.MOUSE.ROTATE};controls.touches={ONE:THREE.TOUCH.PAN,TWO:THREE.TOUCH.DOLLY_ROTATE};
function home(){controls.target.set(0,2,0);camera.position.set(...(matchMedia('(max-width:700px)').matches?[39,42,59]:[34,32,48]));controls.update();}home();
scene.add(new THREE.HemisphereLight('#cfdfeb','#70653c',1.25));const sun=new THREE.DirectionalLight('#ffe0ad',2.75);sun.position.set(-28,48,24);sun.castShadow=true;sun.shadow.mapSize.set(compactView?1024:2048,compactView?1024:2048);Object.assign(sun.shadow.camera,{left:-75,right:75,top:75,bottom:-75,near:1,far:160});sun.shadow.bias=-.0004;sun.shadow.normalBias=.04;scene.add(sun);
let seed=423;function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
function material(c,roughness=1){return new THREE.MeshStandardMaterial({color:c,roughness});}
const stone=material('#827c6e'),wood=material('#66503a'),roofmat=material('#514533'),felt=material('#c8b99c'),teal=material('#386f76');
function mesh(geo,mat,parent=scene,x=0,y=0,z=0){const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
const dummy=new THREE.Object3D();
const buildingTargets=[];const buildingSlots=new Map();
function hut(key,x,z,yurt=false){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=Math.atan2(-x,-z);scene.add(g);g.userData.building=key;buildingTargets.push(g);buildingSlots.set(key,g);
 const structure=new THREE.Group();g.add(structure);g.userData.structure=structure;
 if(yurt){mesh(new THREE.CylinderGeometry(2.1,2.2,2.3,24),felt,structure,0,1.15,0);mesh(new THREE.ConeGeometry(2.5,1.2,24),felt,structure,0,2.85,0);mesh(new THREE.BoxGeometry(.85,1.55,.1),wood,structure,0,.78,2.18);for(const y of [.4,1.9]){const ring=mesh(new THREE.TorusGeometry(2.17,.045,5,36),wood,structure,0,y,0);ring.rotation.x=Math.PI/2;}}
 else{mesh(new THREE.BoxGeometry(4.5,.6,3.8),stone,structure,0,.3,0);mesh(new THREE.BoxGeometry(4.1,2.1,3.5),wood,structure,0,1.6,0);for(const side of [-1,1]){const roof=mesh(new THREE.BoxGeometry(2.7,.16,4.5),roofmat,structure,side*1.18,3,0);roof.rotation.z=side*-.34;}mesh(new THREE.BoxGeometry(.9,1.8,.12),material('#30291e'),structure,0,1.2,1.81);for(const a of [-1.9,1.9])mesh(new THREE.BoxGeometry(.18,2.8,.18),wood,structure,a,1.4,1.7);}
 const plot=new THREE.Group();g.add(plot);g.userData.plot=plot;const rim=mesh(new THREE.RingGeometry(2.6,2.85,24),material('#a48d63'),plot,0,.055,0);rim.rotation.x=-Math.PI/2;for(const x of [-1.9,1.9])for(const z of [-1.65,1.65])mesh(new THREE.BoxGeometry(.12,.42,.12),wood,plot,x,.21,z);return g;}
const layout=[['yurt',-21,-24,true],['sifa',-32,-11,true],['odunluk',-34,12,false],['avci',-19,27,false],['demirci',25,-21,false],['kisla',35,-1,false],['ambar',30,22,false],['gozcu',5,-34,false],['komurluk',-39,-28,false],['bilgelik',-35,30,true],['harpakademi',37,33,false]];
for(const [k,x,z,y]of layout)hut(k,x,z,y);
function updatePlots(){for(const [key,slot]of buildingSlots){if(!slot.userData.structure)continue;const built=(window.s?.l[key]||0)>0;slot.userData.structure.visible=built;slot.userData.plot.visible=!built;}}updatePlots();
const landscape=addCityLandscape({THREE,scene,buildingSlots});
const skyGeometry=new THREE.SphereGeometry(490,32,16),skyColors=[];const skyTop=new THREE.Color('#648c9a'),skyHorizon=new THREE.Color('#e4d4b2');for(let i=0;i<skyGeometry.attributes.position.count;i++){const y=skyGeometry.attributes.position.getY(i)/490,c=skyHorizon.clone().lerp(skyTop,Math.pow(Math.max(0,y),.55));skyColors.push(c.r,c.g,c.b)}skyGeometry.setAttribute('color',new THREE.Float32BufferAttribute(skyColors,3));const sky=new THREE.Mesh(skyGeometry,new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.BackSide,depthWrite:false,fog:false,toneMapped:false}));sky.name='SteppeSky';sky.renderOrder=-10;scene.add(sky);

const castle=new THREE.Group();castle.userData.building='sur';scene.add(castle);buildingTargets.push(castle);
let castleVersion=-99;
const milestones=[1,5,10,15,20,25,30,35,40];
function castleStage(lv){return lv<1?-1:milestones.reduce((a,v,i)=>lv>=v?i:a,0)}
function updateCastle(){
 const level=window.s?.l.sur||0,stage=castleStage(level);
 castle.userData.level=level;if(stage===castleVersion)return;castleVersion=stage;
 const geometries=new Set();castle.traverse(o=>{if(o.geometry)geometries.add(o.geometry)});castle.clear();geometries.forEach(g=>g.dispose());
 const height=stage<0?1.25:2.2+Math.max(0,stage)*.4;
 const isStone=stage>=2;
 const wallMaterial=stage<0?wood:isStone?stone:wood;
 const N=stage<0?160:240;
 const posts=new THREE.InstancedMesh(isStone?new THREE.BoxGeometry(1.2,height,.95):new THREE.CylinderGeometry(stage<0?.13:.24,stage<0?.13:.29,height,6),wallMaterial,N);
 let used=0;for(let i=0;i<N;i++){const angle=i/N*Math.PI*2;if(Math.abs(angle-Math.PI/2)<.11)continue;dummy.position.set(Math.cos(angle)*46,height/2,Math.sin(angle)*41);dummy.rotation.set(0,-angle,0);dummy.scale.set(1,1,1);dummy.updateMatrix();posts.setMatrixAt(used++,dummy.matrix)}posts.count=used;posts.castShadow=stage>=0;posts.receiveShadow=true;castle.add(posts);
 if(stage>=0){
  const gateX=stage>=5?4.6:3.8;for(const x of [-gateX,gateX]){
   mesh(new THREE.BoxGeometry(isStone?2:1.5,height+1.5,2),wallMaterial,castle,x,(height+1.5)/2,40.8);
   mesh(new THREE.ConeGeometry(isStone?1.8:1.5,1.35,4),roofmat,castle,x,height+2.1,40.8).rotation.y=Math.PI/4;
  }
  mesh(new THREE.BoxGeometry(gateX*2+1,.5,.9),wood,castle,0,height+.9,40.8);
  if(stage>=1){const total=stage>=7?8:stage>=4?6:4;for(let t=0;t<total;t++){
   const a=t/total*Math.PI*2+.2,x=Math.cos(a)*46,z=Math.sin(a)*41;
   mesh(new THREE.CylinderGeometry(1.25,1.55,height+1.5,8),wallMaterial,castle,x,(height+1.5)/2,z);
   mesh(new THREE.ConeGeometry(1.7,1.25,8),roofmat,castle,x,height+2.1,z);
   if(stage>=4){mesh(new THREE.CylinderGeometry(.05,.05,2.3,5),wood,castle,x,height+3.2,z);mesh(new THREE.BoxGeometry(1.1,.65,.04),teal,castle,x+.5,height+3.8,z);}
  }}
  if(stage>=3){for(let i=0;i<100;i++){const a=i/100*Math.PI*2;if(Math.abs(a-Math.PI/2)<.15)continue;const m=mesh(new THREE.BoxGeometry(.7,.55,.85),stone,castle,Math.cos(a)*46,height+.27,Math.sin(a)*41);m.rotation.y=-a;}}
  if(stage>=5){for(const x of [-7,7])mesh(new THREE.BoxGeometry(3,2.6,4),stone,castle,x,1.3,38);}
  if(stage>=6){mesh(new THREE.BoxGeometry(7,.9,1.3),wood,castle,0,height+1.55,40.8);}
  if(stage>=7){for(const x of [-4.5,4.5]){mesh(new THREE.CylinderGeometry(.35,.25,1.5,8),stone,castle,x,.75,37);mesh(new THREE.ConeGeometry(.35,.8,7),material('#c86c26'),castle,x,1.85,37);}}
  if(stage>=8){for(const x of [-4.6,4.6]){mesh(new THREE.BoxGeometry(2.4,.65,2.4),stone,castle,x,height+1.5,40.8);mesh(new THREE.BoxGeometry(.85,1.7,.05),teal,castle,x,height-.3,42);}}
 }
 castle.userData.level=level;castle.userData.stage=stage;
}
updateCastle();
buildTools.addEventListener('click',e=>{const action=e.target.closest('[data-fort]')?.dataset.fort;if(action==='kurultay')window.gameHub?.open('oba');if(action==='buildings'){hearthGallery.close();window.city3d?.buildingModels?.show();}if(action==='designs'){window.city3d?.buildingModels?.close();hearthGallery.open();}if(action==='view'){controls.target.set(0,0,0);camera.position.set(...(matchMedia('(max-width:700px)').matches?[78,79,104]:[62,55,80]));controls.update();}});
const hearth=new THREE.Group();hearth.userData.building='ocak';scene.add(hearth);buildingTargets.push(hearth);
const fireLight=new THREE.PointLight('#ff922f',20,9,2);fireLight.position.set(0,1.3,.35);scene.add(fireLight);
// Soft animated flame sprites, kept separate from GLB geometry.
const fc=document.createElement('canvas');fc.width=fc.height=128;const fctx=fc.getContext('2d');const grad=fctx.createRadialGradient(64,72,2,64,72,57);grad.addColorStop(0,'rgba(255,251,184,1)');grad.addColorStop(.18,'rgba(255,193,61,.95)');grad.addColorStop(.46,'rgba(255,86,7,.65)');grad.addColorStop(1,'rgba(255,64,0,0)');fctx.fillStyle=grad;fctx.beginPath();fctx.moveTo(65,10);fctx.bezierCurveTo(72,45,112,57,91,96);fctx.bezierCurveTo(80,124,34,123,31,92);fctx.bezierCurveTo(23,61,58,39,65,10);fctx.fill();const flameTex=new THREE.CanvasTexture(fc);const flames=[];for(let i=0;i<16;i++){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:flameTex,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:.5}));scene.add(sp);flames.push(sp);}
const sparkGeo=new THREE.BufferGeometry();const sparkPos=new Float32Array(180);sparkGeo.setAttribute('position',new THREE.BufferAttribute(sparkPos,3));const sparks=new THREE.Points(sparkGeo,new THREE.PointsMaterial({color:'#ffd080',size:.055,transparent:true,opacity:.75,depthWrite:false,blending:THREE.AdditiveBlending}));scene.add(sparks);
const sc=document.createElement('canvas');sc.width=sc.height=64;const sx=sc.getContext('2d');const sg=sx.createRadialGradient(32,32,1,32,32,30);sg.addColorStop(0,'rgba(160,153,140,.5)');sg.addColorStop(1,'rgba(130,125,116,0)');sx.fillStyle=sg;sx.fillRect(0,0,64,64);const smokeTexture=new THREE.CanvasTexture(sc);const smoke=[];for(let i=0;i<7;i++){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:smokeTexture,transparent:true,depthWrite:false,opacity:0}));scene.add(sp);smoke.push(sp);}

let modelReady=false;
let hearthPreviewLevel=null;
const hearthGallery=createHearthGallery({host:panel,onPreview:level=>{previewHearthLevel(level);if(level!==null)home();}});
const fireAnchor=new THREE.Vector3(0,.72,.2);
let fireScale=1;
let sideFireAnchors=[];
const sideFlames=[];for(let i=0;i<32;i++){const f=new THREE.Sprite(new THREE.SpriteMaterial({map:flameTex,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:0}));scene.add(f);sideFlames.push(f);}

const loader=new GLTFLoader();
const hearthManifestURL=new URL('./assets/ocak-levels.json',document.baseURI).href;
let hearthManifestRequest=null;
let hearthManifestInitialized=false;
function disposeHearthAsset(asset){
 const roots=asset?.scenes||[asset?.scene||asset];
 const geometries=new Set(),materials=new Set(),textures=new Set(),images=new Set();
 for(const root of roots){
  root?.parent?.remove(root);
  root?.traverse?.(object=>{
   if(object.geometry)geometries.add(object.geometry);
   const list=Array.isArray(object.material)?object.material:[object.material];
   for(const material of list){if(!material)continue;materials.add(material);for(const value of Object.values(material)){if(value?.isTexture)textures.add(value)}}
   if(object.skeleton?.boneTexture)textures.add(object.skeleton.boneTexture);
  });
 }
 textures.forEach(texture=>{if(texture.image)images.add(texture.image);texture.dispose()});
 geometries.forEach(geometry=>geometry.dispose());materials.forEach(material=>material.dispose());
 images.forEach(image=>image.close?.());
}
function showHearthState(state){
 hearthGallery.setState(state);
 modelReady=state.modelReady;
 sideFireAnchors=(state.effect?.sideFireAnchors||[]).filter(a=>Array.isArray(a)&&a.length===3&&a.every(Number.isFinite)).slice(0,8);
 if(state.visual){fireAnchor.fromArray(state.visual.fireAnchor);fireScale=state.visual.fireScale;fireLight.position.copy(fireAnchor).add(new THREE.Vector3(0,.58*fireScale,.15*fireScale));fireLight.distance=9*fireScale;}
 if(window.city3d){window.city3d.modelLoaded=state.modelReady;window.city3d.hearthVisualLevel=state.loadedLevel;window.city3d.hearthLoadingLevel=state.loadingLevel;window.city3d.hearthError=state.error;window.city3d.error=state.error?.message||null;}
 let text='Obanın kalbi · Sv '+(window.s?.l.ocak||state.logicalLevel);
 if(hearthPreviewLevel!==null)text+=' · Önizleme Sv '+hearthPreviewLevel;

 if(state.loadingLevel)text+=' · Sv '+state.loadingLevel+' modeli yükleniyor…';
 else if(!state.modelReady)text+=state.error?' · Model yüklenemedi':' · Model hazırlanıyor…';
 else if(state.error)text+=' · Yeni görünüm yüklenemedi';
 status().textContent=text;
 status().title=state.error?'Mevcut model korunuyor. Yeniden denemek için sayfayı yenileyin.':'';
}
const hearthModels=createHearthModelManager({
 baseURL:hearthManifestURL,
 initialLevel:window.s?.l.ocak||1,
 load:url=>loader.loadAsync(url),
 prepare(gltf,entry){
  const object=gltf.scene;object.rotation.set(...entry.rotation);
  const box=new THREE.Box3().setFromObject(object),size=box.getSize(new THREE.Vector3());
  const footprint=Math.max(size.x,size.z);
  if(!Number.isFinite(footprint)||footprint<=0)throw Error('Model boyutları geçersiz');
  object.scale.setScalar(entry.width/footprint);box.setFromObject(object);
  const center=box.getCenter(new THREE.Vector3());object.position.set(-center.x,-box.min.y+.07,-center.z);
  object.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
  return object;
 },
 apply:object=>hearth.add(object),
 dispose:disposeHearthAsset,
 onChange:showHearthState
});
async function refreshHearthModels(){
 if(hearthManifestRequest)return hearthManifestRequest;
 hearthManifestRequest=(async()=>{
  try{
   const response=await fetch(hearthManifestURL,{cache:'no-store'});
   if(!response.ok)throw Error('Model manifesti yüklenemedi: '+response.status);
   const manifest=await response.json();
   if(!manifest||manifest.building!=='ocak'||!manifest.models)throw Error('Model manifesti geçersiz');
   hearthGallery.setReady(Object.entries(manifest.models).filter(([,v])=>typeof v==='string'||v?.status==='ready').map(([k])=>Number(k)));hearthModels.setManifest(manifest);hearthManifestInitialized=true;
  }catch(error){
   console.warn('Ocak manifesti açılamadı; mevcut model korunuyor.',error);
   if(!hearthManifestInitialized){hearthModels.setManifest({models:{1:{status:'ready',url:'models/ocak-sv1.glb',width:5.5}}});hearthManifestInitialized=true;}
  }finally{hearthManifestRequest=null;}
 })();
 return hearthManifestRequest;
}
function previewHearthLevel(level){hearthPreviewLevel=level===null||level===undefined?null:THREE.MathUtils.clamp(Math.floor(Number(level)||1),1,40);hearthModels.setLevel(hearthPreviewLevel??window.s.l.ocak);showHearthState(hearthModels.getState());}
function openBuilding(k){window.BMK=k;window.selB=k;window.tab='c';window.render();}
const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();let start=null;
renderer.domElement.addEventListener('pointerdown',e=>{start={x:e.clientX,y:e.clientY,id:e.pointerId};});renderer.domElement.addEventListener('pointercancel',()=>start=null);renderer.domElement.addEventListener('pointerup',e=>{if(!start||start.id!==e.pointerId||Math.hypot(e.clientX-start.x,e.clientY-start.y)>7){start=null;return;}start=null;const rect=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);ray.setFromCamera(pointer,camera);const hits=ray.intersectObjects(buildingTargets,true).filter(hit=>{for(let object=hit.object;object;object=object.parent)if(!object.visible)return false;return true;});if(hits[0]){let o=hits[0].object;while(o&&!o.userData.building)o=o.parent;if(o)openBuilding(o.userData.building);}});
tools.addEventListener('click',e=>{const action=e.target.closest('[data-cam]')?.dataset.cam;if(action==='home')home();if(action==='open'){const bs=window.city3d?.buildingModels?.getState();openBuilding(bs?.preview!==null&&bs?.preview!==undefined?bs.selected:'ocak');}if(action==='in'||action==='out'){const delta=camera.position.clone().sub(controls.target).multiplyScalar(action==='in'?.8:1.25);delta.clampLength(controls.minDistance,controls.maxDistance);camera.position.copy(controls.target).add(delta);controls.update();}});
function mount(){if(panel.parentNode!==host)host.append(panel);host.classList.add('has3d');}
const original=window.rCity;window.rCity=function(){original();mount();updatePlots();updateCastle();oba.update();window.saveBadge?.();window.city3d?.buildingModels?.update();hearthModels.setLevel(hearthPreviewLevel??window.s.l.ocak);};mount();
let width=0,height=0;function resize(){const w=host.clientWidth,h=host.clientHeight;if(w&&h&&(w!==width||h!==height)){width=w;height=h;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();}}
new ResizeObserver(resize).observe(host);resize();
window.city3d={modelLoaded:false,renderer,scene,camera,controls,home,landscape,buildingSlots,updatePlots,openBuilding,castle,updateCastle,hearth,hearthModels,hearthGallery,refreshHearthModels,previewHearthLevel};window.saveBadge?.();refreshHearthModels();
const surSlot=new THREE.Group();surSlot.position.set(0,0,41);scene.add(surSlot);buildingSlots.set('sur',surSlot);window.city3d.buildingModels=addBuildingModels({scene,targets:buildingTargets,slots:buildingSlots,camera,controls,host:panel,onGateVisibility:visible=>{for(const child of castle.children){if(child.isInstancedMesh)continue;child.visible=!(visible&&Math.abs(child.position.x)<10&&child.position.z>34);}}});
const oba=addOba({THREE,scene,targets:buildingTargets,openBuilding});window.city3d.oba=oba;addWorld3D();
const clock=new THREE.Clock();let lastFrame=0;function frame(ms){requestAnimationFrame(frame);if(document.hidden||window.tab!=='c'||ms-lastFrame<30)return;lastFrame=ms;const t=clock.getElapsedTime();const noan=window.s?.noan;landscape.update(noan?0:t);controls.update();controls.target.x=THREE.MathUtils.clamp(controls.target.x,-48,48);controls.target.z=THREE.MathUtils.clamp(controls.target.z,-48,48);const heat=THREE.MathUtils.clamp((window.s?.heat??100)/100,.12,1);flames.forEach((f,i)=>{const a=i*2.4,q=noan?.35:(t*(.35+(i%4)*.09)+i/16)%1;f.position.set(fireAnchor.x+Math.cos(a)*.23*(1-q)*fireScale,fireAnchor.y+q*.95*fireScale,fireAnchor.z+Math.sin(a)*.23*fireScale);f.scale.set((.25+(1-q)*.5)*fireScale,(.35+(1-q)*.9)*fireScale,1);f.material.opacity=heat*(1-q)*.48;f.visible=modelReady;});sideFlames.forEach((f,i)=>{const anchor=sideFireAnchors[Math.floor(i/4)];f.visible=modelReady&&Boolean(anchor);if(!anchor)return;const q=noan?.35:(t*.6+(i%4)/4)%1;f.position.set(anchor[0]+Math.sin(i)*.06,anchor[1]+q*.55,anchor[2]+Math.cos(i)*.06);f.scale.set(.2+(1-q)*.22,.25+(1-q)*.55,1);f.material.opacity=heat*(1-q)*.5;});for(let i=0;i<60;i++){const q=noan?i/60:(t*.22+i/60)%1;sparkPos[i*3]=fireAnchor.x+Math.sin(i*2.3+t)*q*.6*fireScale;sparkPos[i*3+1]=fireAnchor.y+.08*fireScale+q*2.7*fireScale;sparkPos[i*3+2]=fireAnchor.z+Math.cos(i*3.2)*q*.4*fireScale;}const visualLevel=window.city3d?.hearthVisualLevel||1;sparkGeo.setDrawRange(0,Math.min(60,12+Math.floor(visualLevel*.9)));sparks.material.size=.055*fireScale;smoke.forEach((sp,i)=>{const q=(t*.15+i/7)%1;sp.visible=modelReady&&!noan&&visualLevel>=15;sp.position.set(fireAnchor.x+q*.55*fireScale,fireAnchor.y+(.6+q*2.6)*fireScale,fireAnchor.z+Math.sin(i+q)*.14);sp.scale.setScalar((.4+q*1.15)*fireScale);sp.material.opacity=heat*Math.sin(q*Math.PI)*.18;});sparkGeo.attributes.position.needsUpdate=true;sparks.visible=modelReady&&!noan;fireLight.intensity=modelReady?heat*fireScale*(17+(noan?0:Math.sin(t*13)*2)):0;renderer.render(scene,camera);window.city3d.triangles=renderer.info.render.triangles;}
requestAnimationFrame(frame);
