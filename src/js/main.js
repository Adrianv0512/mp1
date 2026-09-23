/* Your JS here. */

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


const carousel = document.querySelector('.carousel');

if (carousel) {
    const carouselSlides = Array.from(
        carousel.querySelectorAll('.carousel-slide')
    );

    const previousButton =
        carousel.querySelector('.carousel-prev');

    const nextButton =
        carousel.querySelector('.carousel-next');

    let currentSlideIndex = carouselSlides.findIndex((slide) =>
        slide.classList.contains('active')
    );

    if (currentSlideIndex === -1) {
        currentSlideIndex = 0;
    }

    function showSlide(newIndex) {
        currentSlideIndex =
            (newIndex + carouselSlides.length) %
            carouselSlides.length;

        carouselSlides.forEach((slide, index) => {
            const isActive = index === currentSlideIndex;

            slide.classList.toggle('active', isActive);
            slide.setAttribute(
                'aria-hidden',
                String(!isActive)
            );
        });
    }

    previousButton.addEventListener('click', () => {
        showSlide(currentSlideIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        showSlide(currentSlideIndex + 1);
    });

    carousel.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            showSlide(currentSlideIndex - 1);
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            showSlide(currentSlideIndex + 1);
        }
    });

    showSlide(currentSlideIndex);
}


window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        navbar.classList.add("navbar-small");
    } else {
        navbar.classList.remove("navbar-small");
    }
});