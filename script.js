/* ═══════════════════════════════════════
   NAV — frosted glass on scroll
   ═══════════════════════════════════════ */
const nav       = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ═══════════════════════════════════════
   SMOOTH ANCHOR SCROLL
   ═══════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 58, behavior: 'smooth' });
  });
});

/* ═══════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════ */
const revealObs = new IntersectionObserver(
  entries => entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObs.unobserve(entry.target);
    }
  }),
  { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ═══════════════════════════════════════
   COUNTER ANIMATION (hero stats)
   ═══════════════════════════════════════ */
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

function runCounter(el) {
  const target   = parseFloat(el.dataset.target);
  const isFloat  = el.dataset.float === 'true';
  const duration = 1800;
  const t0       = performance.now();
  const tick = now => {
    const p = Math.min((now - t0) / duration, 1);
    el.textContent = isFloat
      ? (target * easeOut(p)).toFixed(1)
      : Math.floor(target * easeOut(p));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const ctrObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { runCounter(e.target); ctrObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hstat-n[data-target]').forEach(el => ctrObs.observe(el));

/* ═══════════════════════════════════════
   TYPEWRITER — hero role subtitle removed
   (hero now has static descriptive copy)
   ═══════════════════════════════════════ */

/* ═══════════════════════════════════════
   SUBTLE PARALLAX on hero photo (mouse)
   ═══════════════════════════════════════ */
const photoWrap = document.querySelector('.hero-photo-wrap');
if (photoWrap) {
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx * 8;
    const dy = (e.clientY - cy) / cy * 6;
    photoWrap.style.transform = `translate(${dx}px, ${dy}px)`;
  }, { passive: true });
}

/* ═══════════════════════════════════════
   HIDE SCROLL HINT after first scroll
   ═══════════════════════════════════════ */
const scrollHint = document.querySelector('.hero-scroll-hint');
if (scrollHint) {
  window.addEventListener('scroll', function hideHint() {
    if (window.scrollY > 80) {
      scrollHint.style.opacity = '0';
      scrollHint.style.transition = 'opacity 0.5s';
      window.removeEventListener('scroll', hideHint);
    }
  }, { passive: true });
}
