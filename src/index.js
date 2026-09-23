/*
 * This is the main entry point for Webpack, the compiler & dependency loader.
 * All files that are necessary for your web page and need to be 'watched' for changes should be included here!
 */

// HTML Files
import './index.html';

// Stylesheets
import './css/main.scss';

// Scripts
import './js/main.js';


const navbar = document.querySelector('#navbar');
const navLinks = Array.from(
    document.querySelectorAll('.nav-links a[href^="#"]')
);

const navItems = navLinks
    .map((link) => {
        const sectionId = link.hash.slice(1);
        const section = document.getElementById(sectionId);

        return {
            link,
            section,
        };
    })
    .filter((item) => item.section !== null);

function setActiveLink(activeLink) {
    navLinks.forEach((link) => {
        const isActive = link === activeLink;

        link.classList.toggle('active', isActive);

        if (isActive) {
            link.setAttribute('aria-current', 'location');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

function updateActiveSection() {
    const pageBottom =
        window.scrollY + window.innerHeight;

    const documentHeight =
        document.documentElement.scrollHeight;

    
    const isAtBottom =
        Math.ceil(pageBottom) >= documentHeight - 1;

    if (isAtBottom) {
        setActiveLink(navLinks[navLinks.length - 1]);
        return;
    }

    
    const readingPosition =
        navbar.getBoundingClientRect().bottom + 1;

    let activeLink = navItems[0].link;

    navItems.forEach(({ link, section }) => {
        const sectionTop =
            section.getBoundingClientRect().top;

        if (sectionTop <= readingPosition) {
            activeLink = link;
        }
    });

    setActiveLink(activeLink);
}


let updateRequested = false;

function handleScroll() {
    if (updateRequested) {
        return;
    }

    updateRequested = true;

    window.requestAnimationFrame(() => {
        updateActiveSection();
        updateRequested = false;
    });
}

window.addEventListener('scroll', handleScroll, {
    passive: true,
});

window.addEventListener('resize', updateActiveSection);


updateActiveSection();