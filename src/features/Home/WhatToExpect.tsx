import { motion } from 'framer-motion';

/*
 * 3 image cards. Title + 1 sentence only. 
 * Magazine: photos carry the emotional weight, not paragraphs.
 */
const expects = [
    {
        img: "/events/passover-4.jpg",
        label: "The Service",
        title: "75–90 min of worship & teaching.",
    },
    {
        img: "/events/kids-1.jpg",
        label: "Kids & Youth",
        title: "Safe, fun, age-appropriate programs.",
    },
    {
        img: "/events/hospitality-2.jpg",
        label: "First-Time Guests",
        title: "Our team will find you at the door.",
    },
];

const WhatToExpect = () => {
    return (
        <section className="bg-soft-linen pb-16 md:pb-24 px-6 md:px-14 lg:px-20">

            {/* Heading */}
            <div className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end gap-3 md:justify-between">
                <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-serif text-4xl md:text-6xl text-midnight-teal lowercase tracking-tighter leading-[0.9]"
                    style={{ fontFamily: 'Vogun, serif' }}
                >
                    What to expect<br />on Sunday.
                </motion.h2>
            </div>

            {/* 3-col card grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {expects.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative h-[55vw] md:h-[28vw] min-h-[220px] rounded-2xl md:rounded-3xl overflow-hidden cursor-default"
                    >
                        <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight-teal/80 via-midnight-teal/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-5 md:p-6">
                            <span className="font-sans text-harvest-orange text-[9px] uppercase tracking-[0.35em] font-bold block mb-1.5">{item.label}</span>
                            <p className="font-serif text-soft-linen text-xl md:text-2xl leading-snug">{item.title}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WhatToExpect;
