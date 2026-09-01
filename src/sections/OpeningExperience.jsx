import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import loveData from '../data/loveData';
import FloatingParticles from '../components/FloatingParticles';

export default function OpeningExperience({ isOpen, onReveal }) {
  return (
    <AnimatePresence mode="wait">
      {!isOpen && (
        <motion.div
          key="opening"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#12060c] px-6"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,182,193,0.2),_transparent_36%),radial-gradient(circle_at_bottom,_rgba(110,9,44,0.5),_transparent_45%)]" />
          <FloatingParticles count={28} color="rgba(255, 214, 228, 0.75)" />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10 max-w-xl text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.12, 1], rotate: [0, -4, 4, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-8 flex justify-center text-rose-200"
            >
              <Heart className="h-12 w-12 fill-current drop-shadow-[0_0_18px_rgba(255,197,207,0.8)]" />
            </motion.div>

            <p className="font-display text-5xl font-medium text-rose-50 md:text-7xl">
              {loveData.opening.firstLine}
            </p>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="mt-5 text-xl text-rose-100/80 md:text-2xl"
            >
              {loveData.opening.secondLine}
            </motion.p>

            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={onReveal}
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-rose-200/40 bg-white/8 px-7 py-3 text-base font-medium text-rose-50 shadow-[0_0_30px_rgba(255,178,200,0.15)] backdrop-blur-md transition hover:bg-white/12"
            >
              <span>{loveData.opening.button}</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
