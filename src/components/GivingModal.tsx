
import { motion, AnimatePresence } from 'framer-motion';

const GivingModal = ({ isOpen, fundName, onClose }: { isOpen: boolean, fundName: string, onClose: () => void }) => {
  const presets = ["$20", "$50", "$100", "Custom"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-midnight-teal/95 backdrop-blur-xl"
        >
          {/* Close Backdrop */}
          <div className="absolute inset-0" onClick={onClose} />
          
          <motion.div 
            initial={{ y: 50, scale: 0.95 }} 
            animate={{ y: 0, scale: 1 }} 
            exit={{ y: 50, scale: 0.95 }} 
            // Responsive layout: Col-to-Row transition and scroll safety
            className="bg-soft-linen text-midnight-teal w-full max-w-5xl rounded-[30px] md:rounded-[40px] relative z-10 shadow-2xl flex flex-col md:flex-row max-h-[92vh] overflow-y-auto md:overflow-hidden"
          >
            
            {/* LEFT: THE GIVING FORM */}
            <div className="flex-1 p-6 pt-20 md:p-16 flex flex-col justify-center">
              <span className="text-harvest-orange uppercase tracking-[0.4em] text-[9px] md:text-[10px] font-bold mb-4 block">
                Secure Giving
              </span>
              
              {/* Responsive Title: Scales from 4xl to 6xl based on device */}
              <h2 
                className="text-3xl sm:text-4xl md:text-6xl font-serif tracking-tighter mb-6 lowercase leading-tight" 
                style={{ fontFamily: 'Vogun, serif' }}
                >
                support <br/> {fundName}.
                </h2>
              
              <div className="grid grid-cols-2 gap-2 mb-8">
                {presets.map((p) => (
                  <button 
                    key={p} 
                    className="border border-midnight-teal/10 py-4 rounded-xl font-sans text-xs md:text-sm hover:bg-midnight-teal hover:text-soft-linen transition-all font-bold uppercase tracking-widest"
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button className="w-full bg-harvest-orange text-soft-linen py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg hover:scale-[1.02] transition-transform">
                Proceed to Secure Payment
              </button>
            </div>

            {/* RIGHT: THE IMPACT STORY (Magazine Style) */}
            <div className="bg-midnight-teal flex-1 p-8 md:p-16 text-soft-linen flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/5">
              <h4 className="font-serif text-2xl md:text-3xl mb-6 lowercase italic opacity-90">Your impact:</h4>
              
              {/* Responsive Body Text */}
              <p className="text-soft-linen/50 text-sm md:text-base leading-relaxed mb-10 font-sans max-w-sm">
                By supporting <strong className="text-soft-linen">{fundName}</strong>, you are directly fueling our ability to reach more lives and provide tangible hope to those who need it most.
              </p>
              
              <div className="space-y-6">
                {["Tax Deductible", "Secure Encryption"].map((text) => (
                  <div key={text} className="flex items-center gap-4 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">
                    <div className="w-8 h-[1px] bg-harvest-orange" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Responsive Close Button: Adapts color for visibility on light/dark bg */}
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 text-midnight-teal/20 md:text-soft-linen/20 hover:text-harvest-orange transition-colors p-2 z-50"
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

export default GivingModal;