import React, { useEffect, useId, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DEFAULT_BG } from '../data';

gsap.registerPlugin(ScrollTrigger);

export const MaskedWindow: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const maskGroupRef = useRef<SVGGElement>(null);
  const solidTextRef = useRef<SVGGElement>(null);
  const coverRef = useRef<SVGRectElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const maskId = `screen-cutout-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    if (!containerRef.current || !maskGroupRef.current || !solidTextRef.current || !coverRef.current || !backdropRef.current || !labelRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.set(maskGroupRef.current, {
        transformBox: 'fill-box',
        transformOrigin: '50% 50%',
      });

      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      tl.to(backdropRef.current, { scale: 1, duration: 1 }, 0);
      tl.to(maskGroupRef.current, { scale: 6.2, duration: 0.88 }, 0.05);
      tl.to(solidTextRef.current, { opacity: 0, duration: 0.24 }, 0.12);
      tl.to(labelRef.current, { color: '#EFFF00', duration: 0.22 }, 0.58);
      tl.to(coverRef.current, { opacity: 0, duration: 0.12 }, 0.86);

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        animation: tl,
        invalidateOnRefresh: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[180svh] w-full bg-transparent pointer-events-auto">
      <div className="sticky top-0 h-[100svh] min-h-[720px] w-full overflow-hidden">
        <div
          ref={backdropRef}
          className="absolute inset-0 z-0 scale-[1.05] bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url(${DEFAULT_BG})` }}
        />
        <div className="absolute inset-0 z-[1] bg-ink/14" />

        <svg
          className="absolute inset-0 z-10 h-full w-full"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900">
              <rect x="0" y="0" width="1600" height="900" fill="white" />
              <g ref={maskGroupRef}>
                <text
                  x="800"
                  y="530"
                  textAnchor="middle"
                  fill="black"
                  fontFamily="Switzer, Neue Montreal, Suisse International, sans-serif"
                  fontSize="270"
                  fontWeight="500"
                  letterSpacing="-18"
                >
                  SCREEN
                </text>
              </g>
            </mask>
          </defs>

          <rect
            ref={coverRef}
            x="0"
            y="0"
            width="1600"
            height="900"
            fill="#FAFAF7"
            mask={`url(#${maskId})`}
          />

          <g ref={solidTextRef}>
            <text
              x="800"
              y="530"
              textAnchor="middle"
              fill="#111111"
              fontFamily="Switzer, Neue Montreal, Suisse International, sans-serif"
              fontSize="270"
              fontWeight="500"
              letterSpacing="-18"
            >
              SCREEN
            </text>
          </g>
        </svg>

        <div className="absolute left-1/2 top-[28%] z-30 -translate-x-1/2 text-center pointer-events-none">
          <p ref={labelRef} className="font-mono text-[10px] uppercase tracking-[0.07em] text-ink md:text-[11px]">
            BEYOND THE
          </p>
          <span className="mx-auto mt-3 block h-[2px] w-9 bg-acid" />
        </div>
      </div>
    </section>
  );
};
