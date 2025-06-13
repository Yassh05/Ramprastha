// Main JavaScript file for Ramprastha website

class RamprasthaWebsite {
    constructor() {
        this.init();
        this.bindEvents();
        this.initAnimations();
    }

    init() {
        this.navbar = document.getElementById('navbar');
        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.heroSlider = document.getElementById('heroSlider');
        this.searchInput = document.getElementById('searchInput');
        this.propertyTypeSelect = document.getElementById('propertyTypeSelect');
        this.contactForm = document.getElementById('contactForm');
        
        this.currentSlide = 0;
        this.slideInterval = null;
        this.isMenuOpen = false;
        
        this.initHeroSlider();
        this.initScrollEffects();
    }

    bindEvents() {
        // Mobile menu toggle
        this.mobileMenuToggle?.addEventListener('click', () => this.toggleMobileMenu());
        
        // Navigation links
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Search functionality
        this.searchInput?.addEventListener('input', () => this.handleSearch());
        this.propertyTypeSelect?.addEventListener('change', () => this.handleSearch());
        
        // Contact form
        this.contactForm?.addEventListener('submit', (e) => this.handleContactForm(e));
        
        // Window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Theme change listener
        document.addEventListener('themechange', (e) => this.handleThemeChange(e));
    }

    initHeroSlider() {
        const slides = document.querySelectorAll('.hero-slide');
        if (slides.length <= 1) return;

        this.slideInterval = setInterval(() => {
            slides[this.currentSlide].classList.remove('active');
            this.currentSlide = (this.currentSlide + 1) % slides.length;
            slides[this.currentSlide].classList.add('active');
        }, 5000);
    }

    initScrollEffects() {
        // Navbar scroll effect
        this.handleScroll();
        
        // Intersection Observer for animations
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('.fade-in-on-scroll, .slide-in-left-on-scroll, .slide-in-right-on-scroll, .scale-in-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.mobileMenu?.classList.toggle('active', this.isMenuOpen);
        this.mobileMenuToggle?.classList.toggle('active', this.isMenuOpen);
        
        // Animate hamburger menu
        const spans = this.mobileMenuToggle?.querySelectorAll('span');
        spans?.forEach((span, index) => {
            if (this.isMenuOpen) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(6px, 6px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                span.style.transform = '';
                span.style.opacity = '';
            }
        });

        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    }

    handleNavClick(e) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        
        if (href?.startsWith('#')) {
            const targetId = href.substring(1);
            this.scrollToSection(targetId);
            
            // Close mobile menu if open
            if (this.isMenuOpen) {
                this.toggleMobileMenu();
            }
        }
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const navHeight = this.navbar?.offsetHeight || 0;
            const elementPosition = element.offsetTop - navHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        // Navbar background effect
        if (scrollY > 50) {
            this.navbar?.classList.add('scrolled');
        } else {
            this.navbar?.classList.remove('scrolled');
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const parallaxElements = hero.querySelectorAll('.parallax-element');
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }
        
        // Update active navigation link
        this.updateActiveNavLink(scrollY);
    }

    updateActiveNavLink(scrollY) {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        const navHeight = this.navbar?.offsetHeight || 0;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    handleSearch() {
        const searchTerm = this.searchInput?.value.toLowerCase() || '';
        const selectedType = this.propertyTypeSelect?.value || 'All';
        
        // Filter properties (this will be handled by properties.js)
        if (window.propertiesManager) {
            window.propertiesManager.filterProperties(searchTerm, selectedType);
        }
    }

    handleContactForm(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!this.validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<div class="loading-spinner"></div> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showNotification('Message sent successfully!', 'success');
            this.contactForm.reset();
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    validateForm(data) {
        const errors = [];
        
        if (!data.name?.trim()) errors.push('Name is required');
        if (!data.email?.trim()) errors.push('Email is required');
        if (!data.phone?.trim()) errors.push('Phone is required');
        if (!data.interest?.trim()) errors.push('Property interest is required');
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.email && !emailRegex.test(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        // Phone validation
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (data.phone && !phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
            errors.push('Please enter a valid phone number');
        }
        
        if (errors.length > 0) {
            this.showNotification(errors.join('\n'), 'error');
            return false;
        }
        
        return true;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Get theme-appropriate colors
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const colors = {
            success: isDark ? '#34d399' : '#10b981',
            error: isDark ? '#f87171' : '#ef4444',
            info: isDark ? '#3b82f6' : '#2563eb'
        };
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            background: ${colors[type]};
            color: white;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);
        
        // Close button handler
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 991 && this.isMenuOpen) {
            this.toggleMobileMenu();
        }
        
        // Recalculate scroll positions
        this.handleScroll();
    }

    handleKeydown(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && this.isMenuOpen) {
            this.toggleMobileMenu();
        }
        
        // Navigation with arrow keys
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const sections = Array.from(document.querySelectorAll('section[id]'));
            const currentIndex = sections.findIndex(section => {
                const rect = section.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom > 100;
            });
            
            if (currentIndex !== -1) {
                let nextIndex;
                if (e.key === 'ArrowUp') {
                    nextIndex = Math.max(0, currentIndex - 1);
                } else {
                    nextIndex = Math.min(sections.length - 1, currentIndex + 1);
                }
                
                if (nextIndex !== currentIndex) {
                    e.preventDefault();
                    this.scrollToSection(sections[nextIndex].id);
                }
            }
        }
    }

    handleThemeChange(e) {
        const { theme } = e.detail;
        
        // Update any theme-dependent elements
        this.updateThemeElements(theme);
        
        // Restart hero slider with theme-appropriate timing
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.initHeroSlider();
        }
    }

    updateThemeElements(theme) {
        // Update loading spinner color in notifications
        const loadingSpinners = document.querySelectorAll('.loading-spinner');
        loadingSpinners.forEach(spinner => {
            spinner.style.borderTopColor = theme === 'dark' ? '#f9fafb' : '#fff';
        });
        
        // Update any other theme-dependent elements
        const themeElements = document.querySelectorAll('[data-theme-element]');
        themeElements.forEach(element => {
            element.classList.toggle('dark-theme', theme === 'dark');
        });
    }

    initAnimations() {
        // Add animation classes to elements
        document.querySelectorAll('.property-card').forEach((el, index) => {
            el.classList.add('fade-in-on-scroll');
            el.style.animationDelay = `${index * 100}ms`;
        });
        
        document.querySelectorAll('.service-card').forEach((el, index) => {
            el.classList.add('scale-in-on-scroll');
            el.style.animationDelay = `${index * 150}ms`;
        });
        
        document.querySelector('.about-content')?.classList.add('slide-in-left-on-scroll');
        document.querySelector('.about-image')?.classList.add('slide-in-right-on-scroll');
        
        // Stats counter animation
        this.initStatsCounter();
    }

    initStatsCounter() {
        const statsNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        statsNumbers.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const suffix = element.textContent.replace(/[\d,]/g, '');
        let current = 0;
        const increment = target / 100;
        const duration = 2000;
        const stepTime = duration / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }, stepTime);
    }
}

// Utility functions
window.scrollToSection = function(sectionId) {
    if (window.ramprasthaWebsite) {
        window.ramprasthaWebsite.scrollToSection(sectionId);
    }
};

window.filterProperties = function() {
    if (window.propertiesManager) {
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const selectedType = document.getElementById('propertyTypeSelect')?.value || 'All';
        window.propertiesManager.filterProperties(searchTerm, selectedType);
    }
};

// Initialize website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ramprasthaWebsite = new RamprasthaWebsite();
});

// Smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = function(element, to, duration) {
        const start = element.scrollTop;
        const change = to - start;
        const startDate = +new Date();
        
        const easeInOutQuad = function(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
        
        const animateScroll = function() {
            const currentDate = +new Date();
            const currentTime = currentDate - startDate;
            element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            } else {
                element.scrollTop = to;
            }
        };
        
        animateScroll();
    };
    
    // Override scrollTo for smooth scrolling
    window.scrollTo = function(options) {
        if (typeof options === 'object' && options.behavior === 'smooth') {
            smoothScrollPolyfill(document.documentElement, options.top || 0, 500);
        } else {
            HTMLElement.prototype.scrollTo.apply(document.documentElement, arguments);
        }
    };
}