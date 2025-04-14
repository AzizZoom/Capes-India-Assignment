const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const dropdown = document.querySelector('.dropdown > a');
const dropdownParent = document.querySelector('.dropdown');
const slider = document.querySelector('.feature-slider');
const dots = document.querySelectorAll('.dot');
const navbar = document.getElementById("navbar");
const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dotsContainer = document.querySelector('.carousel-dots');
let currentSlide = 0;

// Nav Bar Transparent
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile Nav Bar
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Toggle dropdown on mobile
dropdown.addEventListener('click', (e) => {
  if (window.innerWidth <= 1000) {
    e.preventDefault(); // prevent default navigation
    dropdownParent.classList.toggle('active'); // toggle open/close
  }
});

document.addEventListener('click', (e) => {
  const isDropdownClick = dropdownParent.contains(e.target);
  if (!isDropdownClick && window.innerWidth <= 1000) {
    dropdownParent.classList.remove('active');
  }
});

slider.addEventListener('scroll', () => {
  const index = Math.round(slider.scrollLeft / slider.offsetWidth);
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');
});

// Image Carousel
// Create dots dynamically
slides.forEach((_, index) => {
  const dot = document.createElement('button');
  if (index === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);

  dot.addEventListener('click', () => {
    currentSlide = index;
    updateCarousel();
  });
});

const updateCarousel = () => {
  const slideWidth = slides[0].clientWidth;
  track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

  document.querySelectorAll('.carousel-dots button').forEach(dot => dot.classList.remove('active'));
  dotsContainer.children[currentSlide].classList.add('active');
};

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
});

window.addEventListener('resize', updateCarousel);