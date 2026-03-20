import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative px-4 sm:px-6 overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=2000"
          alt="Welcome Background"
          className="w-full h-full object-cover blur-[6px] scale-105 grayscale-[30%] opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-teal/40 via-deep-teal/80 to-deep-teal" />
      </div>

      {/* LOGO LOCKUP CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="flex flex-col items-center z-20 w-full max-w-5xl mx-auto mt-10 md:mt-16"
      >
        <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-12 lg:gap-16 mb-2 md:mb-4">
          <span className="font-sans text-soft-linen font-semibold tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm uppercase">
            Estd
          </span>

          {/* CENTRAL VIDEO/LOGO CONTAINER */}
          <div className="relative w-40 sm:w-56 md:w-80 lg:w-96 aspect-square flex items-center justify-center">

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[150%] h-[150%] bg-soft-linen rounded-full blur-[40px] md:blur-[60px] z-0 pointer-events-none"
            />

            <video
              autoPlay
              muted
              loop
              playsInline
              className="relative z-10 w-full h-full object-contain mix-blend-lighten scale-[1.5] md:scale-[1.8]"
            >
              <source src="/INTRO.webm" type="video/webm" />
            </video>
          </div>

          <span className="font-sans text-soft-linen font-semibold tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm uppercase">
            2002
          </span>
        </div>

        <div className="text-center w-full">
          <h1 className="font-serif text-[2.75rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] leading-[1] text-soft-linen tracking-tighter uppercase">
            WORDS OF LIFE
          </h1>
          <p className="font-sans text-soft-linen uppercase tracking-[0.2em] sm:tracking-[0.35em] text-[12px] sm:text-[14px] md:text-[18px] mt-2 sm:mt-4 md:mt-6 font-semibold">
            christian ministries inc.
          </p>
        </div>
      </motion.div>

      {/* --- SCROLL INDICATOR REMOVED HERE --- */}

    </section>
  );
}