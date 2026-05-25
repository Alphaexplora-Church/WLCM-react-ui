import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useEventsViewModel } from './useEventsViewModel';

const Events = () => {
  const { events, announcements, isLoading, error } = useEventsViewModel();
  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const announcementVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // --- DATA is now fetched via useEventsViewModel ---

  return (
    <section className="py-24 px-4 md:px-6 bg-[#002E38] relative overflow-hidden">

      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#F5841A] font-sans text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
            Weekly Program
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-[#E6EDEF]">
            upcoming events
          </h2>
        </motion.div>

        {/* --- EVENTS LIST (Zig-Zag) --- */}
        {isLoading ? (
          <div className="flex flex-col gap-8 mb-32 items-center justify-center w-full h-48 md:h-56 bg-[#E6EDEF]/5 rounded-2xl border border-[#E6EDEF]/10 animate-pulse">
            <span className="text-[#E6EDEF]/70 text-lg">Loading events...</span>
          </div>
        ) : error ? (
          <div className="text-center text-[#F5841A] py-12 text-lg mb-32">{error}</div>
        ) : events.length === 0 ? (
          <div className="text-center text-[#E6EDEF]/70 py-12 text-lg mb-32">No upcoming events.</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-8 mb-32"
          >
            {events.map((event, i) => {
              const align = i % 2 === 0 ? 'right' : 'left';
              const color = i % 2 === 0 ? 'orange' : 'teal';
              const bgImage = event.media && event.media.length > 0
                ? event.media[0].file_url
                : 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2000&auto=format&fit=crop';

              return (
                <motion.div
                  key={event.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.01 }}
                  className={`relative h-48 md:h-56 rounded-2xl overflow-hidden flex ${align === 'left' ? 'flex-row' : 'flex-row-reverse'} items-center group cursor-pointer border border-[#E6EDEF]/10 shadow-2xl`}
                >
                  <img 
                    src={bgImage} 
                    alt={event.title} 
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    onError={(e) => {
                      console.error('Image failed to load:', bgImage);
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2000&auto=format&fit=crop';
                    }}
                  />
                  <div className={`absolute inset-0 mix-blend-multiply transition-opacity duration-500 opacity-90 group-hover:opacity-80
                  ${color === 'orange'
                      ? 'bg-gradient-to-r from-[#F5841A] to-[#8a4a0e]'
                      : 'bg-gradient-to-r from-[#004e5e] to-[#002E38]'
                    }`}
                  />

                  {/* Time Capsule */}
                  <div className={`relative z-20 h-full w-14 md:w-20 bg-[#E6EDEF] flex flex-col items-center justify-center
                  ${align === 'left' ? 'rounded-r-2xl mr-auto' : 'rounded-l-2xl ml-auto'}
                `}>
                    <span className={`text-sm md:text-lg font-bold tracking-widest -rotate-90 whitespace-nowrap
                    ${color === 'orange' ? 'text-[#F5841A]' : 'text-[#002E38]'}
                  `}>
                      {event.start_date?.time ?? ''}{event.end_date?.time ? ` - ${event.end_date.time}` : ''}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className={`relative z-10 flex flex-col justify-center px-6 md:px-10 w-full h-full
                  ${align === 'left' ? 'items-start text-left pl-8' : 'items-end text-right pr-8'}
                `}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#F5841A] bg-black/20 px-2 py-1 rounded text-[10px] md:text-xs font-bold uppercase tracking-widest backdrop-blur-sm border border-[#F5841A]/30">
                        {event.start_date?.date ?? ''}{event.end_date?.date && event.end_date.date !== event.start_date?.date ? ` - ${event.end_date.date}` : ''}
                      </span>
                      {event.category_content && (
                        <span className="text-teal-400 bg-black/20 px-2 py-1 rounded text-[10px] md:text-xs font-bold uppercase tracking-widest backdrop-blur-sm border border-teal-400/30">
                          {event.category_content}
                        </span>
                      )}
                      {event.location && (
                        <span className="text-[#E6EDEF]/70 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                          • {event.location}
                        </span>
                      )}
                    </div>
                    <div className={`flex flex-col ${align === 'left' ? 'items-start' : 'items-end'}`}>
                      <p className="text-white font-bold text-lg md:text-2xl uppercase tracking-wide leading-tight">
                        {event.title}
                      </p>
                      {event.description && (
                        <p className="text-[#E6EDEF]/70 font-sans text-xs uppercase tracking-[0.2em] mt-1 line-clamp-2">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}


        {/* --- PREMIUM ANNOUNCEMENTS (Glass Cards) --- */}
        <div className="relative">
          {/* Header Line */}
          <div className="flex items-end justify-between mb-12 border-b border-[#E6EDEF]/10 pb-6">
            <h3 className="font-serif text-4xl text-[#E6EDEF]">Latest News</h3>
            <span className="text-[#E6EDEF]/40 font-sans text-xs uppercase tracking-widest mb-1">Announcements</span>
          </div>

          {isLoading ? (
            <div className="text-[#E6EDEF]/70 py-12 animate-pulse text-center bg-[#E6EDEF]/5 backdrop-blur-sm border border-[#E6EDEF]/10 rounded-xl">Loading announcements...</div>
          ) : error ? (
            <div className="text-[#F5841A] py-8 text-center">{error}</div>
          ) : announcements.length === 0 ? (
            <div className="text-[#E6EDEF]/70 py-8 text-center">No announcements at this time.</div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-6"
            >
              {announcements.map((note) => (
                <motion.div
                  key={note.id}
                  variants={announcementVariants}
                  whileHover={{ y: -5, backgroundColor: "rgba(230, 237, 239, 0.08)" }}
                  className="group relative bg-[#E6EDEF]/5 backdrop-blur-sm border border-[#E6EDEF]/10 p-8 rounded-xl cursor-pointer transition-all duration-300 overflow-hidden"
                >
                  {/* Subtle Orange Glow on Hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#F5841A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">

                    {/* LEFT: Media Thumbnail (if available) */}
                    {note.media && note.media.length > 0 && (
                      <div className="w-full md:w-24 h-24 md:h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={note.media[0].file_url}
                          alt={note.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Meta Info (Tag & Date) */}
                    <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-1 min-w-[120px]">
                      {note.category_content && (
                        <span className="text-[#F5841A] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#F5841A]/30 px-2 py-1 rounded">
                          {note.category_content}
                        </span>
                      )}
                      {note.start_date?.date && (
                        <span className="text-[#E6EDEF]/50 font-mono text-xs uppercase tracking-widest mt-1">
                          {new Date(note.start_date.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* CENTER: Title & Description */}
                    <div className="flex-grow">
                      <h4 className="font-serif text-2xl text-[#E6EDEF] group-hover:text-white transition-colors mb-2 capitalize">
                        {note.title}
                      </h4>
                      <p className="text-[#E6EDEF]/70 font-sans text-sm leading-relaxed max-w-2xl group-hover:text-[#E6EDEF]/90 transition-colors">
                        {note.description}
                      </p>
                    </div>

                  </div>

                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Events;