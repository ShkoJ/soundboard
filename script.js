// 1. DATA CONFIGURATION
const sounds = [
    // --- PSA GROUP (psa.png) ---
    { id: 'psa-brsima', file: 'psa-brsima.mp3', image: 'psa.png', label: 'PSA Brsima' },
    { id: 'psa-brsima-extreme', file: 'psa-brsima-extreme.mp3', image: 'psa.png', label: 'PSA Extreme' },
    { id: 'psa-terbum', file: 'psa-terbum.mp3', image: 'psa.png', label: 'PSA Terbum' },
    { id: 'psa-dargai-bkawa', file: 'psa-dargai-bkawa.mp3', image: 'psa.png', label: 'PSA Dargai Bkawa' },
    { id: 'sorry', file: 'sorry.mp3', image: 'psa.png', label: 'Sorry' },
    { id: 'ba3janoke', file: 'ba3janoke.mp3', image: 'psa.png', label: 'Ba3janoke' },
    
    // --- ALAND GROUP (aland.jpg) ---
    { id: 'supernoworries', file: 'supernoworries.mp3', image: 'aland.jpg', label: 'Super No Worries' },
    { id: 'aland-zor-supas', file: 'aland-zor-supas.mp3', image: 'aland.jpg', label: 'Aland Zor Supas' },
    { id: 'kak-hamno', file: 'kak-hamno-zorsupas.mp3', image: 'aland.jpg', label: 'Kak Hamno Supas' },
    { id: 'chai', file: 'chai.mp3', image: 'aland.jpg', label: 'Chai Time' },
    { id: 'ba3', file: 'ba3.mp3', image: 'aland.jpg', label: 'Ba3' },
    
    // --- NEW ALAND ADDITIONS (Using aland.jpg to fix missing image) ---
    { id: 'kak-ashty', file: 'kak-ashty-lachen.mp3', image: 'aland.jpg', label: 'Kak Ashty lachendarin' },
    { id: 'karox', file: 'karox-xayat.mp3', image: 'aland.jpg', label: 'Karox Xayat' },

    // --- KHATOON GROUP (khatoon.png) ---
    { id: 'mad-khatoon', file: 'mad-khatoon.mp3', image: 'khatoon.png', label: 'Mad Khatoon' },

    // --- CAT GROUP (cat.png) ---
    { id: 'meow', file: 'meow.mp3', image: 'cat.png', label: 'Meow' },
    { id: 'meow-shko', file: 'meow-shko.mp3', image: 'cat.png', label: 'Meow Shko' },
    { id: 'meow-2', file: 'meow-2.mp3', image: 'cat.png', label: 'Meow 2' },
];

// 2. INITIALIZATION
const grid = document.getElementById('sound-grid');
const stopContainer = document.getElementById('stop-container');
const stopBtn = document.getElementById('stop-btn');
let currentButtonId = null;

// --- AUDIO CONTEXT SETUP ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const currentAudio = new Audio();
currentAudio.crossOrigin = "anonymous"; 

// Create the connection chain: Source -> Gain (Amp) -> Speakers
const source = audioCtx.createMediaElementSource(currentAudio);
const gainNode = audioCtx.createGain();

// Initial gain (will be updated on click)
gainNode.gain.value = 5; 

source.connect(gainNode);
gainNode.connect(audioCtx.destination);


// 3. GENERATE BUTTONS
sounds.forEach(sound => {
    const btn = document.createElement('div');
    btn.className = 'sound-btn';
    btn.id = sound.id;
    
    btn.innerHTML = `
        <img src="${sound.image}" alt="${sound.label}">
        <div class="overlay"></div>
        <div class="equalizer">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
        <div class="label">${sound.label}</div>
    `;

    btn.addEventListener('click', () => playSound(sound));
    grid.appendChild(btn);
});

// 4. PLAY FUNCTION
function playSound(sound) {
    // Resume AudioContext if suspended
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    // Toggle off if clicking the same sound
    if (currentButtonId === sound.id && !currentAudio.paused) {
        stopAll();
        return;
    }

    stopAll();

    // --- DYNAMIC VOLUME LOGIC ---
    if (sound.id === 'kak-ashty') {
        gainNode.gain.value = 15; // 15x Volume for Kak Ashty
    } else {
        gainNode.gain.value = 5;  // 5x Volume for everything else
    }

    // Set new sound
    currentButtonId = sound.id;
    currentAudio.src = sound.file;
    
    updateUI(true);

    currentAudio.play().catch(e => console.error("Playback failed:", e));

    currentAudio.onended = () => {
        stopAll();
    };
}

// 5. STOP FUNCTION
function stopAll() {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentButtonId = null;
    updateUI(false);
}

// 6. UI UPDATE HELPER
function updateUI(isPlaying) {
    document.querySelectorAll('.sound-btn').forEach(btn => {
        btn.classList.remove('playing');
    });

    if (isPlaying && currentButtonId) {
        const activeBtn = document.getElementById(currentButtonId);
        if (activeBtn) activeBtn.classList.add('playing');
        stopContainer.classList.remove('hidden');
    } else {
        stopContainer.classList.add('hidden');
    }
}

stopBtn.addEventListener('click', stopAll);
