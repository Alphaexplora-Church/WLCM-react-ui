// const tabs: GivingTab[] = [
//   { id: 'gcash', label: 'GCash', icon: 'G' },
//   { id: 'bank', label: 'Bank Transfer', icon: 'B' },
//   { id: 'card', label: 'Credit / Debit', icon: 'C' },
// ];

const Donations = () => {
  // const [activeTab, setActiveTab] = useState('gcash');
  // const [amount, setAmount] = useState('');
  // const [customAmount, setCustomAmount] = useState('');
  // const [submitted, setSubmitted] = useState(false);
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');

  // const presets = ['₱100', '₱300', '₱500', '₱1,000', '₱2,500', 'Custom'];

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setSubmitted(true);
  // };

  return (
    <section id="give" className="py-24 md:py-32 bg-midnight-teal relative overflow-hidden">

      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #f5841a 0%, transparent 60%)' }} />

      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-harvest-orange uppercase tracking-[0.4em] text-[10px] font-bold mb-3 block">
            Give
          </span>
          <h2 className="text-4xl md:text-7xl text-soft-linen font-serif mb-5 lowercase tracking-tighter" style={{ fontFamily: 'Vogun, serif' }}>
            Your generosity<br /> fuels the mission.
          </h2>
          <p className="text-soft-linen/50 max-w-xl mx-auto font-sans text-sm md:text-base leading-relaxed">
            Every gift — big or small — is a seed sown into the lives of people who need hope, community, and truth. Thank you for giving.
          </p>
        </div>

        {/* Bank Transfer Section */}
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-8 rounded-2xl border border-soft-linen/10 bg-soft-linen/[0.03] flex flex-col gap-5">
            <div>
              <span className="text-harvest-orange font-sans text-[9px] uppercase tracking-[0.3em] font-bold block mb-4">Bank Transfer</span>
              <div className="space-y-4">
                {[
                  { bank: 'BDO', account: 'XXXX – XXXX – XXXX', name: 'Words of Life Christian Ministries' },
                  { bank: 'BPI', account: 'XXXX – XXXX – XX', name: 'Words of Life Christian Ministries' },
                ].map((acct) => (
                  <div key={acct.bank}>
                    <p className="font-serif text-xl text-soft-linen">{acct.bank} — {acct.account}</p>
                    <p className="font-sans text-soft-linen/50 text-sm">{acct.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-soft-linen/10 pt-4">
              <p className="font-sans text-soft-linen/50 text-sm leading-relaxed">
                Please email your deposit slip or transfer confirmation to <span className="text-harvest-orange">management@wordsoflife.ph</span> after sending.
              </p>
            </div>
          </div>

          {/* Impact callout */}
          <div className="p-5 rounded-xl border border-harvest-orange/20 bg-harvest-orange/5 mt-8">
            <p className="font-sans text-soft-linen/70 text-sm leading-relaxed italic">
              "Every gift helps us Know God, Find Freedom, Discover Purpose, and Make a Difference — together."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donations;