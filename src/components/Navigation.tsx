import React from 'react';

const LogoMark: React.FC = () => (
  <svg viewBox="0 0 32 24" className="h-[18px] w-[26px]" aria-hidden="true">
    <circle cx="9" cy="12" r="7.25" fill="none" stroke="currentColor" strokeWidth="2.2" />
    <path d="M17.5 4.5 23 11l5.5-6.5M23 11v8.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    className="group relative pb-1 text-ink focus-visible:outline-none"
  >
    <span>{children}</span>
    <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-acid transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
  </a>
);

export const Navigation: React.FC = () => {
  return (
    <nav
      className="fixed left-1/2 top-0 z-[120] flex w-[calc(100vw-32px)] max-w-[1600px] -translate-x-1/2 items-center justify-between rounded-b-[8px] bg-canvas/90 px-6 py-5 text-ink backdrop-blur-md md:w-[calc(100vw-56px)] md:px-12 md:py-6"
      aria-label="Primary"
    >
      <a href="#home" aria-label="Home" className="text-ink transition-opacity duration-200 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-4">
        <LogoMark />
      </a>

      <div className="flex items-center gap-5 font-sans text-[11px] font-[500] uppercase tracking-[-0.015em] md:gap-10 md:text-[13px]">
        <NavLink href="#work">WORK</NavLink>
        <NavLink href="#about">ABOUT</NavLink>
        <NavLink href="#contact">CONTACT ↗</NavLink>
      </div>
    </nav>
  );
};
