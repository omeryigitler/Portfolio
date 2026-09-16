import React, { useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DISCIPLINES = [
  ['01', 'ART DIRECTION', 'VISUAL LANGUAGE / TYPE / RHYTHM'],
  ['02', 'INTERFACE DESIGN', 'SYSTEMS / UX / RESPONSIVE'],
  ['03', 'FRONTEND', 'REACT / TYPESCRIPT / PRODUCTION'],
  ['04', 'INTERACTION', 'MOTION / FEEDBACK / POLISH'],
] as const;

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const railMarkerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!heroRef.current || !mainRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set('.hero-top', { autoAlpha: 0, y: 8 });
      gsap.set('.hero-status', { autoAlpha: 0, y: 10 });
      gsap.set('.hero-title-line > span', { yPercent: 112 });
      gsap.set('.hero-system', { autoAlpha: 0, y: 16 });
      gsap.set('.hero-discipline-row', { autoAlpha: 0.35 });
      gsap.set('.hero-support', { autoAlpha: 0, y: 12 });
      gsap.set('.hero-actions', { autoAlpha: 0, y: 12 });
      gsap.set('.hero-meta', { autoAlpha: 0, y: 8 });
      gsap.set(railMarkerRef.current, { top: '0%' });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });

      intro.to('.hero-top', { autoAlpha: 1, y: 0, duration: 0.4 }, 0.04);
      intro.to('.hero-status', { autoAlpha: 1, y: 0, duration: 0.4 }, 0.12);
      intro.to(
        '.hero-title-line > span',
        { yPercent: 0, duration: 0.78, stagger: 0.08 },
        0.18,
      );
      intro.to('.hero-system', { autoAlpha: 1, y: 0, duration: 0.64 }, 0.42);

      DISCIPLINES.forEach((_, index) => {
        const position = 0.56 + index * 0.16;
        intro.to(
          `.hero-discipline-row:nth-of-type(${index + 1})`,
          { autoAlpha: 1, x: 4, duration: 0.22, ease: 'power2.out' },
          position,
        );
        intro.to(
          railMarkerRef.current,
          { top: `${index * 33.333}%`, duration: 0.26, ease: 'power2.inOut' },
          position,
        );
        if (index < DISCIPLINES.length - 1) {
          intro.to(
            `.hero-discipline-row:nth-of-type(${index + 1})`,
            { autoAlpha: 0.42, x: 0, duration: 0.3, ease: 'power2.out' },
            position + 0.18,
          );
        }
      });

      intro.to('.hero-support', { autoAlpha: 1, y: 0, duration: 0.46 }, 0.78);
      intro.to('.hero-actions', { autoAlpha: 1, y: 0, duration: 0.46 }, 0.9);
      intro.to('.hero-meta', { autoAlpha: 1, y: 0, duration: 0.42 }, 1.02);

      gsap.to(mainRef.current, {
        y: -16,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.7,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[calc(100svh-24px)] w-full scroll-mt-3 overflow-hidden rounded-[22px] border border-white/70 bg-canvas px-5 pb-7 pt-7 shadow-[0_24px_80px_rgba(17,17,17,0.065)] md:min-h-[calc(100svh-48px)] md:scroll-mt-6 md:px-12 md:pb-10 md:pt-10 lg:px-14"
    >
      <div className="relative mx-auto grid min-h-[calc(100svh-80px)] w-full max-w-[1580px] grid-rows-[auto_1fr_auto] md:min-h-[calc(100svh-104px)]">
        <div className="hero-top flex items-center justify-between gap-6 font-mono text-[9px] uppercase tracking-[0.06em] md:text-[10px]">
          <div className="flex items-center gap-4">
            <span className="text-muted-gray">01 / INTRO</span>
            <span className="h-px w-8 bg-soft-gray" aria-hidden="true" />
            <span className="text-ink">ÖMER YİĞİTLER / INDEPENDENT DESIGNER + DEVELOPER</span>
          </div>
          <span className="hidden text-muted-gray md:block">MALTA / WORKING WORLDWIDE / 2026</span>
        </div>

        <div ref={mainRef} className="grid content-center gap-10 py-10 lg:grid-cols-12 lg:gap-x-12 lg:py-6 xl:gap-x-16">
          <div className="lg:col-span-8 xl:col-span-8">
            <div className="hero-status mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[9px] uppercase tracking-[0.075em] text-muted-gray md:text-[10px]">
              <span className="inline-flex items-center gap-2 text-ink">
                <span className="h-[6px] w-[6px] rounded-full bg-acid" aria-hidden="true" />
                ACCEPTING SELECTED PROJECTS
              </span>
              <span className="hidden h-px w-10 bg-soft-gray md:block" aria-hidden="true" />
              <span>DESIGN / CODE / INTERACTION</span>
            </div>

            <h1 className="max-w-[1080px] text-[clamp(56px,7.1vw,132px)] font-[560] leading-[0.85] tracking-[-0.064em] text-ink [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal]">
              <span className="hero-title-line block overflow-hidden pb-[0.07em]"><span className="block">Websites with</span></span>
              <span className="hero-title-line block overflow-hidden pb-[0.07em]"><span className="block">clarity, character</span></span>
              <span className="hero-title-line block overflow-hidden pb-[0.13em]"><span className="block">&amp; technical precision.</span></span>
            </h1>
          </div>

          <aside className="hero-system flex items-end lg:col-span-4 xl:col-span-4">
            <div className="w-full lg:pl-2 xl:pl-5">
              <div className="mb-4 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.07em] text-muted-gray md:text-[9px]">
                <span>WORKING ACROSS</span>
                <span>04 DISCIPLINES</span>
              </div>

              <div className="relative border-b border-ink/10">
                <span
                  ref={railMarkerRef}
                  className="absolute -left-[1px] z-10 h-10 w-[2px] bg-acid shadow-[0_0_0_1px_rgba(239,255,0,0.08)]"
                  aria-hidden="true"
                />

                {DISCIPLINES.map(([number, label, note]) => (
                  <div
                    key={number}
                    className="hero-discipline-row group grid grid-cols-[30px_1fr] gap-3 border-t border-ink/10 py-4 pl-4 transition-transform duration-300 ease-[0.16,1,0.3,1] hover:translate-x-1 md:py-5"
                  >
                    <span className="font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">{number}</span>
                    <div>
                      <div className="flex items-center justify-between gap-5">
                        <p className="text-[13px] font-[600] uppercase tracking-[-0.01em] text-ink md:text-[14px]">{label}</p>
                        <span className="h-px w-0 bg-acid transition-[width] duration-300 group-hover:w-8" aria-hidden="true" />
                      </div>
                      <p className="mt-1.5 font-mono text-[7px] uppercase leading-[1.5] tracking-[0.06em] text-muted-gray md:text-[8px]">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-12 mt-2 grid gap-7 border-t border-ink/10 pt-5 md:grid-cols-[1.35fr_auto_auto] md:items-center md:gap-0 lg:mt-3">
            <div className="hero-support pr-6">
              <p className="max-w-[790px] text-[14px] leading-[1.58] tracking-[-0.02em] text-ink/70 md:text-[17px]">
                I design and build distinctive digital experiences — combining art direction, interface design and production code into one considered system.
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
              <a href="#contact" className="group inline-flex items-center gap-4 text-[11px] font-[600] uppercase tracking-[0.01em] text-ink">
                <span className="relative pb-1">
                  START A PROJECT
                  <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-acid transition-transform duration-300 group-hover:scale-x-100" />
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-ink/18 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-ink/35">
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-meta flex items-end justify-between gap-8 border-t border-ink/8 pt-5 font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
          <span>WEB DESIGN / DEVELOPMENT / INTERACTION</span>
          <span className="hidden items-center gap-3 md:flex">
            <span className="h-[5px] w-[5px] rounded-full bg-acid" aria-hidden="true" />
            SCROLL TO SELECTED WORK ↓
          </span>
        </div>
      </div>
    </section>
  );
};
