const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');

function openMenu() {
    navLinks.classList.add('open');
    overlay.classList.add('active');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    navLinks.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeMenu() : openMenu();
});

overlay.addEventListener('click', closeMenu);

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

document.querySelectorAll('.timeline-item--collapsible .timeline-content').forEach(content => {
    content.addEventListener('click', () => {
        const item = content.closest('.timeline-item');
        const trigger = content.querySelector('.timeline-trigger');

        const isOpen = item.classList.toggle('is-open');

        if (trigger) {
            trigger.setAttribute('aria-expanded', isOpen);
        }
    });
});