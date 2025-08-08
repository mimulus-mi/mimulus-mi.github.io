// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation Elements
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sections for intersection observer
    const sections = document.querySelectorAll('.section, .hero');
    const revealElements = document.querySelectorAll('.reveal');
    
    // Mobile Navigation Toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('open');
            hamburger.classList.toggle('open');
        });
    }
    
    // Smooth Scroll for Navigation Links - Fixed Implementation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu first
            nav.classList.remove('open');
            hamburger.classList.remove('open');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active Navigation Link Highlighting - Improved
    function updateActiveNavLink() {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 10;
            const sectionBottom = sectionTop + section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay for service cards stagger effect
                if (entry.target.classList.contains('service-card')) {
                    const cards = document.querySelectorAll('.service-card');
                    const cardIndex = Array.from(cards).indexOf(entry.target);
                    
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, cardIndex * 150);
                } else {
                    entry.target.classList.add('active');
                }
                
                // Unobserve after revealing to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    revealElements.forEach(element => {
        observer.observe(element);
    });
    
    // Throttled scroll handler for better performance
    let ticking = false;
    
    function handleScroll() {
        updateActiveNavLink();
        
        // Add header background on scroll
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        ticking = false;
    }
    
    // Optimized scroll event listener
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav && hamburger && !nav.contains(e.target) && !hamburger.contains(e.target)) {
            nav.classList.remove('open');
            hamburger.classList.remove('open');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.classList.remove('open');
            hamburger.classList.remove('open');
        }
    });
    
    // Enhanced Service Card Interactions and Link Handling
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Ensure links work properly
        card.addEventListener('click', function(e) {
            // Let the default anchor behavior handle the navigation
            const href = this.getAttribute('href');
            if (href && href.startsWith('http')) {
                // This will open in new tab due to target="_blank" in HTML
                return true;
            }
        });
        
        // Visual hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Contact Link Interactions
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Scroll to Top Functionality
    function createScrollToTopButton() {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollButton.className = 'scroll-to-top';
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            font-size: 18px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        `;
        
        document.body.appendChild(scrollButton);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollButton.style.opacity = '1';
                scrollButton.style.visibility = 'visible';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top on click
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Initialize scroll to top button
    createScrollToTopButton();
    
    // Preload images for better performance
    function preloadImages() {
        const imageUrls = [
            'https://coconala.com/contents_market/pictures/cme2b6nq107309y0hhc9ktswz',
            'https://coconala.com/contents_market/pictures/cme2b2obp07dcf70g9ibowc1f',
            'https://coconala.com/contents_market/pictures/cme2b0ky507cuf70ge55waq2s',
            'https://coconala.com/contents_market/pictures/cme2ay8rv07cgf70gzdt7uam4',
            'https://coconala.com/contents_market/pictures/cme2auwi40e9qf10hwqt2ca8m',
            'https://coconala.com/contents_market/pictures/cme29d5x50779f70g7hv4pfl6',
            'https://coconala.com/contents_market/pictures/cmdzoko6b071jf10hdw1ww37z'
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    
    // Initialize image preloading
    preloadImages();
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            nav.classList.remove('open');
            hamburger.classList.remove('open');
        }
        
        // Enter or Space on hamburger button
        if ((e.key === 'Enter' || e.key === ' ') && e.target === hamburger) {
            e.preventDefault();
            hamburger.click();
        }
    });
    
    // Add focus styles for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Initial setup
    updateActiveNavLink();
    
    // Debug logging
    console.log('mimulus mi portfolio initialized successfully!');
    console.log('Navigation links found:', navLinks.length);
    console.log('Service cards found:', serviceCards.length);
    console.log('Reveal elements found:', revealElements.length);
});

// Additional CSS for better functionality (injected via JS)
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px !important;
    }
    
    .scroll-to-top:hover {
        transform: scale(1.1);
        background: var(--text-color);
    }
    
    .service-card:focus,
    .contact-link:focus {
        transform: translateY(-5px);
        box-shadow: var(--shadow-medium);
    }
    
    /* Smooth scrolling fallback */
    html {
        scroll-behavior: smooth;
    }
    
    /* Ensure service cards are clickable */
    .service-card {
        cursor: pointer;
    }
    
    .service-card:active {
        transform: translateY(-2px) scale(0.98);
    }
`;
document.head.appendChild(style);