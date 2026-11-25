/* Cacheable, original Ergenekon artwork; decoded byte-for-byte from existing IMG assets. */
(function(root){
 'use strict';
 var files={growth:'growth',sacred:'sacred',scroll:'scroll',hammer:'hammer',medicaltent:'medicaltent',military:'military',command:'command',economy:'economy',heroes:'heroes',mail:'mail',chronicle:'chronicle',attack:'attack',events:'events',world:'world',wartech:'wartech',wood:'wood'};
 var aliases={c:'growth',city:'growth',oba:'growth',alliance:'growth',a:'growth',b:'growth',growth:'growth',medicaltent:'medicaltent',heal:'medicaltent',ward:'medicaltent',sifa:'medicaltent',hammer:'hammer',build:'hammer',construction:'hammer',settings:'hammer',g:'hammer',admin:'hammer',z:'hammer',scroll:'scroll',research:'scroll',r:'scroll',command:'command',march:'command',caravan:'command',military:'military',army:'military',war:'military',battle:'military',k:'military',arena:'attack',y:'attack',economy:'economy',economie:'economy',market:'economy',heroes:'heroes',hero:'heroes',alp:'heroes',h:'heroes',mail:'mail',p:'mail',events:'events',event:'events',e:'events',chronicle:'chronicle',story:'chronicle',history:'chronicle',u:'chronicle',sacred:'sacred',hearth:'sacred',ocak:'sacred',world:'world',map:'world',m:'world',wartech:'wartech',kor:'wartech',wood:'wood',odun:'wood',attack:'attack',defense:'military'};
 var families=[[/ward|bandag|heal|medicin|first-aid|sifa/,'medicaltent'],[/tooling|masonry|bld|construction/,'hammer'],[/tool-enhance|rspeed|research|book/,'scroll'],[/command|march|regimental|deployment|camp|logistic|batch/,'command'],[/wood|lumber|fuel/,'wood'],[/coal|iron|mining|output|prod|econom|food|meat|gather|barter|ration/,'economy'],[/shield|armor|plating|guard|defense|health|survival|wall|scales|grips|veil|mantle|garb|helm|bastion|pauldron|vambrace/,'military'],[/attack|combat|lance|marksman|infantry|weapons|snip|target|assaut|assault|reprisal|shot|tactic|pike|armament|cadence|blunderbuss/,'attack'],[/exalted|helios|flame|molten|blazing|crystal|solar|starfire|kor/,'wartech']];
 function kind(value){
  var key=String(value||'').trim().toLowerCase();if(Object.prototype.hasOwnProperty.call(aliases,key))return aliases[key];
  if(key.indexOf('wos_')===0){for(var i=0;i<families.length;i++)if(families[i][0].test(key))return families[i][1];return 'scroll'}
  return '';
 }
 function art(value){var key=kind(value);return key&&files[key]?'./assets/interface/icons/'+files[key]+'.webp':''}
 art.kind=kind;
 root.gameThemeArt=art;
})(typeof window!=='undefined'?window:globalThis);
