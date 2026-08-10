/* ============================================================
   CHANUKA NIRMAL — PORTFOLIO SCRIPT
   1. Mobile navigation toggle
   2. Smooth scroll + active link highlighting
   3. Sticky nav background on scroll
   4. Scroll-reveal animations
   5. Back-to-top button
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. MOBILE NAVIGATION TOGGLE ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  const closeMenu = () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the mobile menu whenever a nav link is clicked
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- 2. ACTIVE LINK HIGHLIGHTING ON SCROLL ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const highlightActiveLink = () => {
    let currentId = sections[0] ? sections[0].id : '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentId = section.id;
      }
    });

    navLinkEls.forEach((link) => {
      const linkTarget = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active-link', linkTarget === currentId);
    });
  };

  /* ---------- 3. STICKY NAV BACKGROUND ---------- */
  const nav = document.getElementById('nav');
  const backToTop = document.getElementById('backToTop');

  const handleScroll = () => {
    const scrolled = window.scrollY > 24;
    nav.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('visible', window.scrollY > 600);
    highlightActiveLink();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  /* ---------- 4. SCROLL-REVEAL ANIMATIONS ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // Skip the animation entirely and just show everything
    revealEls.forEach((el) => el.classList.add('in-view'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ---------- 5. BACK-TO-TOP BUTTON ---------- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  });

});
