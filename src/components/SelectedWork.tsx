import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useUI } from '../context/UIContext';
import { DEFAULT_AMBIENT, PROJECTS, type ProjectData } from '../data';

const ProjectCover: React.FC<{ project: ProjectData; priority?: boolean }> = ({ project, priority = false }) => {
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
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: project.ambientColor }}
    >
      {!coverFailed && (
        <img
          src={coverSrc}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={handleCoverError}
          className={`h-full w-full transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.018] ${
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
  size?: 'featured' | 'medium' | 'standard';
  className?: string;
  priority?: boolean;
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
  priority = false,
  onEnter,
  onLeave,
  onOpen,
  onFocusProject,
  onBlurProject,
}) => {
  const titleSize =
    size === 'featured'
      ? 'text-[21px] md:text-[26px]'
      : size === 'medium'
        ? 'text-[17px] md:text-[19px]'
        : 'text-[15px] md:text-[17px]';

  return (
    <motion.button
      type="button"
      layoutId={`project-media-${project.id}`}
      className={`group relative overflow-hidden rounded-[6px] bg-[#ecebe6] text-left shadow-[0_8px_24px_rgba(17,17,17,0.055)] focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-4 ${className}`}
      whileHover={{ y: -4, scale: 1.006, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }}
      whileFocus={{ y: -3 }}
      onMouseEnter={() => onEnter(project)}
      onMouseLeave={onLeave}
      onFocus={() => onFocusProject(project)}
      onBlur={onBlurProject}
      onClick={() => onOpen(project)}
      aria-label={`Open ${project.title} fullscreen project`}
    >
      <ProjectCover project={project} priority={priority} />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/14 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

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

  return (
    <>
      <section
        id="work"
        className="pointer-events-auto relative w-full scroll-mt-3 rounded-[10px] bg-canvas px-5 py-7 shadow-[0_20px_70px_rgba(17,17,17,0.07)] md:scroll-mt-6 md:px-10 md:py-8 lg:px-12"
      >
        <div className="mx-auto w-full max-w-[1540px]">
          <header className="mb-4 flex items-end justify-between gap-8 md:mb-5">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
                02 / SELECTED WORK
              </div>
              <h2 className="mt-2 text-[clamp(30px,3vw,50px)] font-[500] leading-[0.95] tracking-[-0.045em] text-ink">
                Selected work.
              </h2>
            </div>

            <div className="hidden max-w-[350px] text-right md:block">
              <p className="text-[13px] leading-[1.45] tracking-[-0.015em] text-ink/70">
                Seven projects, arranged by emphasis rather than chronology. Choose one to open the live experience.
              </p>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray">
                01 FEATURED / 02 SELECTED / 04 INDEX
              </p>
            </div>
          </header>

          <div className="grid gap-3 lg:h-[360px] lg:grid-cols-12 xl:h-[390px]">
            <ProjectCard
              project={PROJECTS[0]}
              size="featured"
              priority
              className="min-h-[330px] lg:col-span-7 lg:h-full lg:min-h-0"
              {...cardHandlers}
            />

            <div className="grid gap-3 md:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:grid-rows-2">
              {PROJECTS.slice(1, 3).map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  size="medium"
                  className="min-h-[240px] lg:h-full lg:min-h-0"
                  {...cardHandlers}
                />
              ))}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:h-[170px] lg:grid-cols-4 xl:h-[190px]">
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
            <span>DESIGN · DEVELOPMENT · INTERACTION</span>
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
              <span>SCROLL & INTERACT INSIDE PROJECT</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
