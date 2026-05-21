import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// ── Photo pool ─────────────────────────────────────────────────────────────
interface PhotoDef {
  url: string;
  top?: string;
  bottom?: string;
  left: string;
  wClass: string;
  hClass: string;
  rotate: number;
  z: number;
}

const PHOTOS: PhotoDef[] = [
  // ── Over "W" ──────────────────────────────────────────────────────────────
  {
    url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=900',
    top: '7%', left: '1%',
    wClass: 'w-[26vw] md:w-[12vw]', hClass: 'h-[13vh] md:h-[34vh]',
    rotate: -3, z: 3,
  },
  // ── Over "RDS" ─────────────────────────────────────────────────────────────
  {
    url: 'https://images.unsplash.com/photo-1507692049790-de58293a4699?q=80&w=900',
    bottom: '7%', left: '18%',
    wClass: 'w-[34vw] md:w-[17vw]', hClass: 'h-[10vh] md:h-[21vh]',
    rotate: 2.5, z: 2,
  },
  // ── Over "OF" ─────────────────────────────────────────────────────────────
  {
    url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=900',
    top: '5%', left: '37%',
    wClass: 'w-[22vw] md:w-[11vw]', hClass: 'h-[14vh] md:h-[36vh]',
    rotate: -2, z: 3,
  },
  // ── Between "OF" and "LIFE" ───────────────────────────────────────────────
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=900',
    bottom: '6%', left: '49%',
    wClass: 'w-[28vw] md:w-[15vw]', hClass: 'h-[11vh] md:h-[23vh]',
    rotate: 1.5, z: 2,
  },
  // ── Over "LI" ─────────────────────────────────────────────────────────────
  {
    url: 'https://images.unsplash.com/photo-1520218508822-998633d997e6?q=80&w=900',
    top: '4%', left: '62%',
    wClass: 'w-[24vw] md:w-[12vw]', hClass: 'h-[13vh] md:h-[34vh]',
    rotate: -3.5, z: 3,
  },
  // ── Over "FE" ─────────────────────────────────────────────────────────────
  {
    url: 'https://images.unsplash.com/photo-1483971896012-0e41ce0d380a?q=80&w=900',
    bottom: '8%', left: '74%',
    wClass: 'w-[30vw] md:w-[15vw]', hClass: 'h-[10vh] md:h-[20vh]',
    rotate: 2, z: 2,
  },
  // ── Tail ──────────────────────────────────────────────────────────────────
  {
    url: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=900',
    top: '8%', left: '84%',
    wClass: 'w-[22vw] md:w-[11vw]', hClass: 'h-[12vh] md:h-[32vh]',
    rotate: -2.5, z: 3,
  },
  {
    url: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=900',
    bottom: '9%', left: '93%',
    wClass: 'w-[32vw] md:w-[16vw]', hClass: 'h-[11vh] md:h-[22vh]',
    rotate: 1, z: 2,
  },
  {
    url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=900',
    top: '5%', left: '103%',
    wClass: 'w-[24vw] md:w-[12vw]', hClass: 'h-[13vh] md:h-[35vh]',
    rotate: -1.5, z: 3,
  },
  {
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=900',
    bottom: '7%', left: '112%',
    wClass: 'w-[31vw] md:w-[15vw]', hClass: 'h-[11vh] md:h-[21vh]',
    rotate: 2.5, z: 2,
  },
  {
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900',
    top: '6%', left: '121%',
    wClass: 'w-[23vw] md:w-[11vw]', hClass: 'h-[12vh] md:h-[33vh]',
    rotate: -3, z: 3,
  },
  {
    url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=900',
    bottom: '8%', left: '130%',
    wClass: 'w-[29vw] md:w-[14vw]', hClass: 'h-[10vh] md:h-[20vh]',
    rotate: 1.5, z: 2,
  },
  {
    url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=900',
    top: '7%', left: '140%',
    wClass: 'w-[25vw] md:w-[12vw]', hClass: 'h-[13vh] md:h-[34vh]',
    rotate: -2, z: 3,
  },
];

// ── Desktop scroll variants ────────────────────────────────────────────────
const stageVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const textVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.4, ease: EASE_OUT } },
};
const photoVariants = {
  hidden:  { opacity: 0, scale: 0.93, y: 14 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT } },
};

// ── Shared photo overlay treatment ────────────────────────────────────────
function PhotoOverlay({ hover = true }: { hover?: boolean }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${hover ? 'transition-opacity duration-700 ease-out group-hover:opacity-0' : ''}`}
      style={{ backgroundColor: 'rgba(7,79,86,0.42)', mixBlendMode: 'multiply' }}
    />
  );
}

// ── Desktop scroll photo ───────────────────────────────────────────────────
function Photo({ def }: { def: PhotoDef }) {
  return (
    <motion.div
      variants={photoVariants}
      className={`absolute overflow-hidden cursor-pointer group ${def.wClass} ${def.hClass}`}
      style={{
        top: def.top, bottom: def.bottom, left: def.left,
        rotate: `${def.rotate}deg`, zIndex: def.z,
        boxShadow: [
          '0 20px 60px rgba(0,20,28,0.65)',
          'inset 0 0 0 1px rgba(230,237,239,0.07)',
        ].join(', '),
      }}
    >
      <img
        src={def.url} alt="" loading="lazy"
        className="w-full h-full object-cover
                   filter grayscale brightness-90 contrast-105
                   group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100
                   transition-[filter] duration-700 ease-out"
      />
      <PhotoOverlay />
    </motion.div>
  );
}

// ── Desktop grid ───────────────────────────────────────────────────────────
// Rows rotate through column-span patterns: 2+1+1 → 1+2+1 → 1+1+2 → 2+1+1 → 4-col banner.
// Row heights vary to avoid a monotonous grid — shorter rows offset the taller ones.
const GRID_ITEMS: { url: string; colSpan: number; height: string }[] = [
  // Row 1 — 2 + 1 + 1 (48vh)
  { url: PHOTOS[0].url,  colSpan: 2, height: '48vh' },
  { url: PHOTOS[1].url,  colSpan: 1, height: '48vh' },
  { url: PHOTOS[2].url,  colSpan: 1, height: '48vh' },
  // Row 2 — 1 + 2 + 1 (56vh — tallest, draws the eye)
  { url: PHOTOS[3].url,  colSpan: 1, height: '56vh' },
  { url: PHOTOS[4].url,  colSpan: 2, height: '56vh' },
  { url: PHOTOS[5].url,  colSpan: 1, height: '56vh' },
  // Row 3 — 1 + 1 + 2 (40vh — short, breathing room)
  { url: PHOTOS[6].url,  colSpan: 1, height: '40vh' },
  { url: PHOTOS[7].url,  colSpan: 1, height: '40vh' },
  { url: PHOTOS[8].url,  colSpan: 2, height: '40vh' },
  // Row 4 — 2 + 1 + 1 (52vh)
  { url: PHOTOS[9].url,  colSpan: 2, height: '52vh' },
  { url: PHOTOS[10].url, colSpan: 1, height: '52vh' },
  { url: PHOTOS[11].url, colSpan: 1, height: '52vh' },
  // Row 5 — full-width banner close
  { url: PHOTOS[12].url, colSpan: 4, height: '46vh' },
];

function GridPhoto({ item, index }: { item: typeof GRID_ITEMS[0]; index: number }) {
  const delay = (index % 4) * 0.06;

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer group rounded-2xl"
      style={{
        gridColumn: `span ${item.colSpan}`,
        height: item.height,
        boxShadow: 'inset 0 0 0 1px rgba(230,237,239,0.06)',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
    >
      <img
        src={item.url} alt="" loading="lazy"
        className="w-full h-full object-cover scale-[1.02]
                   filter grayscale brightness-90 contrast-105
                   group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100
                   group-hover:scale-100
                   transition-[filter,transform] duration-700 ease-out"
      />
      <PhotoOverlay />
    </motion.div>
  );
}

function DesktopGridSection() {
  return (
    <section className="hidden md:block bg-[#002E38] px-10 pt-24 pb-28">

      {/* Header row */}
      <motion.div
        className="flex items-center justify-between mb-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1, ease: EASE_OUT }}
      >
        <span style={{
          fontFamily: 'Outfit, sans-serif', fontSize: '9px',
          letterSpacing: '0.42em', textTransform: 'uppercase',
          color: 'rgba(230,237,239,0.25)',
        }}>
          ( Full Gallery )
        </span>
        <span style={{
          fontFamily: 'Outfit, sans-serif', fontSize: '9px',
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'rgba(230,237,239,0.12)',
        }}>
          {String(GRID_ITEMS.length).padStart(2, '0')} photos
        </span>
      </motion.div>

      {/* Thin rule */}
      <motion.div
        className="w-full mb-8"
        style={{ height: '1px', backgroundColor: 'rgba(230,237,239,0.06)' }}
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.2, ease: EASE_OUT }}
      />

      {/* Grid — 16px gap, rounded cells */}
      <div className="grid grid-cols-4 gap-4">
        {GRID_ITEMS.map((item, i) => (
          <GridPhoto key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

// ── Mobile grid ────────────────────────────────────────────────────────────
// 2-column grid. Full-width rows (col-span-2) for landscape photos,
// paired rows (col-span-1 each) for portrait/square photos.
// Heights are tuned to approximate real aspect ratios at mobile widths.
// At px-4 with gap-3: each single col ≈ 45vw, so:
//   portrait pair  → 62vw tall  (≈ 3:2 portrait)
//   full-width     → 52vw tall  (≈ 16:9 landscape)
const MOBILE_GRID_ITEMS: { url: string; colSpan: 1 | 2; height: string; isFirst?: boolean }[] = [
  // Row 1 — full-width hero
  { url: PHOTOS[0].url,  colSpan: 2, height: '56vw', isFirst: true },
  // Row 2 — portrait pair
  { url: PHOTOS[1].url,  colSpan: 1, height: '62vw' },
  { url: PHOTOS[2].url,  colSpan: 1, height: '62vw' },
  // Row 3 — full-width
  { url: PHOTOS[3].url,  colSpan: 2, height: '50vw' },
  // Row 4 — portrait pair (slightly taller)
  { url: PHOTOS[4].url,  colSpan: 1, height: '68vw' },
  { url: PHOTOS[5].url,  colSpan: 1, height: '68vw' },
  // Row 5 — full-width
  { url: PHOTOS[6].url,  colSpan: 2, height: '52vw' },
  // Row 6 — portrait pair
  { url: PHOTOS[7].url,  colSpan: 1, height: '64vw' },
  { url: PHOTOS[8].url,  colSpan: 1, height: '64vw' },
  // Row 7 — full-width
  { url: PHOTOS[9].url,  colSpan: 2, height: '48vw' },
  // Row 8 — portrait pair
  { url: PHOTOS[10].url, colSpan: 1, height: '66vw' },
  { url: PHOTOS[11].url, colSpan: 1, height: '66vw' },
  // Row 9 — full-width banner close
  { url: PHOTOS[12].url, colSpan: 2, height: '54vw' },
];

function MobileGridPhoto({
  item, index,
}: {
  item: typeof MOBILE_GRID_ITEMS[0];
  index: number;
}) {
  const delay = item.colSpan === 1 ? (index % 2) * 0.07 : 0;

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer group rounded-xl"
      style={{
        gridColumn: `span ${item.colSpan}`,
        height: item.height,
        boxShadow: 'inset 0 0 0 1px rgba(230,237,239,0.06)',
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.85, ease: EASE_OUT, delay }}
    >
      <img
        src={item.url} alt="" loading="lazy"
        className="w-full h-full object-cover scale-[1.03]
                   filter grayscale brightness-85 contrast-110
                   group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100
                   group-hover:scale-100
                   transition-[filter,transform] duration-700 ease-out"
      />
      <PhotoOverlay />

      {/* Hero scrim + title on first card only */}
      {item.isFirst && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(0,46,56,0.85) 0%, rgba(0,46,56,0.20) 55%, transparent 80%)' }}
          />
          <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none select-none">
            <h2 style={{
              fontFamily: 'Vogun, serif', fontWeight: 500,
              fontSize: '8vw', lineHeight: 1, letterSpacing: '-0.02em',
              color: 'rgba(230,237,239,0.92)',
            }}>
              words of life.
            </h2>
          </div>
        </>
      )}

      {/* Counter */}
      <div className="absolute bottom-2.5 right-3 z-10 pointer-events-none select-none">
        <span style={{
          fontFamily: 'Outfit, sans-serif', fontSize: '7px',
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'rgba(230,237,239,0.25)',
        }}>
          {String(index + 1).padStart(2, '0')} / {String(MOBILE_GRID_ITEMS.length).padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  );
}

function MobileGallery() {
  return (
    <section className="md:hidden bg-[#002E38] px-4 pt-10 pb-14">

      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1, ease: EASE_OUT }}
      >
        <span style={{
          fontFamily: 'Outfit, sans-serif', fontSize: '8px',
          letterSpacing: '0.42em', textTransform: 'uppercase',
          color: 'rgba(230,237,239,0.25)',
        }}>
          ( Gallery )
        </span>
        <span style={{
          fontFamily: 'Outfit, sans-serif', fontSize: '8px',
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'rgba(230,237,239,0.12)',
        }}>
          {String(MOBILE_GRID_ITEMS.length).padStart(2, '0')} photos
        </span>
      </motion.div>

      {/* Thin rule */}
      <motion.div
        className="w-full mb-4"
        style={{ height: '1px', backgroundColor: 'rgba(230,237,239,0.06)' }}
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.1, ease: EASE_OUT }}
      />

      {/* 2-column grid */}
      <div className="grid grid-cols-2 gap-3">
        {MOBILE_GRID_ITEMS.map((item, i) => (
          <MobileGridPhoto key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

// ── Desktop scroll-hijack gallery ─────────────────────────────────────────
function DesktopGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ['0vw', '0vw'] : ['0vw', '-240vw'],
  );

  return (
    <section
      ref={containerRef}
      className="relative hidden md:block h-[600vh] bg-[#002E38]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-x-hidden flex items-center no-scrollbar">

        <div className="absolute top-10 left-10 z-30 pointer-events-none select-none">
          <span style={{
            fontFamily: 'Outfit, sans-serif', fontSize: '9px',
            letterSpacing: '0.4em', textTransform: 'uppercase',
            color: 'rgba(230,237,239,0.20)',
          }}>
            ( Gallery )
          </span>
        </div>

        <div
          className="absolute inset-y-0 left-0 w-32 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #002E38 0%, transparent 100%)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-32 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(270deg, #002E38 0%, transparent 100%)' }}
        />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none select-none">
          <div
            className="relative w-20 h-px overflow-hidden"
            style={{ backgroundColor: 'rgba(230,237,239,0.07)' }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 origin-left"
              style={{ scaleX: scrollYProgress, backgroundColor: '#EC662C' }}
            />
          </div>
          <span style={{
            fontFamily: 'Outfit, sans-serif', fontSize: '8px',
            letterSpacing: '0.4em', textTransform: 'uppercase',
            color: 'rgba(230,237,239,0.15)',
          }}>
            Scroll
          </span>
        </div>

        <motion.div
          style={{ x }}
          className="flex items-center h-full pl-[10vw] shrink-0"
        >
          <motion.div
            className="relative shrink-0"
            variants={stageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            <motion.h2
              variants={textVariants}
              className="leading-none tracking-tighter select-none whitespace-nowrap"
              style={{
                fontFamily: 'Vogun, serif', fontWeight: 500,
                fontSize: '60vh', color: 'rgba(230,237,239,0.90)',
              }}
            >
              WORDS OF LIFE
            </motion.h2>

            {PHOTOS.map((def, i) => (
              <Photo key={i} def={def} />
            ))}
          </motion.div>

          <div className="w-[15vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}

// ── Gallery ────────────────────────────────────────────────────────────────
const Gallery: React.FC = () => (
  <>
    <MobileGallery />
    <DesktopGallery />
    <DesktopGridSection />
  </>
);

export default Gallery;
