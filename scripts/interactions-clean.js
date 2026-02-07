// ============================
// INTERACTIONS.JS - CLEANED VERSION
// Animations, Scroll Reveal, Compteurs, Notifications
// ============================

// ===== SCROLL REVEAL =====
const revealElements = () => {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    reveals.forEach(element => {
        const windowHeight = globalThis.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

// Observer pour les éléments avec scroll-reveal
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Initialiser le scroll reveal
const initScrollReveal = () => {
    document.querySelectorAll('.scroll-reveal').forEach(element => {
        observer.observe(element);
    });
};

// Écouter le scroll pour compatibilité
globalThis.addEventListener('scroll', revealElements);
globalThis.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    revealElements();
});

// ===== PARALLAX EFFECT =====
const initParallax = () => {
    const parallaxElements = document.querySelectorAll('.parallax-background');
    
    globalThis.addEventListener('scroll', () => {
        const scrollPosition = globalThis.pageYOffset;
        
        parallaxElements.forEach(element => {
            const elementOffset = element.getBoundingClientRect().top + scrollPosition;
            const elementHeight = element.offsetHeight;
            
            if (scrollPosition < elementOffset + elementHeight) {
                const distance = elementOffset - scrollPosition;
                element.style.backgroundPosition = `center ${distance * 0.5}px`;
            }
        });
    });
};

globalThis.addEventListener('DOMContentLoaded', initParallax);

// ===== ANIMATED COUNTERS =====
const animateCounter = (element, target, duration = 1500) => {
    const isPercentage = element.textContent.includes('%');
    const suffix = isPercentage ? '%' : '';
    const targetNumber = Number.parseFloat(target);
    
    let current = 0;
    const increment = targetNumber / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        
        if (current >= targetNumber) {
            current = targetNumber;
        }
        
        const displayValue = isPercentage 
            ? current.toFixed(1) 
            : Math.floor(current).toLocaleString('fr-FR');
        
        element.textContent = displayValue + suffix;
        
        if (current < targetNumber) {
            requestAnimationFrame(updateCounter);
        }
    };
    
    updateCounter();
};

// Initialiser les compteurs au premier scroll dans la vue
const initCounters = () => {
    const statCards = document.querySelectorAll('.stat-card');
    let countersStarted = false;
    
    const startCounters = () => {
        if (countersStarted) return;
        
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < globalThis.innerHeight && rect.bottom > 0) {
            countersStarted = true;
            
            statCards.forEach(card => {
                const numberElement = card.querySelector('.stat-number');
                if (numberElement) {
                    const targetValue = numberElement.textContent;
                    animateCounter(numberElement, targetValue, 2000);
                }
            });
        }
    };
    
    globalThis.addEventListener('scroll', startCounters);
    startCounters();
};

globalThis.addEventListener('DOMContentLoaded', initCounters);

// ===== NOTIFICATION SYSTEM =====
class NotificationManager {
    constructor() {
        this.container = this.createNotificationContainer();
        this.notifications = [];
        this.queue = [];
        this.isProcessing = false;
    }
    
    createNotificationContainer() {
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(container);
        }
        return container;
    }
    
    show(message, type = 'info', duration = 3500) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            animation: slideInRight 0.4s ease forwards;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            max-width: 350px;
            font-size: 14px;
        `;
        
        // Couleurs selon le type
        const colors = {
            'success': '#4CAF50',
            'info': '#2196F3',
            'warning': '#FF9800',
            'error': '#F44336',
            'ranking': '#FF1744'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        
        notification.addEventListener('click', () => this.remove(notification));
        
        this.container.appendChild(notification);
        
        setTimeout(() => {
            this.remove(notification);
        }, duration);
        
        return notification;
    }
    
    remove(notification) {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}

// Créer une instance globale
globalThis.notificationManager = new NotificationManager();

// Ajouter l'animation au CSS
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== THEME MANAGER =====
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.apply();
    }
    
    apply() {
        document.documentElement.dataset.theme = this.currentTheme;
        localStorage.setItem('theme', this.currentTheme);
    }
    
    toggle() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.apply();
        globalThis.notificationManager?.show(`Mode ${this.currentTheme.toUpperCase()} activé`, 'info');
    }
    
    setTheme(theme) {
        if (['dark', 'light', 'arena', 'holo'].includes(theme)) {
            this.currentTheme = theme;
            this.apply();
        }
    }
}

// Créer une instance globale
globalThis.themeManager = new ThemeManager();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== PAGE TRANSITION ANIMATIONS =====
const initPageTransitions = () => {
    document.querySelectorAll('a:not([target="_blank"])').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ne pas intercepter les liens internes
            if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
                return;
            }
            
            // Vérifier que c'est un lien interne
            if (!href.includes('http')) {
                e.preventDefault();
                document.body.style.opacity = '1';
                document.body.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    globalThis.location.href = href;
                }, 250);
            }
        });
    });
};

globalThis.addEventListener('DOMContentLoaded', initPageTransitions);

// ===== HERO PARALLAX ENHANCED =====
const initHeroParallax = () => {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    globalThis.addEventListener('scroll', () => {
        const scrollY = globalThis.pageYOffset;
        const scrollPercent = (scrollY / globalThis.innerHeight) * 100;
        
        heroSection.style.backgroundPosition = `center ${scrollY * 0.5}px`;
        
        // Opacité du overlay au scroll
        const heroOverlay = heroSection.querySelector('.hero-section__overlay');
        if (heroOverlay) {
            const opacity = Math.min(0.5 + (scrollPercent / 200), 0.9);
            heroOverlay.style.opacity = opacity;
        }
    });
};

globalThis.addEventListener('DOMContentLoaded', initHeroParallax);

// ===== EXPORT POUR USAGE EXTERNE =====
globalThis.AnimationManager = {
    animateCounter,
    revealElements,
    initScrollReveal,
    initParallax
};

console.log('✨ Interactions.js loaded - Animations, counters, notifications, themes enabled');
