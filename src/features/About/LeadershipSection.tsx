import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const nationalTeam = [
  { name: "Pastor Josef Zabarte", role: "Senior Pastor", img: "/pastors/josef.webp" },
  { name: "Pastor Grace Zabarte", role: "Ministries Department Head", img: "/pastors/grace.webp" },
  { name: "Pastor Jude Orbiso", role: "Missions Department Head", img: "/pastors/jude.webp" },
  { name: "Pastor Arnold Pacis", role: "Magnification Department Head", img: "/pastors/arnold.webp" },
  { name: "Doc. Angel Concepcion", role: "Management Department Head", img: "/pastors/angel.webp" },
  { name: "Pastor Yoly Iriman", role: "Maturity Department Head", img: "/pastors/yoly.webp" },
  { name: "Vanessa Pacis", role: "Membership Department Head", img: "/pastors/nice.webp" },
]


export default function LeadershipSection() {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <section id="leaders" className="bg-soft-linen overflow-hidden">

      {/* ── National Team ─────────────────────────────────────────────── */}
      <div className="py-24 md:py-40 border-t border-midnight-teal/10">
        <div className="px-6 md:px-24 mb-16">
          <span className="text-harvest-orange uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-6 block">
            Our National Team
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-midnight-teal leading-[1] lowercase tracking-tight">
            leadership & vision.
          </h2>
          <p className="font-sans text-[10px] uppercase tracking-widest text-midnight-teal/40 mt-4">
            ← Drag to Explore →
          </p>
        </div>

        <motion.div ref={carousel} className="cursor-grab active:cursor-grabbing pl-6 md:pl-24">
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-8 md:gap-12"
          >
            {nationalTeam.map((leader, i) => (
              <motion.div
                key={i}
                className="relative min-w-[260px] md:min-w-[360px] aspect-[3/4] rounded-sm overflow-hidden group"
              >
                <img
                  src={leader.img}
                  alt={leader.name}
                  className="w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-teal/90 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="font-serif text-2xl md:text-3xl text-soft-linen mb-2">{leader.name}</h3>
                  <div className="w-12 h-[1px] bg-harvest-orange mb-2" />
                  <p className="font-sans text-[10px] uppercase tracking-widest text-soft-linen/80">{leader.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Our Pastors ───────────────────────────────────────────────── */}
      {/* <div className="py-16 md:py-24 px-6 md:px-24 border-t border-midnight-teal/10">
        <div className="max-w-5xl mx-auto">
          <span className="text-harvest-orange uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-6 block">
            Our Pastors
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-midnight-teal leading-[1] lowercase tracking-tight mb-12">
            serving the flock.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-0">
            {pastors.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex flex-col py-5 border-b border-midnight-teal/10 last:border-b-0"
              >
                <span className="font-serif text-lg md:text-xl text-midnight-teal">{p.name}</span>
                <span className="font-sans text-[10px] uppercase tracking-widest text-midnight-teal/50 mt-1">{p.role}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div> */}

    </section>
  );
}