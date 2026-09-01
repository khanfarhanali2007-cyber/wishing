import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AudioLines, Heart, Music4, Sparkles } from 'lucide-react';
import OpeningExperience from './sections/OpeningExperience';
import HeroSection from './sections/HeroSection';
import StorySection from './sections/StorySection';
import GallerySection from './sections/GallerySection';
import LoveReasonsSection from './sections/LoveReasonsSection';
import loveData from './data/loveData';
import { useRelationshipTimer } from './hooks/useRelationshipTimer';

const cardSections = [
  'Opening',
  'Happy Monthsary',
  'Our Story',
  'Our Memories',
  'Why I Love You',
  'My Love Letter',
  'Interactive Heart',
  'Hidden Secret',
  'Our Time Together',
  'One Last Surprise',
];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [heartExploded, setHeartExploded] = useState(false);
  const [secretFound, setSecretFound] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const time = useRelationshipTimer(loveData.relationshipStart);

  const introText = useMemo(() => {
    return cardSections.join(' • ');
  }, []);

  const onOpenReveal = () => {
    setIsOpen(true);
  };

  const handleAudioToggle = () => {
    const audio = document.getElementById('song-audio');

    if (!audio) {
      setAudioReady(false);
      return;
    }

    if (audio.paused) {
      audio.play().catch(() => {
        setAudioReady(false);
      });
      setIsPlaying(true);
      setAudioReady(true);
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const customTimer = {
    months: 20,
    days: 0,
    hours: 15,
    minutes: 42,
    seconds: 17,
  };

  const timerBlocks = [
    { label: 'Months', value: customTimer.months },
    { label: 'Days', value: customTimer.days },
    { label: 'Hours', value: customTimer.hours },
    { label: 'Minutes', value: customTimer.minutes },
    { label: 'Seconds', value: customTimer.seconds },
  ];

  return (
    <div className="relative overflow-x-hidden bg-transparent text-rose-50">
      <OpeningExperience isOpen={isOpen} onReveal={onOpenReveal} />

      {!isOpen && <div className="fixed inset-0 -z-10 bg-[#12070d]" />}

      <div className={isOpen ? 'opacity-100 transition-opacity duration-700' : 'pointer-events-none opacity-0'}>
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#12070d]/65 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
            <div className="text-xs uppercase tracking-[0.28em] text-rose-200/80">Nicole</div>
            <div className="flex items-center gap-2 text-xs text-rose-100/70 md:text-sm">
              <Heart className="h-3.5 w-3.5 fill-current text-rose-300" />
              {introText}
            </div>
          </div>
        </header>

        <main className="relative">
          <HeroSection />

          <StorySection />

          <GallerySection />

          <LoveReasonsSection />

          <section className="px-5 py-20 md:px-8" id="letter">
            <div className="mx-auto max-w-4xl rounded-[34px] border border-white/10 bg-[#f9f0f4]/95 p-6 text-[#2b1219] shadow-[0_25px_60px_rgba(32,14,20,0.25)] md:p-10">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#8b3e52]">Letter</p>
              <h2 className="font-display text-4xl md:text-5xl">{loveData.letter.title}</h2>
              <div className="mt-8 space-y-6 text-lg leading-relaxed text-[#45262f] md:text-xl">
                <p>{loveData.letter.intro}</p>
                {loveData.letter.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="pt-4 text-[#5d3340]">{loveData.letter.closing}</p>
                <p className="font-display text-2xl italic text-[#7d3647]">{loveData.letter.signature}</p>
              </div>
            </div>
          </section>

          <section className="px-5 py-20 md:px-8" id="surprises">
            <div className="mx-auto max-w-5xl text-center">
              <button
                type="button"
                onClick={() => setHeartExploded((current) => !current)}
                className="group relative mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-rose-200/35 bg-white/6 text-rose-100 shadow-[0_0_50px_rgba(255,182,206,0.18)] backdrop-blur-md transition hover:scale-105"
                aria-label="Tap the heart"
              >
                <motion.div
                  animate={heartExploded ? { scale: [1, 1.45, 1.12], rotate: [0, 8, -7, 0] } : { scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <Heart className={`h-16 w-16 ${heartExploded ? 'fill-current text-rose-300' : ''}`} />
                </motion.div>
                {heartExploded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pointer-events-none absolute inset-0"
                  >
                    {Array.from({ length: 16 }).map((_, index) => (
                      <motion.span
                        key={index}
                        className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-rose-200"
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{
                          x: (Math.cos((index / 16) * Math.PI * 2) * 60) + (index % 2 === 0 ? 10 : -10),
                          y: (Math.sin((index / 16) * Math.PI * 2) * 60) - 18,
                          opacity: 0,
                          scale: 0.4,
                        }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                      />
                    ))}
                  </motion.div>
                )}
              </button>

              <p className="mt-8 text-sm uppercase tracking-[0.3em] text-rose-200/80">{loveData.interactiveHeart.label}</p>
              <AnimatePresence>
                {heartExploded && (
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="mx-auto mt-5 max-w-xl text-xl text-rose-50 md:text-2xl"
                  >
                    {loveData.interactiveHeart.reveal}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setSecretFound((current) => !current)}
                className="mt-14 inline-flex items-center gap-2 rounded-full border border-rose-200/30 bg-[#190b12]/60 px-5 py-3 text-xs uppercase tracking-[0.24em] text-rose-50/80 backdrop-blur-md"
              >
                <Sparkles className="h-4 w-4 text-rose-200" />
                Hidden surprise
              </button>

              <AnimatePresence>
                {secretFound && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mx-auto mt-8 w-full max-w-5xl overflow-hidden rounded-[28px] border border-rose-200/20 bg-[#2f4a4d] shadow-[0_25px_80px_rgba(0,0,0,0.3)]"
                  >
                    <div className="relative min-h-[760px] overflow-hidden bg-[#2f4a4d] px-5 py-7 text-[#f4f0ee] md:px-8 md:py-8">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.04),_transparent_55%)]" />

                      <div className="relative z-10 max-w-[60%] text-[clamp(1.5rem,2vw,3.2rem)] font-light leading-[1.18] tracking-[-0.04em] text-[#f4efe9]">
                        <p>Im happy when I&apos;m here with you</p>
                        <p>In all the little things we do.</p>
                        <p>I hope the days ahead are bright</p>
                        <p>And we keep holding on so tight.</p>
                        <p>I hope the distance fades away</p>
                        <p>And fights become a thing of yesterday.</p>
                        <p>I hope we laugh and smile some more</p>
                        <p>And find the love we had before.</p>
                        <p>I don&apos;t know what the future brings</p>
                        <p>But I hope it brings us better things.</p>
                        <p>And if I get to walk with you</p>
                        <p>I&apos;ll be happy all my life through.</p>
                      </div>

                      <div className="pointer-events-none absolute right-[-60px] top-[-30px] h-[520px] w-[440px] md:right-[-30px] md:top-[-10px]">
                        <div className="absolute right-24 top-12 h-52 w-20 rounded-[42px] bg-[#c6d2d4] opacity-90" />
                        <div className="absolute right-12 top-0 h-12 w-24 rounded-full border-[20px] border-[#c6d2d4] border-b-0 border-l-0 border-r-0" />
                        <div className="absolute right-4 top-14 h-64 w-40 -rotate-[36deg] rounded-[48px] bg-[#c6d2d4] opacity-90" />
                        <div className="absolute right-[20px] top-[160px] h-[230px] w-8 rotate-[-18deg] rounded-full bg-[#c6d2d4]" />
                        <div className="absolute right-[42px] top-[160px] h-[240px] w-8 rotate-[-12deg] rounded-full bg-[#c6d2d4]" />
                        <div className="absolute right-[67px] top-[160px] h-[250px] w-8 rotate-[-7deg] rounded-full bg-[#c6d2d4]" />
                        <div className="absolute right-[88px] top-[165px] h-[260px] w-8 rotate-[2deg] rounded-full bg-[#c6d2d4]" />
                        <div className="absolute right-[110px] top-[170px] h-[270px] w-8 rotate-[11deg] rounded-full bg-[#c6d2d4]" />
                        <div className="absolute right-[133px] top-[175px] h-[278px] w-8 rotate-[20deg] rounded-full bg-[#c6d2d4]" />
                        <div className="absolute right-[156px] top-[180px] h-[290px] w-8 rotate-[29deg] rounded-full bg-[#c6d2d4]" />
                        <div className="absolute right-[175px] top-[178px] h-[295px] w-[22px] rotate-[38deg] rounded-full bg-[#c6d2d4]" />
                        <div className="absolute right-[180px] top-[185px] h-[290px] w-[18px] rotate-[42deg] rounded-full bg-[#c6d2d4]" />

                        <div className="absolute bottom-[-4px] right-[96px] h-40 w-28 rotate-[12deg] rounded-[100px] bg-[#d8b27b] opacity-80" />
                        <div className="absolute bottom-[-20px] right-[82px] h-44 w-18 rotate-[20deg] rounded-[100px] bg-[#d8b27b] opacity-80" />
                        <div className="absolute bottom-[-35px] right-[66px] h-52 w-20 rotate-[28deg] rounded-[100px] bg-[#d8b27b] opacity-80" />
                        <div className="absolute bottom-[-14px] right-[175px] h-52 w-20 rotate-[8deg] rounded-[120px] bg-[#c99b64] opacity-80" />
                        <div className="absolute bottom-[-20px] right-[190px] h-60 w-20 rotate-[4deg] rounded-[120px] bg-[#c99b64] opacity-80" />

                        <div className="absolute bottom-[-6px] left-0 h-28 w-[240px] rounded-[100px] border-[10px] border-[#d6b37c] border-r-0 border-t-0 border-l-0 bg-transparent opacity-90" />
                        <div className="absolute bottom-[16px] left-12 h-16 w-48 rounded-[100px] bg-[#d6b37c] opacity-90" />
                        <div className="absolute bottom-[34px] left-24 h-12 w-32 rounded-[100px] bg-[#d6b37c] opacity-90" />
                        <div className="absolute bottom-[2px] left-0 h-20 w-[260px] rounded-[100px] bg-[#d6b27a] opacity-90" />
                      </div>

                      <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-[260px] bg-[#1a2a2d] opacity-10 blur-2xl" />
                      <div className="pointer-events-none absolute bottom-[-10px] left-[-14px] h-32 w-[200px] rounded-full bg-[#1a2a2d]/15 blur-2xl" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          <section className="px-5 py-20 md:px-8" id="time">
            <div className="mx-auto max-w-5xl">
              <div className="mb-8 text-center">
                <p className="text-xs uppercase tracking-[0.35em] text-rose-200/80">Time together</p>
                <h2 className="mt-4 font-display text-5xl text-white">{loveData.timer.heading}</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {timerBlocks.map((block) => (
                  <motion.div
                    key={block.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    className="rounded-[24px] border border-white/10 bg-white/5 p-5 text-center shadow-[0_20px_50px_rgba(11,8,13,0.25)] backdrop-blur-md"
                  >
                    <div className="text-4xl font-semibold text-rose-50 md:text-5xl">{String(block.value).padStart(2, '0')}</div>
                    <div className="mt-3 text-xs uppercase tracking-[0.26em] text-rose-200/75">{block.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-[28px] border border-white/10 bg-[#200b15]/50 p-6 text-center backdrop-blur-md">
                <div className="flex items-center gap-3 text-rose-100">
                  <Music4 className="h-5 w-5 text-rose-300" />
                  <span className="text-sm uppercase tracking-[0.28em]">{loveData.song.title}</span>
                </div>

                <button
                  type="button"
                  onClick={handleAudioToggle}
                  className="inline-flex items-center gap-3 rounded-full border border-rose-200/35 bg-[#fff7f9]/10 px-5 py-3 text-sm font-medium text-rose-50 transition hover:bg-[#fff7f9]/15"
                >
                  <AudioLines className="h-4 w-4" />
                  {isPlaying ? 'Pause Our Song' : 'Play Our Song 🎵'}
                </button>

                <div className="text-xs uppercase tracking-[0.28em] text-rose-200/65">
                  {audioReady ? 'Now playing' : 'Audio ready when you are'}
                </div>
                <audio id="song-audio" src={loveData.song.url} preload="metadata" />
              </div>
            </div>
          </section>

          <section className="px-5 py-20 md:px-8" id="final-surprise">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-rose-200/75">{loveData.final.eyebrow}</p>
              <p className="mt-8 font-display text-3xl italic text-rose-50 md:text-5xl">{loveData.final.quote}</p>
              <h3 className="mt-10 font-display text-5xl text-white md:text-6xl">{loveData.final.title}</h3>

            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
