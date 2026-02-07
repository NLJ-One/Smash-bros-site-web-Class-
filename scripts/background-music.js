// Background Music Manager
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('bgAudio');
    const musicToggle = document.getElementById('musicToggle');
    
    if (!audioPlayer) return;

    audioPlayer.addEventListener('error', function() {
        const mediaError = audioPlayer.error;
        const errorCode = mediaError ? mediaError.code : 'unknown';
        console.error('Audio error:', errorCode, mediaError);
    });

    audioPlayer.addEventListener('canplay', function() {
        console.log('Audio ready:', audioPlayer.currentSrc || 'no-src');
    });

    if (audioPlayer.autoplay && audioPlayer.muted) {
        console.log('Audio autoplay is muted by browser policy. Click to enable sound.');
    }

    audioPlayer.addEventListener('playing', function() {
        console.log('Audio playing');
    });
    
    // Cap the maximum volume at 50%
    audioPlayer.volume = 0.5;
    
    // Toggle music on/off
    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            if (audioPlayer.paused || audioPlayer.muted) {
                audioPlayer.muted = false;
                audioPlayer.play().catch(function(err) {
                    console.log('Auto-play prevented:', err);
                });
                musicToggle.textContent = '🔊';
            } else {
                audioPlayer.pause();
                musicToggle.textContent = '🔇';
            }
        });
    }
    
    // Auto-play on user interaction (for browser restrictions)
    document.addEventListener('click', function() {
        if (audioPlayer.muted) {
            audioPlayer.muted = false;
        }
        if (audioPlayer.paused) {
            audioPlayer.play().catch(function(err) {
                console.error('Audio play failed:', err);
            });
        }
    }, { once: true });
});
