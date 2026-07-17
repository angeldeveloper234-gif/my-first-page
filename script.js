document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

function closeDropdowns(except = null) {
  dropdownToggles.forEach((toggle) => {
    if (toggle === except) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.closest('.nav-group').classList.remove('dropdown-open');
  });
}

function closeMenu() {
  if (!mainNav || !menuToggle) return;
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú');
  document.body.classList.remove('menu-open');
  closeDropdowns();
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('menu-open', isOpen);
  });

  mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
}

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const group = toggle.closest('.nav-group');
    const willOpen = !group.classList.contains('dropdown-open');
    closeDropdowns(toggle);
    group.classList.toggle('dropdown-open', willOpen);
    toggle.setAttribute('aria-expanded', String(willOpen));
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-group')) closeDropdowns();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && mainNav?.classList.contains('open')) closeMenu();
});

const faqButtons = document.querySelectorAll('.faq-item button');

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const answer = document.getElementById(button.getAttribute('aria-controls'));
    const willOpen = button.getAttribute('aria-expanded') !== 'true';

    faqButtons.forEach((otherButton) => {
      const otherAnswer = document.getElementById(otherButton.getAttribute('aria-controls'));
      otherButton.setAttribute('aria-expanded', 'false');
      otherButton.querySelector('span').textContent = '+';
      otherAnswer.hidden = true;
    });

    if (willOpen) {
      button.setAttribute('aria-expanded', 'true');
      button.querySelector('span').textContent = '−';
      answer.hidden = false;
    }
  });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px' });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const hashNavLinks = [...document.querySelectorAll('.main-nav > a[href^="#"]')];
const observedSections = hashNavLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

if ('IntersectionObserver' in window && observedSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      hashNavLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55%', threshold: 0 });

  observedSections.forEach((section) => sectionObserver.observe(section));
}
