import React from 'react';
import { motion } from 'motion/react';

export const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="pointer-events-auto relative flex min-h-[100svh] w-full flex-col rounded-[10px] bg-canvas px-5 py-24 shadow-[0_22px_80px_rgba(17,17,17,0.055)] md:px-12 md:py-28"
    >
      <div className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
        06 / CONTACT
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto w-full max-w-[1180px] text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            className="mb-7 font-mono text-[10px] uppercase tracking-[0.05em] text-muted-gray md:text-[11px]"
          >
            HAVE AN IDEA?
          </motion.p>

          <motion.button
            type="button"
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group inline-flex items-center justify-center gap-4 md:gap-6"
            aria-label="Start a project"
          >
            <span className="text-[clamp(46px,6.6vw,100px)] font-medium uppercase leading-[0.9] tracking-[-0.055em] text-ink">
              MAKE IT REAL<span className="text-acid">.</span>
            </span>

            <span
              className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-soft-gray transition-colors duration-300 group-hover:border-ink md:h-16 md:w-16"
              aria-hidden="true"
            >
              <svg className="h-5 w-5 -rotate-45 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
