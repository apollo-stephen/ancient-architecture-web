/**
 * Audio Player Module
 * 中国古代建筑成就网站 - 音频播放器
 */

class AudioPlayer {
    constructor(audioElementId) {
        this.audio = document.getElementById(audioElementId);
        this.playPauseBtn = document.getElementById('play-pause-btn');
        this.volumeControl = document.getElementById('volume-control');
        this.playIcon = this.playPauseBtn?.querySelector('.play-icon');
        this.pauseIcon = this.playPauseBtn?.querySelector('.pause-icon');
        this.isPlaying = false;
        this.hasUserInteracted = false;
        
        if (this.audio) {
            this.init();
        }
    }
    
    init() {
        // Set initial volume
        if (this.volumeControl) {
            this.audio.volume = this.volumeControl.value / 100;
        } else {
            this.audio.volume = 0.3;
        }
        
        // Bind event listeners
        this.bindEvents();
        
        // Handle autoplay restrictions
        this.handleAutoplayRestrictions();
    }
    
    bindEvents() {
        // Play/Pause button click
        if (this.playPauseBtn) {
            this.playPauseBtn.addEventListener('click', () => {
                this.hasUserInteracted = true;
                this.togglePlayPause();
            });
        }
        
        // Volume control
        if (this.volumeControl) {
            this.volumeControl.addEventListener('input', (e) => {
                this.setVolume(e.target.value);
            });
        }
        
        // Audio events
        this.audio.addEventListener('play', () => this.onPlay());
        this.audio.addEventListener('pause', () => this.onPause());
        this.audio.addEventListener('ended', () => this.onEnded());
        this.audio.addEventListener('error', (e) => this.onError(e));
        this.audio.addEventListener('canplaythrough', () => this.onCanPlay());
        
        // Handle page visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.isPlaying) {
                // Optionally pause when tab is hidden
                // this.pause();
            }
        });
        
        // Save volume preference
        if (this.volumeControl) {
            this.volumeControl.addEventListener('change', () => {
                localStorage.setItem('audioVolume', this.volumeControl.value);
            });
            
            // Load saved volume
            const savedVolume = localStorage.getItem('audioVolume');
            if (savedVolume !== null) {
                this.volumeControl.value = savedVolume;
                this.audio.volume = savedVolume / 100;
            }
        }
    }
    
    handleAutoplayRestrictions() {
        // Modern browsers block autoplay, so we need user interaction
        // Show a subtle indicator that audio is available
        const audioPlayer = document.querySelector('.audio-player');
        if (audioPlayer) {
            audioPlayer.setAttribute('title', '点击播放背景音乐');
        }
    }
    
    play() {
        if (!this.audio) return;
        
        const playPromise = this.audio.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    this.isPlaying = true;
                    this.updateUI();
                })
                .catch(error => {
                    console.log('Audio playback was prevented:', error);
                    this.isPlaying = false;
                    this.updateUI();
                });
        }
    }
    
    pause() {
        if (!this.audio) return;
        
        this.audio.pause();
        this.isPlaying = false;
        this.updateUI();
    }
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    setVolume(value) {
        if (!this.audio) return;
        
        const volume = Math.max(0, Math.min(100, value)) / 100;
        this.audio.volume = volume;
        
        // Update volume icon if exists
        this.updateVolumeIcon(volume);
    }
    
    getVolume() {
        return this.audio ? this.audio.volume * 100 : 0;
    }
    
    mute() {
        if (!this.audio) return;
        this.audio.muted = true;
    }
    
    unmute() {
        if (!this.audio) return;
        this.audio.muted = false;
    }
    
    toggleMute() {
        if (!this.audio) return;
        this.audio.muted = !this.audio.muted;
    }
    
    updateUI() {
        if (this.playIcon && this.pauseIcon) {
            if (this.isPlaying) {
                this.playIcon.style.display = 'none';
                this.pauseIcon.style.display = 'inline';
            } else {
                this.playIcon.style.display = 'inline';
                this.pauseIcon.style.display = 'none';
            }
        }
        
        // Update button aria-label
        if (this.playPauseBtn) {
            this.playPauseBtn.setAttribute('aria-label', 
                this.isPlaying ? '暂停背景音乐' : '播放背景音乐'
            );
        }
    }
    
    updateVolumeIcon(volume) {
        const volumeLabel = document.querySelector('.volume-label');
        if (volumeLabel) {
            if (volume === 0) {
                volumeLabel.textContent = '🔇';
            } else if (volume < 0.3) {
                volumeLabel.textContent = '🔈';
            } else if (volume < 0.7) {
                volumeLabel.textContent = '🔉';
            } else {
                volumeLabel.textContent = '🔊';
            }
        }
    }
    
    // Event handlers
    onPlay() {
        this.isPlaying = true;
        this.updateUI();
    }
    
    onPause() {
        this.isPlaying = false;
        this.updateUI();
    }
    
    onEnded() {
        // Audio will loop, but if not, reset
        if (!this.audio.loop) {
            this.isPlaying = false;
            this.updateUI();
        }
    }
    
    onError(e) {
        console.error('Audio error:', e);
        this.isPlaying = false;
        this.updateUI();
        
        // Show error message to user
        const audioPlayer = document.querySelector('.audio-player');
        if (audioPlayer) {
            audioPlayer.setAttribute('title', '音频加载失败');
        }
    }
    
    onCanPlay() {
        // Audio is ready to play
        const audioPlayer = document.querySelector('.audio-player');
        if (audioPlayer) {
            audioPlayer.classList.add('ready');
        }
    }
    
    // Cleanup
    destroy() {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
        }
    }
}

// Initialize audio player when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if audio element exists
    const audioElement = document.getElementById('background-music');
    if (audioElement) {
        window.audioPlayer = new AudioPlayer('background-music');
    }
});

// Handle page unload
window.addEventListener('beforeunload', function() {
    if (window.audioPlayer) {
        window.audioPlayer.destroy();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioPlayer;
}
