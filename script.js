/* ============================================
   Springs Rejuvenation GLP-1 Funnel JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // --- Mobile Menu Toggle ---
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      const spans = navToggle.querySelectorAll('span');
      navToggle.classList.toggle('active');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // --- Navbar scroll effect ---
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 90;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Weight Loss Calculator ---
  const weightSlider = document.getElementById('weight-slider');
  const weightDisplay = document.getElementById('weight-display');
  const lossDisplay = document.getElementById('loss-display');
  const goalDisplay = document.getElementById('goal-display');

  if (weightSlider) {
    function updateCalculator() {
      const weight = parseInt(weightSlider.value);
      const lossPercent = 0.20; // 20% average
      const loss = Math.round(weight * lossPercent);
      const goal = weight - loss;
      if (weightDisplay) weightDisplay.textContent = weight;
      if (lossDisplay) lossDisplay.textContent = loss;
      if (goalDisplay) goalDisplay.textContent = goal;
    }
    weightSlider.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-item__question').forEach(button => {
    button.addEventListener('click', function() {
      const item = this.closest('.faq-item');
      const wasActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      // Toggle clicked
      if (!wasActive) item.classList.add('active');
    });
  });

  // --- Goal Quiz Selection ---
  document.querySelectorAll('.goal-quiz__option').forEach(option => {
    option.addEventListener('click', function() {
      document.querySelectorAll('.goal-quiz__option').forEach(o => o.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // --- Multi-Step Form (Intake) ---
  const formSteps = document.querySelectorAll('.form-step');
  const progressSteps = document.querySelectorAll('.progress-bar__step');
  let currentStep = 0;

  function showStep(index) {
    formSteps.forEach((step, i) => {
      step.classList.toggle('active', i === index);
    });
    progressSteps.forEach((step, i) => {
      step.classList.remove('active', 'completed');
      if (i < index) step.classList.add('completed');
      if (i === index) step.classList.add('active');
    });
    currentStep = index;
    // Scroll to top of form
    const formCard = document.querySelector('.form-card');
    if (formCard) formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Next buttons
  document.querySelectorAll('[data-next]').forEach(btn => {
    btn.addEventListener('click', function() {
      if (validateCurrentStep()) {
        showStep(currentStep + 1);
      }
    });
  });

  // Back buttons
  document.querySelectorAll('[data-prev]').forEach(btn => {
    btn.addEventListener('click', function() {
      showStep(currentStep - 1);
    });
  });

  // --- Form Validation ---
  function validateCurrentStep() {
    const activeStep = document.querySelector('.form-step.active');
    if (!activeStep) return true;

    const requiredInputs = activeStep.querySelectorAll('input[required], select[required]');
    let valid = true;

    requiredInputs.forEach(input => {
      const errorMsg = input.nextElementSibling;
      if (!input.value.trim()) {
        input.classList.add('error');
        if (errorMsg && errorMsg.classList.contains('error-msg')) {
          errorMsg.style.display = 'block';
        }
        valid = false;
      } else {
        input.classList.remove('error');
        if (errorMsg && errorMsg.classList.contains('error-msg')) {
          errorMsg.style.display = 'none';
        }
      }
    });

    // Email validation
    const emailInput = activeStep.querySelector('input[type="email"]');
    if (emailInput && emailInput.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('error');
        valid = false;
      }
    }

    // Phone validation
    const phoneInput = activeStep.querySelector('input[type="tel"]');
    if (phoneInput && phoneInput.value.trim()) {
      const digits = phoneInput.value.replace(/\D/g, '');
      if (digits.length < 10) {
        phoneInput.classList.add('error');
        valid = false;
      }
    }

    if (!valid) {
      const firstError = activeStep.querySelector('.error');
      if (firstError) firstError.focus();
    }

    return valid;
  }

  // Clear errors on input
  document.querySelectorAll('.form-group input, .form-group select').forEach(input => {
    input.addEventListener('input', function() {
      this.classList.remove('error');
      const errorMsg = this.nextElementSibling;
      if (errorMsg && errorMsg.classList.contains('error-msg')) {
        errorMsg.style.display = 'none';
      }
    });
  });

  // --- Plan Selection (Checkout) ---
  document.querySelectorAll('.plan-card').forEach(card => {
    card.addEventListener('click', function() {
      document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // Eligibility plan selection
  document.querySelectorAll('.eligibility-plan').forEach(plan => {
    plan.addEventListener('click', function() {
      document.querySelectorAll('.eligibility-plan').forEach(p => p.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // --- Checkout Form Submit ---
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // EDIT: Connect to Stripe or your payment processor
      alert('Payment form submitted. Connect to your payment processor to complete.');
    });
  }

  // --- Portal Login Form ---
  const portalForm = document.getElementById('portal-login-form');
  if (portalForm) {
    portalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // EDIT: Connect to your patient portal backend
      alert('Login submitted. Connect to your patient portal system to complete.');
    });
  }

  // --- Animate on scroll (simple) ---
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.product-card, .testimonial-card, .step, .stat-item, .doctor-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // --- Phone number formatting ---
  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function() {
      let digits = this.value.replace(/\D/g, '');
      if (digits.length > 10) digits = digits.slice(0, 10);
      if (digits.length >= 7) {
        this.value = '(' + digits.slice(0,3) + ') ' + digits.slice(3,6) + '-' + digits.slice(6);
      } else if (digits.length >= 4) {
        this.value = '(' + digits.slice(0,3) + ') ' + digits.slice(3);
      } else if (digits.length > 0) {
        this.value = '(' + digits;
      }
    });
  });

});
