import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function MusicPlayer({ 
  onPlayStateChange, 
  autoPlay = false 
}: { 
  onPlayStateChange?: (playing: boolean) => void;
  autoPlay?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const youtubeRef = useRef<HTMLIFrameElement>(null);
  // Keep a stable ref to the callback so cleanup doesn't need it as a dep
  const onPlayStateChangeRef = useRef(onPlayStateChange);
  useEffect(() => { onPlayStateChangeRef.current = onPlayStateChange; }, [onPlayStateChange]);

  // Notify parent on unmount if still playing
  useEffect(() => {
    return () => {
      onPlayStateChangeRef.current?.(false);
    };
  }, []); // intentionally empty — only runs on unmount

  useEffect(() => {
    if (autoPlay) {
      // Need a tiny timeout to ensure the iframe is ready to receive postMessage
      const timer = setTimeout(() => {
        postYouTubeCommand('playVideo');
        setPlaying(true);
        onPlayStateChangeRef.current?.(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoPlay]);

  const postYouTubeCommand = (command: 'playVideo' | 'pauseVideo') => {
    youtubeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: command, args: [] }),
      'https://www.youtube.com'
    );
  };

  const togglePlayback = useCallback(() => {
    if (playing) {
      postYouTubeCommand('pauseVideo');
      setPlaying(false);
      onPlayStateChangeRef.current?.(false);
    } else {
      postYouTubeCommand('playVideo');
      setPlaying(true);
      onPlayStateChangeRef.current?.(true);
    }
  }, [playing]);

  return (
    <div className="flex flex-col items-center gap-4 pb-4">
      {/* Hidden YouTube iframe */}
      <iframe
        ref={youtubeRef}
        title="Tum Ho Toh YouTube audio player"
        src="https://www.youtube.com/embed/rOUuGvJkBrQ?enablejsapi=1&playsinline=1&controls=0"
        allow="autoplay; encrypted-media"
        className="h-px w-px opacity-0 pointer-events-none absolute"
      />

      {/* Label above the button */}
      <span className="font-bodySecondary text-[0.68rem] uppercase tracking-[0.18em] text-champagne/70">
        {playing ? '♪ Now Playing' : 'Tum Ho Toh'}
      </span>

      <motion.button
        type="button"
        onClick={togglePlayback}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex items-center justify-center h-24 w-24 rounded-full border border-champagne/30 bg-[radial-gradient(circle_at_50%_50%,#F4EFE3_0%,#C8B7AD_35%,#600024_36%,#26000f_100%)] shadow-2xl"
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        {/* Spinning ring when playing */}
        <span
          className={`absolute inset-2 rounded-full border border-champagne/30 transition-all duration-700 ${
            playing ? 'animate-spin-slow' : ''
          }`}
        />
        {/* Inner vinyl hole */}
        <span className="absolute h-9 w-9 rounded-full bg-oxblood shadow-inner flex items-center justify-center">
          {/* Play / Pause icon */}
          <span className={`text-lg text-champagne select-none ${playing ? '' : 'ml-1'}`}>
            {playing ? 'Ⅱ' : '▶'}
          </span>
        </span>
      </motion.button>
    </div>
  );
}
