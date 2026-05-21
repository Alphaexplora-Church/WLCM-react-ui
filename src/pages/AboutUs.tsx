import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { useInView, motion } from 'framer-motion';

// IMPORTS
import Navigation from '../components/Navigation';
import Manifesto from '../features/About/Manifesto';
import LeadershipSection from '../features/About/LeadershipSection';
import DaughterChurchesSection from '../features/About/DaughterChurchesSection'; // <-- NEW

export default function AboutUs() {
  const location = useLocation();
  const beliefsRef = useRef(null);

  const isDarkSectionVisible = useInView(beliefsRef, { margin: "-10% 0px -90% 0px" });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          lenis.scrollTo(target as HTMLElement, { offset: -80 });
        }
      }
    };

    handleHashScroll();

    return () => {
      lenis.destroy();
    };
  }, [location.hash]);

  return (
    <div className="bg-soft-linen min-h-screen w-full selection:bg-midnight-teal selection:text-soft-linen overflow-x-hidden">

      <Navigation lightMode={!isDarkSectionVisible} />

      <main className="flex flex-col">
        <div id="manifesto">
          <Manifesto />
        </div>

        <div id="history">
          {/* <HistorySection /> */}
        </div>

        <div id="leaders">
          <LeadershipSection />
        </div>

        <div id="churches">
          <DaughterChurchesSection />
        </div>

        <div id="beliefs" ref={beliefsRef} className="bg-deep-teal">
          {/* <BeliefsSection /> */}
        </div>

        {/* Contact & Social */}
        <section id="contact" className="bg-soft-linen py-14 md:py-20 px-6 md:px-24 border-t border-midnight-teal/10 overflow-hidden">

          {/* Section Header */}
          <div className="max-w-5xl mx-auto mb-8 md:mb-10">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-harvest-orange uppercase tracking-[0.4em] text-[10px] font-bold mb-3 block"
            >
              Connect With Us
            </motion.span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-serif text-3xl md:text-5xl text-midnight-teal lowercase tracking-tight leading-[0.9]"
              >
                Contact us.
              </motion.h2>
            </div>
          </div>

          {/* Grid */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

            {/* Contact */}
            <div>
              <span className="font-sans text-[9px] uppercase tracking-[0.35em] text-midnight-teal/35 font-bold mb-4 block">
                Email Directories
              </span>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Management", email: "management@wordsoflife.ph" },
                  { label: "Membership", email: "membership@wordsoflife.ph" },
                  { label: "Ministries", email: "ministries@wordsoflife.ph" },
                ].map((c, i) => (
                  <motion.a
                    key={c.email}
                    href={`mailto:${c.email}`}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="group flex items-center gap-3 p-3 rounded-xl border border-midnight-teal/8 hover:border-harvest-orange/40 hover:bg-harvest-orange/4 transition-all duration-300"
                  >
                    {/* Mail icon */}
                    <div className="shrink-0 w-7 h-7 rounded-lg bg-midnight-teal/6 flex items-center justify-center group-hover:bg-harvest-orange/12 transition-colors duration-300">
                      <svg className="w-3.5 h-3.5 text-midnight-teal/40 group-hover:text-harvest-orange transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="3" />
                        <polyline points="2,4 12,13 22,4" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-midnight-teal/35 font-bold">{c.label}</span>
                      <span className="font-serif text-sm md:text-base text-midnight-teal group-hover:text-harvest-orange transition-colors duration-300 truncate">{c.email}</span>
                    </div>
                    {/* Arrow */}
                    <svg className="w-4 h-4 text-midnight-teal/20 group-hover:text-harvest-orange group-hover:translate-x-1 transition-all duration-300 ml-auto shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <span className="font-sans text-[9px] uppercase tracking-[0.35em] text-midnight-teal/35 font-bold mb-4 block">
                Social Channels
              </span>
              <div className="flex flex-col gap-2">
                {[
                  {
                    label: "Facebook",
                    handle: "@WLCMMain",
                    url: "https://www.facebook.com/WLCMMain",
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Instagram",
                    handle: "@wlcmmain",
                    url: "https://www.instagram.com/wlcmmain/",
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                      </svg>
                    ),
                  },
                  {
                    label: "YouTube",
                    handle: "@WLCMMain",
                    url: "https://www.youtube.com/@WLCMMain",
                    icon: (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                        <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="white" />
                      </svg>
                    ),
                  },
                ].map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="group flex items-center gap-3 p-3 rounded-xl border border-midnight-teal/8 hover:border-harvest-orange/40 hover:bg-harvest-orange/4 transition-all duration-300"
                  >
                    <div className="shrink-0 w-7 h-7 rounded-lg bg-midnight-teal/6 flex items-center justify-center text-midnight-teal/40 group-hover:bg-harvest-orange group-hover:text-white transition-all duration-300">
                      {s.icon}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-midnight-teal/35 font-bold">{s.handle}</span>
                      <span className="font-serif text-sm md:text-base text-midnight-teal group-hover:text-harvest-orange transition-colors duration-300">{s.label}</span>
                    </div>
                    <svg className="w-4 h-4 text-midnight-teal/20 group-hover:text-harvest-orange group-hover:translate-x-1 transition-all duration-300 ml-auto shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>

    </div>
  );
}