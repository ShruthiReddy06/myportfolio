// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      // Close mobile menu if open
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
});

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Active navigation link on scroll
const sections = document.querySelectorAll('.section, .hero-section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Intersection Observer for section animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Animate skill bars when skills section is visible
      if (entry.target.classList.contains('skills-section')) {
        animateSkillBars();
      }
    }
  });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
  observer.observe(section);
});

// Animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    setTimeout(() => {
      bar.style.width = `${progress}%`;
    }, 200);
  });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector('.hero-background');
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add hover effects to project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.borderColor = 'var(--color-primary)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.borderColor = 'var(--color-card-border)';
  });
});

// Initialize animations on page load
window.addEventListener('load', () => {
  // Add initial animation class
  document.body.classList.add('loaded');
  
  // Check if any section is already in viewport
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      section.classList.add('visible');
      
      if (section.classList.contains('skills-section')) {
        animateSkillBars();
      }
    }
  });
});

// Add typing effect to hero tagline (optional enhancement)
const heroTagline = document.querySelector('.hero-tagline');
if (heroTagline) {
  const text = heroTagline.textContent;
  heroTagline.textContent = '';
  let i = 0;
  
  function typeWriter() {
    if (i < text.length) {
      heroTagline.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 30);
    }
  }
  
  // Start typing effect after a short delay
  setTimeout(typeWriter, 1000);
}

// Smooth scroll to top on logo click
const logo = document.querySelector('.nav-logo');
if (logo) {
  logo.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  logo.style.cursor = 'pointer';
}

// Contact form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  
  try {
    const formData = new FormData(contactForm);
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    } else {
      alert('Oops! There was a problem sending your message. Please try again.');
    }
  } catch (error) {
    alert('Oops! There was a problem sending your message. Please try again.');
  } finally {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
});