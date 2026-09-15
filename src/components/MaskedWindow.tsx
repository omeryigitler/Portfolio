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
  const labelRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const clipId = `screen-clip-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    if (!containerRef.current || !backdropRef.current || !frameRef.current || !solidTextRef.current || !lineRef.current || !labelRef.current || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) return;

      gsap.set(frameRef.current, { transformOrigin: '50% 12%', willChange: 'transform,opacity' });
      gsap.set(lineRef.current, { scaleX: 0.25, transformOrigin: '0% 50%' });
      gsap.set(backdropRef.current, { scale: 1.045 });

      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      tl.to(backdropRef.current, { scale: 1, duration: 1 }, 0);
      tl.to(lineRef.current, { scaleX: 1, duration: 0.18, ease: 'power2.out' }, 0.04);
      tl.to(solidTextRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' }, 0.18);
      tl.to(labelRef.current, { color: '#EFFF00', duration: 0.16 }, 0.38);
      tl.to(frameRef.current, {
        y: '-2.5vh',
        scale: 0.982,
        rotate: -0.22,
        boxShadow: '0 34px 90px rgba(17,17,17,0.15)',
        duration: 0.18,
        ease: 'power2.inOut',
      }, 0.56);
      tl.to(overlayRef.current, { opacity: 0.08, duration: 0.2 }, 0.58);
      tl.to(frameRef.current, {
        yPercent: -126,
        scale: 0.91,
        rotate: -1.15,
        autoAlpha: 0,
        duration: 0.28,
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
    <section id="transition" ref={containerRef} className="pointer-events-auto relative h-[190svh] w-full scroll-mt-3 md:scroll-mt-6">
      <div className="sticky top-0 h-[100svh] min-h-[720px] w-full overflow-hidden rounded-[10px] bg-[#bcbdb8] shadow-[0_20px_70px_rgba(17,17,17,0.07)]">
        <div
          ref={backdropRef}
          className="absolute inset-0 bg-cover bg-center grayscale-[0.7] saturate-[0.5] will-change-transform"
          style={{ backgroundImage: `url(${DEFAULT_BG})` }}
        />
        <div ref={overlayRef} className="absolute inset-0 bg-[#d8d8d2]/32" />

        <div
          ref={frameRef}
          className="absolute inset-x-[4%] top-[7%] flex h-[80%] flex-col overflow-hidden rounded-[8px] border border-ink/10 bg-canvas px-6 py-7 md:inset-x-[5%] md:h-[82%] md:px-10 md:py-9"
        >
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
            <span>03 / TRANSITION</span>
            <span>KEEP SCROLLING</span>
          </div>

          <div className="relative flex flex-1 flex-col items-center justify-center">
            <div className="mb-4 text-center md:mb-6">
              <p ref={labelRef} className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink md:text-[11px]">BEYOND THE</p>
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
              </defs>

              <image
                href={DEFAULT_BG}
                x="0"
                y="0"
                width="1200"
                height="320"
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#${clipId})`}
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
            <span>WHITE CANVAS / OUTER WORLD</span>
            <span>↓</span>
          </div>
        </div>
      </div>
    </section>
  );
};
