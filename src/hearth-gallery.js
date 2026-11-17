const LEVELS=[1,5,10,15,20,25,30,35,40];
export function createHearthGallery({onPreview,onClose,host}){
 const root=document.createElement('section');root.className='hearth-gallery';root.hidden=true;root.setAttribute('aria-label','Kutsal Ocak görünümleri');
 root.innerHTML='<header><div><small>KUTSAL OCAK</small><h3>Ocağın gelişimi</h3></div><button type="button" data-gallery-close aria-label="Görünüm önizlemesini kapat">✕</button></header><p>Bir seviyeye dokunarak görünümünü incele. Oyun seviyen ve kaydın değişmez.</p><div class="hearth-gallery-levels"></div><div class="hearth-gallery-note" role="status"></div><button type="button" class="hearth-gallery-return" data-gallery-return>Oyunuma dön</button>';
 const grid=root.querySelector('.hearth-gallery-levels');let selected=null;let ready=new Set([1]);
 for(const level of LEVELS){const b=document.createElement('button');b.type='button';b.dataset.hearthLevel=String(level);b.textContent='Sv '+level;b.setAttribute('aria-pressed','false');grid.append(b);}
 function render(){for(const b of grid.children){const level=Number(b.dataset.hearthLevel);b.disabled=!ready.has(level);b.setAttribute('aria-pressed',String(selected===level));b.title=ready.has(level)?'Seviye '+level+' görünümünü incele':'Bu görünüm henüz hazır değil';}}
 function close(){selected=null;root.hidden=true;onPreview(null);onClose?.();render();}
 root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-gallery-close')||b.hasAttribute('data-gallery-return')){close();return;}const level=Number(b.dataset.hearthLevel);if(ready.has(level)){selected=level;onPreview(level);render();}});
 host.append(root);render();
 return {open(){root.hidden=false;},close,setReady(levels){ready=new Set(levels);render();},setState(state){const note=root.querySelector('.hearth-gallery-note');note.textContent=state.loadingLevel?'Görünüm yükleniyor…':state.error?'Yeni görünüm yüklenemedi; mevcut görünüm korunuyor.':state.loadedLevel?'Gösterilen tasarım: Sv '+state.loadedLevel:'';},element:root};
}
