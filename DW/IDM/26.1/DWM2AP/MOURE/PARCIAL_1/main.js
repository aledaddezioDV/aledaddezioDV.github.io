const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.evento').forEach((evento) => {
    observer.observe(evento);
});

window.addEventListener('scroll', () => {
    const timeline = document.querySelector('.timeline-container');
    const icon = document.getElementById('heisenberg-icon');
    if(!timeline || !icon) return;

    const rect = timeline.getBoundingClientRect();
    const scrollProp = window.innerHeight / 2;
    let progress = (scrollProp - rect.top) / rect.height;
    progress = Math.max(0, Math.min(1, progress));
    icon.style.top = `${progress * 100}%`;
});

const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.episodio-card');
const nextBtn = document.querySelector('#nextBtn');
const prevBtn = document.querySelector('#prevBtn');

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let currentIndex = 0;

function setSliderPosition() {
    track.style.transform = `translateX(${currentTranslate}px)`;
}

function updateCardOpacity() {
    cards.forEach((card, index) => {
        if (index === currentIndex) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

function updateCarousel() {
    const cardWidth = track.offsetWidth / 2 + 15; 
    currentTranslate = currentIndex * -cardWidth;
    prevTranslate = currentTranslate;
    track.style.transition = 'transform 0.5s ease-out';
    setSliderPosition();
    updateCardOpacity();
}


track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startPos = e.pageX - track.offsetLeft;
    track.style.transition = 'none';
});

window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < cards.length - 1) currentIndex++;
    else if (movedBy > 100 && currentIndex > 0) currentIndex--;

    updateCarousel();
});

track.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.pageX - track.offsetLeft;
    const walk = x - startPos;
    currentTranslate = prevTranslate + walk;
    setSliderPosition();
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = cards.length - 1; 
    }
    updateCarousel();
});

updateCardOpacity();


function cambiarVideo(videoId, num) {
    const mainVideo = document.getElementById('main-video');
    const thumbs = document.querySelectorAll('.thumb');
    
    mainVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    
    thumbs.forEach((t, i) => {
        if (i === num - 1) t.classList.add('active');
        else t.classList.remove('active');
    });

    const wrapper = document.getElementById('video-wrapper');
    wrapper.style.transform = "scale(1.02)";
    setTimeout(() => wrapper.style.transform = "scale(1)", 300);
}