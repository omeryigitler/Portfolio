import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SignalScene: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !line1Ref.current || !line2Ref.current || !line3Ref.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const line1X = gsap.quickTo(line1Ref.current, 'x', { duration: 0.28, ease: 'power3.out' });
      const line2X = gsap.quickTo(line2Ref.current, 'x', { duration: 0.28, ease: 'power3.out' });
      const line3X = gsap.quickTo(line3Ref.current, 'x', { duration: 0.28, ease: 'power3.out' });
      const line1Skew = gsap.quickTo(line1Ref.current, 'skewX', { duration: 0.28, ease: 'power3.out' });
      const line2Skew = gsap.quickTo(line2Ref.current, 'skewX', { duration: 0.28, ease: 'power3.out' });
      const line3Skew = gsap.quickTo(line3Ref.current, 'skewX', { duration: 0.28, ease: 'power3.out' });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const xOffset = gsap.utils.clamp(-36, 36, velocity / 22);
          const skew = gsap.utils.clamp(-1.25, 1.25, velocity / 900);

          line1X(-xOffset * 0.7);
          line2X(xOffset);
          line3X(-xOffset * 0.45);
          line1Skew(skew);
          line2Skew(skew);
          line3Skew(skew);
        },
        onLeave: () => {
          line1X(0);
          line2X(0);
          line3X(0);
          line1Skew(0);
          line2Skew(0);
          line3Skew(0);
        },
        onLeaveBack: () => {
          line1X(0);
          line2X(0);
          line3X(0);
          line1Skew(0);
          line2Skew(0);
          line3Skew(0);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-40 md:py-64 bg-canvas flex flex-col items-center justify-center overflow-hidden pointer-events-auto">
      <div className="text-[clamp(48px,9vw,140px)] leading-[0.88] tracking-[-0.06em] font-medium uppercase text-ink whitespace-nowrap text-center">
        <div ref={line1Ref}>DESIGNING</div>
        <div ref={line2Ref}>SYSTEMS THAT</div>
        <div ref={line3Ref} className="flex items-center justify-center gap-4">
          MOVE<span className="text-acid">.</span>
        </div>
      </div>
    </section>
  );
};
