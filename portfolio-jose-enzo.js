document.addEventListener('DOMContentLoaded', () => {
  const boot = document.getElementById('boot');
  const bootLines = document.getElementById('boot-lines');
  const main = document.getElementById('main');
  const year = document.getElementById('year');

  const bootSequence = [
    { text: 'BIOS v2.4.0 — POST OK', delay: 0, cls: 'dim' },
    { text: 'CPU: Intel Core i5 (4 cores)', delay: 120, cls: 'dim' },
    { text: 'RAM: 16384 MB OK', delay: 220, cls: 'dim' },
    { text: 'Disk /dev/sda1: mounted OK', delay: 340, cls: 'dim' },
    { text: 'Network: eth0 UP — 1 Gbps', delay: 460, cls: 'dim' },
    { text: '──────────────────────────────', delay: 560, cls: 'dim' },
    { text: 'Loading portfolio.sh ...', delay: 680, cls: '' },
    { text: 'Checking dependencies ... OK', delay: 820, cls: '' },
    { text: 'Authenticating user: jose_enzo', delay: 960, cls: '' },
    { text: 'ACCESS GRANTED', delay: 1100, cls: 'warn' },
    { text: '──────────────────────────────', delay: 1180, cls: 'dim' },
    { text: "$ Welcome to José Enzo's Portfolio", delay: 1320, cls: '' },
  ];

  if (boot && bootLines && main) {
    bootSequence.forEach(({ text, delay, cls }) => {
      window.setTimeout(() => {
        const el = document.createElement('span');
        el.className = `boot-line${cls ? ` ${cls}` : ''}`;
        el.textContent = text;
        bootLines.appendChild(el);
      }, delay);
    });

    window.setTimeout(() => {
      const cursor = document.createElement('span');
      cursor.id = 'cursor-boot';
      bootLines.appendChild(cursor);
    }, 1440);

    window.setTimeout(() => {
      boot.classList.add('fade-out');
      main.classList.add('visible');
      window.setTimeout(() => {
        boot.style.display = 'none';
      }, 700);
    }, 2200);
  }

  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach((element) => revealObserver.observe(element));
  }

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const syncActiveNav = () => {
    const scrollPosition = window.scrollY + 120;

    navLinks.forEach((link) => link.classList.remove('active'));

    let activeSectionId = '';
    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop) {
        activeSectionId = section.id;
      }
    });

    if (activeSectionId) {
      navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${activeSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', syncActiveNav, { passive: true });
  syncActiveNav();

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const navToggle = document.querySelector('.nav-toggle');
  const navLinksEl = document.querySelector('.nav-links');

  if (navToggle && navLinksEl) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinksEl.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // fecha o menu ao clicar em qualquer link
    navLinksEl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksEl.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});