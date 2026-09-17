import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useUI } from '../context/UIContext';
import { DEFAULT_AMBIENT, PROJECTS, type ProjectData } from '../data';

const desktopLayouts = [
  'lg:col-start-1 lg:col-span-5 lg:row-start-1 lg:row-span-4',
  'lg:col-start-6 lg:col-span-3 lg:row-start-1 lg:row-span-4',
  'lg:col-start-9 lg:col-span-4 lg:row-start-1 lg:row-span-4',
  'lg:col-start-1 lg:col-span-3 lg:row-start-5 lg:row-span-4',
  'lg:col-start-4 lg:col-span-6 lg:row-start-5 lg:row-span-4',
  'lg:col-start-10 lg:col-span-3 lg:row-start-5 lg:row-span-4',
];

const HOMEPAGE_DEFAULT_VIEWPORT_WIDTH = 1600;
const HOMEPAGE_MIN_HEIGHT = 1200;

const previewViewportWidths: Record<string, number> = {
  'japanese-bakery': 1900,
  'built-with-seyhan': 1720,
  mybabyshire: 1660,
  'architecture-3d': 1760,
  'elena-moreau': 1720,
  parfum: 1560,
};

const ProjectHomepagePreview: React.FC<{ project: ProjectData; priority?: boolean }> = ({ project, priority = false }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [scale, setScale] = useState(0.24);
  const [viewportHeight, setViewportHeight] = useState(HOMEPAGE_MIN_HEIGHT);
  const viewportWidth = previewViewportWidths[project.id] ?? HOMEPAGE_DEFAULT_VIEWPORT_WIDTH;

  useEffect(() => setLoaded(false), [project.url]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const updatePreview = () => {
      const bounds = host.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      const nextScale = bounds.width / viewportWidth;
      if (!Number.isFinite(nextScale) || nextScale <= 0) return;

      setScale(nextScale);
      setViewportHeight(Math.max(HOMEPAGE_MIN_HEIGHT, Math.ceil(bounds.height / nextScale)));
    };

    updatePreview();
    const observer = new ResizeObserver(updatePreview);
    observer.observe(host);
    return () => observer.disconnect();
  }, [viewportWidth]);

  return (
    <div ref={hostRef} className="absolute inset-x-0 bottom-[54px] top-0 overflow-hidden bg-white md:bottom-[60px]">
      <div
        className={`pointer-events-none absolute inset-0 z-10 grid place-items-center bg-white transition-opacity duration-300 ${loaded ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden="true"
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.07em] text-muted-gray md:text-[9px]">LOADING HOMEPAGE</span>
      </div>

      <div
        className={`pointer-events-none absolute left-0 top-0 bg-white transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          width: viewportWidth,
          height: viewportHeight,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
        aria-hidden="true"
      >
        <iframe
          src={project.url}
          title={`${project.title} homepage preview`}
          loading={priority ? 'eager' : 'lazy'}
          tabIndex={-1}
          onLoad={() => setLoaded(true)}
          className="pointer-events-none h-full w-full border-0 bg-white"
        />
      </div>
    </div>
  );
};

const ProjectLiveViewport: React.FC<{ project: ProjectData }> = ({ project }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(false), [project.url]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#ecebe6]">
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`} aria-hidden="true">
        <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-gray md:text-[10px]">
          <span className="h-[5px] w-[5px] rounded-full bg-acid" />
          <span>LOADING PROJECT</span>
        </div>
      </div>

      <iframe
        src={project.url}
        title={`${project.title} interactive project`}
        loading="eager"
        tabIndex={0}
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full border-0 bg-white transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

export const SelectedWork: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const ratiosRef = useRef<Map<number, number>>(new Map());
  const visibleIndexRef = useRef(0);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const { setActiveAmbient, setCursorState, setCursorText } = useTheme();
  const { setProjectOpen } = useUI();

  const resetCursor = () => {
    setCursorState('default');
    setCursorText('');
    document.body.classList.remove('hide-cursor');
  };

  const restoreVisibleAmbient = () => {
    const project = PROJECTS[visibleIndexRef.current];
    setActiveAmbient(project?.ambientColor ?? DEFAULT_AMBIENT);
  };

  const handleEnter = (project: ProjectData, index: number) => {
    visibleIndexRef.current = index;
    setActiveAmbient(project.ambientColor);
    setCursorState('project');
    setCursorText(`OPEN ${project.number} ↗`);
    document.body.classList.add('hide-cursor');
  };

  const handleLeave = () => {
    restoreVisibleAmbient();
    resetCursor();
  };

  const openProject = (project: ProjectData) => {
    setSelectedProject(project);
    setProjectOpen(true);
    setActiveAmbient(project.ambientColor);
    resetCursor();
  };

  const closeProject = () => {
    setSelectedProject(null);
    setProjectOpen(false);
    restoreVisibleAmbient();
    resetCursor();
  };

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLButtonElement[];
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.projectIndex ?? '-1');
          if (index >= 0) ratiosRef.current.set(index, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestIndex = -1;
        let bestRatio = 0;
        ratiosRef.current.forEach((ratio, index) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = index;
          }
        });

        if (bestIndex >= 0 && bestRatio >= 0.2) {
          visibleIndexRef.current = bestIndex;
          setActiveAmbient(PROJECTS[bestIndex].ambientColor);
        }
      },
      { threshold: [0, 0.2, 0.35, 0.5, 0.7], rootMargin: '-10% 0px -10% 0px' },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [setActiveAmbient]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setActiveAmbient(DEFAULT_AMBIENT);
      },
      { threshold: 0.03 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [setActiveAmbient]);

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeProject();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject]);

  useEffect(() => {
    return () => {
      setProjectOpen(false);
      setActiveAmbient(DEFAULT_AMBIENT);
      document.body.classList.remove('hide-cursor');
    };
  }, [setActiveAmbient, setProjectOpen]);

  return (
    <>
      <section id="work" ref={sectionRef} className="relative w-full scroll-mt-0 border-t border-ink/10 bg-canvas px-5 pb-8 pt-7 md:px-10 md:pb-10 md:pt-9 lg:px-12">
        <div className="mx-auto w-full max-w-[1540px]">
          <header className="mb-5 flex items-end justify-between gap-8 md:mb-7">
            <div className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
              <span className="text-ink">02 / SELECTED WORK</span>
              <span className="mx-3 text-ink/20">—</span>
              <span>{String(PROJECTS.length).padStart(2, '0')} REAL PROJECTS</span>
            </div>
            <div className="hidden text-right font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:block md:text-[9px]">
              CLICK A PROJECT / OPEN FULLSCREEN
            </div>
          </header>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:h-[108svh] lg:min-h-[920px] lg:max-h-[1220px] lg:grid-cols-12 lg:grid-rows-8">
            {PROJECTS.map((project, index) => (
              <motion.button
                key={project.id}
                ref={(element) => { cardRefs.current[index] = element; }}
                data-project-index={index}
                type="button"
                layoutId={`project-media-${project.id}`}
                className={`group relative min-h-[56svh] overflow-hidden rounded-[5px] bg-white text-left focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-[-2px] md:min-h-[360px] lg:min-h-0 ${desktopLayouts[index] ?? ''}`}
                onMouseEnter={() => handleEnter(project, index)}
                onMouseLeave={handleLeave}
                onFocus={() => handleEnter(project, index)}
                onBlur={handleLeave}
                onClick={() => openProject(project)}
                aria-label={`Open ${project.title} fullscreen project`}
              >
                <ProjectHomepagePreview project={project} priority={index < 3} />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[54px] items-center gap-4 border-t border-ink/10 bg-canvas px-3 md:h-[60px] md:gap-5 md:px-4">
                  <span className="shrink-0 font-mono text-[9px] tracking-[0.04em] text-muted-gray md:text-[10px]">
                    {project.number}
                  </span>
                  <span className="truncate text-[12px] font-[500] tracking-[-0.025em] text-ink md:text-[14px]">
                    {project.title}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-ink/8 pt-4 font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
            <span>HOMEPAGE PREVIEW / LIVE AFTER CLICK</span>
            <span>DESIGN · DEVELOPMENT · INTERACTION</span>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div className="fixed inset-0 z-[200] bg-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} role="dialog" aria-modal="true" aria-label={`${selectedProject.title} fullscreen project`}>
            <motion.div layoutId={`project-media-${selectedProject.id}`} className="absolute inset-0 overflow-hidden bg-white" transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}>
              <ProjectLiveViewport project={selectedProject} />
            </motion.div>

            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-3 md:p-4">
              <div className="pointer-events-auto flex max-w-[70vw] items-center gap-3 rounded-[5px] border border-ink/10 bg-canvas/94 px-3 py-2 shadow-[0_8px_28px_rgba(17,17,17,0.08)] backdrop-blur-xl md:px-4 md:py-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">{selectedProject.number} / {String(PROJECTS.length).padStart(2, '0')}</span>
                <span className="h-4 w-px bg-ink/12" />
                <span className="truncate text-[13px] font-[600] tracking-[-0.02em] text-ink md:text-[15px]">{selectedProject.title}</span>
              </div>

              <div className="pointer-events-auto flex items-center gap-2">
                <a href={selectedProject.url} target="_blank" rel="noreferrer" className="group hidden items-center gap-2 rounded-[5px] border border-ink/10 bg-canvas/94 px-3 py-2 text-[10px] font-[600] uppercase tracking-[0.01em] text-ink shadow-[0_8px_28px_rgba(17,17,17,0.08)] backdrop-blur-xl transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-acid sm:inline-flex md:px-4 md:py-3">
                  OPEN LIVE
                  <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <button type="button" onClick={closeProject} className="grid h-10 w-10 place-items-center rounded-[5px] border border-ink/10 bg-canvas/94 text-ink shadow-[0_8px_28px_rgba(17,17,17,0.08)] backdrop-blur-xl transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-acid md:h-11 md:w-11" aria-label="Close fullscreen project">
                  <X size={20} strokeWidth={1.4} />
                </button>
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-3 left-3 z-20 hidden rounded-[4px] border border-ink/10 bg-canvas/92 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray shadow-[0_8px_24px_rgba(17,17,17,0.06)] backdrop-blur-xl md:block">
              <span className="text-ink">{selectedProject.category}</span>
              <span className="mx-2">/</span>
              <span>{selectedProject.year}</span>
              <span className="mx-2">/</span>
              <span>SCROLL &amp; INTERACT INSIDE PROJECT</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
