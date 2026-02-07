// ============================
// DÉTAIL PERSONNAGE - CHARACTER-DETAIL.JS
// ============================

function renderCharacterDetail() {
    const id = sessionStorage.getItem('selectedCharacter');
    const character = Array.isArray(CHARACTERS)
        ? CHARACTERS.find(c => c.id === id)
        : null;

    const container = document.getElementById('characterDetailContainer');
    if (!container) return;

    if (!character) {
        container.innerHTML = '<p>Personnage introuvable.</p>';
        return;
    }

    const renderStats = () => Object.entries(character.stats).map(([key, value]) => `
        <div class="stat-item">
            <span class="stat-label">${key.toUpperCase()}</span>
            <div class="stat-bar">
                <div class="stat-fill" style="width:${value * 10}%"></div>
            </div>
            <span class="stat-value">${value}/10</span>
        </div>
    `).join('');

    const videoUrl = character.videoUrl || '';
    const videoEmbedUrl = getEmbedVideoUrl(videoUrl);

    container.innerHTML = `
        <div class="character-header">
            <img src="../images/characters/${character.image}" class="character-big-img" alt="${character.name}">
            <div>
                <h1>${character.name}</h1>
                <p class="character-type-big">${character.type}</p>
                <p class="character-desc">${character.description}</p>
            </div>
        </div>

        <h2 class="detail-section-title">STATISTIQUES</h2>
        <div class="character-stats-grid">
            ${renderStats()}
        </div>

        <h2 class="detail-section-title">FORCES</h2>
        <div class="strengths-grid animated-section">
            ${character.strengths.map(s => `
                <div class="strength-card animated-item">${s}</div>
            `).join('')}
        </div>

        <h2 class="detail-section-title">FAIBLESSES</h2>
        <div class="weaknesses-grid animated-section">
            ${character.weaknesses.map(s => `
                <div class="weakness-card animated-item">${s}</div>
            `).join('')}
        </div>

        <h2 class="detail-section-title">MATCHUPS</h2>
        <div class="matchups-grid animated-section">
            <div class="matchup-block strong animated-item">
                <h3>Fort contre</h3>
                <ul>
                    ${character.matchups.strongVs.map(m => `<li>${m}</li>`).join('')}
                </ul>
            </div>

            <div class="matchup-block weak animated-item">
                <h3>Faible contre</h3>
                <ul>
                    ${character.matchups.weakVs.map(m => `<li>${m}</li>`).join('')}
                </ul>
            </div>
        </div>

        <h2 class="detail-section-title">VIDÉO</h2>
        <div class="character-video-section">
            <div class="character-video-wrapper is-open">
                ${videoEmbedUrl
                    ? `<iframe
                        class="character-video"
                        src="${videoEmbedUrl}"
                        title="Vidéo ${character.name}"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>`
                    : (videoUrl
                        ? `<video class="character-video" controls preload="metadata">
                            <source src="${videoUrl}" type="video/mp4">
                            Votre navigateur ne supporte pas la lecture vidéo.
                        </video>`
                        : '<p class="character-video-empty">Aucune vidéo disponible pour ce personnage.</p>')}
            </div>
        </div>

        <div class="player-detail-actions">
            <a href="characters.html" class="btn btn-secondary">RETOUR</a>
        </div>
    `;
}

function setupCharacterNavigation() {
    const currentId = sessionStorage.getItem("selectedCharacter");
    const index = CHARACTERS.findIndex(c => c.id === currentId);

    const prevBtn = document.getElementById("prevDetail");
    const nextBtn = document.getElementById("nextDetail");

    if (!prevBtn || !nextBtn) return;

    prevBtn.addEventListener("click", () => {
        const prevIndex = (index - 1 + CHARACTERS.length) % CHARACTERS.length;
        sessionStorage.setItem("selectedCharacter", CHARACTERS[prevIndex].id);
        location.reload();
    });

    nextBtn.addEventListener("click", () => {
        const nextIndex = (index + 1) % CHARACTERS.length;
        sessionStorage.setItem("selectedCharacter", CHARACTERS[nextIndex].id);
        location.reload();
    });
}

function animateItems() {
    document.querySelectorAll('.animated-item').forEach((item, i) => {
        item.style.setProperty('--delay', `${i * 0.1}s`);
    });
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
    renderCharacterDetail();
    setupCharacterNavigation();
    animateItems();
});

function getEmbedVideoUrl(url) {
    if (!url) return '';

    try {
        const parsed = new URL(url);

        if (parsed.hostname === 'youtu.be') {
            const id = parsed.pathname.replace('/', '');
            return id ? `https://www.youtube-nocookie.com/embed/${id}` : '';
        }

        if (parsed.hostname.includes('youtube.com')) {
            const id = parsed.searchParams.get('v');
            return id ? `https://www.youtube-nocookie.com/embed/${id}` : '';
        }
    } catch {
        return '';
    }

    return '';
}
