import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Sermons = () => {
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Calculate drag boundaries based on track width vs container width
  useEffect(() => {
    if (trackRef.current && scrollRef.current) {
      setConstraints({
        left: -(trackRef.current.scrollWidth - scrollRef.current.offsetWidth),
        right: 0
      });
    }
  }, []);

  const sermonArchive = [
    { title: "The Power of Stillness", series: "Walking in Light", duration: "42 min", date: "Feb 15, 2026", img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800" },
    { title: "Digital Discernment", series: "Truth Today", duration: "38 min", date: "Feb 08, 2026", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800" },
    { title: "Ancient Paths", series: "Foundations", duration: "45 min", date: "Feb 01, 2026", img: "https://images.unsplash.com/photo-1507692049790-de58293a4699?q=80&w=800" },
    { title: "Community Reimagined", series: "The Family", duration: "35 min", date: "Jan 25, 2026", img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800" },
    { title: "Voice of the Heart", series: "Prayer Life", duration: "50 min", date: "Jan 18, 2026", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800" }
  ];

  return (
    <section className="py-24 md:py-44 bg-midnight-teal relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-harvest-orange uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">The Library</span>
            <h2 className="text-5xl md:text-8xl text-soft-linen lowercase tracking-tighter leading-none" style={{ fontFamily: 'Vogun, serif' }}>
              Sermon archive.
            </h2>
          </motion.div>

          {/* ENLARGED DRAG INDICATOR */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-end gap-4"
          >
            <div className="flex items-center gap-6">
              <span className="text-soft-linen text-xs md:text-sm font-bold uppercase tracking-[0.4em] opacity-40">Drag to see more</span>
              <div className="w-24 md:w-40 h-[2px] bg-harvest-orange relative overflow-hidden">
                <motion.div 
                  animate={{ x: [-160, 160] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-1/2 bg-soft-linen"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* HORIZONTAL DRAG TRACK */}
      <div ref={scrollRef} className="relative cursor-grab active:cursor-grabbing">
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={constraints}
          className="flex gap-6 md:gap-10 px-6 md:px-[10vw]"
        >
          {sermonArchive.map((sermon, i) => (
            <motion.div
              key={i}
              className="relative shrink-0 w-[320px] md:w-[500px] h-[450px] md:h-[600px] rounded-[40px] overflow-hidden group border border-soft-linen/5 bg-midnight-teal shadow-2xl"
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={sermon.img} 
                alt={sermon.title} 
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-teal via-midnight-teal/40 to-transparent opacity-90" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[1px] bg-harvest-orange" />
                  <span className="text-harvest-orange text-[9px] md:text-xs font-bold uppercase tracking-widest">{sermon.series}</span>
                </div>
                <h3 className="text-3xl md:text-5xl text-soft-linen font-serif mb-6 tracking-tighter transition-transform group-hover:-translate-y-2">{sermon.title}</h3>
                
                <div className="flex items-center justify-between border-t border-soft-linen/10 pt-6">
                  <div className="flex gap-6 text-soft-linen/40 font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em]">
                    <span>{sermon.date}</span>
                    <span>{sermon.duration}</span>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.2, backgroundColor: "#EC662C" }}
                    className="w-10 h-10 rounded-full border border-soft-linen/20 flex items-center justify-center transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-soft-linen">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* FINAL SPACER */}
          <div className="w-[10vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
};

export default Sermons;