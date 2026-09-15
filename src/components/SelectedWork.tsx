import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useUI } from '../context/UIContext';
import { DEFAULT_BG, PROJECTS, type ProjectData } from '../data';

gsap.registerPlugin(ScrollTrigger);

export const SelectedWork: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mediaInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const { setActiveImage, setCursorState, setCursorText } = useTheme();
  const { setProjectOpen } = useUI();

  useEffect(() => {
    if (!containerRef.current) return;

    const panels = projectRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!panels.length) return;

    const ctx = gsap.context(() => {
      gsap.set(panels, { autoAlpha: 0, y: 54, scale: 1.015, pointerEvents: 'none' });
      gsap.set(panels[0], { autoAlpha: 1, y: 0, scale: 1, pointerEvents: 'auto' });

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        panels.forEach((panel, index) => {
          gsap.set(panel, { autoAlpha: index === 0 ? 1 : 0, y: 0, scale: 1, pointerEvents: index === 0 ? 'auto' : 'none' });
        });
        setActiveImage(PROJECTS[0].bgImage);
        return;
      }

      const totalProjects = PROJECTS.length;
      let activeIndex = 0;
      const tl = gsap.timeline({ defaults: { ease: 'none' } });

      tl.to({}, { duration: 0.72 });

      for (let i = 1; i < totalProjects; i += 1) {
        const previous = panels[i - 1];
        const current = panels[i];

        tl.to(previous, {
          y: -34,
          scale: 0.982,
          autoAlpha: 0,
          duration: 0.22,
        });

        tl.fromTo(
          current,
          { y: 54, scale: 1.015, autoAlpha: 0 },
          { y: 0, scale: 1, autoAlpha: 1, duration: 0.22 },
          '<',
        );

        tl.to({}, { duration: 0.72 });
      }

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        animation: tl,
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
      });
    }, containerRef);

    return () => {
      ctx.revert();
      setActiveImage(DEFAULT_BG);
      document.body.classList.remove('hide-cursor');
    };
  }, [setActiveImage]);

  const closeProject = () => {
    setSelectedProject(null);
    setProjectOpen(false);
  };

  useEffect(() => {
    if (!selectedProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeProject();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject]);

  useEffect(() => () => setProjectOpen(false), [setProjectOpen]);

  const handleMouseEnter = (projectNumber: string) => {
    setCursorState('project');
    setCursorText(`VIEW PROJECT ${projectNumber} ↗`);
    document.body.classList.add('hide-cursor');
  };

  const handleMouseMove = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    const inner = mediaInnerRefs.current[index];
    if (!inner) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;

    gsap.to(inner, {
      x: normalizedX * -12,
      y: normalizedY * -8,
      duration: 0.22,
      ease: 'power3.out',
      overwrite: true,
    });
  };

  const handleMouseLeave = (index: number) => {
    const inner = mediaInnerRefs.current[index];
    if (inner) {
      gsap.to(inner, { x: 0, y: 0, duration: 0.28, ease: 'power3.out', overwrite: true });
    }

    setCursorState('default');
    setCursorText('');
    document.body.classList.remove('hide-cursor');
  };

  const openProject = (project: ProjectData) => {
    setCursorState('default');
    setCursorText('');
    document.body.classList.remove('hide-cursor');
    setSelectedProject(project);
    setProjectOpen(true);
  };

  const theatreHeight = `${Math.max(320, PROJECTS.length * 82)}svh`;

  return (
    <>
      <section
        id="work"
        ref={containerRef}
        className="pointer-events-auto relative w-full scroll-mt-3 rounded-[10px] bg-canvas shadow-[0_20px_70px_rgba(17,17,17,0.07)] md:scroll-mt-6"
        style={{ height: theatreHeight }}
      >
        <div className="sticky top-0 h-[100svh] min-h-[720px] w-full overflow-hidden rounded-[10px] bg-canvas">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { projectRefs.current[index] = el; }}
              className="absolute inset-0 flex items-center justify-center px-6 pb-12 pt-24 md:px-12 md:pb-14 md:pt-28"
            >
              <div className="grid h-[78svh] max-h-[860px] min-h-[560px] w-full max-w-[1360px] grid-rows-[auto_minmax(0,1fr)_auto] gap-5 md:gap-7">
                <header>
                  <div className="mb-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.05em] text-muted-gray md:text-[10px]">
                    <span>02 / SELECTED WORK</span>
                    <span>{project.number} / {String(PROJECTS.length).padStart(2, '0')}</span>
                  </div>

                  <div className="flex items-end justify-between gap-6">
                    <h2 className="min-w-0 font-sans text-[clamp(34px,5vw,74px)] font-[500] leading-[0.9] tracking-[-0.055em] text-ink">
                      {project.title}
                    </h2>

                    <div className="hidden shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.04em] text-muted-gray md:block">
                      <p className="text-ink">{project.category}</p>
                      <p className="mt-1">{project.year}</p>
                    </div>
                  </div>
                </header>

                <motion.button
                  type="button"
                  layoutId={`project-media-${project.id}`}
                  className="group relative min-h-0 w-full overflow-hidden bg-soft-gray text-left focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-4"
                  onMouseEnter={() => handleMouseEnter(project.number)}
                  onMouseMove={(event) => handleMouseMove(index, event)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  onClick={() => openProject(project)}
                  aria-label={`Open ${project.title} project preview`}
                >
                  <div
                    ref={(el) => { mediaInnerRefs.current[index] = el; }}
                    className="absolute -left-[3%] -top-[3%] h-[106%] w-[106%] bg-cover bg-center will-change-transform"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/[0.03]" />
                </motion.button>

                <footer className="flex items-start justify-between gap-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.04em] text-muted-gray md:hidden">
                    <p className="text-ink">{project.category}</p>
                    <p className="mt-1">{project.year}</p>
                  </div>
                  <span className="hidden font-mono text-[10px] uppercase tracking-[0.04em] text-muted-gray md:block">WEBSITE / DESIGN / DEVELOPMENT</span>
                  <button
                    type="button"
                    onClick={() => openProject(project)}
                    className="group ml-auto inline-flex items-center gap-2 font-sans text-[12px] font-[500] uppercase tracking-[-0.015em] text-ink focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-4"
                  >
                    <span className="relative pb-1">
                      VIEW PROJECT
                      <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-acid transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:scale-x-100" />
                    </span>
                    <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[200] bg-ink/25 p-3 md:p-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeProject();
            }}
          >
            <motion.div
              className="relative flex h-full w-full flex-col overflow-hidden rounded-[8px] bg-canvas p-5 md:p-10"
              initial={{ y: 18, scale: 0.99 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 18, scale: 0.99 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedProject.title} project preview`}
            >
              <div className="mb-6 flex items-start justify-between gap-6">
                <div>
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.04em] text-muted-gray">
                    {selectedProject.number} / PROJECT PREVIEW
                  </div>
                  <h2 className="font-sans text-[clamp(34px,5vw,76px)] font-[500] leading-[0.9] tracking-[-0.055em] text-ink">
                    {selectedProject.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeProject}
                  className="p-2 text-ink transition-opacity hover:opacity-55 focus-visible:outline-2 focus-visible:outline-acid"
                  aria-label="Close project preview"
                >
                  <X size={28} strokeWidth={1.4} />
                </button>
              </div>

              <motion.div
                layoutId={`project-media-${selectedProject.id}`}
                className="relative min-h-0 flex-1 overflow-hidden bg-soft-gray"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedProject.image})` }}
                />
              </motion.div>

              <div className="mt-5 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.04em] text-muted-gray">
                <span className="text-ink">{selectedProject.category}</span>
                <span>{selectedProject.year}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
