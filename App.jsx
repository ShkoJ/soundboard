import React, { useState, useRef } from 'react';
import { Square, Play, Pause } from 'lucide-react';

// DATA CONFIGURATION
// All files are expected to be in the root public folder
const soundData = [
  // PSA Group (Uses psa.png)
  { id: 'psa-brsima', file: 'psa-brsima.mp3', image: 'psa.png', label: 'PSA Brsima' },
  { id: 'psa-brsima-extreme', file: 'psa-brsima-extreme.mp3', image: 'psa.png', label: 'PSA Extreme' },
  { id: 'psa-terbum', file: 'psa-terbum.mp3', image: 'psa.png', label: 'PSA Terbum' },
  { id: 'sorry', file: 'sorry.mp3', image: 'psa.png', label: 'Sorry' },
  { id: 'ba3janoke', file: 'ba3janoke.mp3', image: 'psa.png', label: 'Ba3janoke' },
  
  // Chai (Uses chai.png)
  { id: 'chai', file: 'chai.mp3', image: 'chai.png', label: 'Chai Time' },

  // Aland Group (Everything else uses aland.png)
  { id: 'supernoworries', file: 'supernoworries.mp3', image: 'aland.png', label: 'Super No Worries' },
  { id: 'happybirthday', file: 'happybirthday.mp3', image: 'aland.png', label: 'Happy Birthday' },
  { id: 'kak-hamno', file: 'kak-hamno-zorsupas.mp3', image: 'aland.png', label: 'Kak Hamno Supas' },
  { id: 'kak-aland', file: 'kak-aland-zorsupas.mp3', image: 'aland.png', label: 'Kak Aland Supas' },
  { id: 'whistle', file: 'whistle.mp3', image: 'aland.png', label: 'Whistle' },
  { id: 'ba3', file: 'ba3.mp3', image: 'aland.png', label: 'Ba3' },
];

const SoundboardApp = () => {
  const [activeSoundId, setActiveSoundId] = useState(null);
  const audioRef = useRef(new Audio());

  const playSound = (sound) => {
    // If clicking the same sound that is currently playing, stop it
    if (activeSoundId === sound.id && !audioRef.current.paused) {
      stopSound();
      return;
    }

    // Stop currently playing sound
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    // Load and play new sound (looking in root directory)
    audioRef.current.src = `/${sound.file}`;
    audioRef.current.play().catch(e => console.error("Playback error:", e));
    
    setActiveSoundId(sound.id);

    audioRef.current.onended = () => {
      setActiveSoundId(null);
    };
  };

  const stopSound = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setActiveSoundId(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 font-sans select-none">
      {/* Header */}
      <header className="mb-8 text-center pt-4">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
          The Iconic Board
        </h1>
        <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest">Tap to Play</p>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pb-32">
        {soundData.map((sound) => {
          const isActive = activeSoundId === sound.id;
          
          return (
            <button
              key={sound.id}
              onClick={() => playSound(sound)}
              className={`
                relative group overflow-hidden rounded-2xl aspect-square transition-all duration-200
                ${isActive ? 'ring-4 ring-yellow-400 scale-95' : 'hover:scale-[1.02] active:scale-95'}
                bg-gray-800 shadow-xl border border-gray-700
              `}
            >
              {/* Image Layer */}
              <div className="absolute inset-0">
                <img 
                  src={`/${sound.image}`} 
                  alt={sound.label}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              </div>

              {/* Playing Indicator (Equalizer Bars) */}
              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                   <div className="flex space-x-1 h-10 items-end">
                      <div className="w-1.5 bg-yellow-400 animate-[bounce_0.8s_infinite] h-4"></div>
                      <div className="w-1.5 bg-yellow-400 animate-[bounce_1.1s_infinite] h-8"></div>
                      <div className="w-1.5 bg-yellow-400 animate-[bounce_0.6s_infinite] h-6"></div>
                   </div>
                </div>
              )}

              {/* Text Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                <span className={`text-sm font-bold block truncate leading-tight ${isActive ? 'text-yellow-300' : 'text-gray-100'}`}>
                  {sound.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Floating Stop Button */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center px-4 pointer-events-none">
        <div className={`
          pointer-events-auto transition-all duration-300 transform 
          ${activeSoundId ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
        `}>
          <button 
            onClick={stopSound}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 active:scale-95 transition-transform"
          >
            <Square size={18} fill="currentColor" />
            <span>STOP</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoundboardApp;