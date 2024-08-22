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
            // Deleting characters
            console.log('Deleting characters');
            letter = currentText.slice(0, --index);
        } else {
            // Typing characters
            letter = currentText.slice(0, ++index);
        }

        document.querySelector('.hero--section--title span').textContent = letter;

        let typeSpeed = 65;
        if (isDeleting) {
            typeSpeed /= 3; // Speed up when deleting
        }

        if (!isDeleting && letter.length === currentText.length) {
            // Pause before starting to delete
            console.log('Pausing before starting to delete');
            setTimeout(() => {
                isDeleting = true;
                type();
            }, 1000);
        } else if (isDeleting && letter.length === 0) {
            // Pause before typing the next text
            console.log('Pausing before typing the next text');
            isDeleting = false;
            count++;
            setTimeout(type, 500);
        } else {
            setTimeout(type, typeSpeed);
        }
    }

    const sections = document.querySelectorAll('.fade-in-section');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            observer.observe(section);
        });

    type();

    // Function to get the current year and update the footer
    function updateFooterYear() {
        const currentYear = new Date().getFullYear();
        document.getElementById('year').textContent = currentYear;
    }

    // Call the function to update the year
    updateFooterYear();

    window.addEventListener('scroll', function() {
        const backToTop = document.getElementById('back-to-top');
        if (window.scrollY > 200) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    }, false);


});