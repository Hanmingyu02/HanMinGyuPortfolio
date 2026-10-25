const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.firstChild.textContent='메뉴 열기 ';navigation.classList.remove('open');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.firstChild.textContent=open?'메뉴 닫기 ':'메뉴 열기 ';navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navigation.classList.contains('open')){closeMenu();menuButton.focus();}});
const dialog=document.querySelector('#lightbox');let trigger;
function wireImage(img){
 const container=img.closest('button, .project-cover')||img.parentElement;
 function success(){container.classList.remove('failed');container.classList.add('loaded');container.querySelector('.image-status')?.remove();}
 function failure(){if(img.classList.contains('logo')){img.hidden=true;img.style.display='none';return;}container.classList.add('failed');const status=container.querySelector('.image-status');if(status)status.textContent='이미지를 불러올 수 없습니다 · '+img.alt;else {const label=document.createElement('span');label.className='image-status';label.textContent=img.alt+' · 이미지 접근 불가';container.append(label);}}
 img.addEventListener('load',success);img.addEventListener('error',failure);if(img.complete){if(img.naturalWidth)success();else failure();}
}
document.querySelectorAll('img').forEach(img=>{if(!img.closest('dialog'))wireImage(img);});
document.querySelectorAll('.image-open').forEach(button=>button.addEventListener('click',()=>{
 trigger=button;const img=dialog.querySelector('img');const status=dialog.querySelector('.lightbox-status');document.querySelector('#lightbox-caption').textContent=button.dataset.caption;img.alt=button.dataset.caption;status.textContent='이미지 불러오는 중…';img.onload=()=>{status.textContent='';};img.onerror=()=>{status.textContent='원본 이미지에 접근할 수 없습니다. 잠시 후 다시 시도하거나 원본 링크를 확인해 주세요.';};img.src=button.dataset.src;dialog.querySelector('.original').href=button.dataset.src;dialog.showModal();document.body.classList.add('modal-open');dialog.querySelector('button').focus();
}));
dialog.querySelector('.close-lightbox').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');trigger?.focus();});
const links=[...navigation.querySelectorAll('a')];
const sections=[...document.querySelectorAll('main > section[id]')];
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{const current=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(current)links.forEach(a=>{const active=a.hash==='#'+current.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});},{rootMargin:'-12% 0px -48% 0px',threshold:[0,.2,.5]});sections.forEach(x=>observer.observe(x));}
