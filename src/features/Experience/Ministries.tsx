import React, { useState, useEffect, useCallback, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Category = 'Life' | 'Service';

interface Ministry {
  title: string;
  tagline: string;
  story: string;
  category: Category;
  image: string;
}

const ministriesData: Ministry[] = [
  // Life Ministries
  { title: "Seasoned", tagline: "Wisdom & Legacy", category: "Life", story: "A community for mature believers to share wisdom, build lasting friendships, and continue growing in faith.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800" },
  { title: "Modern Day Knights", tagline: "Men of Purpose", category: "Life", story: "Equipping men to lead with integrity, faith, and courage in every area of life — home, work, and community.", image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800" },
  { title: "At The Well", tagline: "Women of God", category: "Life", story: "A gathering place where women encounter God, build authentic friendships, and discover their God-given identity.", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800" },
  { title: "Pulse Youth", tagline: "Next Generation", category: "Life", story: "Where students find belonging, navigate real-life issues with biblical truth, and discover how faith shapes every part of life.", image: "https://images.unsplash.com/photo-1507692049790-de58293a4699?q=80&w=800" },
  // Service Ministries
  { title: "Kids Church", tagline: "Start Them Young", category: "Service", story: "A safe, vibrant environment where children discover the love of Jesus through age-appropriate teaching and activities.", image: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=800" },
  { title: "Heavensound Worship", tagline: "Excellence in Praise", category: "Service", story: "Musicians and creatives united in leading the whole church into God's presence through heartfelt, skillful worship.", image: "/events/heavensound-3.jpg" },
  { title: "Hospitality", tagline: "Welcome & Care", category: "Service", story: "Making every guest feel seen, valued, and at home from the moment they step through the door.", image: "/events/hospitality-2.jpg" },
  { title: "PTV", tagline: "Media & Production", category: "Service", story: "Serving the church through professional audio, visual, and broadcast production for worship and online reach.", image: "/events/ptv-1.jpg" },
  { title: "Buhat Brigade", category: "Service", tagline: "Hands That Serve", story: "The backbone of every service — the team that sets up, breaks down, and ensures everything runs smoothly for the glory of God.", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800" },
  { title: "Gathering Grounds", category: "Service", tagline: "Community & Connection", story: "Creating spaces where people naturally connect — from coffee corners to community gatherings — so no one feels like a stranger.", image: "https://images.unsplash.com/photo-1483971896012-0e41ce0d380a?q=80&w=800" },
];

const Ministries: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('Life');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const filtered = ministriesData.filter(m => m.category === activeCategory);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filtered.length);
    setTilt({ x: 0, y: 0 });
  }, [filtered.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    setTilt({ x: 0, y: 0 });
  }, [filtered.length]);

  // Reset index when category changes
  useEffect(() => { setCurrentIndex(0); }, [activeCategory]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (!isHovering) {
      timer = setInterval(() => nextSlide(), 5000);
    }
    return () => clearInterval(timer);
  }, [isHovering, nextSlide]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isHovering) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    setTilt({ x: -y * 15, y: x * 15 });
  };

  return (
    <section id="ministries" className="relative w-full min-h-screen flex flex-col bg-[#002E38] text-[#E6EDEF] overflow-hidden py-20">

      {/* Morphing background typography */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
        <AnimatePresence mode="wait">
          <motion.h1
            key={`${activeCategory}-${currentIndex}`}
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1, ease: "circOut" }}
            className="font-serif text-[25vw] leading-none uppercase tracking-tighter select-none whitespace-nowrap"
          >
            {filtered[currentIndex]?.title.split(' ')[0]}
          </motion.h1>
        </AnimatePresence>
      </div>

      <div className="flex-1 w-full px-6 flex flex-col items-center justify-center relative z-10">
        <div className="text-center mb-8">
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase mb-2 opacity-60">Our Community</p>
          <h2 className="font-serif text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-6">MINISTRIES</h2>

          {/* Category tabs */}
          <div className="flex gap-2 p-1 bg-[#E6EDEF]/5 rounded-full w-fit mx-auto">
            {(['Life', 'Service'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-sans text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 ${activeCategory === cat
                  ? 'bg-[#F5841A] text-[#002E38]'
                  : 'text-[#E6EDEF]/50 hover:text-[#E6EDEF]'
                  }`}
              >
                {cat} Ministries
              </button>
            ))}
          </div>
        </div>

        {/* 3D Slideshow */}
        <div className="relative w-full max-w-6xl h-[400px] md:h-[500px] flex items-center justify-center [perspective:2000px]">
          {filtered.map((min, index) => {
            const offset = (index - currentIndex + filtered.length) % filtered.length;
            let xPos = 0, zPos = 0, rotationY = 0, opacity = 0, zIndex = 0;
            if (offset === 0) { xPos = 0; zPos = 0; rotationY = 0; opacity = 1; zIndex = 30; }
            else if (offset === 1 || offset === filtered.length - 1) {
              xPos = offset === 1 ? (window.innerWidth > 768 ? 300 : 90) : (window.innerWidth > 768 ? -300 : -90);
              zPos = -250; rotationY = offset === 1 ? -40 : 40; opacity = 0.35; zIndex = 20;
            } else { opacity = 0; zIndex = 0; }

            return (
              <motion.div
                key={index}
                initial={false}
                animate={{ x: xPos, z: zPos, rotateY: rotationY, opacity, scale: offset === 0 ? 1 : 0.8 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={offset === 0 ? handleMouseMove : undefined}
                onMouseEnter={offset === 0 ? () => setIsHovering(true) : undefined}
                onMouseLeave={offset === 0 ? () => { setIsHovering(false); setTilt({ x: 0, y: 0 }); } : undefined}
                className="absolute w-64 h-[360px] md:w-72 md:h-[420px] rounded-2xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] cursor-pointer"
                style={{ zIndex, transformStyle: "preserve-3d", rotateX: offset === 0 ? tilt.x : 0, rotateY: offset === 0 ? rotationY + tilt.y : rotationY }}
                onClick={() => offset !== 0 && setCurrentIndex(index)}
              >
                <img src={min.image} alt={min.title} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-t from-[#002E38] via-transparent to-transparent flex flex-col justify-end p-6 transition-opacity duration-500 ${offset === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#F5841A] font-bold mb-1">{min.category} Ministry</span>
                  <h3 className="font-serif text-xl uppercase tracking-tight text-[#F5841A]">{min.title}</h3>
                </div>
                {offset === 0 && (
                  <motion.div layoutId="activeFrame" className="absolute inset-0 border-[3px] border-[#F5841A] rounded-2xl pointer-events-none z-50" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Controls + text */}
        <div className="flex flex-col items-center gap-8 mt-12 max-w-xl w-full">
          <div className="flex items-center gap-10">
            <button onClick={prevSlide} className="w-11 h-11 border border-[#E6EDEF]/20 rounded-full flex items-center justify-center hover:bg-[#F5841A] hover:border-[#F5841A] hover:text-[#002E38] transition-all group">
              <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
            </button>
            <div className="flex gap-3">
              {filtered.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? 'bg-[#F5841A] w-10' : 'bg-[#E6EDEF]/10 w-3'}`} />
              ))}
            </div>
            <button onClick={nextSlide} className="w-11 h-11 border border-[#E6EDEF]/20 rounded-full flex items-center justify-center hover:bg-[#F5841A] hover:border-[#F5841A] hover:text-[#002E38] transition-all group">
              <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <h3 className="font-serif text-2xl md:text-3xl uppercase tracking-[0.1em] mb-3 text-[#F5841A]">{filtered[currentIndex]?.tagline}</h3>
              <p className="font-sans text-base opacity-60 italic max-w-md mx-auto">"{filtered[currentIndex]?.story}"</p>
              <button className="mt-6 px-8 py-2.5 rounded-full border border-[#F5841A]/40 text-[#F5841A] font-sans text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-[#F5841A] hover:text-[#002E38] transition-all">
                Join this Ministry
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Ministries;