import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../data';

gsap.registerPlugin(ScrollTrigger);

const REEL_PROJECTS = PROJECTS.slice(0, 5);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const reelWordRef = useRef<HTMLSpanElement>(null);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveProject((current) => (current + 1) % REEL_PROJECTS.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!heroRef.current || !mainRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set('.hero-top', { autoAlpha: 0, y: 10 });
      gsap.set('.hero-copy-line', { autoAlpha: 0, y: 42 });
      gsap.set('.hero-reel-shell', { autoAlpha: 0, y: 18, scale: 0.985 });
      gsap.set('.hero-support', { autoAlpha: 0, y: 14 });
      gsap.set('.hero-actions', { autoAlpha: 0, y: 14 });
      gsap.set('.hero-project-meta', { autoAlpha: 0, y: 12 });
      gsap.set('.hero-footer', { autoAlpha: 0, y: 10 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro.to('.hero-top', { autoAlpha: 1, y: 0, duration: 0.45 }, 0.05);
      intro.to('.hero-copy-line', { autoAlpha: 1, y: 0, duration: 0.76, stagger: 0.09 }, 0.18);
      intro.to('.hero-reel-shell', { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 }, 0.48);
      intro.to('.hero-support', { autoAlpha: 1, y: 0, duration: 0.46 }, 0.8);
      intro.to('.hero-actions', { autoAlpha: 1, y: 0, duration: 0.46 }, 0.9);
      intro.to('.hero-project-meta', { autoAlpha: 1, y: 0, duration: 0.42 }, 0.98);
      intro.to('.hero-footer', { autoAlpha: 1, y: 0, duration: 0.42 }, 1.04);

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

      if (reelWordRef.current) {
        gsap.to(reelWordRef.current, {
          scale: 1.08,
          transformOrigin: 'left center',
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const currentProject = REEL_PROJECTS[activeProject];

  const handlePointerMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!reelWordRef.current || !heroRef.current) return;
    const bounds = heroRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 6;
    gsap.to(reelWordRef.current, { x, y, duration: 0.55, ease: 'power3.out', overwrite: 'auto' });
  };

  const handlePointerLeave = () => {
    if (!reelWordRef.current) return;
    gsap.to(reelWordRef.current, { x: 0, y: 0, duration: 0.7, ease: 'power3.out', overwrite: 'auto' });
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
            <span className="text-ink">DESIGN + CODE + INTERACTION</span>
          </div>
          <span className="hidden text-muted-gray md:block">INDEPENDENT DESIGNER + DEVELOPER / 2026</span>
        </div>

        <div ref={mainRef} className="grid content-center gap-8 py-10 lg:grid-cols-12 lg:gap-x-10 lg:py-6">
          <div className="lg:col-span-9 xl:col-span-9">
            <h1
              aria-label="websites should feel alive."
              className="text-[clamp(58px,7.2vw,138px)] font-[560] leading-[0.82] tracking-[-0.062em] text-ink [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal]"
            >
              <span className="hero-copy-line block pb-[0.08em]">websites should</span>
              <span className="hero-copy-line block">feel</span>

              <span ref={reelWordRef} className="hero-reel-shell relative mt-[0.02em] inline-block pb-[0.16em] italic">
                <span aria-hidden="true" className="invisible">alive.</span>

                {REEL_PROJECTS.map((project, index) => (
                  <span
                    key={project.id}
                    aria-hidden="true"
                    className={`absolute inset-0 bg-cover bg-center bg-clip-text text-transparent transition-opacity duration-700 ease-[0.16,1,0.3,1] ${index === activeProject ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      backgroundImage: `url(${project.coverImage})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    alive.
                  </span>
                ))}

                <span
                  aria-hidden="true"
                  className="absolute inset-0 text-transparent"
                  style={{ WebkitTextStroke: '1px rgba(17,17,17,0.14)' }}
                >
                  alive.
                </span>

                <span className="absolute bottom-[0.03em] left-0 right-[-0.02em] -z-10 h-[0.105em] rounded-full bg-acid" aria-hidden="true" />
              </span>
            </h1>
          </div>

          <aside className="hero-project-meta flex flex-col justify-between border-t border-ink/10 pt-4 lg:col-span-3 lg:min-h-[310px] lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-10">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.07em] text-muted-gray md:text-[9px]">NOW SHOWING</p>
              <p className="mt-3 text-[clamp(22px,2vw,34px)] font-[560] leading-[0.96] tracking-[-0.04em] text-ink">
                {currentProject.title}
              </p>
              <p className="mt-3 font-mono text-[8px] uppercase leading-[1.55] tracking-[0.06em] text-muted-gray md:text-[9px]">
                {currentProject.category}<br />
                {currentProject.number} / {String(REEL_PROJECTS.length).padStart(2, '0')}
              </p>
            </div>

            <div className="mt-6 lg:mt-0">
              <div className="mb-4 flex gap-2" aria-hidden="true">
                {REEL_PROJECTS.map((project, index) => (
                  <span
                    key={project.id}
                    className={`h-[3px] flex-1 transition-colors duration-500 ${index === activeProject ? 'bg-acid' : 'bg-ink/10'}`}
                  />
                ))}
              </div>
              <p className="max-w-[250px] font-mono text-[8px] uppercase leading-[1.5] tracking-[0.055em] text-muted-gray md:text-[9px]">
                REAL PROJECTS / MOVING THROUGH THE WORD THAT MATTERS MOST.
              </p>
            </div>
          </aside>

          <div className="hero-footer lg:col-span-12 mt-3 grid gap-6 border-t border-ink/10 pt-5 md:grid-cols-[1.5fr_auto_auto] md:items-center md:gap-0">
            <p className="hero-support max-w-[760px] pr-6 text-[14px] leading-[1.55] tracking-[-0.02em] text-ink/68 md:text-[16px]">
              I design and build websites, digital products and interactive experiences — from the first idea to the final line of code.
            </p>

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

        <div className="hero-footer flex items-end justify-between gap-8 border-t border-ink/8 pt-5 font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
          <span>WEB DESIGN / DEVELOPMENT / INTERACTION</span>
          <span className="hidden md:block">SCROLL TO SELECTED WORK ↓</span>
        </div>
      </div>
    </section>
  );
};
