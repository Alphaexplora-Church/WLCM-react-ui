import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom'; // Added this import

const CommunityPulse = () => {
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 300, damping: 30 });

  const snapshots = [
    { 
      url: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800", 
      tag: "Worship",
      orientation: "portrait",
      caption: "Sunday Morning at Grace Chapel",
      date: "Dec 2025",
      photographer: "J. Anderson",
      featured: true,
      story: "Join us every Sunday as we lift our voices together"
    },
    { 
      url: "https://images.unsplash.com/photo-1507692049790-de58293a4699?q=80&w=800", 
      tag: "Youth",
      orientation: "landscape",
      caption: "Friday Night Youth Group",
      date: "Dec 2025",
      photographer: "M. Chen",
      featured: false,
      story: "High school students diving deep into faith and fellowship"
    },
    { 
      url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800", 
      tag: "Kids",
      orientation: "portrait",
      caption: "Children's Ministry Adventure",
      date: "Nov 2025",
      photographer: "S. Rodriguez",
      featured: false,
      story: "Where kids discover God's love through fun and learning"
    },
    { 
      url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800", 
      tag: "Family",
      orientation: "square",
      caption: "Family Connect Night",
      date: "Nov 2025",
      photographer: "T. Williams",
      featured: true,
      story: "Building relationships that last beyond Sunday"
    },
    { 
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800", 
      tag: "Connect",
      orientation: "landscape",
      caption: "Small Groups Launch",
      date: "Oct 2025",
      photographer: "K. Johnson",
      featured: false,
      story: "Life transformation happens in circles, not rows"
    },
    { 
      url: "https://images.unsplash.com/photo-1483971896012-0e41ce0d380a?q=80&w=800", 
      tag: "Events",
      orientation: "portrait",
      caption: "Annual Community Outreach",
      date: "Oct 2025",
      photographer: "L. Martinez",
      featured: false,
      story: "Serving our neighbors with love and compassion"
    },
  ];

  const loopImages = [...snapshots, ...snapshots, ...snapshots];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (trackRef.current && scrollRef.current) {
      const trackWidth = trackRef.current.scrollWidth;
      const containerWidth = scrollRef.current.offsetWidth;
      setConstraints({
        left: -(trackWidth - containerWidth),
        right: 0
      });
    }
  }, []);

  const getCardHeight = (orientation: string) => {
    switch(orientation) {
      case 'landscape': return 'h-[45vh] sm:h-[50vh] md:h-[480px] lg:h-[520px]';
      case 'square': return 'h-[50vh] sm:h-[55vh] md:h-[520px] lg:h-[560px]';
      case 'portrait':
      default: return 'h-[55vh] sm:h-[60vh] md:h-[580px] lg:h-[650px]';
    }
  };

  const getCardWidth = (orientation: string) => {
    switch(orientation) {
      case 'landscape': return 'w-[85vw] sm:w-[75vw] md:w-[520px] lg:w-[600px]';
      case 'square': return 'w-[82vw] sm:w-[70vw] md:w-[480px] lg:w-[560px]';
      case 'portrait':
      default: return 'w-[78vw] sm:w-[65vw] md:w-[400px] lg:w-[460px]';
    }
  };

  return (
    <section className="py-16 md:py-48 bg-midnight-teal overflow-hidden border-t border-soft-linen/5 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12 md:mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6 md:space-y-0 md:flex md:justify-between md:items-end"
        >
          <div className="space-y-3 md:space-y-4">
            <span className="text-harvest-orange uppercase tracking-[0.4em] md:tracking-[0.5em] text-[9px] md:text-[10px] font-bold block">
              Editorial Vol. 2026
            </span>
            <h2 className="text-[18vw] md:text-[10vw] font-serif text-soft-linen tracking-tighter lowercase leading-[0.75] md:leading-[0.8]" style={{ fontFamily: 'Vogun, serif' }}>
              the pulse.
            </h2>
          </div>
          
          <div className="max-w-xs md:max-w-sm md:text-right space-y-4 md:space-y-6">
            <p className="text-soft-linen/50 md:text-soft-linen/40 font-sans text-[13px] md:text-sm leading-relaxed">
              A continuous stream of life, capturing the shared heartbeat of our church family in motion.
            </p>
            <div className="flex items-center md:justify-end gap-3 opacity-40 md:opacity-30">
              <span className="text-soft-linen text-[8px] md:text-[9px] uppercase tracking-[0.25em] md:tracking-[0.3em]">
                {isMobile ? 'Swipe to explore' : 'Drag to explore'}
              </span>
              <motion.div 
                className="w-8 md:w-12 h-[1px] bg-harvest-orange"
                animate={{ scaleX: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div 
        ref={scrollRef} 
        className="relative cursor-grab active:cursor-grabbing touch-pan-x"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div 
          ref={trackRef}
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.05}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 40 }}
          style={{ x: smoothX }}
          animate={isPaused ? {} : { x: ["0%", "-33.33%"] }}
          transition={{ 
            duration: isMobile ? 40 : 60, 
            repeat: Infinity, 
            ease: "linear",
            repeatDelay: 0
          }}
          className="flex gap-3 md:gap-8 lg:gap-12 shrink-0 px-4 md:px-6 py-2"
          onDragStart={(e) => e.stopPropagation()}
        >
          {loopImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: (i % 6) * 0.08 }}
              whileHover={isMobile ? {} : { scale: 1.03, rotateY: 2, rotateX: -2, transition: { duration: 0.4 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => !isMobile && setSelectedImage(img)}
              className={`relative shrink-0 ${getCardWidth(img.orientation)} ${getCardHeight(img.orientation)} overflow-hidden rounded-xl md:rounded-2xl group transition-all duration-700 bg-soft-linen/[0.02] border border-soft-linen/5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] cursor-pointer`}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <img src={img.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.2s] ease-out select-none pointer-events-none" alt={img.caption} loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-teal/80 via-midnight-teal/30 to-transparent opacity-80 md:opacity-70 group-hover:opacity-90 transition-opacity duration-700" />
              {img.featured && (
                <div className="absolute top-4 md:top-6 left-4 md:left-6">
                  <div className="bg-harvest-orange/90 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-harvest-orange/20">
                    <span className="text-midnight-teal text-[7px] md:text-[8px] uppercase tracking-[0.3em] font-bold">Featured</span>
                  </div>
                </div>
              )}
              <div className="absolute top-4 md:top-6 right-4 md:right-6">
                <span className="text-soft-linen/15 md:text-soft-linen/20 font-serif text-3xl md:text-4xl italic select-none">0{(i % 6) + 1}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 space-y-2 md:space-y-3">
                <div className="flex items-center gap-3 md:gap-4">
                  <motion.div className="w-2 h-2 bg-harvest-orange rounded-full shadow-[0_0_10px_rgba(245,132,26,0.8)]" animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
                  <span className="text-soft-linen font-sans text-[9px] md:text-[10px] font-bold uppercase tracking-[0.35em] md:tracking-[0.4em]">{img.tag}</span>
                </div>
                <div className="space-y-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-3 md:group-hover:translate-y-0 transition-all duration-500">
                  <h3 className="text-soft-linen font-sans text-sm md:text-base font-semibold leading-tight">{img.caption}</h3>
                  <div className="flex items-center gap-3 text-soft-linen/60 text-[10px] md:text-xs">
                    <span>{img.date}</span>
                    <span>•</span>
                    <span>Photo: {img.photographer}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-8 md:mt-12">
        <div className="flex items-center gap-4 justify-center">
          <span className="text-soft-linen/30 text-[8px] uppercase tracking-widest">Gallery</span>
          <div className="flex gap-2">
            {snapshots.map((_, i) => (
              <div key={i} className="w-8 md:w-12 h-[1px] bg-soft-linen/20 rounded-full overflow-hidden">
                <motion.div className="h-full bg-harvest-orange" initial={{ width: "0%" }} whileInView={{ width: "100%" }} viewport={{ once: false, margin: "-200px" }} transition={{ duration: 0.8, delay: i * 0.1 }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FIXED CALL TO ACTION SECTION */}
      <motion.div 
        className="mt-16 md:mt-32 text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <Link to="/engage"> 
          <motion.button 
            whileHover={isMobile ? {} : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden bg-transparent border border-soft-linen/10 px-10 md:px-16 py-4 md:py-6 rounded-full active:bg-harvest-orange/10 transition-colors"
          >
            <div className="absolute inset-0 bg-harvest-orange translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            <span className="relative z-10 text-soft-linen font-bold uppercase tracking-[0.35em] md:tracking-[0.4em] text-[10px] md:text-[11px] group-hover:text-midnight-teal transition-colors">
              Find your place in the story
            </span>
          </motion.button>
        </Link>
      </motion.div>

      {selectedImage && !isMobile && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} className="fixed inset-0 bg-midnight-teal/95 backdrop-blur-xl z-50 flex items-center justify-center p-8 cursor-pointer">
          <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="max-w-4xl w-full bg-soft-linen/5 rounded-3xl overflow-hidden border border-soft-linen/10 cursor-default" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video md:aspect-[4/3] relative">
              <img src={selectedImage.url} alt={selectedImage.caption} className="w-full h-full object-cover" />
            </div>
            <div className="p-8 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <span className="text-harvest-orange text-xs uppercase tracking-widest font-bold">{selectedImage.tag}</span>
                  <h3 className="text-soft-linen text-2xl font-serif tracking-tight">{selectedImage.caption}</h3>
                </div>
                <button onClick={() => setSelectedImage(null)} className="text-soft-linen/60 hover:text-soft-linen transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <p className="text-soft-linen/70 text-sm leading-relaxed">{selectedImage.story}</p>
              <div className="flex items-center gap-3 text-soft-linen/50 text-xs"><span>{selectedImage.date}</span><span>•</span><span>Photography by {selectedImage.photographer}</span></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default CommunityPulse;