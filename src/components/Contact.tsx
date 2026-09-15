import React from 'react';
import { motion } from 'motion/react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="bg-canvas px-6 py-28 text-center pointer-events-auto md:px-12 md:py-44">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-8 font-mono text-[10px] uppercase tracking-[0.04em] text-muted-gray md:text-[11px]"
      >
        HAVE AN IDEA?
      </motion.p>

      <motion.h2
        initial={{ y: 18, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-[clamp(42px,6vw,80px)] font-medium uppercase leading-[0.9] tracking-[-0.05em] text-ink"
      >
        MAKE IT REAL<span className="text-acid">.</span>
      </motion.h2>
    </section>
  );
};
