const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
window.addEventListener('load',()=>setTimeout(()=>$('.loader')?.classList.add('done'),950));
const reveal=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12});
$$('.scene').forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=(i%4)*.08+'s';reveal.observe(el)});
const hero=$('.hero-bg');let target=0,current=0;
addEventListener('scroll',()=>target=scrollY*.018,{passive:true});
function frame(){current+=(target-current)*.06;if(hero)hero.style.transform='scale(1.08) translateY('+current+'px)';requestAnimationFrame(frame)}frame();
const track=$('.world-track');let down=false,start=0,base=0;
track?.addEventListener('pointerdown',e=>{down=true;start=e.clientX;base=track.scrollLeft;track.setPointerCapture(e.pointerId)});
track?.addEventListener('pointermove',e=>{if(!down)return;track.scrollLeft=base-(e.clientX-start)*1.15});
track?.addEventListener('pointerup',()=>down=false);track?.addEventListener('pointercancel',()=>down=false);
const cursor=$('.pointer');
if(cursor&&matchMedia('(pointer:fine)').matches){addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});$$('a,.world-card,.g,.steps>div').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.style.transform='translate(-50%,-50%) scale(3)');el.addEventListener('mouseleave',()=>cursor.style.transform='translate(-50%,-50%) scale(1)')})}
$$('.world-card').forEach(card=>{card.addEventListener('pointermove',e=>{if(innerWidth<801)return;const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform='perspective(1200px) rotateX('+(-y*1.8)+'deg) rotateY('+(x*1.8)+'deg)'});card.addEventListener('pointerleave',()=>card.style.transform='')});
