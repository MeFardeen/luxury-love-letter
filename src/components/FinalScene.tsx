import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MusicPlayer from './MusicPlayer';

const BACKGROUND_IMAGES = [
  "/images/image_243c26.jpg",
  "/images/image_243c22.jpg",
  "/images/image_243c1f.jpg"
];

export default function FinalScene({
  onRestart,
  onMusicPlayerPlayStateChange,
}: {
  onRestart: () => void;
  onMusicPlayerPlayStateChange: (playing: boolean) => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Change the background image every 8 seconds (allows for a long 3s fade)
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-end bg-oxblood overflow-x-hidden overflow-y-auto pb-16 md:pb-20 px-4 md:px-6">

      {/* ── Background: slow zoom toward center (60 s linear) ── */}
      <motion.div
        className="absolute inset-0 z-0 origin-center will-change-transform overflow-hidden"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.22 }}
        transition={{ duration: 60, ease: 'linear' }}
      >
        <AnimatePresence>
          <motion.img
            key={currentImageIndex}
            src={BACKGROUND_IMAGES[currentImageIndex]}
            alt="Final Portrait"
            className="absolute inset-0 w-full h-full object-cover object-top"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </motion.div>

      {/* ── Gradient: upper half transparent, lower half darkens ── */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 38%, rgba(58,0,23,0.72) 62%, rgba(58,0,23,0.96) 100%)'
        }}
      />

      {/* ── Content: pushed toward bottom so face shows above ── */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-lg mt-auto pt-[25vh] md:pt-[35vh]">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 2 }}
          className="font-heading text-3xl md:text-fluid-h1 text-ivory mb-6 md:mb-8"
        >
          Happy Girlfriend's Day 🤍
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3, duration: 2 }}
          className="bg-oxblood/50 backdrop-blur-md border border-champagne/20 p-5 md:p-7 rounded-2xl w-full"
        >
          <p className="font-handwritingPrimary text-fluid-handwriting text-champagne mb-3">
            "For someone truly special."
          </p>
          <p className="font-bodySecondary text-stone text-sm tracking-widest uppercase mt-4">
            Keep smiling, Puchkiii.
          </p>
        </motion.div>

        <motion.button
          type="button"
          onClick={onRestart}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.4, duration: 0.8 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="mt-6 md:mt-8 rounded-full border border-champagne/40 bg-champagne px-8 py-3 font-bodySecondary text-xs uppercase tracking-[0.18em] text-oxblood shadow-xl"
        >
          Rejourney
        </motion.button>

        {/* ── Music player centered ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1.2 }}
          className="mt-8 md:mt-12 flex justify-center w-full"
        >
          <MusicPlayer onPlayStateChange={onMusicPlayerPlayStateChange} autoPlay={true} />
        </motion.div>
      </div>
    </section>
  );
}
