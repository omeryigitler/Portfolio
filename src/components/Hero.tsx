import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DEFAULT_BG } from '../data';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const kickerRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const metaRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !heroRef.current ||
      !backdropRef.current ||
      !frameRef.current ||
      !labelRef.current ||
      !kickerRef.current ||
      !line1Ref.current ||
      !line2Ref.current ||
      !underlineRef.current
    ) return;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) {
        gsap.set(underlineRef.current, { scaleX: 1, opacity: 1, transformOrigin: '0% 50%' });
        return;
      }

      gsap.set(backdropRef.current, { scale: 1.07 });
      gsap.set(frameRef.current, { autoAlpha: 0, y: 18, scale: 0.965, transformOrigin: '50% 50%' });
      gsap.set([labelRef.current, kickerRef.current, line1Ref.current, line2Ref.current], { autoAlpha: 0, yPercent: 105 });
      gsap.set(metaRightRef.current, { autoAlpha: 0, y: 10 });
      gsap.set(underlineRef.current, { scaleX: 0.16, opacity: 0, transformOrigin: '0% 50%' });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro.to(frameRef.current, { autoAlpha: 1, y: 0, scale: 1, duration: 0.72 }, 0.12);
      intro.to(backdropRef.current, { scale: 1, duration: 1.45, ease: 'power3.out' }, 0);
      intro.to(labelRef.current, { autoAlpha: 1, yPercent: 0, duration: 0.5 }, 0.32);
      intro.to(kickerRef.current, { autoAlpha: 1, yPercent: 0, duration: 0.52 }, 0.38);
      intro.to(line1Ref.current, { autoAlpha: 1, yPercent: 0, duration: 0.72 }, 0.5);
      intro.to(line2Ref.current, { autoAlpha: 1, yPercent: 0, duration: 0.72 }, 0.62);
      intro.to(underlineRef.current, { opacity: 1, duration: 0.34, ease: 'power2.out' }, 0.94);
      intro.to(metaRightRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, 1.04);

      gsap.fromTo(
        underlineRef.current,
        { scaleX: 0.16 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
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
        className="absolute inset-0 bg-cover bg-center grayscale-[0.72] contrast-[0.92] saturate-[0.42] will-change-transform"
        style={{ backgroundImage: `url(${DEFAULT_BG})` }}
      />
      <div className="absolute inset-0 bg-[#e8e7e1]/30" />

      <div
        ref={frameRef}
        className="absolute inset-3 flex flex-col justify-between overflow-hidden rounded-[8px] bg-canvas px-5 pb-7 pt-24 shadow-[0_18px_70px_rgba(17,17,17,0.07)] md:inset-5 md:px-10 md:pb-9 md:pt-28 lg:inset-6 lg:px-12"
      >
        <div className="flex flex-1 flex-col justify-center">
          <div className="mb-7 flex items-center gap-4 overflow-hidden font-mono text-[9px] uppercase tracking-[0.06em] md:mb-9 md:text-[10px]">
            <span ref={labelRef} className="text-muted-gray">INTRO / 01</span>
            <span className="h-px w-8 bg-soft-gray" aria-hidden="true" />
            <span ref={kickerRef} className="text-ink">I DESIGN + BUILD</span>
          </div>

          <h1 className="w-full text-[clamp(40px,7.1vw,132px)] font-[500] uppercase leading-[0.87] tracking-[-0.062em] text-ink [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal]">
            <span className="block overflow-hidden">
              <span ref={line1Ref} className="block md:whitespace-nowrap">
                DIGITAL <br className="md:hidden" /> EXPERIENCES
              </span>
            </span>
            <span className="relative mt-1 block overflow-visible md:mt-2">
              <span className="block overflow-hidden">
                <span ref={line2Ref} className="block md:whitespace-nowrap">
                  WORTH <br className="md:hidden" /> REMEMBERING.
                </span>
              </span>
              <span
                ref={underlineRef}
                className="absolute -bottom-3 left-0 h-[3px] w-[48%] max-w-[620px] bg-acid will-change-transform md:-bottom-4 md:h-[4px]"
              />
            </span>
          </h1>
        </div>

        <div className="flex w-full items-end justify-end">
          <div ref={metaRightRef} className="hidden text-right font-mono text-[9px] uppercase tracking-[0.05em] text-muted-gray lg:block md:text-[10px]">
            <p className="mb-1 text-ink">INDEPENDENT DESIGNER / DEVELOPER</p>
            <p>DESIGN · CODE · INTERACTION</p>
          </div>
        </div>
      </div>
    </section>
  );
};
