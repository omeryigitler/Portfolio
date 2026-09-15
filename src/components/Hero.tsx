import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const metaRightRef = useRef<HTMLDivElement>(null);
  const metaBottomRef = useRef<HTMLDivElement>(null);
  const preTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !line1Ref.current || !line2Ref.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: () => `+=${Math.round(Math.min(window.innerHeight * 0.65, 620))}`,
          scrub: 0.4,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        [metaRightRef.current, metaBottomRef.current, preTitleRef.current],
        {
          y: -12,
          opacity: 0.35,
          duration: 0.35,
        },
        0,
      );

      tl.to(
        [line1Ref.current, line2Ref.current],
        {
          y: '-5vh',
          duration: 0.7,
        },
        0.15,
      );

      tl.to(
        line1Ref.current,
        {
          opacity: 0.5,
          duration: 0.3,
        },
        0.55,
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full h-[calc(100vh-32px)] md:h-[calc(100vh-56px)] flex flex-col justify-between pt-24 pb-6 md:pt-28 md:pb-10 bg-canvas px-6 md:px-12"
    >
      <div className="flex-1 w-full flex flex-col justify-center relative">
        <div ref={preTitleRef} className="mb-6 md:mb-10 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-ink">
          I DESIGN + BUILD
        </div>

        <h1 className="text-[clamp(44px,8.5vw,150px)] leading-[0.88] tracking-[-0.06em] font-[500] uppercase text-ink w-fit max-w-[95%] lg:max-w-[85%] [font-kerning:normal] [font-feature-settings:'kern'_1,'liga'_1]">
          <div ref={line1Ref} className="block">
            DIGITAL <br className="block sm:hidden" /> EXPERIENCES
          </div>
          <div ref={line2Ref} className="block mt-1 md:mt-2">
            WORTH <br className="block sm:hidden" /> REMEMBERING.
          </div>
        </h1>

        <div ref={metaRightRef} className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0 text-right font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-muted-gray">
          <p className="text-ink mb-1">INDEPENDENT DESIGNER / DEVELOPER</p>
          <p>DESIGN · CODE · INTERACTION</p>
        </div>
      </div>

      <div className="w-full flex justify-between items-end z-50">
        <div ref={metaBottomRef} className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-muted-gray">
          SELECTED WORK 2022—2026
        </div>
        <div className="lg:hidden text-right font-mono text-[9px] uppercase tracking-[0.04em] text-muted-gray">
          <p className="text-ink mb-1">INDEPENDENT DESIGNER</p>
          <p>DESIGN · CODE</p>
        </div>
      </div>
    </section>
  );
};
