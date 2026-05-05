document.addEventListener("DOMContentLoaded", () => {

    // --- Intersection Observer per le animazioni allo scroll (.fade-in) ---
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    fadeElements.forEach(el => observer.observe(el));

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenu && mobileMenuButton) {
        const menuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        menuLinks.forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    // --- Logica Modale Progetti (Usa innerHTML) ---
    const cards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.getElementById('close-modal');
    const backToTopBtn = document.getElementById('back-to-top');

    if (modal && modalContent && closeBtn) {
        cards.forEach(card => {
            card.addEventListener('click', function () {
                modalContent.innerHTML = card.innerHTML;
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                if (backToTopBtn) backToTopBtn.classList.add('hidden');
            });
        });

        closeBtn.addEventListener('click', function () {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            if (backToTopBtn) backToTopBtn.classList.remove('hidden');
        });

        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
                if (backToTopBtn) backToTopBtn.classList.remove('hidden');
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
                if (backToTopBtn) backToTopBtn.classList.remove('hidden');
            }
        });
    }

    // --- Bottone "Torna Su" ---
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Animazione Contatori Statistiche ---
    const counters = document.querySelectorAll('.counter-value');
    const speed = 100; // Velocità animazione

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');

                const updateCount = () => {
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    // --- Logica FAQ Accordion ---
    const faqBtns = document.querySelectorAll('.faq-btn');
    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');

            // Chiudi tutte le altre aperte
            document.querySelectorAll('.faq-content').forEach(c => {
                if (c !== content) {
                    c.classList.remove('open', 'py-4');
                    c.previousElementSibling.querySelector('.faq-icon').classList.remove('rotate-180');
                }
            });

            // Apri/Chiudi quella cliccata
            content.classList.toggle('open');
            content.classList.toggle('py-4');
            icon.classList.toggle('rotate-180');
        });
    });

    // --- Scroll Spy (Evidenziatore Menu Attivo) ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('text-emerald-500');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('text-emerald-500');
            }
        });
    });
});