document.addEventListener('DOMContentLoaded', function() {
    const enterButton = document.getElementById('introEnter');

    if (!enterButton) return;

    const goToSite = () => {
        sessionStorage.setItem('introSeen', 'true');
        window.location.href = 'index.html';
    };

    enterButton.addEventListener('click', goToSite);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            goToSite();
        }
    });
});
