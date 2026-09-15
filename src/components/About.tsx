import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const line3 = useRef<HTMLDivElement>(null);
  const line4 = useRef<HTMLDivElement>(null);
  const line5 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "center center",
        scrub: 1
      }
    });

    tl.from(line1.current, { x: -100, opacity: 0, duration: 1 }, 0);
    tl.from(line2.current, { x: 100, opacity: 0, duration: 1 }, 0.2);
    tl.from(line3.current, { y: 50, opacity: 0, duration: 1 }, 0.4);
    tl.from(line4.current, { x: -50, opacity: 0, duration: 1 }, 0.6);
    tl.from(line5.current, { y: 50, opacity: 0, duration: 1 }, 0.8);
    
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-32 md:py-64 px-4 md:px-12 bg-canvas pointer-events-auto">
      <div className="text-[clamp(32px,5vw,76px)] leading-[0.94] tracking-[-0.05em] font-medium text-ink w-full md:max-w-[75%] overflow-hidden">
        <div ref={line1}>I DESIGN AND BUILD</div>
        <div ref={line2}>DIGITAL EXPERIENCES</div>
        <div ref={line3}>WITH A FOCUS ON</div>
        <div ref={line4}>DETAIL, SYSTEMS</div>
        <div ref={line5}>AND INTERACTION.</div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mt-24 md:mt-32 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-ink">
        <div>
          <p className="text-muted-gray mb-6">DESIGN</p>
          <p className="leading-[1.6]">ART DIRECTION<br/>UI / UX<br/>DIGITAL IDENTITY</p>
        </div>
        <div>
          <p className="text-muted-gray mb-6">BUILD</p>
          <p className="leading-[1.6]">FRONTEND<br/>CREATIVE DEV<br/>MOTION</p>
        </div>
        <div>
          <p className="text-muted-gray mb-6">LOCATION</p>
          <p className="leading-[1.6]">INDEPENDENT<br/>WORLDWIDE</p>
        </div>
      </div>
    </section>
  );
};
