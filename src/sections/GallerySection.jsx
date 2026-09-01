import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import loveData from '../data/loveData';

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const galleryItems = useMemo(() => loveData.memories, []);

  const openLightbox = (index) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);

  const showPrevious = () => {
    setActiveIndex((current) => (current === null ? 0 : (current - 1 + galleryItems.length) % galleryItems.length));
  };

  const showNext = () => {
    setActiveIndex((current) => (current === null ? 0 : (current + 1) % galleryItems.length));
  };

  return (
    <section className="px-5 py-20 md:px-8" id="gallery">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Memories"
          title="The moments I keep replaying"
          subtitle="Not because they are perfect, but because they are ours and they still feel warm in my heart."
        />

        <div className="mt-12 columns-1 gap-5 sm:columns-2 xl:columns-4">
          {galleryItems.map((item, index) => (
            <motion.button
              key={item.src}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -8, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
              onClick={() => openLightbox(index)}
              className="group relative mb-5 block w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#290d1c]/80 text-left shadow-[0_25px_60px_rgba(17,10,17,0.25)]"
            >
              <img src={item.src} alt={item.caption} className="h-auto w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#180912]/90 via-[#180912]/35 to-transparent p-4">
                <p className="text-sm text-rose-50/90">{item.caption}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#13070d]/90 px-4 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-[#200b16] shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white transition hover:bg-black/40"
                aria-label="Close gallery"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center justify-between gap-3 bg-[#180a11]/80 px-4 py-3 text-sm text-rose-100/80 md:px-6">
                <span>{activeIndex + 1} / {galleryItems.length}</span>
                <span>{galleryItems[activeIndex].caption}</span>
              </div>

              <div className="relative flex items-center justify-center bg-[#12070d] p-4 md:p-6">
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white transition hover:bg-black/55 md:left-6"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <img
                  src={galleryItems[activeIndex].src}
                  alt={galleryItems[activeIndex].caption}
                  className="max-h-[75vh] w-full rounded-[20px] object-contain"
                />

                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white transition hover:bg-black/55 md:right-6"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
