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
