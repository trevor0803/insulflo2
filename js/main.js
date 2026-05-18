/* Insulflo Energy Services — Site Scripts */
(function () {
  'use strict';

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Services dropdown
  const dropdownTriggers = document.querySelectorAll('.nav-links .has-dropdown > a');
  dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      const parent = trigger.parentElement;
      const isOpen = parent.classList.contains('open');
      document.querySelectorAll('.nav-links .has-dropdown.open').forEach(el => {
        if (el !== parent) el.classList.remove('open');
      });
      e.preventDefault();
      parent.classList.toggle('open');
      trigger.setAttribute('aria-expanded', !isOpen);
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      document.querySelectorAll('.nav-links .has-dropdown.open').forEach(el => {
        el.classList.remove('open');
        const link = el.querySelector('a');
        if (link) link.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // Contact form (frontend handler)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const status = contactForm.querySelector('.form-status');
    contactForm.addEventListener('submit', (e) => {
      const action = contactForm.getAttribute('action');
      if (action && action !== '#' && action !== '') return;
      e.preventDefault();
      status.classList.add('success');
      status.textContent = "Thanks — your message is ready. Wire this form to Formspree (or similar) to start receiving inquiries.";
      contactForm.reset();
    });
  }

  // Year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
