import React, { useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SIGNAL_NODES = [
  { x: 14, y: 24, r: 1.1 },
  { x: 28, y: 17, r: 0.8 },
  { x: 43, y: 29, r: 1.2 },
  { x: 61, y: 19, r: 0.9 },
  { x: 78, y: 27, r: 1.1 },
  { x: 88, y: 18, r: 0.7 },
  { x: 19, y: 48, r: 0.8 },
  { x: 35, y: 43, r: 1.05 },
  { x: 52, y: 52, r: 1.65, accent: true },
  { x: 69, y: 46, r: 1.05 },
  { x: 84, y: 55, r: 0.8 },
  { x: 12, y: 72, r: 0.7 },
  { x: 28, y: 65, r: 1.05 },
  { x: 45, y: 76, r: 0.8 },
  { x: 64, y: 69, r: 1.2 },
  { x: 81, y: 77, r: 0.9 },
  { x: 91, y: 68, r: 0.7 },
];

const SIGNAL_LINKS = [
  [14, 24, 28, 17],
  [28, 17, 43, 29],
  [43, 29, 61, 19],
  [61, 19, 78, 27],
  [78, 27, 88, 18],
  [14, 24, 19, 48],
  [43, 29, 35, 43],
  [35, 43, 52, 52],
  [61, 19, 69, 46],
  [69, 46, 52, 52],
  [78, 27, 84, 55],
  [19, 48, 28, 65],
  [28, 65, 45, 76],
  [28, 65, 52, 52],
  [52, 52, 64, 69],
  [64, 69, 81, 77],
  [84, 55, 91, 68],
  [84, 55, 64, 69],
];

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const fieldCoreRef = useRef<SVGGElement>(null);
  const trackerRef = useRef<SVGCircleElement>(null);
  const coordinateRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!heroRef.current || !mainRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set('.hero-top', { autoAlpha: 0, y: 10 });
      gsap.set('.hero-kicker', { autoAlpha: 0, y: 12 });
      gsap.set('.hero-headline-line', { autoAlpha: 0, y: 44 });
      gsap.set('.hero-support', { autoAlpha: 0, y: 14 });
      gsap.set('.hero-actions', { autoAlpha: 0, y: 14 });
      gsap.set('.hero-field', { autoAlpha: 0, x: 24, scale: 0.985 });
      gsap.set('.hero-signal-node', { scale: 0, transformOrigin: 'center center' });
      gsap.set('.hero-signal-link', { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set('.hero-field-label', { autoAlpha: 0, y: 6 });
      gsap.set('.hero-meta', { autoAlpha: 0, y: 10 });
      gsap.set('.hero-field-scan', { xPercent: -130 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro.to('.hero-top', { autoAlpha: 1, y: 0, duration: 0.42 }, 0.05);
      intro.to('.hero-kicker', { autoAlpha: 1, y: 0, duration: 0.42 }, 0.14);
      intro.to('.hero-headline-line', { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.075 }, 0.18);
      intro.to('.hero-field', { autoAlpha: 1, x: 0, scale: 1, duration: 0.82 }, 0.34);
      intro.to('.hero-signal-link', { strokeDashoffset: 0, duration: 0.78, stagger: 0.025, ease: 'power2.inOut' }, 0.5);
      intro.to('.hero-signal-node', { scale: 1, duration: 0.42, stagger: 0.026, ease: 'back.out(1.7)' }, 0.58);
      intro.to('.hero-field-label', { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.04 }, 0.78);
      intro.to('.hero-support', { autoAlpha: 1, y: 0, duration: 0.46 }, 0.72);
      intro.to('.hero-actions', { autoAlpha: 1, y: 0, duration: 0.46 }, 0.84);
      intro.to('.hero-meta', { autoAlpha: 1, y: 0, duration: 0.42 }, 0.96);

      gsap.to('.hero-core-ring', {
        scale: 1.45,
        opacity: 0,
        transformOrigin: '50% 50%',
        duration: 1.9,
        repeat: -1,
        ease: 'power1.out',
      });

      gsap.to('.hero-field-scan', {
        xPercent: 420,
        duration: 4.8,
        repeat: -1,
        repeatDelay: 1.8,
        ease: 'power1.inOut',
      });

      gsap.to(mainRef.current, {
        y: -20,
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

  const handleFieldMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!fieldRef.current) return;

    const bounds = fieldRef.current.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const py = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));

    if (coordinateRef.current) {
      coordinateRef.current.textContent = `X ${String(Math.round(px * 99)).padStart(2, '0')} / Y ${String(Math.round(py * 99)).padStart(2, '0')}`;
    }

    if (fieldCoreRef.current) {
      gsap.to(fieldCoreRef.current, {
        x: (px - 0.5) * 3.4,
        y: (py - 0.5) * 2.6,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }

    if (trackerRef.current) {
      gsap.to(trackerRef.current, {
        attr: { cx: px * 100, cy: py * 100 },
        duration: 0.38,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  };

  const handleFieldLeave = () => {
    if (coordinateRef.current) coordinateRef.current.textContent = 'X 50 / Y 50';

    if (fieldCoreRef.current) {
      gsap.to(fieldCoreRef.current, { x: 0, y: 0, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
    }

    if (trackerRef.current) {
      gsap.to(trackerRef.current, {
        attr: { cx: 50, cy: 50 },
        duration: 0.8,
        ease: 'power3.out',
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
            <span className="text-ink">INDEPENDENT DESIGNER + DEVELOPER</span>
          </div>
          <span className="hidden text-muted-gray md:block">ÖMER YİĞİTLER / 2026</span>
        </div>

        <div ref={mainRef} className="grid content-center gap-10 py-10 lg:grid-cols-12 lg:gap-x-10 lg:py-5 xl:gap-x-14">
          <div className="flex flex-col justify-center lg:col-span-7 xl:col-span-7">
            <div className="hero-kicker mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.075em] text-muted-gray md:text-[10px]">
              <span className="h-[6px] w-[6px] bg-acid" aria-hidden="true" />
              <span>DESIGN / DEVELOPMENT / INTERACTION</span>
            </div>

            <h1 className="max-w-[900px] text-[clamp(54px,6.35vw,116px)] font-[560] leading-[0.87] tracking-[-0.06em] text-ink [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal]">
              <span className="hero-headline-line block pb-[0.07em]">I design &amp; build</span>
              <span className="hero-headline-line block pb-[0.07em]">digital experiences</span>
              <span className="hero-headline-line block pb-[0.07em]">that feel as good</span>
              <span className="hero-headline-line relative inline-block pb-[0.15em]">
                as they work.
                <span className="absolute bottom-[0.035em] left-0 h-[0.065em] w-[46%] origin-left rounded-full bg-acid" aria-hidden="true" />
              </span>
            </h1>

            <p className="hero-support mt-6 max-w-[710px] text-[14px] leading-[1.58] tracking-[-0.02em] text-ink/68 md:text-[17px]">
              Independent designer &amp; developer creating distinctive websites and interactive systems — from art direction and UX to frontend, motion and production.
            </p>

            <div className="hero-actions mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
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

          <div className="hero-field flex items-center lg:col-span-5 xl:col-span-5">
            <div
              ref={fieldRef}
              onMouseMove={handleFieldMove}
              onMouseLeave={handleFieldLeave}
              className="group relative h-[360px] w-full overflow-hidden rounded-[14px] border border-ink/10 bg-[#f1f1ed] md:h-[420px] lg:h-[500px]"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.52]"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(17,17,17,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.055) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />

              <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between border-b border-ink/10 pb-3 font-mono text-[8px] uppercase tracking-[0.07em] text-muted-gray md:left-5 md:right-5 md:top-5 md:text-[9px]">
                <div className="flex items-center gap-2">
                  <span className="h-[6px] w-[6px] rounded-full bg-acid" aria-hidden="true" />
                  <span>SIGNAL FIELD / LIVE</span>
                </div>
                <span ref={coordinateRef}>X 50 / Y 50</span>
              </div>

              <svg
                viewBox="0 0 100 100"
                className="absolute inset-x-[5%] top-[14%] h-[70%] w-[90%] overflow-visible"
                aria-hidden="true"
              >
                <g ref={fieldCoreRef}>
                  {SIGNAL_LINKS.map(([x1, y1, x2, y2], index) => (
                    <line
                      key={`link-${index}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      pathLength="1"
                      className="hero-signal-link"
                      stroke="rgba(17,17,17,0.22)"
                      strokeWidth="0.34"
                    />
                  ))}

                  <circle className="hero-core-ring" cx="52" cy="52" r="8" fill="none" stroke="rgba(239,255,0,0.8)" strokeWidth="0.55" />
                  <circle cx="52" cy="52" r="4.6" fill="rgba(239,255,0,0.12)" stroke="rgba(17,17,17,0.16)" strokeWidth="0.35" />

                  {SIGNAL_NODES.map((node, index) => (
                    <circle
                      key={`node-${index}`}
                      cx={node.x}
                      cy={node.y}
                      r={node.r}
                      className="hero-signal-node"
                      fill={node.accent ? '#EFFF00' : '#111111'}
                      opacity={node.accent ? 1 : 0.82}
                    />
                  ))}
                </g>

                <circle
                  ref={trackerRef}
                  cx="50"
                  cy="50"
                  r="5.8"
                  fill="none"
                  stroke="rgba(17,17,17,0.18)"
                  strokeWidth="0.42"
                  strokeDasharray="1.4 1.4"
                />
              </svg>

              <div className="hero-field-scan pointer-events-none absolute bottom-[18%] left-[-18%] top-[18%] w-[18%] bg-gradient-to-r from-transparent via-acid/10 to-transparent blur-[2px]" aria-hidden="true" />

              <div className="hero-field-label absolute left-[7%] top-[27%] font-mono text-[7px] uppercase tracking-[0.06em] text-muted-gray md:text-[8px]">
                ART DIRECTION
              </div>
              <div className="hero-field-label absolute right-[8%] top-[33%] font-mono text-[7px] uppercase tracking-[0.06em] text-muted-gray md:text-[8px]">
                FRONTEND
              </div>
              <div className="hero-field-label absolute bottom-[26%] left-[13%] font-mono text-[7px] uppercase tracking-[0.06em] text-muted-gray md:text-[8px]">
                MOTION
              </div>
              <div className="hero-field-label absolute bottom-[20%] right-[9%] font-mono text-[7px] uppercase tracking-[0.06em] text-muted-gray md:text-[8px]">
                INTERACTION
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-20 grid grid-cols-3 border-t border-ink/10 pt-3 font-mono text-[7px] uppercase tracking-[0.055em] text-muted-gray md:bottom-5 md:left-5 md:right-5 md:text-[8px]">
                <span>INPUT / POINTER</span>
                <span className="text-center">STATUS / ONLINE</span>
                <span className="text-right">OUTPUT / EXPERIENCE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-meta flex items-end justify-between gap-8 border-t border-ink/8 pt-5 font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
          <span>ÖMER YİĞİTLER / DESIGN + CODE + INTERACTION</span>
          <span className="hidden items-center gap-3 md:flex">
            <span className="h-[5px] w-[5px] rounded-full bg-acid" aria-hidden="true" />
            SCROLL TO SELECTED WORK ↓
          </span>
        </div>
      </div>
    </section>
  );
};
