// 1. DATA CONFIGURATION
const sounds = [
    // ===================================
    // GROUP 1: PSA & BA3JANOKE
    // ===================================
    { id: 'psa-brsima', file: 'psa-brsima.mp3', image: 'psa.png', label: 'PSA Brsima', tags: ['psa'] },
    { id: 'psa-brsima-extreme', file: 'psa-brsima-extreme.mp3', image: 'psa.png', label: 'PSA Extreme', tags: ['psa'] },
    { id: 'psa-terbum', file: 'psa-terbum.mp3', image: 'psa.png', label: 'PSA Terbum', tags: ['psa'] },
    { id: 'psa-dargai-bkawa', file: 'psa-dargai-bkawa.mp3', image: 'psa.png', label: 'PSA Dargai Bkawa', tags: ['psa'] },
    { id: 'sorry', file: 'sorry.mp3', image: 'psa.png', label: 'Sorry', tags: ['psa'] },
    
    // Moved here from Argument 1.1 - Renamed
    { id: 'psa-sorry-excuse', file: 'Aland - aland argument 1.1.ogg', image: 'psa.png', label: "Psa's sorry ass excuse", tags: ['psa'] },
    
    // Ba3janoke / PSA Mixed
    { id: 'ba3janoke', file: 'ba3janoke.mp3', image: 'ba3janoke.jpg', label: 'Ba3janoke', tags: ['psa'] },
    { id: 'datkama-ba3janoke', file: 'datkama ba3janoke - psa.ogg', image: 'ba3janoke.jpg', label: 'Datkama Ba3janoke', tags: ['psa'] },
    
    // PSA Misc
    { id: 'bzrt-dakam-psa', file: 'Bzrt dakam - Psa + argument 1.3.ogg', image: 'psa.png', label: 'Bzrt dakam', tags: ['psa'] },


    // ===================================
    // GROUP 2: ALAND
    // ===================================
    { id: 'supernoworries', file: 'supernoworries.mp3', image: 'aland.jpg', label: 'Super No Worries', tags: ['aland'] },
    { id: 'aland-zor-supas', file: 'aland-zor-supas.mp3', image: 'aland.jpg', label: 'Aland Zor Supas', tags: ['aland'] },
    { id: 'kak-hamno', file: 'kak-hamno-zorsupas.mp3', image: 'aland.jpg', label: 'Kak Hamno Supas', tags: ['aland'] },
    { id: 'chai', file: 'chai.mp3', image: 'aland.jpg', label: 'Chai Time', tags: ['aland'] },
    { id: 'ba3', file: 'ba3.mp3', image: 'aland.jpg', label: 'Ba3', tags: ['aland'] },
    { id: 'kak-ashty', file: 'kak-ashty-lachen.mp3', image: 'aland.jpg', label: 'Kak Ashty lachendarin', tags: ['aland'] },
    { id: 'karox', file: 'karox-xayat.mp3', image: 'aland.jpg', label: 'Karox Xayat', tags: ['aland'] },
    
    // Awm Bde Sequence (Grouped together)
    { id: 'awm-bde-txwa', file: 'Awm bde txwa - aland & psa.mp3', image: 'aland.jpg', label: 'Awm bde txwa', tags: ['aland'] },
    { id: 'awm-bde-extreme', file: 'Awm bde txwa Extreme - aland & psa.mp3', image: 'aland.jpg', label: 'Awm bde txwa Extreme', tags: ['aland'] },

    // Aland New
    { id: 'bzrt-dakam', file: 'bzrt dakam - Aland.ogg', image: 'aland.jpg', label: 'Bzrt dakam', tags: ['aland'] },
    { id: 'mizi-de', file: 'mizi de - Aland.ogg', image: 'aland.jpg', label: 'Mizi de', tags: ['aland'] },
    { id: 'mamosa-ahmad', file: 'mamosa ahamd.ogg', image: 'aland.jpg', label: 'Mamosa Ahmad', tags: ['aland'] },
    { id: 'xoshim-dawei', file: 'xoshim dawei, la qbrt bm -Aland argument.ogg', image: 'aland.jpg', label: 'Xoshim dawei', tags: ['aland'] },
    { id: 'baxot-ba3janokei', file: 'baxot ba3janokei - aland.ogg', image: 'ba3janoke.jpg', label: 'Baxot Ba3janokei', tags: ['aland'] },
    
    // Moved here from PSA Excuse - Renamed
    { id: 'aland-threaten', file: 'psa excuse - psa argument.ogg', image: 'aland.jpg', label: 'Aland threaten', tags: ['aland'] },


    // ===================================
    // GROUP 3: KHATOON
    // ===================================
    { id: 'mad-khatoon', file: 'mad-khatoon.mp3', image: 'khatoon.png', label: 'Mad Khatoon', tags: ['khatoon'] },


    // ===================================
    // GROUP 4: SHKO (CATS + BRAM LO)
    // ===================================
    { id: 'meow', file: 'meow.mp3', image: 'cat.png', label: 'Meow', tags: ['shko'] },
    { id: 'meow-shko', file: 'meow-shko.mp3', image: 'cat.png', label: 'Meow Shko', tags: ['shko'] },
    { id: 'meow-2', file: 'meow-2.mp3', image: 'cat.png', label: 'Meow 2', tags: ['shko'] },
    { id: 'bram-lo-halnagri', file: 'bram lo halnagri.ogg', image: 'cat.png', label: 'Bram lo halnagri', tags: ['shko'] },
];

// 2. INITIALIZATION
const grid = document.getElementById('sound-grid');
const stopContainer = document.getElementById('stop-container');
const stopBtn = document.getElementById('stop-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
let currentButtonId = null;

// --- AUDIO CONTEXT SETUP ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const currentAudio = new Audio();
currentAudio.crossOrigin = "anonymous"; 
currentAudio.preload = "auto";

const source = audioCtx.createMediaElementSource(currentAudio);
const gainNode = audioCtx.createGain();
gainNode.gain.value = 5; 
source.connect(gainNode);
gainNode.connect(audioCtx.destination);


// 3. GENERATE BUTTONS (Filtered)
function renderGrid(filterType = 'all') {
    grid.innerHTML = '';

    sounds.forEach(sound => {
        const shouldShow = filterType === 'all' || sound.tags.includes(filterType);
        
        if (shouldShow) {
            const btn = document.createElement('div');
            btn.className = 'sound-btn'; // No extra argument classes
            btn.id = sound.id;
            
            btn.innerHTML = `
                <img src="${sound.image}" loading="lazy" alt="${sound.label}">
                <div class="overlay"></div>
                <div class="equalizer">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
                <div class="label">${sound.label}</div>
            `;

            btn.addEventListener('click', (e) => {
                e.preventDefault(); 
                playSound(sound);
            });
            grid.appendChild(btn);
        }
    });
}

// Initial Render
renderGrid('all');

// 4. FILTER LISTENERS
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGrid(btn.getAttribute('data-filter'));
        
        if (navigator.vibrate) navigator.vibrate(10);
    });
});

// 5. PLAY FUNCTION
function playSound(sound) {
    if (audioCtx.state === 'suspended') audioCtx.resume();

    if (currentButtonId === sound.id && !currentAudio.paused) {
        stopAll();
        return;
    }

    stopAll();

    // Volume Logic
    if (sound.id === 'kak-ashty') {
        gainNode.gain.value = 15;
    } else {
        gainNode.gain.value = 5; 
    }

    currentButtonId = sound.id;
    currentAudio.src = sound.file;
    
    updateUI(true);

    const playPromise = currentAudio.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.error("Playback failed:", error);
            stopAll();
        });
    }

    currentAudio.onended = () => {
        stopAll();
    };
}

// 6. STOP FUNCTION
function stopAll() {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentButtonId = null;
    updateUI(false);
}

// 7. UI UPDATE HELPER
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

stopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    stopAll();
    if (navigator.vibrate) navigator.vibrate(20);
});
