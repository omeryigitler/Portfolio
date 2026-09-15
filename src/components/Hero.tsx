import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const metaRightRef = useRef<HTMLDivElement>(null);
  const metaBottomRef = useRef<HTMLDivElement>(null);
  const preTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !line1Ref.current || !line2Ref.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=800",
        scrub: 1,
        pin: true,
      }
    });

    // 0-25%: small metadata shifts/fades out
    tl.to([metaRightRef.current, metaBottomRef.current, preTitleRef.current], {
      y: -15,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    }, 0);

    // 25-50%: headline moves up slightly (5-8vh)
    tl.to([line1Ref.current, line2Ref.current], {
      y: "-6vh",
      duration: 1.5,
      ease: "power2.inOut",
    }, 0.5);

    // 50-75%: DIGITAL EXPERIENCES opacity drops to 0.35, WORTH REMEMBERING. stays solid
    tl.to(line1Ref.current, {
      opacity: 0.35,
      duration: 1,
      ease: "none"
    }, 1.2);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-[calc(100vh-32px)] md:h-[calc(100vh-56px)] flex flex-col justify-between pt-6 pb-6 md:pt-10 md:pb-10 bg-canvas px-6 md:px-12">
      
      {/* Top Nav (Static) */}
      <div className="w-full flex justify-between items-center text-ink z-50">
        <div className="font-sans font-[500] text-[11px] md:text-[13px] tracking-[-0.01em]">
          omeryigitler.com
        </div>
        <div className="flex gap-6 md:gap-12 font-sans font-[500] text-[11px] md:text-[13px] uppercase tracking-[-0.01em]">
          <a href="#work" className="hover:text-acid transition-colors duration-300">WORK</a>
          <a href="#about" className="hover:text-acid transition-colors duration-300">ABOUT</a>
          <a href="#lab" className="hover:text-acid transition-colors duration-300">LAB</a>
          <a href="#contact" className="hover:text-acid transition-colors duration-300">CONTACT ↗</a>
        </div>
      </div>

      {/* Middle Content */}
      <div className="flex-1 w-full flex flex-col justify-center relative mt-12 md:mt-0">
        
        <div ref={preTitleRef} className="mb-6 md:mb-10 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-ink">
          I DESIGN + BUILD
        </div>

        <h1 className="text-[clamp(44px,8.5vw,150px)] leading-[0.88] tracking-[-0.06em] font-[500] uppercase text-ink w-fit max-w-[95%] lg:max-w-[85%] [font-kerning:normal] [font-feature-settings:'kern'_1,'liga'_1]">
          <div ref={line1Ref} className="block">
            DIGITAL <br className="block sm:hidden" /> EXPERIENCES
          </div>
          <div ref={line2Ref} className="block mt-1 md:mt-2">
            WORTH <br className="block sm:hidden" /> REMEMBERING.
          </div>
        </h1>

        {/* Right Metadata */}
        <div ref={metaRightRef} className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0 text-right font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-muted-gray">
          <p className="text-ink mb-1">INDEPENDENT DESIGNER / DEVELOPER</p>
          <p>DESIGN · CODE · INTERACTION</p>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="w-full flex justify-between items-end z-50">
        <div ref={metaBottomRef} className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-muted-gray">
          SELECTED WORK 2022—2026
        </div>
        {/* Mobile version of the right metadata */}
        <div className="lg:hidden text-right font-mono text-[9px] uppercase tracking-[0.04em] text-muted-gray">
          <p className="text-ink mb-1">INDEPENDENT DESIGNER</p>
          <p>DESIGN · CODE</p>
        </div>
      </div>

    </section>
  );
};

