const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

const toggle = document.getElementById('navToggle');
const nav = document.getElementById('siteNav');
const menu = document.getElementById('navMenu');
if (toggle && nav && menu) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => nav.classList.remove('open')));
}

const clock = document.getElementById('wibClock');
if (clock) {
  const update = () => {
    try {
      clock.textContent = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
      }).format(new Date());
    } catch { clock.textContent = ''; }
  };
  update();
  setInterval(update, 30000);
}

const links = document.querySelectorAll('#navMenu a');
const map: Record<string, Element> = {};
links.forEach((a) => { const href = a.getAttribute('href'); if (href) map[href.slice(1)] = a; });
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((a) => a.classList.remove('active'));
        const link = map[e.target.id];
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  Object.keys(map).forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
}

// Reveal saat scroll: hanya ditambahkan lewat JS, jadi tanpa JS konten tetap terlihat
document.body.classList.add('js');
if ('IntersectionObserver' in window) {
  const revealIo = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); revealIo.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.section, .project, .panel, .t-item').forEach((el) => {
    el.classList.add('reveal');
    revealIo.observe(el);
  });
}
