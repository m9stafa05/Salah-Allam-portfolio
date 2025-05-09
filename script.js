// Mobile Navigation Toggle
const menuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');
const body = document.body;

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            e.target !== menuToggle) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Close menu when clicking on menu links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // Handle window resize - close mobile menu when switching to desktop view
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isVisible = answer.style.maxHeight;

        // Close all other FAQ items
        document.querySelectorAll('.faq-answer').forEach(item => {
            item.style.maxHeight = null;
            item.style.display = 'none';
        });

        document.querySelectorAll('.faq-question').forEach(item => {
            item.classList.remove('active');
        });

        // Open the clicked item
        if (!isVisible) {
            answer.style.display = 'block';
            answer.style.maxHeight = answer.scrollHeight + 'px';
            question.classList.add('active');
        }
    });
});

// Language Switcher
const languageSwitcherButton = document.getElementById('language-switcher-button');

if (languageSwitcherButton) {
    languageSwitcherButton.addEventListener('click', () => {
        let language = languageSwitcherButton.textContent;
        if (language === 'English') {
            languageSwitcherButton.textContent = 'العربية';
            document.body.classList.remove('rtl');
            document.documentElement.lang = 'en';
            document.documentElement.dir = 'ltr';
        } else if (language === 'العربية') {
            languageSwitcherButton.textContent = 'Русский';
            document.body.classList.remove('rtl');
            document.documentElement.lang = 'ru';
            document.documentElement.dir = 'ltr';
        } else {
            languageSwitcherButton.textContent = 'English';
            document.body.classList.add('rtl');
            document.documentElement.lang = 'ar';
            document.documentElement.dir = 'rtl';
        }
    });
}

// Testimonial Slider
document.addEventListener('DOMContentLoaded', function () {
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const slides = document.querySelectorAll('.testimonial-slide');

    if (dots.length && slides.length) {
        dots.forEach(dot => {
            dot.addEventListener('click', function () {
                const slideIndex = this.getAttribute('data-slide');

                // Hide all slides
                slides.forEach(slide => {
                    slide.classList.remove('active');
                });

                // Remove active class from all dots
                dots.forEach(dot => {
                    dot.classList.remove('active');
                });

                // Show the selected slide and activate the dot
                slides[slideIndex].classList.add('active');
                this.classList.add('active');
            });
        });

        // Auto-rotate testimonials every 5 seconds
        let currentSlide = 0;
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;

            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });

            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });

            // Show the next slide and activate the dot
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }, 5000);
    }
});

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
            alert('تم إرسال طلب الاستشارة بنجاح. سنتواصل معك قريبًا.');
            this.reset();
        } else {
            alert('يرجى ملء جميع الحقول المطلوبة.');
        }
    });
}

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-item, .lawyer-item, .about-us h2, .services h2, .testimonials h2');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.classList.add('fade-in');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Article Category Filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryLinks = document.querySelectorAll('.article-category');
    const articleItems = document.querySelectorAll('.article-item');
    
    if (categoryLinks.length && articleItems.length) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
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
});