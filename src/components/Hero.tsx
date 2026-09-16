import React, { useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../data';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !mediaRef.current || !cardRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set('.hero-kicker', { autoAlpha: 0, y: 10 });
      gsap.set('.hero-card', { autoAlpha: 0, y: 26, scale: 0.985 });
      gsap.set('.hero-card-title-line > span', { yPercent: 108 });
      gsap.set('.hero-foot', { autoAlpha: 0, y: 10 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro.to('.hero-kicker', { autoAlpha: 1, y: 0, duration: 0.55 }, 0.08);
      intro.to('.hero-card', { autoAlpha: 1, y: 0, scale: 1, duration: 0.78 }, 0.16);
      intro.to(
        '.hero-card-title-line > span',
        { yPercent: 0, duration: 0.82, stagger: 0.085 },
        0.34,
      );
      intro.to('.hero-foot', { autoAlpha: 1, y: 0, duration: 0.5 }, 0.68);

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.9,
        },
      });

      scrollTl.to(
        mediaRef.current,
        { scale: 1.085, yPercent: 5, ease: 'none' },
        0,
      );
      scrollTl.to(
        cardRef.current,
        { yPercent: -22, scale: 0.94, autoAlpha: 0.16, ease: 'none' },
        0,
      );
      scrollTl.to('.hero-kicker', { y: -22, autoAlpha: 0, ease: 'none' }, 0);
      scrollTl.to('.hero-foot', { y: -14, autoAlpha: 0, ease: 'none' }, 0.05);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const heroProject = PROJECTS[0];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[calc(100svh-24px)] w-full scroll-mt-3 overflow-hidden bg-[#090909] text-white md:min-h-[calc(100svh-48px)] md:scroll-mt-6"
    >
      <div ref={mediaRef} className="absolute -inset-[4%] will-change-transform">
        <img
          src={heroProject.coverImage}
          alt=""
          className={`h-full w-full ${heroProject.coverFit === 'contain' ? 'object-contain' : 'object-cover'} opacity-[0.34] grayscale-[0.18]`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,4,4,0.78)_0%,rgba(4,4,4,0.48)_52%,rgba(4,4,4,0.68)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.05)_52%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      <div className="hero-kicker absolute inset-x-5 top-6 z-20 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.08em] text-white/65 md:inset-x-12 md:top-9 md:text-[9px] lg:inset-x-14">
        <span>ÖMER YİĞİTLER</span>
        <span className="hidden md:inline">INDEPENDENT DESIGNER + DEVELOPER / 2026</span>
        <span>MALTA</span>
      </div>

      <div className="relative z-10 flex min-h-[calc(100svh-24px)] items-center px-5 py-24 md:min-h-[calc(100svh-48px)] md:px-12 lg:px-14">
        <div
          ref={cardRef}
          className="hero-card relative ml-[1vw] flex aspect-[1/1.03] w-[min(88vw,520px)] flex-col justify-between bg-[#f6f5f1] p-5 text-[#111] shadow-[0_30px_100px_rgba(0,0,0,0.22)] md:ml-[4vw] md:w-[min(42vw,560px)] md:p-6 lg:ml-[5vw] lg:w-[min(35vw,590px)]"
        >
          <div className="flex items-start justify-between gap-6 text-[10px] tracking-[-0.015em] text-black/58 md:text-[11px]">
            <span>Ömer Yiğitler</span>
            <span>Based in Malta</span>
          </div>

          <div>
            <div className="mb-2 flex items-end justify-between gap-6 text-[9px] tracking-[-0.01em] text-black/55 md:text-[10px]">
              <span>Independent Designer + Developer</span>
              <span className="font-mono">(01*)</span>
            </div>

            <h1 className="text-[clamp(38px,4.35vw,74px)] font-[560] leading-[0.82] tracking-[-0.067em]">
              <span className="hero-card-title-line block overflow-hidden pb-[0.07em]"><span className="block">Digital experiences</span></span>
              <span className="hero-card-title-line block overflow-hidden pb-[0.07em]"><span className="block">with character,</span></span>
              <span className="hero-card-title-line block overflow-hidden pb-[0.11em]"><span className="block">clarity &amp; precision.</span></span>
            </h1>
          </div>
        </div>
      </div>

      <div className="hero-foot absolute inset-x-5 bottom-5 z-20 grid items-end gap-5 md:inset-x-12 md:bottom-8 md:grid-cols-[1fr_auto_1fr] lg:inset-x-14">
        <div className="hidden max-w-[330px] font-mono text-[8px] uppercase leading-[1.45] tracking-[0.065em] text-white/58 md:block">
          DESIGNING AND BUILDING DISTINCTIVE WEBSITES, DIGITAL PRODUCTS AND INTERACTIVE SYSTEMS.
        </div>

        <a
          href="#work"
          className="group inline-flex items-center justify-self-start gap-3 font-mono text-[8px] uppercase tracking-[0.075em] text-white/72 transition-colors hover:text-white md:justify-self-center md:text-[9px]"
        >
          SCROLL TO SELECTED WORK
          <ArrowDownRight size={13} className="transition-transform duration-300 group-hover:translate-y-0.5" />
        </a>

        <a
          href="#contact"
          className="group hidden items-center justify-self-end gap-3 text-[10px] font-[600] uppercase tracking-[0.01em] text-white md:inline-flex"
        >
          START A PROJECT
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
};
