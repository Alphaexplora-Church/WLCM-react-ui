import { motion } from 'framer-motion';
import { useState } from 'react';
import Navigation from '../../components/Navigation';

const DiscoverPurpose = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const programs = [
    {
      number: "01",
      title: "Pre-Encounter",
      description: "Begin your spiritual awakening with foundational teachings that prepare your heart for transformation. This intensive retreat experience sets the stage for encountering God's love and grace in a profound and personal way.",
      duration: "3-day Retreat"
    },
    {
      number: "02",
      title: "Counter Journey",
      description: "Deepen your relationship with Christ through post-encounter discipleship and mentorship. This ongoing journey helps you integrate your spiritual experience into daily life and grow alongside a community of believers.",
      duration: "Ongoing Program"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="bg-midnight-teal selection:bg-harvest-orange selection:text-soft-linen relative">
      <Navigation lightMode={false} />

      <main>
        <section className="py-24 md:py-48 bg-midnight-teal">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-24"
        >
          <span className="text-harvest-orange uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">Your Journey Awaits</span>
          <h2 className="text-5xl md:text-8xl text-soft-linen lowercase tracking-tighter mb-6" style={{ fontFamily: 'Vogun, serif' }}>discover purpose.</h2>
          <p className="text-soft-linen/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Step into a transformative spiritual journey designed to help you encounter God's purpose and grow deeper in your faith.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-24">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-soft-linen/10 rounded-2xl p-8 md:p-10 hover:border-harvest-orange/50 transition-colors duration-300 bg-midnight-teal/50 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-harvest-orange text-[10px] uppercase tracking-widest font-bold block mb-3">{program.number}</span>
                  <h3 className="text-3xl md:text-4xl text-soft-linen tracking-tight" style={{ fontFamily: 'Vogun, serif' }}>
                    {program.title}
                  </h3>
                </div>
              </div>
              
              <p className="text-soft-linen/70 text-sm md:text-base leading-relaxed mb-6">
                {program.description}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-soft-linen/10">
                <span className="text-soft-linen/40 text-xs uppercase tracking-widest font-semibold">
                  {program.duration}
                </span>
                <div className="w-6 h-6 rounded-full border border-harvest-orange/30 flex items-center justify-center">
                  <svg className="w-3 h-3 text-harvest-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sign-Up Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border border-soft-linen/10 rounded-2xl p-8 md:p-16 bg-midnight-teal/50 backdrop-blur-sm"
        >
          <div className="max-w-2xl">
            <h3 className="text-3xl md:text-4xl text-soft-linen mb-4 tracking-tight" style={{ fontFamily: 'Vogun, serif' }}>
              Ready to begin?
            </h3>
            <p className="text-soft-linen/60 text-base leading-relaxed mb-8">
              Sign up today to learn more about the Pre-Encounter and Counter Journey programs, and take your first step toward discovering God's purpose for your life.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 group relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-soft-linen/20 py-3 text-soft-linen focus:border-harvest-orange outline-none transition-all font-serif text-lg placeholder:text-soft-linen/20"
                  placeholder="Enter your email..."
                />
                <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-widest text-harvest-orange opacity-0 group-focus-within:opacity-100 transition-opacity">
                  Email Address
                </label>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-harvest-orange text-midnight-teal px-10 py-3 rounded-full font-bold uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-harvest-orange/20 whitespace-nowrap"
              >
                {isSubmitted ? 'Submitted!' : 'Get Started'}
              </motion.button>
            </form>

            <p className="text-soft-linen/30 font-sans text-xs mt-6 leading-loose italic">
              We'll send you details about both programs and help you find the right fit for your spiritual journey.
            </p>
          </div>
        </motion.div>
      </div>
        </section>
      </main>
    </div>
  );
};

export default DiscoverPurpose;
