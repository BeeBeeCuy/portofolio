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
