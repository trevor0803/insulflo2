/* ==========================================================================
   Insulflo — Site Scripts
   ========================================================================== */

(function () {
  'use strict';

  /* ----------------------------------------
     Mobile nav toggle
     ---------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const expanded = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ----------------------------------------
     Reveal on scroll
     ---------------------------------------- */
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

  /* ----------------------------------------
     Instant Quote Estimator
     ----------------------------------------
     Provides ROUGH ballpark ranges using
     Florida market rates. These are
     ballparks only — the form sends the
     details to the team for a real quote.
     ---------------------------------------- */
  const estimatorForm = document.getElementById('estimator-form');
  if (estimatorForm) {
    const resultBox = estimatorForm.querySelector('.estimate-result');
    const resultStrong = resultBox.querySelector('strong');
    const resultSpan = resultBox.querySelector('span');

    estimatorForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const sqft = parseInt(estimatorForm.querySelector('[name="sqft"]').value, 10) || 0;
      const service = estimatorForm.querySelector('[name="service"]').value;
      const area = estimatorForm.querySelector('[name="area"]').value;

      // Per sqft pricing ranges (Central FL market, ballpark)
      // These are deliberately conservative and clearly labeled as estimates.
      const rates = {
        'spray-foam-open':   { low: 1.20, high: 2.50, label: 'Open-cell spray foam' },
        'spray-foam-closed': { low: 2.00, high: 4.00, label: 'Closed-cell spray foam' },
        'blown-in':          { low: 1.00, high: 2.20, label: 'Blown-in insulation' },
        'removal':           { low: 1.00, high: 2.00, label: 'Insulation removal' },
        'windows':           { low: 450,  high: 1200, label: 'Window installation', perUnit: true },
        'not-sure':          { low: 1.00, high: 3.00, label: 'Estimated project range' },
      };

      const r = rates[service] || rates['not-sure'];
      let low, high;

      if (r.perUnit) {
        // For windows, sqft input represents window count
        low = sqft * r.low;
        high = sqft * r.high;
      } else {
        low = sqft * r.low;
        high = sqft * r.high;
      }

      // Light area adjustment (Orlando/Tampa ~5% higher than Lakeland)
      if (area === 'orlando' || area === 'tampa' || area === 'wesley-chapel') {
        low *= 1.04;
        high *= 1.05;
      }

      const fmt = (n) => '$' + Math.round(n / 50) * 50;
      resultStrong.textContent = `${fmt(low)} – ${fmt(high)}`;
      resultSpan.innerHTML = `Ballpark range for ${r.label}.<br>Real quote in under 1 business day — we just need your contact info below.`;
      resultBox.classList.add('active');

      // Scroll to result on mobile
      if (window.innerWidth < 720) {
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /* ----------------------------------------
     Energy Savings Calculator
     ----------------------------------------
     Industry rule of thumb: proper attic
     insulation in FL can cut cooling cost
     by 15–25%. We use 20% as midpoint.
     ---------------------------------------- */
  const billSlider = document.getElementById('bill-slider');
  if (billSlider) {
    const billValue = document.getElementById('bill-value');
    const sizeSlider = document.getElementById('size-slider');
    const sizeValue = document.getElementById('size-value');
    const savingsValue = document.getElementById('savings-value');
    const annualValue = document.getElementById('annual-value');

    function updateSavings() {
      const monthlyBill = parseInt(billSlider.value, 10);
      const homeSize = parseInt(sizeSlider.value, 10);

      // Larger homes see proportionally larger savings
      // Base savings rate: 18% for poorly insulated FL homes
      const sizeMultiplier = Math.min(1.3, 0.85 + (homeSize / 4000) * 0.45);
      const savingsRate = 0.18 * sizeMultiplier;

      const monthlySavings = Math.round(monthlyBill * savingsRate);
      const annualSavings = monthlySavings * 12;

      billValue.textContent = `$${monthlyBill}`;
      sizeValue.textContent = `${homeSize.toLocaleString()} sq ft`;
      savingsValue.textContent = `$${monthlySavings}`;
      annualValue.textContent = `$${annualSavings.toLocaleString()} per year`;
    }

    billSlider.addEventListener('input', updateSavings);
    sizeSlider.addEventListener('input', updateSavings);
    updateSavings();
  }

  /* ----------------------------------------
     Contact form (frontend handler)
     ----------------------------------------
     This intercepts submission and shows
     a success state. To actually receive
     emails, wire up to Formspree, Netlify
     Forms, or a backend (see README).
     ---------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const status = contactForm.querySelector('.form-status');

    contactForm.addEventListener('submit', (e) => {
      // If a Formspree/etc endpoint is set, let it submit normally
      const action = contactForm.getAttribute('action');
      if (action && action !== '#' && action !== '') {
        // Allow native submission for real backend
        return;
      }

      // Otherwise show local success state
      e.preventDefault();
      status.classList.add('success');
      status.textContent = "Thanks — your message is ready to send. Connect this form to Formspree or another service (see README) to start receiving inquiries.";
      contactForm.reset();
    });
  }

  /* ----------------------------------------
     Year in footer
     ---------------------------------------- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* ----------------------------------------
   Services dropdown - tap/keyboard toggle
   ---------------------------------------- */
(function() {
  'use strict';
  const dropdownTriggers = document.querySelectorAll('.nav-links .has-dropdown > a');
  dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      // On desktop, hover handles it; on mobile/tap, we toggle
      const parent = trigger.parentElement;
      const isOpen = parent.classList.contains('open');

      // Close any other open dropdowns
      document.querySelectorAll('.nav-links .has-dropdown.open').forEach(el => {
        if (el !== parent) el.classList.remove('open');
      });

      // Prevent the "#" link from jumping
      e.preventDefault();
      parent.classList.toggle('open');
      trigger.setAttribute('aria-expanded', !isOpen);
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      document.querySelectorAll('.nav-links .has-dropdown.open').forEach(el => {
        el.classList.remove('open');
        const link = el.querySelector('a');
        if (link) link.setAttribute('aria-expanded', 'false');
      });
    }
  });
})();
