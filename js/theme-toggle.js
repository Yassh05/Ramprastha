// Theme Toggle Controller
class ThemeToggle {
    constructor() {
        this.currentTheme = 'light';
        this.toggleButtons = [];
        this.init();
    }

    init() {
        // Get saved theme from localStorage or default to light
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        // Apply saved theme
        this.applyTheme(this.currentTheme, false);
        
        // Initialize toggle buttons
        this.initToggleButtons();
        
        // Bind events
        this.bindEvents();
        
        // Listen for system theme changes
        this.listenForSystemThemeChanges();
    }

    initToggleButtons() {
        // Desktop toggle
        const desktopToggle = document.getElementById('themeToggle');
        if (desktopToggle) {
            this.toggleButtons.push(desktopToggle);
        }
        
        // Mobile toggle
        const mobileToggle = document.getElementById('mobileThemeToggle');
        if (mobileToggle) {
            this.toggleButtons.push(mobileToggle);
        }
        
        // Update toggle states
        this.updateToggleStates();
    }

    bindEvents() {
        this.toggleButtons.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });
            
            // Add hover sound effect (optional)
            toggle.addEventListener('mouseenter', () => {
                this.playHoverSound();
            });
        });
        
        // Keyboard shortcut (Ctrl/Cmd + Shift + T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme, true);
    }

    applyTheme(theme, animate = true) {
        const body = document.body;
        const html = document.documentElement;
        
        // Add transition class for smooth animation
        if (animate) {
            body.classList.add('theme-switching');
            
            // Create ripple effect from toggle button
            this.createThemeRipple();
            
            // Play toggle sound
            this.playToggleSound();
        }
        
        // Apply theme
        html.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
        
        // Update toggle states
        this.updateToggleStates();
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(theme);
        
        // Trigger custom event
        this.dispatchThemeChangeEvent(theme);
        
        // Remove transition class after animation
        if (animate) {
            setTimeout(() => {
                body.classList.remove('theme-switching');
            }, 500);
        }
    }

    updateToggleStates() {
        this.toggleButtons.forEach(toggle => {
            if (this.currentTheme === 'dark') {
                toggle.classList.add('on');
                toggle.setAttribute('aria-label', 'Switch to light theme');
                toggle.setAttribute('title', 'Switch to light theme');
            } else {
                toggle.classList.remove('on');
                toggle.setAttribute('aria-label', 'Switch to dark theme');
                toggle.setAttribute('title', 'Switch to dark theme');
            }
        });
    }

    createThemeRipple() {
        const activeToggle = this.toggleButtons.find(toggle => 
            toggle.getBoundingClientRect().width > 0
        );
        
        if (!activeToggle) return;
        
        const rect = activeToggle.getBoundingClientRect();
        const ripple = document.createElement('div');
        
        ripple.style.cssText = `
            position: fixed;
            top: ${rect.top + rect.height / 2}px;
            left: ${rect.left + rect.width / 2}px;
            width: 20px;
            height: 20px;
            background: ${this.currentTheme === 'light' ? '#111827' : '#fbbf24'};
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            pointer-events: none;
            z-index: 10000;
            opacity: 0.3;
            transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease;
        `;
        
        document.body.appendChild(ripple);
        
        // Trigger animation
        requestAnimationFrame(() => {
            const maxDimension = Math.max(window.innerWidth, window.innerHeight);
            ripple.style.transform = `translate(-50%, -50%) scale(${maxDimension / 10})`;
            ripple.style.opacity = '0';
        });
        
        // Clean up
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 800);
    }

    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        metaThemeColor.content = theme === 'dark' ? '#111827' : '#ffffff';
    }

    dispatchThemeChangeEvent(theme) {
        const event = new CustomEvent('themechange', {
            detail: { theme, previousTheme: this.currentTheme }
        });
        document.dispatchEvent(event);
    }

    listenForSystemThemeChanges() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            mediaQuery.addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem('theme')) {
                    const systemTheme = e.matches ? 'dark' : 'light';
                    this.applyTheme(systemTheme, true);
                }
            });
        }
    }

    playToggleSound() {
        // Create audio context for click sound
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            try {
                const audioContext = new (AudioContext || webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
            } catch (e) {
                // Silently fail if audio context is not available
            }
        }
    }

    playHoverSound() {
        // Subtle hover sound
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            try {
                const audioContext = new (AudioContext || webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.05);
            } catch (e) {
                // Silently fail if audio context is not available
            }
        }
    }

    // Public methods
    getCurrentTheme() {
        return this.currentTheme;
    }

    setTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.applyTheme(theme, true);
        }
    }

    // Auto-detect system preference
    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    // Reset to system preference
    resetToSystemTheme() {
        localStorage.removeItem('theme');
        const systemTheme = this.getSystemTheme();
        this.applyTheme(systemTheme, true);
    }

    // Add custom theme change listener
    onThemeChange(callback) {
        document.addEventListener('themechange', callback);
    }

    // Remove theme change listener
    offThemeChange(callback) {
        document.removeEventListener('themechange', callback);
    }
}

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeToggle = new ThemeToggle();
    
    // Add theme change listener for other components
    window.themeToggle.onThemeChange((event) => {
        console.log(`Theme changed to: ${event.detail.theme}`);
        
        // Update any theme-dependent components
        if (window.animationController) {
            window.animationController.updateTheme(event.detail.theme);
        }
        
        // Update property cards if they exist
        if (window.propertiesManager) {
            window.propertiesManager.updateTheme(event.detail.theme);
        }
    });
});

// Expose theme toggle globally
window.toggleTheme = () => {
    if (window.themeToggle) {
        window.themeToggle.toggleTheme();
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeToggle;
}