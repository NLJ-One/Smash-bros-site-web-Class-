/* ============================
   STREET FIGHTER V - INTRO ANIMATION
   ============================ */

document.addEventListener('DOMContentLoaded', function() {
    initializeIntroAnimation();
});

/**
 * Initialiser l'animation d'intro
 */
function initializeIntroAnimation() {
    // Récupérer les paramètres URL
    const urlParams = new URLSearchParams(globalThis.location.search);
    const leftFighter = urlParams.get('left');
    const rightFighter = urlParams.get('right');
    const leftImage = urlParams.get('leftImg');
    const rightImage = urlParams.get('rightImg');

    // Éléments du DOM
    const introLeft = document.getElementById('introLeft');
    const introRight = document.getElementById('introRight');
    const introNameLeft = document.getElementById('introNameLeft');
    const introNameRight = document.getElementById('introNameRight');

    // Définir les images et les noms
    if (leftImage) {
        introLeft.src = decodeURIComponent(leftImage);
    }
    if (rightImage) {
        introRight.src = decodeURIComponent(rightImage);
    }
    if (leftFighter) {
        introNameLeft.textContent = decodeURIComponent(leftFighter);
    }
    if (rightFighter) {
        introNameRight.textContent = decodeURIComponent(rightFighter);
    }

    // Lancer la redirection après l'animation
    setTimeout(() => {
        redirectToCompare(leftFighter, rightFighter);
    }, 2000); // 2 secondes pour la durée totale de l'animation
}

/**
 * Rediriger vers le comparateur
 */
function redirectToCompare(leftFighter, rightFighter) {
    if (leftFighter && rightFighter) {
        globalThis.location.href = `compare-old.html?left=${encodeURIComponent(leftFighter)}&right=${encodeURIComponent(rightFighter)}`;
    } else {
        globalThis.location.href = 'compare.html';
    }
}

/**
 * API publique pour l'animation intro
 */
globalThis.introSFV = {
    /**
     * Jouer l'animation intro avec les paramètres
     */
    play: function(leftName, rightName, leftImg, rightImg) {
        const params = new URLSearchParams();
        params.append('left', leftName);
        params.append('right', rightName);
        if (leftImg) params.append('leftImg', leftImg);
        if (rightImg) params.append('rightImg', rightImg);
        
        globalThis.location.href = `intro-sfv.html?${params.toString()}`;
    }
};
