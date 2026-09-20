import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ARCHIVE_COUNT } from '../archiveData';

type FeaturedProject = {
  number: string;
  title: string;
  label: string;
  description: string;
  image: string;
  href: string;
  action: string;
  grid: string;
  aspect: string;
};

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    number: '01',
    title: 'Reformer Pilates Malta',
    label: 'BOOKING WEBSITE',
    description: 'A fitness booking platform designed to make classes easy to discover and reserve.',
    image: '/project-previews/reformerpilatesmalta-com.png',
    href: 'https://reformerpilatesmalta.com',
    action: 'OPEN WEBSITE',
    grid: 'lg:col-span-7',
    aspect: 'aspect-[16/10]',
  },
  {
    number: '02',
    title: 'Berfin Akbaş',
    label: 'SERVICE WEBSITE',
    description: 'A speech therapist website built around clear services and appointment-focused navigation.',
    image: '/project-previews/berfinakbas-com.png',
    href: 'https://berfinakbas-com.vercel.app',
    action: 'OPEN WEBSITE',
    grid: 'lg:col-span-5',
    aspect: 'aspect-[4/5] lg:aspect-[5/6]',
  },
  {
    number: '03',
    title: 'XXL Cafe & Co.',
    label: 'COMMERCE WEBSITE',
    description: 'A coffee commerce experience with a visual, editorial approach to products and brand.',
    image: '/project-previews/xxl-cafe-o-co.png',
    href: 'https://xxl-cafe-o-co.vercel.app',
    action: 'OPEN WEBSITE',
    grid: 'lg:col-span-5',
    aspect: 'aspect-[4/5] lg:aspect-[5/6]',
  },
  {
    number: '04',
    title: 'Architecture eCommerce 3D',
    label: 'INTERACTIVE DEMO',
    description: 'An interactive 3D furniture commerce concept focused on product exploration.',
    image: '/project-previews/architecture-ecommerce-3d.png',
    href: 'https://architecture-e-commerce-3d.vercel.app',
    action: 'OPEN DEMO',
    grid: 'lg:col-span-7',
    aspect: 'aspect-[16/10]',
  },
];

const ProjectCard: React.FC<{ project: FeaturedProject }> = ({ project }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className={project.grid + ' group'}>
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        aria-label={project.action + ': ' + project.title}
        className="block focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-4"
      >
        <div className={'relative overflow-hidden border border-ink/10 bg-ink/[0.035] ' + project.aspect}>
          {!imageFailed ? (
            <img
              src={project.image}
              alt={project.title + ' website preview'}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.025]"
            />
          ) : (
            <div className="grid h-full w-full place-items-center px-6 text-center font-mono text-[9px] uppercase tracking-[0.07em] text-muted-gray">
              Preview unavailable — project link still works
            </div>
          )}
          <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-canvas/92 text-ink shadow-[0_8px_26px_rgba(17,17,17,0.12)] backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:right-4 md:top-4">
            <ArrowUpRight size={16} strokeWidth={1.35} />
          </span>
        </div>
      </a>

      <div className="grid gap-4 border-t border-ink/10 pt-4 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <div className="mb-2 flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.065em] text-muted-gray md:text-[9px]">
            <span className="text-ink">{project.number}</span>
            <span className="h-px w-5 bg-ink/15" aria-hidden="true" />
            <span>{project.label}</span>
          </div>
          <h3 className="text-[clamp(25px,2.4vw,42px)] font-[520] leading-[0.98] tracking-[-0.047em] text-ink">
            {project.title}
          </h3>
          <p className="mt-3 max-w-[620px] text-[13px] leading-[1.55] tracking-[-0.018em] text-ink/62 md:text-[14px]">
            {project.description}
          </p>
        </div>

        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          aria-label={project.action + ': ' + project.title}
          className="group/link inline-flex min-h-10 items-center gap-3 self-start font-mono text-[9px] uppercase tracking-[0.055em] text-ink transition-opacity hover:opacity-55 focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-3"
        >
          {project.action}
          <ArrowUpRight size={14} strokeWidth={1.4} className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
        </a>
      </div>
    </article>
  );
};

export const FeaturedProjects: React.FC = () => {
  return (
    <section id="work" className="relative scroll-mt-3 border-t border-ink/10 bg-canvas px-5 py-8 md:scroll-mt-6 md:px-12 md:py-12">
      <div className="mx-auto w-full max-w-[1580px]">
        <header className="grid gap-8 border-b border-ink/10 pb-8 md:grid-cols-[1fr_auto] md:items-end md:gap-12 md:pb-10">
          <div>
            <div className="mb-5 flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
              <span className="text-ink">02 / SELECTED WORK</span>
              <span className="h-px w-8 bg-soft-gray" aria-hidden="true" />
              <span>04 PROJECTS</span>
            </div>
            <h2 className="max-w-[1040px] text-[clamp(39px,5.5vw,88px)] font-[540] leading-[0.92] tracking-[-0.058em] text-ink">
              Things I’ve designed and built<span className="text-acid">.</span>
            </h2>
          </div>

          <p className="max-w-[360px] text-[13px] leading-[1.55] tracking-[-0.018em] text-ink/62 md:text-[14px]">
            A small cross-section of websites, commerce and interactive work. The project itself is always one click away.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-x-5 gap-y-12 py-8 md:gap-x-7 md:gap-y-16 md:py-12 lg:grid-cols-12">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="flex flex-col gap-5 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray">
            WANT THE FULL INDEX? <span className="text-ink">{String(ARCHIVE_COUNT).padStart(2, '0')} PROJECTS</span>
          </p>
          <a
            href="/projects"
            className="group inline-flex min-h-12 items-center justify-between gap-10 border border-ink/14 px-5 font-mono text-[10px] uppercase tracking-[0.055em] text-ink transition-colors hover:border-ink/35 focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-3"
          >
            VIEW ALL PROJECTS
            <ArrowRight size={15} strokeWidth={1.4} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
