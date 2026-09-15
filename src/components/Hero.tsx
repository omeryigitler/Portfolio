import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TYPE_WORDS = ['clear.', 'useful.', 'alive.', 'memorable.'] as const;

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const typeBandRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const utilityRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [typedWord, setTypedWord] = useState('');

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setTypedWord(TYPE_WORDS[TYPE_WORDS.length - 1]);
      return;
    }

    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timeoutId = 0;

    const tick = () => {
      const word = TYPE_WORDS[wordIndex];

      if (!deleting) {
        characterIndex += 1;
        setTypedWord(word.slice(0, characterIndex));

        if (characterIndex === word.length) {
          if (wordIndex === TYPE_WORDS.length - 1) return;
          deleting = true;
          timeoutId = window.setTimeout(tick, 420);
          return;
        }

        timeoutId = window.setTimeout(tick, 52 + Math.random() * 26);
        return;
      }

      characterIndex -= 1;
      setTypedWord(word.slice(0, characterIndex));

      if (characterIndex === 0) {
        deleting = false;
        wordIndex += 1;
        timeoutId = window.setTimeout(tick, 130);
        return;
      }

      timeoutId = window.setTimeout(tick, 28);
    };

    timeoutId = window.setTimeout(tick, 980);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (
      !heroRef.current ||
      !topRef.current ||
      !mainRef.current ||
      !line1Ref.current ||
      !line2Ref.current ||
      !typeBandRef.current ||
      !descriptionRef.current ||
      !ctasRef.current ||
      !utilityRef.current ||
      !footerRef.current
    ) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(topRef.current, { autoAlpha: 0, y: 12 });
      gsap.set([line1Ref.current, line2Ref.current], { autoAlpha: 0, y: 58 });
      gsap.set(typeBandRef.current, { autoAlpha: 0, y: 20 });
      gsap.set([descriptionRef.current, ctasRef.current, utilityRef.current, footerRef.current], {
        autoAlpha: 0,
        y: 16,
      });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro.to(topRef.current, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.06);
      intro.to(line1Ref.current, { autoAlpha: 1, y: 0, duration: 0.78 }, 0.2);
      intro.to(line2Ref.current, { autoAlpha: 1, y: 0, duration: 0.82 }, 0.3);
      intro.to(typeBandRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.66);
      intro.to(descriptionRef.current, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.78);
      intro.to(ctasRef.current, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.84);
      intro.to(utilityRef.current, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.9);
      intro.to(footerRef.current, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.98);

      gsap.to(mainRef.current, {
        y: -34,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.to(typeBandRef.current, {
        autoAlpha: 0.42,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: '42% top',
          end: '88% top',
          scrub: 0.8,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[calc(100svh-24px)] w-full scroll-mt-3 overflow-visible rounded-[22px] border border-white/70 bg-canvas px-5 pb-7 pt-7 shadow-[0_24px_80px_rgba(17,17,17,0.065)] md:min-h-[calc(100svh-48px)] md:scroll-mt-6 md:px-12 md:pb-10 md:pt-10 lg:px-14"
    >
      <div className="pointer-events-none absolute inset-[10px] rounded-[16px] border border-ink/[0.035]" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[calc(100svh-80px)] w-full max-w-[1580px] grid-rows-[auto_1fr_auto] md:min-h-[calc(100svh-104px)]">
        <div
          ref={topRef}
          className="flex items-center justify-between gap-6 font-mono text-[9px] uppercase tracking-[0.06em] md:text-[10px]"
        >
          <div className="flex items-center gap-4">
            <span className="text-muted-gray">01 / INTRO</span>
            <span className="h-px w-8 bg-soft-gray" aria-hidden="true" />
            <span className="text-ink">DESIGN + CODE + INTERACTION</span>
          </div>
          <span className="hidden text-muted-gray md:block">INDEPENDENT / 2026</span>
        </div>

        <div ref={mainRef} className="grid content-center py-12 md:py-14 lg:grid-cols-12 lg:gap-x-8 lg:py-8">
          <div className="lg:col-span-10 xl:col-span-9">
            <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-gray md:mb-7 md:text-[10px]">
              FROM IDEA TO LIVE EXPERIENCE
            </p>

            <h1 className="text-[clamp(64px,8.8vw,168px)] font-[500] leading-[0.86] tracking-[-0.062em] text-ink [font-feature-settings:'kern'_1,'liga'_1] [font-kerning:normal]">
              <span ref={line1Ref} className="block pb-[0.12em] md:whitespace-nowrap">
                I design websites
              </span>
              <span ref={line2Ref} className="mt-[-0.06em] block pb-[0.18em] md:whitespace-nowrap">
                people remember<span className="text-acid">.</span>
              </span>
            </h1>

            <div
              ref={typeBandRef}
              className="mt-1 grid max-w-[940px] grid-cols-1 gap-3 border-y border-ink/10 py-4 md:mt-2 md:grid-cols-[210px_1fr] md:items-baseline md:gap-6 md:py-5"
              aria-label="Websites should feel memorable."
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.075em] text-muted-gray md:text-[10px]" aria-hidden="true">
                websites should feel
              </span>
              <span
                className="relative w-fit pr-4 text-[clamp(32px,3.25vw,54px)] font-[600] leading-[0.92] tracking-[-0.05em] text-ink"
                aria-hidden="true"
              >
                {typedWord}
                <span className="absolute right-0 top-[0.06em] h-[0.8em] w-[3px] animate-pulse bg-acid" />
              </span>
            </div>

            <div className="mt-7 grid gap-7 md:grid-cols-[minmax(0,680px)_auto] md:items-end md:justify-between md:gap-12">
              <p
                ref={descriptionRef}
                className="max-w-[660px] text-[16px] leading-[1.55] tracking-[-0.025em] text-ink/72 md:text-[18px]"
              >
                I design and build websites, digital products and interactive experiences — from the first idea to the final line of code.
              </p>

              <div ref={ctasRef} className="flex flex-wrap items-center gap-x-7 gap-y-4">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-3 text-[11px] font-[600] uppercase tracking-[0.01em] text-ink focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-4"
                >
                  <span className="relative pb-1">
                    VIEW SELECTED WORK
                    <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-acid transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:scale-x-100" />
                  </span>
                  <ArrowDownRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
                </a>

                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 text-[11px] font-[600] uppercase tracking-[0.01em] text-ink focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-4"
                >
                  <span className="relative pb-1">
                    START A PROJECT
                    <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-acid transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:scale-x-100" />
                  </span>
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-ink/18 transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-ink/35">
                    <ArrowUpRight size={15} />
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div
            ref={utilityRef}
            className="mt-12 hidden self-end border-l border-ink/10 pl-5 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray lg:col-span-2 lg:col-start-11 lg:block xl:col-span-3 xl:col-start-10"
          >
            <p className="mb-2 text-ink">INDEPENDENT DESIGNER / DEVELOPER</p>
            <p>STRATEGY / INTERFACE / CODE</p>
            <p className="mt-5">SELECTED WORK / 2026</p>
          </div>
        </div>

        <div
          ref={footerRef}
          className="flex items-end justify-between gap-8 border-t border-ink/8 pt-5 font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]"
        >
          <span>WEB DESIGN / DEVELOPMENT / INTERACTION</span>
          <span className="hidden md:block">SCROLL TO EXPLORE ↓</span>
        </div>
      </div>
    </section>
  );
};
