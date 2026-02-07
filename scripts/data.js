// ============================
// BASE DE DONNÉES - JOUEURS
// ============================

const PLAYERS = [
    {
        id: 1,
        name: "NLJ",
        mainCharacter: "Fox",
        secondaryCharacters: ["Rob", "King K. Rool"],
        mainImage: "characters/Fox.jpg",
        points: 100,
        wins: 0,
        losses: 0,
        winRate: 0,
        style: "Zoner / Rushdown"
    },
    {
        id: 2,
        name: "Tai-Loc",
        mainCharacter: "Diddy Kong",
        secondaryCharacters: ["Samus"],
        mainImage: "characters/diddy-kong.png",
        points: 100,
        wins: 0,
        losses: 0,
        winRate: 0,
        style: "Rushdown / Banana Control"
    },
    {
        id: 3,
        name: "KLN",
        mainCharacter: "Kirby",
        secondaryCharacters: ["Pit"],
        mainImage: "characters/Kirby.jpg",
        quote: "C’est quand tout semble perdu qu’il faut sourire",
        points: 100,
        wins: 0,
        losses: 0,
        winRate: 0,
        style: "Aerial / Mixups"
    },
    {
        id: 4,
        name: "Ben",
        mainCharacter: "Captain Falcon",
        secondaryCharacters: ["Donkey Kong"],
        mainImage: "characters/captain falcon.jpg",
        points: 100,
        wins: 0,
        losses: 0,
        winRate: 0,
        style: "Rushdown / Grappler"
    },
    {
        id: 5,
        name: "Dân Siteu",
        mainCharacter: "Yoshi",
        secondaryCharacters: ["Non précisé"],
        mainImage: "characters/yoshi.png",
        quote: "Il faut savoir rendre le mal par le mal comme ça le mal va savoir que le mal fait mal",
        points: 100,
        wins: 0,
        losses: 0,
        winRate: 0,
        style: "Rushdown / Aerial"
    },
    {
        id: 6,
        name: "bright",
        mainCharacter: "Mario",
        secondaryCharacters: ["Diddy Kong"],
        mainImage: "characters/Mario.jpg",
        points: 100,
        wins: 0,
        losses: 0,
        winRate: 0,
        style: "Non précisé"
    },
    {
        id: 7,
        name: "Stan",
        mainCharacter: "Mewtwo",
        secondaryCharacters: ["King K. Rool"],
        mainImage: "characters/mewtwo.jpg",
        points: 100,
        wins: 0,
        losses: 0,
        winRate: 0,
        style: "Non précisé"
    }
];

// ============================
// BASE DE DONNÉES - MATCHS
// ============================

const MATCHES = [];

// ============================
// FONCTIONS UTILITAIRES
// ============================

function getPlayerById(id) {
    return PLAYERS.find(p => p.id === id);
}

function getPlayerByName(name) {
    return PLAYERS.find(p => p.name.toLowerCase() === name.toLowerCase());
}

function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
}

function getDateDiff(date) {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 7) return `${Math.floor(days / 7)} semaines`;
    if (days > 0) return `${days} jour${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} heure${hours > 1 ? 's' : ''}`;
    return "À l'instant";
}

// Stockage local pour ajouter des joueurs/matchs
function saveData() {
    localStorage.setItem('smash-arena-players', JSON.stringify(PLAYERS));
    localStorage.setItem('smash-arena-matches', JSON.stringify(MATCHES));
}

function loadData() {
    // Force mise à jour avec les données initiales
    localStorage.setItem('smash-arena-players', JSON.stringify(PLAYERS));
    localStorage.setItem('smash-arena-matches', JSON.stringify(MATCHES));
}

// Charger les données au démarrage
loadData();

// ============================
// RECALCUL AUTOMATIQUE DES STATS
// ============================

function parseScore(score) {
    if (typeof score !== 'string') return { s1: 0, s2: 0 };
    const parts = score.split('-').map(part => Number.parseInt(part.trim(), 10));
    const [s1 = 0, s2 = 0] = parts;
    return { s1: Number.isFinite(s1) ? s1 : 0, s2: Number.isFinite(s2) ? s2 : 0 };
}

function getWinner(match) {
    if (Number.isFinite(match.winner)) return match.winner;
    const { s1, s2 } = parseScore(match.score);
    if (s1 > s2) return match.player1Id;
    if (s2 > s1) return match.player2Id;
    return null; // égalité
}

function updatePlayerStatsAdvanced(player, opponent, didWin, scoreDiff) {
    if (!player || !opponent) return;

    if (didWin) {
        let gain = 20;
        if ((opponent.points || 0) > (player.points || 0)) gain += 10;
        if (scoreDiff >= 2) gain += 5;
        player.points = (player.points || 0) + gain;
        player.wins = (player.wins || 0) + 1;
    } else {
        let gain = 5;
        if (scoreDiff === 1) gain += 5; // match serré
        player.points = (player.points || 0) + gain;
        player.losses = (player.losses || 0) + 1;
    }

    const total = (player.wins || 0) + (player.losses || 0);
    player.winRate = total > 0 ? ((player.wins / total) * 100) : 0;
}

function recalculateAllStats() {
    // Sauvegarder les points de base de chaque joueur
    const basePoints = PLAYERS.map(p => ({ id: p.id, points: p.points }));
    
    // Reset des stats de match
    PLAYERS.forEach(p => {
        p.wins = 0;
        p.losses = 0;
        p.winRate = 0;
    });

    MATCHES.forEach(match => {
        const p1 = getPlayerById(match.player1Id);
        const p2 = getPlayerById(match.player2Id);
        if (!p1 || !p2) return;

        const winnerId = getWinner(match);
        const { s1, s2 } = parseScore(match.score);
        const scoreDiff = Math.abs(s1 - s2);

        if (winnerId === p1.id) {
            updatePlayerStatsAdvanced(p1, p2, true, scoreDiff);
            updatePlayerStatsAdvanced(p2, p1, false, scoreDiff);
        } else if (winnerId === p2.id) {
            updatePlayerStatsAdvanced(p2, p1, true, scoreDiff);
            updatePlayerStatsAdvanced(p1, p2, false, scoreDiff);
        }
    });
    
    // Restaurer les points de base si pas de matchs
    if (MATCHES.length === 0) {
        PLAYERS.forEach(p => {
            const baseData = basePoints.find(bp => bp.id === p.id);
            if (baseData) p.points = baseData.points;
        });
    }
}

recalculateAllStats();
