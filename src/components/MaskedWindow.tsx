import React, { useEffect, useId, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MaskedWindow: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const maskGroupRef = useRef<SVGGElement>(null);
  const coverRef = useRef<SVGRectElement>(null);
  const maskId = `screen-cutout-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    if (!containerRef.current || !maskGroupRef.current || !coverRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.set(maskGroupRef.current, {
        transformBox: 'fill-box',
        transformOrigin: '50% 50%',
      });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * 1.05)}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(maskGroupRef.current, {
        scale: 5.5,
        duration: 0.82,
      });

      tl.to(
        coverRef.current,
        {
          opacity: 0,
          duration: 0.18,
        },
        0.82,
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full pointer-events-auto overflow-hidden bg-transparent">
      <svg
        className="absolute inset-0 z-10 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900">
            <rect x="0" y="0" width="1600" height="900" fill="white" />
            <g ref={maskGroupRef}>
              <text
                x="800"
                y="525"
                textAnchor="middle"
                fill="black"
                fontFamily="Switzer, Neue Montreal, Suisse International, sans-serif"
                fontSize="265"
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
      </svg>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 z-20 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-ink text-center pointer-events-none">
        BEYOND THE
      </div>
    </section>
  );
};
