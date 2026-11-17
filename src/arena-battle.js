/** Deterministic five-cohort arena simulation. A cohort includes its captain and guards. */
const ROLES=['guard','warrior','archer','healer','mage'];
const ROLE_NAMES=['Kalkanbaşı','Kılıçbaşı','Okçubaşı','Şifacı','Kam'];
const HP_SHARE=[.28,.23,.18,.16,.15],ATK_SHARE=[.17,.25,.23,.10,.25],DEF_SHARE=[.32,.25,.17,.13,.13];
const ATTACK_INTERVAL=[2.3,1.95,2.25,2.8,2.6],ABILITY_COOLDOWN=[8,7,8.5,7.5,10];
const ROUND=value=>Math.round(value*1000)/1000;
const bounded=(value,name,allowZero=false)=>{const n=Number(value);if(!Number.isFinite(n)||n<(allowZero?0:Number.MIN_VALUE)||n>1e15)throw new TypeError('Invalid arena '+name);return n;};
function checkedStats(stats){if(!stats||typeof stats!=='object')throw new TypeError('Arena stats are required');return{atk:bounded(stats.atk,'attack',true),def:bounded(stats.def,'defence',true),hp:bounded(stats.hp,'health')};}
function seedNumber(value){if(typeof value==='number'&&Number.isFinite(value))return Math.floor(value)>>>0;let n=2166136261;for(const char of String(value??'ergenekon'))n=Math.imul(n^char.charCodeAt(0),16777619);return n>>>0;}
function seededRandom(seed){let value=seed>>>0;return()=>{value=(Math.imul(value,1664525)+1013904223)>>>0;return value/4294967296;};}
function fightersFor(team,stats,names){return ROLES.map((role,slot)=>({id:team+'-'+slot,team,slot,name:String(names?.[slot]||(team==='player'&&slot===0?'Alp Tonga':ROLE_NAMES[slot])).slice(0,40),role,maxHp:Math.max(1,ROUND(stats.hp*HP_SHARE[slot])),atk:Math.max(.2,stats.atk*ATK_SHARE[slot]),def:stats.def*DEF_SHARE[slot],attackInterval:ATTACK_INTERVAL[slot],abilityCooldown:ABILITY_COOLDOWN[slot]}));}

export function runArenaBattle(match){
 if(!match||typeof match!=='object')throw new TypeError('Arena match is required');
 const player=checkedStats(match.playerStats),enemy=checkedStats(match.enemyStats),seed=seedNumber(match.seed??match.id),random=seededRandom(seed);
 const fighters=[...fightersFor('player',player,match.heroNames),...fightersFor('enemy',enemy,match.enemyHeroNames)];
 const live=fighters.map(fighter=>({...fighter,hp:fighter.maxHp,nextAttack:2+random()*.24+fighter.slot*.095,nextAbility:5+fighter.slot*.55,shieldUntil:0}));
 const events=[],totalHp={player:fighters.filter(f=>f.team==='player').reduce((sum,f)=>sum+f.maxHp,0),enemy:fighters.filter(f=>f.team==='enemy').reduce((sum,f)=>sum+f.maxHp,0)};
 let time=2,iterations=0,winner=null,timedOut=false;
 const alive=team=>live.filter(f=>f.team===team&&f.hp>0);
 const opposite=team=>team==='player'?'enemy':'player';
 function targetFor(actor){const choices=alive(opposite(actor.team));if(!choices.length)return null;const front=choices.filter(target=>target.slot<2);const pool=front.length?front:choices;return pool[Math.floor(random()*pool.length)];}
 function hit(actor,target,multiplier=1,type='attack',skill){if(!target||actor.hp<=0||target.hp<=0)return;const shield=target.shieldUntil>time?.5:1;const power=Math.max(actor.atk*.22,actor.atk-target.def*.65);const raw=Math.max(.25,power*multiplier*(.91+random()*.18)*shield),amount=Math.min(target.hp,ROUND(raw));target.hp=ROUND(Math.max(0,target.hp-amount));events.push({time:ROUND(time),type,actor:actor.id,target:target.id,amount:ROUND(amount),hp:target.hp,...(skill?{skill}:{})});if(target.hp<=0)events.push({time:ROUND(time),type:'death',actor:actor.id,target:target.id,amount:0,hp:0});}
 function ability(actor){
  if(actor.role==='guard'){actor.shieldUntil=time+3.2;events.push({time:ROUND(time),type:'ability',actor:actor.id,target:actor.id,amount:0,hp:actor.hp,skill:'Kalkan duvarı',shieldUntil:ROUND(actor.shieldUntil)});return;}
  if(actor.role==='healer'){const allies=alive(actor.team).sort((a,b)=>a.hp/a.maxHp-b.hp/b.maxHp||a.slot-b.slot),target=allies[0];const amount=ROUND(Math.min(target.maxHp-target.hp,totalHp[actor.team]*.075));target.hp=ROUND(Math.min(target.maxHp,target.hp+amount));events.push({time:ROUND(time),type:'heal',actor:actor.id,target:target.id,amount,hp:target.hp,skill:'Umay’ın esintisi'});return;}
  if(actor.role==='warrior'){hit(actor,targetFor(actor),1.9,'ability','Kılıç fırtınası');return;}
  if(actor.role==='archer'){for(let i=0;i<3;i++)hit(actor,targetFor(actor),.76,'ability','Üçlü ok');return;}
  const targets=alive(opposite(actor.team));for(const target of targets)hit(actor,target,1.02,'ability','Köz yağmuru');
 }
 while(time<34.2&&iterations++<1200){
  if(!alive('player').length||!alive('enemy').length)break;
  const actor=live.filter(f=>f.hp>0).sort((a,b)=>Math.min(a.nextAttack,a.nextAbility)-Math.min(b.nextAttack,b.nextAbility)||a.id.localeCompare(b.id))[0];
  const next=Math.min(actor.nextAttack,actor.nextAbility);if(next>34.2){time=34.2;break;}time=next;
  if(actor.nextAbility<=actor.nextAttack){actor.nextAbility+=actor.abilityCooldown;ability(actor);}else{actor.nextAttack+=actor.attackInterval;hit(actor,targetFor(actor));}
 }
 const remaining={player:alive('player').reduce((sum,f)=>sum+f.hp,0),enemy:alive('enemy').reduce((sum,f)=>sum+f.hp,0)};
 if(!alive('enemy').length)winner='player';else if(!alive('player').length)winner='enemy';else{timedOut=true;const difference=remaining.player/totalHp.player-remaining.enemy/totalHp.enemy;winner=Math.abs(difference)<1e-9?(random()<.5?'player':'enemy'):(difference>0?'player':'enemy');}
 const duration=ROUND(Math.min(35,Math.max(2,time)+.8));events.push({time:duration,type:'end',actor:null,target:null,amount:0,hp:null,winner});
 return{winner,won:winner==='player',duration,events,fighters,finalHp:Object.fromEntries(live.map(f=>[f.id,f.hp])),timedOut,seed};
}
