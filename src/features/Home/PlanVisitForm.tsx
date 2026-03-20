import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
    name: string;
    email: string;
    service: string;
    adults: string;
    kids: string;
    guestType: string;
}

const PlanVisitForm = () => {
    const [form, setForm] = useState<FormData>({
        name: '', email: '', service: '', adults: '1', kids: '0', guestType: 'guest'
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section id="plan-visit" className="py-16 md:py-32 px-4 md:px-6 bg-soft-linen relative overflow-hidden">
            <div className="max-w-2xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 md:mb-14"
                >
                    <span className="text-harvest-orange uppercase tracking-[0.4em] text-[10px] font-bold block mb-3">
                        We're Expecting You
                    </span>
                    <h2 className="font-serif text-4xl md:text-6xl text-midnight-teal tracking-tighter lowercase"
                        style={{ fontFamily: 'Vogun, serif' }}>
                        Plan a Visit
                    </h2>
                    <p className="font-sans text-midnight-teal/50 text-sm mt-3 leading-relaxed italic">
                        Let us know you're coming — we'll make sure you're expected.
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!submitted ? (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-5"
                        >
                            {/* Name */}
                            <div className="flex flex-col gap-1.5">
                                <label className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-midnight-teal/60">Name *</label>
                                <input
                                    name="name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your full name"
                                    className="w-full px-5 py-3.5 rounded-xl border border-midnight-teal/10 bg-white focus:outline-none focus:border-harvest-orange font-sans text-sm text-midnight-teal placeholder:text-midnight-teal/30 transition-colors"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-1.5">
                                <label className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-midnight-teal/60">Email *</label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    className="w-full px-5 py-3.5 rounded-xl border border-midnight-teal/10 bg-white focus:outline-none focus:border-harvest-orange font-sans text-sm text-midnight-teal placeholder:text-midnight-teal/30 transition-colors"
                                />
                            </div>

                            {/* Service */}
                            <div className="flex flex-col gap-1.5">
                                <label className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-midnight-teal/60">Preferred Service</label>
                                <select
                                    name="service"
                                    value={form.service}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3.5 rounded-xl border border-midnight-teal/10 bg-white focus:outline-none focus:border-harvest-orange font-sans text-sm text-midnight-teal transition-colors appearance-none"
                                >
                                    <option value="">Select a service</option>
                                    <option value="sunday-10am">Sunday 10:00 AM — English</option>
                                    <option value="sunday-2pm">Sunday 2:00 PM — Tagalog</option>
                                </select>
                            </div>

                            {/* Adults & Kids */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-midnight-teal/60">Adults</label>
                                    <input
                                        name="adults"
                                        type="number"
                                        min="1"
                                        max="20"
                                        value={form.adults}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3.5 rounded-xl border border-midnight-teal/10 bg-white focus:outline-none focus:border-harvest-orange font-sans text-sm text-midnight-teal transition-colors"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-midnight-teal/60">Kids</label>
                                    <input
                                        name="kids"
                                        type="number"
                                        min="0"
                                        max="20"
                                        value={form.kids}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3.5 rounded-xl border border-midnight-teal/10 bg-white focus:outline-none focus:border-harvest-orange font-sans text-sm text-midnight-teal transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Guest or Member */}
                            <div className="flex flex-col gap-2.5">
                                <label className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-midnight-teal/60">I am a…</label>
                                <div className="flex gap-3">
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
                                            <span className="font-sans text-sm text-midnight-teal capitalize">{type === 'guest' ? 'First-time Guest' : 'Returning Member'}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="mt-2 w-full py-4 rounded-xl bg-harvest-orange text-midnight-teal font-sans text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-harvest-orange/90 transition-colors"
                            >
                                Reserve My Visit
                            </motion.button>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="confirm"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12 px-6 bg-white rounded-2xl border border-harvest-orange/20 shadow-xl"
                        >
                            <div className="w-16 h-16 bg-harvest-orange/10 rounded-full flex items-center justify-center mx-auto mb-5">
                                <svg className="w-8 h-8 text-harvest-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="font-serif text-3xl text-midnight-teal mb-2">You're all set!</h3>
                            <p className="font-sans text-midnight-teal/60 text-sm leading-relaxed mb-8">
                                We're looking forward to meeting you, {form.name.split(' ')[0] || 'friend'}! Check your inbox for a confirmation email with directions and more info.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
                                <a
                                    href="https://calendar.google.com/calendar/r/eventedit?text=WLCM+Sunday+Service&details=My+first+visit+to+Words+of+Life+Christian+Ministries&location=Greenhills,+San+Juan,+Metro+Manila&recur=RRULE:FREQ%3DWEEKLY;BYDAY%3DSU"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-2.5 rounded-full bg-harvest-orange text-midnight-teal font-sans text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-harvest-orange/90 transition-colors"
                                >
                                    Add to Calendar
                                </a>
                                <a
                                    href="https://maps.google.com/?q=Greenhills+San+Juan+Manila"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-2.5 rounded-full bg-midnight-teal text-soft-linen font-sans text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-midnight-teal/80 transition-colors"
                                >
                                    Get Directions
                                </a>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="px-6 py-2.5 rounded-full border border-midnight-teal/20 text-midnight-teal font-sans text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-midnight-teal/5 transition-colors"
                                >
                                    Submit Another
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
};

export default PlanVisitForm;
