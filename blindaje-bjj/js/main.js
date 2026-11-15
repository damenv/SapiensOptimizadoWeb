/* Blindaje BJJ — comportamiento de la landing */
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Año del footer
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Video de fondo: siempre sin sonido; se pausa fuera de pantalla para ahorrar batería y datos.
  var videos = document.querySelectorAll('video.js-autoplay');
  videos.forEach(function (v) {
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('muted', '');
    if (reduceMotion) {
      v.removeAttribute('autoplay');
      v.pause();
      return;
    }
    if (!('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.25 }).observe(v);
  });

  // Aparición suave de las secciones al hacer scroll
  var items = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function (el) { io.observe(el); });
})();
