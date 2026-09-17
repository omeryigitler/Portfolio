import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';
import { useUI } from '../context/UIContext';
import { DEFAULT_AMBIENT, PROJECTS, type ProjectData } from '../data';

gsap.registerPlugin(ScrollTrigger);

const ProjectImage: React.FC<{ project: ProjectData; priority?: boolean }> = ({ project, priority = false }) => {
  const [src, setSrc] = useState(project.coverImage);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setSrc(project.coverImage);
    setFailed(false);
  }, [project.coverImage]);

  const onError = () => {
    if (project.coverFallback && src !== project.coverFallback) {
      setSrc(project.coverFallback);
      return;
    }
    setFailed(true);
  };

  if (failed) {
    return (
      <div className="absolute inset-0 grid place-items-center" style={{ backgroundColor: project.ambientColor }}>
        <span className="max-w-[14ch] text-center text-[clamp(38px,7vw,120px)] font-[560] leading-[0.85] tracking-[-0.06em] text-black/20">
          {project.title}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={onError}
      className={`h-full w-full ${project.coverFit === 'contain' ? 'object-contain p-[8%]' : 'object-cover'}`}
    />
  );
};

const ProjectLiveViewport: React.FC<{ project: ProjectData }> = ({ project }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(false), [project.url]);

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

type ProjectChapterProps = {
  project: ProjectData;
  index: number;
  onEnter: (project: ProjectData) => void;
  onLeave: () => void;
  onOpen: (project: ProjectData) => void;
};

const ProjectChapter: React.FC<ProjectChapterProps> = ({ project, index, onEnter, onLeave, onOpen }) => {
  return (
    <motion.button
      type="button"
      layoutId={`project-media-${project.id}`}
      className="project-stage group relative block h-[82svh] w-full overflow-hidden border-t border-white/10 bg-[#111] text-left focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-[-2px] md:h-[96svh]"
      onMouseEnter={() => onEnter(project)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(project)}
      onBlur={onLeave}
      onClick={() => onOpen(project)}
      aria-label={`Open ${project.title} fullscreen project`}
    >
      <div className="project-stage-mask absolute inset-0 overflow-hidden">
        <div className="project-stage-media absolute -inset-y-[4%] inset-x-0 will-change-transform" style={{ backgroundColor: project.ambientColor }}>
          <ProjectImage project={project} priority={index < 2} />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-black/16 transition-colors duration-700 group-hover:bg-black/10" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0.02)_42%,rgba(0,0,0,0.58)_100%)]" />

      <div className="project-stage-info absolute inset-x-5 top-5 z-10 flex items-start justify-between gap-6 font-mono text-[8px] uppercase tracking-[0.075em] text-white/72 md:inset-x-10 md:top-8 md:text-[9px] lg:inset-x-12">
        <span>{project.number} / {String(PROJECTS.length).padStart(2, '0')}</span>
        <span>{project.category} / {project.year}</span>
      </div>

      <div className="project-stage-info absolute inset-x-5 bottom-5 z-10 flex items-end justify-between gap-6 md:inset-x-10 md:bottom-8 lg:inset-x-12">
        <div>
          <div className="mb-2 font-mono text-[8px] uppercase tracking-[0.08em] text-white/58 md:text-[9px]">
            SELECTED PROJECT
          </div>
          <h3 className="max-w-[12ch] text-[clamp(44px,7vw,118px)] font-[560] leading-[0.84] tracking-[-0.06em] text-white">
            {project.title}
          </h3>
        </div>

        <span className="hidden items-center gap-3 pb-1 text-[10px] font-[600] uppercase tracking-[0.01em] text-white md:inline-flex">
          OPEN LIVE
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>
    </motion.button>
  );
};

export const SelectedWork: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
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
    if (!sectionRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-intro-inner',
        { y: 26, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)' },
        {
          y: 0,
          autoAlpha: 1,
          clipPath: 'inset(0 0 0% 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 96%',
            end: 'top 72%',
            scrub: 0.8,
          },
        },
      );

      const stages = gsap.utils.toArray<HTMLElement>('.project-stage');

      stages.forEach((stage) => {
        const mask = stage.querySelector<HTMLElement>('.project-stage-mask');
        const media = stage.querySelector<HTMLElement>('.project-stage-media');
        const info = stage.querySelectorAll<HTMLElement>('.project-stage-info');
        if (!mask || !media) return;

        gsap.fromTo(
          mask,
          { clipPath: 'inset(10% 6% 10% 6%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            scrollTrigger: {
              trigger: stage,
              start: 'top 96%',
              end: 'top 54%',
              scrub: 0.95,
            },
          },
        );

        gsap.fromTo(
          media,
          { scale: 1.065, yPercent: 2.5 },
          {
            scale: 1,
            yPercent: -2.5,
            ease: 'none',
            scrollTrigger: {
              trigger: stage,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        );

        gsap.fromTo(
          info,
          { y: 26, autoAlpha: 0.12 },
          {
            y: 0,
            autoAlpha: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: stage,
              start: 'top 82%',
              end: 'top 54%',
              scrub: 0.85,
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

  return (
    <>
      <section id="work" ref={sectionRef} className="relative w-full scroll-mt-0 bg-[#090909] text-white">
        <div className="work-intro flex min-h-[190px] items-end border-t border-white/10 px-5 pb-7 pt-12 md:min-h-[230px] md:px-10 md:pb-10 lg:px-12">
          <div className="work-intro-inner flex w-full items-end justify-between gap-8">
            <div>
              <div className="font-mono text-[8px] uppercase tracking-[0.08em] text-white/45 md:text-[9px]">
                02 / SELECTED WORK
              </div>
              <p className="mt-3 max-w-[620px] text-[clamp(24px,3vw,46px)] font-[500] leading-[0.95] tracking-[-0.045em] text-white">
                A selection of digital experiences, built from direction to production.
              </p>
            </div>
            <span className="hidden font-mono text-[8px] uppercase tracking-[0.08em] text-white/42 md:block md:text-[9px]">
              {String(PROJECTS.length).padStart(2, '0')} PROJECTS / SCROLL TO EXPLORE
            </span>
          </div>
        </div>

        {PROJECTS.map((project, index) => (
          <ProjectChapter
            key={project.id}
            project={project}
            index={index}
            onEnter={handleEnter}
            onLeave={handleLeave}
            onOpen={openProject}
          />
        ))}
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
