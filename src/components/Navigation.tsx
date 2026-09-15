import React, { useEffect, useRef, useState } from 'react';
import { useUI } from '../context/UIContext';

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} className="group relative pb-1 text-ink focus-visible:outline-none">
    <span>{children}</span>
    <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-acid transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
  </a>
);

export const Navigation: React.FC = () => {
  const { isProjectOpen } = useUI();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateVisibility = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY <= 56) {
        setVisible(true);
      } else if (delta > 7) {
        setVisible(false);
      } else if (delta < -7) {
        setVisible(true);
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(updateVisibility);
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isVisible = visible && !isProjectOpen;

  return (
    <nav
      className={`fixed left-1/2 top-7 z-[120] flex w-[calc(100vw-32px)] -translate-x-1/2 items-center justify-end px-5 text-ink transition-[opacity,transform] duration-300 ease-[0.16,1,0.3,1] md:top-12 md:w-[92vw] md:max-w-[1680px] md:px-12 lg:px-14 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
      }`}
      aria-label="Primary"
    >
      <div className="flex items-center gap-5 font-sans text-[11px] font-[500] uppercase tracking-[-0.015em] md:gap-9 md:text-[12px]">
        <NavLink href="#work">WORK</NavLink>
        <NavLink href="#about">ABOUT</NavLink>
        <NavLink href="#contact">CONTACT ↗</NavLink>
      </div>
    </nav>
  );
};
