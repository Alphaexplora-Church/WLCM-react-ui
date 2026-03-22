import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const ServiceSchedule = () => {
  // 1. Entrance Animation Stagger
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2, 
        delayChildren: 0.1 
      } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-16 md:py-24 bg-[#002E38]">
      
      {/* BACKGROUND ATMOSPHERE */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* TOP GRADIENT BRIDGE: Prevents visual "cut-off" from the section above */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#002E38] to-transparent z-10" />

        {/* Breathing Orange Orb */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-[#F5841A] rounded-full blur-[120px] md:blur-[180px] mix-blend-screen"
        />
        
        {/* Noise Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay" 
          style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} 
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-7xl mx-auto px-6 w-full"
      >
        {/* SECTION HEADER */}
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-20">
          <span className="text-[#F5841A] font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-4 md:mb-6 block">
            Weekly Gatherings
          </span>
          <h2 className="font-serif text-4xl md:text-7xl text-[#E6EDEF] lowercase tracking-tight">
            service schedule
          </h2>
        </motion.div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          
          {/* CARD 1: SUNDAY TIMES */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -10 }} 
            className="group relative bg-[#E6EDEF]/5 backdrop-blur-md border border-[#E6EDEF]/10 p-8 md:p-14 rounded-2xl overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#F5841A]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 mb-6 md:mb-8 rounded-full border border-[#F5841A]/50 text-[#F5841A] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">
                The Main Gathering
              </span>
              <h3 className="font-serif text-5xl md:text-8xl text-[#E6EDEF] mb-4 md:mb-6 tracking-tighter leading-[0.9]">
                Sunday
              </h3>
              <p className="font-sans text-[#E6EDEF]/70 text-base md:text-lg max-w-md leading-relaxed">
                A powerful time of worship and biblical teaching. Come exactly as you are.
              </p>
            </div>

            <div className="relative z-10 border-t border-[#E6EDEF]/10 pt-8 md:pt-10 flex flex-wrap gap-8 md:gap-16 mt-8 md:mt-12">
              {[
                { time: "10:00 AM", label: "First Service" }, 
                { time: "2:00 AM", label: "Second Service" },
                { time: "4:00 AM", label: "Third Service" }
              ].map((slot, i) => (
                <div key={i} className="group/time">
                  <div className="text-3xl md:text-5xl font-serif text-[#E6EDEF] group-hover/time:text-[#F5841A] transition-colors duration-300">
                    {slot.time}
                  </div>
                  <div className="text-[#E6EDEF]/40 text-[9px] md:text-[10px] uppercase tracking-widest mt-1 md:mt-2 group-hover/time:text-[#E6EDEF]/60 transition-colors">
                    {slot.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CARD 2: LOCATION & DIRECTIONS */}
          <motion.div variants={itemVariants} className="relative bg-[#00222B] border border-[#E6EDEF]/10 rounded-2xl overflow-hidden flex flex-col group min-h-[400px]">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074')] bg-cover bg-center opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#002E38] via-[#00 2E38]/80 to-transparent opacity-90 pointer-events-none" />
             
             <div className="relative z-10 p-8 md:p-14 flex flex-col justify-end h-full">
               <div className="mb-auto">
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#F5841A] flex items-center justify-center mb-6 shadow-orange-500/20 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#002E38" className="w-5 h-5 md:w-6 md:h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                 </div>
                 <h3 className="font-serif text-4xl md:text-5xl text-[#E6EDEF] mb-2 md:mb-4">Greenhills, San Juan</h3>
                 <p className="text-[#E6EDEF]/60 font-sans text-base md:text-lg max-w-sm leading-relaxed">
                   Main church building - Words of Life Church Ministry 
                 </p>
               </div>

               <div className="border-t border-[#E6EDEF]/10 pt-6 md:pt-8 mt-8 md:mt-12">
                 <p className="text-[#F5841A] font-bold uppercase tracking-widest text-[10px] mb-1">Address</p>
                 <p className="text-2xl md:text-3xl text-[#E6EDEF] font-serif mb-1">Teatrino Greenhills</p>
                 <a 
                   href="https://maps.app.goo.gl/CFJfcMtPKbHqaWTH7" 
                   target="_blank" 
                   rel="noreferrer" 
                   className="inline-flex items-center gap-3 text-[#E6EDEF] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] group/link relative z-20"
                 >
                   <span className="border-b border-[#F5841A] pb-1 group-hover/link:border-white transition-colors">Get Directions</span>
                   <span className="text-[#F5841A] text-lg group-hover/link:translate-x-1 transition-transform">→</span>
                 </a>
               </div>
             </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ServiceSchedule;