import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const line3 = useRef<HTMLDivElement>(null);
  const line4 = useRef<HTMLDivElement>(null);
  const line5 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 84%',
          end: 'center 56%',
          scrub: 0.32,
          invalidateOnRefresh: true,
        },
      });

      tl.from(line1.current, { x: -28, opacity: 0, duration: 0.8 }, 0);
      tl.from(line2.current, { x: 28, opacity: 0, duration: 0.8 }, 0.12);
      tl.from(line3.current, { y: 20, opacity: 0, duration: 0.8 }, 0.24);
      tl.from(line4.current, { x: -22, opacity: 0, duration: 0.8 }, 0.36);
      tl.from(line5.current, { y: 20, opacity: 0, duration: 0.8 }, 0.48);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="pointer-events-auto flex min-h-[calc(100svh-24px)] w-full scroll-mt-3 flex-col justify-center rounded-[10px] bg-canvas px-5 py-24 shadow-[0_20px_70px_rgba(17,17,17,0.07)] md:min-h-[calc(100svh-48px)] md:scroll-mt-6 md:px-12 md:py-32"
    >
      <div className="mb-16 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:mb-20 md:text-[10px]">
        04 / ABOUT
      </div>

      <div className="w-full overflow-hidden text-[clamp(32px,5vw,76px)] font-medium leading-[0.94] tracking-[-0.05em] text-ink md:max-w-[78%]">
        <div ref={line1}>I WORK BETWEEN</div>
        <div ref={line2}>DESIGN, CODE</div>
        <div ref={line3}>AND INTERACTION —</div>
        <div ref={line4}>BUILDING DIGITAL</div>
        <div ref={line5}>SYSTEMS WITH INTENT.</div>
      </div>

      <div className="mt-24 grid grid-cols-2 gap-12 font-mono text-[10px] uppercase tracking-[0.04em] text-ink md:mt-32 md:grid-cols-4 md:gap-8 md:text-[11px]">
        <div>
          <p className="mb-6 text-muted-gray">DESIGN</p>
          <p className="leading-[1.6]">ART DIRECTION<br/>UI / UX<br/>DIGITAL IDENTITY</p>
        </div>
        <div>
          <p className="mb-6 text-muted-gray">BUILD</p>
          <p className="leading-[1.6]">FRONTEND<br/>CREATIVE DEV<br/>MOTION</p>
        </div>
        <div>
          <p className="mb-6 text-muted-gray">APPROACH</p>
          <p className="leading-[1.6]">SYSTEMS<br/>INTERACTION<br/>DETAIL</p>
        </div>
      </div>
    </section>
  );
};
