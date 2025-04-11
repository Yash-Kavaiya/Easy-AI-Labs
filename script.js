document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const body = document.body;
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu')) {
                createMobileMenu();
            }
            
            const mobileMenu = document.querySelector('.mobile-menu');
            const overlay = document.querySelector('.overlay');
            
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            body.style.overflow = 'hidden';
        });
    }
    
    // Create mobile menu function
    function createMobileMenu() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        body.appendChild(overlay);
        
        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        // Create close button
        const closeBtn = document.createElement('div');
        closeBtn.className = 'close-menu';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        mobileMenu.appendChild(closeBtn);
        
        // Clone navigation
        const nav = document.querySelector('nav ul').cloneNode(true);
        mobileMenu.appendChild(nav);
        
        body.appendChild(mobileMenu);
        
        // Close menu event
        closeBtn.addEventListener('click', closeMobileMenu);
        overlay.addEventListener('click', closeMobileMenu);
        
        // Close menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
    
    // Close mobile menu function
    function closeMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.overlay');
        
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }
    
    // Scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Animate on scroll elements
    const animateElements = document.querySelectorAll('.service-card, .feature, .case-study-card');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Active nav link based on scroll position
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});