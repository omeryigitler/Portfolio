import React, { useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';

const TITLE_LINES = [
  'Designing digital',
  'experiences',
  'with character, precision',
  'and code.',
] as const;

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const supportRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !supportRef.current || !actionsRef.current) return;

    const lines = lineRefs.current.filter(Boolean);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(lines, { yPercent: 112 });
      gsap.set([supportRef.current, actionsRef.current], { autoAlpha: 0, y: 14 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro.to(lines, { yPercent: 0, duration: 0.92, stagger: 0.07 }, 0.08);
      intro.to(supportRef.current, { autoAlpha: 1, y: 0, duration: 0.48 }, 0.58);
      intro.to(actionsRef.current, { autoAlpha: 1, y: 0, duration: 0.48 }, 0.68);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[calc(100svh-24px)] w-full scroll-mt-3 bg-canvas px-4 pb-7 pt-2 sm:px-5 md:min-h-[calc(100svh-48px)] md:scroll-mt-6 md:px-7 md:pb-8 md:pt-0 lg:px-7"
    >
      <div className="mx-auto grid min-h-[calc(100svh-64px)] w-full max-w-[1640px] grid-rows-[1fr_auto] md:min-h-[calc(100svh-80px)]">
        <div className="flex items-start pt-0 md:pt-0">
          <h1 className="w-full select-none text-[clamp(56px,8.15vw,146px)] font-[560] leading-[0.84] tracking-[-0.066em] text-ink [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal]">
            {TITLE_LINES.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.075em] last:pb-[0.13em]">
                <span
                  ref={(element) => { lineRefs.current[index] = element; }}
                  className="block md:whitespace-nowrap"
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <div className="grid gap-7 border-t border-ink/10 pt-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-stretch md:gap-0 md:pt-6">
          <div className="flex items-start md:pr-10">
            <p
              ref={supportRef}
              className="max-w-[760px] text-[14px] leading-[1.58] tracking-[-0.02em] text-ink/65 md:text-[16px] lg:text-[17px]"
            >
              Independent designer &amp; developer creating considered websites and interactive systems — from art direction to production code.
            </p>
          </div>

          <div ref={actionsRef} className="grid grid-cols-1 border-ink/10 sm:grid-cols-2 md:min-w-[430px] md:border-l">
            <a
              href="#work"
              className="group flex min-h-[62px] items-center justify-between gap-5 border-t border-ink/10 px-0 text-[10px] font-[600] uppercase tracking-[0.01em] text-ink transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-4 sm:border-t-0 sm:px-7 md:min-h-[76px]"
            >
              <span>VIEW SELECTED WORK</span>
              <ArrowDownRight size={15} strokeWidth={1.5} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>

            <a
              href="#contact"
              className="group flex min-h-[62px] items-center justify-between gap-5 border-t border-ink/10 px-0 text-[10px] font-[600] uppercase tracking-[0.01em] text-ink transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-4 sm:border-l sm:border-t-0 sm:px-7 md:min-h-[76px]"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={15} strokeWidth={1.5} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
