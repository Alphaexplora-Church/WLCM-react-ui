import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type GivingCategory = 'mission' | 'tech';

const GIVING_CARDS = [
  {
    id: 'mission' as GivingCategory,
    eyebrow: 'Church Giving',
    title: 'Support the Mission',
    description:
      'Your gift directly funds outreach, discipleship, and the everyday ministry of Words of Life — helping people Know God, Find Freedom, Discover Purpose, and Make a Difference.',
    cta: 'Give Now',
    qrPath: '/qr/mission-giving.png',
    qrLabel: 'Scan to give to the church mission',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: 'tech' as GivingCategory,
    eyebrow: 'Tech & Digital',
    title: 'Fuel the Tech Team',
    description:
      'Help keep the digital infrastructure of the church running — from the website and livestream to tools that connect our community online. Every contribution powers the platform.',
    cta: 'Support Us',
    qrPath: '/qr/tech-giving.png',
    qrLabel: 'Scan to support the tech team',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
];

const QRModal = ({
  card,
  onClose,
}: {
  card: (typeof GIVING_CARDS)[number];
  onClose: () => void;
}) => (
  <motion.div
    key="overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center px-5"
    onClick={onClose}
  >
    <div className="absolute inset-0 bg-midnight-teal/80 backdrop-blur-sm" />

    <motion.div
      key="modal"
      initial={{ opacity: 0, scale: 0.95, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 16 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={(e) => e.stopPropagation()}
      className="relative z-10 w-full max-w-sm bg-[#00222b] border border-soft-linen/10 rounded-2xl overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-harvest-orange/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative p-7 flex flex-col items-center gap-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-soft-linen/10 flex items-center justify-center text-soft-linen/40 hover:text-soft-linen hover:border-soft-linen/30 transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center pt-1">
          <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-harvest-orange font-bold block mb-1">
            {card.eyebrow}
          </span>
          <h3 className="font-serif text-2xl text-soft-linen tracking-tight">{card.title}</h3>
        </div>

        <div className="w-48 h-48 rounded-xl bg-soft-linen flex items-center justify-center overflow-hidden">
          <img
            src={card.qrPath}
            alt={`QR code — ${card.title}`}
            className="w-full h-full object-contain"
            onError={(e) => {
              const el = e.currentTarget;
              el.style.display = 'none';
              const parent = el.parentElement;
              if (parent) {
                const placeholder = parent.querySelector('.qr-fallback') as HTMLElement;
                if (placeholder) placeholder.style.display = 'flex';
              }
            }}
          />
          <span className="qr-fallback hidden flex-col items-center justify-center font-sans text-[10px] uppercase tracking-widest text-midnight-teal/40 text-center px-4 gap-1">
            QR Code<br />Coming Soon
          </span>
        </div>

        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-soft-linen/40 text-center">
          {card.qrLabel}
        </p>

        <div className="w-full border-t border-soft-linen/8 pt-4 text-center">
          <p className="font-sans text-soft-linen/50 text-sm leading-relaxed">
            Thank you for supporting{' '}
            <span className="text-harvest-orange font-semibold">{card.title}</span>.
            Your generosity makes a real difference.
          </p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Donations = () => {
  const [activeCard, setActiveCard] = useState<GivingCategory>('mission');
  const [activeModal, setActiveModal] = useState<GivingCategory | null>(null);
  const modalCard = GIVING_CARDS.find((c) => c.id === activeModal) ?? null;

  return (
    <section id="give" className="py-10 md:pt-32 md:pb-10 bg-midnight-teal relative overflow-hidden">

      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #f5841a 0%, transparent 60%)' }}
      />

      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <span className="text-harvest-orange uppercase tracking-[0.4em] text-[10px] font-bold mb-3 block">
            Give
          </span>
          <h2
            className="text-4xl md:text-7xl text-soft-linen font-serif mb-5 lowercase tracking-tighter"
            style={{ fontFamily: 'Vogun, serif' }}
          >
            Your generosity<br /> fuels the mission.
          </h2>
          <p className="text-soft-linen/50 max-w-xl mx-auto font-sans text-sm md:text-base leading-relaxed">
            Every gift — big or small — is a seed sown into the lives of people who need hope, community, and truth. Thank you for giving.
          </p>
        </div>

        {/* Accordion cards */}
        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {GIVING_CARDS.map((card) => {
            const isOpen = activeCard === card.id;
            const isMission = card.id === 'mission';

            return (
              <motion.div
                key={card.id}
                layout
                onClick={() => setActiveCard(card.id)}
                className={`
                  relative rounded-2xl border cursor-pointer overflow-hidden transition-colors duration-300
                  ${isOpen
                    ? isMission
                      ? 'border-harvest-orange/40 bg-harvest-orange/5'
                      : 'border-soft-linen/20 bg-soft-linen/[0.04]'
                    : 'border-soft-linen/10 bg-soft-linen/[0.02] hover:border-soft-linen/20'
                  }
                `}
              >
                {/* Active glow */}
                {isOpen && isMission && (
                  <div className="absolute inset-0 bg-gradient-to-br from-harvest-orange/10 via-transparent to-transparent pointer-events-none" />
                )}

                {/* Header row — always visible */}
                <div className="relative flex items-center gap-4 px-6 py-5">
                  <div className={`
                    shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300
                    ${isOpen && isMission ? 'bg-harvest-orange text-midnight-teal' : 'bg-soft-linen/8 text-soft-linen/50'}
                  `}>
                    {card.icon}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className={`font-sans text-[9px] uppercase tracking-[0.35em] font-bold transition-colors duration-300 ${isOpen && isMission ? 'text-harvest-orange' : 'text-soft-linen/30'}`}>
                      {card.eyebrow}
                    </span>
                    <span className={`font-serif text-lg md:text-xl tracking-tight transition-colors duration-300 ${isOpen ? 'text-soft-linen' : 'text-soft-linen/60'}`}>
                      {card.title}
                    </span>
                  </div>

                  {/* Chevron */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="ml-auto shrink-0 text-soft-linen/30"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </motion.div>
                </div>

                {/* Expandable body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.35, ease: 'easeInOut', delay: 0.05 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 flex flex-col gap-4 border-t border-soft-linen/8 pt-4">
                        <p className="font-sans text-soft-linen/60 text-sm leading-relaxed">
                          {card.description}
                        </p>

                        <button
                          onClick={(e) => { e.stopPropagation(); setActiveModal(card.id); }}
                          className={`
                            self-start flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300
                            ${isMission
                              ? 'bg-harvest-orange text-midnight-teal hover:bg-harvest-orange/90'
                              : 'border border-harvest-orange/50 text-harvest-orange hover:bg-harvest-orange hover:text-midnight-teal'
                            }
                          `}
                        >
                          {card.cta}
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Impact callout */}
        <div className="p-5 rounded-xl border border-harvest-orange/20 bg-harvest-orange/5 mt-8 max-w-2xl mx-auto">
          <p className="font-sans text-soft-linen/70 text-sm leading-relaxed italic text-center">
            "Every gift helps us Know God, Find Freedom, Discover Purpose, and Make a Difference — together."
          </p>
        </div>
      </div>

      {/* QR Modal */}
      <AnimatePresence>
        {modalCard && (
          <QRModal card={modalCard} onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Donations;
