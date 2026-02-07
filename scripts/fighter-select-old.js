/* ============================
   STREET FIGHTER V - LOGIQUE DE SÉLECTION
   ============================ */

// Variables globales
let selectedLeft = null;
let selectedRight = null;
const vsFlash = document.getElementById('vsFlash');
const compareStartBtn = document.getElementById('compareStartBtn');
const sf5GridLeft = document.getElementById('sf5GridLeft');
const sf5GridRight = document.getElementById('sf5GridRight');

// Récupérer les données des personnages
let fightersData = [];

// Initialiser la page
document.addEventListener('DOMContentLoaded', function() {
    addDynamicStyles();
    initializeFighterSelect();
});

/**
 * Initialiser l'écran de sélection
 */
function initializeFighterSelect() {
    console.log('Initialisation de fighter-select...');
    console.log('CHARACTERS disponible ?', typeof CHARACTERS !== 'undefined');
    console.log('Nombre de CHARACTERS:', typeof CHARACTERS !== 'undefined' ? CHARACTERS.length : 0);
    
    // Récupérer les personnages depuis characters-data.js
    if (typeof CHARACTERS !== 'undefined' && CHARACTERS.length > 0) {
        fightersData = CHARACTERS;
    } else if (typeof characters !== 'undefined' && characters.length > 0) {
        fightersData = characters;
    } else {
        console.error('Les données des personnages ne sont pas disponibles');
        console.error('typeof CHARACTERS:', typeof CHARACTERS);
        console.error('typeof characters:', typeof characters);
        return;
    }

    // Générer les grilles
    generateFighterGrid(sf5GridLeft, 'left');
    generateFighterGrid(sf5GridRight, 'right');

    // Ajouter les event listeners au bouton
    compareStartBtn.addEventListener('click', handleCompare);
}

/**
 * Générer la grille de combattants
 */
function generateFighterGrid(containerElement, side) {
    containerElement.innerHTML = '';

    fightersData.forEach((fighter, index) => {
        const fighterCard = document.createElement('div');
        fighterCard.className = 'fighter';
        fighterCard.dataset.name = fighter.name;
        fighterCard.dataset.id = fighter.id || index;
        fighterCard.dataset.side = side;

        // Image du combattant
        const img = document.createElement('img');
        img.src = fighter.image ? `../images/characters/${fighter.image}` : '../images/placeholder.png';
        img.alt = fighter.name;
        img.loading = 'lazy';

        fighterCard.appendChild(img);

        // Event listeners
        fighterCard.addEventListener('click', () => handleFighterSelect(fighterCard, side, fighter));
        fighterCard.addEventListener('mouseenter', () => addHoverEffect(fighterCard));
        fighterCard.addEventListener('mouseleave', () => removeHoverEffect(fighterCard));

        containerElement.appendChild(fighterCard);
    });
}

/**
 * Gérer la sélection d'un combattant
 */
function handleFighterSelect(element, side, fighter) {
    // Retirer la sélection précédente du même côté
    if (side === 'left') {
        if (selectedLeft) {
            selectedLeft.classList.remove('selected');
        }
        selectedLeft = element;
        document.getElementById('selectedLeftImg').src = fighter.image ? `../images/characters/${fighter.image}` : '../images/placeholder.png';
        document.getElementById('selectedLeftName').textContent = fighter.name;
    } else {
        if (selectedRight) {
            selectedRight.classList.remove('selected');
        }
        selectedRight = element;
        document.getElementById('selectedRightImg').src = fighter.image ? `../images/characters/${fighter.image}` : '../images/placeholder.png';
        document.getElementById('selectedRightName').textContent = fighter.name;
    }

    // Ajouter la classe selected
    element.classList.add('selected');

    // Jouer l'animation VS si les deux sont sélectionnés
    if (selectedLeft && selectedRight) {
        triggerVSFlash();
    }
}

/**
 * Déclencher l'animation VS
 */
function triggerVSFlash() {
    vsFlash.classList.remove('active');
    // Force reflow pour redéclencher l'animation
    if (vsFlash.offsetWidth) {
        vsFlash.classList.add('active');
    }

    // Activer le bouton de comparaison
    compareStartBtn.disabled = false;
    compareStartBtn.style.animation = 'pulse 0.6s ease-out';
}

/**
 * Ajouter l'effet hover
 */
function addHoverEffect(element) {
    if (!element.classList.contains('selected')) {
        element.style.animation = 'shake 0.3s ease';
    }
}

/**
 * Retirer l'effet hover
 */
function removeHoverEffect(element) {
    element.style.animation = '';
}

/**
 * Gérer la comparaison
 */
function handleCompare() {
    if (!selectedLeft || !selectedRight) {
        console.warn('Les deux combattants doivent être sélectionnés');
        return;
    }

    // Récupérer les données
    const leftName = selectedLeft.dataset.name;
    const rightName = selectedRight.dataset.name;
    const leftImg = document.getElementById('selectedLeftImg').src;
    const rightImg = document.getElementById('selectedRightImg').src;

    // Jouer une animation finale avant la transition
    playTransitionAnimation();

    // Redirection vers l'intro SFV (qui redirigera vers compare.html)
    setTimeout(() => {
        const params = new URLSearchParams();
        params.append('left', leftName);
        params.append('right', rightName);
        if (leftImg && leftImg !== '') params.append('leftImg', leftImg);
        if (rightImg && rightImg !== '') params.append('rightImg', rightImg);
        
        globalThis.location.href = `intro-sfv.html?${params.toString()}`;
    }, 800);
}

/**
 * Animation de transition finale
 */
function playTransitionAnimation() {
    const screen = document.querySelector('.sf5-select-screen');
    screen.style.animation = 'screenFlash 0.8s ease-out';
}

/**
 * Ajouter les animations CSS manquantes dynamiquement
 */
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
    @keyframes pulse {
        0% {
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.5),
                        inset 0 0 10px rgba(255, 255, 255, 0.1);
        }
        50% {
            box-shadow: 0 0 40px rgba(255, 0, 0, 0.8),
                        inset 0 0 20px rgba(255, 255, 255, 0.2);
        }
        100% {
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.5),
                        inset 0 0 10px rgba(255, 255, 255, 0.1);
        }
    }

    @keyframes screenFlash {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(1.05);
        }
    }
`;
    document.head.appendChild(style);
}

// Expédition des fonctions globales pour utilisation externe
globalThis.fighterSelect = {
    selectedLeft: () => selectedLeft,
    selectedRight: () => selectedRight,
    getSelectedFighters: () => ({
        left: selectedLeft ? selectedLeft.dataset.name : null,
        right: selectedRight ? selectedRight.dataset.name : null
    })
};
