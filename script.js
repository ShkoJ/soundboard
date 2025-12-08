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
];

// 2. INITIALIZATION
const grid = document.getElementById('sound-grid');
const stopContainer = document.getElementById('stop-container');
const stopBtn = document.getElementById('stop-btn');
let currentAudio = new Audio(); // Single audio instance
let currentButtonId = null;

// 3. GENERATE BUTTONS
sounds.forEach(sound => {
    // Create Button Element
    const btn = document.createElement('div');
    btn.className = 'sound-btn';
    btn.id = sound.id;
    
    // Create Inner HTML (Image, Equalizer, Label)
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

    // Add Click Event
    btn.addEventListener('click', () => playSound(sound));

    // Append to Grid
    grid.appendChild(btn);
});

// 4. PLAY FUNCTION
function playSound(sound) {
    // If clicking the same playing sound, stop it (toggle off)
    if (currentButtonId === sound.id && !currentAudio.paused) {
        stopAll();
        return;
    }

    // Stop currently playing sound
    stopAll();

    // Set new sound state
    currentButtonId = sound.id;
    currentAudio.src = sound.file;
    
    // Visual update
    updateUI(true);

    // Play
    currentAudio.play().catch(e => console.error("Playback failed:", e));

    // When audio finishes naturally
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
    // Remove 'playing' class from ALL buttons
    document.querySelectorAll('.sound-btn').forEach(btn => {
        btn.classList.remove('playing');
    });

    if (isPlaying && currentButtonId) {
        // Add 'playing' class to ACTIVE button
        const activeBtn = document.getElementById(currentButtonId);
        if (activeBtn) activeBtn.classList.add('playing');
        
        // Show Stop Button
        stopContainer.classList.remove('hidden');
    } else {
        // Hide Stop Button
        stopContainer.classList.add('hidden');
    }
}

// 7. EVENT LISTENER FOR STOP BUTTON
stopBtn.addEventListener('click', stopAll);