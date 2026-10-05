const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const loader=$('.loader');addEventListener('load',()=>setTimeout(()=>loader?.classList.add('done'),850));
const cursor=$('.cursor');let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
if(cursor&&matchMedia('(pointer:fine)').matches){addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});(function tick(){cx+=(mx-cx)*.16;cy+=(my-cy)*.16;cursor.style.left=cx+'px';cursor.style.top=cy+'px';requestAnimationFrame(tick)})();$$('.magnetic,.world-card,.service-list>div,.round-link').forEach(el=>{el.addEventListener('mouseenter',()=>{cursor.style.width='54px';cursor.style.height='54px'});el.addEventListener('mouseleave',()=>{cursor.style.width='18px';cursor.style.height='18px'})})}
const rail=$('.world-rail');let drag=false,sx=0,sl=0;
rail?.addEventListener('pointerdown',e=>{drag=true;sx=e.clientX;sl=rail.scrollLeft;rail.setPointerCapture(e.pointerId)});
rail?.addEventListener('pointermove',e=>{if(drag)rail.scrollLeft=sl-(e.clientX-sx)*1.25});
['pointerup','pointercancel'].forEach(n=>rail?.addEventListener(n,()=>drag=false));
$$('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{if(innerWidth<801)return;const r=el.getBoundingClientRect();el.style.transform='translate('+((e.clientX-r.left-r.width/2)*.12)+'px,'+((e.clientY-r.top-r.height/2)*.12)+'px)'});el.addEventListener('pointerleave',()=>el.style.transform='')});
const nums=$$('.stat strong');const nio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const t=+e.target.dataset.count;let n=0;(function c(){n+=Math.max(1,Math.ceil((t-n)/12));e.target.textContent=n;if(n<t)requestAnimationFrame(c);else e.target.textContent=t+'+'})();nio.unobserve(e.target)}}),{threshold:.7});nums.forEach(n=>nio.observe(n));
const hero=$('.hero-media img'),man=$('.manifesto>img'),fin=$('.finale-image img'),ms=$('.manifesto'),fs=$('.finale');
addEventListener('scroll',()=>{const y=scrollY;if(hero)hero.style.transform='scale(1.08) translateY('+(y*.045)+'px)';if(man)man.style.transform='scale(1.1) translateY('+((y-ms.offsetTop)*.025)+'px)';if(fin)fin.style.transform='scale(1.08) translateY('+Math.max(0,(y-fs.offsetTop)*.035)+'px)'},{passive:true});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=$(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));