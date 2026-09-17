// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const setupCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'fixed w-8 h-8 border-2 border-primary rounded-full pointer-events-none z-[9999] transition-transform duration-100 mix-blend-difference hidden md:block';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 16,
            y: e.clientY - 16,
            duration: 0.1
        });
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('scale-150', 'bg-primary'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('scale-150', 'bg-primary'));
    });
};

if (!('ontouchstart' in window)) {
    setupCursor();
}

// Typing Animation
const typingElement = document.getElementById('typing-text');
const phrases = ["Hey there!", "I'm a Developer", "I build AI solutions", "Welcome to my space"];
let phraseIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function type() {
    if(!typingElement) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, characterIndex - 1);
        characterIndex--;
    } else {
        typingElement.textContent = currentPhrase.substring(0, characterIndex + 1);
        characterIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && characterIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && characterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Footer Phrase Rotation
const footerElement = document.getElementById('footer-phrase');
const footerPhrases = ["Thank You!", "Always Learning New Things!", "Let's build the future!", "Stay Creative!"];
let footerIndex = 0;

function rotateFooterText() {
    if(!footerElement) return;
    footerElement.style.opacity = 0;
    setTimeout(() => {
        footerElement.textContent = footerPhrases[footerIndex];
        footerElement.style.opacity = 1;
        footerIndex = (footerIndex + 1) % footerPhrases.length;
    }, 500);
}

// Age Calculation
function calculateAge() {
    const birthday = new Date('2002-06-07');
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }
    const ageElement = document.getElementById('my-age');
    if (ageElement) ageElement.textContent = age;
}

// Initialize animations
window.addEventListener('load', () => {
    type();
    calculateAge();
    rotateFooterText();
    setInterval(rotateFooterText, 3000);

    // Simple Header Entrance
    gsap.from("header", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Magnetic Button Effect
document.querySelectorAll('.shimmer').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: "power2.out"
        });
    });
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)"
        });
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
