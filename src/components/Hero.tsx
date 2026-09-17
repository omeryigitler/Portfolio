import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DEFAULT_AMBIENT, PROJECTS, type ProjectData } from '../data';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const HeroPreviewImage: React.FC<{ project: ProjectData }> = ({ project }) => {
  const [src, setSrc] = useState(project.coverImage);

  useEffect(() => setSrc(project.coverImage), [project.coverImage]);

  return (
    <motion.img
      key={`${project.id}-${src}`}
      src={src}
      alt=""
      decoding="async"
      onError={() => {
        if (project.coverFallback && src !== project.coverFallback) setSrc(project.coverFallback);
      }}
      initial={{ opacity: 0, scale: 1.035 }}
      animate={{ opacity: 0.38, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute inset-0 h-full w-full ${project.coverFit === 'contain' ? 'object-contain p-[12%]' : 'object-cover'} grayscale-[0.16]`}
    />
  );
};

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [previewProject, setPreviewProject] = useState<ProjectData>(PROJECTS[0]);
  const { setActiveAmbient } = useTheme();

  useEffect(() => {
    if (!heroRef.current || !mediaRef.current || !cardRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set('.hero-kicker', { autoAlpha: 0, y: 10 });
      gsap.set('.hero-card', { autoAlpha: 0, y: 26, scale: 0.985 });
      gsap.set('.hero-card-title-line > span', { yPercent: 108 });
      gsap.set('.hero-project-index', { autoAlpha: 0, y: 12 });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro.to('.hero-kicker', { autoAlpha: 1, y: 0, duration: 0.55 }, 0.08);
      intro.to('.hero-card', { autoAlpha: 1, y: 0, scale: 1, duration: 0.78 }, 0.16);
      intro.to(
        '.hero-card-title-line > span',
        { yPercent: 0, duration: 0.82, stagger: 0.085 },
        0.34,
      );
      intro.to('.hero-project-index', { autoAlpha: 1, y: 0, duration: 0.58 }, 0.68);

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.9,
        },
      });

      scrollTl.to(mediaRef.current, { scale: 1.07, yPercent: 4, ease: 'none' }, 0);
      scrollTl.to(cardRef.current, { yPercent: -20, scale: 0.945, autoAlpha: 0.14, ease: 'none' }, 0);
      scrollTl.to('.hero-kicker', { y: -20, autoAlpha: 0, ease: 'none' }, 0);
      scrollTl.to('.hero-project-index', { y: -10, autoAlpha: 0, ease: 'none' }, 0.08);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    return () => setActiveAmbient(DEFAULT_AMBIENT);
  }, [setActiveAmbient]);

  const preview = (project: ProjectData) => {
    setPreviewProject(project);
    setActiveAmbient(project.ambientColor);
  };

  const resetPreview = () => {
    setPreviewProject(PROJECTS[0]);
    setActiveAmbient(DEFAULT_AMBIENT);
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[calc(100svh-24px)] w-full scroll-mt-3 overflow-hidden bg-[#090909] text-white md:min-h-[calc(100svh-48px)] md:scroll-mt-6"
    >
      <div ref={mediaRef} className="absolute -inset-[4%] overflow-hidden will-change-transform">
        <div className="absolute inset-0" style={{ backgroundColor: previewProject.ambientColor }} />
        <AnimatePresence mode="sync">
          <HeroPreviewImage key={previewProject.id} project={previewProject} />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,4,4,0.82)_0%,rgba(4,4,4,0.48)_50%,rgba(4,4,4,0.7)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0.04)_46%,rgba(0,0,0,0.64)_100%)]" />
      </div>

      <div className="hero-kicker absolute inset-x-5 top-6 z-20 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.08em] text-white/65 md:inset-x-12 md:top-9 md:text-[9px] lg:inset-x-14">
        <span>ÖMER YİĞİTLER</span>
        <span className="hidden md:inline">INDEPENDENT DESIGNER + DEVELOPER / 2026</span>
        <span>MALTA</span>
      </div>

      <div className="relative z-10 flex min-h-[calc(100svh-24px)] items-center px-5 pb-44 pt-24 md:min-h-[calc(100svh-48px)] md:px-12 md:pb-48 lg:px-14">
        <div
          ref={cardRef}
          className="hero-card relative ml-[1vw] flex aspect-[1/1.03] w-[min(88vw,520px)] flex-col justify-between bg-[#f6f5f1] p-5 text-[#111] shadow-[0_30px_100px_rgba(0,0,0,0.22)] md:ml-[4vw] md:w-[min(42vw,560px)] md:p-6 lg:ml-[5vw] lg:w-[min(35vw,590px)]"
        >
          <div className="flex items-start justify-between gap-6 text-[10px] tracking-[-0.015em] text-black/58 md:text-[11px]">
            <span>Ömer Yiğitler</span>
            <span>Based in Malta</span>
          </div>

          <div>
            <div className="mb-2 flex items-end justify-between gap-6 text-[9px] tracking-[-0.01em] text-black/55 md:text-[10px]">
              <span>Independent Designer + Developer</span>
              <span className="font-mono">(01*)</span>
            </div>

            <h1 className="text-[clamp(38px,4.35vw,74px)] font-[560] leading-[0.82] tracking-[-0.067em]">
              <span className="hero-card-title-line block overflow-hidden pb-[0.07em]"><span className="block">Digital experiences</span></span>
              <span className="hero-card-title-line block overflow-hidden pb-[0.07em]"><span className="block">with character,</span></span>
              <span className="hero-card-title-line block overflow-hidden pb-[0.11em]"><span className="block">clarity &amp; precision.</span></span>
            </h1>
          </div>
        </div>
      </div>

      <div
        className="hero-project-index absolute inset-x-5 bottom-5 z-20 md:inset-x-12 md:bottom-8 lg:inset-x-14"
        onMouseLeave={resetPreview}
      >
        <div className="flex items-end justify-between gap-5 border-b border-white/18 pb-2.5 font-mono text-[8px] uppercase tracking-[0.075em] text-white/56 md:text-[9px]">
          <div className="flex items-center gap-3">
            <span className="text-white">SELECTED WORK</span>
            <span>{String(PROJECTS.length).padStart(2, '0')} PROJECTS</span>
            <span className="hidden lg:inline">HOVER TO PREVIEW / CLICK TO JUMP</span>
          </div>

          <a
            href="#contact"
            className="group hidden items-center gap-2 font-sans text-[10px] font-[600] tracking-[0.01em] text-white md:inline-flex"
          >
            START A PROJECT
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="mt-2.5 flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-7 md:overflow-visible md:pb-0">
          {PROJECTS.map((project) => {
            const active = previewProject.id === project.id;

            return (
              <a
                key={project.id}
                href={`#project-${project.id}`}
                onMouseEnter={() => preview(project)}
                onFocus={() => preview(project)}
                onBlur={resetPreview}
                className={`group min-w-[128px] border-t px-1.5 pt-2 text-left transition-colors duration-300 md:min-w-0 ${active ? 'border-white/80' : 'border-white/16 hover:border-white/45'}`}
                aria-label={`Jump to ${project.title}`}
              >
                <span className={`block font-mono text-[8px] tracking-[0.06em] transition-colors ${active ? 'text-white/85' : 'text-white/36'}`}>
                  {project.number}
                </span>
                <span className={`mt-1 block truncate text-[10px] font-[560] uppercase tracking-[-0.01em] transition-colors md:text-[11px] ${active ? 'text-white' : 'text-white/58 group-hover:text-white/90'}`}>
                  {project.title}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
