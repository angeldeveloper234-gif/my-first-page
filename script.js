const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('header nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('nav-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('nav-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
}));

const heroImage = document.querySelector('.hero-image');
const heroImages = [
  'https://images.pexels.com/photos/4894608/pexels-photo-4894608.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/19789837/pexels-photo-19789837.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/17903068/pexels-photo-17903068.jpeg?auto=compress&cs=tinysrgb&w=1600',
];

if (heroImage) {
  let activeImage = 0;
  window.setInterval(() => {
    activeImage = (activeImage + 1) % heroImages.length;
    heroImage.classList.add('is-changing');
    window.setTimeout(() => {
      heroImage.style.backgroundImage = `url('${heroImages[activeImage]}')`;
      heroImage.classList.remove('is-changing');
    }, 260);
  }, 5500);
}
