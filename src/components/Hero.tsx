import React, { useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROOF_POINTS = [
  ['01', 'CUSTOM DESIGN', 'NO TEMPLATES'],
  ['02', 'PRODUCTION CODE', 'BUILT TO SHIP'],
  ['03', 'MOTION WITH PURPOSE', 'NOT DECORATION'],
  ['04', 'BUILT TO LAST', 'FAST / RESPONSIVE'],
] as const;

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!heroRef.current || !mainRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set('.hero-top', { autoAlpha: 0, y: 8 });
      gsap.set('.hero-status', { autoAlpha: 0, y: 10 });
      gsap.set('.hero-title-line > span', { yPercent: 110 });
      gsap.set('.hero-support', { autoAlpha: 0, y: 14 });
      gsap.set('.hero-proof-row', { autoAlpha: 0, y: 10 });
      gsap.set('.hero-actions', { autoAlpha: 0, y: 12 });
      gsap.set('.hero-meta', { autoAlpha: 0, y: 8 });
      gsap.set(accentRef.current, { scaleX: 0, transformOrigin: '0% 50%' });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });

      intro.to('.hero-top', { autoAlpha: 1, y: 0, duration: 0.42 }, 0.04);
      intro.to('.hero-status', { autoAlpha: 1, y: 0, duration: 0.42 }, 0.12);
      intro.to(
        '.hero-title-line > span',
        { yPercent: 0, duration: 0.78, stagger: 0.075 },
        0.18,
      );
      intro.to(accentRef.current, { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, 0.58);
      intro.to('.hero-support', { autoAlpha: 1, y: 0, duration: 0.46 }, 0.64);
      intro.to('.hero-proof-row', { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.055 }, 0.7);
      intro.to('.hero-actions', { autoAlpha: 1, y: 0, duration: 0.46 }, 0.84);
      intro.to('.hero-meta', { autoAlpha: 1, y: 0, duration: 0.42 }, 0.96);

      gsap.to(mainRef.current, {
        y: -18,
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
            <span className="text-ink">ÖMER YİĞİTLER / DESIGN + DEVELOPMENT</span>
          </div>
          <span className="hidden text-muted-gray md:block">MALTA / WORKING WORLDWIDE / 2026</span>
        </div>

        <div ref={mainRef} className="grid content-center gap-10 py-10 lg:grid-cols-12 lg:gap-x-10 lg:py-6 xl:gap-x-16">
          <div className="lg:col-span-9 xl:col-span-9">
            <div className="hero-status mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[9px] uppercase tracking-[0.075em] text-muted-gray md:text-[10px]">
              <span className="inline-flex items-center gap-2 text-ink">
                <span className="h-[6px] w-[6px] rounded-full bg-acid" aria-hidden="true" />
                STATUS / ACCEPTING SELECTED PROJECTS
              </span>
              <span className="hidden h-px w-10 bg-soft-gray md:block" aria-hidden="true" />
              <span>INDEPENDENT DESIGNER + DEVELOPER</span>
            </div>

            <h1 className="max-w-[1180px] text-[clamp(52px,6.9vw,126px)] font-[560] leading-[0.86] tracking-[-0.062em] text-ink [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal]">
              <span className="hero-title-line block overflow-hidden pb-[0.07em]"><span className="block">I design &amp; build</span></span>
              <span className="hero-title-line block overflow-hidden pb-[0.07em]"><span className="block">distinctive websites</span></span>
              <span className="hero-title-line block overflow-hidden pb-[0.07em]"><span className="block">for brands that</span></span>
              <span className="hero-title-line block overflow-hidden pb-[0.15em]">
                <span className="relative inline-block">
                  care about detail.
                  <span
                    ref={accentRef}
                    className="absolute bottom-[0.02em] left-0 h-[0.06em] w-[44%] rounded-full bg-acid"
                    aria-hidden="true"
                  />
                </span>
              </span>
            </h1>

            <div className="mt-7 grid gap-7 border-t border-ink/10 pt-5 md:grid-cols-12 md:gap-6 lg:mt-8">
              <p className="hero-support max-w-[760px] text-[14px] leading-[1.58] tracking-[-0.02em] text-ink/68 md:col-span-8 md:text-[17px]">
                Custom-designed and developed from direction to production — focused on clarity, speed, interaction and longevity.
              </p>

              <div className="hero-actions flex flex-wrap items-start gap-x-7 gap-y-4 md:col-span-4 md:justify-end">
                <a href="#work" className="group inline-flex items-center gap-3 text-[11px] font-[600] uppercase tracking-[0.01em] text-ink">
                  <span className="relative pb-1">
                    VIEW SELECTED WORK
                    <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-acid transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <ArrowDownRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
                </a>

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

          <aside className="flex flex-col justify-end lg:col-span-3 xl:col-span-3">
            <div className="border-b border-ink/10">
              {PROOF_POINTS.map(([number, label, note]) => (
                <div
                  key={number}
                  className="hero-proof-row group grid grid-cols-[28px_1fr] gap-3 border-t border-ink/10 py-4 md:py-5"
                >
                  <span className="font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">{number}</span>
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[13px] font-[600] uppercase tracking-[-0.01em] text-ink md:text-[14px]">{label}</p>
                      <span className="h-px w-0 bg-acid transition-[width] duration-300 ease-[0.16,1,0.3,1] group-hover:w-7" aria-hidden="true" />
                    </div>
                    <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.065em] text-muted-gray md:text-[8px]">{note}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="hero-support mt-5 max-w-[260px] font-mono text-[8px] uppercase leading-[1.55] tracking-[0.06em] text-muted-gray md:text-[9px]">
              ONE PARTNER / FROM FIRST DIRECTION TO WORKING PRODUCT.
            </p>
          </aside>
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
