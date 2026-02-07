// ============================
// SCRIPT PRINCIPAL - LOGIQUE
// ============================

// ============================
// PROTECTION ANTI-DRAG
// ============================

document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
});

document.addEventListener('touchmove', function(e) {
    // Bloquer les gestes de défilement excessif
    if (e.cancelable) {
        e.preventDefault();
    }
}, { passive: false });

// Désactiver le drag sur toutes les images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.draggable = false;
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });
});

// ============================
// MENU TOGGLE - NAVIGATION
// ============================

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.globalheader');
    const toggle = document.getElementById('navToggle');


    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            toggle.classList.toggle('active');
            // Mettre à jour aria-expanded
            const isExpanded = nav.classList.contains('active');
            toggle.setAttribute('aria-expanded', isExpanded);
        });

        // Fermer le menu en cliquant sur un lien
        const navLinks = nav.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', false);
            });
        });
        
        // Fermer le menu avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                nav.classList.remove('active');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', false);
                toggle.focus();
            }
        });
    }
});

// ============================
// CLASSEMENT - RANKING.HTML
// =============================

function renderRanking(sortBy = 'points') {
    const rankingList = document.getElementById('rankingList');
    if (!rankingList) return;

    // Tri des joueurs
    let sortedPlayers = [...PLAYERS];
    
    if (sortBy === 'points') {
        sortedPlayers.sort((a, b) => b.points - a.points);
    } else if (sortBy === 'wins') {
        sortedPlayers.sort((a, b) => b.wins - a.wins);
    } else if (sortBy === 'name') {
        sortedPlayers.sort((a, b) => a.name.localeCompare(b.name));
    }

    rankingList.innerHTML = sortedPlayers.map((player, index) => {
        const rank = index + 1;
        let rankClass = '';
        let badge = '';

        if (rank === 1) {
            rankClass = 'top1';
            badge = 'TOP 1';
        } else if (rank <= 3) {
            rankClass = 'top3';
            badge = `🥈 TOP ${rank}`;
        }

        // Afficher points ou victoires selon le tri
        const displayValue = sortBy === 'wins' 
            ? `${player.wins} V` 
            : `${player.points.toLocaleString('fr-FR')} pts`;

        return `
            <div class="ranking-card ${rankClass}">
                <div class="rank-number">${rank}</div>

                <div class="rank-avatar">${player.name.charAt(0)}</div>

                <div class="rank-info">
                    <div class="rank-name">${player.name}</div>
                    <div class="rank-character">${player.mainCharacter}</div>
                </div>

                <div class="rank-points">${displayValue}</div>

                ${badge ? `<div class="rank-badge">${badge}</div>` : ''}
            </div>
        `;
    }).join('');
}

// ============================
// HISTORIQUE - HISTORIQUE.HTML
// ============================

function renderHistory(filterBy = 'all') {
    const historyList = document.getElementById('historyList');
    if (historyList === null) return;

    let filteredMatches = [...MATCHES];

    // Filtrer par date
    if (filterBy === 'recent') {
        const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
        filteredMatches = filteredMatches.filter(m => m.date > last24h);
    } else if (filterBy === 'week') {
        const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        filteredMatches = filteredMatches.filter(m => m.date > lastWeek);
    }

    // Tri du plus récent au plus ancien
    filteredMatches.sort((a, b) => b.date - a.date);

    historyList.innerHTML = filteredMatches.map(match => {
        const player1 = getPlayerById(match.player1Id);
        const player2 = getPlayerById(match.player2Id);
        const isPlayer1Winner = match.winner === match.player1Id;
        const winnerName = isPlayer1Winner ? player1.name : player2.name;

        return `
            <div class="match-card">
                <div class="match-winner">🏆 ${winnerName}</div>

                <div class="match-player">
                    <div class="match-player-name">${player1.name}</div>
                    <div class="match-player-character">${player1.mainCharacter}</div>
                </div>

                <div class="match-score">${match.score}</div>

                <div class="match-player">
                    <div class="match-player-name">${player2.name}</div>
                    <div class="match-player-character">${player2.mainCharacter}</div>
                </div>

                <div class="match-date">${getDateDiff(match.date)}</div>
            </div>
        `;
    }).join('');

    if (filteredMatches.length === 0) {
        historyList.innerHTML = '<p style="text-align:center; color: #999; padding: 40px;">Aucun match trouvé</p>';
    }
}

// ============================
// JOUEURS - JOUEURS.HTML
// ============================

function renderPlayers(searchQuery = '') {
    const playersList = document.getElementById('playersList');
    if (!playersList) return;

    let filteredPlayers = [...PLAYERS];

    // Filtrer par recherche
    if (searchQuery.trim()) {
        filteredPlayers = filteredPlayers.filter(player =>
            player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            player.mainCharacter.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Trier par points
    filteredPlayers.sort((a, b) => b.points - a.points);

    playersList.innerHTML = filteredPlayers.map((player, index) => {
        return `
            <div class="player-card">
                <div class="player-card-content">
                    <div class="player-card-name">${player.name}</div>
                    <button class="btn btn-primary player-detail-btn" type="button" data-player-id="${player.id}">VOIR LE PROFIL</button>
                </div>
            </div>
        `;
    }).join('');

    if (filteredPlayers.length === 0) {
        playersList.innerHTML = '<p style="text-align:center; color: #999; padding: 40px; grid-column: 1/-1;">Aucun joueur trouvé</p>';
    }
}

// ============================
// EVENT LISTENERS
// ============================

document.addEventListener('DOMContentLoaded', () => {
    // Classement - Tri
    document.querySelectorAll('.ranking-section .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.ranking-section .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderRanking(btn.dataset.sort);
        });
    });

    // Historique - Filtrage
    document.querySelectorAll('.history-section .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.history-section .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderHistory(btn.dataset.filter);
        });
    });

    // Joueurs - Recherche
    const playerSearch = document.getElementById('playerSearch');
    if (playerSearch) {
        playerSearch.addEventListener('input', (e) => {
            renderPlayers(e.target.value);
        });
    }

    // Joueurs - Navigation vers profil (CSP-safe)
    const playersList = document.getElementById('playersList');
    if (playersList && !playersList.dataset.bound) {
        playersList.addEventListener('click', (event) => {
            const button = event.target.closest('.player-detail-btn');
            if (!button) return;

            const playerId = Number.parseInt(button.dataset.playerId, 10);
            if (!Number.isNaN(playerId)) {
                goToPlayerDetail(playerId);
            }
        });

        playersList.dataset.bound = 'true';
    }

    // Affichage initial
    if (document.getElementById('rankingList')) {
        renderRanking('points');
    }
    if (document.getElementById('historyList')) {
        renderHistory('all');
    }
    if (document.getElementById('playersList')) {
        renderPlayers();
    }
});

// ============================
// FONCTION POUR AJOUTER UN MATCH (bonus)
// ============================

function addMatch(player1Id, player2Id, winnerId, stage) {
    const newMatch = {
        id: MATCHES.length + 1,
        player1Id,
        player2Id,
        winner: winnerId,
        date: new Date(),
        stage,
        score: '2-0' // À adapter selon vos besoins
    };
    
    MATCHES.unshift(newMatch);
    
    // Mettre à jour les points des joueurs
    const player1 = getPlayerById(player1Id);
    const player2 = getPlayerById(player2Id);
    
    if (winnerId === player1Id) {
        player1.points += 100;
        player1.wins++;
        player2.losses++;
    } else {
        player2.points += 100;
        player2.wins++;
        player1.losses++;
    }
    
    // Recalculer le win rate
    player1.winRate = (player1.wins / (player1.wins + player1.losses) * 100).toFixed(1);
    player2.winRate = (player2.wins / (player2.wins + player2.losses) * 100).toFixed(1);
    
    saveData();
    
    // Re-rendre les listes
    if (document.getElementById('rankingList')) renderRanking('points');
    if (document.getElementById('historyList')) renderHistory('all');
    if (document.getElementById('playersList')) renderPlayers();
}

// ============================
// NAVIGATION - DÉTAIL JOUEUR
// ============================

function goToPlayerDetail(playerId) {
    // Stocker l'ID du joueur dans sessionStorage
    sessionStorage.setItem('selectedPlayerId', playerId);
    // Rediriger vers la page de détail
    globalThis.location.href = 'player-detail.html';
}
