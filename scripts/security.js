// ============================
// SMASH ARENA - SÉCURITÉ WEB
// ============================
// Configuration de sécurité globale pour tous les scripts

// 1. PROTECTION CONTRE L'INJECTION XSS
// Fonction d'échappement pour les données affichées dans le DOM
globalThis.safeHTML = function(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replaceAll(/[&<>"']/g, m => map[m]);
};

// 2. VALIDATION DES DONNÉES
globalThis.validateInput = {
    email: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    alphanumeric: function(input) {
        const alphaNumericRegex = /^[a-zA-Z0-9_-]+$/;
        return alphaNumericRegex.test(input);
    },
    
    number: function(input) {
        return Number.isFinite(input);
    },
    
    url: function(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
};

// 3. PROTECTION CONTRE LE CROSS-SITE REQUEST FORGERY (CSRF)
globalThis.getCSRFToken = function() {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
};

// 4. LOCAL STORAGE - Encryption simple des données sensibles
globalThis.secureStorage = {
    set: function(key, value) {
        try {
            // Simple obfuscation (à remplacer par une vraie crypto en production)
            const encoded = btoa(JSON.stringify(value));
            localStorage.setItem(`secure_${key}`, encoded);
        } catch (e) {
            console.error('Erreur lors de la sauvegarde sécurisée:', e);
        }
    },
    
    get: function(key) {
        try {
            const encoded = localStorage.getItem(`secure_${key}`);
            return encoded ? JSON.parse(atob(encoded)) : null;
        } catch (e) {
            console.error('Erreur lors de la lecture sécurisée:', e);
            return null;
        }
    },
    
    remove: function(key) {
        localStorage.removeItem(`secure_${key}`);
    }
};

// 5. PROTECTION CONTRE LES CLICKJACKING
if (globalThis.self !== globalThis.top) {
    globalThis.top.location = globalThis.self.location;
}

// 6. DÉSACTIVER L'AUTOCOMPLÉTION SUR LES CHAMPS SENSIBLES
document.addEventListener('DOMContentLoaded', function() {
    const sensitiveFields = document.querySelectorAll('input[data-sensitive="true"]');
    sensitiveFields.forEach(field => {
        field.setAttribute('autocomplete', 'off');
    });
});

// 7. CONTENT SECURITY POLICY - Vérification
globalThis.reportCSPViolation = function(violation) {
    console.warn('CSP Violation:', violation);
    // Optionnel: envoyer à un serveur de logs
};

document.addEventListener('securitypolicyviolation', globalThis.reportCSPViolation);

// 8. SANITIZATION POUR LES DONNÉES AFFICHÉES
globalThis.sanitizeHTML = function(html) {
    const temp = document.createElement('div');
    temp.textContent = html;
    return temp.innerHTML;
};

// 9. PRÉVENTION DE L'EXPOSITION DES DONNÉES SENSIBLES
globalThis.hideSensitiveData = function(data, pattern = '****') {
    return data.slice(0, 2) + pattern + data.slice(-2);
};

// 10. LOGGING SÉCURISÉ (sans données sensibles)
globalThis.secureLog = function(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    if (level === 'error') {
        console.error(logEntry);
    } else if (level === 'warn') {
        console.warn(logEntry);
    } else {
        console.log(logEntry);
    }
};

// 11. RATE LIMITING - Prévention du spam/brute force
globalThis.rateLimiter = {
    attempts: {},
    
    checkLimit: function(key, maxAttempts = 5, timeWindow = 60000) {
        const now = Date.now();
        
        if (!this.attempts[key]) {
            this.attempts[key] = [];
        }
        
        // Nettoyer les tentatives expirées
        this.attempts[key] = this.attempts[key].filter(time => now - time < timeWindow);
        
        if (this.attempts[key].length >= maxAttempts) {
            return false;
        }
        
        this.attempts[key].push(now);
        return true;
    }
};

// 12. PROTECTION CONTRE LES ÉVÉNEMENTS NON AUTORISÉS
globalThis.safeEventListener = function(element, event, handler, options = {}) {
    if (!element) return;
    
    // Whitelist des événements autorisés
    const allowedEvents = [
        'click', 'change', 'submit', 'input', 'keyup', 'keydown',
        'focus', 'blur', 'mouseenter', 'mouseleave', 'scroll'
    ];
    
    if (allowedEvents.includes(event)) {
        element.addEventListener(event, handler, options);
    } else {
        console.warn(`Événement non autorisé: ${event}`);
    }
};

// 13. VÉRIFICATION DU DOCUMENT PRÊT
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier que tous les scripts nécessaires sont chargés
    globalThis.secureLog('Application initialisée avec les normes de sécurité', 'info');
});

// 14. GESTION DES ERREURS GLOBALES
globalThis.addEventListener('error', function(event) {
    globalThis.secureLog(`Erreur: ${event.message}`, 'error');
});

// Exporter les fonctions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        safeHTML: globalThis.safeHTML,
        validateInput: globalThis.validateInput,
        secureStorage: globalThis.secureStorage,
        rateLimiter: globalThis.rateLimiter,
        secureLog: globalThis.secureLog
    };
}
