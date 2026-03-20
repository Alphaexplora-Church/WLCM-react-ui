import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Gallery: React.FC = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  // 1. TRACK VERTICAL SCROLL
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // 2. HORIZONTAL TRANSFORM: Maps scroll to -650% for 24 images
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-650%"]);

  const images = [
    // --- ROW 1 ---
    { url: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=600", className: "w-[120px] h-[180px] md:w-[220px] md:h-[320px] left-[15vw] top-[10vh]" },
    { url: "https://images.unsplash.com/photo-1507692049790-de58293a4699?q=80&w=600", className: "w-[140px] h-[100px] md:w-[280px] md:h-[200px] left-[45vw] bottom-[15vh]" },
    { url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=600", className: "w-[130px] h-[190px] md:w-[240px] md:h-[340px] left-[80vw] top-[5vh]" },
    { url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600", className: "w-[110px] h-[150px] md:w-[180px] md:h-[240px] left-[110vw] bottom-[10vh]" },
    
    // --- ROW 2 ---
    { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600", className: "w-[150px] h-[200px] md:w-[300px] md:h-[400px] left-[145vw] top-[15vh]" },
    { url: "https://images.unsplash.com/photo-1483971896012-0e41ce0d380a?q=80&w=600", className: "w-[140px] h-[100px] md:w-[260px] md:h-[180px] left-[175vw] bottom-[20vh]" },
    { url: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=600", className: "w-[120px] h-[170px] md:w-[220px] md:h-[300px] left-[205vw] top-[8vh]" },
    { url: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=600", className: "w-[140px] h-[190px] md:w-[260px] md:h-[340px] left-[235vw] bottom-[5vh]" },

    // --- ROW 3 ---
    { url: "https://images.unsplash.com/photo-1520218508822-998633d997e6?q=80&w=600", className: "w-[110px] h-[160px] md:w-[200px] md:h-[280px] left-[270vw] top-[12vh]" },
    { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600", className: "w-[160px] h-[110px] md:w-[320px] md:h-[220px] left-[300vw] bottom-[18vh]" },
    { url: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?q=80&w=600", className: "w-[130px] h-[180px] md:w-[240px] md:h-[340px] left-[335vw] top-[6vh]" },
    { url: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=600", className: "w-[120px] h-[160px] md:w-[210px] md:h-[290px] left-[365vw] bottom-[12vh]" },

    // --- ROW 4 ---
    { url: "https://images.unsplash.com/photo-1519817914152-22d216bb9170?q=80&w=600", className: "w-[150px] h-[100px] md:w-[280px] md:h-[190px] left-[400vw] top-[20vh]" },
    { url: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=600", className: "w-[110px] h-[170px] md:w-[220px] md:h-[310px] left-[430vw] bottom-[8vh]" },
    { url: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?q=80&w=600", className: "w-[140px] h-[190px] md:w-[260px] md:h-[340px] left-[465vw] top-[10vh]" },
    { url: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?q=80&w=600", className: "w-[120px] h-[120px] md:w-[240px] md:h-[240px] left-[495vw] bottom-[15vh]" },

    // --- ROW 5 ---
    { url: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=600", className: "w-[130px] h-[180px] md:w-[250px] md:h-[350px] left-[530vw] top-[7vh]" },
    { url: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?q=80&w=600", className: "w-[150px] h-[110px] md:w-[290px] md:h-[210px] left-[560vw] bottom-[16vh]" },
    { url: "https://images.unsplash.com/photo-1507692049790-de58293a4699?q=80&w=600", className: "w-[120px] h-[170px] md:w-[230px] md:h-[320px] left-[595vw] top-[13vh]" },
    { url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=600", className: "w-[140px] h-[150px] md:w-[270px] md:h-[280px] left-[625vw] bottom-[9vh]" },

    // --- ROW 6 ---
    { url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600", className: "w-[110px] h-[160px] md:w-[210px] md:h-[300px] left-[660vw] top-[18vh]" },
    { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600", className: "w-[160px] h-[120px] md:w-[310px] md:h-[230px] left-[690vw] bottom-[11vh]" },
    { url: "https://images.unsplash.com/photo-1520218508822-998633d997e6?q=80&w=600", className: "w-[130px] h-[190px] md:w-[240px] md:h-[340px] left-[725vw] top-[9vh]" },
    { url: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=600", className: "w-[120px] h-[160px] md:w-[220px] md:h-[290px] left-[755vw] bottom-[14vh]" }
  ];

  return (
    <section 
      ref={targetRef} 
      className="relative h-[200vh] md:h-[950vh] bg-midnight-teal border-none"
    >
      <div className="sticky top-0 h-screen w-full flex items-center overflow-x-auto md:overflow-x-hidden no-scrollbar">
        
        <motion.div 
          style={{ x: typeof window !== 'undefined' && window.innerWidth > 768 ? x : 0 }} 
          className="relative h-full flex items-center pl-[15vw] shrink-0"
        >
          {/* BACKGROUND TEXT */}
          <h1 
            className="sticky left-0 md:relative text-[25vh] md:text-[60vh] leading-none text-soft-linen whitespace-nowrap tracking-tighter z-10 select-none shrink-0"
            style={{ 
              fontFamily: 'Vogun, serif', 
              fontWeight: 500 
            }}
          >
            Words of Life Christian Ministry
          </h1>

          {images.map((img, i) => (
            <div 
              key={i}
              className={`absolute grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl z-20 group ${img.className}`}
            >
              <img 
                src={img.url} 
                alt="Gallery Item" 
                className="w-full h-full object-cover rounded-sm border border-white/5"
              />
              <div className="absolute -bottom-4 left-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-harvest-orange text-[7px] font-bold tracking-widest uppercase">
                  WOL / {i < 9 ? `0${i+1}` : i+1}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* MOBILE SWIPE INDICATOR */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:hidden flex flex-col items-center opacity-60 z-50">
           <span className="text-[9px] text-soft-linen tracking-[0.4em] uppercase mb-2">Swipe Right</span>
           <div className="w-12 h-[2px] bg-harvest-orange" />
        </div>

      </div>
    </section>
  );
};

export default Gallery;