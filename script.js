import * as THREE from "https://unpkg.com/three@0.181.1/build/three.module.js";
const $=s=>document.querySelector(s);
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
window.addEventListener("load",()=>setTimeout(()=>$(".loader")?.classList.add("done"),1200));

function makeScene(canvas,{wire=false}={}){
 if(!canvas)return null;
 const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(38,innerWidth/innerHeight,.1,100);
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;
 camera.position.z=5;
 const group=new THREE.Group();scene.add(group);
 const main=new THREE.Mesh(new THREE.IcosahedronGeometry(1.45,5),new THREE.MeshPhysicalMaterial({color:0xd7ff3f,metalness:.55,roughness:.14,clearcoat:1,transmission:.1}));
 group.add(main);
 if(wire)group.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.58,2),new THREE.MeshBasicMaterial({color:0x8d7cff,wireframe:true,transparent:true,opacity:.2})));
 for(let i=0;i<3;i++){let r=new THREE.Mesh(new THREE.TorusGeometry(1.85+i*.3,.009,8,180),new THREE.MeshBasicMaterial({color:i===1?0xff4fa3:0xffffff,transparent:true,opacity:.22}));r.rotation.x=.8+i*.38;r.rotation.z=i*.7;group.add(r)}
 scene.add(new THREE.AmbientLight(0xffffff,.55));
 const a=new THREE.PointLight(0xd7ff3f,28,12);a.position.set(3,2,4);scene.add(a);
 const b=new THREE.PointLight(0x8d7cff,20,10);b.position.set(-4,-2,2);scene.add(b);
 return {scene,camera,renderer,group,main};
}
const hero=makeScene($("#hero3d"),{wire:true}),orb=makeScene($("#orb3d"),{wire:true});
let sy=0,targetY=0,mx=0,my=0;
addEventListener("scroll",()=>targetY=scrollY,{passive:true});
addEventListener("pointermove",e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
function frame(){
 sy+=(targetY-sy)*.055;
 if(hero){let p=clamp(sy/innerHeight,0,4);hero.group.rotation.y+=.002+mx*.003;hero.group.rotation.x+=(my*.3-hero.group.rotation.x)*.025;hero.group.position.y=-p*.18;hero.group.scale.setScalar(1+p*.035);hero.camera.position.z=5+p*.22;hero.renderer.render(hero.scene,hero.camera)}
 if(orb){orb.group.rotation.y+=.004;orb.group.rotation.x+=(my*.2-orb.group.rotation.x)*.02;orb.group.position.x+=(mx*.35-orb.group.position.x)*.03;orb.renderer.render(orb.scene,orb.camera)}
 requestAnimationFrame(frame)
} frame();

function resize(){
 [hero,orb].forEach(x=>{if(!x)return;x.camera.aspect=innerWidth/innerHeight;x.camera.updateProjectionMatrix();x.renderer.setSize(innerWidth,innerHeight);x.renderer.setPixelRatio(Math.min(devicePixelRatio,1.7))})
}addEventListener("resize",resize);

const cursor=$(".cursor");let cx=innerWidth/2,cy=innerHeight/2,tx=cx,ty=cy;
if(cursor&&matchMedia("(pointer:fine)").matches){addEventListener("pointermove",e=>{tx=e.clientX;ty=e.clientY});(function loop(){cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;cursor.style.left=cx+"px";cursor.style.top=cy+"px";requestAnimationFrame(loop)})();document.querySelectorAll("a,.magnetic,.card").forEach(el=>{el.addEventListener("mouseenter",()=>{cursor.style.width="52px";cursor.style.height="52px"});el.addEventListener("mouseleave",()=>{cursor.style.width="18px";cursor.style.height="18px"})})}

const lab=$(".lab"),core=$(".lab-core");
lab?.addEventListener("pointermove",e=>{const r=lab.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;core.style.transform=`translate(${x*150}px,${y*100}px) scale(1.08)`});
lab?.addEventListener("pointerleave",()=>core.style.transform="translate(0,0) scale(1)");

document.querySelectorAll(".magnetic").forEach(el=>el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.08}px,${y*.08}px)`}));
document.querySelectorAll(".magnetic").forEach(el=>el.addEventListener("pointerleave",()=>el.style.transform=""));

const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in")}),{threshold:.12});
document.querySelectorAll("section").forEach(s=>io.observe(s));