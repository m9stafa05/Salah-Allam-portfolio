window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  const scrollPosition = window.scrollY;

  if (scrollPosition > 100) {
    header.classList.add('fixed-header');
  } else {
    header.classList.remove('fixed-header');
  }
});

document.addEventListener('DOMContentLoaded', function () {
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
    if (touchendX < touchstartX - 50) {
      navMenu.classList.remove('active');
      document.getElementById('mobile-menu-toggle').classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  }

  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.classList.contains('logo-img')) {
      img.classList.add('responsive-img');
    }
  });

  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.classList.add('mobile-friendly-link');
  });

  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.classList.add('back-to-top');
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', toggleBackToTopButton);

  function toggleBackToTopButton() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

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

const inputs = document.querySelectorAll('input, textarea');
if (inputs.length) {
  inputs.forEach(input => {
    if (input.tagName.toLowerCase() === 'textarea') {
      input.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
      });
    }

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

window.addEventListener('orientationchange', function () {
  setTimeout(() => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      adjustHeroHeight();
    }

    const navMenu = document.getElementById('nav-menu');
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      document.getElementById('mobile-menu-toggle').classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  }, 200);
});

function adjustHeroHeight() {
  const heroSection = document.querySelector('.hero');
  const header = document.querySelector('header');

  if (heroSection && header) {
    if (window.innerWidth < 768) {
      heroSection.style.height = (window.innerHeight - header.offsetHeight) * 0.7 + 'px';
    } else if (window.innerWidth < 992) {
      heroSection.style.height = (window.innerHeight - header.offsetHeight) * 0.8 + 'px';
    } else {
      heroSection.style.height = '600px';
    }
  }
}

document.addEventListener('DOMContentLoaded', adjustHeroHeight);
window.addEventListener('resize', adjustHeroHeight);