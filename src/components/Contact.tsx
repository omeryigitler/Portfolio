import React from 'react';
import { motion } from 'motion/react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="pointer-events-auto bg-canvas px-5 py-32 md:px-12 md:py-48">
      <div className="mb-20 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:mb-28 md:text-[10px]">
        CONTACT / 06
      </div>

      <div className="mx-auto max-w-[1100px] text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-7 font-mono text-[10px] uppercase tracking-[0.05em] text-muted-gray md:text-[11px]"
        >
          HAVE AN IDEA?
        </motion.p>

        <motion.div
          initial={{ y: 18, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="group inline-flex items-center justify-center gap-4 md:gap-6"
        >
          <h2 className="text-[clamp(46px,7vw,104px)] font-medium uppercase leading-[0.9] tracking-[-0.055em] text-ink">
            MAKE IT REAL<span className="text-acid">.</span>
          </h2>

          <span
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-soft-gray transition-colors duration-300 group-hover:border-acid md:h-16 md:w-16"
            aria-hidden="true"
          >
            <span className="absolute h-2 w-2 scale-0 rounded-full bg-acid transition-transform duration-300 group-hover:scale-100" />
            <svg className="h-5 w-5 -rotate-45 transition-transform duration-300 group-hover:rotate-0 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </motion.div>
      </div>
    </section>
  );
};
