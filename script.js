const root = document.documentElement;
root.classList.add('js');
const saved = localStorage.getItem('theme');
if (saved) root.setAttribute('data-theme', saved);

const themeBtn = document.getElementById('themeBtn');

function syncTheme() {
  const isDark = root.getAttribute('data-theme') === 'dark';
  themeBtn.textContent = isDark ? '☀' : '☾';
  themeBtn.setAttribute('aria-label', isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap');
  
  // Dynamic theme-color meta tag sync
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if(metaTheme) {
    metaTheme.setAttribute('content', isDark ? '#0d0d0f' : '#e9e9e9');
  }
}
syncTheme();

themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  syncTheme();
});

// Active Navigation Link Tracking & Reveal Animations
const links = [...document.querySelectorAll('.nav a.menu')];
const map = {};
links.forEach(a => {
  const id = a.getAttribute('href').slice(1);
  if (id) map[id] = a;
});

if ('IntersectionObserver' in window) {
  const navIo = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        const l = map[e.target.id];
        if (l) l.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  Object.keys(map).forEach(id => {
    const el = document.getElementById(id);
    if (el) navIo.observe(el);
  });

  const revIo = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revIo.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revIo.observe(el));
} else {
  // No IntersectionObserver: show reveal content immediately instead of hiding it.
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}

// Copyright Year Setup (Stage 4 constraint)
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Mobile Menu
const navToggle = document.getElementById('navToggle');
const navEl = document.querySelector('.nav');

if (navToggle && navEl) {
  navToggle.addEventListener('click', () => {
    const open = navEl.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navEl.querySelectorAll('a.menu').forEach(a => {
    a.addEventListener('click', () => {
      navEl.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Interactive Work Gallery Carousel
const slides = [...document.querySelectorAll('.slide')];
const info = document.getElementById('carInfo');
const track = document.getElementById('carTrack');
const dots = document.getElementById('carDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let idx = 0;

function renderCarousel() {
  if (!slides.length || !info) return;
  const n = slides.length;
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === idx);
    s.classList.toggle('prev', i === (idx - 1 + n) % n);
    s.classList.toggle('next', i === (idx + 1) % n);
    s.classList.toggle('hidden', i !== idx && i !== (idx - 1 + n) % n && i !== (idx + 1) % n);
  });
  const s = slides[idx];
  const tagsHtml = s.dataset.tags.split('|').map(t => `<span>${t}</span>`).join('');
  const viewLink = s.dataset.repo
    ? `<p style="margin-top:16px"><a href="${s.dataset.repo}" target="_blank" rel="noopener noreferrer">View Project →</a></p>`
    : `<p style="margin-top:16px"><a href="#daftar-proyek">View Project →</a></p>`;
  info.innerHTML = `<h3>${s.dataset.title}</h3><p>${s.dataset.desc}</p><div class="tags">${tagsHtml}</div>${viewLink}`;
  if (dots) dots.textContent = `${idx + 1} / ${slides.length}`;
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => { 
    idx = (idx - 1 + slides.length) % slides.length; 
    renderCarousel(); 
  });
  nextBtn.addEventListener('click', () => { 
    idx = (idx + 1) % slides.length; 
    renderCarousel(); 
  });
  
  // Initialize Carousel
  renderCarousel();
}