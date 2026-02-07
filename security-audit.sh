#!/bin/bash
# ============================
# SMASH ARENA - SECURITY AUDIT
# ============================
# Script d'audit de sécurité automatisé
# Usage: ./security-audit.sh

echo "🛡️  SMASH ARENA - AUDIT DE SÉCURITÉ"
echo "======================================"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Compteurs
PASS=0
WARN=0
FAIL=0

# Fonction pour afficher les résultats
check_pass() {
    echo -e "${GREEN}✓ PASS${NC} - $1"
    ((PASS++))
}

check_warn() {
    echo -e "${YELLOW}⚠ WARN${NC} - $1"
    ((WARN++))
}

check_fail() {
    echo -e "${RED}✗ FAIL${NC} - $1"
    ((FAIL++))
}

echo "📋 VÉRIFICATIONS DE SÉCURITÉ"
echo ""

# 1. Vérification des fichiers sensibles
echo "1. Fichiers sensibles"
if [ -f ".env" ]; then
    check_fail ".env détecté (devrait être .gitignore)"
else
    check_pass ".env non exposé"
fi

if grep -q "^.env$" .gitignore 2>/dev/null; then
    check_pass ".env dans .gitignore"
else
    check_warn ".env pas dans .gitignore"
fi

if [ -f "SECURITY.md" ]; then
    check_pass "SECURITY.md trouvé"
else
    check_warn "SECURITY.md manquant"
fi

# 2. Vérification des dépendances
echo ""
echo "2. Dépendances"

if [ -f "package.json" ]; then
    check_pass "package.json trouvé"
    
    if [ -f "package-lock.json" ]; then
        check_pass "package-lock.json trouvé"
    else
        check_warn "package-lock.json manquant"
    fi
else
    check_warn "package.json manquant (si Node.js utilisé)"
fi

# 3. Vérification des headers de sécurité HTML
echo ""
echo "3. Headers HTML"

for file in index.html pages/*.html; do
    if [ -f "$file" ]; then
        if grep -q "Content-Security-Policy" "$file"; then
            check_pass "CSP dans $file"
        else
            check_fail "CSP manquant dans $file"
        fi
        
        if grep -q "X-Content-Type-Options" "$file"; then
            check_pass "X-Content-Type-Options dans $file"
        else
            check_fail "X-Content-Type-Options manquant dans $file"
        fi
    fi
done

# 4. Vérification des scripts en ligne
echo ""
echo "4. Scripts en ligne (XSS Risk)"

for file in *.html pages/*.html; do
    if [ -f "$file" ]; then
        if grep -q 'onclick=' "$file"; then
            check_fail "onclick= détecté dans $file (utiliser addEventListener)"
        else
            check_pass "Pas d'onclick= dans $file"
        fi
        
        if grep -q 'innerHTML' "$file"; then
            check_warn "innerHTML détecté dans $file (préférer textContent)"
        fi
    fi
done

# 5. Vérification de HTTPS
echo ""
echo "5. Redirection HTTPS"

if [ -f ".htaccess" ]; then
    if grep -q "RewriteEngine" ".htaccess"; then
        check_pass ".htaccess configuré"
    else
        check_warn ".htaccess peut manquer de règles"
    fi
else
    check_warn ".htaccess manquant (Apache config)"
fi

# 6. Vérification des scripts de sécurité
echo ""
echo "6. Scripts de sécurité"

if [ -f "scripts/security.js" ]; then
    check_pass "security.js trouvé"
    
    if grep -q "safeHTML" "scripts/security.js"; then
        check_pass "safeHTML() disponible"
    else
        check_fail "safeHTML() manquant"
    fi
    
    if grep -q "validateInput" "scripts/security.js"; then
        check_pass "validateInput disponible"
    else
        check_fail "validateInput manquant"
    fi
else
    check_fail "security.js manquant"
fi

# 7. Vérification du contrôle d'accès
echo ""
echo "7. Contrôle d'accès"

if [ -f "scripts/data.js" ]; then
    if grep -q "function validate" "scripts/data.js"; then
        check_pass "Validation de données implémentée"
    else
        check_warn "Validation de données à améliorer"
    fi
else
    check_warn "scripts/data.js manquant"
fi

# 8. Logs de sécurité
echo ""
echo "8. Logging"

if [ -f "scripts/security.js" ]; then
    if grep -q "secureLog" "scripts/security.js"; then
        check_pass "secureLog() configuré"
    else
        check_warn "secureLog() manquant"
    fi
else
    check_warn "Logging sécurisé à améliorer"
fi

# Résumé
echo ""
echo "======================================"
echo "📊 RÉSUMÉ DE L'AUDIT"
echo "======================================"
echo -e "${GREEN}PASS: $PASS${NC}"
echo -e "${YELLOW}WARN: $WARN${NC}"
echo -e "${RED}FAIL: $FAIL${NC}"
echo ""

if [ $FAIL -gt 0 ]; then
    echo -e "${RED}⚠️  $FAIL erreurs critiques détectées!${NC}"
    exit 1
elif [ $WARN -gt 0 ]; then
    echo -e "${YELLOW}⚠️  $WARN avertissements détectés.${NC}"
    exit 0
else
    echo -e "${GREEN}✓ Audit de sécurité réussi!${NC}"
    exit 0
fi
