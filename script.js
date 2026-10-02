document.addEventListener('DOMContentLoaded', () => {
    // 1. STARFIELD CANVAS BACKGROUND
    initStarsCanvas();

    // 2. FLOATING PETALS & HEARTS
    initFloatingParticles();

    // 3. LIVE TIME COUNTER (2 Years and 8 Months)
    initAnniversaryTimer();

    // 4. NAVIGATION & SECTION TRANSITION
    initNavigation();

    // 5. INTERACTIVE ENVELOPE & LETTER
    initLetterSection();

    // 6. PHOTO GALLERY LIGHTBOX
    initPhotoGallery();

    // 7. AUDIO MUSIC PLAYER
    initAudioPlayer();
});

/* ==========================================
   1. STARFIELD CANVAS
   ========================================== */
function initStarsCanvas() {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const stars = Array.from({ length: 140 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.3,
        alpha: Math.random(),
        speed: Math.random() * 0.015 + 0.005,
        color: Math.random() > 0.4 ? '#c084fc' : (Math.random() > 0.5 ? '#60a5fa' : '#ffffff')
    }));

    function animateStars() {
        ctx.clearRect(0, 0, width, height);

        stars.forEach(s => {
            s.alpha += s.speed;
            if (s.alpha > 1 || s.alpha < 0.2) s.speed = -s.speed;

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.globalAlpha = Math.max(0.1, s.alpha);
            ctx.shadowBlur = 8;
            ctx.shadowColor = s.color;
            ctx.fill();
        });

        requestAnimationFrame(animateStars);
    }
    animateStars();
}

/* ==========================================
   2. FLOATING PETALS AND HEARTS
   ========================================== */
function initFloatingParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const items = ['💜', '🌸', '✨', '💙', '🌷', '💖'];

    function createParticle() {
        const particle = document.createElement('div');
        const symbol = items[Math.floor(Math.random() * items.length)];
        particle.innerText = symbol;
        particle.style.position = 'absolute';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = '-30px';
        particle.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
        particle.style.opacity = (Math.random() * 0.7 + 0.3).toString();
        particle.style.pointerEvents = 'none';
        
        const duration = Math.random() * 6 + 6;
        const drift = (Math.random() - 0.5) * 150;

        particle.animate([
            { transform: 'translateY(0px) rotate(0deg)', opacity: particle.style.opacity },
            { transform: `translateY(${window.innerHeight + 50}px) translateX(${drift}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'linear'
        }).onfinish = () => particle.remove();

        container.appendChild(particle);
    }

    setInterval(createParticle, 550);
}

/* ==========================================
   3. LIVE TIME COUNTER
   ========================================== */
function initAnniversaryTimer() {
    // 2 years and 8 months prior to current date
    const startDate = new Date('2024-02-02T00:00:00');

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        const seconds = Math.floor((diff / 1000) % 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));

        document.getElementById('count-years').innerText = '2';
        document.getElementById('count-months').innerText = '8';
        document.getElementById('count-days').innerText = String(daysTotal).padStart(2, '0');
        document.getElementById('count-hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('count-minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('count-seconds').innerText = String(seconds).padStart(2, '0');
    }

    updateCounter();
    setInterval(updateCounter, 1000);
}

/* ==========================================
   4. NAVIGATION
   ========================================== */
function initNavigation() {
    const startBtn = document.getElementById('start-journey-btn');
    const landingPage = document.getElementById('landing-page');
    const hubPage = document.getElementById('hub-page');

    if (startBtn && landingPage && hubPage) {
        startBtn.addEventListener('click', () => {
            burstPetals();
            landingPage.classList.add('hidden');
            hubPage.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Auto-play song upon user interaction
            const bgAudio = document.getElementById('bg-audio');
            const audioStatus = document.getElementById('audio-status');
            const audioIcon = document.getElementById('audio-icon');
            if (bgAudio) {
                bgAudio.play().then(() => {
                    if (audioStatus) audioStatus.innerText = 'Sonando: Cumbiana 🎶';
                    if (audioIcon) audioIcon.className = 'fas fa-pause';
                }).catch(() => {});
            }
        });
    }

    const backHomeBtn = document.getElementById('back-home-btn');
    if (backHomeBtn) {
        backHomeBtn.addEventListener('click', () => {
            hubPage.classList.add('hidden');
            landingPage.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn:not(#back-home-btn)');
    const contentPanes = document.querySelectorAll('.content-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            contentPanes.forEach(pane => pane.classList.remove('active'));

            btn.classList.add('active');
            const targetPane = document.getElementById(targetId);
            if (targetPane) targetPane.classList.add('active');
        });
    });
}

function burstPetals() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.innerText = ['💜', '💖', '🌸', '✨'][Math.floor(Math.random() * 4)];
        p.style.position = 'fixed';
        p.style.left = '50vw';
        p.style.top = '50vh';
        p.style.fontSize = '1.8rem';
        p.style.zIndex = '999';
        
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 400 + 100;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;

        p.animate([
            { transform: 'translate(0, 0) scale(0.5)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(1.5)`, opacity: 0 }
        ], {
            duration: 1200,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
        }).onfinish = () => p.remove();

        container.appendChild(p);
    }
}

/* ==========================================
   5. LETTER SECTION
   ========================================== */
function initLetterSection() {
    const envelope = document.getElementById('envelope');
    const letterCard = document.getElementById('letter-card');

    if (envelope && letterCard) {
        envelope.addEventListener('click', () => {
            envelope.classList.add('open');
            setTimeout(() => {
                letterCard.classList.add('visible');
                letterCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 600);
        });
    }
}

/* ==========================================
   6. PHOTO GALLERY & LIGHTBOX
   ========================================== */
function initPhotoGallery() {
    const modal = document.getElementById('modal-overlay');
    const modalImg = document.getElementById('modal-img');
    const modalClose = document.getElementById('modal-close');

    document.querySelectorAll('.polaroid-card').forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            if (img && modal && modalImg) {
                modalImg.src = img.src;
                modal.classList.add('active');
            }
        });
    });

    if (modalClose && modal) {
        modalClose.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }
}

/* ==========================================
   7. AUDIO PLAYER (MP3 FILE + SYNTH FALLBACK)
   ========================================== */
function initAudioPlayer() {
    const toggleBtn = document.getElementById('toggle-audio-btn');
    const audioStatus = document.getElementById('audio-status');
    const audioIcon = document.getElementById('audio-icon');
    const bgAudio = document.getElementById('bg-audio');

    let isPlaying = false;
    let audioCtx = null;
    let intervalId = null;

    function playSynthMelody() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 659.25];
        let step = 0;

        intervalId = setInterval(() => {
            if (!isPlaying) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.frequency.value = notes[step % notes.length];
            osc.type = 'sine';

            gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 2.0);

            step++;
        }, 800);
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            if (isPlaying) {
                // Try playing audio file first
                if (bgAudio) {
                    const promise = bgAudio.play();
                    if (promise !== undefined) {
                        promise.then(() => {
                            if (audioStatus) audioStatus.innerText = 'Sonando: Cumbiana 🎶';
                            if (audioIcon) audioIcon.className = 'fas fa-pause';
                        }).catch(() => {
                            // Fallback to synthesized melody if file not found/loaded yet
                            playSynthMelody();
                            if (audioStatus) audioStatus.innerText = 'Melodía Romántica 🎵';
                            if (audioIcon) audioIcon.className = 'fas fa-pause';
                        });
                    }
                } else {
                    playSynthMelody();
                    if (audioStatus) audioStatus.innerText = 'Melodía Romántica 🎵';
                    if (audioIcon) audioIcon.className = 'fas fa-pause';
                }
            } else {
                if (bgAudio) bgAudio.pause();
                if (intervalId) clearInterval(intervalId);
                if (audioStatus) audioStatus.innerText = 'Toca para reproducir 🎵';
                if (audioIcon) audioIcon.className = 'fas fa-music';
            }
        });
    }
}
