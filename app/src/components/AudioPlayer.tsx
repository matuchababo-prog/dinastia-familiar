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
    <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col gap-4 transition-all hover:border-amber-500/50 hover:shadow-md">
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}
      
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          <button
            onClick={togglePlay}
            disabled={!audioUrl}
            aria-label={isPlaying ? `Pausar grabación ${title}` : `Reproducir grabación ${title}`}
            className={`px-4 py-2.5 rounded-2xl flex items-center gap-2 font-bold text-xs sm:text-sm transition-all shrink-0 ${
              audioUrl 
                ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md hover:scale-102 active:scale-98 cursor-pointer' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause size={18} />
                <span>Pausar Voz</span>
              </>
            ) : (
              <>
                <Play size={18} />
                <span>Escuchar Voz</span>
              </>
            )}
          </button>

          <div className="truncate">
            <h4 className="m-0 text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 truncate">{title}</h4>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-1 font-bold text-amber-700 dark:text-amber-400">
                <Mic size={12} /> Grabación de voz
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 font-semibold">
                <Clock size={11} /> {isPlaying ? `${currentTimeFormatted} / ${duration}` : duration}
              </span>
            </div>
          </div>
        </div>

        <Volume2 size={22} className="text-amber-600/80 shrink-0" />
      </div>

      {/* Interactive Waveform Bar with Seek */}
      <div 
        className="flex items-center gap-1.5 h-8 cursor-pointer group px-1 py-1 rounded-xl bg-amber-500/5 hover:bg-amber-500/10 transition-colors"
        title="Toca para adelantar o retroceder"
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
                style={{ height: `${Math.max(h, 20)}%` }}
                className={`w-full rounded-full transition-all duration-150 ${
                  isActive ? 'bg-orange-600 shadow-xs' : 'bg-amber-500/35'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Transcription Quote */}
      <div className="bg-white dark:bg-slate-800 border-2 border-amber-500/20 p-3.5 rounded-2xl text-xs sm:text-sm italic text-slate-800 dark:text-slate-200 leading-relaxed shadow-2xs">
        "{transcript}"
      </div>
    </div>
  );
};

