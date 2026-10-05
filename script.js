const qs=s=>document.querySelector(s),qsa=s=>[...document.querySelectorAll(s)];
const loader=qs('.loader');
window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('done'),900));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.1});
qsa('.manifesto,.film-break,.project,.image-wall,.quote,.services,.numbers,.contact').forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=(i%5)*.08+'s';io.observe(el)});
const hero=qs('.hero-video'), cursor=qs('.cursor');
addEventListener('scroll',()=>{if(hero)hero.style.transform='scale(1.06) translateY('+scrollY*.025+'px)'},{passive:true});
if(cursor&&matchMedia('(pointer:fine)').matches){addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});qsa('a,.project,.service-list>div').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('hot'));el.addEventListener('mouseleave',()=>cursor.classList.remove('hot'))})}
qsa('.project').forEach(card=>{card.addEventListener('pointermove',e=>{if(innerWidth<801)return;const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform='perspective(1400px) rotateX('+(-y*1.8)+'deg) rotateY('+(x*1.8)+'deg)'});card.addEventListener('pointerleave',()=>card.style.transform='')});
qsa('.image-wall img,.floating-photo img,.quote-photo img').forEach(img=>img.addEventListener('click',()=>img.classList.toggle('zoom')));
