import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import loveData from '../data/loveData';

const accentMap = {
  sparkle: <Sparkles className="h-4 w-4" />,
  heart: <Heart className="h-4 w-4 fill-current" />,
  rose: <Heart className="h-4 w-4" />,
  gold: <Sparkles className="h-4 w-4" />,
};

export default function StorySection() {
  return (
    <section className="relative px-5 py-20 md:px-8" id="story">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          eyebrow="Our Story"
          title="A love that keeps becoming beautiful"
          subtitle="Every chapter has been small, honest, and full of the kind of feeling I never want to lose."
        />

        <div className="relative mt-14 space-y-8">
          <div className="absolute left-[18px] top-0 hidden h-full w-px bg-gradient-to-b from-rose-300/60 via-rose-200/80 to-transparent md:block" />

          {loveData.story.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -36 : 36, y: 18 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative flex items-start gap-5 md:gap-8"
            >
              <div className="relative z-10 mt-2 flex h-9 w-9 items-center justify-center rounded-full border border-rose-200/40 bg-[#1e0d18]/80 text-rose-100 shadow-[0_0_20px_rgba(255,181,202,0.2)]">
                {accentMap[item.accent]}
              </div>

              <div className="w-full rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_10px_30px_rgba(17,10,17,0.22)] backdrop-blur-md md:p-7">
                <p className="text-xs font-medium uppercase tracking-[0.26em] text-rose-200/80">{item.date}</p>
                <h3 className="mt-4 font-display text-3xl text-white md:text-4xl">{item.title}</h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-rose-50/80">{item.message}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
