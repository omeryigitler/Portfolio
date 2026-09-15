import React from 'react';

export const FooterWordmark: React.FC = () => {
  return (
    <footer className="flex flex-col items-center overflow-hidden rounded-b-[8px] bg-canvas px-4 pb-5 pt-32 pointer-events-auto md:rounded-b-[10px] md:px-12 md:pb-8">
      <div className="flex w-full justify-center">
        <h1 className="w-full whitespace-nowrap pb-3 text-center text-[clamp(64px,14.5vw,280px)] font-medium leading-[0.78] tracking-[-0.07em] text-ink">
          omeryigitler<span className="text-acid">.</span>
        </h1>
      </div>
    </footer>
  );
};
