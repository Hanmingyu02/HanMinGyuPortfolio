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
 function failure(){if(img.classList.contains('logo')){img.closest('.project-icon')?.classList.add('icon-failed');img.hidden=true;img.style.display='none';return;}container.classList.add('failed');const status=container.querySelector('.image-status');if(status)status.textContent='이미지를 불러올 수 없습니다 · '+img.alt;else {const label=document.createElement('span');label.className='image-status';label.textContent=img.alt+' · 이미지 접근 불가';container.append(label);}}
 img.addEventListener('load',success);img.addEventListener('error',failure);if(img.complete){if(img.naturalWidth)success();else failure();}
}
document.querySelectorAll('img').forEach(img=>{if(!img.closest('dialog'))wireImage(img);});
document.querySelectorAll('.image-open').forEach(button=>button.addEventListener('click',()=>{
 trigger=button;dialog.classList.toggle('architecture-dark',Boolean(button.closest('.architecture-dark')));const img=dialog.querySelector('img');const status=dialog.querySelector('.lightbox-status');document.querySelector('#lightbox-caption').textContent=button.dataset.caption;img.alt=button.dataset.caption;status.textContent='이미지 불러오는 중…';img.onload=()=>{status.textContent='';};img.onerror=()=>{status.textContent='원본 이미지에 접근할 수 없습니다. 잠시 후 다시 시도하거나 원본 링크를 확인해 주세요.';};img.src=button.dataset.src;dialog.querySelector('.original').href=button.dataset.src;dialog.showModal();document.body.classList.add('modal-open');dialog.querySelector('button').focus();
}));
dialog.querySelector('.close-lightbox').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');trigger?.focus();});
const links=[...navigation.querySelectorAll('a')];
const sections=[...document.querySelectorAll('main > section[id]')];
if(sections.length){
 let pendingTarget=null;
 let pendingTimer;
 let frame=0;
 const anchorOffset=section=>(parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)||0)+(parseFloat(getComputedStyle(section).scrollMarginTop)||0);
 function setActive(id){links.forEach(link=>{const active=link.hash==='#'+id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}
 function releaseTarget(){pendingTarget=null;clearTimeout(pendingTimer);scheduleUpdate();}
 function update(){
  frame=0;
  if(pendingTarget){
   setActive(pendingTarget.id);
   if(Math.abs(pendingTarget.getBoundingClientRect().top-anchorOffset(pendingTarget))>3)return;
   pendingTarget=null;clearTimeout(pendingTimer);
  }
  // Select the section whose start has reached its anchor position.
  // A later section merely being visible must not replace a short current one.
  let current=null;
  for(const section of sections){if(section.getBoundingClientRect().top<=anchorOffset(section)+8)current=section;else break;}
  if(current)setActive(current.id);else links.forEach(link=>{link.classList.remove('active');link.removeAttribute('aria-current');});
 }
 function scheduleUpdate(){if(!frame)frame=requestAnimationFrame(update);}
 links.forEach(link=>link.addEventListener('click',()=>{
  const target=sections.find(section=>link.hash==='#'+section.id);
  if(!target)return;
  pendingTarget=target;setActive(target.id);clearTimeout(pendingTimer);
  pendingTimer=setTimeout(releaseTarget,1500);
 }));
 window.addEventListener('scroll',scheduleUpdate,{passive:true});
 window.addEventListener('resize',scheduleUpdate);
 window.addEventListener('scrollend',releaseTarget);
 window.addEventListener('wheel',releaseTarget,{passive:true});
 window.addEventListener('touchstart',releaseTarget,{passive:true});
 window.addEventListener('keydown',event=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key))releaseTarget();});
 window.addEventListener('load',scheduleUpdate);
 scheduleUpdate();
}


document.querySelectorAll('.demo-video video').forEach(video=>{const showError=()=>{video.closest('figure').querySelector('.video-error').hidden=false;};video.addEventListener('error',showError);video.querySelector('source').addEventListener('error',showError);});
