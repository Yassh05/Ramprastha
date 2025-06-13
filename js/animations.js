
class AnimationController {
    constructor() {
        this.init();
        this.bindScrollAnimations();
        this.initParallaxEffects();
        this.setupCounterAnimations();
    }

    init() {
        this.addCustomAnimations();
        this.setupMouseEffects();
        this.initTypewriterEffect();
    }

    addCustomAnimations() {
        // Add dynamic CSS animations
        const style = document.createElement('style');
        style.textContent = `
            /* Enhanced Property Card Animations */
            .property-card {
                transform: translateY(20px);
                opacity: 0;
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .property-card.visible {
                transform: translateY(0);
                opacity: 1;
            }
            
            .property-card:hover {
                transform: translateY(-15px) scale(1.02);
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
            }
            
            .property-card:hover .property-image img {
                transform: scale(1.1);
            }
            
            /* Service Card Hover Effects */
            .service-card {
                position: relative;
                overflow: hidden;
                transform: translateY(20px);
                opacity: 0;
                transition: all 0.5s ease;
            }
            
            .service-card.visible {
                transform: translateY(0);
                opacity: 1;
            }
            
            .service-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.1), transparent);
                transition: left 0.6s ease;
            }
            
            .service-card:hover::before {
                left: 100%;
            }
            
            .service-card:hover {
                transform: translateY(-10px) scale(1.03);
                box-shadow: 0 20px 40px rgba(37, 99, 235, 0.2);
            }
            
            /* Navigation Link Animation */
            .nav-link {
                position: relative;
                overflow: hidden;
            }
            
            .nav-link::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                transition: left 0.5s ease;
            }
            
            .nav-link:hover::before {
                left: 100%;
            }
            
            /* Button Ripple Effect */
            .btn {
                position: relative;
                overflow: hidden;
            }
            
            .btn::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: translate(-50%, -50%);
                transition: width 0.6s, height 0.6s;
            }
            
            .btn:active::after {
                width: 300px;
                height: 300px;
            }
            
            /* Floating Animation */
            .float-animation {
                animation: float 6s ease-in-out infinite;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }
            
            /* Gradient Text Animation */
            .gradient-text {
                background: linear-gradient(-45deg, #2563eb, #3b82f6, #1d4ed8, #2563eb);
                background-size: 400% 400%;
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: gradientShift 4s ease infinite;
            }
            
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            /* Pulse Animation */
            .pulse-animation {
                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            
            /* Slide In Animations */
            .slide-in-left {
                transform: translateX(-100px);
                opacity: 0;
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .slide-in-right {
                transform: translateX(100px);
                opacity: 0;
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .slide-in-up {
                transform: translateY(100px);
                opacity: 0;
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .slide-in-left.visible,
            .slide-in-right.visible,
            .slide-in-up.visible {
                transform: translate(0);
                opacity: 1;
            }
            
            /* Scale Animation */
            .scale-in {
                transform: scale(0.8);
                opacity: 0;
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .scale-in.visible {
                transform: scale(1);
                opacity: 1;
            }
            
            /* Typewriter Effect */
            .typewriter {
                overflow: hidden;
                border-right: 3px solid #2563eb;
                white-space: nowrap;
                animation: typewriter 4s steps(40) 1s forwards, blink 0.75s step-end infinite;
            }
            
            @keyframes typewriter {
                from { width: 0; }
                to { width: 100%; }
            }
            
            @keyframes blink {
                from, to { border-color: transparent; }
                50% { border-color: #2563eb; }
            }
            
            /* Loading Skeleton */
            .skeleton {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
            }
            
            @keyframes loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
            
            /* Progress Bar Animation */
            .progress-bar {
                width: 0%;
                transition: width 2s ease-in-out;
            }
            
            .progress-bar.animate {
                width: 100%;
            }
            
            /* Bounce In Animation */
            .bounce-in {
                animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            @keyframes bounceIn {
                0% {
                    transform: scale(0.3);
                    opacity: 0;
                }
                50% {
                    transform: scale(1.1);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            
            /* Shake Animation */
            .shake {
                animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97);
            }
            
            @keyframes shake {
                0%, 100% { transform: translate3d(0, 0, 0); }
                10%, 30%, 50%, 70%, 90% { transform: translate3d(-10px, 0, 0); }
                20%, 40%, 60%, 80% { transform: translate3d(10px, 0, 0); }
            }
            
            /* Glow Effect */
            .glow-effect {
                transition: box-shadow 0.3s ease;
            }
            
            .glow-effect:hover {
                box-shadow: 0 0 20px rgba(37, 99, 235, 0.5), 0 0 40px rgba(37, 99, 235, 0.3);
            }
        `;
        document.head.appendChild(style);
    }

    bindScrollAnimations() {
        const observerOptions = {
            threshold: [0.1, 0.3, 0.5],
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const animationType = target.dataset.animation || 'fade-in';
                    const delay = target.dataset.delay || 0;
                    
                    setTimeout(() => {
                        this.triggerAnimation(target, animationType);
                    }, delay);
                }
            });
        }, observerOptions);

        // Observe elements with data-animation attribute
        document.querySelectorAll('[data-animation]').forEach(el => {
            observer.observe(el);
        });

        // Auto-detect animation classes
        const animationClasses = [
            'fade-in-on-scroll',
            'slide-in-left',
            'slide-in-right',
            'slide-in-up',
            'scale-in',
            'property-card',
            'service-card'
        ];

        animationClasses.forEach(className => {
            document.querySelectorAll(`.${className}`).forEach(el => {
                observer.observe(el);
            });
        });
    }

    triggerAnimation(element, animationType) {
        switch (animationType) {
            case 'fade-in':
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.8s ease';
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 50);
                break;
            
            case 'slide-in-left':
                element.classList.add('visible');
                break;
            
            case 'slide-in-right':
                element.classList.add('visible');
                break;
            
            case 'scale-in':
                element.classList.add('visible');
                break;
            
            case 'bounce-in':
                element.classList.add('bounce-in');
                break;
            
            default:
                element.classList.add('visible');
        }
    }

    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        const handleParallax = () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };

        // Throttle scroll events for better performance
        let ticking = false;
        const throttledParallax = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleParallax();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', throttledParallax);
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        
        const animateCounter = (element) => {
            const target = parseInt(element.dataset.counter);
            const duration = parseInt(element.dataset.duration) || 2000;
            const suffix = element.dataset.suffix || '';
            const prefix = element.dataset.prefix || '';
            
            let current = 0;
            const increment = target / (duration / 16); // 60fps
            
            const updateCounter = () => {
                current += increment;
                if (current >= target) {
                    current = target;
                    element.textContent = prefix + target.toLocaleString() + suffix;
                } else {
                    element.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
                    requestAnimationFrame(updateCounter);
                }
            };
            
            updateCounter();
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    setupMouseEffects() {
        // Magnetic effect for buttons
        const magneticElements = document.querySelectorAll('.btn, .property-card, .service-card');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.1;
                const moveY = y * 0.1;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        });

        // Cursor trail effect
        this.initCursorTrail();
    }

    initCursorTrail() {
        const trail = [];
        const trailLength = 10;
        
        // Create trail elements
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #2563eb;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: ${1 - i / trailLength};
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(dot);
            trail.push(dot);
        }
        
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const animateTrail = () => {
            let x = mouseX, y = mouseY;
            
            trail.forEach((dot, index) => {
                const nextDot = trail[index + 1] || trail[0];
                
                dot.style.left = x + 'px';
                dot.style.top = y + 'px';
                
                if (nextDot) {
                    x += (parseFloat(nextDot.style.left) - x) * 0.3;
                    y += (parseFloat(nextDot.style.top) - y) * 0.3;
                }
            });
            
            requestAnimationFrame(animateTrail);
        };
        
        animateTrail();
    }

    initTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.dataset.typewriter;
            const speed = parseInt(element.dataset.speed) || 100;
            
            element.textContent = '';
            element.classList.add('typewriter');
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                }
            };
            
            // Start typewriter when element comes into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    // Public methods for triggering animations
    fadeIn(element, duration = 800) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.opacity = '1';
        }, 50);
    }

    slideIn(element, direction = 'up', duration = 800) {
        const transforms = {
            up: 'translateY(50px)',
            down: 'translateY(-50px)',
            left: 'translateX(50px)',
            right: 'translateX(-50px)'
        };
        
        element.style.transform = transforms[direction];
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        
        setTimeout(() => {
            element.style.transform = 'translate(0)';
            element.style.opacity = '1';
        }, 50);
    }

    scaleIn(element, duration = 600) {
        element.style.transform = 'scale(0.8)';
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        }, 50);
    }

    shake(element) {
        element.classList.add('shake');
        setTimeout(() => {
            element.classList.remove('shake');
        }, 500);
    }

    pulse(element, duration = 2000) {
        element.classList.add('pulse-animation');
        setTimeout(() => {
            element.classList.remove('pulse-animation');
        }, duration);
    }

    // Performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize animation controller
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}