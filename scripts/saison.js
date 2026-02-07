// ============================
// SAISON - PAGE RÉCAP
// ============================

document.addEventListener("DOMContentLoaded", () => {
    loadSeasonChampion();
    loadSeasonStats();
    loadSeasonTop5();
    loadSeasonRecords();
    loadSeasonCharacters();
    animateItems();
});

function animateItems() {
    document.querySelectorAll(".animated-item").forEach((item, i) => {
        item.style.setProperty("--delay", `${i * 0.1}s`);
    });
}

function animateNumber(id, end, duration, suffix = "") {
    const el = document.getElementById(id);
    if (!el) return;
    let start = 0;
    const frame = 16;
    const steps = Math.max(Math.floor(duration / frame), 1);
    const inc = end / steps;
    const interval = setInterval(() => {
        start += inc;
        if (start >= end) {
            start = end;
            clearInterval(interval);
        }
        el.textContent = `${Math.floor(start)}${suffix}`;
    }, frame);
}

function loadSeasonChampion() {
    if (!Array.isArray(PLAYERS) || !PLAYERS.length) return;
    const sorted = [...PLAYERS].sort((a, b) => (b.points || 0) - (a.points || 0));
    const champ = sorted[0];
    const target = document.getElementById("seasonChampion");
    if (!target || !champ) return;
    const champPoints = Number.isFinite(champ.points) ? champ.points : 0;
    const champWR = Number.isFinite(champ.winRate) ? champ.winRate : 0;
    target.innerHTML = `
        <h1>${champ.name}</h1>
        <p>${champPoints.toLocaleString('fr-FR')} points</p>
        <p>${champWR.toFixed(1)}% WR</p>
    `;
}

function loadSeasonStats() {
    const totalMatches = Array.isArray(MATCHES) ? MATCHES.length : 0;
    const totalPlayers = Array.isArray(PLAYERS) ? PLAYERS.length : 0;
    const avgWinrate = totalPlayers
        ? Math.round(PLAYERS.reduce((acc, p) => acc + (p.winRate || 0), 0) / totalPlayers)
        : 0;

    animateNumber("seasonMatches", totalMatches, 2000);
    animateNumber("seasonPlayers", totalPlayers, 1500);
    animateNumber("seasonAvgWinrate", avgWinrate, 1500, "%");
}

function loadSeasonTop5() {
    if (!Array.isArray(PLAYERS)) return;
    const top5 = [...PLAYERS].sort((a, b) => (b.points || 0) - (a.points || 0)).slice(0, 5);
    const container = document.getElementById("seasonTop5");
    if (!container) return;
    container.innerHTML = top5.map(p => {
        const pts = Number.isFinite(p.points) ? p.points : 0;
        const wr = Number.isFinite(p.winRate) ? p.winRate : 0;
        return `
        <div class="top5-card animated-item">
            <h3>${p.name}</h3>
            <p>${pts.toLocaleString('fr-FR')} pts</p>
            <p>${wr.toFixed(1)}% WR</p>
        </div>
    `;
    }).join("");
}

function loadSeasonRecords() {
    if (!Array.isArray(PLAYERS) || !Array.isArray(MATCHES)) return;
    const streak = Math.max(...PLAYERS.map(p => p.streak || 0), 0);

    const fastest = MATCHES.reduce((best, m) => {
        const dur = m.duration || null;
        if (dur === null || dur === undefined) return best;
        return Math.min(best, dur);
    }, Infinity);

    const brutal = MATCHES.reduce((best, m) => {
        const { s1, s2 } = parseScore(m.score || "0-0");
        const diff = Math.abs(s1 - s2);
        const current = { diff, text: `${s1}-${s2}` };
        if (!best || current.diff > best.diff) return current;
        return best;
    }, null);

    const streakEl = document.getElementById("recordStreak");
    const fastEl = document.getElementById("recordFastest");
    const brutalEl = document.getElementById("recordBrutal");

    if (streakEl) streakEl.textContent = streak === 0 ? "—" : `${streak} victoires`;
    if (fastEl) fastEl.textContent = fastest === Infinity ? "—" : `${fastest}s`;
    if (brutalEl) brutalEl.textContent = brutal ? brutal.text : "—";
}

function loadSeasonCharacters() {
    if (!Array.isArray(PLAYERS)) return;
    const container = document.getElementById("seasonTopCharacters");
    if (!container) return;

    const counts = {};
    PLAYERS.forEach(p => {
        if (!p.mainCharacter) return;
        counts[p.mainCharacter] = (counts[p.mainCharacter] || 0) + 1;
    });

    const top3 = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    if (!top3.length) {
        container.innerHTML = "<p>Aucune donnée disponible.</p>";
        return;
    }

    container.innerHTML = top3.map(([char]) => {
        const safeName = String(char);
        const imgName = safeName.toLowerCase().replaceAll(/\s+/g, '-');
        const match = Array.isArray(CHARACTERS)
            ? CHARACTERS.find(c => String(c.name).toLowerCase() === safeName.toLowerCase())
            : null;
        const image = match?.image || `${imgName}.png`;
        return `
            <div class="season-char-card animated-item">
                <img src="../images/characters/${image}" alt="${safeName}">
                <h3>${safeName}</h3>
            </div>
        `;
    }).join("");
}
