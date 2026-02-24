// Loader
window.addEventListener("load", () => {
    document.getElementById("loader").style.display = "none";
});

// Toggle Dark Mode
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// Reveal on scroll
window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });

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