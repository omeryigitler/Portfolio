import React, { useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!heroRef.current || !mainRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set('.hero-top', { autoAlpha: 0, y: 10 });
      gsap.set('.hero-name-line', { autoAlpha: 0, y: 54 });
      gsap.set('.hero-positioning', { autoAlpha: 0, y: 16 });
      gsap.set('.hero-actions', { autoAlpha: 0, y: 14 });
      gsap.set('.hero-meta', { autoAlpha: 0, y: 10 });
      gsap.set(accentRef.current, { scaleX: 0, transformOrigin: '0% 50%' });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro.to('.hero-top', { autoAlpha: 1, y: 0, duration: 0.45 }, 0.05);
      intro.to('.hero-name-line', { autoAlpha: 1, y: 0, duration: 0.82, stagger: 0.09 }, 0.16);
      intro.to(accentRef.current, { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, 0.55);
      intro.to('.hero-positioning', { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.68);
      intro.to('.hero-actions', { autoAlpha: 1, y: 0, duration: 0.46 }, 0.82);
      intro.to('.hero-meta', { autoAlpha: 1, y: 0, duration: 0.42 }, 0.94);

      gsap.to(mainRef.current, {
        y: -22,
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

  const handlePointerMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current || !firstNameRef.current || !lastNameRef.current) return;

    const bounds = heroRef.current.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;

    gsap.to(firstNameRef.current, {
      x: normalizedX * 13,
      y: normalizedY * 4,
      duration: 0.65,
      ease: 'power3.out',
      overwrite: 'auto',
    });

    gsap.to(lastNameRef.current, {
      x: normalizedX * -11,
      y: normalizedY * -3,
      duration: 0.72,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  const handlePointerLeave = () => {
    if (!firstNameRef.current || !lastNameRef.current) return;

    gsap.to([firstNameRef.current, lastNameRef.current], {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative min-h-[calc(100svh-24px)] w-full scroll-mt-3 overflow-hidden rounded-[22px] border border-white/70 bg-canvas px-5 pb-7 pt-7 shadow-[0_24px_80px_rgba(17,17,17,0.065)] md:min-h-[calc(100svh-48px)] md:scroll-mt-6 md:px-12 md:pb-10 md:pt-10 lg:px-14"
    >
      <div className="relative mx-auto grid min-h-[calc(100svh-80px)] w-full max-w-[1580px] grid-rows-[auto_1fr_auto] md:min-h-[calc(100svh-104px)]">
        <div className="hero-top flex items-center justify-between gap-6 font-mono text-[9px] uppercase tracking-[0.06em] md:text-[10px]">
          <div className="flex items-center gap-4">
            <span className="text-muted-gray">01 / INTRO</span>
            <span className="h-px w-8 bg-soft-gray" aria-hidden="true" />
            <span className="text-ink">INDEPENDENT DESIGNER + DEVELOPER</span>
          </div>
          <span className="hidden text-muted-gray md:block">SELECTED WORK / 2026</span>
        </div>

        <div ref={mainRef} className="flex flex-col justify-center py-8 md:py-10 lg:py-4">
          <div className="relative">
            <p className="hero-positioning mb-4 font-mono text-[9px] uppercase tracking-[0.075em] text-muted-gray md:mb-5 md:text-[10px]">
              DESIGN / DEVELOPMENT / INTERACTION
            </p>

            <h1
              aria-label="Ömer Yiğitler"
              className="select-none text-[clamp(76px,13.2vw,245px)] font-[560] leading-[0.73] tracking-[-0.075em] text-ink [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal]"
            >
              <span ref={firstNameRef} className="hero-name-line block will-change-transform">
                ÖMER
              </span>
              <span ref={lastNameRef} className="hero-name-line relative ml-[6.5vw] mt-[0.06em] block pb-[0.11em] will-change-transform md:ml-[9vw]">
                YİĞİTLER
                <span
                  ref={accentRef}
                  className="absolute bottom-[0.015em] left-0 h-[0.055em] w-[42%] rounded-full bg-acid"
                  aria-hidden="true"
                />
              </span>
            </h1>
          </div>

          <div className="mt-8 grid gap-7 border-t border-ink/10 pt-5 md:mt-10 md:grid-cols-12 md:gap-6 lg:mt-8">
            <div className="hero-positioning md:col-span-3">
              <p className="font-mono text-[8px] uppercase tracking-[0.065em] text-muted-gray md:text-[9px]">
                ROLE
              </p>
              <p className="mt-2 max-w-[240px] text-[17px] font-[560] leading-[1.15] tracking-[-0.03em] text-ink md:text-[20px]">
                Independent designer & developer.
              </p>
            </div>

            <div className="hero-positioning md:col-span-5">
              <p className="font-mono text-[8px] uppercase tracking-[0.065em] text-muted-gray md:text-[9px]">
                WHAT I DO
              </p>
              <p className="mt-2 max-w-[620px] text-[14px] leading-[1.55] tracking-[-0.02em] text-ink/68 md:text-[16px]">
                I design and build distinctive websites, digital products and interactive experiences — from direction to working code.
              </p>
            </div>

            <div className="hero-actions flex flex-wrap items-end gap-x-7 gap-y-4 md:col-span-4 md:justify-end">
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
