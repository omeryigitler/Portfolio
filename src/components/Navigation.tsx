import React from 'react';

export const Navigation: React.FC = () => {
  return (
    <nav
      className="fixed top-4 md:top-7 left-1/2 -translate-x-1/2 z-[90] w-[calc(100vw-32px)] md:w-[calc(100vw-56px)] max-w-[1600px] px-6 md:px-12 py-5 md:py-6 flex items-center justify-between pointer-events-none text-ink"
      aria-label="Primary"
    >
      <a
        href="#home"
        className="pointer-events-auto font-sans font-[500] text-[11px] md:text-[13px] tracking-[-0.015em] hover:text-muted-gray transition-colors duration-200"
      >
        omeryigitler.com
      </a>

      <div className="flex items-center gap-5 md:gap-10 pointer-events-auto font-sans font-[500] text-[11px] md:text-[13px] uppercase tracking-[-0.015em]">
        <a href="#work" className="hover:text-acid transition-colors duration-200">WORK</a>
        <a href="#about" className="hover:text-acid transition-colors duration-200">ABOUT</a>
        <a href="#contact" className="hover:text-acid transition-colors duration-200">CONTACT ↗</a>
      </div>
    </nav>
  );
};
