import React, { useEffect, useId, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DEFAULT_BG } from '../data';

gsap.registerPlugin(ScrollTrigger);

export const MaskedWindow: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const solidTextRef = useRef<SVGTextElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const clipId = `screen-clip-${useId().replace(/:/g, '')}`;
  const monoId = `screen-mono-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    if (!containerRef.current || !backdropRef.current || !frameRef.current || !solidTextRef.current || !lineRef.current || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) return;

      gsap.set(frameRef.current, { transformOrigin: '50% 12%', willChange: 'transform,opacity' });
      gsap.set(lineRef.current, { scaleX: 0.22, transformOrigin: '0% 50%' });
      gsap.set(backdropRef.current, { scale: 1.035 });

      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      tl.to(backdropRef.current, { scale: 1, duration: 1 }, 0);
      tl.to(lineRef.current, { scaleX: 1, duration: 0.2, ease: 'power2.out' }, 0.06);
      tl.to(solidTextRef.current, { opacity: 0, duration: 0.34, ease: 'power2.out' }, 0.2);
      tl.to(frameRef.current, {
        y: '-2.2vh',
        scale: 0.982,
        rotate: -0.2,
        boxShadow: '0 34px 90px rgba(17,17,17,0.15)',
        duration: 0.2,
        ease: 'power2.inOut',
      }, 0.56);
      tl.to(overlayRef.current, { opacity: 0.06, duration: 0.2 }, 0.58);
      tl.to(frameRef.current, {
        yPercent: -126,
        scale: 0.91,
        rotate: -1.15,
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.in',
      }, 0.72);

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
    <section id="transition" ref={containerRef} className="pointer-events-auto relative h-[190svh] w-full bg-transparent">
      <div className="sticky top-0 h-[100svh] min-h-[720px] w-full overflow-hidden rounded-[10px] bg-[#d8d7d1] shadow-[0_22px_80px_rgba(17,17,17,0.055)]">
        <div
          ref={backdropRef}
          className="absolute inset-0 bg-cover bg-center grayscale saturate-0 contrast-[0.92] brightness-[0.86] will-change-transform"
          style={{ backgroundImage: `url(${DEFAULT_BG})` }}
        />
        <div ref={overlayRef} className="absolute inset-0 bg-[#d8d7d1]/62" />

        <div
          ref={frameRef}
          className="absolute inset-x-[4%] top-[7%] flex h-[80%] flex-col overflow-hidden rounded-[8px] border border-ink/10 bg-canvas px-6 py-7 md:inset-x-[5%] md:h-[82%] md:px-10 md:py-9"
        >
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
            <span>03 / TRANSITION</span>
            <span>PROJECTS → APPROACH</span>
          </div>

          <div className="relative flex flex-1 flex-col items-center justify-center">
            <div className="mb-5 text-center md:mb-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink md:text-[11px]">FROM WORK / TO APPROACH</p>
              <span ref={lineRef} className="mx-auto mt-3 block h-[2px] w-12 bg-acid" />
            </div>

            <svg
              className="h-auto w-full max-w-[1320px] overflow-visible"
              viewBox="0 0 1200 320"
              preserveAspectRatio="xMidYMid meet"
              aria-label="Screen"
              role="img"
            >
              <defs>
                <clipPath id={clipId}>
                  <text
                    x="600"
                    y="235"
                    textAnchor="middle"
                    fontFamily="Switzer, Neue Montreal, Suisse International, sans-serif"
                    fontSize="255"
                    fontWeight="500"
                    letterSpacing="-16"
                  >
                    SCREEN
                  </text>
                </clipPath>
                <filter id={monoId} colorInterpolationFilters="sRGB">
                  <feColorMatrix
                    type="matrix"
                    values="0.299 0.587 0.114 0 0
                            0.299 0.587 0.114 0 0
                            0.299 0.587 0.114 0 0
                            0     0     0     1 0"
                  />
                  <feComponentTransfer>
                    <feFuncR type="linear" slope="0.72" intercept="0.04" />
                    <feFuncG type="linear" slope="0.72" intercept="0.04" />
                    <feFuncB type="linear" slope="0.72" intercept="0.04" />
                  </feComponentTransfer>
                </filter>
              </defs>

              <image
                href={DEFAULT_BG}
                x="0"
                y="0"
                width="1200"
                height="320"
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#${clipId})`}
                filter={`url(#${monoId})`}
              />

              <text
                ref={solidTextRef}
                x="600"
                y="235"
                textAnchor="middle"
                fill="#111111"
                fontFamily="Switzer, Neue Montreal, Suisse International, sans-serif"
                fontSize="255"
                fontWeight="500"
                letterSpacing="-16"
              >
                SCREEN
              </text>
            </svg>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
            <span>WORK ENDS HERE / PROCESS COMES NEXT</span>
            <span>↓</span>
          </div>
        </div>
      </div>
    </section>
  );
};
