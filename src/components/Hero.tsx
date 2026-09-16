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
  const mainRef = useRef<HTMLDivElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const titleOverlayRef = useRef<HTMLHeadingElement>(null);
  const lightWashRef = useRef<HTMLSpanElement>(null);
  const spotRef = useRef({ x: 14, y: 50 });

  const paintSpot = () => {
    if (!titleWrapRef.current) return;
    titleWrapRef.current.style.setProperty('--spot-x', `${spotRef.current.x}%`);
    titleWrapRef.current.style.setProperty('--spot-y', `${spotRef.current.y}%`);
  };

  useEffect(() => {
    if (!heroRef.current || !mainRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    paintSpot();

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set('.hero-top', { autoAlpha: 0, y: 8 });
      gsap.set('.hero-status', { autoAlpha: 0, y: 10 });
      gsap.set('.hero-title-line > span', { yPercent: 112 });
      gsap.set('.hero-title-overlay-line > span', { yPercent: 112 });
      gsap.set('.hero-support', { autoAlpha: 0, y: 12 });
      gsap.set('.hero-actions', { autoAlpha: 0, y: 12 });
      gsap.set('.hero-meta', { autoAlpha: 0, y: 8 });
      gsap.set(titleOverlayRef.current, { autoAlpha: 0 });
      gsap.set(lightWashRef.current, { autoAlpha: 0 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });

      intro.to('.hero-top', { autoAlpha: 1, y: 0, duration: 0.42 }, 0.04);
      intro.to('.hero-status', { autoAlpha: 1, y: 0, duration: 0.42 }, 0.12);
      intro.to(
        ['.hero-title-line > span', '.hero-title-overlay-line > span'],
        { yPercent: 0, duration: 0.84, stagger: 0.055 },
        0.18,
      );
      intro.to('.hero-support', { autoAlpha: 1, y: 0, duration: 0.48 }, 0.62);
      intro.to('.hero-actions', { autoAlpha: 1, y: 0, duration: 0.46 }, 0.72);
      intro.to('.hero-meta', { autoAlpha: 1, y: 0, duration: 0.42 }, 0.82);

      gsap.to(mainRef.current, {
        y: -14,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.7,
        },
      });
    }, heroRef);

    return () => {
      gsap.killTweensOf(spotRef.current);
      ctx.revert();
    };
  }, []);

  const handleTitleEnter = () => {
    if (!titleOverlayRef.current || !lightWashRef.current) return;

    gsap.killTweensOf(spotRef.current);
    spotRef.current.x = 10;
    spotRef.current.y = 48;
    paintSpot();

    gsap.to(titleOverlayRef.current, {
      autoAlpha: 0.34,
      duration: 0.36,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    gsap.to(lightWashRef.current, {
      autoAlpha: 1,
      duration: 0.42,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    gsap.to(spotRef.current, {
      x: 90,
      y: 52,
      duration: 2.35,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      overwrite: 'auto',
      onUpdate: paintSpot,
    });
  };

  const handleTitleLeave = () => {
    gsap.killTweensOf(spotRef.current);

    gsap.to(spotRef.current, {
      x: 50,
      y: 50,
      duration: 0.65,
      ease: 'power3.out',
      overwrite: 'auto',
      onUpdate: paintSpot,
    });

    if (titleOverlayRef.current) {
      gsap.to(titleOverlayRef.current, {
        autoAlpha: 0,
        duration: 0.42,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (lightWashRef.current) {
      gsap.to(lightWashRef.current, {
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
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
            <span className="text-ink">ÖMER YİĞİTLER / INDEPENDENT DESIGNER + DEVELOPER</span>
          </div>
          <span className="hidden text-muted-gray md:block">MALTA / WORKING WORLDWIDE / 2026</span>
        </div>

        <div ref={mainRef} className="flex flex-col justify-center py-9 md:py-10 lg:py-5">
          <div className="hero-status mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[9px] uppercase tracking-[0.075em] text-muted-gray md:text-[10px]">
            <span className="inline-flex items-center gap-2 text-ink">
              <span className="h-[6px] w-[6px] rounded-full bg-acid" aria-hidden="true" />
              ACCEPTING SELECTED PROJECTS
            </span>
            <span className="hidden h-px w-10 bg-soft-gray md:block" aria-hidden="true" />
            <span>DESIGN / DEVELOPMENT / INTERACTION</span>
          </div>

          <div
            ref={titleWrapRef}
            onMouseEnter={handleTitleEnter}
            onMouseLeave={handleTitleLeave}
            className="relative isolate cursor-default [--spot-x:14%] [--spot-y:50%]"
          >
            <span
              ref={lightWashRef}
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-[7%] -inset-y-[24%] z-0"
              style={{
                background:
                  'radial-gradient(ellipse 24% 52% at var(--spot-x) var(--spot-y), rgba(239,255,0,0.11) 0%, rgba(246,247,220,0.09) 30%, rgba(255,255,255,0) 72%)',
                filter: 'blur(18px)',
              }}
            />

            <h1 className="relative z-10 select-none text-[clamp(54px,7.3vw,138px)] font-[560] leading-[0.84] tracking-[-0.066em] text-ink [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal]">
              {TITLE_LINES.map((line) => (
                <span key={line} className="hero-title-line block overflow-hidden pb-[0.075em] last:pb-[0.12em]">
                  <span className="block">{line}</span>
                </span>
              ))}
            </h1>

            <h1
              ref={titleOverlayRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 select-none text-[clamp(54px,7.3vw,138px)] font-[560] leading-[0.84] tracking-[-0.066em] text-transparent [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal]"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse 21% 56% at var(--spot-x) var(--spot-y), rgba(239,255,0,0.95) 0%, rgba(179,191,0,0.62) 16%, rgba(17,17,17,0.28) 32%, rgba(17,17,17,0) 61%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {TITLE_LINES.map((line) => (
                <span key={line} className="hero-title-overlay-line block overflow-hidden pb-[0.075em] last:pb-[0.12em]">
                  <span className="block">{line}</span>
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

        <div className="hero-meta flex items-end justify-between gap-8 border-t border-ink/8 pt-5 font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
          <span>ART DIRECTION / INTERFACE / FRONTEND / MOTION</span>
          <span className="hidden items-center gap-3 md:flex">
            <span className="h-[5px] w-[5px] rounded-full bg-acid" aria-hidden="true" />
            SCROLL TO SELECTED WORK ↓
          </span>
        </div>
      </div>
    </section>
  );
};
