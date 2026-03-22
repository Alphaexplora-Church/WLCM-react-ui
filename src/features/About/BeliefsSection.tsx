import { motion } from 'framer-motion';

const beliefs = [
  { title: "Jesus is Lord", desc: "He is the center of everything we do. Not a historical figure, but a living Savior." },
  { title: "The Bible is True", desc: "It's not just a book of good advice. It is the authoritative voice of God for our lives." },
  { title: "Grace is Free", desc: "We are saved by grace alone, through faith alone. It cannot be earned, only received." },
  { title: "Church is Family", desc: "We weren't designed to do life alone. We grow better when we grow together." }
];

export default function BeliefsSection() {
  return (
    <section className="bg-midnight-teal py-24 md:py-32 px-6 md:px-12 text-soft-linen w-full border-t border-soft-linen/10">
      
      <div className="w-full">
        {/* HEADER SECTION */}
        {/* FIX: Changed 'items-end' to 'items-start' to force left alignment on mobile */}
        {/* Added 'md:items-end' so the button still sits at the bottom right on desktop if desired, or keep 'items-start' for total left align */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 border-b border-soft-linen/20 pb-12">
          
          <div className="max-w-2xl text-left">
            <span className="text-harvest-orange uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-4 block">
              Our Anchor
            </span>
            <h2 className="font-serif text-5xl md:text-8xl leading-[0.9] lowercase tracking-tighter text-soft-linen text-left">
              what we believe.
            </h2>
          </div>
          
          {/* Desktop Button */}
          {/* <button className="hidden md:block border border-soft-linen/30 px-8 py-3 rounded-sm font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-soft-linen hover:text-midnight-teal transition-all whitespace-nowrap">
            Read Full Statement
          </button> */}
        </div>

        {/* BELIEFS GRID - STRICT LEFT ALIGN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 w-full text-left">
          {beliefs.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-start"
            >
              {/* Decorative Line */}
              <div className="w-12 h-[1px] bg-harvest-orange mb-6" />
              
              <h3 className="font-serif text-3xl mb-4 text-soft-linen text-left">{item.title}</h3>
              <p className="font-sans text-soft-linen/60 leading-relaxed text-sm md:text-base text-left">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile Button - Aligned Left but Full Width for easy tapping */}
        {/* <div className="mt-16 md:hidden w-full flex justify-start">
            <button className="w-full border border-soft-linen/30 px-8 py-4 rounded-sm font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-soft-linen/10 transition-colors text-center">
                Read Full Statement
            </button>
        </div> */}

      </div>
    </section>
  );
}