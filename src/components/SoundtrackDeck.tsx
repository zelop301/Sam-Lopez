import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Music, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  Maximize2, 
  Minimize2,
  Gamepad2,
  Disc,
  Info
} from 'lucide-react';
import { audioSystem, ChiptuneTrack } from '../utils/audioSystem';

interface SoundtrackDeckProps {
  rgbTheme?: 'cyberpunk' | 'chroma' | 'toxic' | 'ice' | 'matrix';
}

export const SoundtrackDeck: React.FC<SoundtrackDeckProps> = ({ rgbTheme = 'cyberpunk' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState<ChiptuneTrack>(audioSystem.tracks[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentMelodyNote, setCurrentMelodyNote] = useState<string>('-');
  const [currentBassNote, setCurrentBassNote] = useState<string>('-');
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  // Ambient soundscape states
  const [selectedSoundscapeId, setSelectedSoundscapeId] = useState<string>('');
  const [soundscapeVolume, setSoundscapeVolume] = useState(0.4);
  const [isPlayingSoundscape, setIsPlayingSoundscape] = useState(false);

  // Colors based on RGB profile themes matching Zelo's setup
  const themeColors = {
    cyberpunk: { text: "text-amber-400", border: "border-pink-500/30", glow: "shadow-pink-500/20", neon: "text-pink-400", bg: "bg-pink-950/20", progress: "bg-pink-500" },
    chroma: { text: "text-purple-400", border: "border-purple-500/30", glow: "shadow-purple-500/20", neon: "text-purple-400", bg: "bg-purple-950/20", progress: "bg-purple-500" },
    toxic: { text: "text-lime-400", border: "border-emerald-500/30", glow: "shadow-emerald-500/20", neon: "text-emerald-400", bg: "bg-emerald-950/20", progress: "bg-emerald-500" },
    ice: { text: "text-cyan-400", border: "border-blue-500/30", glow: "shadow-blue-500/20", neon: "text-cyan-400", bg: "bg-blue-950/20", progress: "bg-blue-500" },
    matrix: { text: "text-emerald-400", border: "border-green-500/30", glow: "shadow-green-500/20", neon: "text-emerald-400", bg: "bg-emerald-950/20", progress: "bg-emerald-500" }
  };

  const activeTheme = themeColors[rgbTheme] || themeColors.cyberpunk;

  // Key map for live trigger jam synth
  const PLAYABLE_KEYS = [
    { note: "C4", name: "C", freq: 261.63 },
    { note: "D4", name: "D", freq: 293.66 },
    { note: "E4", name: "E", freq: 329.63 },
    { note: "F4", name: "F", freq: 349.23 },
    { note: "G4", name: "G", freq: 392.00 },
    { note: "A4", name: "A", freq: 440.00 },
    { note: "B4", name: "B", freq: 493.88 },
    { note: "C5", name: "C+", freq: 523.25 },
    { note: "D5", name: "D+", freq: 587.33 },
    { note: "E5", name: "E+", freq: 659.25 }
  ];

  useEffect(() => {
    // Read starting state of master mute and music values
    setIsMuted(audioSystem.getMutedState());
    setVolume(audioSystem.getMusicVolume());
    setIsPlaying(audioSystem.getIsPlayingMusic());
    const actId = audioSystem.getActiveTrackId();
    if (actId) {
      const active = audioSystem.tracks.find(t => t.id === actId);
      if (active) setActiveTrack(active);
    }

    // Load initial soundscape settings
    setSelectedSoundscapeId(audioSystem.getActiveSoundscapeId() || '');
    setSoundscapeVolume(audioSystem.getSoundscapeVolume());
    setIsPlayingSoundscape(audioSystem.getIsPlayingSoundscape());

    // Subscribe to mechanical note trigger callbacks
    const handleSequencerNote = (trackId: string, step: number, note: string, bass: string) => {
      setCurrentStep(step);
      setCurrentMelodyNote(note);
      setCurrentBassNote(bass);
    };

    audioSystem.addNoteCallback(handleSequencerNote);

    return () => {
      audioSystem.removeNoteCallback(handleSequencerNote);
    };
  }, []);

  const handlePlayToggle = () => {
    audioSystem.playClick();
    if (isPlaying) {
      audioSystem.stopMusic();
      setIsPlaying(false);
    } else {
      audioSystem.startMusic(activeTrack.id);
      setIsPlaying(true);
    }
  };

  const handleSoundscapeChange = (id: string) => {
    audioSystem.playClick();
    if (id === '') {
      audioSystem.stopSoundscape();
      setSelectedSoundscapeId('');
      setIsPlayingSoundscape(false);
    } else {
      audioSystem.startSoundscape(id);
      setSelectedSoundscapeId(id);
      setIsPlayingSoundscape(true);
    }
  };

  const handleSoundscapeVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setSoundscapeVolume(val);
    audioSystem.setSoundscapeVolume(val);
  };

  const handleSoundscapeToggle = () => {
    audioSystem.playClick();
    if (isPlayingSoundscape) {
      audioSystem.stopSoundscape();
      setIsPlayingSoundscape(false);
    } else if (selectedSoundscapeId) {
      audioSystem.startSoundscape(selectedSoundscapeId);
      setIsPlayingSoundscape(true);
    } else if (audioSystem.soundscapes.length > 0) {
      const firstId = audioSystem.soundscapes[0].id;
      audioSystem.startSoundscape(firstId);
      setSelectedSoundscapeId(firstId);
      setIsPlayingSoundscape(true);
    }
  };

  const handleTrackChange = (track: ChiptuneTrack) => {
    audioSystem.playClick();
    setActiveTrack(track);
    setShowPlaylist(false);
    if (isPlaying) {
      audioSystem.startMusic(track.id);
    }
  };

  const handleNext = () => {
    audioSystem.playClick();
    const currentIndex = audioSystem.tracks.findIndex(t => t.id === activeTrack.id);
    const nextIndex = (currentIndex + 1) % audioSystem.tracks.length;
    const nextTrack = audioSystem.tracks[nextIndex];
    setActiveTrack(nextTrack);
    if (isPlaying) {
      audioSystem.startMusic(nextTrack.id);
    }
  };

  const handlePrev = () => {
    audioSystem.playClick();
    const currentIndex = audioSystem.tracks.findIndex(t => t.id === activeTrack.id);
    const prevIndex = (currentIndex - 1 + audioSystem.tracks.length) % audioSystem.tracks.length;
    const prevTrack = audioSystem.tracks[prevIndex];
    setActiveTrack(prevTrack);
    if (isPlaying) {
      audioSystem.startMusic(prevTrack.id);
    }
  };

  const handleMuteToggle = () => {
    const nextMute = audioSystem.toggleMute();
    setIsMuted(nextMute);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioSystem.setMusicVolume(val);
  };

  // User plays notes live on mechanical keyboard
  const handleLivePlay = (noteName: string, freq: number) => {
    if (isMuted) {
      // automatically unmute to hear the play
      const nextMute = audioSystem.toggleMute();
      setIsMuted(nextMute);
    }
    // Play the exact note pitched with the Web Audio context oscillator
    audioSystem.playJamNote(freq);
  };

  return (
    <div id="deck-soundtrack" className="relative w-full">
      {/* Floating Mini Player Option */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-50 p-3 bg-zinc-900/95 border ${activeTheme.border} rounded-2xl shadow-2xl flex items-center gap-4 w-80 backdrop-blur-xl`}
          >
            <div className="relative group cursor-pointer" onClick={() => setIsMinimized(false)}>
              <div className={`p-2.5 rounded-xl bg-zinc-800 ${isPlaying ? 'animate-spin [animation-duration:8s]' : ''} border border-white/10`}>
                <Disc className={`w-5 h-5 ${isPlaying ? activeTheme.neon : 'text-zinc-400'}`} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0" onClick={() => setIsMinimized(false)}>
              <p className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Live Soundtrack</p>
              <div className="overflow-hidden w-full relative h-4">
                <p className="absolute whitespace-nowrap text-xs font-mono font-semibold text-zinc-200 animate-[marquee_15s_linear_infinite]">
                  {isPlaying ? `Playing: ${activeTrack.title}` : `Paused: ${activeTrack.title}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handlePlayToggle}
                className={`p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition ${activeTheme.neon} active:scale-95`}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button 
                onClick={() => setIsMinimized(false)}
                className="p-1.5 rounded-lg bg-zinc-805 hover:bg-zinc-800 transition text-zinc-400 hover:text-white"
                title="Expand Tracker Console"
              >
                <Maximize2 size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Full-Size Deck */}
      {!isMinimized && (
        <div className={`w-full bg-zinc-950/80 border ${activeTheme.border} rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md relative transition-all duration-500 group`}>
          {/* Scanline CRT glass overlay */}
          <div className="absolute inset-0 bg-retro-scanlines opacity-[0.03] pointer-events-none rounded-3xl" />
          
          {/* Header Bar */}
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-zinc-900/40">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${activeTheme.bg} border border-white/5`}>
                <Gamepad2 className={`w-5 h-5 ${activeTheme.neon}`} />
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wider text-zinc-100 uppercase font-sans">8-Bit Sound & Soundtrack Deck</h3>
                <p className="text-xs text-zinc-400 font-mono">Live dynamic tracker synthesized overtime</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMinimized(true)}
                className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition"
                title="Minimize to floating system bar"
              >
                <Minimize2 size={14} />
              </button>
            </div>
          </div>

          {/* CRT Screen Panel */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 flex flex-col justify-between bg-black/60 border border-white/5 rounded-2xl p-5 relative overflow-hidden min-h-[190px]">
              {/* Matrix glow effect */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-500/5 blur-3xl rounded-full pointer-events-none" />
              
              {/* Track Info */}
              <div className="relative z-10">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-zinc-800 text-zinc-400 tracking-wider font-semibold uppercase">
                      Track 0{audioSystem.tracks.findIndex(t => t.id === activeTrack.id) + 1} // CHIPTUNE
                    </span>
                    <h4 className="text-lg font-mono font-bold text-white mt-1.5 tracking-tight group-hover:text-yellow-400 transition-colors">
                      {activeTrack.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 font-mono">
                      {activeTrack.description}
                    </p>
                  </div>
                  
                  {/* Digital Live Indicator */}
                  <div className="flex items-center gap-1.5 bg-zinc-900/85 px-2 py-1 rounded-md border border-white/5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-500 animate-ping' : 'bg-zinc-600'}`} />
                    <span className="text-[10px] font-mono text-zinc-300 uppercase">{isPlaying ? 'Playing' : 'Stopped'}</span>
                  </div>
                </div>

                {/* Animated Sequencer Timeline */}
                <div className="mt-5">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-1">
                    <span>STEP SEQUENCER RUNTIME</span>
                    <span className={activeTheme.neon}>{currentStep + 1} / 32</span>
                  </div>
                  <div className="grid gap-[2.5px] h-3.5" style={{ gridTemplateColumns: 'repeat(32, minmax(0, 1fr))' }}>
                    {Array.from({ length: 32 }).map((_, step) => {
                      const isActive = step === currentStep;
                      const hasNote = activeTrack.melody[step] !== '-';
                      let colorClass = "bg-zinc-800/40";
                      
                      if (isActive) {
                        colorClass = "bg-yellow-400 shadow-[0_0_8px_#fbbf24]";
                      } else if (hasNote) {
                        colorClass = isPlaying ? "bg-purple-500/40" : "bg-purple-900/25";
                      }

                      return (
                        <div 
                          key={step} 
                          className={`rounded-sm transition-all duration-100 ${colorClass}`}
                          title={`Step ${step + 1}: ${activeTrack.melody[step]}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Live Signal Feed Panel */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/5 font-mono text-[11px] relative z-10">
                <div className="bg-zinc-900/60 p-2 rounded border border-white/5">
                  <span className="block text-[8px] text-zinc-500 uppercase">Lead Synth Osc</span>
                  <span className="text-zinc-200 mt-0.5 font-semibold block truncate">
                    {isPlaying && currentMelodyNote !== '-' ? `Square: ${currentMelodyNote}` : 'IDLE -'}
                  </span>
                </div>
                <div className="bg-zinc-900/60 p-2 rounded border border-white/5">
                  <span className="block text-[8px] text-zinc-500 uppercase">Bass Sub Osc</span>
                  <span className="text-zinc-200 mt-0.5 font-semibold block truncate">
                    {isPlaying && currentBassNote !== '-' ? `Triangle: ${currentBassNote}` : 'IDLE -'}
                  </span>
                </div>
                <div className="bg-zinc-900/60 p-2 rounded border border-white/5">
                  <span className="block text-[8px] text-zinc-500 uppercase">Beats / Tempo</span>
                  <span className="text-amber-400 mt-0.5 font-semibold block">
                    {activeTrack.bpm} <span className="text-[8px] text-zinc-500">BPM</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Hardware Slider Controls & Playlist */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Station Console Panel</span>
                  <button 
                    onClick={() => setShowPlaylist(!showPlaylist)}
                    className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/20"
                  >
                    <span>{showPlaylist ? 'Hide Playlist' : 'Show Library'}</span>
                  </button>
                </div>

                {/* Playlist Drawer */}
                <AnimatePresence mode="wait">
                  {showPlaylist ? (
                    <motion.div 
                      key="playlist"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-black/40 border border-white/5 rounded-xl p-3 max-h-[145px] overflow-y-auto space-y-1 scrollbar-thin"
                    >
                      {audioSystem.tracks.map((track, i) => (
                        <div 
                          key={track.id}
                          onClick={() => handleTrackChange(track)}
                          className={`p-2 rounded-lg flex items-center justify-between cursor-pointer transition ${
                            activeTrack.id === track.id 
                              ? 'bg-zinc-800 text-white border border-white/10' 
                              : 'hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-zinc-500">0{i+1}</span>
                            <span className="text-xs font-mono font-medium">{track.title}</span>
                          </div>
                          <span className="text-[9px] font-mono text-zinc-500">{track.bpm} BPM</span>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    /* Slider Deck Console */
                    <motion.div 
                      key="sliders"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 bg-zinc-900/20 border border-white/5 rounded-xl p-4"
                    >
                      {/* Interactive knobs/faders simulated */}
                      <div>
                        <div className="flex justify-between items-center mb-1 text-[10px] font-mono">
                          <span className="text-zinc-400 uppercase flex items-center gap-1">
                            <Volume2 size={11} /> Master Synth Level
                          </span>
                          <span className="text-zinc-300">{Math.round(volume * 100)}%</span>
                        </div>
                        <input 
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-full accent-emerald-500 bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      {/* Ambient Soundscapes Selector */}
                      <div className="pt-2.5 border-t border-white/5 space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className="text-zinc-400 uppercase flex items-center gap-1">
                            <Disc size={11} className={isPlayingSoundscape ? "animate-spin text-teal-400" : ""} /> Ambient Soundscape
                          </span>
                          <button
                            type="button"
                            onClick={handleSoundscapeToggle}
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded cursor-pointer transition select-none border-none ${
                              isPlayingSoundscape
                                ? 'bg-teal-500/25 text-teal-300 border border-teal-500/30 font-bold shadow-[0_0_8px_rgba(20,184,166,0.15)]'
                                : 'bg-zinc-800 text-zinc-500 border border-white/5'
                            }`}
                          >
                            {isPlayingSoundscape ? 'ACTIVE' : 'INACTIVE'}
                          </button>
                        </div>
                        
                        <div className="relative">
                          <select
                            value={selectedSoundscapeId}
                            onChange={(e) => handleSoundscapeChange(e.target.value)}
                            className="w-full bg-black/60 border border-white/5 hover:border-white/10 rounded-lg py-1.5 px-2 text-xs text-zinc-200 focus:outline-none focus:border-teal-500/40 font-mono cursor-pointer"
                          >
                            <option value="">-- Select Soundscape --</option>
                            {audioSystem.soundscapes.map((sc) => (
                              <option key={sc.id} value={sc.id}>
                                {sc.nameEn}
                              </option>
                            ))}
                          </select>
                        </div>

                        {selectedSoundscapeId && (
                          <div className="mt-1">
                            <div className="flex justify-between items-center mb-1 text-[9px] font-mono">
                              <span className="text-zinc-500 uppercase">Soundscape Volume</span>
                              <span className="text-zinc-400">{Math.round(soundscapeVolume * 100)}%</span>
                            </div>
                            <input 
                              type="range"
                              min="0"
                              max="1"
                              step="0.05"
                              value={soundscapeVolume}
                              onChange={handleSoundscapeVolumeChange}
                              className="w-full accent-teal-400 bg-zinc-805 h-1 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-white/5">
                        <span className="text-[10px] font-mono text-zinc-500">AUTOPLAY PREFERENCE</span>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={handleMuteToggle}
                            className={`px-3 py-1 text-[10px] font-mono rounded flex items-center gap-1 border transition ${
                              isMuted 
                                ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            }`}
                          >
                            {isMuted ? <VolumeX size={10} /> : <Volume2 size={10} />}
                            <span>{isMuted ? 'Muted' : 'Unmuted'}</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Primary Action Row */}
              <div className="flex items-center gap-3 mt-4">
                <button 
                  onClick={handlePrev}
                  className="flex-1 py-3 px-4 rounded-xl bg-zinc-900 border border-white/5 hover:border-white/10 hover:bg-zinc-850 active:scale-95 transition flex items-center justify-center text-zinc-300"
                  title="Previous Track"
                >
                  <SkipBack size={16} />
                </button>
                
                <button 
                  onClick={handlePlayToggle}
                  className={`flex-[2] py-3 px-4 rounded-xl font-mono text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition active:scale-95 z-10 ${
                    isPlaying 
                      ? 'bg-amber-500 text-black border border-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.35)]' 
                      : 'bg-emerald-500 text-black border border-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause size={14} fill="currentColor" />
                      <span>Pause Track</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} fill="currentColor" />
                      <span>Play Track</span>
                    </>
                  )}
                </button>

                <button 
                  onClick={handleNext}
                  className="flex-1 py-3 px-4 rounded-xl bg-zinc-900 border border-white/5 hover:border-white/10 hover:bg-zinc-850 active:scale-95 transition flex items-center justify-center text-zinc-300"
                  title="Next Track"
                >
                  <SkipForward size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Mechanical Chiptune Keypad for Live Jamming */}
          <div className="px-6 pb-6 pt-2 border-t border-white/5 bg-zinc-950/45">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase flex items-center gap-1">
                ⌨️ Mechanical Keyboard Soundboard (Click To Jam Along)
              </span>
              <span className="text-[9px] font-mono text-zinc-500">Uses raw Web Audio oscillators</span>
            </div>
            
            <div className="grid grid-cols-10 gap-1.5">
              {PLAYABLE_KEYS.map((key) => {
                const isBlackKey = key.name.includes('#');
                return (
                  <button 
                    key={key.note}
                    onClick={() => handleLivePlay(key.note, key.freq)}
                    className="aspect-[3/4] rounded-lg border flex flex-col justify-between p-1.5 font-mono cursor-pointer transition shadow-[0_4px_0_rgba(0,0,0,0.4)] active:translate-y-1 active:shadow-none hover:border-white/20 bg-zinc-900/80 border-white/5 hover:bg-zinc-805"
                  >
                    <span className="text-[8px] text-zinc-500 self-end select-none">{key.note}</span>
                    <span className="text-xs font-semibold text-zinc-200 self-center">{key.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
