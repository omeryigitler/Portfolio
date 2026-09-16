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
      gsap.set('.hero-headline-line', { autoAlpha: 0, y: 42 });
      gsap.set('.hero-support', { autoAlpha: 0, y: 14 });
      gsap.set('.hero-actions', { autoAlpha: 0, y: 12 });
      gsap.set('.hero-meta', { autoAlpha: 0, y: 10 });
      gsap.set('.hero-footer', { autoAlpha: 0, y: 10 });
      gsap.set('.hero-window', { autoAlpha: 0, y: 26, scale: 0.985 });
      gsap.set('.hero-stage-idea', { autoAlpha: 0 });
      gsap.set('.hero-stage-code', { autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' });
      gsap.set('.hero-stage-live', { autoAlpha: 0, clipPath: 'inset(100% 0 0 0)' });
      gsap.set('.hero-sequence-copy', { autoAlpha: 0, y: 10 });
      gsap.set('.hero-live-accent', { scaleX: 0, transformOrigin: '0% 50%' });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });

      intro.to('.hero-top', { autoAlpha: 1, y: 0, duration: 0.42 }, 0.04);
      intro.to('.hero-window', { autoAlpha: 1, y: 0, scale: 1, duration: 0.72 }, 0.12);

      intro.to('.hero-stage-idea', { autoAlpha: 1, duration: 0.55 }, 0.24);
      intro.to('.hero-copy-idea', { autoAlpha: 1, y: 0, duration: 0.5 }, 0.34);

      intro.to('.hero-copy-idea', { autoAlpha: 0, y: -8, duration: 0.28 }, 1.05);
      intro.to('.hero-stage-code', { autoAlpha: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.72, ease: 'power3.inOut' }, 1.08);
      intro.to('.hero-stage-idea', { autoAlpha: 0, duration: 0.22 }, 1.34);
      intro.to('.hero-copy-code', { autoAlpha: 1, y: 0, duration: 0.42 }, 1.38);
      intro.fromTo(
        '.hero-code-line',
        { autoAlpha: 0, x: -8 },
        { autoAlpha: 1, x: 0, duration: 0.22, stagger: 0.055, ease: 'power3.out' },
        1.5,
      );

      intro.to('.hero-copy-code', { autoAlpha: 0, y: -8, duration: 0.26 }, 2.0);
      intro.to('.hero-stage-live', { autoAlpha: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.78, ease: 'power3.inOut' }, 2.02);
      intro.to('.hero-stage-code', { autoAlpha: 0, duration: 0.24 }, 2.34);
      intro.to('.hero-copy-live', { autoAlpha: 1, y: 0, duration: 0.42 }, 2.36);
      intro.to('.hero-live-accent', { scaleX: 1, duration: 0.56, ease: 'power3.inOut' }, 2.48);
      intro.to('.hero-copy-live', { autoAlpha: 0, y: -8, duration: 0.28 }, 2.92);

      intro.to('.hero-headline-line', { autoAlpha: 1, y: 0, duration: 0.64, stagger: 0.08 }, 2.88);
      intro.to('.hero-support', { autoAlpha: 1, y: 0, duration: 0.42 }, 3.16);
      intro.to('.hero-actions', { autoAlpha: 1, y: 0, duration: 0.4 }, 3.22);
      intro.to('.hero-meta', { autoAlpha: 1, y: 0, duration: 0.38 }, 3.28);
      intro.to('.hero-footer', { autoAlpha: 1, y: 0, duration: 0.38 }, 3.34);

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
            <span className="text-ink">DESIGN + CODE + INTERACTION</span>
          </div>
          <span className="hidden text-muted-gray md:block">INDEPENDENT / 2026</span>
        </div>

        <div ref={mainRef} className="grid content-center gap-10 py-8 lg:grid-cols-12 lg:gap-x-10 lg:py-3">
          <div className="relative z-20 self-center lg:col-span-5">
            <h1 className="text-[clamp(64px,6.3vw,122px)] font-[560] leading-[0.84] tracking-[-0.06em] text-ink [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal]">
              <span className="hero-headline-line block pb-[0.1em]">websites</span>
              <span className="hero-headline-line block pb-[0.1em]">should feel</span>
              <span className="hero-headline-line relative inline-block pb-[0.2em] italic">
                <span className="relative z-10">alive<span className="not-italic">.</span></span>
                <span className="absolute bottom-[0.055em] left-[-0.02em] right-[-0.03em] z-0 h-[0.12em] origin-left rounded-full bg-acid" />
              </span>
            </h1>

            <p className="hero-support mt-6 max-w-[500px] text-[16px] leading-[1.55] tracking-[-0.025em] text-ink/72 md:text-[18px]">
              I design and build websites, digital products and interactive experiences — from the first idea to the final line of code.
            </p>
          </div>

          <div className="relative min-h-[430px] lg:col-span-7 lg:min-h-[540px]">
            <div className="hero-sequence-copy hero-copy-idea absolute left-0 top-[1%] z-40 hidden max-w-[300px] lg:block">
              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-gray">01 / INTENT</p>
              <p className="text-[19px] leading-[1.15] tracking-[-0.035em] text-ink">Every interface starts with intent.</p>
            </div>

            <div className="hero-sequence-copy hero-copy-code absolute left-0 top-[1%] z-40 hidden max-w-[300px] lg:block">
              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-gray">02 / BUILD</p>
              <p className="text-[19px] leading-[1.15] tracking-[-0.035em] text-ink">Design becomes real through code.</p>
            </div>

            <div className="hero-sequence-copy hero-copy-live absolute left-0 top-[1%] z-40 hidden max-w-[320px] lg:block">
              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-gray">03 / LIVE</p>
              <p className="text-[19px] leading-[1.15] tracking-[-0.035em] text-ink">Built to be felt, not just seen.</p>
            </div>

            <div className="hero-window absolute inset-x-0 top-[14%] h-[340px] overflow-hidden rounded-[16px] border border-ink/10 bg-canvas shadow-[0_30px_85px_rgba(17,17,17,0.12)] md:h-[410px] lg:top-[13%]">
              <div className="flex h-11 items-center justify-between border-b border-ink/8 px-4 font-mono text-[8px] uppercase tracking-[0.08em] text-muted-gray md:px-5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-acid" />
                  <span>FROM INTENT TO LIVE</span>
                </div>
                <span>01 → 03</span>
              </div>

              <div className="relative h-[calc(100%-44px)] overflow-hidden bg-[#f1f0eb]">
                <div className="hero-stage-idea absolute inset-0 bg-[#f3f2ed] p-5 md:p-7" aria-hidden="true">
                  <div className="grid h-full grid-cols-[0.72fr_1.28fr] gap-5 md:gap-7">
                    <div className="flex flex-col justify-between border-r border-ink/10 pr-5 md:pr-7">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-ink">PROJECT BRIEF</p>
                        <p className="mt-3 max-w-[190px] text-[24px] leading-[0.98] tracking-[-0.045em] text-ink md:text-[34px]">What should this experience do?</p>
                      </div>
                      <div className="space-y-2 font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
                        {['GOALS', 'AUDIENCE', 'CONTENT', 'BEHAVIOUR'].map((item, index) => (
                          <div key={item} className="flex items-center gap-3 border-t border-ink/8 pt-2">
                            <span>{String(index + 1).padStart(2, '0')}</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-rows-[1fr_auto] gap-4">
                      <div className="grid grid-cols-12 gap-2 border border-ink/10 bg-canvas p-3">
                        <div className="col-span-8 border border-ink/10 p-3">
                          <div className="h-3 w-1/3 bg-ink/10" />
                          <div className="mt-4 h-[46%] border border-dashed border-ink/12" />
                          <div className="mt-4 h-2 w-3/4 bg-ink/8" />
                          <div className="mt-2 h-2 w-1/2 bg-ink/6" />
                        </div>
                        <div className="col-span-4 space-y-2">
                          <div className="h-[38%] border border-ink/10" />
                          <div className="h-[26%] border border-ink/10" />
                          <div className="h-[26%] border border-ink/10" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray">
                        <span>STRUCTURE BEFORE STYLE</span>
                        <span>01 / 03</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hero-stage-code absolute inset-0 bg-[#171717] p-5 text-white md:p-7" aria-hidden="true">
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.08em] text-white/42 md:text-[9px]">
                      <span>BUILD / EXPERIENCE.TSX</span>
                      <div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-acid" /></div>
                    </div>

                    <div className="max-w-[620px] space-y-2.5 font-mono text-[11px] leading-[1.55] text-white/72 md:text-[13px]">
                      <div className="hero-code-line"><span className="mr-5 text-white/22">01</span>const experience = defineExperience({'{'}</div>
                      <div className="hero-code-line pl-10"><span className="text-acid">strategy</span>: 'clear',</div>
                      <div className="hero-code-line pl-10"><span className="text-acid">interface</span>: 'useful',</div>
                      <div className="hero-code-line pl-10"><span className="text-acid">motion</span>: 'intentional',</div>
                      <div className="hero-code-line pl-10"><span className="text-acid">performance</span>: 'fast',</div>
                      <div className="hero-code-line"><span className="mr-5 text-white/22">06</span>{'}'});</div>
                      <div className="hero-code-line pt-3"><span className="mr-5 text-white/22">08</span>ship(experience);</div>
                    </div>

                    <div className="flex justify-between border-t border-white/10 pt-3 font-mono text-[8px] uppercase tracking-[0.07em] text-white/36">
                      <span>DESIGN / DEVELOPMENT / MOTION</span>
                      <span>02 / 03</span>
                    </div>
                  </div>
                </div>

                <div className="hero-stage-live absolute inset-0 bg-canvas" aria-label="Final live interface preview">
                  <div className="grid h-full grid-cols-[0.9fr_1.1fr]">
                    <div className="flex flex-col justify-between p-5 md:p-7">
                      <div>
                        <p className="font-mono text-[8px] uppercase tracking-[0.08em] text-muted-gray md:text-[9px]">LIVE / DIGITAL EXPERIENCE</p>
                        <p className="mt-7 max-w-[320px] text-[clamp(34px,3.35vw,60px)] leading-[0.9] tracking-[-0.055em] text-ink">Make digital feel human.</p>
                      </div>
                      <div>
                        <p className="mb-4 max-w-[230px] text-[11px] leading-[1.45] text-ink/62 md:text-[12px]">Clear structure, deliberate interaction and code that gets out of the way.</p>
                        <div className="hero-live-accent h-[3px] w-full max-w-[230px] bg-acid" />
                      </div>
                    </div>

                    <div className="relative overflow-hidden bg-[#e9e9e4]">
                      <div className="absolute inset-x-[9%] top-[12%] h-[72%] rounded-[12px] border border-ink/8 bg-canvas shadow-[0_20px_50px_rgba(17,17,17,0.08)]">
                        <div className="flex h-9 items-center justify-between border-b border-ink/8 px-3 font-mono text-[7px] uppercase tracking-[0.07em] text-muted-gray">
                          <span>LIVE SITE</span>
                          <span>WORK · ABOUT · CONTACT</span>
                        </div>
                        <div className="relative h-[calc(100%-36px)] overflow-hidden p-4">
                          <p className="max-w-[72%] text-[clamp(24px,2.6vw,44px)] leading-[0.92] tracking-[-0.05em] text-ink">Ideas deserve a better interface.</p>
                          <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
                            <div className="h-10 bg-[#dadad4]" />
                            <div className="h-10 bg-[#c9cac4]" />
                            <div className="h-10 bg-ink" />
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-[8%] right-[8%] h-16 w-16 rounded-full border border-ink/10" />
                      <div className="absolute bottom-[11%] right-[11%] h-2 w-2 rounded-full bg-acid" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-footer mt-1 grid gap-6 border-t border-ink/10 pt-5 lg:col-span-12 md:grid-cols-[1.4fr_auto_auto_0.9fr] md:items-center md:gap-0">
            <div className="pr-6 text-[14px] leading-[1.5] tracking-[-0.02em] text-ink/68 md:text-[15px]">
              One continuous process — strategy, interface and code working together from the start.
            </div>

            <div className="hero-actions border-ink/10 md:border-l md:px-8">
              <a href="#work" className="group inline-flex items-center gap-3 text-[11px] font-[600] uppercase tracking-[0.01em] text-ink">
                <span className="relative pb-1">VIEW SELECTED WORK<span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-acid transition-transform duration-300 group-hover:scale-x-100" /></span>
                <ArrowDownRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
              </a>
            </div>

            <div className="hero-actions border-ink/10 md:border-l md:px-8">
              <a href="#contact" className="group inline-flex items-center gap-4 text-[11px] font-[600] uppercase tracking-[0.01em] text-ink">
                <span className="relative pb-1">START A PROJECT<span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-acid transition-transform duration-300 group-hover:scale-x-100" /></span>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-ink/18 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-ink/35"><ArrowUpRight size={16} /></span>
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
