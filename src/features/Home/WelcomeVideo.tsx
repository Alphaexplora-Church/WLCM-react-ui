import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/* 
 * Full-width video section — magazine editorial.
 * Thumbnail fills the section, one headline overlay, 
 * play button front-and-center. Minimal copy.
 */
const WelcomeVideo = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="bg-soft-linen py-16 md:py-24 px-6 md:px-14 lg:px-20">

            {/* Section label */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8 md:mb-10"
            >
                <span className="w-8 h-[1px] bg-midnight-teal/20" />
                <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-midnight-teal/50 font-bold">
                    A word from our pastor
                </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-serif text-4xl md:text-6xl lg:text-7xl text-midnight-teal lowercase tracking-tighter leading-[0.9] mb-10 md:mb-12 max-w-xl"
                style={{ fontFamily: 'Vogun, serif' }}
            >
                See what<br />awaits you.
            </motion.h2>

            {/* Video thumbnail — full-width, click to play */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                onClick={() => !isPlaying && setIsPlaying(true)}
                className={`relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden max-w-5xl transition-all ${!isPlaying ? 'cursor-pointer group' : ''}`}
            >
                {!isPlaying ? (
                    <>
                        <img
                            src="https://img.youtube.com/vi/_sknSyZAgQs/maxresdefault.jpg"
                            alt="Watch our welcome video"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-midnight-teal/40 group-hover:bg-midnight-teal/30 transition-colors duration-300" />

                        {/* Play button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-soft-linen flex items-center justify-center shadow-2xl"
                            >
                                <svg className="w-6 h-6 md:w-8 md:h-8 text-midnight-teal translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </motion.div>
                        </div>

                        {/* Label overlay */}
                        <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8">
                            <p className="font-sans text-soft-linen/70 text-[9px] uppercase tracking-[0.3em] font-bold">Click to watch</p>
                            <p className="font-serif text-soft-linen text-lg md:text-2xl mt-1">
                                Sr. Pastor Josef Zabarte
                            </p>
                        </div>
                    </>
                ) : (
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/_sknSyZAgQs?si=tTvbdx8ZifY2Zy9U&start=2255"
                        title="Welcome Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}
            </motion.div>

            {/* CTA row */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex gap-4 mt-8 md:mt-10"
            >
                <Link
                    to="/watch"
                    className="font-sans text-[11px] uppercase tracking-[0.25em] font-bold text-midnight-teal hover:text-harvest-orange transition-colors flex items-center gap-2"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-harvest-orange animate-pulse" />
                    Watch Live Sunday
                </Link>
            </motion.div>
        </section>
    );
};

export default WelcomeVideo;
