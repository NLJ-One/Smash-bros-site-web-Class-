(function() {
    if (sessionStorage.getItem('introSeen') === 'true') {
        return;
    }

    if (!window.location.pathname.endsWith('/intro.html')) {
        window.location.href = 'intro.html';
    }
})();
