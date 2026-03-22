import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section className="py-24 md:py-48 bg-midnight-teal">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-24"
        >
          <span className="text-harvest-orange uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">Direct Connection</span>
          <h2 className="text-5xl md:text-9xl text-soft-linen lowercase tracking-tighter" style={{ fontFamily: 'Vogun, serif' }}>reach out.</h2>
        </motion.div>

        <form className="flex flex-col gap-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="group relative">
              <input type="text" className="w-full bg-transparent border-b border-soft-linen/10 py-4 text-soft-linen focus:border-harvest-orange outline-none transition-all font-serif text-3xl placeholder:text-medium-linen/5" placeholder="I am..." />
              <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-widest text-harvest-orange opacity-0 group-focus-within:opacity-100 transition-opacity">Name</label>
            </div>
            <div className="group relative">
              <input type="email" className="w-full bg-transparent border-b border-soft-linen/10 py-4 text-soft-linen focus:border-harvest-orange outline-none transition-all font-serif text-3xl placeholder:text-medium-linen/5" placeholder="Reach me at..." />
              <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-widest text-harvest-orange opacity-0 group-focus-within:opacity-100 transition-opacity">Email Address</label>
            </div>
          </div>

          <div className="group relative">
            <textarea rows={2} className="w-full bg-transparent border-b border-soft-linen/10 py-4 text-soft-linen focus:border-harvest-orange outline-none transition-all font-serif text-3xl placeholder:text-medium-linen/5 resize-none" placeholder="I'd like to talk about..." />
            <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-widest text-harvest-orange opacity-0 group-focus-within:opacity-100 transition-opacity">Message</label>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mt-12">
            <p className="text-soft-linen/30 font-sans text-xs max-w-xs leading-loose italic">
              "We typically respond within 24 hours. Your words are valued and held in confidence."
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto bg-harvest-orange text-soft-linen px-16 py-6 rounded-full font-bold uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-harvest-orange/20"
            >
              Send Your Message
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;