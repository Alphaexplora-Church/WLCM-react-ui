import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';

// ── Helpers ──────────────────────────────────────────────────────────────────
function getNextStream() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0=Sun
    const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
    const thisSunday = new Date(now)
    thisSunday.setDate(now.getDate() + daysUntilSunday);

    const eng = new Date(thisSunday);
    eng.setHours(10, 0, 0, 0);
    const tag = new Date(thisSunday);
    tag.setHours(14, 0, 0, 0);

    if (now < eng) return { label: '10:00 AM — English', target: eng };
    if (now < tag) return { label: '2:00 PM — Tagalog', target: tag };

    // Both passed — next Sunday English
    const nextSunday = new Date(thisSunday);
    nextSunday.setDate(thisSunday.getDate() + 7);
    nextSunday.setHours(10, 0, 0, 0);
    return { label: '10:00 AM — English', target: nextSunday };
}

function useCountdown(target: Date) {
    const [diff, setDiff] = useState(target.getTime() - Date.now());
    useEffect(() => {
        const id = setInterval(() => setDiff(target.getTime() - Date.now()), 1000);
        return () => clearInterval(id);
    }, [target]);
    const total = Math.max(0, diff);
    const d = Math.floor(total / 86400000);
    const h = Math.floor((total % 86400000) / 3600000);
    const m = Math.floor((total % 3600000) / 60000);
    const s = Math.floor((total % 60000) / 1000);
    return { d, h, m, s };
}


// ── Component ────────────────────────────────────────────────────────────────
const Watch = () => {
    const [isLive, setIsLive] = useState(false);

    const next = getNextStream();
    const { d, h, m, s } = useCountdown(next.target);


    // ── Check if currently within service hours ────────────────────────────
    useEffect(() => {
        const checkServiceTime = () => {
            const now = new Date();
            const dayOfWeek = now.getDay(); // 0=Sun
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const currentTime = hours * 60 + minutes; // Convert to minutes

            // Service times (in minutes from midnight):
            // 10:00 AM = 600 minutes
            // 2:00 PM = 840 minutes
            // Buffer: 30 minutes before and 120 minutes after each service
            const eng10am = 600; // 10:00 AM
            const tag2pm = 840; // 2:00 PM
            const buffer_before = 10;
            const buffer_after = 150;

            // Check if it's Sunday and within service hours (with buffer)
            const withinEng = dayOfWeek === 0 && currentTime >= (eng10am - buffer_before) && currentTime <= (eng10am + buffer_after);
            const withinTag = dayOfWeek === 0 && currentTime >= (tag2pm - buffer_before) && currentTime <= (tag2pm + buffer_after);

            setIsLive(withinEng || withinTag);
        };

        // Check immediately
        checkServiceTime();

        // Check every minute for time changes
        const interval = setInterval(checkServiceTime, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-midnight-teal min-h-screen text-soft-linen selection:bg-harvest-orange selection:text-midnight-teal">
            <Navigation lightMode={false} />

            {/* ── WATCH LIVE ────────────────────────────────────────────────────── */}
            <section className="pt-36 md:pt-44 pb-20 md:pb-32 px-4 md:px-6">
                <div className="max-w-5xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-12"
                    >
                        <span className="text-harvest-orange uppercase tracking-[0.4em] text-[10px] font-bold block mb-3">Live Stream</span>
                        <h1 className="font-serif text-5xl md:text-7xl tracking-tighter lowercase"
                            style={{ fontFamily: 'Vogun, serif' }}>
                            Watch Live
                        </h1>
                    </motion.div>

                    {/* Show embed when LIVE, show countdown when OFFLINE */}
                    {isLive ? (
                        // ── LIVE EMBED ──────────────────────────────────────────
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="mb-12"
                        >
                            <div className="relative w-full rounded-2xl overflow-hidden bg-black/20 border border-soft-linen/10">
                                <div className="aspect-video">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src="https://www.youtube.com/embed/live_stream?channel=UCP34NqLt4D8Zh3jPXDsdxRw&autoplay=0"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Church Live Stream"
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        // ── COUNTDOWN & OFFLINE UI ──────────────────────────────
                        <>
                            {/* Two service buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                                {[
                                    { time: '10:00 AM', lang: 'English' },
                                    { time: '2:00 PM', lang: 'Tagalog' }
                                ].map((svc) => (
                                    <div key={svc.lang} className="flex items-center justify-between px-6 py-4 rounded-2xl border border-soft-linen/10 bg-soft-linen/[0.03]">
                                        <div>
                                            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-harvest-orange font-bold block">{svc.lang}</span>
                                            <span className="font-serif text-2xl">{svc.time} Service</span>
                                        </div>
                                        <div className="px-4 py-1.5 rounded-full border border-soft-linen/20 font-sans text-[10px] uppercase tracking-widest text-soft-linen/50">
                                            Upcoming
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Countdown */}
                            <div className="text-center mb-10">
                                <p className="font-sans text-soft-linen/50 text-sm uppercase tracking-widest mb-4">
                                    Next stream: <span className="text-harvest-orange">{next.label}</span>
                                </p>
                                <div className="flex items-center justify-center gap-4 md:gap-8">
                                    {[
                                        { val: d, label: 'Days' },
                                        { val: h, label: 'Hours' },
                                        { val: m, label: 'Min' },
                                        { val: s, label: 'Sec' },
                                    ].map(({ val, label }) => (
                                        <div key={label} className="flex flex-col items-center">
                                            <AnimatePresence mode="wait">
                                                <motion.span
                                                    key={val}
                                                    initial={{ y: -10, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    exit={{ y: 10, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="font-serif text-4xl md:text-6xl"
                                                >
                                                    {String(val).padStart(2, '0')}
                                                </motion.span>
                                            </AnimatePresence>
                                            <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-soft-linen/40 mt-1">{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Watch Live button (inactive until live) */}
                            <div className="flex justify-center mb-12">
                                <button
                                    disabled
                                    className="px-12 py-4 rounded-full border border-soft-linen/20 text-soft-linen/40 font-sans text-[11px] uppercase tracking-[0.3em] font-bold cursor-not-allowed"
                                >
                                    Stream Starts Soon
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* ── PREVIOUS MESSAGES ─────────────────────────────────────────────── */}

        </div>
    );
};

export default Watch;
