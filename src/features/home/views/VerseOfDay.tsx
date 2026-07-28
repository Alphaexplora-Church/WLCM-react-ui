import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

export default function VerseOfDay() {
  const verseText = "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come. — 2 Corinthians 5:17";
  const words = verseText.split(" ");

  // Container variants to control the sequential "highlighting"
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Adjust this value to make the highlighting faster or slower
        delayChildren: 0.2,
      }
    }
  };

  // Individual word variants
  const wordVariants: Variants = {
    hidden: { opacity: 0.15, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section className="bg-midnight-teal h-full w-full flex flex-col items-center justify-center overflow-hidden relative">
      
      {/* 1. CINEMATIC BACKGROUND DEPTH (Static) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=2000" 
          alt="Texture" 
          className="w-full h-full object-cover blur-[12px] grayscale-[50%] scale-105 opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-teal via-midnight-teal/80 to-midnight-teal" />
      </div>

      {/* 2. OVERSIZED TYPOGRAPHIC WATERMARK (Continuous Drift) */}
      <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden pointer-events-none select-none">
        <motion.span 
          animate={{ x: ["2%", "-2%"] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="font-serif text-[12rem] md:text-[25rem] text-soft-linen/[0.03] tracking-tighter lowercase whitespace-nowrap"
        >
          verse
        </motion.span>
      </div>

      {/* 3. THE ACTUAL VERSE */}
      <div className="z-10 flex flex-col items-center px-6">
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-harvest-orange uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-10 md:mb-16"
        >
          The Joy of Salvation
        </motion.span>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Triggers when 30% of the section is visible
          className="flex flex-wrap justify-center text-center leading-[1.1] gap-x-3 gap-y-2 md:gap-x-5 md:gap-y-4 max-w-6xl"
        >
          {words.map((word, i) => (
            <motion.span 
              key={i} 
              variants={wordVariants}
              className="font-serif text-4xl md:text-7xl lg:text-8xl text-soft-linen tracking-tighter drop-shadow-lg"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>
      
    </section>
  );
}