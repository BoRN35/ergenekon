/* Presentation only: existing actions, saves and timers remain owned by the game. */
(function(root){
 'use strict';
 var pages={
  a:{title:'Boylar Meclisi',kicker:'BİRLİKTEN DOĞAN GÜÇ',description:'Boyunu güçlendir, sınırlarını genişlet.',art:'alliance',symbol:'♜'},
  k:{title:'Sefer Otağı',kicker:'DEMİR DAĞ’IN ÖTESİNDE',description:'Ordunu hazırla; kaleleri, zindanı ve kadim bilgeleri keşfet.',art:'military',symbol:'⚔'},
  y:{title:'Bahadır Meydanı',kicker:'ŞAN VE MÜCADELE',description:'Arenada gücünü göster, sezonun yolunda ilerle.',art:'military',symbol:'♛'},
  p:{title:'Ulak Otağı',kicker:'BOYLARDAN HABER VAR',description:'Mektuplarını, savaş raporlarını ve ganimetlerini burada bul.',art:'mail',symbol:'✉'},
  g:{title:'Oba Düzeni',kicker:'SENİN OYUNUN, SENİN DÜZENİN',description:'Görünümü, sesi ve oyun tercihlerini düzenle.',art:'settings',symbol:'⚙'},
  u:{title:'Alpler Meclisi',kicker:'ADLARI DESTANLARA YAZILANLAR',description:'Kahramanlarını yücelt, boyunun gücünü artır.',art:'heroes',symbol:'✦'},
  e:{title:'Toy Meydanı',kicker:'HER GÜN YENİ BİR YOL',description:'Görevlerini tamamla, etkinliklere katıl, ödüllerini topla.',art:'events',symbol:'☀'},
  z:{title:'Kam Meclisi',kicker:'OBANIN YÖNETİMİ',description:'Duyuruları ve boy yönetimini düzenle.',art:'chronicle',symbol:'◈'},
  h:{title:'Alp Otağı',kicker:'YOLUN HENÜZ BAŞINDA',description:'Alpının gücünü ve kuşandığı eşyaları incele.',art:'heroes',symbol:'⚔'}
 };
 var navigation={c:'Şehir',m:'Dünya haritası',a:'Boylar Meclisi',h:'Alp Otağı',k:'Sefer Otağı',y:'Arena ve sezon',p:'Posta',r:'Araştırmalar',g:'Ayarlar',u:'Kahramanlar',e:'Etkinlikler',z:'Kam Meclisi'};
 function make(doc,tag,cls,text){var el=doc.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el}
 function number(value){try{return typeof root.nf==='function'?String(root.nf(Number(value)||0)):String(Math.floor(Number(value)||0))}catch(_){return '0'}}
 function metrics(key){var s=root.s||{},a=s.al||{},ar=s.ar||{},dg=s.dg||{},letters=s.mb||[],heroes=s.hs||[],cards=s.hc||[];
  if(key==='a')return [['Fethedilen bölge',number((a.terr||[]).length)],['Fetih gücü',number(a.pow)],['Yardım isteği',number(a.hq)]];
  if(key==='k')return [['Hazır birlik',number((s.tr||[]).reduce(function(n,v){return n+(Number(v)||0)},0))],['Zindan hakkı',number(dg.n)+' / 3'],['En iyi kat',number(dg.best)+' / 20']];
  if(key==='y')return [['Arena puanı',number(ar.pts)],['Meydan okuma',number(ar.n)+' / 5'],['Sezon puanı',number(s.sp)]];
  if(key==='p')return [['Okunmamış',number(letters.filter(function(v){return !v.rd}).length)],['Mektup',number(letters.length)],['Yıldızlı',number(letters.filter(function(v){return v.st}).length)]];
  if(key==='u')return [['Yüceltilen Alp',number(heroes.filter(function(v){return v>0}).length)],['Toplam yıldız',number(heroes.reduce(function(n,v){return n+(Number(v)||0)},0))],['Kahraman kartı',number(cards.reduce(function(n,v){return n+(Number(v)||0)},0))]];
  if(key==='e')return [['Sezon puanı',number(s.sp)],['Günlük ödül',number(Object.keys(s.d&&s.d.c||{}).filter(function(k){return s.d.c[k]}).length)],['Postadaki mektup',number(letters.length)]];
  if(key==='g')return [['Kutsal Ocak','Sv '+number(s.l&&s.l.ocak)],['Ses',s.snd?'Açık':'Kapalı'],['Obadaki yapı',number(Object.keys(s.l||{}).filter(function(k){return s.l[k]>0}).length)]];
  return [];
 }
 function slug(text,index){return String(text||'bolum').toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,42)+'-'+index}
 function direct(parent,cls){return Array.from(parent.children||[]).find(function(n){return n.classList&&n.classList.contains(cls)})}
 function groupSections(doc,panel,key){
  if(direct(panel,'game-page-section')||direct(panel,'game-page-intro'))return;
  var children=Array.from(panel.childNodes||[]),hasHeadings=children.some(function(n){return n.nodeType===1&&n.tagName==='H4'}),current=null,body=null,index=0;
  if(!children.length)return;
  function section(title){var wrap=make(doc,'section','game-page-section');wrap.dataset.page=key;wrap.dataset.kind=slug(title.textContent,index++);title.classList.add('game-section-title');wrap.appendChild(title);var content=make(doc,'div','game-section-content');wrap.appendChild(content);panel.appendChild(wrap);current=wrap;body=content;}
  children.forEach(function(node){
   if(node.nodeType===1&&node.tagName==='H4'){section(node);return}
   if(!body){current=make(doc,'div','game-page-intro');current.dataset.page=key;panel.appendChild(current);body=current;}
   body.appendChild(node);
  });
  panel.dataset.sectionLayout=hasHeadings?'chaptered':'single';
 }
 function createHeader(doc,panel,key,meta){
  var header=make(doc,'header','game-page-header'),emblem=make(doc,'div','game-page-emblem');emblem.setAttribute('aria-hidden','true');var art=typeof root.gameThemeArt==='function'?root.gameThemeArt(meta.art):null;
  if(art){var pic=make(doc,'img');pic.src=art;pic.alt='';pic.decoding='async';emblem.appendChild(pic)}else emblem.textContent=meta.symbol;
  var heading=make(doc,'div','game-page-heading');heading.appendChild(make(doc,'small','game-page-kicker',meta.kicker));heading.appendChild(make(doc,'h2','',meta.title));heading.appendChild(make(doc,'p','',meta.description));
  var values=make(doc,'div','game-page-metrics');header.appendChild(emblem);header.appendChild(heading);header.appendChild(values);header.dataset.page=key;panel.insertBefore(header,panel.firstChild);return header;
 }
 function updateMetrics(doc,header,key){var target=header.querySelector('.game-page-metrics');if(!target)return;var values=metrics(key),signature=JSON.stringify(values);if(target.dataset.metrics===signature)return;target.dataset.metrics=signature;while(target.firstChild)target.removeChild(target.firstChild);values.forEach(function(pair){var metric=make(doc,'div','game-page-metric');metric.appendChild(make(doc,'small','',pair[0]));metric.appendChild(make(doc,'b','',pair[1]));target.appendChild(metric)});}
 function navIcon(key){var paths={c:'M12 3l-2 6-3-2c-4 7-1 14 5 14 7 0 10-8 4-13l-1 5c-3-2-3-6-3-10z',m:'M3 5l6-2 6 2 6-2v16l-6 2-6-2-6 2V5zm6-2v16m6-14v16',k:'M3 21V9h5v4h8V9h5v12H3zm0-12V4h2v2h1V4h2v5M16 9V4h2v2h1V4h2v5M10 21v-5h4v5',r:'M4 21h16M5 17h14M7 17V9m5 8V9m5 8V9M3 8l9-5 9 5H3z',u:'M5 21v-7c0-7 2-11 7-11s7 4 7 11v7M5 13l7 2 7-2M12 3v12m-4 6v-4m8 4v-4',y:'M8 3h8v4c0 8-8 8-8 0V3zM8 5H4c0 6 2 7 5 7m7-7h4c0 6-2 7-5 7m-3 2v5m-5 2h10',p:'M3 6h18v14H3V6zm0 0l9 7 9-7M3 20l6-7m12 7l-6-7',a:'M3 12l4-5 4 1 3-1 7 5-5 7-5-1-4-3m0-8l-4 5m18 0l-4-5M7 12l4 4 5-5',e:'M3 9h18v12H3V9zm-1 0V5h20v4M12 5v16m0-16C7-3 2 3 7 5h5zm0 0c5-8 10-2 5 0h-5z',g:'M9 3h6l1 4 4 1 2 5-3 3v4l-5 2-3-3-4 1-3-4 2-4-1-4 4-1 0-4zm7 9a4 4 0 1 0-8 0 4 4 0 0 0 8 0z',book:'M3 4c4-1 6 0 9 2 3-2 5-3 9-2v16c-4-1-6 0-9 2-3-2-5-3-9-2V4zm9 2v16'};return '<svg class="game-nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="'+(paths[key]||paths.r)+'" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/></svg>'}
 function navigationLabels(doc){var rail=doc.getElementById('tabs');if(!rail)return;Array.from(rail.children||[]).forEach(function(button){var key=button.dataset&&button.dataset.t,label=navigation[key];if(!label){if(button.dataset&&button.dataset.ex)button.innerHTML=navIcon('book');else if(button.dataset&&button.dataset.kurultay)button.innerHTML=navIcon('r');return;}var badge=button.querySelector('i'),markup=navIcon(key)+(badge?badge.outerHTML:'');if(button.innerHTML!==markup)button.innerHTML=markup;button.setAttribute('aria-label',label);button.title=label;button.dataset.navLabel=label;if(key===root.tab)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current')});var close=doc.getElementById('wx');if(close){close.title='Şehre dön';close.setAttribute('aria-label','Pencereyi kapat ve haritaya dön')}}
 function captureFocus(doc){var el=doc.activeElement;if(!el||el===doc.body||!el.tagName)return null;var attrs={};if(el.id)attrs.id=el.id;else if(typeof el.getAttributeNames==='function')el.getAttributeNames().forEach(function(k){if(k==='name'||k==='type'||k.indexOf('data-')===0)attrs[k]=el.getAttribute(k)});if(!Object.keys(attrs).length)return null;var type=String(el.type||'text').toLowerCase(),editing=el.tagName==='TEXTAREA'||el.tagName==='INPUT'&&/^(text|search|email|url|tel|password|number)$/.test(type);return {node:el,tag:el.tagName,attrs:attrs,start:el.selectionStart,end:el.selectionEnd,direction:el.selectionDirection,value:editing&&!el.readOnly?el.value:undefined}}
 function restoreFocus(doc,snapshot){if(!snapshot||snapshot.node.isConnected)return;var candidates=snapshot.attrs.id?[doc.getElementById(snapshot.attrs.id)]:Array.from(doc.querySelectorAll(snapshot.tag)||[]),candidate=candidates.find(function(el){return el&&!el.disabled&&Object.keys(snapshot.attrs).every(function(k){return k==='id'?el.id===snapshot.attrs[k]:el.getAttribute(k)===snapshot.attrs[k]})});if(!candidate)return;try{if(snapshot.value!==undefined)candidate.value=snapshot.value;candidate.focus({preventScroll:true});if(typeof snapshot.start==='number'&&candidate.setSelectionRange)candidate.setSelectionRange(snapshot.start,snapshot.end,snapshot.direction||'none')}catch(_){}}
 root.installPagePresentation=function(){
  if(root.gamePagePresentation)return root.gamePagePresentation;var doc=root.document;if(!doc||typeof root.render!=='function')return null;var original=root.render,lastPopupContext='',warned=false,lastActivePage=root.tab||'c',pageScroll={};
  function refresh(){var key=root.tab||'c';if(doc.body&&doc.body.dataset)doc.body.dataset.gamePage=key;navigationLabels(doc);var meta=pages[key],panel=meta&&doc.getElementById('t'+key);if(!panel)return;panel.dataset.page=key;panel.classList.add('game-page');groupSections(doc,panel,key);var header=direct(panel,'game-page-header')||createHeader(doc,panel,key,meta);updateMetrics(doc,header,key);Array.from(panel.querySelectorAll('h3,h4')||[]).forEach(function(h){h.classList.add('game-section-heading')});}
  function popupContext(){return [root.BMK||'',root.POPK||'',root.PTB||'',root.PSL||'',root.AUD?'audio':'',root.PRF?'profile':'',root.PTP?'pet':'',root.ENP?'energy':''].join('|')}
  function render(){var previous=doc.getElementById('t'+lastActivePage);if(previous&&lastActivePage!=='c'&&lastActivePage!=='m')pageScroll[lastActivePage]=[previous.scrollTop||0,previous.scrollLeft||0];var context=popupContext(),scrolls=[];for(var key of Object.keys(pages).concat(['r'])){var el=doc.getElementById('t'+key);if(el)scrolls.push([el,el.scrollTop||0,el.scrollLeft||0])}var extra=doc.querySelectorAll('#pop .pb,.kurultay-pane,.msgs,.ml')||[];Array.from(extra).forEach(function(el){if(el.closest&&el.closest('#pop')&&context!==lastPopupContext)return;var selector=el.id?'#'+el.id:el.closest&&el.closest('#pop')?'#pop .pb':el.classList&&el.classList.contains('ml')?'#tp .ml':el.classList&&el.classList.contains('kurultay-pane')?'.kurultay-pane':null;scrolls.push([el,el.scrollTop||0,el.scrollLeft||0,selector])});var focus=captureFocus(doc),result=original.apply(this,arguments);try{refresh();for(var saved of scrolls){var el=saved[3]?doc.querySelector(saved[3]):saved[0];if(el){el.scrollTop=saved[1];el.scrollLeft=saved[2]}}var active=doc.getElementById('t'+root.tab),position=pageScroll[root.tab];if(active&&position){active.scrollTop=position[0];active.scrollLeft=position[1]}lastActivePage=root.tab||'c';restoreFocus(doc,focus);lastPopupContext=context}catch(error){if(!warned&&root.console){warned=true;root.console.warn('Arayüz düzeni yenilenemedi.',error)}}return result}
  root.render=render;var api={refresh:refresh,pages:Object.keys(pages),dispose:function(){if(root.render===render)root.render=original;delete root.gamePagePresentation}};root.gamePagePresentation=api;return api;
 };
})(typeof window!=='undefined'?window:globalThis);
