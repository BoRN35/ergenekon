/* Ergenekon research rules. Adapted mechanics, not an import of wiki text/art or prices.
 * Reference mechanics: https://www.whiteoutsurvival.wiki/research/
 * /research/tool-enhancement-i/ : research speed
 * /research/command-tactics-i/ : dependency-gated extra march queues
 * /research/wood-gathering-i/ and /research/iron-mining-i/ : resource-specific gathering
 * /research/close-combat-i/ and /research/shield-upgrade-i/ : troop-specific combat stats
 * Costs use Ergenekon's wood/meat/iron economy and Ocak level cap of 40.
 */
(function(root){
 'use strict';
 var catalog=[],tree={b:[],e:[],s:[]},byKey=Object.create(null);
 function add(branch,key,name,emoji,text,parent,unlock,material,time,extra){
  var legacy=unlock===null,z={k:key,n:name,e:emoji,t:text,max:10,branch:branch,parent:parent||null,legacy:legacy,unlock:legacy?4:unlock,material:material||1,time:time||1,extra:extra||[]};
  catalog.push(z);byKey[key]=z;tree[branch].push([key,parent||null]);
 }
 // Existing save identifiers, original bonuses, and level gates are retained.
 add('e','prod','Verimli Hasat','🌾','Her seviyede +%4 üretim',null,null,1,1);
 add('b','cap','Büyük Ambar','📦','Her seviyede +%10 depo kapasitesi','bld',null,1,1);
 add('b','bld','Usta İşçilik','🔨','Her seviyede +%3 inşaat hızı',null,null,1,1);
 add('s','war','Savaş Sanatı','⚔️','Her seviyede +%5 ordu gücü',null,null,1,1);
 add('s','hero','Alp Eğitimi','🏹','Her seviyede +%3 Alp gücü','war',null,1,1);
 add('e','mine','Maden Bilgisi','⛏️','Her seviyede +%4 tüm kaynak toplama hızı','meat',null,1,1);
 add('b','heal','Koğuş Genişletme','🏥','Her seviyede +%8 Alp can yenilenmesi ve +%10 yaralı kapasitesi','bld',null,1,1);
 add('b','camp','Kamp Genişletme','🏕️','Her seviyede +%6 asker kapasitesi ve +%10 kafile yükü','heal',null,1,1);
 add('e','wood','Odun Üretimi','🪵','Her seviyede +%5 şehirde odun üretimi','prod',null,1,1);
 add('e','meat','Et Üretimi','🍖','Her seviyede +%5 şehirde et üretimi','prod',null,1,1);
 add('e','iron','Demir Üretimi','⛓️','Her seviyede +%5 şehirde demir üretimi','wood',null,1,1);
 add('s','trap','Siper Dizilişi','🛡️','Her seviyede +%5 akın savunması','war',null,1,1);
 add('s','xpb','Çatışma Taktikleri','🗡️','Her seviyede +%4 Alp tecrübe kazanımı','hero',null,1,1);
 add('s','spd','Hızlı Talim','🪖','Her seviyede −%4 asker eğitim süresi','war',null,1,1);
 add('b','bandage','Sargı Ustalığı','🩹','Her seviyede −%4 yaralı iyileştirme süresi','heal',null,1,1);
 // Growth: independent, functional improvements with their own unlocks and dependencies.
 add('b','rspeed','Bilgelik Ocağı','📚','Her seviyede +%3 araştırma hızı','bld',4,.8,.65);
 add('b','batch','Talim Meydanı','🎯','Her seviyede tek eğitimde +5 asker','camp',6,1.05,.9);
 add('b','march','Bozkır Yolları','🐎','Her seviyede +%3 kafile yürüyüş hızı','camp',6,.9,.8);
 add('b','logistics','Kafile Düzeni','🧺','Her seviyede +%8 kafile yük kapasitesi','march',8,1.15,1.05);
 add('b','ward','Şifa Çadırları','⛑️','Her seviyede +%10 yaralı kapasitesi','heal',6,.85,.8);
 add('b','medicine','Şifalı Otlar','🌿','Her seviyede −%2 iyileştirme hammaddesi','bandage',8,1.1,.95);
 add('b','masonry','Taşçı Ustalığı','🪨','Her seviyede −%1 yapı hammaddesi','bld',8,1.4,1.2);
 add('b','command','Boy Buyruğu','📯','Her seviyede +%2 asker kapasitesi; Sv5 ve10’da +1 kafile','batch',12,1.5,1.4,[['bandage',1],['spd',1]]);
 // Economy: city output and gathering remain distinct systems.
 add('e','gatherwood','Orman Bilgisi','🪓','Her seviyede +%5 haritada odun toplama hızı','wood',6,.85,.7);
 add('e','gathermeat','Sürü İzleri','🐾','Her seviyede +%5 haritada et toplama hızı','meat',6,.85,.7);
 add('e','gatheriron','Damar Arama','⚒️','Her seviyede +%5 haritada demir toplama hızı','iron',10,1.2,1.05,[['mine',1]]);
 add('e','fuel','Kor Saklama','🪵','Her seviyede −%2 Ocağın odun tüketimi','wood',8,.95,.85);
 add('e','rations','Azık Düzeni','🥣','Her seviyede −%2 halkın et tüketimi','meat',8,.95,.85);
 add('e','barter','İpek Yolu Pazarı','⚖️','Her seviyede pazar takasında +1 yüzde puanı verim','mine',12,1.3,1.15);
 add('e','protection','Gizli Ambarlar','🔐','Her seviyede yağmada kaybedilen kaynaktan −1 yüzde puanı','fuel',12,1.25,1.1,[['cap',1],['rations',1]]);
 // Battle: each troop type has attack, defense, and health development.
 add('s','infatk','Alp Kılıçları','🗡️','Her seviyede +%3 Alp Er saldırısı','war',6,1,.85);
 add('s','cavatk','Atlı Hücumu','🏇','Her seviyede +%3 Atlı saldırısı','war',8,1.1,.95);
 add('s','archatk','Keskin Oklar','🏹','Her seviyede +%3 Okçu saldırısı','war',8,1.05,.9);
 add('s','infdef','Kalkan Duvarı','🛡️','Her seviyede +%2 Alp Er savunması','infatk',10,1.2,1.05);
 add('s','cavdef','Atlı Zırhları','🐴','Her seviyede +%2 Atlı savunması','cavatk',12,1.25,1.1);
 add('s','archdef','Okçu Siperleri','🏹','Her seviyede +%2 Okçu savunması','archatk',12,1.2,1.05);
 add('s','infhp','Alp Dayanıklılığı','❤️','Her seviyede +%3 Alp Er canı','infdef',14,1.35,1.2);
 add('s','cavhp','Bozkır Dayanıklılığı','💚','Her seviyede +%3 Atlı canı','cavdef',16,1.4,1.25);
 add('s','archhp','Okçu Dayanıklılığı','💛','Her seviyede +%3 Okçu canı','archdef',16,1.35,1.2);
 add('s','triage','Yaralı Tahliyesi','🚑','Her seviyede çatışmalarda −%2 yaralanma oranı','trap',18,1.5,1.35,[['medicine',1]]);
 function quote(key,level){
  var z=byKey[key];if(!z||!Number.isInteger(level)||level<0||level>=z.max)return null;
  var scale=Math.pow(1.9,level),unlockScale=z.legacy?1:1+(z.unlock-4)*.05,requirements=[],seen={};
  function require(k,l){if(!k||seen[k])return;seen[k]=true;requirements.push({key:k,level:l});}
  var needed=z.legacy?1:1+Math.floor(level/3);
  require(z.parent,needed);z.extra.forEach(function(p){require(p[0],Math.max(p[1],needed));});
  var material=z.material*unlockScale,time=z.time*unlockScale;
  return {cost:{odun:Math.ceil(300*scale*material),et:Math.ceil(200*scale*material),demir:Math.ceil(100*scale*material)},seconds:Math.ceil(600*Math.pow(1.4,level)*time),requiredOcak:z.legacy?4+3*level:Math.min(40,z.unlock+2*level),requirements:requirements};
 }
 root.ERGENEKON_RESEARCH={catalog:catalog,tree:tree,quote:quote};
})(typeof window!=='undefined'?window:globalThis);
