import React, { useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !mainRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set('.hero-top', { autoAlpha: 0, y: 10 });
      gsap.set('.hero-idea-card', { autoAlpha: 0, x: 110, y: 34, scale: 1.06, rotation: 0 });
      gsap.set('.hero-code-card', { autoAlpha: 0, x: 130, y: 56, scale: 1.05, rotation: 0 });
      gsap.set('.hero-live-card', { autoAlpha: 0, x: 160, y: 42, scale: 1.04, rotation: 0 });
      gsap.set('.hero-sequence-copy', { autoAlpha: 0, y: 12 });
      gsap.set('.hero-headline-line', { autoAlpha: 0, y: 46 });
      gsap.set('.hero-support', { autoAlpha: 0, y: 14 });
      gsap.set('.hero-actions', { autoAlpha: 0, y: 14 });
      gsap.set('.hero-meta', { autoAlpha: 0, y: 12 });
      gsap.set('.hero-footer', { autoAlpha: 0, y: 10 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });

      intro.to('.hero-top', { autoAlpha: 1, y: 0, duration: 0.45 }, 0.05);

      intro.to('.hero-copy-idea', { autoAlpha: 1, y: 0, duration: 0.5 }, 0.28);
      intro.to('.hero-idea-card', { autoAlpha: 1, x: 74, y: 22, scale: 1, duration: 0.85 }, 0.28);
      intro.to('.hero-idea-card', { x: 0, y: 0, scale: 0.94, rotation: -2.2, duration: 0.8 }, 1.18);
      intro.to('.hero-copy-idea', { autoAlpha: 0, y: -8, duration: 0.32 }, 1.28);

      intro.to('.hero-copy-code', { autoAlpha: 1, y: 0, duration: 0.45 }, 1.42);
      intro.to('.hero-code-card', { autoAlpha: 1, x: 54, y: 26, scale: 1, duration: 0.8 }, 1.42);
      intro.fromTo(
        '.hero-code-line',
        { autoAlpha: 0, x: -8 },
        { autoAlpha: 1, x: 0, duration: 0.28, stagger: 0.07, ease: 'power3.out' },
        1.72,
      );
      intro.to('.hero-code-card', { x: 0, y: 0, scale: 0.96, rotation: 1.4, duration: 0.72 }, 2.18);
      intro.to('.hero-copy-code', { autoAlpha: 0, y: -8, duration: 0.3 }, 2.26);

      intro.to('.hero-copy-live', { autoAlpha: 1, y: 0, duration: 0.46 }, 2.38);
      intro.to('.hero-live-card', { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.92 }, 2.38);
      intro.to('.hero-live-accent', { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, 2.78);
      intro.to('.hero-copy-live', { autoAlpha: 0, y: -8, duration: 0.32 }, 3.18);

      intro.to('.hero-headline-line', { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.1 }, 3.16);
      intro.to('.hero-support', { autoAlpha: 1, y: 0, duration: 0.46 }, 3.46);
      intro.to('.hero-actions', { autoAlpha: 1, y: 0, duration: 0.46 }, 3.54);
      intro.to('.hero-meta', { autoAlpha: 1, y: 0, duration: 0.42 }, 3.62);
      intro.to('.hero-footer', { autoAlpha: 1, y: 0, duration: 0.42 }, 3.72);

      gsap.to(mainRef.current, {
        y: -24,
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
      <div className="pointer-events-none absolute inset-[10px] rounded-[16px] border border-ink/[0.035]" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[calc(100svh-80px)] w-full max-w-[1580px] grid-rows-[auto_1fr_auto] md:min-h-[calc(100svh-104px)]">
        <div className="hero-top flex items-center justify-between gap-6 font-mono text-[9px] uppercase tracking-[0.06em] md:text-[10px]">
          <div className="flex items-center gap-4">
            <span className="text-muted-gray">01 / INTRO</span>
            <span className="h-px w-8 bg-soft-gray" aria-hidden="true" />
            <span className="text-ink">DESIGN + CODE + INTERACTION</span>
          </div>
          <span className="hidden text-muted-gray md:block">INDEPENDENT / 2026</span>
        </div>

        <div ref={mainRef} className="grid content-center gap-10 py-10 lg:grid-cols-12 lg:gap-x-8 lg:py-5">
          <div className="relative z-20 lg:col-span-5 xl:col-span-5">
            <div className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-gray md:text-[10px]">
              <span className="h-2 w-2 rounded-full bg-acid" />
              <span>CLEAR. USEFUL. MEMORABLE. ALIVE.</span>
            </div>

            <h1 className="text-[clamp(62px,6.45vw,124px)] font-[560] leading-[0.84] tracking-[-0.06em] text-ink [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal]">
              <span className="hero-headline-line block pb-[0.1em]">websites</span>
              <span className="hero-headline-line block pb-[0.1em]">should feel</span>
              <span className="hero-headline-line relative inline-block pb-[0.2em] italic">
                alive<span className="not-italic">.</span>
                <span className="absolute bottom-[0.06em] left-[-0.02em] -z-10 h-[0.12em] w-[1.08em] origin-left rounded-full bg-acid" />
              </span>
            </h1>

            <p className="hero-support mt-5 max-w-[520px] text-[16px] leading-[1.55] tracking-[-0.025em] text-ink/72 md:text-[18px]">
              I design and build websites, digital products and interactive experiences — from the first idea to the final line of code.
            </p>
          </div>

          <div className="relative min-h-[430px] lg:col-span-7 lg:min-h-[520px] xl:col-span-7">
            <div className="hero-sequence-copy hero-copy-idea absolute left-[8%] top-[1%] z-40 hidden max-w-[260px] lg:block">
              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-gray">01 / INTENT</p>
              <p className="text-[19px] leading-[1.15] tracking-[-0.035em] text-ink">Every interface starts with intent.</p>
            </div>

            <div className="hero-sequence-copy hero-copy-code absolute left-[10%] top-[1%] z-40 hidden max-w-[280px] lg:block">
              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-gray">02 / BUILD</p>
              <p className="text-[19px] leading-[1.15] tracking-[-0.035em] text-ink">Ideas become real through code.</p>
            </div>

            <div className="hero-sequence-copy hero-copy-live absolute left-[10%] top-[1%] z-40 hidden max-w-[300px] lg:block">
              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-gray">03 / LIVE</p>
              <p className="text-[19px] leading-[1.15] tracking-[-0.035em] text-ink">Built to be felt, not just seen.</p>
            </div>

            <div className="hero-idea-card absolute left-[2%] top-[21%] z-10 h-[285px] w-[58%] rounded-[14px] border border-ink/10 bg-[#f3f2ed] p-5 shadow-[0_20px_55px_rgba(17,17,17,0.06)] md:h-[330px] lg:w-[54%]">
              <div className="flex items-center justify-between border-b border-ink/10 pb-3 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-gray">
                <span>IDEA</span>
                <span>01 / 03</span>
              </div>
              <div className="grid h-[calc(100%-38px)] grid-cols-[0.75fr_1.25fr] gap-5 pt-5">
                <div className="space-y-3 font-mono text-[8px] uppercase tracking-[0.07em] text-muted-gray">
                  <div className="text-ink">PROJECT BRIEF</div>
                  {['GOALS', 'AUDIENCE', 'CONTENT', 'TECHNICAL NEEDS'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 border border-ink/20" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <div className="relative flex-1 border border-ink/10 bg-canvas">
                    <span className="absolute left-0 top-0 h-px w-[141%] origin-left rotate-[31deg] bg-ink/10" />
                    <span className="absolute right-0 top-0 h-px w-[141%] origin-right -rotate-[31deg] bg-ink/10" />
                  </div>
                  <div className="h-2 w-3/4 bg-ink/8" />
                  <div className="h-2 w-1/2 bg-ink/6" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-9 border border-ink/10 bg-canvas" />
                    <div className="h-9 border border-ink/10 bg-canvas" />
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-code-card absolute left-[26%] top-[29%] z-20 h-[260px] w-[49%] overflow-hidden rounded-[14px] border border-white/10 bg-[#171717] p-5 text-white shadow-[0_28px_70px_rgba(17,17,17,0.18)] md:h-[305px] lg:w-[46%]">
              <div className="mb-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.08em] text-white/48">
                <span>BUILD</span>
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white/25" />
                  <span className="h-2 w-2 rounded-full bg-acid" />
                </div>
              </div>
              <div className="space-y-2.5 font-mono text-[9px] leading-[1.55] text-white/72 md:text-[10px]">
                <div className="hero-code-line"><span className="mr-4 text-white/25">01</span>const experience = {'{'}</div>
                <div className="hero-code-line pl-9"><span className="text-acid">design</span>: true,</div>
                <div className="hero-code-line pl-9"><span className="text-acid">code</span>: true,</div>
                <div className="hero-code-line pl-9"><span className="text-acid">motion</span>: true,</div>
                <div className="hero-code-line pl-9"><span className="text-acid">live</span>: true</div>
                <div className="hero-code-line"><span className="mr-4 text-white/25">06</span>{'}'};</div>
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex justify-between border-t border-white/10 pt-3 font-mono text-[8px] uppercase tracking-[0.07em] text-white/38">
                <span>INTERFACE / DEVELOPMENT</span>
                <span>MOTION</span>
              </div>
            </div>

            <div className="hero-live-card absolute right-0 top-[17%] z-30 h-[340px] w-[66%] overflow-hidden rounded-[16px] border border-ink/10 bg-canvas shadow-[0_34px_90px_rgba(17,17,17,0.14)] md:h-[390px] lg:w-[63%]">
              <div className="flex h-11 items-center justify-between border-b border-ink/8 px-4 font-mono text-[8px] uppercase tracking-[0.08em] text-muted-gray">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-acid" />
                  <span>LIVE</span>
                </div>
                <div className="flex gap-4 text-[7px] text-ink/60">
                  <span>WORK</span>
                  <span>ABOUT</span>
                  <span>CONTACT</span>
                </div>
              </div>

              <div className="grid h-[calc(100%-44px)] grid-cols-[0.9fr_1.1fr]">
                <div className="flex flex-col justify-between p-5 md:p-6">
                  <div>
                    <p className="mb-9 font-mono text-[8px] uppercase tracking-[0.07em] text-muted-gray">/ STUDIO</p>
                    <p className="max-w-[230px] text-[clamp(30px,3vw,52px)] leading-[0.92] tracking-[-0.05em] text-ink">
                      Ideas become real things.
                    </p>
                  </div>
                  <div>
                    <p className="mb-4 max-w-[180px] text-[10px] leading-[1.45] text-ink/62">Digital experiences for a more human web.</p>
                    <div className="hero-live-accent h-[2px] w-24 origin-left scale-x-0 bg-acid" />
                  </div>
                </div>

                <div className="relative overflow-hidden bg-[#ecece7]">
                  <div className="absolute -right-[18%] top-[10%] h-[125%] w-[82%] rounded-tl-[54%] bg-[#b9bab5] shadow-[-18px_0_40px_rgba(17,17,17,0.08)]" />
                  <div className="absolute bottom-0 right-[10%] h-[74%] w-[38%] bg-[#8e8f8a]" />
                  <div className="absolute bottom-[16%] right-[26%] h-[42%] w-px bg-black/12" />
                  <div className="absolute bottom-[8%] left-[12%] h-12 w-12 rounded-full border border-ink/10" />
                  <div className="absolute bottom-4 right-4 font-mono text-[7px] uppercase tracking-[0.07em] text-ink/45">DESIGN FOR A BRIGHTER WEB</div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-[3%] left-[8%] hidden font-mono text-[8px] uppercase tracking-[0.08em] text-muted-gray lg:block">
              <span>IDEA</span><span className="mx-3">→</span><span>BUILD</span><span className="mx-3">→</span><span>EXPERIENCE</span>
            </div>
          </div>

          <div className="hero-footer lg:col-span-12 mt-2 grid gap-6 border-t border-ink/10 pt-5 md:grid-cols-[1.4fr_auto_auto_0.9fr] md:items-center md:gap-0">
            <div className="pr-6 text-[14px] leading-[1.5] tracking-[-0.02em] text-ink/68 md:text-[15px]">
              A collaboration-focused approach, blending strategy, design and clean code to create websites that make an impact.
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

            <div className="hero-actions border-ink/10 md:border-l md:px-8">
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

            <div className="hero-meta border-ink/10 font-mono text-[8px] uppercase tracking-[0.07em] text-muted-gray md:border-l md:pl-8 md:text-[9px]">
              <p className="mb-2 text-ink">INDEPENDENT DESIGNER / DEVELOPER</p>
              <p>STRATEGY / INTERFACE / CODE</p>
              <p className="mt-4">SELECTED WORK / 2026</p>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-8 border-t border-ink/8 pt-5 font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
          <span>WEB DESIGN / DEVELOPMENT / INTERACTION</span>
          <span className="hidden md:block">SCROLL TO EXPLORE ↓</span>
        </div>
      </div>
    </section>
  );
};
