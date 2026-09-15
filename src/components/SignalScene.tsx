import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SignalScene: React.FC = () => {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll velocity driven displacement
    const updateVelocity = () => {
      const velocity = ScrollTrigger.getVelocity();
      // dampen velocity
      const skew = gsap.utils.clamp(-3, 3, velocity / 300);
      const xOffset = gsap.utils.clamp(-80, 80, velocity / 10);

      gsap.to(line1Ref.current, {
        x: -xOffset * 0.8,
        skewX: skew,
        duration: 0.5,
        ease: "power2.out"
      });
      
      gsap.to(line2Ref.current, {
        x: xOffset,
        skewX: skew,
        duration: 0.5,
        ease: "power2.out"
      });
      
      gsap.to(line3Ref.current, {
        x: -xOffset * 0.5,
        skewX: skew,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    ScrollTrigger.addEventListener("scroll", updateVelocity);

    return () => {
      ScrollTrigger.removeEventListener("scroll", updateVelocity);
    };
  }, []);

  return (
    <section className="py-40 md:py-64 bg-canvas flex flex-col items-center justify-center overflow-hidden pointer-events-auto">
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
