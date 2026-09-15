import React from 'react';
import { motion } from 'motion/react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="bg-canvas px-6 py-40 text-center pointer-events-auto md:px-12 md:py-64">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-8 font-mono text-[10px] uppercase tracking-[0.04em] text-muted-gray md:text-[11px]"
      >
        HAVE AN IDEA?
      </motion.p>

      <motion.a
        href="mailto:omery@yenimalta.com"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="group inline-flex items-center gap-4 text-[clamp(42px,6vw,80px)] font-medium uppercase leading-[0.9] tracking-[-0.05em] text-ink focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-8"
      >
        MAKE IT REAL
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-soft-gray transition-colors duration-300 group-hover:border-acid md:h-16 md:w-16">
          <span className="absolute h-2 w-2 scale-0 rounded-full bg-acid transition-transform duration-300 group-hover:scale-100" />
          <svg className="h-5 w-5 -rotate-45 transition-transform duration-300 group-hover:rotate-0 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </motion.a>

      <div className="mt-36 flex w-full flex-col items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.04em] text-muted-gray md:mt-40 md:flex-row md:items-end md:text-[11px]">
        <p>© 2026 OMER YIGITLER</p>
        <a href="mailto:omery@yenimalta.com" className="text-ink transition-colors duration-200 hover:text-acid">
          omery@yenimalta.com ↗
        </a>
      </div>
    </section>
  );
};
