import { motion } from 'framer-motion';

/* 
 * Magazine-style photo grid. 
 * Left: one large editorial portrait. Right: two stacked images with single taglines.
 * No icon cards. No paragraphs. Just photos + 1-line sentiments.
 */
const photos = [
  {
    src: "/events/random-5.jpg",
    alt: "People in community",
    caption: "You belong here.",
    size: "tall", // col-span-1, row-span-2
  },
  {
    src: "/events/random-3.jpg",
    alt: "Friends laughing",
    caption: "Real friendships await.",
    size: "regular",
  },
  {
    src: "/events/passover-3.jpg",
    alt: "Helping hands",
    caption: "A love that changes lives.",
    size: "regular",
  },
];

const WelcomeGrid = () => {
  return (
    <section className="bg-soft-linen relative z-10 pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden">

      {/* Section eyebrow */}
      <div className="px-6 md:px-14 lg:px-20 mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-5xl md:text-7xl lg:text-[8vw] text-midnight-teal lowercase tracking-tighter leading-[0.9]"
          style={{ fontFamily: 'Vogun, serif' }}
        >
          Come as<br />you are.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-sans text-midnight-teal/50 text-sm md:text-base max-w-xs leading-relaxed italic font-light"
        >
          No perfect people. No dress code. Just a God who loves you and a family ready to welcome you.
        </motion.p>
      </div>

      {/* Photo grid */}
      <div className="px-6 md:px-14 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-7xl mx-auto">

          {/* LEFT: tall portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative md:row-span-2 h-[50vw] md:h-auto min-h-[340px] rounded-2xl md:rounded-3xl overflow-hidden group"
          >
            <img
              src={photos[0].src}
              alt={photos[0].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-teal/70 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 font-serif text-soft-linen text-2xl md:text-3xl leading-tight">
              {photos[0].caption}
            </p>
          </motion.div>

          {/* RIGHT: two stacked */}
          {[photos[1], photos[2]].map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 * (i + 1) }}
              className="relative h-[42vw] md:h-[22vw] min-h-[200px] rounded-2xl md:rounded-3xl overflow-hidden group"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-teal/60 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 font-serif text-soft-linen text-xl md:text-2xl">
                {photo.caption}
              </p>
            </motion.div>
          ))}

        </div>
      </div>

      {/* 4 one-line reassurances — horizontal strip, pure editorial */}
      <div className="mt-12 md:mt-16 border-t border-b border-midnight-teal/10 mx-6 md:mx-14 lg:mx-20">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x-0 md:divide-x divide-midnight-teal/10">
          {[
            { icon: "✦", text: "Come as you are" },
            { icon: "✦", text: "Kids & youth programs" },
            { icon: "✦", text: "Welcome team at the door" },
            { icon: "✦", text: "Friendly & safe" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-2.5 py-4 md:py-5 px-0 md:px-6 border-b md:border-b-0 border-midnight-teal/10"
            >
              <span className="text-harvest-orange text-[10px]">{item.icon}</span>
              <span className="font-sans text-[11px] md:text-xs text-midnight-teal/60 uppercase tracking-[0.2em] font-bold">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default WelcomeGrid;