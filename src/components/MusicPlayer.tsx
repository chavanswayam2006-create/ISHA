import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Disc, Music, Upload } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioSrc, setAudioSrc] = useState('/music/darkhast.mp3');
  const [trackName, setTrackName] = useState('Darkhaast (Tu Darkhaast Meri)');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt auto-play when user interacts with page
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Browser autoplay restriction handling
        });
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const togglePlay = () => {
    soundEngine.playHeartPop();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback error:", err);
      });
    }
  };

  const toggleMute = () => {
    soundEngine.playHeartPop();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setAudioSrc(fileUrl);
      setTrackName(file.name.replace(/\.[^/.]+$/, ""));
      setIsPlaying(false);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }, 300);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="glass-panel rounded-full p-2.5 pr-5 border-2 border-amber-300/40 shadow-[0_0_30px_rgba(224,169,109,0.3)] flex items-center gap-3 backdrop-blur-2xl">
        {/* Spinning Vinyl Disk */}
        <button
          onClick={togglePlay}
          className={`relative w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center border-2 border-amber-300/80 cursor-pointer shadow-xl group transform hover:scale-105 transition-transform ${
            isPlaying ? 'animate-spin' : ''
          }`}
          style={{ animationDuration: '5s' }}
          title={isPlaying ? "Pause Music" : "Play Darkhaast"}
        >
          <Disc className="w-8 h-8 text-rose-400 group-hover:text-amber-300 transition-colors" />
          <div className="absolute w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-slate-900 flex items-center justify-center">
            {isPlaying ? (
              <Pause className="w-2 h-2 text-slate-900 fill-slate-900" />
            ) : (
              <Play className="w-2 h-2 text-slate-900 fill-slate-900 ml-0.5" />
            )}
          </div>
        </button>

        {/* Track Title & Visualizer */}
        <div className="flex flex-col max-w-[170px] sm:max-w-[200px]">
          <span className="text-xs font-serif-title font-semibold text-rose-100 flex items-center gap-1 truncate">
            <Music className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="truncate">{trackName}</span>
          </span>

          {/* Equalizer Bars */}
          <div className="flex items-end gap-1 h-3 mt-1">
            <div className={`w-1 bg-rose-400 rounded-full transition-all duration-300 ${isPlaying ? 'h-3 animate-pulse' : 'h-1'}`} />
            <div className={`w-1 bg-amber-300 rounded-full transition-all duration-300 ${isPlaying ? 'h-2.5 animate-pulse' : 'h-1'}`} style={{ animationDelay: '0.2s' }} />
            <div className={`w-1 bg-pink-400 rounded-full transition-all duration-300 ${isPlaying ? 'h-3.5 animate-pulse' : 'h-1'}`} style={{ animationDelay: '0.4s' }} />
            <div className={`w-1 bg-amber-200 rounded-full transition-all duration-300 ${isPlaying ? 'h-2 animate-pulse' : 'h-1'}`} style={{ animationDelay: '0.1s' }} />
            <span className="text-[9px] text-amber-200/80 font-sans-ui ml-1 uppercase font-medium">
              {isPlaying ? 'Playing' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Audio Mute Button */}
        <button
          onClick={toggleMute}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 transition-colors cursor-pointer"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
        </button>

        {/* Change MP3 Custom File Uploader */}
        <label className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 transition-colors cursor-pointer" title="Change Audio Track">
          <Upload className="w-4 h-4 text-amber-300" />
          <input type="file" accept="audio/*" className="hidden" onChange={handleFileUpload} />
        </label>
      </div>
    </div>
  );
};
