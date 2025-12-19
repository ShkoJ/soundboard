// 1. DATA CONFIGURATION
// Tags: determine which filter button shows the sound
// isArgument: if true, adds the red 'argument' style
const sounds = [
    // --- PSA GROUP ---
    { id: 'psa-brsima', file: 'psa-brsima.mp3', image: 'psa.png', label: 'PSA Brsima', tags: ['psa'] },
    { id: 'psa-brsima-extreme', file: 'psa-brsima-extreme.mp3', image: 'psa.png', label: 'PSA Extreme', tags: ['psa'] },
    { id: 'psa-terbum', file: 'psa-terbum.mp3', image: 'psa.png', label: 'PSA Terbum', tags: ['psa'] },
    { id: 'psa-dargai-bkawa', file: 'psa-dargai-bkawa.mp3', image: 'psa.png', label: 'PSA Dargai Bkawa', tags: ['psa'] },
    { id: 'sorry', file: 'sorry.mp3', image: 'psa.png', label: 'Sorry', tags: ['psa'] },
    
    // UPDATED: Uses ba3janoke.jpg as requested
    { id: 'ba3janoke', file: 'ba3janoke.mp3', image: 'ba3janoke.jpg', label: 'Ba3janoke', tags: ['psa'] },
    
    // --- ALAND GROUP ---
    { id: 'supernoworries', file: 'supernoworries.mp3', image: 'aland.jpg', label: 'Super No Worries', tags: ['aland'] },
    { id: 'aland-zor-supas', file: 'aland-zor-supas.mp3', image: 'aland.jpg', label: 'Aland Zor Supas', tags: ['aland'] },
    { id: 'kak-hamno', file: 'kak-hamno-zorsupas.mp3', image: 'aland.jpg', label: 'Kak Hamno Supas', tags: ['aland'] },
    { id: 'chai', file: 'chai.mp3', image: 'aland.jpg', label: 'Chai Time', tags: ['aland'] },
    { id: 'ba3', file: 'ba3.mp3', image: 'aland.jpg', label: 'Ba3', tags: ['aland'] },
    { id: 'kak-ashty', file: 'kak-ashty-lachen.mp3', image: 'aland.jpg', label: 'Kak Ashty lachendarin', tags: ['aland'] },
    { id: 'karox', file: 'karox-xayat.mp3', image: 'aland.jpg', label: 'Karox Xayat', tags: ['aland'] },

    // --- KHATOON GROUP ---
    { id: 'mad-khatoon', file: 'mad-khatoon.mp3', image: 'khatoon.png', label: 'Mad Khatoon', tags: ['khatoon'] },

    // --- CAT GROUP ---
    { id: 'meow', file: 'meow.mp3', image: 'cat.png', label: 'Meow', tags: ['other'] },
    { id: 'meow-shko', file: 'meow-shko.mp3', image: 'cat.png', label: 'Meow Shko', tags: ['other'] },
    { id: 'meow-2', file: 'meow-2.mp3', image: 'cat.png', label: 'Meow 2', tags: ['other'] },

    // --- NEW ADDITIONS ---

    // 1. Aland Only
    { id: 'aland-arg-1', file: 'Aland - aland argument 1.1.ogg', image: 'aland.jpg', label: 'Argument 1.1', tags: ['aland'], isArgument: true },
    { id: 'bram-lo-halnagri', file: 'bram lo halnagri.ogg', image: 'aland.jpg', label: 'Bram lo halnagri', tags: ['aland'] },
    { id: 'bzrt-dakam', file: 'bzrt dakam - Aland.ogg', image: 'aland.jpg', label: 'Bzrt dakam', tags: ['aland'] },
    { id: 'mizi-de', file: 'mizi de - Aland.ogg', image: 'aland.jpg', label: 'Mizi de', tags: ['aland'] },
    { id: 'mamosa-ahmad', file: 'mamosa ahamd.ogg', image: 'aland.jpg', label: 'Mamosa Ahmad', tags: ['aland'] },
    { id: 'xoshim-dawei', file: 'xoshim dawei, la qbrt bm -Aland argument.ogg', image: 'aland.jpg', label: 'Xoshim dawei', tags: ['aland'], isArgument: true },

    // 2. PSA Only
    { id: 'bzrt-dakam-psa', file: 'Bzrt dakam - Psa + argument 1.3.ogg', image: 'psa.png', label: 'Bzrt dakam (Arg)', tags: ['psa'], isArgument: true },
    { id: 'psa-excuse', file: 'psa excuse - psa argument.ogg', image: 'psa.png', label: 'PSA Excuse', tags: ['psa'], isArgument: true },

    // 3. Ba3janoke Specifics (Req: Use ba3janoke.jpg)
    { id: 'baxot-ba3janokei', file: 'baxot ba3janokei - aland.ogg', image: 'ba3janoke.jpg', label: 'Baxot Ba3janokei', tags: ['aland'] },
    { id: 'datkama-ba3janoke', file: 'datkama ba3janoke - psa.ogg', image: 'ba3janoke.jpg', label: 'Datkama Ba3janoke', tags: ['psa'] },

    // 4. SHARED / DUAL FILES (Appear in BOTH Aland and PSA filters)
    { id: 'awm-bde-txwa', file: 'Awm bde txwa - aland & psa.mp3', image: 'aland.jpg', label: 'Awm bde txwa', tags: ['aland', 'psa'], isArgument: true },
    { id: 'awm-bde-extreme', file: 'Awm bde txwa Extreme - aland & psa.mp3', image: 'psa.png', label: 'Awm bde Extreme', tags: ['aland', 'psa'], isArgument: true },
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

const source = audioCtx.createMediaElementSource(currentAudio);
const gainNode = audioCtx.createGain();
gainNode.gain.value = 5; 
source.connect(gainNode);
gainNode.connect(audioCtx.destination);


// 3. GENERATE BUTTONS (Filtered)
function renderGrid(filterType = 'all') {
    // Clear existing
    grid.innerHTML = '';

    sounds.forEach(sound => {
        // Filter Logic: Show if 'all' OR if the sound's tags include the filterType
        const shouldShow = filterType === 'all' || sound.tags.includes(filterType);
        
        if (shouldShow) {
            const btn = document.createElement('div');
            
            // Add 'argument' class if isArgument is true
            btn.className = `sound-btn ${sound.isArgument ? 'argument' : ''}`;
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
        }
    });
}

// Initial Render
renderGrid('all');

// 4. FILTER LISTENERS
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add to clicked
        btn.classList.add('active');
        // Render
        renderGrid(btn.getAttribute('data-filter'));
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

    // --- DYNAMIC VOLUME LOGIC ---
    if (sound.id === 'kak-ashty') {
        gainNode.gain.value = 15;
    } else {
        gainNode.gain.value = 5; 
    }

    currentButtonId = sound.id;
    currentAudio.src = sound.file;
    
    updateUI(true);

    currentAudio.play().catch(e => console.error("Playback failed:", e));

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
        // Note: The button might not exist if we filtered it out while playing
        if (activeBtn) activeBtn.classList.add('playing');
        stopContainer.classList.remove('hidden');
    } else {
        stopContainer.classList.add('hidden');
    }
}

stopBtn.addEventListener('click', stopAll);
