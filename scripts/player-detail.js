// ============================
// DÉTAIL JOUEUR - PLAYER-DETAIL.JS
// ============================

function generateBadges(player) {
    const badges = [];
    const add = (label) => {
        if (label && !badges.includes(label)) badges.push(label);
    };

    if (Number.isFinite(player.rank)) {
        if (player.rank === 1) add('Champion');
        if (player.rank <= 3) add('Top 3');
    }

    if (Number.isFinite(player.winRate) && player.winRate >= 70) add('High Winrate');
    if (Number.isFinite(player.wins) && player.wins >= 20) add('Veteran');
    if (Number.isFinite(player.losses) && player.losses === 0) add('Undefeated');

    const style = (player.style || '').toLowerCase();
    if (style.includes('agressif')) add('Aggro Player');
    if (style.includes('zoner')) add('Zoner');

    if (player.mainCharacter) add(`Main ${player.mainCharacter}`);

    return badges;
}

function renderPlayerDetail() {
    const container = document.getElementById('playerDetailContainer');
    if (!container) return;

    const playerId = sessionStorage.getItem('selectedPlayerId');
    if (!playerId) {
        container.innerHTML = '<p style="text-align:center; color: #999; padding: 40px;">Joueur non trouvé</p>';
        return;
    }

    const player = PLAYERS.find(p => p.id === Number.parseInt(playerId, 10));
    if (!player) {
        container.innerHTML = '<p style="text-align:center; color: #999; padding: 40px;">Joueur non trouvé</p>';
        return;
    }

    const defaultWinRate = Number.isFinite(player.winRate)
        ? player.winRate
        : Number.parseFloat(player.winRate) || 0;

    const quote = player.quote || 'Toujours prêt à smash la compétition.';
    const mainStats = player.mainStats || {
        winrate: defaultWinRate.toFixed(1),
        killMove: 'Up Smash',
        strongVs: 'Donkey Kong',
        weakVs: 'Pikachu',
        killPercent: 118,
        hoursPlayed: 42
    };

    const styleStats = player.styleStats || {
        aggro: 80,
        neutral: 60,
        punish: 90,
        edgeguard: 75,
        mindgame: 85
    };

    const recentMatches = player.recentMatches || [];
    const badges = (Array.isArray(player.badges) && player.badges.length > 0)
        ? player.badges
        : generateBadges(player);

    container.innerHTML = `
        <div class="player-detail-header">
            <div class="player-detail-avatar">${player.name.charAt(0)}</div>
            <div class="player-detail-info">
                <h1 class="player-detail-name">${player.name}</h1>
                <p class="player-detail-style">${player.style}</p>
                <p class="player-quote">"${quote}"</p>
                <div class="player-badges">
                    ${(badges?.length)
                        ? badges.map(b => `<span class="player-badge">${b}</span>`).join('')
                        : '<span class="player-badge">Rookie</span>'}
                </div>
            </div>
        </div>

        <div class="player-detail-main">
            <div class="player-detail-character">
                <h2 class="detail-section-title">PERSONNAGE PRINCIPAL</h2>
                <div class="holo-card" id="holoCard" data-rarity="trainer gallery rare holo" data-trainer-gallery="true" aria-label="Carte holographique du main">
                    <div class="foil"></div>
                    <img class="holo-main-image" src="../images/${player.mainImage || 'placeholder.png'}" alt="${player.mainCharacter}">
                </div>
                <div class="character-display">${player.mainCharacter}</div>

                <div class="character-stats">
                    <h3>Statistiques du main</h3>
                    <ul>
                        <li>Winrate : ${mainStats.winrate}%</li>
                        <li>Kill move principal : ${mainStats.killMove}</li>
                        <li>Matchup fort : ${mainStats.strongVs}</li>
                        <li>Matchup faible : ${mainStats.weakVs}</li>
                        <li>% moyen de kill : ${mainStats.killPercent}%</li>
                        <li>Temps de jeu estimé : ${mainStats.hoursPlayed}h</li>
                    </ul>
                </div>
            </div>

            <div class="player-detail-secondary">
                <h2 class="detail-section-title">PERSONNAGES SECONDAIRES</h2>
                <div class="character-list">
                    ${player.secondaryCharacters.map(char => `<span class="character-tag">${char}</span>`).join('')}
                </div>

                <div class="style-bars">
                    <h3>Style de jeu</h3>
                    ${Object.entries(styleStats).map(([key, value]) => `
                        <div class="style-bar">
                            <span>${key.toUpperCase()}</span>
                            <div class="bar">
                                <div class="bar-fill" style="width:${value}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <div class="player-detail-stats">
            <h2 class="detail-section-title">STATISTIQUES GÉNÉRALES</h2>
            <div class="stats-grid">
                <div class="stat-box"><div class="stat-label">POINTS</div><div class="stat-large">${player.points.toLocaleString('fr-FR')}</div></div>
                <div class="stat-box"><div class="stat-label">VICTOIRES</div><div class="stat-large">${player.wins}</div></div>
                <div class="stat-box"><div class="stat-label">DÉFAITES</div><div class="stat-large">${player.losses}</div></div>
                <div class="stat-box"><div class="stat-label">WIN RATE</div><div class="stat-large">${defaultWinRate.toFixed(1)}%</div></div>
            </div>
        </div>

        <div class="player-recent-matches">
            <h2 class="detail-section-title">MATCHS RÉCENTS</h2>
            <div class="recent-matches-list">
                ${recentMatches.length === 0 
                    ? '<p>Aucun match récent</p>'
                    : recentMatches.map(m => `
                        <div class="recent-match">
                            <span>${m.opponent}</span>
                            <span class="${m.result === 'Win' ? 'win' : 'loss'}">${m.result}</span>
                            <span>${m.score}</span>
                        </div>
                    `).join('')
                }
            </div>
        </div>

        <div class="player-detail-actions">
            <a href="joueurs.html" class="btn btn-secondary">RETOUR AUX JOUEURS</a>
        </div>
    `;

    initHoloCard();
}

function initHoloCard() {
    const card = document.getElementById('holoCard');
    if (!card) return;

    const reset = () => {
        card.style.setProperty('--x', 0.5);
        card.style.setProperty('--y', 0.5);
        card.style.setProperty('--pointer-x', '50%');
        card.style.setProperty('--pointer-y', '50%');
        card.style.setProperty('--pointer-from-center', '0');
    };

    reset();

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        // Calcul de la distance au centre
        const centerX = 0.5;
        const centerY = 0.5;
        const distanceX = Math.abs(x - centerX);
        const distanceY = Math.abs(y - centerY);
        const pointerFromCenter = Math.hypot(distanceX, distanceY);
        
        card.style.setProperty('--x', x.toFixed(3));
        card.style.setProperty('--y', y.toFixed(3));
        card.style.setProperty('--pointer-x', (x * 100).toFixed(1) + '%');
        card.style.setProperty('--pointer-y', (y * 100).toFixed(1) + '%');
        card.style.setProperty('--pointer-from-center', Math.min(pointerFromCenter * 1.5, 1).toFixed(3));
    });

    card.addEventListener('mouseleave', reset);
}

function setupPlayerNavigation() {
    const currentId = Number.parseInt(sessionStorage.getItem("selectedPlayerId"), 10);
    const index = PLAYERS.findIndex(p => p.id === currentId);

    const prevBtn = document.getElementById("prevDetail");
    const nextBtn = document.getElementById("nextDetail");

    if (!prevBtn || !nextBtn) return;

    const currentIndex = index >= 0 ? index : 0;

    prevBtn.addEventListener("click", () => {
        const prevIndex = (currentIndex - 1 + PLAYERS.length) % PLAYERS.length;
        sessionStorage.setItem("selectedPlayerId", PLAYERS[prevIndex].id);
        location.reload();
    });

    nextBtn.addEventListener("click", () => {
        const nextIndex = (currentIndex + 1) % PLAYERS.length;
        sessionStorage.setItem("selectedPlayerId", PLAYERS[nextIndex].id);
        location.reload();
    });
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', () => {
    renderPlayerDetail();
    setupPlayerNavigation();
});
