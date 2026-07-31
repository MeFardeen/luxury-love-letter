import { useState, useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import Hero from './components/Hero';
import Notebook from './components/Notebook';
import MagicParticles from './components/MagicParticles';
import FinalScene from './components/FinalScene';
import YouTube from 'react-youtube';
import type { YouTubeEvent, YouTubePlayer } from 'react-youtube';

export default function App() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMusicPlayerPlaying, setIsMusicPlayerPlaying] = useState(false);

  // Use a ref so effects always read the latest player without stale closures
  const bgPlayerRef = useRef<YouTubePlayer | null>(null);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const handleStart = () => {
    setStarted(true);
  };

  const handleRestart = () => {
    // Pause music before resetting state
    bgPlayerRef.current?.pauseVideo();
    setIsMusicPlayerPlaying(false);
    setFinished(false);
    setStarted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onBgPlayerReady = (event: YouTubeEvent) => {
    // Store the player reference
    bgPlayerRef.current = event.target;
    
    // Attempt to force play immediately on load
    event.target.setVolume(35);
    event.target.playVideo();
  };

  const onBgPlayerStateChange = (event: YouTubeEvent<number>) => {
    // YouTube PlayerState.ENDED === 0
    // Loop back to the 33 second mark instead of restarting from 0
    if (event.data === 0) {
      bgPlayerRef.current?.seekTo(33, true);
      bgPlayerRef.current?.playVideo();
    }
  };

  // Centralised playback control
  useEffect(() => {
    const player = bgPlayerRef.current;
    if (!player) return;

    if (isMusicPlayerPlaying) {
      player.pauseVideo();
    } else if (started) {
      player.playVideo();
    }
  }, [isMusicPlayerPlaying, started]);

  const content = (
    <main
      className="relative w-full bg-oxblood overflow-x-hidden selection:bg-champagne selection:text-oxblood"
      style={{
        // On mobile: lock height+overflow on the landing page so there is nothing
        // to scroll. On desktop: Lenis handles smooth scroll, no lock needed.
        minHeight: '100dvh',
        overflowY: (!started && !isDesktop) ? 'hidden' : undefined,
        height: (!started && !isDesktop) ? '100dvh' : undefined,
      }}
    >
      <MagicParticles />

      {/* Hidden background piano player — rendered always so the player is ready */}
      <YouTube
        videoId="Lox_jyvBBEk"
        className="pointer-events-none"
        style={{ position: 'fixed', width: 0, height: 0, overflow: 'hidden', opacity: 0 }}
        opts={{
          height: '0',
          width: '0',
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            start: 33,
          },
        }}
        onReady={onBgPlayerReady}
        onStateChange={onBgPlayerStateChange}
      />

      {!started && <Hero onOpen={handleStart} />}

      {started && !finished && (
        <Notebook onFinish={() => setFinished(true)} />
      )}

      {finished && (
        <FinalScene
          onRestart={handleRestart}
          onMusicPlayerPlayStateChange={setIsMusicPlayerPlaying}
        />
      )}
    </main>
  );

  if (isDesktop) {
    return <ReactLenis root>{content}</ReactLenis>;
  }
  return content;
}
