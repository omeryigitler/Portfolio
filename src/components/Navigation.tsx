import React from 'react';
import { useUI } from '../context/UIContext';

const LogoMark: React.FC = () => (
  <svg viewBox="0 0 34 24" className="h-[20px] w-[30px] md:h-[22px] md:w-[32px]" aria-hidden="true">
    <path d="M2.5 12c0-5.1 3.9-9 9-9s9 3.9 9 9-3.9 9-9 9-9-3.9-9-9Z" fill="none" stroke="currentColor" strokeWidth="2.1" />
    <path d="M19.5 3.8 25.3 11l6.2-7.2M25.3 11v9.2" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="square" strokeLinejoin="miter" />
    <rect x="30.4" y="18.1" width="2.4" height="2.4" fill="#EFFF00" />
  </svg>
);

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    className="group relative pb-[6px] text-ink focus-visible:outline-none"
  >
    <span>{children}</span>
    <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-acid transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
  </a>
);

export const Navigation: React.FC = () => {
  const { isProjectOpen } = useUI();

  return (
    <nav
      className={`fixed left-1/2 top-9 z-[120] flex w-[calc(100vw-72px)] max-w-[1456px] -translate-x-1/2 items-center justify-between text-ink transition-[opacity,transform] duration-300 ease-[0.16,1,0.3,1] md:top-[68px] md:w-[calc(100vw-144px)] ${
        isProjectOpen ? '-translate-y-3 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
      aria-label="Primary"
    >
      <a
        href="#home"
        aria-label="Home"
        className="pointer-events-auto text-ink transition-opacity duration-200 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-4"
      >
        <LogoMark />
      </a>

      <div className="flex items-center gap-5 font-sans text-[11px] font-[500] uppercase tracking-[-0.02em] md:gap-9 md:text-[12px]">
        <NavLink href="#work">WORK</NavLink>
        <NavLink href="#about">ABOUT</NavLink>
        <NavLink href="#contact">CONTACT ↗</NavLink>
      </div>
    </nav>
  );
};
