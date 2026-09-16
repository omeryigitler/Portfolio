import React, { useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TITLE_LINES = [
  'Designing digital experiences',
  'with character, precision',
  'and code.',
] as const;

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !titleWrapRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set('.hero-top', { autoAlpha: 0, y: 8 });
      gsap.set('.hero-status', { autoAlpha: 0, y: 10 });
      gsap.set('.hero-title-line > span', { yPercent: 108 });
      gsap.set('.hero-support', { autoAlpha: 0, y: 12 });
      gsap.set('.hero-actions', { autoAlpha: 0, y: 12 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });

      intro.to('.hero-top', { autoAlpha: 1, y: 0, duration: 0.42 }, 0.04);
      intro.to('.hero-status', { autoAlpha: 1, y: 0, duration: 0.42 }, 0.12);
      intro.to(
        '.hero-title-line > span',
        { yPercent: 0, duration: 0.92, stagger: 0.075 },
        0.18,
      );
      intro.to('.hero-support', { autoAlpha: 1, y: 0, duration: 0.5 }, 0.64);
      intro.to('.hero-actions', { autoAlpha: 1, y: 0, duration: 0.48 }, 0.74);

      const lines = gsap.utils.toArray<HTMLElement>('.hero-title-line > span');
      const exit = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom 28%',
          scrub: 1,
        },
      });

      exit.to('.hero-top', { y: -16, autoAlpha: 0.25, ease: 'none' }, 0);
      exit.to('.hero-status', { y: -24, autoAlpha: 0, ease: 'none' }, 0);
      exit.to(titleWrapRef.current, { scale: 0.982, transformOrigin: '0% 40%', ease: 'none' }, 0);

      if (lines[0]) exit.to(lines[0], { x: -42, autoAlpha: 0.18, ease: 'none' }, 0);
      if (lines[1]) exit.to(lines[1], { x: 30, autoAlpha: 0.18, ease: 'none' }, 0);
      if (lines[2]) exit.to(lines[2], { x: -18, autoAlpha: 0.18, ease: 'none' }, 0);

      exit.to('.hero-support', { y: -34, autoAlpha: 0.06, ease: 'none' }, 0);
      exit.to('.hero-actions', { y: -22, autoAlpha: 0.08, ease: 'none' }, 0);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative z-10 min-h-[calc(100svh-24px)] w-full scroll-mt-3 overflow-hidden rounded-t-[21px] bg-canvas px-5 pb-7 pt-7 md:min-h-[calc(100svh-48px)] md:scroll-mt-6 md:px-12 md:pb-10 md:pt-10 lg:px-14"
    >
      <div className="relative mx-auto grid min-h-[calc(100svh-80px)] w-full max-w-[1580px] grid-rows-[auto_1fr] md:min-h-[calc(100svh-104px)]">
        <div className="hero-top flex items-center justify-between gap-6 font-mono text-[9px] uppercase tracking-[0.06em] md:text-[10px]">
          <div className="flex items-center gap-4">
            <span className="text-muted-gray">01 / INTRO</span>
            <span className="h-px w-8 bg-soft-gray" aria-hidden="true" />
            <span className="text-ink">ÖMER YİĞİTLER / INDEPENDENT DESIGNER + DEVELOPER</span>
          </div>
          <span className="hidden text-muted-gray md:block">MALTA / WORKING WORLDWIDE / 2026</span>
        </div>

        <div className="flex flex-col justify-center pb-[11svh] pt-8 md:pb-[13svh] md:pt-10 lg:pt-5">
          <div className="hero-status mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[9px] uppercase tracking-[0.075em] text-muted-gray md:text-[10px]">
            <span className="inline-flex items-center gap-2 text-ink">
              <span className="h-[6px] w-[6px] rounded-full bg-acid" aria-hidden="true" />
              ACCEPTING SELECTED PROJECTS
            </span>
            <span className="hidden h-px w-10 bg-soft-gray md:block" aria-hidden="true" />
            <span>DESIGN / DEVELOPMENT / INTERACTION</span>
          </div>

          <div ref={titleWrapRef} className="relative will-change-transform">
            <h1 className="select-none text-[clamp(54px,7.3vw,138px)] font-[560] leading-[0.84] tracking-[-0.066em] text-ink [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal]">
              {TITLE_LINES.map((line) => (
                <span key={line} className="hero-title-line block overflow-hidden pb-[0.075em] last:pb-[0.12em]">
                  <span className="block will-change-transform">{line}</span>
                </span>
              ))}
            </h1>
          </div>

          <div className="mt-7 grid gap-7 border-t border-ink/10 pt-5 md:mt-8 md:grid-cols-[1.45fr_auto_auto] md:items-end md:gap-0">
            <div className="hero-support pr-6">
              <p className="max-w-[760px] text-[14px] leading-[1.58] tracking-[-0.02em] text-ink/70 md:text-[17px]">
                Independent designer &amp; developer creating considered websites and interactive systems — from art direction to production code.
              </p>
            </div>

            <div className="hero-actions border-ink/10 md:border-l md:px-8">
              <a href="#work" className="group inline-flex items-center gap-3 text-[11px] font-[600] uppercase tracking-[0.01em] text-ink">
                <span className="relative pb-1">
                  VIEW SELECTED WORK
                  <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-acid transition-transform duration-300 group-hover:scale-x-100" />
                </span>
                <ArrowDownRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
              </a>
            </div>

            <div className="hero-actions border-ink/10 md:border-l md:pl-8">
              <a href="#contact" className="group inline-flex items-center gap-3 text-[11px] font-[600] uppercase tracking-[0.01em] text-ink">
                <span className="relative pb-1">
                  START A PROJECT
                  <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-acid transition-transform duration-300 group-hover:scale-x-100" />
                </span>
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
