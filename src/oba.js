/**
 * Procedural Boy Obası. No network assets or paid generation.
 * Keep a radius-eight courtyard clear for the independently loaded sacred hearth.
 */
export function addOba({THREE,scene,targets,openBuilding}){
 if(!THREE||!scene)throw new TypeError('addOba requires THREE and scene');
 const group=new THREE.Group();group.name='BoyObasi';group.userData.building='oba';
 group.userData.activate=()=>openBuilding?.('oba');scene.add(group);
 if(Array.isArray(targets)&&!targets.includes(group))targets.push(group);
 const milestones=[0,5,10,15,20,25,30,35,40];
 const names=['İlk oba','Ahşap otağ','Düzenli avlu','Bey otağı','Taş temeller','Boy konağı','Sancaklı oba','Büyük otağ','Kağan obası'];
 const geometries=new Set(),materials=new Set(),textures=new Set(),geoCache=new Map(),matCache=new Map(),texCache=new Map();
 let currentStage=-1;
 function geometry(key,build){if(!geoCache.has(key)){const g=build();geometries.add(g);geoCache.set(key,g);}return geoCache.get(key);}
 function texture(kind){
  if(texCache.has(kind))return texCache.get(kind);
  if(typeof document==='undefined')return null;
  const canvas=document.createElement('canvas');canvas.width=canvas.height=128;
  const c=canvas.getContext('2d');if(!c)return null;
  const base={wood:'#83705a',felt:'#e0d4b9',stone:'#a39b88',banner:'#2b7379'}[kind]||'#aaa';
  c.fillStyle=base;c.fillRect(0,0,128,128);
  let seed=217;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  for(let i=0;i<950;i++){c.fillStyle=rand()>.5?'rgba(255,255,255,.10)':'rgba(34,23,15,.10)';const x=rand()*128,y=rand()*128;c.fillRect(x,y,kind==='wood'?1:1.6,kind==='wood'?10+rand()*32:1.6);}
  if(kind==='stone'){
   c.strokeStyle='rgba(51,43,33,.26)';c.lineWidth=2;
   for(let row=0;row<4;row++){const y=row*32;c.beginPath();c.moveTo(0,y);c.lineTo(128,y);c.stroke();for(let x=(row%2)*32;x<128;x+=64){c.beginPath();c.moveTo(x,y);c.lineTo(x,y+32);c.stroke();}}
  }
  if(kind==='felt'||kind==='banner'){
   c.fillStyle=kind==='banner'?'#bd9a59':'#726251';c.fillRect(0,8,128,5);c.fillRect(0,115,128,5);
   c.strokeStyle=kind==='banner'?'#d5b77a':'#8c7355';c.lineWidth=2;c.beginPath();
   for(let i=0;i<=8;i++){const x=i*16;c.moveTo(x,24);c.lineTo(x+8,33);c.lineTo(x+16,24);}c.stroke();
   if(kind==='banner'){c.lineWidth=5;c.beginPath();c.moveTo(64,44);c.lineTo(64,96);c.moveTo(48,52);c.lineTo(64,68);c.lineTo(80,52);c.moveTo(50,80);c.lineTo(64,96);c.lineTo(78,80);c.stroke();}
  }
  const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;
  t.anisotropy=2;textures.add(t);texCache.set(kind,t);return t;
 }
 function material(key,color,kind,extra={}){
  if(!matCache.has(key)){const m=new THREE.MeshStandardMaterial({color,map:kind?texture(kind):null,roughness:.94,...extra});materials.add(m);matCache.set(key,m);}return matCache.get(key);
 }
 function add(geo,mat,parent=group,x=0,y=0,z=0){const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 const box=(w,h,d)=>geometry('b'+[w,h,d].join(','),()=>new THREE.BoxGeometry(w,h,d));
 const cylinder=(top,bottom,h,n=12)=>geometry('c'+[top,bottom,h,n].join(','),()=>new THREE.CylinderGeometry(top,bottom,h,n));
 const cone=(r,h,n=16)=>geometry('k'+[r,h,n].join(','),()=>new THREE.ConeGeometry(r,h,n));
 const ring=(r,t)=>geometry('t'+[r,t].join(','),()=>new THREE.TorusGeometry(r,t,4,24));
 function banner(parent,x,y,z,width,height,mat,bronze){
  add(cylinder(.035,.045,height+.65,6),bronze,parent,x,y+(height+.65)/2,z);
  const cloth=add(box(width,height,.025),mat,parent,x+width*.47,y+height*.68,z);cloth.rotation.z=-.035;
 }
 function tent({x,z,radius,height,stage,main=false},m){
  const t=new THREE.Group();t.position.set(x,0,z);t.rotation.y=Math.atan2(-x,-z);group.add(t);
  if(stage>=2)add(cylinder(radius+.16,radius+.20,.32,12),m.stone,t,0,.16,0);
  const floor=stage>=2?.32:.08;
  add(cylinder(radius*.97,radius,height,20),m.felt,t,0,floor+height/2,0);
  const roof=add(cone(radius*1.05,.9+stage*.09,20),m.roof,t,0,floor+height+(.9+stage*.09)/2,0);
  roof.userData.part='felt-roof';
  for(const y of [floor+.22,floor+height-.18]){const band=add(ring(radius*.985,.045),m.wood,t,0,y,0);band.rotation.x=Math.PI/2;}
  add(box(.90,1.55,.12),m.dark,t,0,floor+.78,radius*.99);
  if(stage>=1){
   add(box(1.18,.16,.22),m.wood,t,0,floor+1.64,radius+ .02);
   for(const side of [-1,1])add(box(.12,1.72,.18),m.wood,t,side*.55,floor+.86,radius+.02);
  }
  if(main&&stage>=3){
   add(box(2.45,.15,.8),m.wood,t,0,floor+2.32,radius+.28).rotation.x=-.08;
   const posts=new THREE.InstancedMesh(cylinder(.075,.095,2.3,6),m.wood,2),dummy=new THREE.Object3D();
   for(let i=0;i<2;i++){dummy.position.set(i?1.03:-1.03,floor+1.15,radius+.60);dummy.updateMatrix();posts.setMatrixAt(i,dummy.matrix);}posts.castShadow=posts.receiveShadow=true;t.add(posts);
  }
  if(stage>=5){const crest=add(cone(.30,.60,8),m.bronze,t,0,floor+height+1.15+stage*.09,0);crest.userData.part='roof-crown';}
  if(main&&stage>=6){
   for(const side of [-1,1])banner(t,side*(radius-.25),floor+height-.1,.1,.55,1.25,m.banner,m.bronze);
  }
 }
 function stageGround(stage,m){
  if(stage<2)return;
  // The annulus deliberately has no triangles or props inside radius 8.6.
  const g=geometry('court-ring-arc',()=>new THREE.RingGeometry(9.1,9.6,2,1,0,Math.PI/32));const road=new THREE.InstancedMesh(g,m.stone,64),arc=new THREE.Object3D();for(let i=0;i<64;i++){arc.position.set(0,.035,0);arc.rotation.set(-Math.PI/2,0,i*Math.PI/32);arc.updateMatrix();road.setMatrixAt(i,arc.matrix);}road.receiveShadow=true;group.add(road);
  for(const side of [-1,1]){const rug=add(box(2.3,.035,3.2),m.rug,group,side*11,.06,6.2);rug.rotation.y=side*.12;}
 }
 function boundary(stage,m){
  const stone=stage>=4,height=stage<1?.55:stone?1.15+stage*.07:.9;
  const wallMat=stone?m.stone:m.wood;
  for(const side of [-1,1])add(box(stone?.45:.18,height,27.5),wallMat,group,side*16.25,height/2,-.4);
  add(box(32.5,height,stone?.45:.18),wallMat,group,0,height/2,-14.15);
  for(const side of [-1,1])add(box(9.3,height,stone?.45:.18),wallMat,group,side*11.6,height/2,13.3);
  const positions=[];for(const side of [-1,1])for(let i=0;i<11;i++)positions.push([side*16.25,-13.9+i*2.6]);
  for(let i=0;i<13;i++)positions.push([-15.6+i*2.6,-14.15]);
  for(const side of [-1,1])for(let i=0;i<4;i++)positions.push([side*(7.1+i*2.55),13.3]);
  const posts=new THREE.InstancedMesh(stone?box(.62,height+.25,.62):cylinder(.11,.14,height+.35,6),wallMat,positions.length),dummy=new THREE.Object3D();
  positions.forEach(([x,z],i)=>{dummy.position.set(x,(height+.25)/2,z);dummy.updateMatrix();posts.setMatrixAt(i,dummy.matrix);});posts.castShadow=posts.receiveShadow=true;group.add(posts);
 }
 function entry(stage,m){
  const h=stage===0?2.0:2.8+stage*.20,span=5.0;
  for(const side of [-1,1]){
   add(stage>=4?box(.85,h,.85):cylinder(.19,.24,h,8),stage>=4?m.stone:m.wood,group,side*span,h/2,13.3);
   if(stage>=1)banner(group,side*(span+.6),.05,13.3,.9,1.8+stage*.05,m.banner,m.bronze);
  }
  add(box(span*2+.85,.32,.70),m.wood,group,0,h+.05,13.3);
  if(stage>=3){
   add(box(span*2+1.2,.22,1.75),m.roof,group,0,h+.40,13.3).rotation.x=.05;
   if(stage>=6)add(box(4.8,.48,.16),m.bronze,group,0,h+.02,13.72);
   if(stage>=8){add(box(span*2+1.7,.24,2.3),m.roof,group,0,h+.85,13.3);for(const side of [-1,1])add(box(1.1,.42,1.05),m.stone,group,side*span,h+.35,13.3);const seal=add(cylinder(.39,.39,.09,12),m.bronze,group,0,h+.15,13.79);seal.rotation.x=Math.PI/2;}
  }
 }
 function storage(stage,m){
  const points=[[-14.4,4],[-13.65,4],[-14.4,4.85],[14.2,5],[13.5,5],[14.2,5.8]];
  const count=stage>=5?6:stage>=1?4:2,dummy=new THREE.Object3D();
  const crates=new THREE.InstancedMesh(box(.67,.65,.70),m.wood,count);
  for(let i=0;i<count;i++){dummy.position.set(points[i][0],.34,points[i][1]);dummy.rotation.y=(i%3)*.12;dummy.updateMatrix();crates.setMatrixAt(i,dummy.matrix);}crates.castShadow=crates.receiveShadow=true;group.add(crates);
 }
 function cornerPavilions(stage,m){
  if(stage<4)return;
  for(const side of [-1,1]){
   const x=side*15,z=-11.4,h=stage>=7?3.0:2.25;
   add(cylinder(.85,1.0,h,8),m.stone,group,x,h/2,z);
   add(cone(1.32,.90,8),m.roof,group,x,h+.45,z);
   if(stage>=6)banner(group,x,h+.4,z,.65,1.05,m.banner,m.bronze);
  }
 }
 function marker(stage){
  if(typeof document==='undefined')return;
  const c=document.createElement('canvas');c.width=512;c.height=96;const x=c.getContext('2d');if(!x)return;
  x.fillStyle='rgba(23,31,37,.90)';x.fillRect(0,0,512,96);x.strokeStyle='#b89961';x.lineWidth=4;x.strokeRect(3,3,506,90);
  x.fillStyle='#edddbb';x.textAlign='center';x.font='bold 27px sans-serif';x.fillText('BOY OBASI',256,38);x.fillStyle='#c6b58e';x.font='21px sans-serif';x.fillText(names[stage]+' · Sv '+milestones[stage]+'+',256,72);
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;textures.add(t);
  const m=new THREE.SpriteMaterial({map:t,transparent:true,depthWrite:false});materials.add(m);const sprite=new THREE.Sprite(m);sprite.name='ObaNameMarker';sprite.position.set(0,5.35+stage*.12,13.3);sprite.scale.set(6.0,1.125,1);group.add(sprite);
 }
 function disposeStage(){
  group.clear();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());
  geometries.clear();materials.clear();textures.clear();geoCache.clear();matCache.clear();texCache.clear();
 }
 function update(){
  const s=typeof window!=='undefined'?window.s:globalThis.s;
  const raw=Number(s?.l?.oba??0),level=Number.isFinite(raw)?Math.max(0,Math.min(40,Math.floor(raw))):0;
  const stage=milestones.reduce((value,threshold,i)=>level>=threshold?i:value,0);
  group.userData.level=level;group.userData.stage=stage;group.userData.milestone=milestones[stage];group.userData.name='Boy Obası';
  if(stage===currentStage)return false;
  disposeStage();currentStage=stage;
  const m={
   wood:material('wood','#897055','wood'),dark:material('dark','#332b21'),stone:material('stone','#b2aa95','stone'),
   felt:material('felt',stage>=6?'#e8dcc3':'#d7c9ae','felt'),roof:material('roof',stage>=3?'#9e8970':'#b4a184','felt'),
   bronze:material('bronze','#a07c43',null,{metalness:.55,roughness:.65}),
   banner:material('banner','#6aabad','banner',{side:THREE.DoubleSide}),rug:material('rug','#9b6853','felt')
  };
  stageGround(stage,m);boundary(stage,m);entry(stage,m);
  tent({x:0,z:-11.7,radius:2.25+stage*.09,height:1.85+stage*.13,stage,main:true},m);
  for(const side of [-1,1])tent({x:side*13,z:-2.5,radius:1.85+stage*.065,height:1.6+stage*.06,stage},m);
  if(stage>=2)for(const side of [-1,1])tent({x:side*12.6,z:8.0,radius:1.55+stage*.035,height:1.55+stage*.045,stage:Math.max(0,stage-2)},m);
  cornerPavilions(stage,m);storage(stage,m);marker(stage);
  group.userData.meshes=0;group.traverse(o=>{if(o.isMesh)group.userData.meshes++;});
  return true;
 }
 update();return {update,group};
}
