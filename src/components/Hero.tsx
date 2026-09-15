import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const kickerRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const metaRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !heroRef.current ||
      !labelRef.current ||
      !kickerRef.current ||
      !line1Ref.current ||
      !line2Ref.current ||
      !markerRef.current ||
      !metaRightRef.current
    ) return;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) {
        gsap.set(markerRef.current, { scaleX: 1, autoAlpha: 1 });
        return;
      }

      gsap.set([labelRef.current, kickerRef.current, line1Ref.current, line2Ref.current], {
        autoAlpha: 0,
        yPercent: 105,
      });
      gsap.set(metaRightRef.current, { autoAlpha: 0, y: 10 });
      gsap.set(markerRef.current, {
        autoAlpha: 0,
        scaleX: 0.12,
        transformOrigin: '0% 50%',
      });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro.to(labelRef.current, { autoAlpha: 1, yPercent: 0, duration: 0.46 }, 0.12);
      intro.to(kickerRef.current, { autoAlpha: 1, yPercent: 0, duration: 0.48 }, 0.18);
      intro.to(line1Ref.current, { autoAlpha: 1, yPercent: 0, duration: 0.68 }, 0.34);
      intro.to(line2Ref.current, { autoAlpha: 1, yPercent: 0, duration: 0.68 }, 0.46);
      intro.to(markerRef.current, { autoAlpha: 1, duration: 0.28, ease: 'power2.out' }, 0.92);
      intro.to(metaRightRef.current, { autoAlpha: 1, y: 0, duration: 0.44 }, 1.02);

      gsap.fromTo(
        markerRef.current,
        { scaleX: 0.12 },
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
      className="relative flex min-h-[calc(100svh-32px)] w-full flex-col justify-between rounded-t-[8px] bg-canvas px-5 pb-8 pt-28 md:min-h-[calc(100svh-64px)] md:rounded-t-[10px] md:px-12 md:pb-10 md:pt-32 lg:px-14"
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

          <span className="mt-1 block overflow-visible md:mt-2">
            <span className="block overflow-hidden">
              <span ref={line2Ref} className="block md:whitespace-nowrap">
                <span className="relative inline-block">
                  <span
                    ref={markerRef}
                    aria-hidden="true"
                    className="absolute left-[-1%] top-[58%] z-0 h-[0.105em] w-[102%] -rotate-[0.6deg] bg-acid"
                  />
                  <span className="relative z-10">WORTH</span>
                </span>{' '}
                <br className="md:hidden" /> REMEMBERING.
              </span>
            </span>
          </span>
        </h1>
      </div>

      <div className="flex w-full items-end justify-end">
        <div ref={metaRightRef} className="hidden text-right font-mono text-[9px] uppercase tracking-[0.05em] text-muted-gray lg:block md:text-[10px]">
          <p className="mb-1 text-ink">INDEPENDENT DESIGNER / DEVELOPER</p>
          <p>DESIGN · CODE · INTERACTION</p>
        </div>
      </div>
    </section>
  );
};
