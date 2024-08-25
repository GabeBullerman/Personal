document.addEventListener('DOMContentLoaded', function() {
    const texts = ["Software Engineer", "Fullstack Developer", "JavaScript Enthusiast"];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    let isDeleting = false;

    function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];

        if (isDeleting) {
            letter = currentText.slice(0, --index);
        } else {
            letter = currentText.slice(0, ++index);
        }

        document.querySelector('.hero--section--title span').textContent = letter;

        let typeSpeed = 65;
        if (isDeleting) {
            typeSpeed /= 3; // Speed up when deleting
        }

        if (!isDeleting && letter.length === currentText.length) {
            setTimeout(() => {
                isDeleting = true;
                type();
            }, 1000);
        } else if (isDeleting && letter.length === 0) {
            isDeleting = false;
            count++;
            setTimeout(type, 500);
        } else {
            setTimeout(type, typeSpeed);
        }
    }

    function observeElements(selector, options) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, options);

        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            observer.observe(element);
        });
    }

    function updateFooterYear() {
        const currentYear = new Date().getFullYear();
        document.getElementById('year').textContent = currentYear;
    }

    function handleScroll() {
        const backToTop = document.getElementById('back-to-top');
        if (window.scrollY > 200) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    }

    // Initialize typing effect
    type();

    // Observe elements for fade-in effect
    observeElements('.project-even-fade, .project-odd-fade', { threshold: 0.1 });
    observeElements('.fade-in-section', { threshold: 0.1 });
    observeElements('.skill-category, .skill-item', { threshold: 0.1 }); // Added for skills section

    // Update footer year
    updateFooterYear();

    // Handle scroll event for back-to-top button
    window.addEventListener('scroll', handleScroll, false);

    // Handle resize
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        window.innerWidth = width;
        window.innerHeight = height;
        if (window.innerWidth > 768) {
            document.querySelector('.nav--menu').style.display = 'block';
        } else {
            document.querySelector('.nav--menu').style.display = 'none';
        }
    });

});