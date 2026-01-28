document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Handle hover states for cursor
    const interactiveElements = document.querySelectorAll('a, button, .bento-item, .comparison-container');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(4)';
            cursor.style.background = 'rgba(202, 138, 4, 0.2)';
            cursor.style.border = '1px solid var(--accent)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--accent)';
            cursor.style.border = 'none';
        });
    });

    // Parallax Effect
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        const heroImg = document.getElementById('hero-img');
        if (heroImg) {
            heroImg.style.transform = `scale(1.1) translateY(${scroll * 0.4}px)`;
        }

        // Header scroll effect
        const header = document.querySelector('.main-header');
        if (scroll > 100) {
            header.style.padding = '1rem 0';
        } else {
            header.style.padding = '2rem 0';
        }
    });

    // Reveal on Scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Before/After Slider
    const container = document.getElementById('comparison');
    const afterImg = document.getElementById('after-img');
    const handle = document.getElementById('handle');

    if (container) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = (x / rect.width) * 100;

            if (percent >= 0 && percent <= 100) {
                afterImg.style.width = percent + '%';
                handle.style.left = percent + '%';
            }
        });

        // Touch support
        container.addEventListener('touchmove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const percent = (x / rect.width) * 100;

            if (percent >= 0 && percent <= 100) {
                afterImg.style.width = percent + '%';
                handle.style.left = percent + '%';
            }
        });
    }

    // Smooth Inquire Button
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.textContent = 'Curating Request...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Inquiry Received';
                btn.style.background = '#14532D';
                btn.style.color = '#fff';
                form.reset();
            }, 2000);
        });
    }
});
