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

    function handleToggleClick() {
        const is3D = confirm("Switch to 3D mode?");
        if (is3D) {
            window.location.href = 'https://scrolling-animation-nine.vercel.app'; // Redirect to the sample 3D page
        }
    }

    // Initialize typing effect
    type();

    // Observe elements for fade-in effect
    observeElements('.project-even-fade, .project-odd-fade', { threshold: 0.1 });
    observeElements('.fade-in-section', { threshold: 0.1 });

    // Update footer year
    updateFooterYear();

    // Handle scroll event for back-to-top button
    window.addEventListener('scroll', handleScroll, false);

    // Handle toggle button click
    document.getElementById('toggle-2d-3d').addEventListener('click', handleToggleClick);
});