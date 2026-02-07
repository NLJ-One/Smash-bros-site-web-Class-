// ============================
// STATS GLOBALES ANIMÉES
// ============================

document.addEventListener("DOMContentLoaded", () => {
    animateCounters();
    animateBars();
    loadTopCharacters();
});

function animateCounters() {
    if (!Array.isArray(PLAYERS) || PLAYERS.length === 0) return;

    const totalMatches = PLAYERS.reduce((acc, p) => acc + (p.wins || 0) + (p.losses || 0), 0);
    const totalPlayers = PLAYERS.length;
    const avgWinrate = Math.round(
        PLAYERS.reduce((acc, p) => acc + (p.winRate || 0), 0) / totalPlayers
    );

    animateNumber("statTotalMatches", totalMatches, 2000);
    animateNumber("statPlayers", totalPlayers, 1500);
    animateNumber("statAvgWinrate", avgWinrate, 1500, "%");

    const allMains = PLAYERS.map(p => p.mainCharacter).filter(Boolean);
    const mostPlayed = mode(allMains) || "—";
    const mostPlayedEl = document.getElementById("statMostPlayed");
    if (mostPlayedEl) mostPlayedEl.textContent = mostPlayed;

    animateNumber("statFastestMatch", 12, 1200, "s");
}

function animateNumber(id, end, duration, suffix = "") {
    const el = document.getElementById(id);
    if (!el) return;

    let start = 0;
    const frame = 16;
    const steps = Math.max(Math.floor(duration / frame), 1);
    const increment = end / steps;

    const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
            start = end;
            clearInterval(interval);
        }
        el.textContent = `${Math.floor(start)}${suffix}`;
    }, frame);
}

function animateBars() {
    const week = document.getElementById("barWeek");
    const month = document.getElementById("barMonth");
    const season = document.getElementById("barSeason");
    if (!week || !month || !season) return;

    setTimeout(() => {
        week.style.width = "70%";
        month.style.width = "55%";
        season.style.width = "90%";
    }, 400);
}

function loadTopCharacters() {
    const container = document.getElementById("top3Characters");
    if (!container || !Array.isArray(PLAYERS)) return;

    const counts = {};
    PLAYERS.forEach(p => {
        if (!p.mainCharacter) return;
        counts[p.mainCharacter] = (counts[p.mainCharacter] || 0) + 1;
    });

    const sorted = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    if (!sorted.length) {
        container.innerHTML = "<p>Aucune donnée disponible.</p>";
        return;
    }

    container.innerHTML = sorted.map(([char]) => {
        const safeName = String(char);
        const imgName = safeName.toLowerCase().replaceAll(/\s+/g, '-');
        const match = Array.isArray(CHARACTERS)
            ? CHARACTERS.find(c => String(c.name).toLowerCase() === safeName.toLowerCase())
            : null;
        const image = match?.image || `${imgName}.png`;
        return `
            <div class="top3-char-card">
                <img src="../images/characters/${image}" alt="${safeName}">
                <h3>${safeName}</h3>
            </div>
        `;
    }).join("");
}

function mode(arr) {
    if (!Array.isArray(arr) || !arr.length) return null;
    const freq = {};
    arr.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
    return Object.entries(freq).reduce((best, curr) => curr[1] > best[1] ? curr : best, [null, 0])[0];
}
