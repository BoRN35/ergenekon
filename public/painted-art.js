/* Original illustrated game art. This read-only helper never touches a save. */
(function(root){
 'use strict';
 var url='./assets/interface/painted/strategy-atlas.webp',cols=4,rows=4;
 var names=['toolbox','medicalyurt','trainingrack','bandages','astrolabe','banner','encampment','wood','ore','steel','coal','food','crystal','coins','bow','anvil'];
 var aliases={
  toolbox:'toolbox',tooling:'toolbox',carpentry:'toolbox',construction:'toolbox',build:'toolbox',hammer:'toolbox',settings:'toolbox',
  medicalyurt:'medicalyurt',medicaltent:'medicalyurt',medical:'medicalyurt',infirmary:'medicalyurt',ward:'medicalyurt',sifa:'medicalyurt',hospital:'medicalyurt',
  trainingrack:'trainingrack',training:'trainingrack',trainer:'trainingrack',military:'trainingrack',army:'trainingrack',kisla:'trainingrack',
  bandages:'bandages',bandage:'bandages',bandaging:'bandages',heal:'bandages',medicine:'bandages',
  astrolabe:'astrolabe',research:'astrolabe',scroll:'astrolabe',researchtools:'astrolabe',chronicle:'astrolabe',r:'astrolabe',
  banner:'banner',command:'banner',march:'banner',caravan:'banner',alliance:'banner',
  encampment:'encampment',camp:'encampment',city:'encampment',oba:'encampment',yurt:'encampment',growth:'encampment',
  wood:'wood',odun:'wood',timber:'wood',lumber:'wood',
  ore:'ore',iron:'ore',demir:'ore',stone:'ore',
  steel:'steel',celik:'steel',
  coal:'coal',komur:'coal',fuel:'coal',
  food:'food',et:'food',meat:'food',grain:'food',wheat:'food',provisions:'food',
  crystal:'crystal',kristal:'crystal',kristalparcasi:'crystal',aritilmiskristal:'crystal',wartech:'crystal',kor:'crystal',
  coins:'coins',coin:'coins',gold:'coins',economy:'coins',market:'coins',
  bow:'bow',quiver:'bow',attack:'bow',marksman:'bow',avci:'bow',
  anvil:'anvil',smith:'anvil',demirci:'anvil'
 };
 // The order is intentional: ward capacity and healing speed are different subjects.
 var families=[
  [/tooling-up|masonry|construction|carpent|builder|build-speed/,'toolbox'],
  [/ward-expansion|infirmary|hospital|ward-capacity/,'medicalyurt'],
  [/bandaging|bandage|heal|medicin|first-aid/,'bandages'],
  [/tool-enhancement|research-tool|research-speed|researching|scholar|book/,'astrolabe'],
  [/command-tactic|command|march|deployment|logistic|dispatch/,'banner'],
  [/camp-expansion|regimental|encampment|camp|batch/,'encampment'],
  [/trainer-tool|training-tool|training|train|drill|combat|infantry|lancer|shield|armor|defen|health|survival|wall|grip|mantle|garb|helm|bastion|pauldron|vambrace/,'trainingrack'],
  [/wood|lumber|timber/,'wood'],
  [/coal|fuel/,'coal'],
  [/steel|smelt/,'steel'],
  [/iron|mining|ore/,'ore'],
  [/food|meat|grain|ration/,'food'],
  [/barter|gather|econom|output|production|prod/,'coins'],
  [/attack|weapon|marksman|snip|target|assault|reprisal|shot|pike|armament|cadence|blunderbuss/,'bow'],
  [/exalted|helios|flame|molten|blazing|crystal|solar|starfire|kor/,'crystal']
 ];
 function kind(value){var key=String(value||'').trim().toLowerCase();if(Object.prototype.hasOwnProperty.call(aliases,key))return aliases[key];if(key.indexOf('wos_')===0){for(var i=0;i<families.length;i++)if(families[i][0].test(key))return families[i][1];return 'astrolabe'}return ''}
 function art(value){var key=kind(value),index=names.indexOf(key);if(index<0)return null;var x=index%cols,y=Math.floor(index/cols);return {url:url,key:key,index:index,x:x,y:y,cols:cols,rows:rows,width:1254,height:1254,position:(x*100/(cols-1))+'% '+(y*100/(rows-1))+'%'}}
 function escape(value){return String(value==null?'':value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
 function html(value,className){var image=art(value);if(!image)return '';return '<span class="painted-game-icon painted-game-art'+(className?' '+escape(className):'')+'" data-painted-kind="'+image.key+'" aria-hidden="true" style="display:inline-block;background-image:url(\''+image.url+'\');background-size:400% 400%;background-position:'+image.position+';background-repeat:no-repeat"></span>'}
 art.kind=kind;art.keys=names.slice();art.atlas={url:url,cols:cols,rows:rows,width:1254,height:1254};
 root.paintedGameArt=art;root.paintedGameIconHtml=html;
})(typeof window!=='undefined'?window:globalThis);
