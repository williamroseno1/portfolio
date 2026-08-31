// Reveal Animation Observer
const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.18 });

revealItems.forEach((item) => revealObserver.observe(item));

// Counter Animation
const counters = document.querySelectorAll('.stat-number');

const animateCounter = (counter) => {
    const target = Number(counter.dataset.target);
    const duration = 1200;
    const startTime = performance.now();

    const tick = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        counter.textContent = `${value}${target === 35 ? '%' : target === 4 ? '+' : ''}`;

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            counter.textContent = `${target}${target === 35 ? '%' : target === 4 ? '+' : ''}`;
        }
    };

    requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.7 });

counters.forEach((counter) => counterObserver.observe(counter));

// 3D Tilt Effect on Dashboard Card
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
    heroVisual.addEventListener('pointermove', (event) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 12;
        const rotateX = (0.5 - y) * 12;

        heroVisual.querySelector('.dashboard-card').style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    heroVisual.addEventListener('pointerleave', () => {
        heroVisual.querySelector('.dashboard-card').style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
}
