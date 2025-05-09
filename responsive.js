// Additional responsive functionality for mobile devices

// Handle fixed header on scroll
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  const scrollPosition = window.scrollY;

  if (scrollPosition > 100) {
    header.classList.add('fixed-header');
  } else {
    header.classList.remove('fixed-header');
  }
});

// Improve touch events for mobile navigation
document.addEventListener('DOMContentLoaded', function () {
  // Add swipe functionality to close mobile menu
  const navMenu = document.getElementById('nav-menu');

  let touchstartX = 0;
  let touchendX = 0;

  if (navMenu) {
    navMenu.addEventListener('touchstart', function (e) {
      touchstartX = e.changedTouches[0].screenX;
    });

    navMenu.addEventListener('touchend', function (e) {
      touchendX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    // If swiped right to left (for RTL layout)
    if (touchendX < touchstartX - 50) {
      navMenu.classList.remove('active');
      document.getElementById('mobile-menu-toggle').classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  }

  // Make images responsive
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.classList.contains('logo-img')) {
      img.classList.add('responsive-img');
    }
  });

  // Improve tap target sizes for mobile
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.classList.add('mobile-friendly-link');
  });

  // Add back-to-top button for mobile
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.classList.add('back-to-top');
  document.body.appendChild(backToTopBtn);

  // Show/hide back-to-top button based on scroll position
  window.addEventListener('scroll', toggleBackToTopButton);

  function toggleBackToTopButton() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }

  // Scroll to top when button is clicked
  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Add scroll padding for fixed header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      if (!targetId) return;

      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: targetPosition - headerHeight - 20,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Improve form experience on mobile
const inputs = document.querySelectorAll('input, textarea');
if (inputs.length) {
  inputs.forEach(input => {
    // Auto resize text area
    if (input.tagName.toLowerCase() === 'textarea') {
      input.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
      });
    }

    // Clear form field on focus for better mobile experience
    input.addEventListener('focus', function () {
      if (window.innerWidth < 768) {
        this.setAttribute('data-placeholder', this.placeholder);
        this.placeholder = '';
      }
    });

    input.addEventListener('blur', function () {
      if (window.innerWidth < 768 && this.getAttribute('data-placeholder')) {
        this.placeholder = this.getAttribute('data-placeholder');
      }
    });
  });
}

// Handle orientation change
window.addEventListener('orientationchange', function () {
  // Allow time for orientation change to complete
  setTimeout(() => {
    // Readjust any dynamic sizing
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      adjustHeroHeight();
    }

    // Reset mobile menu if open
    const navMenu = document.getElementById('nav-menu');
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      document.getElementById('mobile-menu-toggle').classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  }, 200);
});

// Function to adjust hero height based on screen size
function adjustHeroHeight() {
  const heroSection = document.querySelector('.hero');
  const header = document.querySelector('header');

  if (heroSection && header) {
    if (window.innerWidth < 768) {
      // For mobile
      heroSection.style.height = (window.innerHeight - header.offsetHeight) * 0.7 + 'px';
    } else if (window.innerWidth < 992) {
      // For tablets
      heroSection.style.height = (window.innerHeight - header.offsetHeight) * 0.8 + 'px';
    } else {
      // Reset for desktop
      heroSection.style.height = '600px';
    }
  }
}

// Run adjustment on load
document.addEventListener('DOMContentLoaded', adjustHeroHeight);
window.addEventListener('resize', adjustHeroHeight);