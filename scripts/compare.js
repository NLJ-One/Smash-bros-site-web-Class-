// ============================
// COMPARATEUR PREMIUM PERSONNAGES
// ============================

document.addEventListener("DOMContentLoaded", () => {
    const left = document.getElementById("compareLeft");
    const right = document.getElementById("compareRight");
    const btn = document.getElementById("compareBtn");
    const result = document.getElementById("compareResult");

    if (!left || !right || !btn || !result) return;

    const characters = Array.isArray(CHARACTERS) ? CHARACTERS : [];
    if (!characters.length) {
        result.innerHTML = "<p>Aucun personnage disponible.</p>";
        return;
    }

    // Récupérer les paramètres URL depuis fighter-select.html
    const urlParams = new URLSearchParams(globalThis.location.search);
    const urlLeft = urlParams.get('left');
    const urlRight = urlParams.get('right');

    const populateSelects = () => {
        left.innerHTML = "";
        right.innerHTML = "";

        characters.forEach((c, idx) => {
            const option = `<option value="${c.id}">${c.name}</option>`;
            left.insertAdjacentHTML('beforeend', option);
            right.insertAdjacentHTML('beforeend', option);
        });

        // Préférer les paramètres URL s'ils existent
        if (urlLeft) {
            const leftChar = characters.find(c => c.name === urlLeft);
            if (leftChar) left.value = leftChar.id;
        } else if (characters[0]) {
            left.value = characters[0].id;
        }

        if (urlRight) {
            const rightChar = characters.find(c => c.name === urlRight);
            if (rightChar) right.value = rightChar.id;
        } else if (characters[1]) {
            right.value = characters[1].id;
        }
    };

    const renderStatLine = (label, value, oppValue) => {
        const safeValue = Number(value) || 0;
        const safeOpp = Number(oppValue) || 0;
        const isWin = safeValue > safeOpp;
        const width = Math.min(Math.max(safeValue * 10, 0), 100);

        return `
            <div class="compare-stat-line">
                <span class="compare-stat-label">${label.toUpperCase()}</span>
                <div class="compare-bar">
                    <div class="compare-fill ${isWin ? "compare-fill-win" : ""}" style="width:${width}%"></div>
                </div>
                <span class="compare-value ${isWin ? "compare-win" : ""}">${safeValue}/10</span>
            </div>
        `;
    };

    const renderList = (items) => {
        if (!Array.isArray(items) || !items.length) return "<li>-</li>";
        return items.map(i => `<li>${i}</li>`).join("");
    };

    const renderCompareCard = (c, opponent) => {
        if (!c) return "";
        const opp = opponent || { stats: {} };

        return `
            <div class="compare-card">
                <img src="../images/characters/${c.image}" alt="${c.name}">
                <div class="compare-name">${c.name}</div>
                <div class="compare-type">${c.type}</div>

                <div class="compare-stats">
                    ${Object.entries(c.stats || {}).map(([key, val]) => renderStatLine(key, val, opp.stats?.[key])).join("")}
                </div>

                <h3>Forces</h3>
                <ul>${renderList(c.strengths)}</ul>

                <h3>Faiblesses</h3>
                <ul>${renderList(c.weaknesses)}</ul>

                <h3>Matchups</h3>
                <p><strong>Fort contre :</strong> ${(c.matchups?.strongVs || []).join(", ") || '-'}</p>
                <p><strong>Faible contre :</strong> ${(c.matchups?.weakVs || []).join(", ") || '-'}</p>
            </div>
        `;
    };

    const renderComparison = () => {
        const c1 = characters.find(c => String(c.id) === String(left.value));
        const c2 = characters.find(c => String(c.id) === String(right.value));

        if (!c1 || !c2) {
            result.innerHTML = "<p>Sélectionne deux personnages à comparer.</p>";
            return;
        }

        result.innerHTML = `
            <div class="compare-grid">
                ${renderCompareCard(c1, c2)}
                ${renderCompareCard(c2, c1)}
            </div>
        `;
    };

    populateSelects();
    btn.addEventListener("click", renderComparison);
    renderComparison();
});
