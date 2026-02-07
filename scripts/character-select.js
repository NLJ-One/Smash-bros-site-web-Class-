/* ============================
   CHARACTER SELECT VERSUS
   Sélection simple, brute, style Versus
   ============================ */

let fighter1 = null;
let fighter2 = null;
let fightersData = [];

const fighter1Display = document.getElementById('fighter1Display');
const fighter2Display = document.getElementById('fighter2Display');
const fighter1Name = document.getElementById('fighter1Name');
const fighter2Name = document.getElementById('fighter2Name');
const fighter1Container = fighter1Display?.parentElement;
const fighter2Container = fighter2Display?.parentElement;
const compareBtn = document.getElementById('compareBtn');
const resultBox = document.getElementById('compareResult');
const charactersGrid = document.getElementById('charactersGrid');
const vsText = document.getElementById('vsText');

document.addEventListener('DOMContentLoaded', function() {
    initializeCharacterSelect();
});

/**
 * Initialiser l'écran de sélection
 */
function initializeCharacterSelect() {
    console.log('Initialisation Character Select...');
    
    const hasCharacters = (typeof CHARACTERS !== 'undefined');
    console.log('CHARACTERS disponible ?', hasCharacters);
    
    let charactersAvailable = false;
    if (hasCharacters) {
        fightersData = CHARACTERS;
        charactersAvailable = true;
    } else {
        const otherCharacters = (typeof characters !== 'undefined');
        if (otherCharacters) {
            fightersData = characters;
            charactersAvailable = true;
        }
    }
    
    if (!charactersAvailable) {
        console.error('Les données des personnages ne sont pas disponibles');
        return;
    }

    const charactersCount = fightersData.length;
    console.log('Nombre de personnages:', charactersCount);

    generateCharacterGrid();
    attachEventListeners();
}

/**
 * Générer la grille
 */
function generateCharacterGrid() {
    if (!charactersGrid) return;
    
    charactersGrid.innerHTML = '';
    
    fightersData.forEach(fighter => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.dataset.id = fighter.id;
        card.dataset.name = fighter.name;
        card.dataset.fighterData = JSON.stringify(fighter);
        card.setAttribute('data-fighter-name', fighter.name);
        
        const img = document.createElement('img');
        img.src = fighter.image ? `../images/characters/${fighter.image}` : '../images/placeholder.png';
        img.alt = fighter.name;
        img.title = fighter.name;
        img.loading = 'lazy';
        
        card.appendChild(img);
        charactersGrid.appendChild(card);
    });
}

/**
 * Attacher les événements
 */
function attachEventListeners() {
    const cards = document.querySelectorAll('.char-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => handleCardClick(card));
    });
    
    compareBtn.addEventListener('click', handleCompare);
}

/**
 * Gérer le clic (sélection/déselection)
 */
function handleCardClick(card) {
    const fighterId = card.dataset.id;
    const fighterName = card.dataset.name;
    const fighterDataStr = card.dataset.fighterData;
    
    let fighterData = null;
    try {
        fighterData = JSON.parse(fighterDataStr);
    } catch (e) {
        console.error('Erreur parsing:', e);
        return;
    }
    
    // Déselectionner Fighter 1
    if (fighter1 && fighter1.id === fighterId) {
        deselectFighter1();
        return;
    }
    
    // Déselectionner Fighter 2
    if (fighter2 && fighter2.id === fighterId) {
        deselectFighter2();
        return;
    }
    
    // Sélectionner Fighter 1
    if (!fighter1) {
        fighter1 = { id: fighterId, name: fighterName, data: fighterData, element: card };
        
        fighter1Display.src = fighterData.image ? `../images/characters/${fighterData.image}` : '';
        fighter1Display.classList.add('active', 'appear-animation');
        fighter1Container?.classList.add('active');
        
        // Afficher le nom avec animation
        fighter1Name.textContent = fighterName.toUpperCase();
        fighter1Name.classList.add('name-appear-animation');
        
        card.classList.add('selected', 'fighter1');
        document.querySelector('.left-slot').classList.add('active');
        
        // Retirer l'animation après la fin
        setTimeout(() => {
            fighter1Display.classList.remove('appear-animation');
            fighter1Name.classList.remove('name-appear-animation');
        }, 600);
        
        console.log('Fighter 1:', fighterName);
        return;
    }
    
    // Sélectionner Fighter 2
    if (!fighter2) {
        fighter2 = { id: fighterId, name: fighterName, data: fighterData, element: card };
        
        fighter2Display.src = fighterData.image ? `../images/characters/${fighterData.image}` : '';
        fighter2Display.classList.add('active', 'appear-animation');
        fighter2Container?.classList.add('active');
        
        // Afficher le nom avec animation
        fighter2Name.textContent = fighterName.toUpperCase();
        fighter2Name.classList.add('name-appear-animation');
        
        card.classList.add('selected', 'fighter2');
        document.querySelector('.right-slot').classList.add('active');
        
        // Retirer l'animation après la fin
        setTimeout(() => {
            fighter2Display.classList.remove('appear-animation');
            fighter2Name.classList.remove('name-appear-animation');
        }, 600);
        
        vsText.classList.add('active');
        compareBtn.disabled = false;
        
        console.log('Fighter 2:', fighterName);
    }
}

/**
 * Déselectionner Fighter 1
 */
function deselectFighter1() {
    if (!fighter1) return;
    
    fighter1.element.classList.remove('selected', 'fighter1');
    fighter1Display.classList.remove('active');
    fighter1Container?.classList.remove('active');
    fighter1Display.src = '';
    fighter1Name.textContent = '';
    document.querySelector('.left-slot').classList.remove('active');
    
    fighter1 = null;
    
    vsText.classList.remove('active');
    compareBtn.disabled = true;
    resultBox.innerHTML = '';
    charactersGrid.style.display = '';
    
    console.log('Fighter 1 déselectionné');
}

/**
 * Déselectionner Fighter 2
 */
function deselectFighter2() {
    if (!fighter2) return;
    
    fighter2.element.classList.remove('selected', 'fighter2');
    fighter2Display.classList.remove('active');
    fighter2Container?.classList.remove('active');
    fighter2Display.src = '';
    fighter2Name.textContent = '';
    document.querySelector('.right-slot').classList.remove('active');
    
    fighter2 = null;
    
    vsText.classList.remove('active');
    compareBtn.disabled = true;
    resultBox.innerHTML = '';
    charactersGrid.style.display = '';
    
    console.log('Fighter 2 déselectionné');
}

/**
 * Comparer et afficher les résultats
 */
function handleCompare() {
    if (!fighter1 || !fighter2) return;
    
    const chances = calculateWinChance(fighter1.data.stats, fighter2.data.stats);
    const winnerMessage = getWinnerMessage(chances, fighter1.name, fighter2.name);
    
    const statsHtml1 = renderStats(fighter1.data.stats);
    const statsHtml2 = renderStats(fighter2.data.stats);
    
    let winner = 'tie';
    if (chances.fighter1 > chances.fighter2) {
        winner = 'fighter1';
    } else if (chances.fighter2 > chances.fighter1) {
        winner = 'fighter2';
    }
    
    resultBox.innerHTML = `
        <div class="result-animation">
            <!-- COMBATTANT 1 -->
            <div class="result-fighter left-fighter">
                <div class="fighter-portrait left-portrait">
                    <img src="../images/characters/${fighter1.data.image}" alt="${fighter1.name}">
                    <div class="fighter-glow"></div>
                </div>
                <span class="fighter-label">${fighter1.name}</span>
                <div class="fighter-stats-combat">
                    ${statsHtml1}
                </div>
                <div class="progress-bar">
                    <div class="progress-fill fighter1-fill" data-final="${chances.fighter1}"></div>
                </div>
                <span class="percentage fighter1-percent">0%</span>
                <div class="detailed-score">
                    <div class="score-line">Score: <span class="score-value">${chances.totalScore1}</span></div>
                    <div class="score-line bonus">Synergie: +${chances.synergy1}</div>
                    <div class="score-line bonus">Défense: +${chances.defense1}</div>
                </div>
            </div>
            
            <!-- VS ÉPIQUE -->
            <div class="result-vs-epic">
                <div class="clash-effect"></div>
                <div class="vs-text-result">VS</div>
                <div class="clash-effect delay"></div>
            </div>
            
            <!-- COMBATTANT 2 -->
            <div class="result-fighter right-fighter">
                <div class="fighter-portrait right-portrait">
                    <img src="../images/characters/${fighter2.data.image}" alt="${fighter2.name}">
                    <div class="fighter-glow"></div>
                </div>
                <span class="fighter-label">${fighter2.name}</span>
                <div class="fighter-stats-combat">
                    ${statsHtml2}
                </div>
                <div class="progress-bar">
                    <div class="progress-fill fighter2-fill" data-final="${chances.fighter2}"></div>
                </div>
                <span class="percentage fighter2-percent">0%</span>
                <div class="detailed-score">
                    <div class="score-line">Score: <span class="score-value">${chances.totalScore2}</span></div>
                    <div class="score-line bonus">Synergie: +${chances.synergy2}</div>
                    <div class="score-line bonus">Défense: +${chances.defense2}</div>
                </div>
            </div>
        </div>
        
        <!-- RÉSULTAT FINAL -->
        <div class="combat-result ${winner}">
            <div class="result-crown"></div>
            <div class="winner-prediction" data-winner="${winner}">
                ${winnerMessage}
            </div>
            <a href="compare.html" class="back-to-select">← NOUVELLE SÉLECTION</a>
        </div>
    `;
    
    // Masquer la grille et afficher le résultat en plein écran
    charactersGrid.style.display = 'none';
    
    // Lancer l'animation de combat après un petit délai
    setTimeout(() => {
        const fills = resultBox.querySelectorAll('.progress-fill');
        const percents = resultBox.querySelectorAll('.percentage');
        const statBars = resultBox.querySelectorAll('.stat-fill');
        
        console.log('Animation démarrée:', {
            fills: fills.length,
            percents: percents.length,
            statBars: statBars.length
        });
        
        // Animer les barres de victoire
        fills.forEach((fill, idx) => {
            const finalValue = Number.parseInt(fill.dataset.final, 10);
            let currentValue = 0;
            const increment = finalValue / 30; // 30 frames pour l'animation
            
            const animateBar = () => {
                if (currentValue < finalValue) {
                    currentValue += increment;
                    fill.style.width = Math.min(currentValue, finalValue) + '%';
                    percents[idx].textContent = Math.round(Math.min(currentValue, finalValue)) + '%';
                    requestAnimationFrame(animateBar);
                }
            };
            animateBar();
        });
        
        // Animer les stats individuelles avec effet de pulse
        statBars.forEach((bar, idx) => {
            // Reset initial pour l'animation
            bar.style.transform = 'scaleX(0)';
            bar.style.opacity = '0';
            
            setTimeout(() => {
                bar.style.animation = 'statPunchIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
            }, 300 + (idx * 80));
        });
    }, 400);
}

/**
 * Calculer les chances avec algorithme détaillé
 * Utilise des pondérations pour chaque stat selon leur importance en combat
 */
function calculateWinChance(stats1, stats2) {
    // Pondérations pour chaque statistique (importance en combat)
    const weights = {
        speed: 1.2,      // Vitesse cruciale pour l'initiative
        power: 1.5,      // Puissance très importante pour les KO
        weight: 0.9,     // Poids défensif mais moins prioritaire
        aerial: 1.1,     // Jeu aérien important
        combo: 1.3,      // Capacité de combo très valorisée
        projectiles: 1.0 // Projectiles utiles mais situation dépendante
    };
    
    // Calcul des scores pondérés
    let score1 = 0;
    let score2 = 0;
    let details1 = [];
    let details2 = [];
    
    for (const [stat, weight] of Object.entries(weights)) {
        const value1 = (stats1[stat] || 0) * weight;
        const value2 = (stats2[stat] || 0) * weight;
        score1 += value1;
        score2 += value2;
        details1.push({ stat, value: stats1[stat] || 0, weighted: value1 });
        details2.push({ stat, value: stats2[stat] || 0, weighted: value2 });
    }
    
    // Bonus de synergie (combos + vitesse)
    const synergy1 = ((stats1.combo || 0) * (stats1.speed || 0)) / 20;
    const synergy2 = ((stats2.combo || 0) * (stats2.speed || 0)) / 20;
    score1 += synergy1;
    score2 += synergy2;
    
    // Bonus défensif (poids + puissance pour les trades)
    const defense1 = ((stats1.weight || 0) * (stats1.power || 0)) / 25;
    const defense2 = ((stats2.weight || 0) * (stats2.power || 0)) / 25;
    score1 += defense1;
    score2 += defense2;
    
    const totalScore = score1 + score2;
    
    if (totalScore === 0) {
        return { 
            fighter1: 50.00, 
            fighter2: 50.00,
            details1: [],
            details2: [],
            totalScore1: 0,
            totalScore2: 0,
            synergy1: 0,
            synergy2: 0,
            defense1: 0,
            defense2: 0
        };
    }
    
    // Calcul des pourcentages avec 2 décimales
    const percent1 = (score1 / totalScore) * 100;
    const percent2 = (score2 / totalScore) * 100;
    
    return {
        fighter1: Number(percent1.toFixed(2)),
        fighter2: Number(percent2.toFixed(2)),
        details1,
        details2,
        totalScore1: Number(score1.toFixed(2)),
        totalScore2: Number(score2.toFixed(2)),
        synergy1: Number(synergy1.toFixed(2)),
        synergy2: Number(synergy2.toFixed(2)),
        defense1: Number(defense1.toFixed(2)),
        defense2: Number(defense2.toFixed(2))
    };
}

/**
 * Afficher les stats d'un personnage
 */
function renderStats(stats) {
    if (!stats) return '';
    
    const statLabels = {
        speed: 'Vitesse',
        power: 'Puissance',
        weight: 'Poids',
        aerial: 'Aérien',
        combo: 'Combos',
        projectiles: 'Projectiles'
    };
    
    return Object.entries(stats).map(([key, value]) => {
        const label = statLabels[key] || key;
        return `
            <div class="stat-row">
                <span class="stat-label">${label}</span>
                <div class="stat-bar-container">
                    <div class="stat-fill" data-width="${(value / 10) * 100}" style="width: ${(value / 10) * 100}%"></div>
                </div>
                <span class="stat-value">${value}/10</span>
            </div>
        `;
    }).join('');
}

/**
 * Message du gagnant avec détails
 */
function getWinnerMessage(chances, name1, name2) {
    const diff = Math.abs(chances.fighter1 - chances.fighter2);
    
    if (chances.fighter1 > chances.fighter2) {
        if (diff > 15) {
            return `⚡ ${name1} domine à ${chances.fighter1}% ⚡`;
        } else if (diff > 8) {
            return `${name1} est favori (${chances.fighter1}%)`;
        } else {
            return `${name1} légèrement favori (${chances.fighter1}%)`;
        }
    }
    if (chances.fighter2 > chances.fighter1) {
        if (diff > 15) {
            return `⚡ ${name2} domine à ${chances.fighter2}% ⚡`;
        } else if (diff > 8) {
            return `${name2} est favori (${chances.fighter2}%)`;
        } else {
            return `${name2} légèrement favori (${chances.fighter2}%)`;
        }
    }
    return `Match parfaitement équilibré (${chances.fighter1}% vs ${chances.fighter2}%)`;
}

/**
 * Reset
 */
function resetSelection() {
    fighter1 = null;
    fighter2 = null;
    
    fighter1Display.src = '';
    fighter1Display.classList.remove('active');
    fighter2Display.src = '';
    fighter2Display.classList.remove('active');
    
    document.querySelector('.left-slot').classList.remove('active');
    document.querySelector('.right-slot').classList.remove('active');
    vsText.classList.remove('active');
    
    document.querySelectorAll('.char-card').forEach(card => {
        card.classList.remove('selected', 'fighter1', 'fighter2');
    });
    
    compareBtn.disabled = true;
    resultBox.innerHTML = '';
    charactersGrid.style.display = '';
}

globalThis.characterSelect = {
    reset: resetSelection,
    fighter1: () => fighter1,
    fighter2: () => fighter2
};
