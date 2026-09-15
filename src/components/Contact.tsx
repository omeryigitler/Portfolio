import React from 'react';
import { motion } from 'motion/react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-40 md:py-64 px-4 md:px-12 flex flex-col items-center text-center bg-canvas pointer-events-auto">
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-[10px] md:text-[11px] tracking-[0.04em] uppercase text-muted-gray mb-8"
      >
        HAVE AN IDEA?
      </motion.p>
      
      <motion.a 
        href="mailto:omery@yenimalta.com"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="group relative inline-flex items-center gap-4 text-[clamp(42px,6vw,80px)] leading-[0.9] tracking-[-0.05em] font-medium text-ink uppercase"
      >
        MAKE IT REAL
        <span className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border border-soft-gray group-hover:border-acid transition-colors duration-500">
          <span className="absolute w-2 h-2 rounded-full bg-acid scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></span>
          <svg className="w-5 h-5 md:w-6 md:h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </motion.a>

      <div className="mt-40 w-full flex flex-col md:flex-row justify-between items-center md:items-end font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] gap-8 md:gap-0">
        <p className="text-muted-gray">© 2026 OMER YIGITLER</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-acid transition-colors duration-300">INSTAGRAM</a>
          <a href="#" className="hover:text-acid transition-colors duration-300">LINKEDIN</a>
          <a href="#" className="hover:text-acid transition-colors duration-300">GITHUB</a>
        </div>
      </div>
    </section>
  );
};
