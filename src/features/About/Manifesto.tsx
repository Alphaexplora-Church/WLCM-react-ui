import { motion } from 'framer-motion';

export default function Manifesto() {
  return (
    <section className="min-h-screen relative z-10 bg-soft-linen overflow-hidden py-28 md:py-40">

      {/* Static background image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/events/nat_con-3.jpg"
          className="w-full h-full object-cover grayscale-[30%] blur-[2px]"
          alt="Background Texture"
        />
        <div className="absolute inset-0 bg-soft-linen/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-soft-linen/20 to-deep-teal/90 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto px-6 text-center">

        <motion.span
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-harvest-orange uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-10 md:mb-14 block"
        >
          Why We Exist
        </motion.span>

        <div className="space-y-8 md:space-y-10 text-left md:text-center max-w-3xl">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-2xl sm:text-3xl md:text-5xl text-midnight-teal tracking-tight leading-[1.25] drop-shadow-sm"
          >
            Whether this is your first time in a church, you have followed Christ for years, or you are looking for a fresh start —{' '}
            <span className="text-harvest-orange">you are welcome here.</span>
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="font-sans text-base md:text-xl text-midnight-teal/70 leading-relaxed"
          >
            At Words of Life Christian Ministries, our prayer is that every service becomes an encounter with God. We exist to help people experience His presence, grow in His Word, and build meaningful relationships within His family.
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.28, ease: "easeOut" }}
            className="font-sans text-sm md:text-base text-midnight-teal/50 leading-relaxed italic"
          >
            We are a born-again Christian church based in the Philippines committed to spiritual growth, authentic community, and practical service. Our focus is simple so that we can make the greatest possible impact in people's lives.
          </motion.p>
        </div>

        {/* Vision & Mission cards */}
        <div className="mt-16 md:mt-20 w-full grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-7 md:p-8 bg-midnight-teal rounded-2xl"
          >
            <span className="text-harvest-orange uppercase tracking-[0.3em] text-[9px] font-bold block mb-3">Vision</span>
            <p className="font-serif text-xl md:text-2xl text-soft-linen leading-snug">
              To see God's kingdom influence the whole world.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-7 md:p-8 bg-harvest-orange rounded-2xl"
          >
            <span className="text-midnight-teal/70 uppercase tracking-[0.3em] text-[9px] font-bold block mb-3">Mission</span>
            <p className="font-serif text-xl md:text-2xl text-midnight-teal leading-snug">
              To help people Know God, Find Freedom, Discover Purpose, and Make a Difference.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}