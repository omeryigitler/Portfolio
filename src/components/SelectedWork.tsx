import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';
import { useUI } from '../context/UIContext';
import { DEFAULT_AMBIENT, PROJECTS, type ProjectData } from '../data';

gsap.registerPlugin(ScrollTrigger);

const ProjectCover: React.FC<{ project: ProjectData; priority?: boolean; className?: string }> = ({
  project,
  priority = false,
  className = '',
}) => {
  const [coverSrc, setCoverSrc] = useState(project.coverImage);
  const [coverFailed, setCoverFailed] = useState(false);

  useEffect(() => {
    setCoverSrc(project.coverImage);
    setCoverFailed(false);
  }, [project.coverImage]);

  const handleCoverError = () => {
    if (project.coverFallback && coverSrc !== project.coverFallback) {
      setCoverSrc(project.coverFallback);
      return;
    }
    setCoverFailed(true);
  };

  return (
    <div
      className={`project-cover absolute -inset-y-[3%] inset-x-0 overflow-hidden will-change-transform ${className}`}
      style={{ backgroundColor: project.ambientColor }}
    >
      {!coverFailed && (
        <img
          src={coverSrc}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={handleCoverError}
          className={`h-full w-full transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.012] ${
            project.coverFit === 'contain' ? 'object-contain p-[8%]' : 'object-cover'
          }`}
        />
      )}

      {coverFailed && (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center" aria-hidden="true">
          <span className="max-w-[14ch] text-[clamp(20px,2.2vw,38px)] font-[600] leading-[0.9] tracking-[-0.045em] text-ink/20">
            {project.title}
          </span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/[0.055]" />
    </div>
  );
};

const ProjectLiveViewport: React.FC<{ project: ProjectData }> = ({ project }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [project.url]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#ecebe6]">
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden="true"
      >
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

type ProjectCardProps = {
  project: ProjectData;
  size?: 'medium' | 'standard';
  className?: string;
  onEnter: (project: ProjectData) => void;
  onLeave: () => void;
  onOpen: (project: ProjectData) => void;
  onFocusProject: (project: ProjectData) => void;
  onBlurProject: () => void;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  size = 'standard',
  className = '',
  onEnter,
  onLeave,
  onOpen,
  onFocusProject,
  onBlurProject,
}) => {
  const titleSize = size === 'medium' ? 'text-[18px] md:text-[22px]' : 'text-[15px] md:text-[17px]';

  return (
    <motion.button
      type="button"
      layoutId={`project-media-${project.id}`}
      className={`project-card-standard group relative overflow-hidden rounded-[6px] bg-[#ecebe6] text-left shadow-[0_8px_24px_rgba(17,17,17,0.05)] focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-4 ${className}`}
      whileHover={{ y: -2, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }}
      whileFocus={{ y: -2 }}
      onMouseEnter={() => onEnter(project)}
      onMouseLeave={onLeave}
      onFocus={() => onFocusProject(project)}
      onBlur={onBlurProject}
      onClick={() => onOpen(project)}
      aria-label={`Open ${project.title} fullscreen project`}
    >
      <ProjectCover project={project} />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/12 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-[3px] border border-white/45 bg-canvas/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.06em] text-ink backdrop-blur-md md:text-[10px]">
        <span>{project.number}</span>
        <span className="h-[4px] w-[4px] rounded-full bg-acid" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 border-t border-ink/8 bg-canvas/95 px-3 py-3 backdrop-blur-md md:px-4 md:py-3.5">
        <div className="min-w-0">
          <p className={`${titleSize} truncate font-[600] leading-none tracking-[-0.035em] text-ink`}>
            {project.title}
          </p>
          <p className="mt-1.5 truncate font-mono text-[8px] uppercase tracking-[0.05em] text-muted-gray md:text-[9px]">
            {project.category} / {project.year}
          </p>
        </div>

        <ArrowUpRight
          size={17}
          strokeWidth={1.45}
          className="shrink-0 text-ink transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>
    </motion.button>
  );
};

export const SelectedWork: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredStageRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const { setActiveAmbient, setCursorState, setCursorText } = useTheme();
  const { setProjectOpen } = useUI();

  const resetCursor = () => {
    setCursorState('default');
    setCursorText('');
    document.body.classList.remove('hide-cursor');
  };

  const handleEnter = (project: ProjectData) => {
    setActiveAmbient(project.ambientColor);
    setCursorState('project');
    setCursorText(`VIEW ${project.number} ↗`);
    document.body.classList.add('hide-cursor');
  };

  const handleLeave = () => {
    setActiveAmbient(DEFAULT_AMBIENT);
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
    setActiveAmbient(DEFAULT_AMBIENT);
    resetCursor();
  };

  useEffect(() => {
    if (!sectionRef.current || !featuredStageRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-kicker',
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 98%',
            end: 'top 76%',
            scrub: 0.7,
          },
        },
      );

      gsap.fromTo(
        featuredStageRef.current,
        {
          y: 110,
          scale: 0.94,
          clipPath: 'inset(13% 4% 8% 4%)',
          borderRadius: 18,
          transformOrigin: '50% 0%',
        },
        {
          y: 0,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          borderRadius: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 98%',
            end: 'top 42%',
            scrub: 1,
          },
        },
      );

      const featuredCover = featuredStageRef.current.querySelector<HTMLElement>('.project-cover');
      if (featuredCover) {
        gsap.fromTo(
          featuredCover,
          { yPercent: 3.5, scale: 1.025 },
          {
            yPercent: -2.5,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: featuredStageRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          },
        );
      }

      gsap.fromTo(
        '.work-index-line',
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.work-index-line',
            start: 'top 92%',
            end: 'top 76%',
            scrub: 0.7,
          },
        },
      );

      const cards = gsap.utils.toArray<HTMLElement>('.project-card-standard');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 34, autoAlpha: 0.36, clipPath: 'inset(10% 0% 8% 0%)' },
          {
            y: 0,
            autoAlpha: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 96%',
              end: 'top 68%',
              scrub: 0.85,
            },
          },
        );

        const cover = card.querySelector<HTMLElement>('.project-cover');
        if (!cover) return;

        gsap.fromTo(
          cover,
          { yPercent: 2.2 },
          {
            yPercent: -2.2,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

  const cardHandlers = {
    onEnter: handleEnter,
    onLeave: handleLeave,
    onOpen: openProject,
    onFocusProject: (project: ProjectData) => setActiveAmbient(project.ambientColor),
    onBlurProject: () => setActiveAmbient(DEFAULT_AMBIENT),
  };

  const featured = PROJECTS[0];

  return (
    <>
      <section
        id="work"
        ref={sectionRef}
        className="pointer-events-auto relative z-20 -mt-[14svh] w-full scroll-mt-20 rounded-b-[21px] bg-canvas px-5 pb-7 pt-0 md:-mt-[16svh] md:px-10 md:pb-8 lg:px-12"
      >
        <div className="mx-auto w-full max-w-[1540px]">
          <div className="work-kicker flex items-end justify-between gap-6 border-t border-ink/10 pb-4 pt-4 font-mono text-[8px] uppercase tracking-[0.065em] text-muted-gray md:pb-5 md:pt-5 md:text-[9px]">
            <span>02 / SELECTED WORK</span>
            <span className="hidden sm:block">07 PROJECTS / LIVE ON CLICK</span>
          </div>

          <div ref={featuredStageRef} className="relative h-[58svh] min-h-[410px] overflow-hidden will-change-transform md:h-[68svh] md:min-h-[500px]">
            <motion.button
              type="button"
              layoutId={`project-media-${featured.id}`}
              className="group relative h-full w-full overflow-hidden rounded-[6px] bg-[#ecebe6] text-left focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-4"
              onMouseEnter={() => handleEnter(featured)}
              onMouseLeave={handleLeave}
              onFocus={() => setActiveAmbient(featured.ambientColor)}
              onBlur={() => setActiveAmbient(DEFAULT_AMBIENT)}
              onClick={() => openProject(featured)}
              aria-label={`Open ${featured.title} fullscreen project`}
            >
              <ProjectCover project={featured} priority className="featured-project-cover" />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/28 via-transparent to-transparent opacity-70" />

              <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-3 rounded-[3px] border border-white/35 bg-canvas/88 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.065em] text-ink backdrop-blur-md md:left-5 md:top-5 md:text-[9px]">
                <span>{featured.number} / FEATURED</span>
                <span className="h-[4px] w-[4px] rounded-full bg-acid" />
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 border-t border-white/20 bg-canvas/94 px-4 py-4 backdrop-blur-md md:px-6 md:py-5">
                <div className="min-w-0">
                  <p className="truncate text-[clamp(26px,3.1vw,52px)] font-[560] leading-[0.9] tracking-[-0.045em] text-ink">
                    {featured.title}
                  </p>
                  <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
                    {featured.category} / {featured.year}
                  </p>
                </div>

                <ArrowUpRight
                  size={23}
                  strokeWidth={1.3}
                  className="shrink-0 text-ink transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:translate-x-1 group-hover:-translate-y-1 md:h-7 md:w-7"
                />
              </div>
            </motion.button>
          </div>

          <div className="work-index-line mt-8 flex items-center justify-between border-t border-ink/10 pb-4 pt-4 font-mono text-[8px] uppercase tracking-[0.065em] text-muted-gray md:mt-10 md:text-[9px]">
            <span>PROJECT INDEX / 02—07</span>
            <span>DESIGN · DEVELOPMENT · INTERACTION</span>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:h-[330px] xl:h-[360px]">
            {PROJECTS.slice(1, 3).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                size="medium"
                className="min-h-[300px] lg:h-full lg:min-h-0"
                {...cardHandlers}
              />
            ))}
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:h-[190px] lg:grid-cols-4 xl:h-[210px]">
            {PROJECTS.slice(3).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                className="min-h-[240px] lg:h-full lg:min-h-0"
                {...cardHandlers}
              />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-ink/8 pt-4 font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
            <span>STATIC INDEX / LIVE AFTER CLICK</span>
            <span>07 SELECTED PROJECTS</span>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[200] bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} fullscreen project`}
          >
            <motion.div
              layoutId={`project-media-${selectedProject.id}`}
              className="absolute inset-0 overflow-hidden bg-white"
              transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectLiveViewport project={selectedProject} />
            </motion.div>

            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-3 md:p-4">
              <div className="pointer-events-auto flex max-w-[70vw] items-center gap-3 rounded-[5px] border border-ink/10 bg-canvas/94 px-3 py-2 shadow-[0_8px_28px_rgba(17,17,17,0.08)] backdrop-blur-xl md:px-4 md:py-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
                  {selectedProject.number} / {String(PROJECTS.length).padStart(2, '0')}
                </span>
                <span className="h-4 w-px bg-ink/12" />
                <span className="truncate text-[13px] font-[600] tracking-[-0.02em] text-ink md:text-[15px]">
                  {selectedProject.title}
                </span>
              </div>

              <div className="pointer-events-auto flex items-center gap-2">
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group hidden items-center gap-2 rounded-[5px] border border-ink/10 bg-canvas/94 px-3 py-2 text-[10px] font-[600] uppercase tracking-[0.01em] text-ink shadow-[0_8px_28px_rgba(17,17,17,0.08)] backdrop-blur-xl transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-acid sm:inline-flex md:px-4 md:py-3"
                >
                  OPEN LIVE
                  <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <button
                  type="button"
                  onClick={closeProject}
                  className="grid h-10 w-10 place-items-center rounded-[5px] border border-ink/10 bg-canvas/94 text-ink shadow-[0_8px_28px_rgba(17,17,17,0.08)] backdrop-blur-xl transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-acid md:h-11 md:w-11"
                  aria-label="Close fullscreen project"
                >
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
