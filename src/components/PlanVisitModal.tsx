import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlanVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PlanVisitModal = ({ isOpen, onClose }: PlanVisitModalProps) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', email: '', service: '', adults: '1', kids: '0', guestType: 'guest'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const expectations = [
    
    { title: "Kids", desc: "Check-in is fast and secure. We’ll have a host waiting to show you the way.", icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { title: "The Vibe", desc: "Coffee’s on us. Dress is 'come as you are.' Service lasts about 75 minutes.", icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-midnight-teal/95 backdrop-blur-xl"
        >
          {/* Backdrop Close */}
          <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

          <motion.div 
            initial={{ y: 50, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 50, scale: 0.95 }}
            className="bg-soft-linen text-midnight-teal w-full mx-auto max-w-2xl md:max-w-5xl rounded-2xl md:rounded-[40px] overflow-y-auto md:overflow-hidden relative z-10 shadow-2xl flex flex-col md:flex-row max-h-[95vh] md:max-h-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* LEFT SIDE: THE FORM/INFO */}
            <div className="flex-1 p-6 sm:p-8 md:p-16 flex flex-col justify-center relative min-h-auto md:min-h-[600px]">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div 
                    key="step1" 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <span className="text-harvest-orange uppercase tracking-[0.4em] text-[9px] sm:text-[10px] font-bold mb-2 sm:mb-4 block">Step 01</span>
                    <h2 className="text-2xl sm:text-3xl md:text-6xl font-serif tracking-tighter mb-4 sm:mb-8 lowercase leading-[0.9]" style={{ fontFamily: 'Vogun, serif' }}>
                      we’ll save <br className="hidden md:block"/> a seat.
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name */}
                      <div className="flex flex-col gap-1">
                        <label className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-midnight-teal/60">Name *</label>
                        <input
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-lg md:rounded-xl border border-midnight-teal/10 bg-white focus:outline-none focus:border-harvest-orange font-sans text-xs sm:text-sm text-midnight-teal placeholder:text-midnight-teal/30 transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1">
                        <label className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-midnight-teal/60">Email *</label>
                        <input
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-lg md:rounded-xl border border-midnight-teal/10 bg-white focus:outline-none focus:border-harvest-orange font-sans text-xs sm:text-sm text-midnight-teal placeholder:text-midnight-teal/30 transition-colors"
                        />
                      </div>

                      {/* Service */}
                      <div className="flex flex-col gap-1">
                        <label className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-midnight-teal/60">Preferred Service</label>
                        <select
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          className="w-full px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-lg md:rounded-xl border border-midnight-teal/10 bg-white focus:outline-none focus:border-harvest-orange font-sans text-xs sm:text-sm text-midnight-teal transition-colors appearance-none"
                        >
                          <option value="">Select a service</option>
                          <option value="sunday-10am">Sunday 10:00 AM — English</option>
                          <option value="sunday-2pm">Sunday 2:00 PM — Tagalog</option>
                        </select>
                      </div>

                      {/* Adults & Kids */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-midnight-teal/60">Adults</label>
                          <input
                            name="adults"
                            type="number"
                            min="1"
                            max="20"
                            value={form.adults}
                            onChange={handleChange}
                            className="w-full px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-lg md:rounded-xl border border-midnight-teal/10 bg-white focus:outline-none focus:border-harvest-orange font-sans text-xs sm:text-sm text-midnight-teal transition-colors"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-midnight-teal/60">Kids</label>
                          <input
                            name="kids"
                            type="number"
                            min="0"
                            max="20"
                            value={form.kids}
                            onChange={handleChange}
                            className="w-full px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-lg md:rounded-xl border border-midnight-teal/10 bg-white focus:outline-none focus:border-harvest-orange font-sans text-xs sm:text-sm text-midnight-teal transition-colors"
                          />
                        </div>
                      </div>

                      {/* Guest or Member */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-midnight-teal/60">I am a…</label>
                        <div className="flex gap-2 sm:gap-3">
                          {['guest', 'member'].map((type) => (
                            <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${form.guestType === type ? 'border-harvest-orange bg-harvest-orange' : 'border-midnight-teal/20 group-hover:border-harvest-orange/50'
                                }`}>
                                {form.guestType === type && <div className="w-2 h-2 bg-white rounded-full" />}
                              </div>
                              <input
                                type="radio"
                                name="guestType"
                                value={type}
                                checked={form.guestType === type}
                                onChange={handleChange}
                                className="sr-only"
                              />
                              <span className="font-sans text-xs sm:text-sm text-midnight-teal capitalize">{type === 'guest' ? 'First-time Guest' : 'Returning Member'}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-3 sm:mt-2 w-full py-3 sm:py-4 rounded-lg md:rounded-xl bg-harvest-orange text-midnight-teal font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-harvest-orange/90 transition-colors"
                      >
                        Continue to Guide
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="step2" 
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    className="text-center"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-harvest-orange/10 rounded-full flex items-center justify-center mx-auto mb-8">
                       <svg className="w-8 h-8 md:w-10 md:h-10 text-harvest-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                       </svg>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif tracking-tighter mb-4 lowercase leading-none" style={{ fontFamily: 'Vogun, serif' }}>See you soon.</h2>
                    <p className="text-midnight-teal/60 mb-10 text-sm md:text-base leading-relaxed italic max-w-xs mx-auto">
                      "A member of our Welcome Team will be looking out for you near the front doors."
                    </p>
                    <button 
                      onClick={onClose}
                      className="w-full border border-midnight-teal/10 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-midnight-teal hover:text-soft-linen transition-all"
                    >
                      Got it, Thanks
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT SIDE: WHAT TO EXPECT (Magazine Spread) */}
            <div className="bg-midnight-teal flex-1 p-6 sm:p-8 md:p-16 text-soft-linen flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/5">
              <span className="text-harvest-orange uppercase tracking-[0.4em] text-[8px] sm:text-[9px] font-bold mb-4 sm:mb-8 md:mb-12 block opacity-50">What to expect</span>
              <div className="space-y-4 sm:space-y-6 md:space-y-12">
                {expectations.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="flex gap-3 sm:gap-5 md:gap-8"
                  >
                    <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-2xl bg-white/5 flex items-center justify-center">
                       <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-harvest-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                       </svg>
                    </div>
                    <div>
                      <h4 className="font-serif text-sm sm:text-lg md:text-2xl mb-1 lowercase leading-tight">{item.title}</h4>
                      <p className="text-[10px] sm:text-[11px] md:text-xs text-soft-linen/40 leading-relaxed font-sans max-w-xs">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Close Button - Responsive color for mobile/desktop */}
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 md:top-8 md:right-8 text-midnight-teal md:text-soft-linen/20 hover:text-harvest-orange transition-colors z-50 p-2"
            >
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlanVisitModal;