// Services Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Category filtering
    const categoryTabs = document.querySelectorAll('.category-tab');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (categoryTabs.length && serviceCards.length) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                categoryTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                const selectedCategory = this.getAttribute('data-category');
                
                // Show/hide services based on category
                serviceCards.forEach(card => {
                    if (selectedCategory === 'all') {
                        card.classList.remove('hidden');
                    } else {
                        const cardCategory = card.getAttribute('data-category');
                        if (cardCategory === selectedCategory) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    }
                });
                
                // Add animation for smooth transition
                serviceCards.forEach(card => {
                    if (!card.classList.contains('hidden')) {
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 50);
                    }
                });
            });
        });
    }
    
    // Service card hover effect
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon i');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon i');
            icon.style.transform = 'scale(1)';
        });
    });
    
    // Mobile menu toggle for the services page
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});
