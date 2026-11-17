import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const context=vm.createContext({});vm.runInContext(fs.readFileSync(new URL('../public/upgrade-balance.js',import.meta.url),'utf8'),context);
const balance=context.ERGENEKON_UPGRADE_BALANCE;
const plain=value=>JSON.parse(JSON.stringify(value));
assert.deepEqual(plain(balance.quote('ocak',3)),{fromLevel:3,targetLevel:4,cost:{odun:1215,et:810,demir:254},seconds:1230});
assert.deepEqual(plain(balance.quote('yurt',0)),{fromLevel:0,targetLevel:1,cost:{odun:360,et:180},seconds:400});
const keys=['oba','ocak','yurt','odunluk','avci','demirci','sifa','kisla','sur','ambar','gozcu'];
for(const key of keys){
 let previous=null;
 for(let level=0;level<40;level++){
  const row=balance.quote(key,level);assert.equal(row.targetLevel,level+1);assert.equal(row.fromLevel,level);
  assert.ok(Number.isSafeInteger(row.seconds)&&row.seconds>0);
  for(const [resource,amount]of Object.entries(row.cost)){
   assert.ok(['odun','et','demir'].includes(resource));assert.ok(Number.isSafeInteger(amount)&&amount>0);
   if(previous?.cost[resource])assert.ok(amount>=previous.cost[resource]);
  }
  // At the minimumHQ level allowing this upgrade, base storage alone can pay it.
  const minimumHQ=Math.max(1,key==='ocak'?level:level+1),capacity=1800*Math.pow(1.55,minimumHQ);
  assert.ok(Math.max(...Object.values(row.cost))<=capacity,`${key}Sv${level+1} must fit storage`);
  if(previous)assert.ok(row.seconds>=previous.seconds);previous=row;
 }
}
for(let level=0;level<40;level++){
 const ocak=balance.quote('ocak',level),oba=balance.quote('oba',level);
 assert.equal(oba.seconds,Math.ceil(ocak.seconds*1.4));
 for(const resource of Object.keys(ocak.cost))assert.equal(oba.cost[resource],Math.ceil(ocak.cost[resource]*1.4));
 const requirements=balance.prerequisites('ocak',level);
 for(const requirement of requirements){assert.ok(keys.includes(requirement.key)&&requirement.key!=='ocak');assert.ok(requirement.level<level+1);}
}
for(const level of [-1,.5,40,NaN,Infinity,'5',null])assert.equal(balance.quote('ocak',level),null);
for(const key of ['missing','toString','__proto__','constructor'])assert.equal(balance.quote(key,0),null);
assert.deepEqual(plain(balance.prerequisites('ocak',3)),[]);
assert.deepEqual(plain(balance.prerequisites('ocak',5)),[{key:'demirci',level:5}]);
const clean=balance.quote('ocak',10);const dirty=balance.quote('ocak',10);dirty.cost.odun=0;dirty.seconds=1;
assert.deepEqual(plain(balance.quote('ocak',10)),plain(clean));
console.log('PASS:440 actual upgradequotes, earlypricecontinuity, resourcecapacityaffordability, exactOba40%premium, increasingprogression, acyclicprerequisites and immutablequotedata.');
