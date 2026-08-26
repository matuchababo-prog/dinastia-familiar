import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, Mic, Clock } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  duration: string;
  transcript: string;
  audioUrl?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ title, duration, transcript, audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState('0:00');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        const mins = Math.floor(audio.currentTime / 60);
        const secs = Math.floor(audio.currentTime % 60);
        setCurrentTimeFormatted(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTimeFormatted('0:00');
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current || !audioUrl) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error('Audio playback error:', err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (percentage: number) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const targetTime = (percentage / 100) * audioRef.current.duration;
    audioRef.current.currentTime = targetTime;
    setProgress(percentage);
  };

  const waveformHeights = [35, 65, 30, 85, 55, 80, 45, 95, 70, 50, 85, 60, 40, 90, 65, 35, 75, 45];

  return (
    <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex flex-col gap-3.5 transition-all hover:border-amber-500/35 hover:shadow-md">
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            disabled={!audioUrl}
            aria-label={isPlaying ? `Pausar grabación ${title}` : `Reproducir grabación ${title}`}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              audioUrl 
                ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md hover:scale-105 active:scale-95 cursor-pointer' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>

          <div>
            <h4 className="m-0 text-sm font-bold text-slate-800 leading-tight">{title}</h4>
            <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-1 font-semibold text-amber-700">
                <Mic size={11} /> Grabación de voz
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock size={10} /> {isPlaying ? `${currentTimeFormatted} / ${duration}` : duration}
              </span>
            </div>
          </div>
        </div>

        <Volume2 size={18} className="text-amber-600/70" />
      </div>

      {/* Interactive Waveform Bar with Seek */}
      <div 
        className="flex items-center gap-1 h-7 cursor-pointer group px-1 py-0.5 rounded-lg hover:bg-amber-500/5 transition-colors"
        title="Haz clic para adelantar o retroceder"
      >
        {waveformHeights.map((h, idx) => {
          const barProgress = (idx / waveformHeights.length) * 100;
          const isActive = barProgress <= progress;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSeek(barProgress)}
              className="flex-1 h-full flex items-center bg-transparent border-none p-0 cursor-pointer focus:outline-none"
              aria-label={`Saltar a ${(idx / waveformHeights.length * 100).toFixed(0)}% del audio`}
            >
              <span
                style={{ height: `${h}%` }}
                className={`w-full rounded-full transition-all duration-150 group-hover:opacity-90 ${
                  isActive ? 'bg-orange-600 shadow-2xs' : 'bg-amber-500/30'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Transcription Quote */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xs border border-amber-500/15 p-2.5 rounded-xl text-xs italic text-slate-700 dark:text-slate-200 leading-relaxed shadow-2xs">
        "{transcript}"
      </div>
    </div>
  );
};

