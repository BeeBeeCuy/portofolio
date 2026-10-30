const root=document.documentElement;
const saved=localStorage.getItem('theme');
if(saved) root.setAttribute('data-theme',saved);
const themeBtn=document.getElementById('themeBtn');
function syncTheme(){themeBtn.textContent=root.getAttribute('data-theme')==='dark'?'☀':'☾';themeBtn.setAttribute('aria-label',root.getAttribute('data-theme')==='dark'?'Ganti ke mode terang':'Ganti ke mode gelap')}
syncTheme();
themeBtn.addEventListener('click',()=>{const next=root.getAttribute('data-theme')==='dark'?'light':'dark';root.setAttribute('data-theme',next);localStorage.setItem('theme',next);syncTheme()});
// Carousel galeri kerja
const slides=[...document.querySelectorAll('.slide')];
const info=document.getElementById('carInfo');
let idx=0;
function render(){
  slides.forEach((s,i)=>s.classList.toggle('active',i===idx));
  const s=slides[idx];
  info.innerHTML=`<h3>${s.dataset.title}</h3><p>${s.dataset.desc}</p><div class="tags">${s.dataset.tags.split('|').map(t=>`<span>${t}</span>`).join('')}</div>`;
  document.getElementById('carDots').textContent=`${idx+1} / ${slides.length}`;
}
document.getElementById('prevBtn').addEventListener('click',()=>{idx=(idx-1+slides.length)%slides.length;render()});
document.getElementById('nextBtn').addEventListener('click',()=>{idx=(idx+1)%slides.length;render()});
render();
// Navigasi aktif + reveal
const links=[...document.querySelectorAll('.nav a.menu')];
const map={};links.forEach(a=>{const id=a.getAttribute('href').slice(1);if(id)map[id]=a});
if('IntersectionObserver' in window){
  const navIo=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.remove('active'));const l=map[e.target.id];if(l)l.classList.add('active')}})},{rootMargin:'-40% 0px -55% 0px'});
  Object.keys(map).forEach(id=>{const el=document.getElementById(id);if(el)navIo.observe(el)});
  const revIo=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');revIo.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>revIo.observe(el));
}
const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
