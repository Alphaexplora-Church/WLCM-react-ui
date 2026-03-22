import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { useInView } from 'framer-motion';

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
        <section id="contact" className="bg-soft-linen py-20 md:py-32 px-6 md:px-24 border-t border-midnight-teal/10">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
            <div>
              <span className="text-harvest-orange uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">Get in Touch</span>
              <h2 className="font-serif text-4xl md:text-6xl text-midnight-teal lowercase tracking-tight mb-8">Contact Us</h2>
              <div className="flex flex-col gap-5">
                {[
                  { label: "Management", email: "management@wordsoflife.ph" },
                  { label: "Membership", email: "membership@wordsoflife.ph" },
                  { label: "Ministries", email: "ministries@wordsoflife.ph" },
                ].map((c) => (
                  <a key={c.email} href={`mailto:${c.email}`} className="group flex flex-col gap-0.5">
                    <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-midnight-teal/40 font-bold">{c.label}</span>
                    <span className="font-serif text-xl text-midnight-teal group-hover:text-harvest-orange transition-colors">{c.email}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <span className="text-harvest-orange uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">Follow Us</span>
              <h2 className="font-serif text-4xl md:text-6xl text-midnight-teal lowercase tracking-tight mb-8">Social Media</h2>
              <div className="flex flex-col gap-5">
                {[
                  { label: "Facebook", url: "https://www.facebook.com/WLCMMain", icon: "FB" },
                  { label: "Instagram", url: "https://www.instagram.com/wlcmmain/", icon: "IG" },
                  { label: "YouTube", url: "https://www.youtube.com/@WLCMMain", icon: "YT" },
                ].map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-midnight-teal/15 flex items-center justify-center group-hover:border-harvest-orange group-hover:bg-harvest-orange transition-all duration-300">
                      <span className="font-sans text-[9px] font-bold text-midnight-teal group-hover:text-white transition-colors uppercase">{s.icon}</span>
                    </div>
                    <span className="font-serif text-xl text-midnight-teal group-hover:text-harvest-orange transition-colors">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}