import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';
import { PROJECTS, DEFAULT_BG } from '../data';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export const SelectedWork: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { setActiveImage, setCursorState, setCursorText } = useTheme();
  
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;

    const totalProjects = PROJECTS.length;
    
    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalProjects * 100}vh`,
        scrub: 1,
        pin: stageRef.current,
        onUpdate: (self) => {
          // Calculate active project index
          const progress = self.progress;
          const activeIndex = Math.min(
            Math.floor(progress * totalProjects),
            totalProjects - 1
          );
          
          if (activeIndex >= 0) {
            setActiveImage(PROJECTS[activeIndex].bgImage);
          } else {
            setActiveImage(DEFAULT_BG);
          }
        },
        onLeave: () => setActiveImage(DEFAULT_BG),
        onLeaveBack: () => setActiveImage(DEFAULT_BG)
      }
    });

    // Spatial layered transitions
    PROJECTS.forEach((_, i) => {
      if (i === 0) return; // First project is already visible
      
      const current = projectRefs.current[i];
      const prev = projectRefs.current[i - 1];

      tl.to(prev, {
        scale: 0.9,
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
      }, i); // Position exactly at step i

      tl.fromTo(current, {
        y: 200,
        scale: 1.1,
        opacity: 0
      }, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut"
      }, i);
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [setActiveImage]);

  const handleMouseEnter = (title: string) => {
    setCursorState('project');
    setCursorText(`VIEW CASE ${title}`);
    document.body.classList.add('hide-cursor');
  };

  const handleMouseLeave = () => {
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
            ref={el => { projectRefs.current[index] = el; }}
            className={`absolute inset-0 flex flex-col items-center justify-center p-4 md:p-12 ${index !== 0 ? 'opacity-0' : 'opacity-100'}`}
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
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className="w-[110%] h-[110%] -top-[5%] -left-[5%] absolute bg-cover bg-center grayscale-[0.2]"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>

              <div className="flex justify-between items-end font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-ink z-10">
                <p>{project.category}</p>
                <div className="text-right flex flex-col gap-2">
                  <p>{project.year}</p>
                  <p className="font-sans text-[12px] font-medium tracking-[-0.015em] hover:text-acid transition-colors cursor-pointer flex items-center gap-1">
                    VIEW CASE <ArrowRight size={14} />
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
