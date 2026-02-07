/* ============================
   CAPCOM CHARACTER SELECT - LOGIQUE
   ============================ */

// Variables globales
let fighter1 = null;
let fighter2 = null;
let fightersData = [];

const title = document.getElementById('selectTitle');
const compareBtn = document.getElementById('compareBtn');
const resultBox = document.getElementById('compareResult');
const charactersGrid = document.getElementById('charactersGrid');
const vsText = document.getElementById('vsText');

// Initialiser la page
document.addEventListener('DOMContentLoaded', function() {
    addDynamicStyles();
    initializeCharacterSelect();
});

/**
 * Initialiser l'écran de sélection Capcom
 */
function initializeCharacterSelect() {
    console.log('Initialisation de Character Select...');
    const hasCharacters = (typeof CHARACTERS !== 'undefined');
    console.log('CHARACTERS disponible ?', hasCharacters);
    const charactersCount = hasCharacters ? CHARACTERS.length : 0;
    console.log('Nombre de CHARACTERS:', charactersCount);
    
    // Récupérer les personnages depuis characters-data.js
    if (typeof CHARACTERS !== 'undefined' && CHARACTERS.length > 0) {
        fightersData = CHARACTERS;
    } else if (typeof characters !== 'undefined' && characters.length > 0) {
        fightersData = characters;
    } else {
        console.error('Les données des personnages ne sont pas disponibles');
        return;
    }

    // Générer la grille de personnages
    generateCharacterGrid();
    
    // Attacher les événements
    attachEventListeners();
}

/**
 * Générer la grille de tous les personnages
 */
function generateCharacterGrid() {
    if (!charactersGrid) return;
    
    charactersGrid.innerHTML = '';
    
    fightersData.forEach(fighter => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.dataset.id = fighter.id;
        card.dataset.name = fighter.name;
        
        const img = document.createElement('img');
        img.src = fighter.image ? `../images/characters/${fighter.image}` : '../images/placeholder.png';
        img.alt = fighter.name;
        img.loading = 'lazy';
        
        const name = document.createElement('span');
        name.className = 'char-name';
        name.textContent = fighter.name;
        
        card.appendChild(img);
        card.appendChild(name);
        charactersGrid.appendChild(card);
    });
}

/**
 * Attacher les événements de clic sur les cartes
 */
function attachEventListeners() {
    const cards = document.querySelectorAll('.char-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => handleCardClick(card));
    });
    
    compareBtn.addEventListener('click', handleCompare);
}

/**
 * Gérer le clic sur une carte
 */
function handleCardClick(card) {
    const fighterId = card.dataset.id;
    const fighterName = card.dataset.name;
    
    // Sélection du Fighter 1
    if (!fighter1) {
        fighter1 = { id: fighterId, name: fighterName, element: card };
        card.classList.add('selected', 'fighter1');
        title.textContent = 'SELECT FIGHTER 2';
        title.style.color = '#00e5ff';
        return;
    }
    
    // Empêcher de sélectionner le même personnage
    if (fighterId === fighter1.id) {
        return;
    }
    
    // Sélection du Fighter 2
    if (!fighter2) {
        fighter2 = { id: fighterId, name: fighterName, element: card };
        card.classList.add('selected', 'fighter2');
        title.textContent = 'READY TO FIGHT!';
        title.style.color = '#ff0050';
        compareBtn.disabled = false;
        
        // Animation VS
        if (vsText) {
            vsText.style.animation = 'vsImpactCapcom 0.8s ease-out';
        }
    }
}

/**
 * Gérer la comparaison et calculer les chances
 */
function handleCompare() {
    if (!fighter1 || !fighter2) return;
    
    const fighter1Data = fightersData.find(f => f.id === fighter1.id);
    const fighter2Data = fightersData.find(f => f.id === fighter2.id);
    
    if (!fighter1Data || !fighter2Data) {
        resultBox.innerHTML = '<p style="color: #ff0050;">Erreur : Données des personnages introuvables</p>';
        return;
    }
    
    // Calculer les chances de victoire
    const chances = calculateWinChance(fighter1Data.stats, fighter2Data.stats);
    
    // Déterminer le message du gagnant
    const winnerMessage = getWinnerMessage(chances, fighter1.name, fighter2.name);
    
    // Afficher le résultat avec animation
    resultBox.innerHTML = `
        <div class="result-animation">
            <div class="result-fighter">
                <span class="fighter-label">${fighter1.name}</span>
                <div class="progress-bar">
                    <div class="progress-fill fighter1-fill" style="width: ${chances.fighter1}%"></div>
                </div>
                <span class="percentage">${chances.fighter1}%</span>
            </div>
            <div class="result-vs">VS</div>
            <div class="result-fighter">
                <span class="fighter-label">${fighter2.name}</span>
                <div class="progress-bar">
                    <div class="progress-fill fighter2-fill" style="width: ${chances.fighter2}%"></div>
                </div>
                <span class="percentage">${chances.fighter2}%</span>
            </div>
            <div class="winner-prediction">
                ${winnerMessage}
            </div>
        </div>
    `;
    
    // Animation du résultat
    resultBox.style.animation = 'resultAppear 0.6s ease-out';
}

/**
 * Déterminer le message du gagnant
 */
function getWinnerMessage(chances, name1, name2) {
    if (chances.fighter1 > chances.fighter2) {
        return `🏆 ${name1} est favori !`;
    }
    if (chances.fighter2 > chances.fighter1) {
        return `🏆 ${name2} est favori !`;
    }
    return '⚖️ Match équilibré !';
}

/**
 * Calculer les chances de victoire basées sur les stats
 */
function calculateWinChance(stats1, stats2) {
    // Calculer le score total de chaque fighter
    const total1 = (stats1.speed || 0) + (stats1.power || 0) + (stats1.weight || 0) + 
                   (stats1.aerial || 0) + (stats1.combo || 0) + (stats1.projectiles || 0);
    
    const total2 = (stats2.speed || 0) + (stats2.power || 0) + (stats2.weight || 0) + 
                   (stats2.aerial || 0) + (stats2.combo || 0) + (stats2.projectiles || 0);
    
    const sum = total1 + total2;
    
    if (sum === 0) {
        return { fighter1: 50, fighter2: 50 };
    }
    
    return {
        fighter1: Math.round((total1 / sum) * 100),
        fighter2: Math.round((total2 / sum) * 100)
    };
}

/**
 * Ajouter les animations CSS manquantes dynamiquement
 */
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
    @keyframes vsImpactCapcom {
        0% {
            transform: scale(1);
            opacity: 0.8;
        }
        50% {
            transform: scale(1.3);
            opacity: 1;
            text-shadow: 0 0 60px #00e5ff, 0 0 120px #3b82f6;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes resultAppear {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .progress-fill {
        animation: progressGrow 1s ease-out;
    }
    
    @keyframes progressGrow {
        0% {
            width: 0 !important;
        }
    }
`;
    document.head.appendChild(style);
}

// Expédition des fonctions globales pour utilisation externe
globalThis.fighterSelect = {
    fighter1: () => fighter1,
    fighter2: () => fighter2,
    getFighters: () => ({ fighter1, fighter2 }),
    reset: () => {
        fighter1 = null;
        fighter2 = null;
        document.querySelectorAll('.char-card').forEach(card => card.classList.remove('selected', 'fighter1', 'fighter2'));
        title.textContent = 'SELECT FIGHTER 1';
        compareBtn.disabled = true;
        resultBox.innerHTML = '';
    }
};
