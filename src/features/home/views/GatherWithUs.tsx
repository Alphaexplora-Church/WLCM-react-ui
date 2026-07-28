import { motion } from 'framer-motion';

export default function GatherWithUs() {
  return (
    <section className="bg-deep-teal w-full py-32 md:py-48 px-6 flex flex-col items-center text-center">
      <motion.span 
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
        className="text-harvest-orange font-sans uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold mb-6 block"
      >
        You Belong Here
      </motion.span>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.1 }}
        className="font-serif text-soft-linen text-5xl md:text-7xl leading-[1] tracking-tighter lowercase mb-12"
      >
        come as you are.
      </motion.h2>

      <motion.div 
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }}
        className="flex flex-col md:flex-row gap-8 md:gap-16 font-sans text-soft-linen/80 text-sm md:text-base font-light"
      >
        <div className="flex flex-col">
          <strong className="text-soft-linen font-medium tracking-widest uppercase text-xs mb-2">Sunday Gatherings</strong>
          <span>9:00 AM & 11:00 AM</span>
        </div>
        <div className="flex flex-col">
          <strong className="text-soft-linen font-medium tracking-widest uppercase text-xs mb-2">Location</strong>
          <span>Main Sanctuary, WLCM Campus</span>
        </div>
      </motion.div>

      <motion.a 
        href="#plan-a-visit" // Route to Service Schedule / Contact
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }}
        className="mt-16 border-b border-harvest-orange pb-1 text-soft-linen font-sans uppercase tracking-[0.2em] text-[10px] md:text-xs hover:text-harvest-orange transition-colors"
      >
        Plan a Visit
      </motion.a>
    </section>
  );
}