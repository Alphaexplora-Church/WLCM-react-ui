import { motion, AnimatePresence } from 'framer-motion';
import { useContactViewModel } from './viewmodels/useContactViewModel';

const Contact = () => {
  const { form, isSubmitted, isLoading, error, handleChange, handleSubmit, handleReset } =
    useContactViewModel();

  return (
    <section className="py-8 md:pt-32 md:pb-8 bg-midnight-teal">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-8 md:mb-10"
        >
          <span className="text-harvest-orange uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">Direct Connection</span>
          <h2 className="text-5xl md:text-9xl text-soft-linen lowercase tracking-tighter" style={{ fontFamily: 'Vogun, serif' }}>reach out.</h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-8 md:gap-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <div className="group relative">
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-soft-linen/10 py-4 text-soft-linen focus:border-harvest-orange outline-none transition-all font-serif text-3xl placeholder:text-medium-linen/5"
                    placeholder="I am..."
                  />
                  <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-widest text-harvest-orange opacity-0 group-focus-within:opacity-100 transition-opacity">Name</label>
                </div>
                <div className="group relative">
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-soft-linen/10 py-4 text-soft-linen focus:border-harvest-orange outline-none transition-all font-serif text-3xl placeholder:text-medium-linen/5"
                    placeholder="Reach me at..."
                  />
                  <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-widest text-harvest-orange opacity-0 group-focus-within:opacity-100 transition-opacity">Email Address</label>
                </div>
              </div>

              <div className="group relative">
                <textarea
                  rows={2}
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-soft-linen/10 py-4 text-soft-linen focus:border-harvest-orange outline-none transition-all font-serif text-3xl placeholder:text-medium-linen/5 resize-none"
                  placeholder="How can we help you?"
                />
                <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-widest text-harvest-orange opacity-0 group-focus-within:opacity-100 transition-opacity">Message</label>
              </div>

              {/* Error message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm font-sans text-center"
                >
                  {error}
                </motion.p>
              )}

              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-4 md:mt-6">
                <p className="text-soft-linen/30 font-sans text-xs max-w-xs leading-loose italic">
                  "We typically respond within 24 hours. Your words are valued and held in confidence."
                </p>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={isLoading ? {} : { scale: 1.05 }}
                  whileTap={isLoading ? {} : { scale: 0.95 }}
                  className="w-full md:w-auto bg-harvest-orange text-soft-linen px-16 py-6 rounded-full font-bold uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-harvest-orange/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending…' : 'Send Your Message'}
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center text-center py-16"
            >
              {/* Check icon */}
              <div className="w-16 h-16 rounded-full bg-harvest-orange/10 border border-harvest-orange/30 flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-harvest-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <p
                className="text-soft-linen text-3xl tracking-tight mb-3"
                style={{ fontFamily: 'Vogun, serif' }}
              >
                Message sent!
              </p>
              <p className="text-soft-linen/60 text-sm leading-relaxed max-w-xs mb-8">
                Thanks, {form.name || 'friend'}! We'll get back to you within 24 hours.
              </p>

              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-full border border-soft-linen/20 text-soft-linen font-sans text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-harvest-orange hover:text-soft-linen hover:border-harvest-orange transition-all duration-300"
              >
                Send Another Message
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Contact;
