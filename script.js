/**
 * Main Page Logic: Loader, Theme Toggle, and Scroll Reveal
 */

const revealElements = () => {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            el.classList.add("active");
        }
    });
};

window.addEventListener("load", () => {
    // Hide loader
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }

    // Initial check to show elements already in viewport
    revealElements();
});

document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

window.addEventListener("scroll", () => {
    // Reveal on scroll
    revealElements();

    // Highlight nav links
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 60;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

/* =========================================================
   Featured Projects Gallery - Auto Slide on Hover
   ========================================================= */
document.querySelectorAll('.featured-project-card').forEach(card => {
    const slides = card.querySelectorAll('.project-slide');
    if (slides.length <= 1) return; // إذا كانت هناك صورة واحدة يتجاهل الكود

    let currentIndex = 0;
    let intervalId = null;

    card.addEventListener('mouseenter', () => {
        // التبديل التلقائي كل ثانية ونصف عند الوقوف بالماوس
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

// كود الفلترة لعرض أحدث 3 مشاريع فقط
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

function filterProjects(filterValue) {
    let visibleCount = 0;

    // تحويل القائمة لمصفوفة وعكسها لنبدأ من أحدث العناصر المضافة (من الأسفل للأعلى)
    const cardsArray = Array.from(projectCards).reverse();

    cardsArray.forEach(card => {
        const category = card.getAttribute('data-category');
        const matches = (filterValue === 'all' || category === filterValue);

        // إظهار الكارت فقط إذا كان يطابق الفلتر ولم نتجاوز عدد 3 مشاريع
        if (matches && visibleCount < 3) {
            card.classList.remove('filter-hidden');
            card.classList.add('filter-visible');
            visibleCount++;
        } else {
            card.classList.add('filter-hidden');
            card.classList.remove('filter-visible');
        }
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        filterProjects(filterValue);
    });
});

// تشغيل الفلتر الافتراضي عند تحميل الصفحة
filterProjects('all');

// Toggle Mobile Navigation
const hamburger = document.getElementById("hamburger");
const mainNav = document.getElementById("main-nav");

if (hamburger && mainNav) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        mainNav.classList.toggle("mobile-open");
    });

    // إغلاق القائمة تلقائياً عند الضغط على أي رابط داخلها
    document.querySelectorAll("#main-nav a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            mainNav.classList.remove("mobile-open");
        });
    });
}
