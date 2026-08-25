import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../../components/Navigation';

interface Sermon {
  title: string;
  series: string;
  duration: string;
  date: string;
  img: string;
}

const TOTAL_PAGES = 10;
const SERMONS_PER_PAGE = 6;

const IMAGES = [
  'https://images.pexels.com/photos/19130852/pexels-photo-19130852.jpeg?_gl=1*13id18r*_ga*OTQwMjU2MDM1LjE3ODUyMjMwMjA.*_ga_8JE65Q40S6*czE3ODc1ODA4MzQkbzMkZzEkdDE3ODc1ODA5MzAkajQwJGwwJGgw',
  'https://images.pexels.com/photos/5020925/pexels-photo-5020925.jpeg?_gl=1*ffk20o*_ga*OTQwMjU2MDM1LjE3ODUyMjMwMjA.*_ga_8JE65Q40S6*czE3ODc1ODA4MzQkbzMkZzEkdDE3ODc1ODEwNjEkajU5JGwwJGgw',
  'https://images.pexels.com/photos/34683153/pexels-photo-34683153.jpeg?_gl=1*1x7qfft*_ga*OTQwMjU2MDM1LjE3ODUyMjMwMjA.*_ga_8JE65Q40S6*czE3ODc1ODA4MzQkbzMkZzEkdDE3ODc1ODEyODEkajU1JGwwJGgw',
  'https://images.pexels.com/photos/9727921/pexels-photo-9727921.jpeg?_gl=1*br6e6i*_ga*OTQwMjU2MDM1LjE3ODUyMjMwMjA.*_ga_8JE65Q40S6*czE3ODc1ODA4MzQkbzMkZzEkdDE3ODc1ODIxNTgkajE0JGwwJGgw',
  'https://images.pexels.com/photos/10807887/pexels-photo-10807887.jpeg?_gl=1*eh4f0j*_ga*OTQwMjU2MDM1LjE3ODUyMjMwMjA.*_ga_8JE65Q40S6*czE3ODc1ODA4MzQkbzMkZzEkdDE3ODc1ODI2MDMkajQ1JGwwJGgw',
];

const SERMON_ARCHIVE: Sermon[] = [
  { title: "service1", series: "series1", duration: "duration1", date: "date1", img: IMAGES[0] },
  { title: "service2", series: "series2", duration: "duration2", date: "date2", img: IMAGES[1] },
  { title: "service3", series: "series3", duration: "duration3", date: "date3", img: IMAGES[2] },
  { title: "service4", series: "series4", duration: "duration4", date: "date4", img: IMAGES[3] },
  { title: "service5", series: "series5", duration: "duration5", date: "date5", img: IMAGES[4] },
];

const ALL_MORE_SERMONS: Sermon[] = Array.from({ length: TOTAL_PAGES * SERMONS_PER_PAGE }, (_, i) => ({
  title: `sermon${i + 6}`,
  series: `series${i + 6}`,
  duration: `duration${i + 6}`,
  date: `date${i + 6}`,
  img: IMAGES[i % IMAGES.length],
}));

export default function Sermons() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);

  const pageStart = (currentPage - 1) * SERMONS_PER_PAGE;
  const moreSermons = ALL_MORE_SERMONS.slice(pageStart, pageStart + SERMONS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page < 1 || page > TOTAL_PAGES) return;
    setCurrentPage(page);
  };

  const handleScroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;

    const card = el.querySelector('.sermon-card') as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 20 : 260;
    const scrollAmount = cardWidth * 2;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (dir === 'right') {
      if (el.scrollLeft >= maxScroll - 5) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    } else {
      if (el.scrollLeft <= 5) {
        el.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 1;

    pages.push(1);
    if (currentPage - delta > 2) pages.push('...');

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(TOTAL_PAGES - 1, currentPage + delta); i++) {
      pages.push(i);
    }

    if (currentPage + delta < TOTAL_PAGES - 1) pages.push('...');
    if (TOTAL_PAGES > 1) pages.push(TOTAL_PAGES);

    return pages;
  };

  return (
    <>
      <Navigation />

      <section className="relative flex h-screen flex-col justify-center overflow-hidden bg-midnight-teal">
        <span
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-serif text-[22vw] text-soft-linen/5 whitespace-nowrap"
          aria-hidden="true"
        >
          archives
        </span>

        <div className="relative z-10 mx-auto mt-16 mb-8 max-w-7xl px-6 md:mt-20 md:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <span className="mb-3 block font-bold text-[10px] text-harvest-orange uppercase tracking-[0.4em]">
              The Library
            </span>
            <h2 className="font-serif text-3xl text-soft-linen lowercase tracking-tighter leading-none md:text-5xl">
              Sermon archive.
            </h2>
            <div className="mt-4 mb-3 h-[1px] w-16 bg-soft-linen/20" />
            <h3 className="font-serif text-xl text-soft-linen/70 tracking-tight md:text-3xl">
              sunday services
            </h3>
          </motion.div>
        </div>

        <div className="relative z-10 w-full">
          <button
            onClick={() => handleScroll('left')}
            aria-label="Previous"
            className="absolute left-4 lg:left-8 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-soft-linen/20 bg-midnight-teal/60 text-soft-linen backdrop-blur-sm transition-colors hover:border-harvest-orange hover:bg-harvest-orange md:flex"
          >
            <span className="text-2xl leading-none">&lsaquo;</span>
          </button>

          <button
            onClick={() => handleScroll('right')}
            aria-label="Next"
            className="absolute right-4 lg:right-8 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-soft-linen/20 bg-midnight-teal/60 text-soft-linen backdrop-blur-sm transition-colors hover:border-harvest-orange hover:bg-harvest-orange md:flex"
          >
            <span className="text-2xl leading-none">&rsaquo;</span>
          </button>

          <div
            ref={scrollRef}
            className="relative overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="mx-auto flex w-max gap-5 px-6 md:gap-8 md:px-12">
              {SERMON_ARCHIVE.map((sermon, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSermon(sermon)}
                  className="sermon-card group relative h-[300px] w-[200px] shrink-0 overflow-hidden rounded-[24px] border border-soft-linen/5 bg-midnight-teal text-left shadow-2xl md:h-[320px] md:w-[520px]"
                >
                  <img
                    src={sermon.img}
                    alt={sermon.title}
                    className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-teal via-midnight-teal/40 to-transparent opacity-90" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="rounded-full bg-harvest-orange px-6 py-2.5 font-bold font-sans text-xs text-midnight-teal uppercase tracking-widest">
                      watch now
                    </span>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="h-[1px] w-5 bg-harvest-orange" />
                      <span className="font-bold text-[8px] text-harvest-orange uppercase tracking-widest">
                        {sermon.series}
                      </span>
                    </div>
                    <h3 className="mb-3 font-serif text-lg text-soft-linen tracking-tighter transition-transform group-hover:-translate-y-1 md:text-xl">
                      {sermon.title}
                    </h3>

                    <div className="flex items-center justify-between border-t border-soft-linen/10 pt-3">
                      <div className="flex gap-3 font-sans text-[8px] text-soft-linen/40 uppercase tracking-[0.15em]">
                        <span>{sermon.date}</span>
                        <span>{sermon.duration}</span>
                      </div>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-soft-linen/20">
                        <PlayIcon className="h-3 w-3 text-soft-linen" />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h3 className="mb-4 font-serif text-2xl text-midnight-teal tracking-tight md:text-4xl">
            preachings.
          </h3>
          <p className="mb-12 max-w-xl font-sans text-sm text-midnight-teal/50">
            Explore the full library of past messages, organized and ready whenever you are.
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="mb-14 grid grid-cols-1 md:grid-cols-2"
            >
              {moreSermons.map((sermon, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-start gap-6 py-10 border-midnight-teal/20 sm:flex-row ${
                    i >= 2 ? 'border-t-2' : ''
                  } ${i % 2 === 0 ? 'md:pr-10 md:border-r' : 'md:pl-10'}`}
                >
                  <button
                    onClick={() => setSelectedSermon(sermon)}
                    className="group relative h-56 w-full shrink-0 overflow-hidden rounded-xl sm:w-72"
                  >
                    <img
                      src={sermon.img}
                      alt={sermon.title}
                      className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-midnight-teal/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="rounded-full bg-harvest-orange px-6 py-2.5 font-bold font-sans text-xs text-midnight-teal uppercase tracking-widest">
                        watch now
                      </span>
                    </div>
                  </button>

                  <div className="flex-1">
                    <h4 className="mb-1 font-serif text-xl text-midnight-teal md:text-2xl">
                      {sermon.title}
                    </h4>
                    <p className="mb-4 font-sans text-xs text-midnight-teal/40 uppercase tracking-widest">
                      {sermon.series}
                    </p>
                    <div className="mb-5 flex flex-col gap-1.5 font-sans text-xs text-midnight-teal/50">
                      <span>{sermon.date}</span>
                      <span>{sermon.duration}</span>
                    </div>
                    <button
                      onClick={() => setSelectedSermon(sermon)}
                      className="inline-flex items-center gap-1.5 font-bold font-sans text-xs text-harvest-orange uppercase tracking-widest transition-colors hover:text-midnight-teal"
                    >
                      see more <span>&rarr;</span>
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex h-10 items-center justify-center rounded-full border border-midnight-teal/15 px-4 font-bold font-sans text-midnight-teal/60 text-sm transition-colors hover:border-harvest-orange hover:text-harvest-orange disabled:pointer-events-none disabled:opacity-30"
            >
              &lsaquo; Previous
            </button>

            {getPageNumbers().map((page, i) =>
              page === '...' ? (
                <span key={`ellipsis-${i}`} className="px-1 font-sans text-midnight-teal/40 text-sm">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => goToPage(page as number)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border font-bold font-sans text-sm transition-colors ${
                    currentPage === page
                      ? 'border-harvest-orange bg-harvest-orange text-midnight-teal'
                      : 'border-midnight-teal/15 text-midnight-teal/60 hover:border-harvest-orange hover:text-harvest-orange'
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === TOTAL_PAGES}
              className="flex h-10 items-center justify-center rounded-full border border-midnight-teal/15 px-4 font-bold font-sans text-midnight-teal/60 text-sm transition-colors hover:border-harvest-orange hover:text-harvest-orange disabled:pointer-events-none disabled:opacity-30"
            >
              Next &rsaquo;
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedSermon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight-teal/90 p-4 backdrop-blur-sm md:p-10"
            onClick={() => setSelectedSermon(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white"
            >
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setSelectedSermon(null)}
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-midnight-teal/15 text-midnight-teal transition-colors hover:bg-midnight-teal hover:text-soft-linen"
                >
                  &times;
                </button>
              </div>

              <div className="px-4 md:px-8">
                <div className="aspect-video w-full overflow-hidden rounded-xl">
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube.com/embed/Y-x0efG1seA?"
                    title={selectedSermon.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="mb-2 font-bold font-sans text-[10px] text-harvest-orange uppercase tracking-widest">
                  {selectedSermon.series}
                </p>
                <h2 className="mb-3 font-serif text-2xl text-midnight-teal md:text-3xl">
                  {selectedSermon.title}
                </h2>
                <div className="mb-6 flex gap-4 font-sans text-xs text-midnight-teal/50">
                  <span>{selectedSermon.date}</span>
                  <span>{selectedSermon.duration}</span>
                </div>
                <div className="border-t border-midnight-teal/10 pt-6">
                  <p className="mb-2 font-bold font-sans text-xs text-midnight-teal/40 uppercase tracking-widest">
                    Overview
                  </p>
                  <p className="font-sans text-sm text-midnight-teal/60 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
                <div className="mt-6 border-t border-midnight-teal/10 pt-6">
                  <p className="mb-2 font-bold font-sans text-xs text-midnight-teal/40 uppercase tracking-widest">
                    Summary
                  </p>
                  <p className="font-sans text-sm text-midnight-teal/60 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PlayIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z"
      />
    </svg>
  );
}