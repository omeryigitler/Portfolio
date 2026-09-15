import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { DEFAULT_BG } from '../data';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const metaLeftRef = useRef<HTMLDivElement>(null);
  const metaRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !backdropRef.current || !frameRef.current || !kickerRef.current || !line1Ref.current || !line2Ref.current || !underlineRef.current) return;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) return;

      gsap.set(backdropRef.current, { scale: 1.08 });
      gsap.set(frameRef.current, { autoAlpha: 0, y: 26, scale: 0.94, transformOrigin: '50% 50%' });
      gsap.set([kickerRef.current, line1Ref.current, line2Ref.current], { autoAlpha: 0, yPercent: 115 });
      gsap.set([metaLeftRef.current, metaRightRef.current], { autoAlpha: 0, y: 12 });
      gsap.set(underlineRef.current, { scaleX: 0, transformOrigin: '0% 50%' });

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.to(frameRef.current, { autoAlpha: 1, y: 0, scale: 1, duration: 1.05 }, 0.08);
      tl.to(backdropRef.current, { scale: 1, duration: 1.8, ease: 'power3.out' }, 0);
      tl.to(kickerRef.current, { autoAlpha: 1, yPercent: 0, duration: 0.7 }, 0.34);
      tl.to(line1Ref.current, { autoAlpha: 1, yPercent: 0, duration: 0.9 }, 0.46);
      tl.to(line2Ref.current, { autoAlpha: 1, yPercent: 0, duration: 0.9 }, 0.58);
      tl.to(underlineRef.current, { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }, 0.9);
      tl.to([metaLeftRef.current, metaRightRef.current], { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08 }, 1.02);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[calc(100svh-32px)] w-full overflow-hidden rounded-t-[8px] bg-[#d9d9d4] md:min-h-[calc(100svh-56px)] md:rounded-t-[10px]"
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-cover bg-center grayscale-[0.75] contrast-[0.9] saturate-[0.45] will-change-transform"
        style={{ backgroundImage: `url(${DEFAULT_BG})` }}
      />
      <div className="absolute inset-0 bg-[#e8e7e1]/35" />

      <div
        ref={frameRef}
        className="absolute inset-3 flex flex-col justify-between overflow-hidden rounded-[8px] bg-canvas px-5 pb-7 pt-24 shadow-[0_18px_70px_rgba(17,17,17,0.08)] md:inset-5 md:px-10 md:pb-9 md:pt-28 lg:px-12"
      >
        <div className="flex flex-1 flex-col justify-center">
          <div className="overflow-hidden">
            <div ref={kickerRef} className="mb-6 font-mono text-[10px] uppercase tracking-[0.06em] text-ink md:mb-9 md:text-[11px]">
              I DESIGN + BUILD
            </div>
          </div>

          <h1 className="w-fit max-w-[98%] text-[clamp(42px,8.15vw,144px)] font-[500] uppercase leading-[0.88] tracking-[-0.062em] text-ink [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal] lg:max-w-[90%]">
            <span className="block overflow-hidden">
              <span ref={line1Ref} className="block">DIGITAL <br className="block sm:hidden" /> EXPERIENCES</span>
            </span>
            <span className="relative mt-1 block overflow-visible md:mt-2">
              <span className="block overflow-hidden">
                <span ref={line2Ref} className="block">WORTH <br className="block sm:hidden" /> REMEMBERING.</span>
              </span>
              <span ref={underlineRef} className="absolute -bottom-3 left-0 h-[3px] w-[42%] max-w-[420px] bg-acid md:-bottom-4 md:h-[4px]" />
            </span>
          </h1>
        </div>

        <div className="flex w-full items-end justify-between gap-8">
          <div ref={metaLeftRef} className="font-mono text-[9px] uppercase tracking-[0.05em] text-muted-gray md:text-[11px]">
            SELECTED WORK 2022—2026
          </div>
          <div ref={metaRightRef} className="hidden text-right font-mono text-[10px] uppercase tracking-[0.05em] text-muted-gray lg:block md:text-[11px]">
            <p className="mb-1 text-ink">INDEPENDENT DESIGNER / DEVELOPER</p>
            <p>DESIGN · CODE · INTERACTION</p>
          </div>
        </div>
      </div>
    </section>
  );
};
