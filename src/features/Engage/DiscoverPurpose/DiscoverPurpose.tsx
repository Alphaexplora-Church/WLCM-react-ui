import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../../../components/Navigation';
import { useDiscoverPurposeViewModel } from './viewmodels/useDiscoverPurposeViewModel';

const DiscoverPurpose = () => {
  const { form, isSubmitted, isLoading, error, programs, handleChange, handleSubmit, handleReset } =
    useDiscoverPurposeViewModel();

  return (
    <div className="bg-midnight-teal selection:bg-harvest-orange selection:text-soft-linen relative min-h-screen">
      <Navigation lightMode={false} />

      <main>
        {/* ── Hero Header ──────────────────────────────────────── */}
        <section className="pt-36 pb-20 md:pt-48 md:pb-28 bg-midnight-teal">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <span className="text-harvest-orange uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">
                Your Journey Awaits
              </span>
              <h1
                className="text-5xl md:text-8xl text-soft-linen lowercase tracking-tighter mb-6"
                style={{ fontFamily: 'Vogun, serif' }}
              >
                find freedom
              </h1>
              <p className="text-soft-linen/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                Step into a transformative spiritual journey designed to help you
                encounter God's purpose and grow deeper in your faith.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Programs ─────────────────────────────────────────── */}
        <section className="pb-0 bg-midnight-teal">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {programs.map((program, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group border border-soft-linen/10 rounded-2xl p-8 md:p-10 hover:border-harvest-orange/40 transition-all duration-500 bg-white/[0.03] hover:bg-white/[0.055]"
                >
                  {/* Card top row */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <span className="text-harvest-orange text-[9px] uppercase tracking-[0.35em] font-bold block mb-3">
                        {program.number}
                      </span>
                      <h2
                        className="text-3xl md:text-4xl text-soft-linen tracking-tight leading-none"
                        style={{ fontFamily: 'Vogun, serif' }}
                      >
                        {program.title}
                      </h2>
                    </div>
                    {/* Tag pill */}
                    <span className="shrink-0 mt-1 px-3 py-1 rounded-full bg-harvest-orange/10 text-harvest-orange text-[9px] uppercase tracking-widest font-bold border border-harvest-orange/20">
                      {program.tag}
                    </span>
                  </div>

                  <p className="text-soft-linen/60 text-sm leading-relaxed mb-8">
                    {program.description}
                  </p>

                  <div className="flex items-center justify-between pt-5 border-t border-soft-linen/10">
                    <span className="text-soft-linen/35 text-[10px] uppercase tracking-widest font-semibold">
                      {program.duration}
                    </span>
                    <div className="w-7 h-7 rounded-full border border-harvest-orange/30 flex items-center justify-center group-hover:border-harvest-orange group-hover:bg-harvest-orange/10 transition-all duration-300">
                      <svg
                        className="w-3 h-3 text-harvest-orange"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sign-Up Split Section ─────────────────────────────── */}
        <section className="mt-6 bg-midnight-teal">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto px-6 md:px-12 pb-24 md:pb-36"
          >
            {/* Split card */}
            <div className="rounded-2xl overflow-hidden border border-soft-linen/10 grid grid-cols-1 md:grid-cols-[1fr_1.1fr]">

              {/* Left — context panel (dark) */}
              <div className="bg-white/[0.04] p-10 md:p-14 flex flex-col justify-between border-b md:border-b-0 md:border-r border-soft-linen/10">
                <div>
                  <span className="text-harvest-orange text-[9px] uppercase tracking-[0.35em] font-bold block mb-6">
                    Get Involved
                  </span>
                  <h2
                    className="text-3xl md:text-5xl text-soft-linen tracking-tight leading-[1.05] mb-5"
                    style={{ fontFamily: 'Vogun, serif' }}
                  >
                    Ready to begin?
                  </h2>
                  <p className="text-soft-linen/55 text-sm leading-relaxed">
                    Fill out the form and we'll send you everything you need to
                    know about the Pre-Encounter, Encounter, and Post-Encounter programs —
                    and help you find the right fit for where you are right now.
                  </p>
                </div>

                {/* Program highlight list */}
                <div className="mt-10 md:mt-0 pt-8 border-t border-soft-linen/10 flex flex-col gap-4">
                  {programs.map((p) => (
                    <div key={p.number} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-harvest-orange/10 border border-harvest-orange/25 flex items-center justify-center shrink-0">
                        <span className="text-harvest-orange text-[9px] font-bold">{p.number}</span>
                      </div>
                      <div>
                        <p
                          className="text-soft-linen text-sm tracking-tight"
                          style={{ fontFamily: 'Vogun, serif' }}
                        >
                          {p.title}
                        </p>
                        <p className="text-soft-linen/35 text-[10px] uppercase tracking-widest">{p.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — form panel (high-contrast light) */}
              <div className="bg-soft-linen p-10 md:p-14">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5"
                    >
                      <p
                        className="text-midnight-teal text-xl tracking-tight mb-1"
                        style={{ fontFamily: 'Vogun, serif' }}
                      >
                        Your Information
                      </p>

                      {/* Name row */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-sans text-[9px] uppercase tracking-[0.25em] font-bold text-midnight-teal/50">
                            First Name *
                          </label>
                          <input
                            name="firstName"
                            required
                            value={form.firstName}
                            onChange={handleChange}
                            placeholder="First"
                            className="w-full px-4 py-3 rounded-xl border border-midnight-teal/12 bg-white focus:outline-none focus:border-harvest-orange focus:ring-2 focus:ring-harvest-orange/15 font-sans text-sm text-midnight-teal placeholder:text-midnight-teal/25 transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-sans text-[9px] uppercase tracking-[0.25em] font-bold text-midnight-teal/50">
                            Last Name *
                          </label>
                          <input
                            name="lastName"
                            required
                            value={form.lastName}
                            onChange={handleChange}
                            placeholder="Last"
                            className="w-full px-4 py-3 rounded-xl border border-midnight-teal/12 bg-white focus:outline-none focus:border-harvest-orange focus:ring-2 focus:ring-harvest-orange/15 font-sans text-sm text-midnight-teal placeholder:text-midnight-teal/25 transition-all"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-[9px] uppercase tracking-[0.25em] font-bold text-midnight-teal/50">
                          Email Address *
                        </label>
                        <input
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl border border-midnight-teal/12 bg-white focus:outline-none focus:border-harvest-orange focus:ring-2 focus:ring-harvest-orange/15 font-sans text-sm text-midnight-teal placeholder:text-midnight-teal/25 transition-all"
                        />
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-[9px] uppercase tracking-[0.25em] font-bold text-midnight-teal/50">
                          Phone Number
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+63 9XX XXX XXXX"
                          className="w-full px-4 py-3 rounded-xl border border-midnight-teal/12 bg-white focus:outline-none focus:border-harvest-orange focus:ring-2 focus:ring-harvest-orange/15 font-sans text-sm text-midnight-teal placeholder:text-midnight-teal/25 transition-all"
                        />
                      </div>

                      {/* Inspiration */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-[9px] uppercase tracking-[0.25em] font-bold text-midnight-teal/50">
                          What has inspired or moved you to start this journey with God? *
                        </label>
                        <textarea
                          name="inspiration"
                          required
                          value={form.inspiration}
                          onChange={handleChange}
                          placeholder="Share what's on your heart…"
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-midnight-teal/12 bg-white focus:outline-none focus:border-harvest-orange focus:ring-2 focus:ring-harvest-orange/15 font-sans text-sm text-midnight-teal placeholder:text-midnight-teal/25 transition-all resize-none"
                        />
                      </div>



                      {/* How did you hear */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-[9px] uppercase tracking-[0.25em] font-bold text-midnight-teal/50">
                          How did you hear about us?
                        </label>
                        <div className="relative">
                          <select
                            name="hearAboutUs"
                            value={form.hearAboutUs}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-midnight-teal/12 bg-white focus:outline-none focus:border-harvest-orange focus:ring-2 focus:ring-harvest-orange/15 font-sans text-sm text-midnight-teal appearance-none transition-all"
                          >
                            <option value="">Select an option…</option>
                            <option value="Friend or Family Member">A Friend or Family Member</option>
                            <option value="Social Media">Social Media</option>
                            <option value="Through Church">Through Church</option>
                            <option value="Website / Google">Website / Google</option>
                            <option value="Other">Other</option>
                          </select>
                          <svg
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-midnight-teal/35 pointer-events-none"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {/* Error banner */}
                      {error && (
                        <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                          ⚠ {error}
                        </div>
                      )}

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={isLoading ? {} : { scale: 1.02 }}
                        whileTap={isLoading ? {} : { scale: 0.97 }}
                        className="mt-1 w-full py-4 rounded-xl bg-midnight-teal text-soft-linen font-sans text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-harvest-orange hover:text-midnight-teal transition-all duration-300 shadow-lg shadow-midnight-teal/20 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isLoading ? 'Sending…' : 'Get Started'}
                      </motion.button>

                      <p className="text-midnight-teal/35 font-sans text-[10px] text-center leading-relaxed">
                        We'll reach out with program details and next steps.
                      </p>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col items-center justify-center text-center h-full py-8"
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
                        className="text-midnight-teal text-3xl tracking-tight mb-3"
                        style={{ fontFamily: 'Vogun, serif' }}
                      >
                        You're all set!
                      </p>
                      <p className="text-midnight-teal/60 text-sm leading-relaxed max-w-xs mb-8">
                        Thanks, {form.firstName || 'friend'}! We'll be in touch with
                        everything you need to take your next step.
                      </p>

                      <button
                        onClick={handleReset}
                        className="px-8 py-3 rounded-full border border-midnight-teal/20 text-midnight-teal font-sans text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-midnight-teal hover:text-soft-linen transition-all duration-300"
                      >
                        Submit Another
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default DiscoverPurpose;
