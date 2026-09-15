import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DEFAULT_BG } from '../data';

gsap.registerPlugin(ScrollTrigger);

export const MaskedWindow: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const solidScreenRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !backdropRef.current || !frameRef.current || !solidScreenRef.current || !lineRef.current || !labelRef.current || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) return;

      gsap.set(frameRef.current, { transformOrigin: '50% 12%', willChange: 'transform,opacity' });
      gsap.set(lineRef.current, { scaleX: 0.2, transformOrigin: '50% 50%' });
      gsap.set(backdropRef.current, { scale: 1.05 });

      const tl = gsap.timeline({ defaults: { ease: 'none' } });

      tl.to(backdropRef.current, { scale: 1, duration: 1 }, 0);
      tl.to(lineRef.current, { scaleX: 1, duration: 0.26, ease: 'power2.out' }, 0.04);
      tl.to(solidScreenRef.current, { opacity: 0, duration: 0.46, ease: 'power2.out' }, 0.08);
      tl.to(labelRef.current, { color: '#EFFF00', duration: 0.18 }, 0.34);
      tl.to(frameRef.current, {
        y: '-4vh',
        scale: 0.965,
        rotate: -0.45,
        boxShadow: '0 36px 90px rgba(17,17,17,0.16)',
        duration: 0.2,
        ease: 'power2.inOut',
      }, 0.46);
      tl.to(overlayRef.current, { opacity: 0, duration: 0.35 }, 0.46);
      tl.to(frameRef.current, {
        yPercent: -138,
        scale: 0.82,
        rotate: -2.2,
        autoAlpha: 0,
        duration: 0.34,
        ease: 'power2.in',
      }, 0.66);

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
    <section ref={containerRef} className="relative h-[205svh] w-full bg-transparent pointer-events-auto">
      <div className="sticky top-0 h-[100svh] min-h-[720px] w-full overflow-hidden bg-[#bcbdb8]">
        <div
          ref={backdropRef}
          className="absolute inset-0 bg-cover bg-center grayscale-[0.7] saturate-[0.55] will-change-transform"
          style={{ backgroundImage: `url(${DEFAULT_BG})` }}
        />
        <div ref={overlayRef} className="absolute inset-0 bg-[#d8d8d2]/35" />

        <div
          ref={frameRef}
          className="absolute inset-x-[4%] top-[8%] flex h-[76%] flex-col overflow-hidden rounded-[8px] border border-ink/10 bg-canvas px-6 py-7 md:inset-x-[5%] md:top-[7%] md:h-[78%] md:px-10 md:py-9"
        >
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
            <span>03 / TRANSITION</span>
            <span>KEEP SCROLLING</span>
          </div>

          <div className="relative flex flex-1 items-center justify-center">
            <div className="absolute left-1/2 top-[22%] -translate-x-1/2 text-center">
              <p ref={labelRef} className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink md:text-[11px]">BEYOND THE</p>
              <span ref={lineRef} className="mx-auto mt-3 block h-[2px] w-11 bg-acid" />
            </div>

            <div className="relative w-full text-center text-[clamp(82px,19vw,310px)] font-[500] uppercase leading-[0.78] tracking-[-0.07em]">
              <span
                className="select-none text-transparent"
                style={{
                  backgroundImage: `url(${DEFAULT_BG})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
                aria-hidden="true"
              >
                SCREEN
              </span>
              <span ref={solidScreenRef} className="absolute inset-0 flex items-center justify-center text-ink">
                SCREEN
              </span>
            </div>
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
