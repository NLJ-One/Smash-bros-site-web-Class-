// ============================
// TOP 3 DYNAMIC ANIMATIONS
// Podium Glow, Medal Bounce, Stats Animations
// ============================

class Top3Manager {
    constructor() {
        this.init();
    }
    
    init() {
        this.renderTop3();
        this.addEventListeners();
        this.startAnimations();
    }
    
    renderTop3() {
        const top3Display = document.getElementById('top3Display');
        if (!top3Display) return;
        
        // Récupérer les top 3 joueurs
        const top3Players = PLAYERS.slice(0, 3);
        
        top3Display.innerHTML = '';
        top3Display.className = 'top3-display-new';
        
        // Créer les éléments du podium
        const podiumHTML = `
            <div class="podium-container">
                <!-- DEUXIÈME PLACE (GAUCHE) -->
                <div class="podium-position medal-2" style="order: 1;">
                    <div class="podium-medal second-place">
                        <div class="medal-number">2</div>
                    </div>
                    <div class="podium-card">
                        <img src="images/${top3Players[1].mainImage}" alt="${top3Players[1].name}">
                        <h3>${top3Players[1].name}</h3>
                        <p class="character-name">${top3Players[1].mainCharacter}</p>
                        <div class="points-display">
                            <span class="points-value">${top3Players[1].points.toLocaleString('fr-FR')}</span>
                            <span class="points-label">PTS</span>
                        </div>
                        <div class="stats-mini">
                            <span>W: ${top3Players[1].wins}</span>
                            <span>L: ${top3Players[1].losses}</span>
                        </div>
                    </div>
                </div>
                
                <!-- PREMIÈRE PLACE (CENTRE) -->
                <div class="podium-position medal-1 champion" style="order: 2;">
                    <div class="podium-medal first-place">
                        <div class="medal-number">1</div>
                        <div class="medal-glow"></div>
                    </div>
                    <div class="podium-card champion-card">
                        <div class="champion-badge">CHAMPION</div>
                        <img src="images/${top3Players[0].mainImage}" alt="${top3Players[0].name}">
                        <h3>${top3Players[0].name}</h3>
                        <p class="character-name">${top3Players[0].mainCharacter}</p>
                        <div class="points-display">
                            <span class="points-value">${top3Players[0].points.toLocaleString('fr-FR')}</span>
                            <span class="points-label">PTS</span>
                        </div>
                        <div class="stats-mini">
                            <span>W: ${top3Players[0].wins}</span>
                            <span>L: ${top3Players[0].losses}</span>
                        </div>
                        <div class="winrate-display">${top3Players[0].winRate.toFixed(1)}% WR</div>
                    </div>
                </div>
                
                <!-- TROISIÈME PLACE (DROITE) -->
                <div class="podium-position medal-3" style="order: 3;">
                    <div class="podium-medal third-place">
                        <div class="medal-number">3</div>
                    </div>
                    <div class="podium-card">
                        <img src="images/${top3Players[2].mainImage}" alt="${top3Players[2].name}">
                        <h3>${top3Players[2].name}</h3>
                        <p class="character-name">${top3Players[2].mainCharacter}</p>
                        <div class="points-display">
                            <span class="points-value">${top3Players[2].points.toLocaleString('fr-FR')}</span>
                            <span class="points-label">PTS</span>
                        </div>
                        <div class="stats-mini">
                            <span>W: ${top3Players[2].wins}</span>
                            <span>L: ${top3Players[2].losses}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        top3Display.innerHTML = podiumHTML;
    }
    
    addEventListeners() {
        const podiumCards = document.querySelectorAll('.podium-card');
        podiumCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.05) translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1) translateY(0)';
            });
            
            card.addEventListener('click', () => {
                const playerName = card.querySelector('h3').textContent;
                globalThis.notificationManager?.show(`${playerName} en détail`, 'ranking');
            });
        });
    }
    
    startAnimations() {
        // Animation des médailles au chargement
        const medals = document.querySelectorAll('.podium-medal');
        medals.forEach((medal, index) => {
            medal.style.animation = `medalBounce 2.${index}s ease-in-out infinite ${index * 0.2}s`;
        });
    }
}

// Initialiser Top 3 Manager
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('top3Display')) {
        globalThis.top3Manager = new Top3Manager();
    }
});

// Exporter
globalThis.Top3Manager = Top3Manager;
