import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';
import { PROJECTS, DEFAULT_BG } from '../data';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const SelectedWork: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mediaInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { setActiveImage, setCursorState, setCursorText } = useTheme();

  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;

    const panels = projectRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!panels.length) return;

    const ctx = gsap.context(() => {
      gsap.set(panels, { autoAlpha: 0, y: 90, scale: 1.04, pointerEvents: 'none' });
      gsap.set(panels[0], { autoAlpha: 1, y: 0, scale: 1, pointerEvents: 'auto' });

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setActiveImage(PROJECTS[0].bgImage);
        return;
      }

      const totalProjects = PROJECTS.length;
      let activeIndex = 0;

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * 3)}`,
          scrub: 0.6,
          pin: stageRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const nextIndex = Math.min(
              Math.max(Math.round(self.progress * (totalProjects - 1)), 0),
              totalProjects - 1,
            );

            if (nextIndex !== activeIndex) {
              activeIndex = nextIndex;
              setActiveImage(PROJECTS[activeIndex].bgImage);
            }

            panels.forEach((panel, index) => {
              panel.style.pointerEvents = index === activeIndex ? 'auto' : 'none';
            });
          },
          onEnter: () => setActiveImage(PROJECTS[0].bgImage),
          onEnterBack: () => setActiveImage(PROJECTS[totalProjects - 1].bgImage),
          onLeave: () => setActiveImage(DEFAULT_BG),
          onLeaveBack: () => setActiveImage(DEFAULT_BG),
        },
      });

      tl.to({}, { duration: 0.55 });

      for (let i = 1; i < totalProjects; i += 1) {
        const previous = panels[i - 1];
        const current = panels[i];

        tl.to(previous, {
          y: -64,
          scale: 0.94,
          autoAlpha: 0,
          duration: 0.32,
        });

        tl.fromTo(
          current,
          {
            y: 90,
            scale: 1.04,
            autoAlpha: 0,
          },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.32,
          },
          '<',
        );

        tl.to({}, { duration: 0.55 });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      setActiveImage(DEFAULT_BG);
      document.body.classList.remove('hide-cursor');
    };
  }, [setActiveImage]);

  const handleMouseEnter = (projectNumber: string) => {
    setCursorState('project');
    setCursorText(`VIEW PROJECT ${projectNumber}`);
    document.body.classList.add('hide-cursor');
  };

  const handleMouseMove = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
    const inner = mediaInnerRefs.current[index];
    if (!inner) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;

    gsap.to(inner, {
      x: normalizedX * -16,
      y: normalizedY * -12,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: true,
    });
  };

  const handleMouseLeave = (index: number) => {
    const inner = mediaInnerRefs.current[index];
    if (inner) {
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: true,
      });
    }

    setCursorState('default');
    setCursorText('');
    document.body.classList.remove('hide-cursor');
  };

  return (
    <section id="work" ref={containerRef} className="relative w-full bg-canvas pointer-events-auto">
      <div ref={stageRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden">
        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => { projectRefs.current[index] = el; }}
            className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-12"
          >
            <div className="w-full max-w-[1200px] h-[70vh] flex flex-col justify-between">
              <div className="flex justify-between items-start font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-ink z-10">
                <div className="overflow-hidden">
                  <div className="flex gap-4 items-baseline">
                    <span>{project.number} / 04</span>
                    <h2 className="font-sans text-[24px] md:text-[42px] tracking-[-0.04em] font-medium leading-none">{project.title}</h2>
                  </div>
                </div>
              </div>

              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[65%] aspect-[16/9] overflow-hidden cursor-none z-0"
                onMouseEnter={() => handleMouseEnter(project.number)}
                onMouseMove={(event) => handleMouseMove(index, event)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div
                  ref={(el) => { mediaInnerRefs.current[index] = el; }}
                  className="w-[110%] h-[110%] -top-[5%] -left-[5%] absolute bg-cover bg-center grayscale-[0.2] will-change-transform"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>

              <div className="flex justify-between items-end font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-ink z-10">
                <p>{project.category}</p>
                <div className="text-right flex flex-col gap-2">
                  <p>{project.year}</p>
                  <p className="font-sans text-[12px] font-medium tracking-[-0.015em] flex items-center gap-1">
                    VIEW PROJECT <ArrowRight size={14} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
