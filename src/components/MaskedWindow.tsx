import React, { useEffect, useId, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DEFAULT_BG } from '../data';

gsap.registerPlugin(ScrollTrigger);

export const MaskedWindow: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const maskGroupRef = useRef<SVGGElement>(null);
  const outlineGroupRef = useRef<SVGGElement>(null);
  const coverRef = useRef<SVGRectElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const maskId = `screen-cutout-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    if (!containerRef.current || !maskGroupRef.current || !outlineGroupRef.current || !coverRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.set([maskGroupRef.current, outlineGroupRef.current], {
        transformBox: 'fill-box',
        transformOrigin: '50% 50%',
      });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * 0.95)}`,
          scrub: 0.25,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(backdropRef.current, { scale: 1, duration: 1 }, 0);
      tl.to(maskGroupRef.current, { scale: 6.2, duration: 0.86 }, 0.04);
      tl.to(outlineGroupRef.current, { scale: 6.2, opacity: 0, duration: 0.7 }, 0.04);
      tl.to(coverRef.current, { opacity: 0, duration: 0.14 }, 0.86);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100svh] min-h-[720px] w-full overflow-hidden bg-transparent pointer-events-auto">
      <div
        ref={backdropRef}
        className="absolute inset-0 z-0 scale-[1.06] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${DEFAULT_BG})` }}
      />
      <div className="absolute inset-0 z-[1] bg-ink/20" />

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

        <g ref={outlineGroupRef}>
          <text
            x="800"
            y="530"
            textAnchor="middle"
            fill="transparent"
            stroke="#111111"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
            fontFamily="Switzer, Neue Montreal, Suisse International, sans-serif"
            fontSize="270"
            fontWeight="500"
            letterSpacing="-18"
          >
            SCREEN
          </text>
        </g>
      </svg>

      <div className="absolute left-1/2 top-[30%] z-20 -translate-x-1/2 text-center pointer-events-none">
        <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.06em] text-ink">BEYOND THE</p>
      </div>
    </section>
  );
};
