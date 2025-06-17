/**
 * Main JavaScript for Academic Website
 * Features: Dark mode toggle, mobile navigation, smooth scrolling, etc.
 */

(function() {
    'use strict';

    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Theme Management
    class ThemeManager {
        constructor() {
            this.currentTheme = localStorage.getItem('theme') || 'light';
            this.init();
        }

        init() {
            this.applyTheme(this.currentTheme);
            this.updateThemeIcon();
            
            if (themeToggle) {
                themeToggle.addEventListener('click', () => this.toggleTheme());
            }
        }

        toggleTheme() {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.applyTheme(this.currentTheme);
            this.updateThemeIcon();
            localStorage.setItem('theme', this.currentTheme);
        }

        applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }

        updateThemeIcon() {
            const icon = themeToggle?.querySelector('i');
            if (icon) {
                icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }

    // Navigation Management
    class NavigationManager {
        constructor() {
            this.isMenuOpen = false;
            this.init();
        }

        init() {
            this.setupMobileMenu();
            this.setupScrollBehavior();
            this.setupActiveLinks();
        }

        setupMobileMenu() {
            if (navToggle && navMenu) {
                navToggle.addEventListener('click', () => this.toggleMobileMenu());
                
                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!navbar.contains(e.target) && this.isMenuOpen) {
                        this.closeMobileMenu();
                    }
                });

                // Close menu when clicking on a link
                const navLinks = navMenu.querySelectorAll('.nav-link');
                navLinks.forEach(link => {
                    link.addEventListener('click', () => this.closeMobileMenu());
                });
            }
        }

        toggleMobileMenu() {
            this.isMenuOpen = !this.isMenuOpen;
            this.updateMobileMenu();
        }

        closeMobileMenu() {
            this.isMenuOpen = false;
            this.updateMobileMenu();
        }

        updateMobileMenu() {
            if (navMenu) {
                navMenu.style.display = this.isMenuOpen ? 'block' : 'none';
                navToggle?.setAttribute('aria-expanded', this.isMenuOpen);
                
                // Add/remove active class for styling
                navbar.classList.toggle('nav-open', this.isMenuOpen);
            }
        }

        setupScrollBehavior() {
            let lastScrollY = window.scrollY;
            let ticking = false;

            const updateNavbar = () => {
                const currentScrollY = window.scrollY;
                
                // Add/remove scrolled class for styling
                if (currentScrollY > 10) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // Hide/show navbar on scroll (mobile)
                if (window.innerWidth <= 768) {
                    if (currentScrollY > lastScrollY && currentScrollY > 100) {
                        navbar.style.transform = 'translateY(-100%)';
                    } else {
                        navbar.style.transform = 'translateY(0)';
                    }
                }

                lastScrollY = currentScrollY;
                ticking = false;
            };

            const requestTick = () => {
                if (!ticking) {
                    requestAnimationFrame(updateNavbar);
                    ticking = true;
                }
            };

            window.addEventListener('scroll', requestTick, { passive: true });
        }

        setupActiveLinks() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

            if (sections.length === 0 || navLinks.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const currentSection = entry.target.id;
                        navLinks.forEach(link => {
                            const href = link.getAttribute('href');
                            if (href === `#${currentSection}`) {
                                link.classList.add('active');
                            } else {
                                link.classList.remove('active');
                            }
                        });
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '-100px 0px'
            });

            sections.forEach(section => observer.observe(section));
        }
    }

    // Smooth Scrolling
    class SmoothScroll {
        constructor() {
            this.init();
        }

        init() {
            // Handle anchor links
            document.addEventListener('click', (e) => {
                const target = e.target.closest('a[href^="#"]');
                if (target) {
                    e.preventDefault();
                    const targetId = target.getAttribute('href').substring(1);
                    this.scrollToElement(targetId);
                }
            });
        }

        scrollToElement(targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = 80; // Account for fixed navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }

    // Animation Observer
    class AnimationObserver {
        constructor() {
            this.init();
        }

        init() {
            // Add animation classes to elements as they come into view
            const animatedElements = document.querySelectorAll('.stat-item, .project-card, .award-item, .news-item');
            
            if (animatedElements.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });

            animatedElements.forEach(element => observer.observe(element));
        }
    }

    // Utility Functions
    class Utils {
        static debounce(func, wait) {
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

        static throttle(func, limit) {
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

        static copyToClipboard(text) {
            if (navigator.clipboard) {
                return navigator.clipboard.writeText(text);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    return Promise.resolve();
                } catch (err) {
                    return Promise.reject(err);
                } finally {
                    document.body.removeChild(textArea);
                }
            }
        }
    }

    // Publications Manager (for future BibTeX integration)
    class PublicationsManager {
        constructor() {
            this.init();
        }

        init() {
            // Add copy citation functionality
            const publicationItems = document.querySelectorAll('.publication-item');
            publicationItems.forEach(item => {
                this.addCopyFunction(item);
            });
        }

        addCopyFunction(item) {
            // Add a copy button to each publication
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-citation-btn';
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            copyBtn.title = 'Copy citation';
            copyBtn.style.cssText = `
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: var(--background-alt);
                border: 1px solid var(--border-color);
                border-radius: 0.5rem;
                padding: 0.5rem;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.2s ease;
            `;

            item.style.position = 'relative';
            item.appendChild(copyBtn);

            // Show/hide copy button on hover
            item.addEventListener('mouseenter', () => {
                copyBtn.style.opacity = '1';
            });

            item.addEventListener('mouseleave', () => {
                copyBtn.style.opacity = '0';
            });

            // Copy citation on click
            copyBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const title = item.querySelector('.pub-title').textContent;
                const authors = item.querySelector('.pub-authors').textContent;
                const venue = item.querySelector('.pub-venue').textContent;
                
                const citation = `${authors}. "${title}". ${venue}.`;
                
                Utils.copyToClipboard(citation).then(() => {
                    this.showToast('Citation copied to clipboard!');
                }).catch(err => {
                    console.error('Failed to copy citation:', err);
                });
            });
        }

        showToast(message) {
            // Simple toast notification
            const toast = document.createElement('div');
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                background: var(--primary-color);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                z-index: 10000;
                animation: slideInUp 0.3s ease, slideOutDown 0.3s ease 2.7s;
            `;

            document.body.appendChild(toast);

            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 3000);
        }
    }

    // Performance optimization
    class PerformanceOptimizer {
        constructor() {
            this.init();
        }

        init() {
            this.lazyLoadImages();
            this.preloadCriticalResources();
        }

        lazyLoadImages() {
            const images = document.querySelectorAll('img[data-src]');
            
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    });
                });

                images.forEach(img => imageObserver.observe(img));
            } else {
                // Fallback for browsers without IntersectionObserver
                images.forEach(img => {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                });
            }
        }

        preloadCriticalResources() {
            // Preload critical CSS and fonts
            const criticalResources = [
                { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' }
            ];

            criticalResources.forEach(resource => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource.href;
                link.as = resource.as;
                document.head.appendChild(link);
            });
        }
    }

    // Initialize everything when DOM is ready
    const init = () => {
        // Initialize all managers
        new ThemeManager();
        new NavigationManager();
        new SmoothScroll();
        new AnimationObserver();
        new PublicationsManager();
        new PerformanceOptimizer();

        // Add some CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            @keyframes slideOutDown {
                from { transform: translateY(0); opacity: 1; }
                to { transform: translateY(100%); opacity: 0; }
            }
            
            .animate-in {
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            .nav-link.active {
                color: var(--primary-color) !important;
            }
            
            .navbar.scrolled {
                background-color: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
            }
            
            [data-theme="dark"] .navbar.scrolled {
                background-color: rgba(15, 23, 42, 0.95);
            }
        `;
        document.head.appendChild(style);

        console.log('🎉 Academic website initialized successfully!');
    };

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Handle window resize
    window.addEventListener('resize', Utils.debounce(() => {
        // Reset mobile menu on desktop
        if (window.innerWidth > 768 && navMenu) {
            navMenu.style.display = '';
            navbar.classList.remove('nav-open');
        }
    }, 250));

    // Expose utilities globally if needed
    window.AcademicSite = {
        Utils,
        version: '1.0.0'
    };

})(); 