import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom'; 

// --- IMPORTS ---
import Navigation from '../components/Navigation';
import ServiceSchedule from '../features/Experience/ServiceSchedule';
import Events from '../features/Experience/Events';
import Ministries from '../features/Experience/Ministries';
import Gallery from '../features/Experience/Gallery';

const Experience = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    /* FIX: We use 'relative' and ensure no 'min-h-screen' on the main div 
      is forcing extra height. 
    */
    <div className="bg-[#002E38] selection:bg-[#E6EDEF] selection:text-[#002E38] relative">
      
      <Navigation lightMode={false} />
      <main>
        {/* HERO */}
        <section className="relative h-[60vh] flex flex-col items-center justify-center">
          {/* Backgrounds */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
          
          {/* NEW: DUAL GRADIENT FADE */}
          {/* This makes the bottom of the hero completely seamless */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#002E38]/0 via-[#002E38]/40 to-[#002E38]" />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-4"
          >
            <p className="text-[#E6EDEF]/60 uppercase tracking-[0.4em] text-xs md:text-sm mb-4">
              Discover Our Community
            </p>
            <h1 className="font-serif text-6xl md:text-9xl text-[#E6EDEF] lowercase tracking-tighter">
              experience
            </h1>
          </motion.div>
        </section>

        {/* FEATURE SECTIONS */}
        <div id="schedule">
          <ServiceSchedule />
        </div>
        
        <div id="events">
          <Events />
        </div>
        
        <div id="ministries">
          <Ministries />
        </div>
        
        {/* GALLERY: 
          This is the final section. Because it is h-[750vh], it provides its 
          own scroll track. Once this ends, the page ends.
        */}
        <div id="gallery" className="relative">
          <Gallery />
        </div>
      </main>

      {/* FOOTER OPTIONAL: 
        If you want the page to stop EXACTLY after the gallery, 
        make sure no hidden paddings exist here. 
      */}
    </div>
  );
};

export default Experience;