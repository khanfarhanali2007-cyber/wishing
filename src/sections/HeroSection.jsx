import { motion } from 'framer-motion';
import { ArrowDown, Heart } from 'lucide-react';
import loveData from '../data/loveData';
import FloatingParticles from '../components/FloatingParticles';

export default function HeroSection() {
  const hearts = Array.from({ length: 6 }, (_, index) => ({
    id: index,
    left: `${12 + index * 13}%`,
    delay: index * 0.5,
    duration: 4 + index * 0.5,
  }));

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-16 pb-10 md:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,196,212,0.28),_transparent_34%),radial-gradient(circle_at_bottom,_rgba(111,15,54,0.46),_transparent_47%)]" />
      <FloatingParticles count={24} color="rgba(255, 198, 220, 0.65)" />

      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-16 text-2xl text-rose-200/75"
          style={{ left: heart.left }}
          animate={{ y: [0, -18, 0], opacity: [0.45, 1, 0.45], rotate: [0, 8, -8, 0] }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: heart.delay,
          }}
        >
          <Heart className="h-7 w-7 fill-current" />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-200/35 bg-white/6 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-rose-100/90 shadow-[0_0_25px_rgba(255,185,200,0.15)] backdrop-blur-md"
        >
          <Heart className="h-3.5 w-3.5 fill-current text-rose-300" />
          My favorite person
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, filter: 'blur(14px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.35, duration: 1.1 }}
          className="font-display text-5xl text-white drop-shadow-[0_0_30px_rgba(255,196,212,0.35)] md:text-7xl"
        >
          {loveData.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-rose-100/85 md:text-xl"
        >
          {loveData.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-10 inline-flex items-center gap-3 rounded-full border border-rose-200/30 bg-[#fff7f9]/10 px-5 py-3 text-sm text-rose-50 backdrop-blur-md"
        >
          <ArrowDown className="h-4 w-4 animate-bounce text-rose-300" />
          <span>{loveData.hero.scrollLabel}</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
