import { motion } from 'framer-motion';

export default function Hero({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden flex items-end justify-center bg-oxblood">
      {/* Background image — full bleed, no gaps */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <img
          src="./images/image_243c26.jpg"
          alt="Cover"
          className="w-full h-full object-cover object-top"
        />
        {/* Gradient fades bottom into oxblood so text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-oxblood/20 to-oxblood" />
      </motion.div>

      {/* Text & CTA pinned near bottom */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pb-24 md:pb-32 w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
          className="font-heading text-fluid-hero text-ivory drop-shadow-2xl"
        >
          Happy Girlfriend's Day 🤍
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.5 }}
          className="font-handwritingPrimary text-fluid-h1 text-champagne mt-3 drop-shadow-md"
        >
          A little notebook written only for you...
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 1 }}
          whileHover={{ scale: 1.05, boxShadow: '0px 0px 24px rgba(233,221,214,0.45)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
          className="mt-10 px-10 py-4 border border-champagne/40 rounded-full text-champagne font-bodySecondary tracking-[0.2em] uppercase text-xs md:text-sm backdrop-blur-md bg-oxblood/40 hover:bg-oxblood/60 transition-all duration-300"
        >
          Open My Heart
        </motion.button>
      </div>
    </section>
  );
}
