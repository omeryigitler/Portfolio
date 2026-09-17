import React, { useEffect, useRef } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { gsap } from 'gsap';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const kickerRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const metaRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !heroRef.current ||
      !labelRef.current ||
      !kickerRef.current ||
      !line1Ref.current ||
      !line2Ref.current ||
      !descriptionRef.current ||
      !ctaRef.current ||
      !metaRightRef.current
    ) return;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) return;

      gsap.set([labelRef.current, kickerRef.current], { autoAlpha: 0, y: 14 });
      gsap.set([line1Ref.current, line2Ref.current], { autoAlpha: 0, y: 54 });
      gsap.set([descriptionRef.current, ctaRef.current, metaRightRef.current], {
        autoAlpha: 0,
        y: 14,
      });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro.to(labelRef.current, { autoAlpha: 1, y: 0, duration: 0.38 }, 0.06);
      intro.to(kickerRef.current, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.12);
      intro.to(line1Ref.current, { autoAlpha: 1, y: 0, duration: 0.72 }, 0.24);
      intro.to(line2Ref.current, { autoAlpha: 1, y: 0, duration: 0.72 }, 0.36);
      intro.to(descriptionRef.current, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.72);
      intro.to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.82);
      intro.to(metaRightRef.current, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.96);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[calc(100svh-24px)] w-full scroll-mt-3 bg-canvas px-5 pb-7 pt-7 md:min-h-[calc(100svh-48px)] md:scroll-mt-6 md:px-12 md:pb-10 md:pt-10 lg:px-14"
    >
      <div className="mx-auto grid min-h-[calc(100svh-80px)] w-full max-w-[1580px] grid-rows-[auto_1fr_auto] md:min-h-[calc(100svh-104px)]">
        <div className="flex items-center justify-between gap-6 font-mono text-[9px] uppercase tracking-[0.06em] md:text-[10px]">
          <div className="flex items-center gap-4">
            <span ref={labelRef} className="text-muted-gray">01 / INTRO</span>
            <span className="h-px w-8 bg-soft-gray" aria-hidden="true" />
            <span ref={kickerRef} className="text-ink">DESIGN + CODE + INTERACTION</span>
          </div>
          <span className="hidden text-muted-gray md:block">INDEPENDENT / 2026</span>
        </div>

        <div className="flex flex-col justify-center py-12 md:py-16 lg:py-10">
          <h1 className="w-full text-[clamp(58px,8.1vw,154px)] font-[500] leading-[0.88] tracking-[-0.055em] text-ink [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal]">
            <span ref={line1Ref} className="block pb-[0.07em] md:whitespace-nowrap">
              digital experiences
            </span>
            <span ref={line2Ref} className="mt-[-0.04em] block pb-[0.16em] md:whitespace-nowrap">
              worth remembering<span className="text-acid">.</span>
            </span>
          </h1>

          <div className="mt-5 grid gap-7 border-t border-ink/10 pt-6 md:mt-7 md:grid-cols-[minmax(0,660px)_auto] md:items-end md:justify-between md:gap-10">
            <p ref={descriptionRef} className="max-w-[650px] text-[15px] leading-[1.55] tracking-[-0.02em] text-ink/72 md:text-[17px]">
              I design and build websites, digital products and interactive experiences — from the first idea to the final line of code.
            </p>

            <a
              ref={ctaRef}
              href="#work"
              className="group inline-flex w-fit items-center gap-3 text-[11px] font-[600] uppercase tracking-[0.01em] text-ink focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-4"
            >
              <span className="relative pb-1">
                VIEW SELECTED WORK
                <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-acid transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:scale-x-100" />
              </span>
              <ArrowDownRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>
          </div>
        </div>

        <div className="flex items-end justify-between gap-8 border-t border-ink/8 pt-5 font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
          <span>WEB DESIGN / DEVELOPMENT / INTERACTION</span>
          <div ref={metaRightRef} className="hidden text-right lg:block">
            <p className="mb-1 text-ink">INDEPENDENT DESIGNER / DEVELOPER</p>
            <p>SELECTED WORK / 2026</p>
          </div>
        </div>
      </div>
    </section>
  );
};
