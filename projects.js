/**
 * Projects Page Specific Script with Gallery Slideshow Support
 */

document.addEventListener("DOMContentLoaded", () => {
    // Hide Loader
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.display = "none";
        }, 300);
    }

    // Scroll Reveal Effect
    const revealElements = () => {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 80) {
                el.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealElements);
    revealElements();

    // Dark Mode Toggle
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark");
        });
    }

    // Mobile Navigation Hamburger
    const hamburger = document.getElementById("hamburger");
    const mainNav = document.getElementById("main-nav");

    if (hamburger && mainNav) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            mainNav.classList.toggle("mobile-open");
        });
    }

    /* =========================================================
       Project Gallery - Auto Slide on Hover
       ========================================================= */
    document.querySelectorAll('.featured-project-card').forEach(card => {
        const slides = card.querySelectorAll('.project-slide');
        if (slides.length <= 1) return; // إذا كانت هناك صورة واحدة يتجاهلها الكود

        let currentIndex = 0;
        let intervalId = null;

        card.addEventListener('mouseenter', () => {
            // التبديل التلقائي كل 600ms عند الوقوف بالماوس
            intervalId = setInterval(() => {
                slides[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % slides.length;
                slides[currentIndex].classList.add('active');
            }, 600);
        });

        card.addEventListener('mouseleave', () => {
            // إيقاف التبديل والعودة للصورة الأولى فور خروج الماوس
            clearInterval(intervalId);
            slides.forEach(slide => slide.classList.remove('active'));
            currentIndex = 0;
            slides[0].classList.add('active');
        });
    });

    /* =========================================================
       Project Filtering Engine
       ========================================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('#all-projects-grid .featured-project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
});