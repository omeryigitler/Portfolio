import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MaskedWindow: React.FC = () => {
  const maskRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !maskRef.current) return;

    gsap.to(maskRef.current, {
      scale: 150,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150vh",
        scrub: 1,
        pin: true
      }
    });
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full pointer-events-auto overflow-hidden bg-transparent">
      {/* Background is purely transparent to reveal the global outer background */}
      
      {/* The white canvas mask */}
      <div className="absolute inset-0 bg-canvas z-10 flex items-center justify-center text-mask">
        <div ref={maskRef} className="font-sans font-medium text-[clamp(60px,18vw,240px)] tracking-[-0.07em] leading-none uppercase text-black text-center whitespace-nowrap transform-gpu">
          SCREEN
        </div>
      </div>
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 z-20 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-ink text-center">
        BEYOND THE
      </div>
    </section>
  );
};
