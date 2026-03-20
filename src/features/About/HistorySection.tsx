import React, { useState } from 'react';
import { motion } from 'framer-motion';

const historyData = [
  {
    year: "2002",
    title: "The Living Room",
    desc: "It started with 12 people in a small living room, hungry for something real. No lights, no stage, just prayer.",
    img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000"
  },
  {
    year: "2010",
    title: "The Warehouse",
    desc: "We outgrew the house and moved into an old warehouse. We scrubbed floors, built chairs, and made it home.",
    img: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1000"
  },
  {
    year: "Today",
    title: "The Family",
    desc: "Decades later, the room is bigger, but the spirit is the same. We are still that family chasing after Jesus.",
    img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1000"
  }
];

export default function HistorySection() {
  const [activeindex, setActiveIndex] = useState(0);

  return (
    <section className="bg-soft-linen py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 lg:gap-20">
        
        {/* --- LEFT COLUMN: NARRATIVE (Scrolls) --- */}
        <div className="w-full md:w-5/12 flex flex-col">
          
          {/* Section Header */}
          <div className="mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-harvest-orange uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-4 block"
            >
              Our Journey
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-5xl md:text-6xl text-midnight-teal leading-[0.95] lowercase tracking-tight"
            >
              how we <br/> got here.
            </motion.h2>
          </div>

          {/* Timeline Chapters */}
          <div className="flex flex-col gap-24 relative pl-8 border-l border-midnight-teal/10">
            {historyData.map((item, i) => (
              <HistoryItem 
                key={i} 
                item={item} 
                index={i} 
                onActive={() => setActiveIndex(i)} 
              />
            ))}
          </div>

        </div>

        {/* --- RIGHT COLUMN: STICKY VISUALS (Pins) --- */}
        <div className="hidden md:block w-7/12 relative">
          <div className="sticky top-32 h-[600px] w-full rounded-sm overflow-hidden bg-midnight-teal/5 shadow-2xl">
            {historyData.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeindex === i ? 1 : 0,
                  scale: activeindex === i ? 1 : 1.1, // Subtle zoom out on focus
                  filter: activeindex === i ? "blur(0px)" : "blur(8px)" // Blur transition
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale-[20%]"
                />
                
                {/* Dark Gradient Overlay for text contrast if needed */}
                <div className="absolute inset-0 bg-midnight-teal/10 mix-blend-multiply" />

                {/* Big Year Badge inside the image */}
                <div className="absolute bottom-8 right-8">
                  <span className="font-serif text-8xl text-soft-linen/90 leading-none tracking-tighter">
                    {item.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// --- SUB-COMPONENT: Individual Chapter ---
function HistoryItem({ item, index, onActive }: { item: any, index: number, onActive: () => void }) {
  return (
    <motion.div 
      // Detect when this block is in the center of the screen
      onViewportEnter={onActive}
      viewport={{ margin: "-40% 0px -40% 0px" }} // Triggers when item is in middle 20% of screen
      className="relative flex flex-col justify-center"
    >
      {/* Active Dot Indicator on the Left Border */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ margin: "-40% 0px -40% 0px" }}
        className="absolute -left-[37px] top-2 w-4 h-4 bg-harvest-orange rounded-full border-4 border-soft-linen z-10"
      />

      {/* Mobile Image (Inline) - Hidden on Desktop */}
      <div className="md:hidden w-full aspect-video bg-midnight-teal/10 rounded-sm mb-6 overflow-hidden relative">
        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
        <span className="absolute bottom-2 right-2 bg-soft-linen/90 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-midnight-teal">
          {item.year}
        </span>
      </div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-sans text-harvest-orange font-bold text-xs uppercase tracking-widest mb-2 block">
          Chapter 0{index + 1}
        </span>
        <h3 className="font-serif text-3xl text-midnight-teal mb-4">
          {item.title}
        </h3>
        <p className="font-sans text-midnight-teal/70 text-base leading-relaxed">
          {item.desc}
        </p>
      </motion.div>
    </motion.div>
  );
}