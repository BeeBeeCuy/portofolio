// Tahun otomatis di footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menu mobile pada navigasi pil
const toggle = document.getElementById('navToggle');
const nav = document.getElementById('pillNav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// Jam lokal WIB di bagian kontak
const clock = document.getElementById('wibClock');
if (clock) {
  const update = () => {
    try {
      clock.textContent = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
      }).format(new Date());
    } catch (e) {
      clock.textContent = '';
    }
  };
  update();
  setInterval(update, 30000);
}

// v2.1: indikator section aktif, konten tetap berfungsi tanpa JavaScript
(function () {
  var links = document.querySelectorAll('.pillnav a.navlink');
  if (!links.length || !('IntersectionObserver' in window)) return;
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (a) { a.classList.remove('active'); });
        var link = map[e.target.id];
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  Object.keys(map).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) io.observe(el);
  });
})();
