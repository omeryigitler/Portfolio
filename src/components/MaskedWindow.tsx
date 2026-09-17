import React, { useEffect, useId, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DEFAULT_BG } from '../data';

gsap.registerPlugin(ScrollTrigger);

const SYSTEM_LAYERS = [
  ['01', 'DESIGN'],
  ['02', 'CODE'],
  ['03', 'INTERACTION'],
  ['04', 'PERFORMANCE'],
] as const;

export const MaskedWindow: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const solidTextRef = useRef<SVGTextElement>(null);
  const screenImageRef = useRef<SVGImageElement>(null);
  const systemTextRef = useRef<SVGTextElement>(null);
  const systemMetaRef = useRef<HTMLDivElement>(null);
  const systemCopyRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const clipId = `screen-clip-${useId().replace(/:/g, '')}`;
  const monoId = `screen-mono-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    if (
      !containerRef.current ||
      !backdropRef.current ||
      !frameRef.current ||
      !solidTextRef.current ||
      !screenImageRef.current ||
      !systemTextRef.current ||
      !systemMetaRef.current ||
      !systemCopyRef.current ||
      !lineRef.current ||
      !overlayRef.current
    ) return;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      gsap.set(frameRef.current, { transformOrigin: '50% 12%', willChange: 'transform,opacity' });
      gsap.set(lineRef.current, { scaleX: reducedMotion ? 1 : 0.22, transformOrigin: '0% 50%' });
      gsap.set(backdropRef.current, { scale: reducedMotion ? 1 : 1.035 });
      gsap.set(systemTextRef.current, { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 18 });
      gsap.set(systemMetaRef.current, { autoAlpha: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 12 });
      gsap.set(systemCopyRef.current, { autoAlpha: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 12 });

      if (reducedMotion) {
        gsap.set(solidTextRef.current, { opacity: 0 });
        gsap.set(screenImageRef.current, { opacity: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      tl.to(backdropRef.current, { scale: 1, duration: 1 }, 0);
      tl.to(lineRef.current, { scaleX: 1, duration: 0.2, ease: 'power2.out' }, 0.06);
      tl.to(solidTextRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' }, 0.18);
      tl.to(screenImageRef.current, { opacity: 0, duration: 0.16, ease: 'power2.inOut' }, 0.4);
      tl.to(systemTextRef.current, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }, 0.4);
      tl.to(systemMetaRef.current, { autoAlpha: 1, y: 0, duration: 0.17, ease: 'power2.out' }, 0.44);
      tl.to(systemCopyRef.current, { autoAlpha: 1, y: 0, duration: 0.17, ease: 'power2.out' }, 0.47);
      tl.to(frameRef.current, {
        y: '-2.2vh',
        scale: 0.982,
        rotate: -0.2,
        boxShadow: '0 34px 90px rgba(17,17,17,0.15)',
        duration: 0.18,
        ease: 'power2.inOut',
      }, 0.64);
      tl.to(overlayRef.current, { opacity: 0.06, duration: 0.18 }, 0.66);
      tl.to(frameRef.current, {
        yPercent: -126,
        scale: 0.91,
        rotate: -1.15,
        autoAlpha: 0,
        duration: 0.28,
        ease: 'power2.in',
      }, 0.76);

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        animation: tl,
        invalidateOnRefresh: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="transition" ref={containerRef} className="pointer-events-auto relative h-[190svh] w-full bg-transparent">
      <div className="sticky top-0 h-[100svh] min-h-[720px] w-full overflow-hidden rounded-[10px] bg-[#d8d7d1] shadow-[0_22px_80px_rgba(17,17,17,0.055)]">
        <div
          ref={backdropRef}
          className="absolute inset-0 bg-cover bg-center grayscale saturate-0 contrast-[0.92] brightness-[0.86] will-change-transform"
          style={{ backgroundImage: `url(${DEFAULT_BG})` }}
        />
        <div ref={overlayRef} className="absolute inset-0 bg-[#d8d7d1]/62" />

        <div
          ref={frameRef}
          className="absolute inset-x-[4%] top-[7%] flex h-[80%] flex-col overflow-hidden rounded-[8px] border border-ink/10 bg-canvas px-6 py-7 md:inset-x-[5%] md:h-[82%] md:px-10 md:py-9"
        >
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
            <span>03 / TRANSITION</span>
            <span>SURFACE → SYSTEM</span>
          </div>

          <div className="relative flex flex-1 flex-col items-center justify-center">
            <div className="mb-4 text-center md:mb-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink md:text-[11px]">WHAT YOU SEE / WHAT MAKES IT WORK</p>
              <span ref={lineRef} className="mx-auto mt-3 block h-[2px] w-12 bg-acid" />
            </div>

            <svg
              className="h-auto w-full max-w-[1320px] overflow-visible"
              viewBox="0 0 1200 320"
              preserveAspectRatio="xMidYMid meet"
              aria-label="Screen becomes system"
              role="img"
            >
              <defs>
                <clipPath id={clipId}>
                  <text
                    x="600"
                    y="235"
                    textAnchor="middle"
                    fontFamily="Switzer, Neue Montreal, Suisse International, sans-serif"
                    fontSize="255"
                    fontWeight="500"
                    letterSpacing="-16"
                  >
                    SCREEN
                  </text>
                </clipPath>
                <filter id={monoId} colorInterpolationFilters="sRGB">
                  <feColorMatrix
                    type="matrix"
                    values="0.299 0.587 0.114 0 0
                            0.299 0.587 0.114 0 0
                            0.299 0.587 0.114 0 0
                            0     0     0     1 0"
                  />
                  <feComponentTransfer>
                    <feFuncR type="linear" slope="0.72" intercept="0.04" />
                    <feFuncG type="linear" slope="0.72" intercept="0.04" />
                    <feFuncB type="linear" slope="0.72" intercept="0.04" />
                  </feComponentTransfer>
                </filter>
              </defs>

              <image
                ref={screenImageRef}
                href={DEFAULT_BG}
                x="0"
                y="0"
                width="1200"
                height="320"
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#${clipId})`}
                filter={`url(#${monoId})`}
              />

              <text
                ref={systemTextRef}
                x="600"
                y="235"
                textAnchor="middle"
                fill="#111111"
                fontFamily="Switzer, Neue Montreal, Suisse International, sans-serif"
                fontSize="245"
                fontWeight="500"
                letterSpacing="-15"
              >
                SYSTEM
              </text>

              <text
                ref={solidTextRef}
                x="600"
                y="235"
                textAnchor="middle"
                fill="#111111"
                fontFamily="Switzer, Neue Montreal, Suisse International, sans-serif"
                fontSize="255"
                fontWeight="500"
                letterSpacing="-16"
              >
                SCREEN
              </text>
            </svg>

            <div ref={systemMetaRef} className="mt-1 grid w-full max-w-[940px] grid-cols-2 gap-x-6 gap-y-2 border-t border-ink/10 pt-4 md:grid-cols-4 md:gap-y-0 md:pt-5">
              {SYSTEM_LAYERS.map(([number, label]) => (
                <div key={label} className="flex items-baseline gap-2 font-mono uppercase tracking-[0.06em]">
                  <span className="text-[8px] text-muted-gray md:text-[9px]">{number}</span>
                  <span className="text-[9px] text-ink md:text-[10px]">{label}</span>
                </div>
              ))}
            </div>

            <div ref={systemCopyRef} className="mt-4 flex w-full max-w-[940px] items-start justify-between gap-6 md:mt-5">
              <p className="max-w-[560px] text-[14px] leading-[1.35] tracking-[-0.02em] text-ink md:text-[17px]">
                A screen is only the visible layer. I design what happens behind it too.
              </p>
              <span className="hidden pt-1 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:block">VISIBLE / BEHAVIOR / LOGIC</span>
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
            <span>VISIBLE LAYER → WORKING SYSTEM</span>
            <span>ABOUT / CAPABILITIES ↓</span>
          </div>
        </div>
      </div>
    </section>
  );
};
