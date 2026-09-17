import React, { useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';

const TITLE_LINES = [
  'Designing digital',
  'experiences',
  'with character, precision',
] as const;

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const metaRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !metaRef.current || !supportRef.current || !actionsRef.current) return;

    const lines = lineRefs.current.filter(Boolean);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(metaRef.current, { autoAlpha: 0, y: 10 });
      gsap.set(lines, { yPercent: 112 });
      gsap.set([supportRef.current, actionsRef.current], { autoAlpha: 0, y: 12 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro.to(metaRef.current, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.04);
      intro.to(lines, { yPercent: 0, duration: 0.88, stagger: 0.065 }, 0.12);
      intro.to(supportRef.current, { autoAlpha: 1, y: 0, duration: 0.46 }, 0.54);
      intro.to(actionsRef.current, { autoAlpha: 1, y: 0, duration: 0.46 }, 0.62);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[calc(100svh-24px)] w-full scroll-mt-3 bg-canvas px-5 pb-7 pt-7 md:min-h-[calc(100svh-48px)] md:scroll-mt-6 md:px-12 md:pb-10 md:pt-10"
    >
      <div className="mx-auto grid min-h-[calc(100svh-80px)] w-full max-w-[1580px] grid-rows-[auto_1fr_auto] md:min-h-[calc(100svh-104px)]">
        <div
          ref={metaRef}
          className="flex items-center justify-between gap-6 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]"
        >
          <div className="flex min-w-0 items-center gap-4">
            <span className="shrink-0 text-ink">01 / INTRO</span>
            <span className="h-px w-8 shrink-0 bg-soft-gray" aria-hidden="true" />
            <span className="truncate">ÖMER YİĞİTLER / DESIGN + DEVELOPMENT</span>
          </div>
          <span className="hidden shrink-0 md:block">MALTA / 2026</span>
        </div>

        <div className="flex flex-col justify-center py-10 md:py-14 lg:py-8">
          <h1 className="w-full select-none text-[clamp(54px,7.35vw,132px)] font-[560] leading-[0.87] tracking-[-0.062em] text-ink [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal]">
            {TITLE_LINES.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span
                  ref={(element) => { lineRefs.current[index] = element; }}
                  className="block md:whitespace-nowrap"
                >
                  {line}
                </span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.12em]">
              <span
                ref={(element) => { lineRefs.current[3] = element; }}
                className="block md:whitespace-nowrap"
              >
                and code<span className="text-acid">.</span>
              </span>
            </span>
          </h1>
        </div>

        <div className="grid gap-6 border-t border-ink/10 pt-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-10 md:pt-6">
          <p
            ref={supportRef}
            className="max-w-[680px] text-[14px] leading-[1.55] tracking-[-0.02em] text-ink/65 md:text-[16px]"
          >
            Independent designer &amp; developer creating considered websites and interactive systems — from art direction to production code.
          </p>

          <div
            ref={actionsRef}
            className="flex flex-col gap-4 font-mono text-[9px] uppercase tracking-[0.04em] text-ink sm:flex-row sm:items-center sm:gap-0 md:text-[10px]"
          >
            <a
              href="#work"
              className="group inline-flex min-h-10 items-center justify-between gap-8 border-t border-ink/10 pt-3 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-4 sm:min-h-0 sm:border-l sm:border-t-0 sm:px-7 sm:pt-0"
            >
              <span>VIEW SELECTED WORK</span>
              <ArrowDownRight size={14} strokeWidth={1.45} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>

            <a
              href="#contact"
              className="group inline-flex min-h-10 items-center justify-between gap-8 border-t border-ink/10 pt-3 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-4 sm:min-h-0 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={14} strokeWidth={1.45} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
