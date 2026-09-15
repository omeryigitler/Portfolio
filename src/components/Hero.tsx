import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const kickerRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const metaRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !heroRef.current ||
      !labelRef.current ||
      !kickerRef.current ||
      !line1Ref.current ||
      !line2Ref.current ||
      !metaRightRef.current
    ) return;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) return;

      gsap.set([labelRef.current, kickerRef.current, line1Ref.current, line2Ref.current], {
        autoAlpha: 0,
        yPercent: 105,
      });
      gsap.set(metaRightRef.current, { autoAlpha: 0, y: 10 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro.to(labelRef.current, { autoAlpha: 1, yPercent: 0, duration: 0.42 }, 0.1);
      intro.to(kickerRef.current, { autoAlpha: 1, yPercent: 0, duration: 0.44 }, 0.16);
      intro.to(line1Ref.current, { autoAlpha: 1, yPercent: 0, duration: 0.66 }, 0.3);
      intro.to(line2Ref.current, { autoAlpha: 1, yPercent: 0, duration: 0.66 }, 0.42);
      intro.to(metaRightRef.current, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.96);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-[calc(100svh-24px)] w-full scroll-mt-3 flex-col justify-between rounded-[10px] bg-canvas px-5 pb-8 pt-20 shadow-[0_20px_70px_rgba(17,17,17,0.07)] md:min-h-[calc(100svh-48px)] md:scroll-mt-6 md:px-12 md:pb-10 md:pt-24 lg:px-14"
    >
      <div className="flex flex-1 flex-col justify-center">
        <div className="mb-7 flex items-center gap-4 overflow-hidden font-mono text-[9px] uppercase tracking-[0.06em] md:mb-9 md:text-[10px]">
          <span ref={labelRef} className="text-muted-gray">01 / INTRO</span>
          <span className="h-px w-8 bg-soft-gray" aria-hidden="true" />
          <span ref={kickerRef} className="text-ink">I DESIGN + BUILD</span>
        </div>

        <h1 className="w-full text-[clamp(42px,6.7vw,124px)] font-[500] leading-[0.9] tracking-[-0.045em] text-ink [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal]">
          <span className="block overflow-hidden">
            <span ref={line1Ref} className="block md:whitespace-nowrap">
              digital <br className="md:hidden" /> experiences
            </span>
          </span>

          <span className="mt-1 block overflow-hidden md:mt-2">
            <span ref={line2Ref} className="block md:whitespace-nowrap">
              worth <br className="md:hidden" /> remembering<span className="text-acid">.</span>
            </span>
          </span>
        </h1>
      </div>

      <div className="flex w-full items-end justify-end">
        <div ref={metaRightRef} className="hidden text-right font-mono text-[9px] uppercase tracking-[0.05em] text-muted-gray lg:block md:text-[10px]">
          <p className="mb-1 text-ink">INDEPENDENT DESIGNER / DEVELOPER</p>
          <p>DESIGN · CODE · INTERACTION</p>
        </div>
      </div>
    </section>
  );
};
