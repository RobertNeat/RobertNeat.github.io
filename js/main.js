// Rok w footerze
document.getElementById('year').textContent = new Date().getFullYear();

// Mobilne menu
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Przycisk "powrót do góry"
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Tryb jasny / ciemny (przycisk obecnie wyłączony w HTML — mechanizm gotowy do przywrócenia)
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
  });
}

// Animacje wejścia (fade + slide) przy przewijaniu
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add('is-visible'));
}

// Subtelny parallax okien projektów przy przewijaniu
const featureWindows = document.querySelectorAll('.project-feature-window');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (featureWindows.length && !prefersReducedMotion) {
  let ticking = false;

  const updateParallax = () => {
    const viewportHeight = window.innerHeight;

    featureWindows.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - viewportHeight / 2;
      const progress = Math.max(-1, Math.min(1, centerOffset / viewportHeight));
      el.style.setProperty('--parallax-y', `${(progress * 18).toFixed(2)}px`);
    });

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  updateParallax();
}
