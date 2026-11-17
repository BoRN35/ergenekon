import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {runArenaBattle} from '../src/arena-battle.js';

class Classes{constructor(){this.values=new Set()}add(...v){v.forEach(x=>this.values.add(x))}remove(...v){v.forEach(x=>this.values.delete(x))}contains(v){return this.values.has(v)}toggle(v,on){if(on!==undefined){if(on)this.values.add(v);else this.values.delete(v);return on}if(this.values.has(v)){this.values.delete(v);return false}this.values.add(v);return true}}
class Element{
 constructor(tag='div'){this.tagName=tag.toUpperCase();this.children=[];this.parentNode=null;this.dataset={};this.style={};this.classList=new Classes();this.clientWidth=1000;this.clientHeight=800;this.attributes={};this.listeners={};this.hidden=false;this.textContent='';}
 set className(value){this._className=value;this.classList=new Classes();value.split(/\s+/).filter(Boolean).forEach(v=>this.classList.add(v))}get className(){return this._className||''}
 append(...children){for(const child of children){child.parentNode?.removeChild(child);child.parentNode=this;this.children.push(child)}}appendChild(child){this.append(child);return child}prepend(child){child.parentNode?.removeChild(child);child.parentNode=this;this.children.unshift(child)}
 removeChild(child){const i=this.children.indexOf(child);if(i>=0)this.children.splice(i,1);child.parentNode=null;return child}replaceChildren(...children){for(const child of this.children)child.parentNode=null;this.children=[];this.append(...children)}remove(){this.parentNode?.removeChild(this)}
 get childNodes(){return this.children}setAttribute(key,value){this.attributes[key]=String(value)}getAttribute(key){return this.attributes[key]??null}
 addEventListener(key,fn){(this.listeners[key]??=[]).push(fn)}removeEventListener(key,fn){this.listeners[key]=(this.listeners[key]||[]).filter(v=>v!==fn)}
 getBoundingClientRect(){return {left:0,top:0,width:this.clientWidth,height:this.clientHeight}}focus(){document.activeElement=this}
 matches(selector){if(selector.startsWith('.'))return this.classList.contains(selector.slice(1));const match=selector.match(/^\[data-([a-z-]+)(?:="([^"]*)")?\]$/);if(match){const key=match[1].replace(/-([a-z])/g,(_,letter)=>letter.toUpperCase());return key in this.dataset&&(match[2]===undefined||String(this.dataset[key])===match[2])}return false}
 querySelector(selector){for(const child of this.children){if(child.matches(selector))return child;const nested=child.querySelector(selector);if(nested)return nested}return null}querySelectorAll(selector){const results=[];for(const child of this.children){if(child.matches(selector))results.push(child);results.push(...child.querySelectorAll(selector))}return results}closest(selector){let e=this;while(e){if(e.matches(selector))return e;e=e.parentNode}return null}
}
class Canvas extends Element{constructor(){super('canvas');this.width=256;this.height=128}getContext(){return {clearRect(){},fillRect(){},fillText(){}}}}
const body=new Element('body'),head=new Element('head'),events=new Map(),focusOrigin=new Element('button');
globalThis.window=globalThis;globalThis.document={body,head,hidden:false,activeElement:focusOrigin,createElement:tag=>tag==='canvas'?new Canvas():new Element(tag),addEventListener(name,fn){const set=events.get(name)||new Set();set.add(fn);events.set(name,set)},removeEventListener(name,fn){events.get(name)?.delete(fn)}};
const observers=[];globalThis.ResizeObserver=class{constructor(fn){this.fn=fn;observers.push(this)}observe(){}disconnect(){this.disconnected=true}};
let nextFrame=1;const frames=new Map();globalThis.requestAnimationFrame=fn=>{const id=nextFrame++;frames.set(id,fn);return id};globalThis.cancelAnimationFrame=id=>frames.delete(id);
let throwRenderer=false,renderCount=0;const renderers=[];
class FakeRenderer{constructor(){if(throwRenderer)throw Error('WebGL unavailable');this.domElement=new Canvas();this.shadowMap={};this.disposed=false;renderers.push(this)}setPixelRatio(){}setSize(w,h){this.domElement.clientWidth=w;this.domElement.clientHeight=h}render(scene,camera){scene.updateMatrixWorld(true);camera.updateMatrixWorld();renderCount++}dispose(){this.disposed=true}}
globalThis.FakeRenderer=FakeRenderer;
const matchBase={seed:42,opponent:{n:'Börü Bey',f:1},playerName:'Bizim Boy',heroNames:['Alp Tonga','Kalkanlı','Okçu','Şifacı','Kam'],playerStats:{atk:120,def:60,hp:800},enemyStats:{atk:120,def:60,hp:800}};
let starts=0,awards=0,entries=5,finishCalls=0,failFinish=false,throwAfterAward=false;globalThis.s={ar:{active:null},noan:false};globalThis.IMG={};globalThis.add=()=>{};
globalThis.startArenaMatch=index=>{starts++;if(s.ar.active)return s.ar.active;if(entries<=0)return null;entries--;return s.ar.active=structuredClone({...matchBase,id:'match-'+starts});};
globalThis.finishArenaMatch=(id,result)=>{finishCalls++;if(failFinish)return false;if(s.ar.active?.id!==id)return false;assert.equal(result.won,runArenaBattle(s.ar.active).won);awards++;s.ar.lastMatch={id,won:result.won};s.ar.active=null;if(throwAfterAward)throw Error('UI render interrupted after commit');return s.ar.lastMatch;};
const originalArena=()=>null;globalThis.arena=originalArena;
const source=await fs.readFile(new URL('../src/arena3d.js',import.meta.url),'utf8');const transformed=source.replace("import * as THREE from 'three';",'import * as THREE from '+JSON.stringify(import.meta.resolve('three'))+';').replace("import {runArenaBattle} from './arena-battle.js';",'import {runArenaBattle} from '+JSON.stringify(new URL('../src/arena-battle.js',import.meta.url).href)+';').replace('new THREE.WebGLRenderer(', 'new globalThis.FakeRenderer(');
const {addArena3D}=await import('data:text/javascript;base64,'+Buffer.from(transformed).toString('base64'));
function frame(ms){const next=[...frames.entries()][0];assert.ok(next);frames.delete(next[0]);next[1](ms)}
function resourceSet(session){const set=new Set();session.scene?.traverse(o=>{if(o.geometry&&!o.isSprite)set.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:[o.material])if(m){set.add(m);for(const v of Object.values(m))if(v?.isTexture)set.add(v)}});return set}
const api=addArena3D();assert.equal(addArena3D(),api);assert.equal(typeof ARENA_BATTLE_ENGINE,'function');
let session=arena(0);assert.ok(session.renderer);assert.equal(entries,4);assert.equal(starts,1);assert.equal(session.elements.cards.size,5);assert.equal(body.children.length,1);assert.ok(session.elements.dialog.querySelector('.arena-roster'));
assert.equal(arena(1),session);assert.equal(entries,4);assert.equal(starts,1);assert.equal(awards,0);
const resources=resourceSet(session),disposed=new Set();for(const r of resources)r.addEventListener('dispose',()=>disposed.add(r));
frame(1000);frame(1120);assert.ok(session.state.time>0);const beforeHidden=session.state.time;document.hidden=true;frame(1240);assert.equal(session.state.time,beforeHidden);document.hidden=false;
session.elements.speed.onclick();assert.equal(session.state.speed,2);session.elements.speed.onclick();assert.equal(session.state.speed,1);
const card=session.elements.cards.get('player-0').node;session.elements.dialog.querySelector('.arena-roster').listeners.click[0]({target:card});assert.ok(card.classList.contains('selected'));
session.skip();assert.equal(session.state.complete,true);assert.equal(session.state.awarded,true);assert.equal(awards,1);assert.equal(finishCalls,1);assert.equal(s.ar.active,null);assert.equal(session.elements.resultBox.hidden,false);assert.deepEqual(session.hp,session.battle.finalHp);
session.skip();assert.ok(session.scene.children.some(o=>o.isMesh&&o.geometry?.type==='SphereGeometry'&&o.material?.isMeshBasicMaterial),'skip creates final projectiles');session.replay();assert.ok(!session.scene.children.some(o=>o.isMesh&&o.geometry?.type==='SphereGeometry'&&o.material?.isMeshBasicMaterial),'replay clears old projectiles');assert.equal(session.state.complete,false);assert.equal(session.state.replaying,true);assert.equal(entries,4);session.skip();assert.equal(awards,1);assert.equal(finishCalls,1);session.close();session.close();assert.equal(awards,1);assert.equal(api.current,null);assert.equal(body.children.length,0);assert.equal(frames.size,0);assert.equal(session.renderer.disposed,true);assert.ok(observers.at(-1).disconnected);assert.ok([...resources].every(r=>disposed.has(r)),'close must dispose scene resources: '+[...resources].filter(r=>!disposed.has(r)).map(r=>r.type+':'+r.uuid).join(','));assert.equal(document.activeElement,focusOrigin);
// Closing a live match resolves the identical deterministic battle once and consumes no extra entry.
session=arena(0);session.close();assert.equal(entries,3);assert.equal(awards,2);assert.equal(finishCalls,2);assert.equal(frames.size,0);
// A resumed match reuses saved ID/seed and does not call start/deduct again.
s.ar.active=structuredClone({...matchBase,id:'saved-match'});const startsBefore=starts;session=api.resume();assert.equal(starts,startsBefore);assert.equal(entries,3);assert.equal(session.match.id,'saved-match');session.skip();assert.equal(awards,3);session.close();
// WebGL failure still permits a proper result and cleanup.
throwRenderer=true;const warn=console.warn;console.warn=()=>{};session=arena(0);console.warn=warn;assert.equal(session.renderer,undefined);assert.ok(session.elements.stage.querySelector('.arena-fallback'));session.skip();session.close();assert.equal(awards,4);assert.equal(frames.size,0);throwRenderer=false;
// Natural timeline completion also awards once; the final visual event matches the deterministic result.
entries=3;session=arena(0);const naturalBefore=awards;for(let ms=0;!session.state.complete&&ms<50000;ms+=120)frame(ms);assert.equal(session.state.complete,true);assert.equal(awards,naturalBefore+1);assert.deepEqual(session.hp,session.battle.finalHp);session.close();
// A failed parent commit must not falsely claim saved or erase the pending match; close retries safely.
failFinish=true;session=arena(0);const pendingId=session.match.id,pendingBefore=awards;session.skip();assert.equal(session.state.awarded,false);assert.equal(s.ar.active.id,pendingId);assert.ok(session.elements.resultBox.children.find(o=>o.tagName==='P').textContent.includes('eşitleme bekliyor'));assert.equal(awards,pendingBefore);failFinish=false;session.close();assert.equal(awards,pendingBefore+1);assert.equal(s.ar.active,null);
// If the parent committed successfully and its later UI step threw, detect lastMatch rather than awarding twice.
throwAfterAward=true;const oldWarning=console.warn;console.warn=()=>{};session=arena(0);const onceBefore=awards,callsBefore=finishCalls;session.skip();session.close();console.warn=oldWarning;throwAfterAward=false;assert.equal(awards,onceBefore+1);assert.equal(finishCalls,callsBefore+1);
// No remaining entry does not create a new overlay.
entries=0;assert.equal(arena(0),null);assert.equal(body.children.length,0);api.dispose();assert.equal(arena,originalArena);assert.equal(globalThis.arena3d,undefined);assert.equal(head.children.length,0);assert.equal(events.get('keydown')?.size||0,0);assert.ok(renderCount>0);
console.log('PASS: arena scene start/resume, single-entry/single-award, deterministic skip/close, replay projectile cleanup, natural completion, pending/partially successful commits, speed/cards, hidden-tab pause, WebGL fallback and disposed resources (renderer mocked).');
