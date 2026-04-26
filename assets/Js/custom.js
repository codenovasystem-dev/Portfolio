
  // Cursor
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX-5}px,${e.clientY-5}px)`;
    trail.style.transform = `translate(${e.clientX-16}px,${e.clientY-16}px)`;
  });

  // Nav scroll
  window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', scrollY > 40);
  });

  // Scroll reveal + skill bars
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        e.target.querySelectorAll && e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = getComputedStyle(bar).getPropertyValue('--w').trim() || bar.style.getPropertyValue('--w');
        });
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Skill cards bar trigger
  document.querySelectorAll('.skill-card').forEach(card => {
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        card.classList.add('animated');
        card.querySelectorAll('.skill-bar-fill').forEach(bar => {
          const w = bar.style.getPropertyValue('--w') || '0%';
          bar.style.width = w;
        });
      }
    }, { threshold: 0.3 }).observe(card);
  });

  // Contact form EmailJS setup
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');
  const emailJsConfig = {
    publicKey: 'JFZbHxBdVXCGjKJyb',
    serviceId: 'service_7idgz6q',
    templateId: 'template_yzu2wei',
  };

  const setFormStatus = (message, type = 'info') => {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = `form-status is-${type}`;
  };

  if (contactForm) {
    const emailJsReady = typeof emailjs !== 'undefined'
      && !Object.values(emailJsConfig).some(value => value.startsWith('YOUR_EMAILJS_'));

    if (emailJsReady) {
      emailjs.init({
        publicKey: emailJsConfig.publicKey,
        limitRate: {
          id: 'portfolio-contact-form',
          throttle: 10000,
        },
      });
    }

    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      if (!contactForm.reportValidity()) {
        setFormStatus('Please fill in all required fields correctly.', 'error');
        return;
      }

      if (!emailJsReady) {
        setFormStatus('The contact form is not fully configured yet. Please try again shortly.', 'error');
        return;
      }

      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
      }

      setFormStatus('Sending your message now...', 'success');

      emailjs.sendForm(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        contactForm
      ).then(() => {
        setFormStatus('Message sent successfully. Redirecting to the thank-you page...', 'success');
        window.location.href = 'thanks.html';
      }).catch(() => {
        if (submitBtn) {
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
        }

        setFormStatus('Message failed to send right now. Please try again in a moment or email codenovasystem@gmail.com directly.', 'error');
      });
    });
  }

  // Smooth nav
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
