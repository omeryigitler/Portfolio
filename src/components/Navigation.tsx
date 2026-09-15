import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: 'home', label: 'HOME' },
  { id: 'work', label: 'WORK' },
  { id: 'about', label: 'ABOUT' },
  { id: 'system', label: 'SYSTEM' },
  { id: 'lab', label: 'LAB' },
  { id: 'contact', label: 'CONTACT' },
];

export const Navigation: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const triggers = SECTIONS.flatMap((section, index) => {
      const element = document.getElementById(section.id);
      if (!element) return [];

      return [
        ScrollTrigger.create({
          trigger: element,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        }),
      ];
    });

    ScrollTrigger.refresh();

    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);

  const activeSection = SECTIONS[activeIndex];
  const current = String(activeIndex + 1).padStart(2, '0');
  const total = String(SECTIONS.length).padStart(2, '0');

  return (
    <nav
      className="fixed top-4 md:top-7 left-1/2 -translate-x-1/2 z-[90] w-[calc(100vw-32px)] md:w-[calc(100vw-56px)] max-w-[1600px] px-6 md:px-12 py-5 md:py-6 flex items-center justify-between pointer-events-none text-ink"
      aria-label="Primary"
    >
      <a
        href="#home"
        className="pointer-events-auto font-sans font-[500] text-[11px] md:text-[13px] tracking-[-0.01em]"
      >
        omeryigitler.com
      </a>

      <div className="flex items-center gap-5 md:gap-10 pointer-events-auto">
        <div className="hidden md:flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.04em] text-muted-gray tabular-nums overflow-hidden">
          <span className="relative inline-flex h-[12px] w-[18px] overflow-hidden text-ink">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={current}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-0"
              >
                {current}
              </motion.span>
            </AnimatePresence>
          </span>
          <span>/ {total}</span>
          <span className="ml-1 text-ink">{activeSection.label}</span>
        </div>

        <div className="flex items-center gap-5 md:gap-10 font-sans font-[500] text-[11px] md:text-[13px] uppercase tracking-[-0.01em]">
          <a href="#work" className="hover:text-acid transition-colors duration-200">WORK</a>
          <a href="#about" className="hover:text-acid transition-colors duration-200">ABOUT</a>
          <a href="#lab" className="hover:text-acid transition-colors duration-200">LAB</a>
          <a href="#contact" className="hover:text-acid transition-colors duration-200">CONTACT ↗</a>
        </div>
      </div>
    </nav>
  );
};
