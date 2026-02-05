// Generate grid cells with random opacity
const bgGrid = document.getElementById('bgGrid');
for (let i = 0; i < 50; i++) {
    const cell = document.createElement('div');
    cell.style.position = 'absolute';
    cell.style.width = '60px';
    cell.style.height = '60px';
    cell.style.left = (Math.floor(Math.random() * 20) * 60) + 'px';
    cell.style.top = (Math.floor(Math.random() * 20) * 60) + 'px';
    cell.style.background = 'rgba(59, 130, 246, 0.03)';
    cell.style.borderRadius = '4px';
    cell.style.animation = `cell-pulse ${3 + Math.random() * 4}s infinite`;
    cell.style.animationDelay = Math.random() * 2 + 's';
    bgGrid.appendChild(cell);
}

// Add cell pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes cell-pulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.8; }
    }
`;
document.head.appendChild(style);

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .pricing-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});