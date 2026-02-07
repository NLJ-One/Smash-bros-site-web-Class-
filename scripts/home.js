// ============================
// SCRIPT ACCUEIL - HOME.JS AMÉLIORÉ
// ============================

// Base de données des actualités
const NEWS = [
    {
        id: 1,
        title: "SHADOW CHAMPION",
        description: "Shadow remporte le tournoi avec un score impressionnant de 2-0",
        date: new Date(2026, 0, 22),
        image: "TROPHY",
        type: "résultat"
    },
    {
        id: 2,
        title: "NOUVEAU JOUEUR",
        description: "Blaze intègre la ligue avec des performances remarquables",
        date: new Date(2026, 0, 20),
        image: "STAR",
        type: "joueur"
    },
    {
        id: 3,
        title: "MATCH DE FOLIE",
        description: "Venom vs Phantom : un match épique de 3 sets remporté par Venom",
        date: new Date(2026, 0, 19),
        image: "FIRE",
        type: "match"
    },
    {
        id: 4,
        title: "RECORD DE POINTS",
        description: "Inferno établit un nouveau record personnel avec 4380 points",
        date: new Date(2026, 0, 18),
        image: "CHART",
        type: "record"
    },
    {
        id: 5,
        title: "PATCH FIGHTER",
        description: "Nouvelle mise à jour équilibrée pour tous les personnages",
        date: new Date(2026, 0, 16),
        image: "GEAR",
        type: "update"
    }
];

// ============================
// RENDU - ACTUALITÉS CAROUSEL
// ============================

function renderNews() {
    const carousel = document.getElementById('newsCarousel');
    if (!carousel) return;

    // Map des symboles pour remplacer les emojis
    const symbolMap = {
        'TROPHY': '▲',
        'STAR': '★',
        'FIRE': '⚡',
        'CHART': '▬',
        'GEAR': '◆'
    };

    carousel.innerHTML = NEWS.map(news => {
        const daysAgo = Math.floor((Date.now() - news.date.getTime()) / (1000 * 60 * 60 * 24));
        const dateText = daysAgo === 0 ? "Aujourd'hui" : `Il y a ${daysAgo}j`;
        const symbol = symbolMap[news.image] || news.image;

        return `
            <div class="news-card">
                <div class="news-icon">${symbol}</div>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-description">${news.description}</p>
                <div class="news-date">${dateText}</div>
            </div>
        `;
    }).join('');

    // Initialiser Slick Slider
    $('#newsCarousel').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
}

// ============================
// RENDU - JOUEURS DE LA SEMAINE
// ============================

function renderFeaturedPlayers() {
    const featured = document.getElementById('featuredPlayers');
    if (!featured) return;

    const top3 = [...PLAYERS].sort((a, b) => b.points - a.points).slice(0, 3);
    
    featured.innerHTML = top3.map((player, index) => {
        const medals = ['1st', '2nd', '3rd'];
        const delays = ['0.05s', '0.15s', '0.25s'];
        
        return `
            <div class="featured-card" style="animation-delay: ${delays[index]};">
                <div class="featured-medal">${medals[index]}</div>
                <div class="featured-avatar">${player.name.charAt(0)}</div>
                <h3 class="featured-name">${player.name}</h3>
                <p class="featured-main">Main: ${player.mainCharacter}</p>
                <p class="featured-stats">${player.points} PTS • ${player.wins}V</p>
            </div>
        `;
    }).join('');
}

/* Duplicate function removal: keep HYBRID version below */

// ============================
// RENDU - STATISTIQUES GLOBALES
// ============================

function renderGlobalStats() {
    const totalMatches = MATCHES.length;
    const totalPlayers = PLAYERS.length;
    const totalPoints = PLAYERS.reduce((sum, p) => sum + p.points, 0);
    const avgWinRate = (PLAYERS.reduce((sum, p) => sum + p.winRate, 0) / PLAYERS.length).toFixed(1);

    const statsDisplay = {
        totalMatches: document.getElementById('totalMatches'),
        totalPlayers: document.getElementById('totalPlayers'),
        totalPoints: document.getElementById('totalPoints'),
        avgWinRate: document.getElementById('avgWinRate')
    };

    if (statsDisplay.totalMatches) statsDisplay.totalMatches.textContent = totalMatches;
    if (statsDisplay.totalPlayers) statsDisplay.totalPlayers.textContent = totalPlayers;
    if (statsDisplay.totalPoints) statsDisplay.totalPoints.textContent = totalPoints.toLocaleString('fr-FR');
    if (statsDisplay.avgWinRate) statsDisplay.avgWinRate.textContent = avgWinRate + '%';
}


// ============================
// FIN DU SCRIPT
// ===========================

// ============================
// INITIALISATION
// ============================

document.addEventListener('DOMContentLoaded', () => {
    renderNews();
    renderFeaturedPlayers();
    renderTop3Display();
    renderGlobalStats();
});

// ============================
// RENDU - TOP 3 HYBRID
// ============================

function renderTop3Display() {
    const top3Display = document.getElementById('top3Display');
    if (!top3Display) return;

    let sortedPlayers = [...PLAYERS].sort((a, b) => b.points - a.points);
    const top3 = sortedPlayers.slice(0, 3);

    const top3HTML = `
        <div class="top3-hybrid">
            <div class="top-card top1">
                <div class="top-badge">CHAMPION</div>
                <div class="top-avatar">${top3[0].name.charAt(0)}</div>
                <div class="top-name">${top3[0].name}</div>
                <div class="top-character">${top3[0].mainCharacter}</div>
                <div class="top-power">${top3[0].points.toLocaleString('fr-FR')} pts</div>
            </div>
            <div class="top-row">
                <div class="top-card top2">
                    <div class="top-badge">#2</div>
                    <div class="top-avatar">${top3[1].name.charAt(0)}</div>
                    <div class="top-name">${top3[1].name}</div>
                    <div class="top-character">${top3[1].mainCharacter}</div>
                    <div class="top-power">${top3[1].points.toLocaleString('fr-FR')} pts</div>
                </div>
                <div class="top-card top3">
                    <div class="top-badge">#3</div>
                    <div class="top-avatar">${top3[2].name.charAt(0)}</div>
                    <div class="top-name">${top3[2].name}</div>
                    <div class="top-character">${top3[2].mainCharacter}</div>
                    <div class="top-power">${top3[2].points.toLocaleString('fr-FR')} pts</div>
                </div>
            </div>
        </div>
    `;

    top3Display.innerHTML = top3HTML;
}
