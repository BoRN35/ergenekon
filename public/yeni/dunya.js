/* Ergenekon yeni — dünya verisi. Eski oyunun index.html (lay, denseWorld) ve ergenekon-fauna.js kodundan birebir alınmıştır;
   canavar ve kaynak indeksleri eski kayıtla (s.mk, s.nodes) aynı kalsın diye değiştirilmez. */
(function(W){
'use strict';
var M=W.M=[['Bozkır Kurdu','🐺',2,62,70],['Kara Ayı','🐻',4,35,72],['Yılan Ruhu','🐍',6,22,50],['Albastı','👺',8,35,28],['Kızıl Boğa','🐂',11,57,26],['Buz Devi','🧊',14,76,48],['Tepegöz','👁️',17,17,40],['Karakoncolos','👹',20,75,20],['Evren Ejderi','🐉',24,62,88],['Demir Dev','🗿',28,88,60],['Erlik’in Gölgesi','👻',33,25,90],['Erlik Han','💀',40,44,12],['Çayır Kurdu','🐺',1,50,67]];
var CHS=W.CHS=[[66,40],[30,62],[70,56],[44,82],[80,40],[16,60],[84,80],[62,6],[24,28,'o'],[76,24,'o'],[38,88,'o'],[10,46,'m'],[60,86,'m'],[90,58,'m'],[36,10,'m'],[50,20,'k',0],[22,72,'k',1],[78,70,'k',2]];
var LV=W.LV=[1,2,3,4,5,6,8,9,10,11,12,13,14,15,16,18,19,20];
var LAYN=null;
function lay(){var P=[],i,j,it;for(i=0;i<18;i++){var rr=[14,25,36][Math.floor(i/6)],a=((i%6)*60+Math.floor(i/6)*25)*Math.PI/180;P.push({k:0,i:i,x:50+rr*Math.cos(a),y:50+rr*Math.sin(a),r:5.2})}
M.slice(0,13).forEach(function(d,m){P.push({k:1,i:m,x:d[3],y:d[4],r:5.2})});CHS.forEach(function(c,q){P.push({k:2,i:q,x:c[0],y:c[1],r:3.2})});
P.forEach(function(p){p.ox=p.x;p.oy=p.y});
for(it=0;it<500;it++){for(i=0;i<P.length;i++){var a=P[i];for(j=i+1;j<P.length;j++){var b=P[j],dx=b.x-a.x,dy=(b.y-a.y)*1.15,d=Math.hypot(dx,dy)||.01,md=a.r+b.r+(a.k===2||b.k===2?1:2.2);if(d<md){var f=(md-d)/d*.5*.6;a.x-=dx*f;a.y-=dy*f/1.15;b.x+=dx*f;b.y+=dy*f/1.15}}
var cx=a.x-50,cy=a.y-50,cd=Math.hypot(cx,cy)||.01,mn=a.k===2?8:11,mx=a.k===2?47:43;if(cd<mn){a.x=50+cx/cd*mn;a.y=50+cy/cd*mn}else if(cd>mx){a.x=50+cx/cd*mx;a.y=50+cy/cd*mx}
a.x+=(a.ox-a.x)*.01;a.y+=(a.oy-a.y)*.01}}
LAYN=W.LAYN=[];P.forEach(function(p){var x=Math.round(p.x*10)/10,y=Math.round(p.y*10)/10;if(p.k===0)LAYN[p.i]=[x,y];else if(p.k===1){M[p.i][3]=x;M[p.i][4]=y}else{CHS[p.i][0]=x;CHS[p.i][1]=y}});denseWorld();}
function denseWorld(){
 var seed=61241,occupied=LAYN.map(function(p){return p.slice()}).concat(M.slice(0,13).map(function(m){return[m[3],m[4]]}),CHS.map(function(c){return[c[0],c[1]]}));
 function random(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}
 function locate(order){var ring=Math.floor(order/18),target=11+ring*3.65,best=null,score=-1;
  for(var attempt=0;attempt<90;attempt++){var angle=(order*2.399963229728653+random()*.75),radius=Math.max(9.5,Math.min(47,target+(random()-.5)*4)),point=[50+Math.cos(angle)*radius,50+Math.sin(angle)*radius],distance=99;
   occupied.forEach(function(p){distance=Math.min(distance,Math.hypot(p[0]-point[0],p[1]-point[1]))});if(distance>score){score=distance;best=point}if(distance>=4.4)break;
  }best=best.map(function(v){return Math.round(v*100)/100});occupied.push(best);return best;
 }
 var base=M.slice(0,13),species=[12,0,1,2,3,4,5,6,7,8,9,10],node=18,mob=13;
 for(var order=0;node<108||mob<96;order++){
  var point=locate(order),radius=Math.hypot(point[0]-50,point[1]-50),ring=Math.floor(order/18);
  if((order%2===0&&node<108)||mob>=96){LAYN[node]=point;LV[node]=Math.max(1,Math.min(20,Math.round((radius-9)/2)));node++}
  else{var level=Math.max(1,Math.min(39,[1,2,3,5,8,12,17,23,30,37][Math.min(9,ring)]));var type=species.filter(function(i){return base[i][2]<=level}).at(-1)??12;M[mob]=[base[type][0],base[type][1],level,point[0],point[1],type];mob++}
 }
 var herds=[{level:1,base:12},{level:2,base:0},{level:4,base:1},{level:6,base:2},{level:11,base:4},{level:17,base:6},{level:24,base:8}];
 herds.forEach(function(herd,h){for(var j=0;j<12;j++){var order=h*12+j,best=null,score=-1;
  for(var a=0;a<70;a++){var angle=order*2.3999632297+random()*1.2,radius=Math.min(47,Math.max(10,11+h*4.5+(random()-.5)*9)),point=[50+Math.cos(angle)*radius,50+Math.sin(angle)*radius],distance=99;occupied.forEach(function(p){distance=Math.min(distance,Math.hypot(p[0]-point[0],p[1]-point[1]))});if(distance>score){score=distance;best=point}if(distance>3.1)break;}
  best=best.map(function(v){return Math.round(v*100)/100});occupied.push(best);M.push([base[herd.base][0],base[herd.base][1],herd.level,best[0],best[1],herd.base]);
 }});
}
lay();
  var SP = [
    ['Çayır Kurdu', '🐺', 1, 6, 12, 5],
    ['Karaca', '🦌', 1, 8, 21, 5],
    ['Kızıl Tilki', '🦊', 1, 7, 15, 4],
    ['Yaban Domuzu', '🐗', 2, 10, 14, 5],
    ['Ala Geyik', '🦌', 3, 12, 13, 3],
    ['Bozkır Kurdu', '🐺', 4, 12, 0, 4],
    ['Kara Ayı', '🐻', 5, 14, 1, 3],
    ['Börü Kartalı', '🦅', 6, 16, 17, 3],
    ['Yılan Ruhu', '🐍', 7, 16, 2, 2],
    ['Bozayı', '🐻', 11, 20, 22, 5],
    ['Alageyik', '🦌', 11, 20, 23, 5],
    ['Vaşak', '🐈', 11, 20, 24, 4],
    ['Yaban Atı Sürüsü', '🐎', 12, 20, 25, 4],
    ['Yaban Öküzü', '🐃', 9, 18, 18, 3],
    ['Albastı', '👺', 10, 19, 3, 2],
    ['Kar Parsı', '🐆', 12, 22, 19, 3],
    ['Kızıl Boğa', '🐂', 13, 23, 4, 2],
    ['Anadolu Parsı', '🐆', 21, 30, 26, 5],
    ['Dağ Keçisi Sürüsü', '🐐', 21, 30, 27, 5],
    ['Kartal', '🦅', 21, 30, 28, 4],
    ['Kara Kurt Sürüsü', '🐺', 22, 30, 29, 5],
    ['Buz Devi', '🧊', 18, 27, 5, 2],
    ['Bozkır Mamutu', '🦣', 20, 29, 20, 3],
    ['Tepegöz', '👁️', 22, 31, 6, 2],
    ['Karakoncolos', '👹', 24, 33, 7, 2],
    ['Ak Geyik', '🦌', 31, 40, 30, 5],
    ['Kara Boğa', '🐂', 31, 40, 31, 5],
    ['Börü Ana’nın Yavruları', '🐺', 31, 40, 32, 4],
    ['Ejder Yavrusu', '🐉', 32, 40, 33, 4],
    ['Evren Ejderi', '🐉', 30, 39, 8, 2],
    ['Demir Dev', '🗿', 33, 39, 9, 2],
    ['Erlik’in Gölgesi', '👻', 35, 39, 10, 2]
  ];
  var HERD = { 25: 1, 27: 1, 29: 1, 32: 1 }, PACK = { 0: 1, 12: 1, 29: 1, 32: 1, 25: 1, 27: 1 }, LEGEND = { 30: 1, 32: 1, 33: 1 };
  W.ekFaunaLegend = LEGEND;
  function rnd(i) { var x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); }
  function reassign() {
    var M = W.M; if (!M || M.length < 14 || M.__ekFauna) return;
    for (var i = 13; i < M.length; i++) {
      var m = M[i]; if (!m) continue;
      var lv = Math.max(1, Math.min(39, m[2] + Math.round((rnd(i) - 0.35) * 3)));
      var pool = SP.filter(function (sp) { return lv >= sp[2] && lv <= sp[3]; });
      if (!pool.length) continue;
      var tot = pool.reduce(function (a, sp) { return a + sp[5]; }, 0), r = rnd(i + 999) * tot, pick = pool[0];
      for (var k = 0; k < pool.length; k++) { r -= pool[k][5]; if (r <= 0) { pick = pool[k]; break; } }
      var x = m[3] + (rnd(i + 7) - .5) * 2.4, y = m[4] + (rnd(i + 11) - .5) * 2.4;
      M[i] = [pick[0], pick[1], lv, x, y, pick[4]];
    }
    // sürü/kurt grupları: aynı türden yakın komşular 2–3'lü öbek olur
    for (var j = 14; j < M.length; j++) {
      var a = M[j], b0 = a && PACK[a[5]] ? a : null; if (!b0 || rnd(j + 5) < .35) continue;
      for (var q = 13; q < j; q++) { var c = M[q]; if (!c || c[5] !== a[5] || Math.abs(c[2] - a[2]) > 4) continue; var dd = Math.hypot(c[3] - a[3], c[4] - a[4]); if (dd < 9 && dd > 2.2) { var ang = rnd(j * 3) * Math.PI * 2; a[3] = c[3] + Math.cos(ang) * 2.4; a[4] = c[4] + Math.sin(ang) * 2.4; break; } }
    }
    M.__ekFauna = true;
  }
  reassign();
W.pos=function(i){if(i>=108&&i<114)return[40.123+(i-108)*2.4,55.456+(i-108)*1.8];return LAYN&&LAYN[i]||[50,50]};
W.monsterBase=function(i){return M[i]&&M[i][5]!==undefined?M[i][5]:i};
})(window);
