const menuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');
const body = document.body;

// Scroll animation observer
const initScrollAnimations = () => {
    // Select all elements you want to animate
    const scrollElements = document.querySelectorAll(
        '.hero-text, .hero-features, .about-us, .about-details, ' +
        '.services, .service-item, .stats-section, .stat-item, ' +
        '.articles, .article-item, .cta-section, .faq-appointment, ' +
        '.testimonials, .why-choose-us, .feature-item, .law-firm-section'
    );

    // Add scroll-trigger class to all elements
    scrollElements.forEach((el, index) => {
        el.classList.add('scroll-trigger');
        // Add delay classes to create staggered effect
        if (index % 4 === 1) el.classList.add('delay-1');
        if (index % 4 === 2) el.classList.add('delay-2');
        if (index % 4 === 3) el.classList.add('delay-3');
    });

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust trigger point
    });

    // Observe all scroll-trigger elements
    scrollElements.forEach(el => {
        observer.observe(el);
    });
};

// Service Scroller function
function initServiceScroller() {
    const serviceRow = document.querySelector('.service-row');
    const grid = serviceRow.querySelector('.service-grid');

    // Duplicate items for seamless looping
    const items = grid.querySelectorAll('.service-item');
    items.forEach(item => {
        const clone = item.cloneNode(true);
        grid.appendChild(clone);
    });

    // Add event listener to handle looping
    grid.addEventListener('animationiteration', () => {
        // Move first item to the end
        const firstItem = grid.querySelector('.service-item:first-child');
        grid.appendChild(firstItem);

        // Reset transform
        grid.style.transform = 'translateX(0)';
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initServiceScroller();
});

// Add scroll progress animation
window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
}, false);

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            e.target !== menuToggle) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isVisible = answer.style.maxHeight;

        document.querySelectorAll('.faq-answer').forEach(item => {
            item.style.maxHeight = null;
            item.style.display = 'none';
        });

        document.querySelectorAll('.faq-question').forEach(item => {
            item.classList.remove('active');
        });

        if (!isVisible) {
            answer.style.display = 'block';
            answer.style.maxHeight = answer.scrollHeight + 'px';
            question.classList.add('active');
        }
    });
});

const initLanguageSwitcher = () => {
    const languageSwitcherButton = document.getElementById('language-switcher-button');
    if (!languageSwitcherButton) return;

    const languages = {
        'English': { text: 'العربية', lang: 'ar', dir: 'rtl' },
        'العربية': { text: 'English', lang: 'en', dir: 'ltr' }
    };

    languageSwitcherButton.addEventListener('click', () => {
        const currentText = languageSwitcherButton.textContent;
        const nextLang = languages[currentText];

        if (!nextLang) return;

        languageSwitcherButton.textContent = nextLang.text;
        document.documentElement.lang = nextLang.lang;
        document.documentElement.dir = nextLang.dir;
        document.body.classList.toggle('rtl', nextLang.dir === 'rtl');
    });
};

document.addEventListener('DOMContentLoaded', initLanguageSwitcher);

const initTestimonialSlider = () => {
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const slides = document.querySelectorAll('.testimonial-slide');

    if (dots.length && slides.length) {
        const handleDotClick = (dot) => {
            const slideIndex = dot.getAttribute('data-slide');
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            slides[slideIndex].classList.add('active');
            dot.classList.add('active');
        };

        dots.forEach(dot => dot.addEventListener('click', () => handleDotClick(dot)));

        let currentSlide = 0;
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }, 5000);
    }
};

document.addEventListener('DOMContentLoaded', initTestimonialSlider);

// Form Validation
const appointmentForm = document.getElementById('appointment-form');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;
        const inputs = this.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        if (isValid) {
            // Show success message
            showAlert();
            this.reset();
        } else {
            showAlert();
        }
    });
}

// Add animation to elements when they come into view

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.law-firm-stat h2');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const frameRate = 30;
        const totalFrames = duration / (1000 / frameRate);
        let frame = 0;

        const counterStep = () => {
            frame++;
            const progress = frame / totalFrames;
            const current = Math.round(target * progress);
            counter.innerText = progress < 1 ? current : target;
            if (frame < totalFrames) {
                requestAnimationFrame(counterStep);
            }
        };
        counterStep();
    });
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

window.addEventListener('scroll', function onScroll() {
    const section = document.getElementById('law-firm-section');
    if (section && isInViewport(section)) {
        animateCounters();
        window.removeEventListener('scroll', onScroll);
    }
});

// Article Category Filtering
const initArticleFiltering = () => {
    const categoryLinks = document.querySelectorAll('.article-category');
    const articleItems = document.querySelectorAll('.article-item');
    const clearButton = document.querySelector('.clear-filters');

    if (categoryLinks.length && articleItems.length) {
        const handleCategoryClick = (e) => {
            e.preventDefault();
            const category = e.currentTarget.getAttribute('data-category');

            // Update article visibility
            articleItems.forEach(item => {
                item.style.display = category === 'all' || item.classList.contains(category) ? 'block' : 'none';
            });

            // Update active state
            categoryLinks.forEach(link => link.classList.remove('active'));
            e.currentTarget.classList.add('active');
        };
        categoryLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                // Remove active class from all links
                categoryLinks.forEach(item => {
                    item.classList.remove('active');
                });

                // Add active class to clicked link
                this.classList.add('active');

                const selectedCategory = this.textContent;

                // Show/hide articles based on category
                articleItems.forEach(article => {
                    if (selectedCategory === 'الكل') {
                        article.style.display = 'block';
                    } else {
                        const articleCategory = article.getAttribute('data-category');
                        if (articleCategory === selectedCategory) {
                            article.style.display = 'block';
                        } else {
                            article.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // About Us Image Slider
    const aboutImages = document.querySelectorAll('.about-image-slider .about-us-image');

    if (aboutImages.length > 1) {
        let currentImageIndex = 0;

        // Function to rotate to the next image
        function rotateAboutImages() {
            // Remove active class from all images
            aboutImages.forEach(image => {
                image.classList.remove('active');
            });

            // Move to next image
            currentImageIndex = (currentImageIndex + 1) % aboutImages.length;

            // Add active class to new current image
            aboutImages[currentImageIndex].classList.add('active');
        }

        // Set initial active state
        aboutImages[0].classList.add('active');

        // Start rotation every 5 seconds
        setInterval(rotateAboutImages, 5000);
    }
};

// Add this to your existing JavaScript
function animateStatsCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateStatsCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Add this to your scroll event listener or where you handle scroll animations
window.addEventListener('scroll', function () {
    const statsSection = document.querySelector('.stats-section');
    if (isInViewport(statsSection)) {
        animateStatsCounters();
        // Remove the event listener after animation runs once
        window.removeEventListener('scroll', this);
    }
});