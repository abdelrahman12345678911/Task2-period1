// Select elements
const sliderContainer = document.querySelector('.slider-container');
const leftSlide = document.querySelector('.left-slide');
const rightSlide = document.querySelector('.right-slide');
const downButton = document.querySelector('.down-button');
const upButton = document.querySelector('.up-button');
const dotsContainer = document.createElement('div');

let currentIndex = 0;
let interval;

// Initialize pagination dots
dotsContainer.className = 'pagination';
sliderContainer.appendChild(dotsContainer);

const slides = Array.from(leftSlide.children);
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.dataset.index = index;
    if (index === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
});

// Get all dots
const dots = Array.from(dotsContainer.children);

// Function to switch to a specific slide
function switchSlide(index) {
    currentIndex = index;
    const slideHeight = sliderContainer.clientHeight;
    leftSlide.style.transform = `translateY(-${index * slideHeight}px)`;
    rightSlide.style.transform = `translateY(-${index * slideHeight}px)`;

    // Update active dot
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// Function to go to the next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    switchSlide(currentIndex);
}

// Function to go to the previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    switchSlide(currentIndex);
}

// Event listeners for navigation buttons
upButton.addEventListener('click', prevSlide);
downButton.addEventListener('click', nextSlide);

// Event listeners for dots
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.index, 10);
        switchSlide(index);
    });
});

// Auto slide functionality
function startAutoSlide() {
    interval = setInterval(nextSlide, 3000);
}

// Pause auto slide on hover
function pauseAutoSlide() {
    clearInterval(interval);
}

// Add hover events
sliderContainer.addEventListener('mouseenter', pauseAutoSlide);
sliderContainer.addEventListener('mouseleave', startAutoSlide);

// Enable swipe functionality
let startY = 0;
sliderContainer.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
});
sliderContainer.addEventListener('touchend', e => {
    const endY = e.changedTouches[0].clientY;
    if (startY > endY + 30) nextSlide();
    if (startY < endY - 30) prevSlide();
});

// Handle window resize to adjust slide positions
window.addEventListener('resize', () => {
    switchSlide(currentIndex);
});

// Initialize slider
switchSlide(currentIndex);
startAutoSlide();
