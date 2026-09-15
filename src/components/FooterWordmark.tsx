import React from 'react';
import { useUI } from '../context/UIContext';

const SocialLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group relative pb-1 text-ink focus-visible:outline-none"
  >
    <span>{children}</span>
    <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-acid transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
  </a>
);

export const FooterWordmark: React.FC = () => {
  const { setContactFormOpen } = useUI();

  return (
    <footer
      data-final-footer
      className="pointer-events-auto relative w-full rounded-[10px] bg-canvas px-5 py-5 shadow-[0_22px_80px_rgba(17,17,17,0.055)] md:px-12 md:py-6"
    >
      <div className="flex w-full items-center justify-between border-b border-soft-gray/55 pb-4 font-mono text-[9px] uppercase tracking-[0.05em] text-muted-gray md:text-[10px]">
        <span>© 2026 OMER YIGITLER</span>
        <div className="flex items-center gap-6 md:gap-9">
          <button
            type="button"
            onClick={() => setContactFormOpen(true)}
            className="group relative pb-1 text-ink focus-visible:outline-none"
          >
            <span>EMAIL ↗</span>
            <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-acid transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
          </button>
          <SocialLink href="https://www.instagram.com/omeryigitler.web/">INSTAGRAM ↗</SocialLink>
          <SocialLink href="https://github.com/omeryigitler">GITHUB ↗</SocialLink>
        </div>
      </div>

      <div className="mt-8 flex items-end justify-center overflow-visible md:mt-10">
        <h1 className="w-full whitespace-nowrap pb-1 text-center text-[clamp(58px,8.2vw,150px)] font-medium leading-[0.82] tracking-[-0.065em] text-ink md:pb-2">
          omeryigitler<span className="text-acid">.</span>
        </h1>
      </div>
    </footer>
  );
};
