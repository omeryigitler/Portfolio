import React, { useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CRAFT_POINTS = [
  ['01', 'TYPOGRAPHY-LED DESIGN', 'TYPE / RHYTHM / HIERARCHY'],
  ['02', 'BESPOKE INTERACTIONS', 'MOTION / FEEDBACK / DETAIL'],
  ['03', 'PRODUCTION-READY CODE', 'FAST / RESPONSIVE / BUILT TO SHIP'],
] as const;

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const stringPathRef = useRef<SVGPathElement>(null);
  const stringDotRef = useRef<SVGCircleElement>(null);
  const stringStateRef = useRef({ x: 500, y: 24 });

  const renderString = () => {
    const path = stringPathRef.current;
    const dot = stringDotRef.current;
    const { x, y } = stringStateRef.current;

    if (path) path.setAttribute('d', `M 0 24 Q ${x} ${y} 1000 24`);
    if (dot) {
      dot.setAttribute('cx', String(x));
      dot.setAttribute('cy', String((24 + y) / 2));
    }
  };

  useEffect(() => {
    if (!heroRef.current || !mainRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    renderString();

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set('.hero-top', { autoAlpha: 0, y: 8 });
      gsap.set('.hero-status', { autoAlpha: 0, y: 10 });
      gsap.set('.hero-title-line > span', { yPercent: 110 });
      gsap.set('.hero-string', { autoAlpha: 0, scaleX: 0, transformOrigin: '0% 50%' });
      gsap.set('.hero-support', { autoAlpha: 0, y: 14 });
      gsap.set('.hero-craft-row', { autoAlpha: 0, y: 10 });
      gsap.set('.hero-actions', { autoAlpha: 0, y: 12 });
      gsap.set('.hero-meta', { autoAlpha: 0, y: 8 });
      gsap.set(stringDotRef.current, { autoAlpha: 0 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });

      intro.to('.hero-top', { autoAlpha: 1, y: 0, duration: 0.42 }, 0.04);
      intro.to('.hero-status', { autoAlpha: 1, y: 0, duration: 0.42 }, 0.12);
      intro.to(
        '.hero-title-line > span',
        { yPercent: 0, duration: 0.8, stagger: 0.085 },
        0.18,
      );
      intro.to('.hero-string', { autoAlpha: 1, scaleX: 1, duration: 0.82, ease: 'power3.inOut' }, 0.56);
      intro.to('.hero-support', { autoAlpha: 1, y: 0, duration: 0.46 }, 0.66);
      intro.to('.hero-craft-row', { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.055 }, 0.72);
      intro.to('.hero-actions', { autoAlpha: 1, y: 0, duration: 0.46 }, 0.84);
      intro.to('.hero-meta', { autoAlpha: 1, y: 0, duration: 0.42 }, 0.96);

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

  const handleStringMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const py = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    const nextX = px * 1000;
    const nextY = 24 + (py - 0.5) * 34;

    gsap.to(stringStateRef.current, {
      x: nextX,
      y: nextY,
      duration: 0.16,
      ease: 'power2.out',
      overwrite: 'auto',
      onUpdate: renderString,
    });

    if (stringDotRef.current) {
      gsap.to(stringDotRef.current, { autoAlpha: 1, duration: 0.18, overwrite: 'auto' });
    }
  };

  const handleStringLeave = () => {
    gsap.to(stringStateRef.current, {
      x: 500,
      y: 24,
      duration: 1.05,
      ease: 'elastic.out(1, 0.28)',
      overwrite: 'auto',
      onUpdate: renderString,
    });

    if (stringDotRef.current) {
      gsap.to(stringDotRef.current, { autoAlpha: 0, duration: 0.42, delay: 0.16, overwrite: 'auto' });
    }
  };

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

        <div ref={mainRef} className="flex flex-col justify-center py-9 md:py-10 lg:py-5">
          <div className="hero-status mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[9px] uppercase tracking-[0.075em] text-muted-gray md:text-[10px]">
            <span className="inline-flex items-center gap-2 text-ink">
              <span className="h-[6px] w-[6px] rounded-full bg-acid" aria-hidden="true" />
              STATUS / ACCEPTING SELECTED PROJECTS
            </span>
            <span className="hidden h-px w-10 bg-soft-gray md:block" aria-hidden="true" />
            <span>INDEPENDENT DESIGNER + DEVELOPER</span>
          </div>

          <h1 className="max-w-[1320px] text-[clamp(54px,7.15vw,132px)] font-[560] leading-[0.855] tracking-[-0.064em] text-ink [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal]">
            <span className="hero-title-line block overflow-hidden pb-[0.07em]"><span className="block">Websites built with</span></span>
            <span className="hero-title-line block overflow-hidden pb-[0.07em]"><span className="block">an uncomfortable</span></span>
            <span className="hero-title-line block overflow-hidden pb-[0.08em]"><span className="block">amount of detail.</span></span>
          </h1>

          <div
            className="hero-string relative mt-3 h-12 w-full cursor-crosshair md:mt-5 md:h-14"
            onMouseMove={handleStringMove}
            onMouseLeave={handleStringLeave}
            aria-hidden="true"
          >
            <svg viewBox="0 0 1000 48" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
              <path
                ref={stringPathRef}
                d="M 0 24 Q 500 24 1000 24"
                fill="none"
                stroke="rgba(17,17,17,0.18)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <circle ref={stringDotRef} cx="500" cy="24" r="3.1" fill="#EFFF00" />
            </svg>
          </div>

          <div className="grid gap-8 pt-1 md:grid-cols-12 md:gap-6 lg:pt-2">
            <div className="hero-support md:col-span-6 lg:col-span-5">
              <p className="max-w-[720px] text-[15px] leading-[1.58] tracking-[-0.022em] text-ink/72 md:text-[17px]">
                I design and develop distinctive digital experiences — combining art direction, interaction and production-ready code.
              </p>
              <p className="mt-4 max-w-[520px] font-mono text-[8px] uppercase leading-[1.55] tracking-[0.06em] text-muted-gray md:text-[9px]">
                ONE PARTNER / FROM FIRST DIRECTION TO WORKING PRODUCT.
              </p>
            </div>

            <div className="md:col-span-3 lg:col-span-4 lg:grid lg:grid-cols-3 lg:gap-5">
              {CRAFT_POINTS.map(([number, label, note]) => (
                <div key={number} className="hero-craft-row border-t border-ink/10 py-3.5 lg:py-4">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">{number}</span>
                    <div>
                      <p className="text-[11px] font-[650] uppercase leading-[1.2] tracking-[0.005em] text-ink md:text-[12px]">{label}</p>
                      <p className="mt-1.5 font-mono text-[7px] uppercase leading-[1.45] tracking-[0.06em] text-muted-gray md:text-[8px]">{note}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hero-actions flex flex-wrap items-end gap-x-7 gap-y-4 md:col-span-3 md:justify-end lg:col-span-3">
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
