import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function WelcomeStory() {
  const { scrollYProgress } = useScroll();
  
  // Parallax effects for the asymmetrical layout
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section className="bg-soft-linen w-full py-32 md:py-48 px-6 relative overflow-hidden">
      
      {/* OVERSIZED EDITORIAL WATERMARK */}
      <div className="absolute -left-10 top-20 opacity-[0.03] pointer-events-none select-none">
        <span className="font-serif text-[15rem] md:text-[25rem] text-midnight-teal leading-none tracking-tighter">
          belong.
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER AREA */}
        <div className="mb-16 md:mb-24 md:ml-12">
          <motion.span 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-harvest-orange font-sans uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-6 block"
          >
            Our Heart
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1, duration: 1 }}
            className="font-serif text-midnight-teal text-5xl md:text-7xl lg:text-[7.5rem] leading-[0.85] tracking-tighter lowercase max-w-4xl"
          >
            we've been saving <br className="hidden md:block"/> a seat for you.
          </motion.h2>
        </div>

        {/* ASYMMETRICAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-end">
          
          {/* TEXT BLOCK (Bottom Left) */}
          <motion.div 
            style={{ y: textY }}
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 1, delay: 0.2 }}
            className="md:col-span-5 md:col-start-2 pb-8 md:pb-16 order-2 md:order-1"
          >
            <div className="space-y-6 font-sans text-midnight-teal/85 text-base md:text-lg leading-relaxed font-light">
              <p>
                Church was never meant to be a performance, a weekly checklist, or just a building you visit on Sundays.
              </p>
              <p>
                It’s simply a family. A community of people learning to walk with Jesus, carrying each other’s burdens, and sharing in the quiet joy of grace. Whether your faith is overflowing or you're just full of questions, you are welcome at this table.
              </p>
            </div>
          </motion.div>

          {/* PORTRAIT IMAGE (Top Right) */}
          <motion.div 
            style={{ y: imageY }}
            className="md:col-span-5 md:col-start-8 relative order-1 md:order-2 h-[60vh] md:h-[75vh] w-full"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full rounded-sm overflow-hidden shadow-2xl relative"
            >
              <img 
                // Suggestion: An image of people sharing coffee, a meal, or laughing warmly together
                src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1000" 
                alt="A warm gathering" 
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
              />
              {/* Subtle tint to map the image to the brand colors */}
              <div className="absolute inset-0 bg-midnight-teal/10 mix-blend-overlay" />
            </motion.div>
            
            {/* Decorative Accent Line */}
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "30%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute -bottom-6 right-0 h-[2px] bg-harvest-orange"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}