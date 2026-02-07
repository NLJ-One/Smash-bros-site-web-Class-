// Background Music Manager
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('bgAudio');
    const volumeControl = document.getElementById('volumeControl');
    const musicToggle = document.getElementById('musicToggle');
    
    if (!audioPlayer) return;
    
    // Set default volume to 30%
    audioPlayer.volume = 0.3;
    if (volumeControl) {
        volumeControl.value = 30;
    }
    
    // Update volume when slider changes
    if (volumeControl) {
        volumeControl.addEventListener('input', function() {
            audioPlayer.volume = this.value / 100;
        });
    }
    
    // Toggle music on/off
    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            if (audioPlayer.paused) {
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
        if (audioPlayer.paused) {
            audioPlayer.play().catch(function(err) {
                console.log('Auto-play prevented:', err);
            });
        }
    }, { once: true });
});
