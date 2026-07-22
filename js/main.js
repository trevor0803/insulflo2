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

  // Contact form → GoHighLevel (via /api/lead serverless function)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const status = contactForm.querySelector('.form-status');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const val = (id) => (document.getElementById(id)?.value || '').trim();

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.classList.remove('success', 'error');

      const payload = {
        name: val('name'),
        phone: val('phone'),
        email: val('email'),
        service: document.getElementById('service')?.value || '',
        message: val('message'),
      };

      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      try {
        const r = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!r.ok) throw new Error('Request failed');
        status.classList.add('success');
        status.textContent = "Thanks! We got your request and will reach out the same business day.";
        contactForm.reset();
      } catch (err) {
        status.classList.add('error');
        status.textContent = "Sorry — something went wrong. Please call us at (863) 251-2991 and we'll help right away.";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  // Year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
