import React from 'react';

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
  return (
    <footer className="flex flex-col items-center overflow-hidden rounded-b-[8px] bg-canvas px-5 pb-6 pt-24 pointer-events-auto md:rounded-b-[10px] md:px-12 md:pb-9 md:pt-28">
      <div className="mb-16 flex w-full items-center justify-between border-t border-soft-gray/50 pt-5 font-mono text-[9px] uppercase tracking-[0.05em] text-muted-gray md:mb-20 md:text-[10px]">
        <span>SOCIAL</span>
        <div className="flex items-center gap-6 md:gap-9">
          <SocialLink href="https://www.instagram.com/omeryigitler.web/">INSTAGRAM ↗</SocialLink>
          <SocialLink href="https://github.com/omeryigitler">GITHUB ↗</SocialLink>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <h1 className="w-full whitespace-nowrap pb-5 text-center text-[clamp(64px,14vw,270px)] font-medium leading-[0.8] tracking-[-0.07em] text-ink md:pb-7">
          omeryigitler<span className="text-acid">.</span>
        </h1>
      </div>
    </footer>
  );
};
