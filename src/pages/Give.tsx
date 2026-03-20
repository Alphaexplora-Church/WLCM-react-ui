import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import PlanVisitModal from '../components/PlanVisitModal';
import Donations from '../features/Engage/Donations';

const Give = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-midnight-teal min-h-screen selection:bg-soft-linen selection:text-midnight-teal relative overflow-x-hidden">
      <Navigation lightMode={false} />

      <div id="give" className="relative pt-24 md:pt-28">
        <Donations />
      </div>

      {/* --- WATERMARK --- */}
      <div className="fixed bottom-[5%] right-[5%] z-0 pointer-events-none select-none opacity-[0.02]">
        <h1 className="text-[25vw] font-serif leading-none tracking-tighter" style={{ fontFamily: 'Vogun, serif' }}>
          WLCM
        </h1>
      </div>

      <PlanVisitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Give;
