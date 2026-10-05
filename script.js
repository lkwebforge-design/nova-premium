const qs=s=>document.querySelector(s),qsa=s=>[...document.querySelectorAll(s)];
const loader=qs('.loader');addEventListener('load',()=>setTimeout(()=>loader.classList.add('done'),1100));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12});
qsa('.statement,.work-card,.manifesto,.process,.numbers,.contact,.image-strip').forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=(i%4)*.07+'s';io.observe(el)});
const hero=qs('.hero-media');addEventListener('scroll',()=>{if(hero)hero.style.transform='translateY('+scrollY*.035+'px)'},{passive:true});
qsa('.work-card').forEach(card=>{card.addEventListener('pointermove',e=>{if(innerWidth<801)return;const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform='perspective(1300px) rotateX('+(-y*2.2)+'deg) rotateY('+(x*2.2)+'deg)'});card.addEventListener('pointerleave',()=>card.style.transform='')});
