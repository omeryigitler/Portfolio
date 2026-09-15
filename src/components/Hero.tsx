import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-32px)] w-full flex-col justify-between rounded-t-[8px] bg-canvas px-6 pb-8 pt-28 md:min-h-[calc(100svh-56px)] md:px-12 md:pb-10 md:pt-32"
    >
      <div className="flex flex-1 flex-col justify-center">
        <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.04em] text-ink md:mb-10 md:text-[11px]">
          I DESIGN + BUILD
        </div>

        <h1 className="w-fit max-w-[95%] text-[clamp(44px,8.5vw,150px)] font-[500] uppercase leading-[0.88] tracking-[-0.06em] text-ink [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal] lg:max-w-[85%]">
          <span className="block">DIGITAL <br className="block sm:hidden" /> EXPERIENCES</span>
          <span className="mt-1 block md:mt-2">WORTH <br className="block sm:hidden" /> REMEMBERING.</span>
        </h1>
      </div>

      <div className="flex w-full items-end justify-between gap-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.04em] text-muted-gray md:text-[11px]">
          SELECTED WORK 2022—2026
        </div>
        <div className="hidden text-right font-mono text-[10px] uppercase tracking-[0.04em] text-muted-gray lg:block md:text-[11px]">
          <p className="mb-1 text-ink">INDEPENDENT DESIGNER / DEVELOPER</p>
          <p>DESIGN · CODE · INTERACTION</p>
        </div>
      </div>
    </section>
  );
};
