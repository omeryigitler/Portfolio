import React, { useEffect, useRef } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { gsap } from 'gsap';

const PROCESS = [
  { number: '01', title: 'DISCOVER', detail: 'What should exist?' },
  { number: '02', title: 'DESIGN', detail: 'How should it feel?' },
  { number: '03', title: 'BUILD', detail: 'How should it behave?' },
  { number: '04', title: 'SHIP', detail: 'Make it real.' },
];

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const kickerRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const metaRightRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const processLineRef = useRef<HTMLDivElement>(null);
  const processRowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (
      !heroRef.current ||
      !labelRef.current ||
      !kickerRef.current ||
      !line1Ref.current ||
      !line2Ref.current ||
      !descriptionRef.current ||
      !ctaRef.current ||
      !metaRightRef.current ||
      !processRef.current ||
      !processLineRef.current
    ) return;

    const rows = processRowsRef.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) return;

      gsap.set([labelRef.current, kickerRef.current, line1Ref.current, line2Ref.current], {
        autoAlpha: 0,
        yPercent: 105,
      });
      gsap.set([descriptionRef.current, ctaRef.current, metaRightRef.current], {
        autoAlpha: 0,
        y: 14,
      });
      gsap.set(processRef.current, { autoAlpha: 0, x: 26 });
      gsap.set(processLineRef.current, { scaleY: 0, transformOrigin: 'top center' });
      gsap.set(rows, { autoAlpha: 0, x: 18 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro.to(labelRef.current, { autoAlpha: 1, yPercent: 0, duration: 0.4 }, 0.08);
      intro.to(kickerRef.current, { autoAlpha: 1, yPercent: 0, duration: 0.42 }, 0.14);
      intro.to(line1Ref.current, { autoAlpha: 1, yPercent: 0, duration: 0.68 }, 0.26);
      intro.to(line2Ref.current, { autoAlpha: 1, yPercent: 0, duration: 0.68 }, 0.38);
      intro.to(descriptionRef.current, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.72);
      intro.to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.84);
      intro.to(processRef.current, { autoAlpha: 1, x: 0, duration: 0.62 }, 0.5);
      intro.to(processLineRef.current, { scaleY: 1, duration: 0.8, ease: 'power3.inOut' }, 0.56);
      intro.to(rows, { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.1 }, 0.66);
      intro.to(metaRightRef.current, { autoAlpha: 1, y: 0, duration: 0.4 }, 1.02);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[calc(100svh-24px)] w-full scroll-mt-3 overflow-hidden rounded-[10px] bg-canvas px-5 pb-7 pt-7 shadow-[0_20px_70px_rgba(17,17,17,0.07)] md:min-h-[calc(100svh-48px)] md:scroll-mt-6 md:px-12 md:pb-10 md:pt-10 lg:px-14"
    >
      <div className="mx-auto grid min-h-[calc(100svh-80px)] w-full max-w-[1540px] grid-rows-[auto_1fr_auto] md:min-h-[calc(100svh-104px)]">
        <div className="flex items-center justify-between gap-6 overflow-hidden font-mono text-[9px] uppercase tracking-[0.06em] md:text-[10px]">
          <div className="flex items-center gap-4">
            <span ref={labelRef} className="text-muted-gray">01 / INTRO</span>
            <span className="h-px w-8 bg-soft-gray" aria-hidden="true" />
            <span ref={kickerRef} className="text-ink">DESIGN + CODE + INTERACTION</span>
          </div>
          <span className="hidden text-muted-gray md:block">INDEPENDENT / 2026</span>
        </div>

        <div className="grid items-center gap-14 py-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)] lg:gap-20 lg:py-10 xl:gap-28">
          <div className="relative z-10">
            <h1 className="w-full text-[clamp(54px,6.15vw,116px)] font-[500] leading-[0.88] tracking-[-0.052em] text-ink [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal]">
              <span className="block overflow-hidden">
                <span ref={line1Ref} className="block">
                  digital experiences
                </span>
              </span>
              <span className="mt-2 block overflow-hidden md:mt-3">
                <span ref={line2Ref} className="block">
                  worth remembering<span className="text-acid">.</span>
                </span>
              </span>
            </h1>

            <div className="mt-9 grid max-w-[760px] gap-7 border-t border-ink/10 pt-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-10">
              <p ref={descriptionRef} className="max-w-[590px] text-[15px] leading-[1.55] tracking-[-0.02em] text-ink/72 md:text-[17px]">
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

          <div ref={processRef} className="relative mx-auto w-full max-w-[470px] lg:mx-0 lg:ml-auto">
            <div className="mb-7 flex items-end justify-between border-b border-ink/10 pb-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.07em] text-muted-gray md:text-[10px]">FROM IDEA TO LIVE EXPERIENCE</p>
                <p className="mt-2 max-w-[300px] text-[16px] leading-[1.4] tracking-[-0.025em] text-ink md:text-[18px]">
                  One continuous process, not separate handoffs.
                </p>
              </div>
              <span className="h-2 w-2 bg-acid" aria-hidden="true" />
            </div>

            <div className="relative pl-8 md:pl-10">
              <div className="absolute bottom-0 left-[5px] top-0 w-px bg-ink/10" aria-hidden="true" />
              <div ref={processLineRef} className="absolute left-[5px] top-0 h-full w-px bg-acid" aria-hidden="true" />

              <div className="divide-y divide-ink/10 border-b border-ink/10 border-t border-ink/10">
                {PROCESS.map((step, index) => (
                  <div
                    key={step.number}
                    ref={(el) => { processRowsRef.current[index] = el; }}
                    className="group relative grid min-h-[86px] grid-cols-[42px_minmax(0,1fr)] items-center gap-4 py-4 md:min-h-[94px]"
                  >
                    <span className="font-mono text-[9px] tracking-[0.06em] text-muted-gray md:text-[10px]">{step.number}</span>
                    <div className="flex items-center justify-between gap-5">
                      <span className="text-[clamp(28px,3vw,46px)] font-[500] leading-none tracking-[-0.05em] text-ink transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:translate-x-1.5">
                        {step.title}
                      </span>
                      <span className="max-w-[120px] text-right font-mono text-[8px] uppercase leading-[1.45] tracking-[0.05em] text-muted-gray md:text-[9px]">
                        {step.detail}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
              <span>STRATEGY → INTERFACE → CODE</span>
              <span>END TO END</span>
            </div>
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
