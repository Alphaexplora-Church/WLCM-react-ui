import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ministries = [
  { title: "Kids Ministry", img: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=800" },
  { title: "Youth Ministry", img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800" },
  { title: "Young Adults", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800" },
  { title: "Men's Ministry", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800" },
  { title: "Women's Ministry", img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=800" }
];

export default function MinistrySection() {
  const targetRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  // =========================================
  // MOBILE VIEW: RIGHT-TO-LEFT SWIPE
  // =========================================
  if (isMobile) {
    return (
      <section className="bg-midnight-teal py-24 overflow-hidden relative">
        <div className="px-6 mb-12">
          <span className="text-harvest-orange uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">
            Find Your Family 
          </span>
          <h2 className="font-serif text-5xl text-soft-linen lowercase tracking-tighter">
            our communities 
          </h2>
        </div>
        
        {/* NATIVE SWIPE TRACK (Right-to-Left) */}
        <div className="flex gap-6 px-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 touch-pan-x">
          {ministries.map((item, i) => (
            <div key={i} className="w-[85vw] h-[50vh] flex-shrink-0 snap-center relative rounded-sm overflow-hidden shadow-xl">
              <img 
                src={item.img} 
                className="w-full h-full object-cover opacity-80" 
                alt={item.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-teal via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-8 left-6">
                <h3 className="font-serif text-3xl text-soft-linen lowercase tracking-tight mb-2">
                  {item.title}
                </h3>
                <div className="w-10 h-[2px] bg-harvest-orange" />
              </div>
            </div>
          ))}
          {/* Invisible spacer to allow for a natural end to the scroll */}
          <div className="w-1 flex-shrink-0" />
        </div>
      </section>
    );
  }

  // =========================================
  // DESKTOP VIEW: STICKY TRACK
  // =========================================
  return (
    <section ref={targetRef} className="relative h-[300vh] bg-midnight-teal">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        <div className="absolute top-24 md:top-32 left-6 md:left-24 z-10">
          <span className="text-harvest-orange uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-4 block">
            Find Your Family [cite: 76]
          </span>
          <h2 className="font-serif text-5xl md:text-8xl text-soft-linen lowercase tracking-tighter">
            our communities [cite: 215]
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-6 md:px-24 ml-[10vw] md:ml-[25vw] mt-24">
          {ministries.map((item, i) => (
            <div key={i} className="group relative w-[75vw] md:w-[400px] h-[50vh] md:h-[60vh] flex-shrink-0 cursor-pointer">
              
              <div className="w-full h-full bg-midnight-teal overflow-hidden rounded-sm relative shadow-2xl">
                <img 
                  src={item.img} 
                  className="w-full h-full object-cover opacity-80 md:grayscale-[30%] group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-teal via-transparent to-transparent opacity-90" />
              </div>
              
              <div className="absolute bottom-8 left-8">
                <h3 className="font-serif text-3xl md:text-4xl text-soft-linen lowercase tracking-tight mb-2">
                  {item.title}
                </h3>
                <div className="w-10 h-[2px] bg-harvest-orange group-hover:w-[150%] transition-all duration-500" />
              </div>
              
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}