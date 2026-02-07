document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('charactersGrid');
    if (!grid || !Array.isArray(CHARACTERS)) return;

    grid.innerHTML = CHARACTERS.map(c => `
        <div class="character-card" data-id="${c.id}">
            <img src="../images/characters/${c.image}" alt="${c.name}" data-id="${c.id}">
            <h3>${c.name}</h3>
            <span class="character-type">${c.type}</span>
        </div>
    `).join('');

    document.querySelectorAll('.character-card').forEach(card => {
        card.addEventListener('click', () => {
            sessionStorage.setItem('selectedCharacter', card.dataset.id);
            globalThis.location.href = 'character-detail.html';
        });
    });
});
