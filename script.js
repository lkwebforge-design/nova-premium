import * as THREE from 'https://unpkg.com/three@0.181.1/build/three.module.js';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
addEventListener('load',()=>setTimeout(()=>$('#loader')?.classList.add('done'),900));
const canvas=$('#scene3d'),scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(42,innerWidth/innerHeight,.1,100),renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;
camera.position.z=5.2;
const group=new THREE.Group();scene.add(group);
const geo=new THREE.IcosahedronGeometry(1.45,5),mat=new THREE.MeshPhysicalMaterial({color:0xd9ff45,metalness:.72,roughness:.16,clearcoat:1,clearcoatRoughness:.08,transmission:.08});
const object=new THREE.Mesh(geo,mat);group.add(object);
const wire=new THREE.Mesh(new THREE.IcosahedronGeometry(1.57,2),new THREE.MeshBasicMaterial({color:0x8b86ff,wireframe:true,transparent:true,opacity:.22}));group.add(wire);
const ringMat=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.18});
for(let i=0;i<3;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(1.9+i*.32,.006,8,160),ringMat);r.rotation.x=.9+i*.35;r.rotation.z=i*.8;group.add(r)}
scene.add(new THREE.AmbientLight(0xffffff,.55));const key=new THREE.PointLight(0xd9ff45,30,12);key.position.set(3,3,4);scene.add(key);const fill=new THREE.PointLight(0x716bff,18,10);fill.position.set(-4,-2,2);scene.add(fill);
let scroll=0,target=0,mouseX=0,mouseY=0;addEventListener('scroll',()=>target=scrollY,{passive:true});addEventListener('pointermove',e=>{mouseX=(e.clientX/innerWidth-.5);mouseY=(e.clientY/innerHeight-.5)});
(function animate(t){scroll+=(target-scroll)*.06;const s=Math.min(scroll/innerHeight,5);group.rotation.y+=.002+mouseX*.002;group.rotation.x+=(mouseY*.25-group.rotation.x)*.025;group.position.y=-s*.22;object.rotation.z+=.0015;wire.rotation.y-=.001;camera.position.z=5.2+Math.min(s*.3,1.4);renderer.render(scene,camera);requestAnimationFrame(animate)})();
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2))});
const cursor=$('.cursor');let cx=innerWidth/2,cy=innerHeight/2,mx=cx,my=cy;if(cursor&&matchMedia('(pointer:fine)').matches){addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});(function tick(){cx+=(mx-cx)*.18;cy+=(my-cy)*.18;cursor.style.left=cx+'px';cursor.style.top=cy+'px';requestAnimationFrame(tick)})();$$('.magnetic,.work-stack article,.contact-link').forEach(el=>{el.addEventListener('mouseenter',()=>{cursor.style.width='52px';cursor.style.height='52px'});el.addEventListener('mouseleave',()=>{cursor.style.width='16px';cursor.style.height='16px'})})}
const blob=$('.blob');$('.interactive')?.addEventListener('pointermove',e=>{const r=e.currentTarget.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;blob.style.transform='translate('+x*55+'px,'+y*55+'px) rotate('+x*20+'deg) scale('+(1+Math.abs(x+y)*.12)+')'});
$('.interactive')?.addEventListener('pointerleave',()=>blob.style.transform='');
$$('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{if(innerWidth<801)return;const r=el.getBoundingClientRect();el.style.transform='translate('+((e.clientX-r.left-r.width/2)*.1)+'px,'+((e.clientY-r.top-r.height/2)*.1)+'px)'});el.addEventListener('pointerleave',()=>el.style.transform='')});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=$(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));