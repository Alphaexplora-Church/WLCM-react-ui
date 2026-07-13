import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PlanVisitModal from '../../components/PlanVisitModal';

const FooterCTA = () => {
    const [isPlanVisitOpen, setIsPlanVisitOpen] = useState(false);

    return (
        <>
            <section className="relative overflow-hidden h-[60vw] md:h-[50vw] max-h-[600px] min-h-[320px] flex items-end">

                {/* Background photo */}
                <img
                    src="/events/crowd-2.jpg"
                    alt="Church community"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-teal via-midnight-teal/60 to-midnight-teal/10" />

                {/* Content */}
                <div className="relative z-10 w-full px-6 md:px-14 lg:px-20 pb-12 md:pb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-serif text-4xl md:text-6xl lg:text-7xl text-soft-linen lowercase tracking-tighter leading-[0.9]"
                        style={{ fontFamily: 'Vogun, serif' }}
                    >
                        What's<br />next?
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="flex flex-col sm:flex-row gap-3"
                    >
                        <button
                            onClick={() => setIsPlanVisitOpen(true)}
                            className="px-8 py-4 rounded-full bg-harvest-orange text-midnight-teal font-sans text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-harvest-orange/90 active:scale-95 transition-all text-center"
                        >
                            Plan a Visit
                        </button>
                        <Link
                            to="/discover-purpose"
                            className="px-8 py-4 rounded-full border border-soft-linen/30 text-soft-linen font-sans text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-soft-linen/10 active:scale-95 transition-all text-center"
                        >
                            Discover Purpose
                        </Link>
                    </motion.div>
                </div>
            </section>

            <PlanVisitModal isOpen={isPlanVisitOpen} onClose={() => setIsPlanVisitOpen(false)} />
        </>
    );
};

export default FooterCTA;
