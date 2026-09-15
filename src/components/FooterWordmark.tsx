import React from 'react';

export const FooterWordmark: React.FC = () => {
  return (
    <footer className="pt-32 pb-4 md:pb-8 px-4 md:px-12 flex flex-col items-center bg-canvas pointer-events-auto">
      <div className="w-full flex justify-center">
        <h1 className="text-[clamp(64px,14.5vw,280px)] leading-[0.75] tracking-[-0.07em] font-medium text-ink w-full text-center whitespace-nowrap pb-2">
          omeryigitler<span className="text-acid">.</span>
        </h1>
      </div>
    </footer>
  );
};
