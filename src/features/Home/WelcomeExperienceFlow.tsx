import React from 'react';
import { motion } from 'framer-motion';

/*
 * Stripped down to 3 short lines in a horizontal band.
 * No accordion — just 3 clean facts with a warm photo behind them.
 * Magazine: show, don't tell.
 */
const WelcomeExperienceFlow = () => {
    const steps = [
        {
            number: "01",
            label: "Hospitality Team",
            line: "They'll greet you at the door.",
        },
        {
            number: "02",
            label: "New Here Table",
            line: "Pick up a free Newcomer's Kit.",
        },
        {
            number: "03",
            label: "New Comer's Kit",
            line: "We'll prepare a personal welcome.",
        },
    ];

    return (
        <section className="relative bg-midnight-teal overflow-hidden">

            {/* Full-width photo band */}
            <div className="relative h-[50vw] md:h-[38vw] max-h-[480px] min-h-[280px]">
                <img
                    src="/events/random-10.jpg"
                    alt="Church community"
                    className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-midnight-teal/90 via-midnight-teal/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-teal via-transparent to-transparent" />

                {/* Overlaid headline */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="absolute left-6 md:left-14 lg:left-20 bottom-8 md:bottom-12"
                >
                    <h2
                        className="font-serif text-4xl md:text-6xl lg:text-7xl text-soft-linen lowercase tracking-tighter leading-[0.9]"
                        style={{ fontFamily: 'Vogun, serif' }}
                    >
                        Your first<br />Sunday.
                    </h2>
                </motion.div>
            </div>

            {/* 3-col step strip */}
            <div className="px-6 md:px-14 lg:px-20 py-10 md:py-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 border-t border-soft-linen/10">
                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col gap-2"
                    >
                        <span className="font-sans text-soft-linen/20 text-[10px] uppercase tracking-widest font-bold">{step.number}</span>
                        <h3 className="font-serif text-soft-linen text-xl md:text-2xl">{step.label}</h3>
                        <p className="font-sans text-soft-linen/50 text-sm leading-relaxed italic">{step.line}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WelcomeExperienceFlow;
