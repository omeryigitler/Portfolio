import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROCESS = [
  ['01', 'DISCOVER', 'WHAT SHOULD EXIST?'],
  ['02', 'DESIGN', 'HOW SHOULD IT FEEL?'],
  ['03', 'BUILD', 'HOW SHOULD IT BEHAVE?'],
  ['04', 'SHIP', 'MAKE IT REAL.'],
];

export const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const line3 = useRef<HTMLDivElement>(null);
  const line4 = useRef<HTMLDivElement>(null);
  const line5 = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

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
          end: 'center 54%',
          scrub: 0.32,
          invalidateOnRefresh: true,
        },
      });

      tl.from(line1.current, { x: -28, opacity: 0, duration: 0.8 }, 0);
      tl.from(line2.current, { x: 28, opacity: 0, duration: 0.8 }, 0.1);
      tl.from(line3.current, { y: 20, opacity: 0, duration: 0.8 }, 0.2);
      tl.from(line4.current, { x: -22, opacity: 0, duration: 0.8 }, 0.3);
      tl.from(line5.current, { y: 20, opacity: 0, duration: 0.8 }, 0.4);

      if (processRef.current) {
        const rows = processRef.current.querySelectorAll('[data-process-row]');
        tl.from(processRef.current, { opacity: 0, y: 24, duration: 0.8 }, 0.16);
        tl.from(rows, { opacity: 0, x: 18, stagger: 0.08, duration: 0.5 }, 0.26);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="pointer-events-auto flex min-h-[calc(100svh-24px)] w-full scroll-mt-3 flex-col rounded-[10px] bg-canvas px-5 py-20 shadow-[0_20px_70px_rgba(17,17,17,0.07)] md:min-h-[calc(100svh-48px)] md:scroll-mt-6 md:px-12 md:py-24"
    >
      <div className="mb-14 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:mb-16 md:text-[10px]">
        04 / ABOUT
      </div>

      <div className="grid flex-1 items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(430px,0.78fr)] lg:gap-20 xl:gap-28">
        <div>
          <div className="w-full text-[clamp(36px,4.7vw,76px)] font-medium leading-[0.94] tracking-[-0.05em] text-ink">
            <div ref={line1}>I WORK BETWEEN</div>
            <div ref={line2}>DESIGN, CODE</div>
            <div ref={line3}>AND INTERACTION —</div>
            <div ref={line4}>BUILDING DIGITAL</div>
            <div ref={line5}>SYSTEMS WITH INTENT.</div>
          </div>

          <p className="mt-8 max-w-[620px] text-[14px] leading-[1.6] tracking-[-0.015em] text-ink/65 md:text-[16px]">
            I keep strategy, interface and implementation connected, so the final experience does not lose the idea that started it.
          </p>
        </div>

        <div ref={processRef} className="relative">
          <div className="mb-5 flex items-end justify-between gap-6 border-b border-ink/10 pb-5">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-gray md:text-[10px]">FROM IDEA TO LIVE EXPERIENCE</p>
              <p className="mt-3 max-w-[390px] text-[17px] leading-[1.4] tracking-[-0.025em] text-ink md:text-[19px]">
                One continuous process, not separate handoffs.
              </p>
            </div>
            <span className="mb-1 h-[7px] w-[7px] shrink-0 bg-acid" aria-hidden="true" />
          </div>

          <div className="relative pl-10">
            <span className="absolute bottom-0 left-[6px] top-0 w-[2px] bg-acid" aria-hidden="true" />

            {PROCESS.map(([number, title, detail]) => (
              <div
                key={number}
                data-process-row
                className="grid min-h-[88px] grid-cols-[44px_minmax(0,1fr)_minmax(110px,0.55fr)] items-center gap-4 border-t border-ink/10 first:border-t-0 md:min-h-[96px]"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.05em] text-muted-gray">{number}</span>
                <span className="text-[clamp(30px,3.1vw,48px)] font-[500] leading-none tracking-[-0.045em] text-ink">{title}</span>
                <span className="text-right font-mono text-[8px] uppercase leading-[1.45] tracking-[0.055em] text-muted-gray md:text-[9px]">{detail}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-between font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
            <span>STRATEGY → INTERFACE → CODE</span>
            <span>END TO END</span>
          </div>
        </div>
      </div>
    </section>
  );
};
