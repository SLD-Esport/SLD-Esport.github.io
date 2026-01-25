// Mobile Menu Toggle
const hamburgerMenu = document.getElementById('hamburgerMenu');
const navLinks = document.getElementById('navLinks');

hamburgerMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    hamburgerMenu.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            hamburgerMenu.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        const isClickInsideMenu = navLinks.contains(e.target);
        const isClickOnHamburger = hamburgerMenu.contains(e.target);
        const isClickOnLogo = document.querySelector('.logo').contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && !isClickOnLogo && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburgerMenu.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Squad filtering functionality
const roleButtons = document.querySelectorAll('.role-btn');
const playerCards = document.querySelectorAll('.player-card');

roleButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        roleButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const role = button.getAttribute('data-role');
        
        // Show/hide player cards based on role
        playerCards.forEach(card => {
            if(role === 'all' || card.getAttribute('data-role') === role) {
                card.style.display = 'block';
                // Add fade-in animation
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if(window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(5, 9, 22, 0.98)';
    } else {
        nav.style.backgroundColor = 'rgba(5, 9, 22, 0.95)';
    }
});

// Animate stats counter
const statNumbers = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const statNumber = entry.target;
            const finalValue = parseInt(statNumber.textContent);
            let currentValue = 0;
            const increment = finalValue / 50;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if(currentValue >= finalValue) {
                    statNumber.textContent = finalValue + (statNumber.textContent.includes('+') ? '+' : '');
                    clearInterval(timer);
                } else {
                    statNumber.textContent = Math.floor(currentValue) + (statNumber.textContent.includes('+') ? '+' : '');
                }
            }, 30);
            
            observer.unobserve(statNumber);
        }
    });
}, observerOptions);

statNumbers.forEach(stat => observer.observe(stat));

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburgerMenu.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Add active class to current section in navbar
const sections = document.querySelectorAll('section');
const navLinksArray = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if(scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active-link');
        if(link.getAttribute('href').substring(1) === current) {
            link.classList.add('active-link');
        }
    });
});

// Add CSS for active link
const activeLinkStyle = document.createElement('style');
activeLinkStyle.textContent = `
    .active-link {
        color: var(--secondary) !important;
    }
    
    .active-link::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeLinkStyle);

// Image error handling
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        // Jika gambar gagal dimuat, ganti dengan placeholder
        if (this.src.includes('sld_logo.png')) {
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45"><rect width="45" height="45" fill="%2300FF88" rx="8"/><text x="50%" y="50%" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dy=".3em">SLD</text></svg>';
        }
    });
});

// Preload logo for better performance
window.addEventListener('load', function() {
    const logo = document.querySelector('.logo-img img');
    if (logo) {
        // Force image load
        const img = new Image();
        img.src = logo.src;
    }
});