import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, Mic } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  duration: string;
  transcript: string;
  audioUrl?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ title, duration, transcript, audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      style={{
        background: 'rgba(37, 99, 235, 0.08)',
        border: '1px solid rgba(37, 99, 235, 0.2)',
        borderRadius: '14px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={togglePlay}
            disabled={!audioUrl}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: audioUrl ? 'var(--color-primary)' : 'var(--color-muted)',
              color: audioUrl ? 'white' : 'var(--color-foreground)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: audioUrl ? 'pointer' : 'not-allowed',
              boxShadow: audioUrl ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none'
            }}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
          </button>
          <div>
            <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: 700 }}>{title}</h4>
            <span style={{ fontSize: '11px', opacity: 0.75, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Mic size={10} /> Grabación de voz · {duration}
            </span>
          </div>
        </div>
        <Volume2 size={18} style={{ opacity: 0.6 }} />
      </div>

      {/* Simulated Waveform Bar sync'd with progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '24px' }}>
        {[40, 70, 30, 90, 60, 80, 45, 100, 75, 50, 85, 60, 40, 95, 70, 30, 80, 50].map((h, idx) => {
          const barProgress = (idx / 18) * 100;
          const isActive = barProgress <= progress;
          return (
            <div
              key={idx}
              style={{
                flex: 1,
                height: `${h}%`,
                backgroundColor: isActive ? 'var(--color-primary)' : 'rgba(37, 99, 235, 0.25)',
                borderRadius: '4px',
                transition: 'all 0.2s ease'
              }}
            />
          );
        })}
      </div>

      {/* Transcription Preview */}
      <div style={{ background: 'var(--glass-bg)', padding: '10px 12px', borderRadius: '8px', fontSize: '12px', fontStyle: 'italic', opacity: 0.9 }}>
        "{transcript}"
      </div>
    </div>
  );
};
