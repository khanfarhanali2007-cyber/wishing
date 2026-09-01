import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import loveData from '../data/loveData';

export default function LoveReasonsSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="px-5 py-20 md:px-8" id="love-reasons">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Why I Love You"
          title="Things I love about you"
          subtitle="A few of the reasons you are my favorite person, my peace, and my home."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {loveData.loveReasons.map((reason, index) => {
            const isOpen = selected === index;

            return (
              <motion.button
                key={reason.title}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelected(isOpen ? null : index)}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 text-left shadow-[0_20px_50px_rgba(40,17,22,0.18)] backdrop-blur-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7d6de]/10 text-rose-200">
                    <Heart className="h-5 w-5 fill-current" />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-rose-200/80">{index + 1}</span>
                </div>

                <h3 className="font-display text-3xl text-white">{reason.title}</h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="mt-4 overflow-hidden text-base leading-relaxed text-rose-50/80"
                    >
                      {reason.text}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
