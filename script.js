const $=s=>document.querySelectorAll(s);
const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12});
$('section, .card, .list>div, .manifesto, .hero h1, .hero>small').forEach(e=>{e.classList.add('reveal');reveal.observe(e)});
const style=document.createElement('style');style.textContent='.reveal{opacity:0;transform:translateY(45px);transition:opacity 1s cubic-bezier(.16,1,.3,1),transform 1s cubic-bezier(.16,1,.3,1)}.reveal.in{opacity:1;transform:none}';document.head.appendChild(style);
const orb=document.querySelector('.orb');addEventListener('scroll',()=>{if(orb)orb.style.translate='0 '+scrollY*.07+'px'});
const cards=[...document.querySelectorAll('.card')];cards.forEach(card=>card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform='perspective(900px) rotateX('+(-y*4)+'deg) rotateY('+(x*4)+'deg) translateY(-8px)'}));cards.forEach(card=>card.addEventListener('mouseleave',()=>card.style.transform=''));
