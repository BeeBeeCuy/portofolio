// Tahun otomatis di footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menu mobile
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');
toggle.addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// Animasi muncul saat scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.card, .t-item, .section h2').forEach(el => { el.classList.add('reveal'); io.observe(el); });
