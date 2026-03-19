/* ── SLIDESHOW ── */
let slideIdx = 0;
let slideTimer = null;
const SLIDE_INTERVAL = 4000;

function initSlideshow() {
  syncSlidesToGallery();
  startSlideshow();
}

function syncSlidesToGallery() {
  ['gal0', 'gal1', 'gal2', 'gal3'].forEach((key, i) => {
    const url = state.images[key];
    const slide = document.getElementById('slide-' + i);
    if (!slide) return;
    if (url) {
      slide.style.backgroundImage = `url(${url})`;
      slide.classList.remove('no-src');
    } else {
      slide.classList.add('no-src');
    }
  });
}

function startSlideshow() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => nextSlide(), SLIDE_INTERVAL);
}

function nextSlide() {
  goSlide((slideIdx + 1) % 4);
}

function countActiveSlidesWithImages() {
  return ['gal0', 'gal1', 'gal2', 'gal3'].filter(k => state.images[k]).length;
}

function goSlide(n) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slide-dot');
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[n]?.classList.add('active');
  dots[n]?.classList.add('active');
  slideIdx = n;
}


const hamburger = document.getElementById('nav-hamburger');
const drawer = document.getElementById('nav-drawer');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  drawer.classList.toggle('open');
});

// リンクをタップしたら閉じる
drawer.querySelectorAll('.nav-drawer-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
  });
});