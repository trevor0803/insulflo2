// Marks the document as scripted so the CSS can keep .reveal sections visible
// until we know JS is actually running.
document.documentElement.classList.add('js');

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
      // threshold MUST stay 0. The whole article body is one .reveal element and
      // runs 7,000-10,000px tall, so on a phone less than 12% of it can ever be
      // on screen at once - a non-zero threshold never fires and the copy stays
      // at opacity 0 permanently. Fire as soon as any part of it enters.
      { threshold: 0, rootMargin: '0px 0px -50px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // Lead forms → GoHighLevel (via the /api/lead serverless function).
  //
  // This binds EVERY form carrying .lead-form, not a single element id, because
  // the same form now appears on the service and city pages as well as /contact.
  // Fields are read from within each form (form.elements) rather than by global
  // id — with several forms on one document, getElementById would always return
  // the first one's inputs and every page would submit the wrong values.
  document.querySelectorAll('form.lead-form').forEach((form) => {
    const status = form.querySelector('.form-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    const val = (n) => (form.elements[n]?.value || '').trim();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (status) { status.classList.remove('success', 'error'); status.textContent = ''; }

      const payload = {
        name: val('name'),
        phone: val('phone'),
        email: val('email'),
        service: val('service'),
        message: val('message'),
        // Which page produced the lead, so it is attributable in the CRM note.
        page: window.location.pathname || '/',
      };

      if (!payload.phone && !payload.email) {
        if (status) {
          status.classList.add('error');
          status.textContent = 'Please add a phone number or an email so we can reach you.';
        }
        return;
      }

      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

      try {
        const r = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!r.ok) throw new Error('Request failed');
        if (status) {
          status.classList.add('success');
          status.textContent = "Thanks! We got your request and will reach out the same business day.";
        }
        form.reset();
      } catch (err) {
        if (status) {
          status.classList.add('error');
          status.textContent = "Sorry — something went wrong. Please call us at (863) 251-2991 and we'll help right away.";
        }
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
      }
    });
  });

  // Year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
