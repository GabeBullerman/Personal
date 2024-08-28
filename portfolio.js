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
// =============================================================== Weather API functions ===============================================================

function getWeather() {
    const apiKEY = 'ccc77da2843f090af56ca0d76395f929';
    const city = document.getElementById('city').value;

    if (!city) {
        displayMessage('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKEY}`;

    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((data) => {
            displayWeather(data);
        })
        .catch((error) => {
            console.log('Error:', error);
            displayMessage('An error occurred. Please try again');
        });

    fetch(forecastUrl)
        .then((response) => response.json())
        .then((data) => {
            displayHourlyForecast(data);
        })
        .catch((error) => {
            console.log('Error:', error);
            displayMessage('An error occurred. Please try again');
        });
}

function getWeatherByLocation(lat, lon) {
    const apiKEY = 'ccc77da2843f090af56ca0d76395f929';

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKEY}`;

    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((data) => {
            displayWeather(data);
        })
        .catch((error) => {
            console.log('Error:', error);
            displayMessage('An error occurred. Please try again');
        });

    fetch(forecastUrl)
        .then((response) => response.json())
        .then((data) => {
            displayHourlyForecast(data);
        })
        .catch((error) => {
            console.log('Error:', error);
            displayMessage('An error occurred. Please try again');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp');
    const weatherDivInfo = document.getElementById('info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecast = document.getElementById('hourly');

    // Clear Previous Data
    weatherDivInfo.innerHTML = '';
    hourlyForecast.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        displayMessage(data.message);
    } else {
        const cityName = data.name;
        const temperature = Math.round((data.main.temp - 273.15) * 9/5 + 32);
        const description = data.weather[0].description;
        const timeZoneOffset = data.timezone; // Timezone offset in seconds
        const timeZoneName = moment.tz.zone(moment.tz.guess()).abbr(timeZoneOffset); // Get timezone name from offset
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°F</p>`;
        const weatherHTML = `<p>${cityName}</p> <p>${description}</p>`;
        const timeZoneHTML = `<p class="time-zone">Time Zone: ${timeZoneName}</p>`;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherDivInfo.innerHTML = weatherHTML + timeZoneHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecast = document.getElementById('hourly');
    const next24Hours = hourlyData.list.slice(0, 8);

    hourlyForecast.innerHTML = '';

    next24Hours.forEach((hour) => {
        const date = moment.unix(hour.dt).utcOffset(hourlyData.city.timezone / 3600).format('h:mm A');
        const temperature = Math.round((hour.main.temp - 273.15) * 9/5 + 32);
        const iconCode = hour.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyHTML = `
            <div class="hourly-item">
                <span>${date}</span>
                <img src="${iconUrl}" alt="This Hour's Weather Icon">
                <span>${temperature}°F</span>
            </div>`;
        hourlyForecast.innerHTML += hourlyHTML;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}

function detectLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherByLocation(lat, lon);
            },
            (error) => {
                console.log('Error:', error);
                displayMessage('Location access not permitted. Please check browser settings or enter the city manually.');
            }
        );
    } else {
        displayMessage('Geolocation is not supported by this browser. Please enter the city manually.');
    }
}

function displayMessage(message) {
    const weatherDivInfo = document.getElementById('info');
    weatherDivInfo.innerHTML = `<p>${message}</p>`;
}

// Call detectLocation on page load
detectLocation();