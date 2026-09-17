import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { ARCHIVE_COUNT, ARCHIVE_FILTERS } from '../archiveData';

const LENS_SIZE = 44;
const LENS_ZOOM = 1.38;

export const ProjectArchiveLauncher: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const lensCloneRef = useRef<HTMLDivElement>(null);

  const openArchive = (filter = 'all', search = query) => {
    const params = new URLSearchParams();
    if (filter !== 'all') params.set('filter', filter);
    if (search.trim()) params.set('q', search.trim());
    const suffix = params.toString() ? `?${params.toString()}` : '';
    window.location.href = `/projects${suffix}`;
  };

  const syncLensContent = () => {
    const source = contentRef.current;
    const clone = lensCloneRef.current;
    if (!source || !clone) return;

    clone.innerHTML = source.innerHTML;
    clone.querySelectorAll<HTMLElement>('input, button, a').forEach((element) => {
      element.tabIndex = -1;
      element.setAttribute('aria-hidden', 'true');
    });

    const clonedInput = clone.querySelector('input') as HTMLInputElement | null;
    if (clonedInput) clonedInput.value = query;
  };

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)');
    const update = () => setIsCoarsePointer(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    syncLensContent();
  }, [query]);

  const moveLens = (event: React.PointerEvent<HTMLElement>) => {
    if (isCoarsePointer || event.pointerType === 'touch') return;

    const source = contentRef.current;
    const lens = lensRef.current;
    const clone = lensCloneRef.current;
    if (!source || !lens || !clone) return;

    const rect = source.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;

    lens.style.opacity = '1';
    lens.style.transform = `translate3d(${event.clientX - LENS_SIZE / 2}px, ${event.clientY - LENS_SIZE / 2}px, 0)`;

    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.transform = `translate3d(${LENS_SIZE / 2 - localX * LENS_ZOOM}px, ${LENS_SIZE / 2 - localY * LENS_ZOOM}px, 0) scale(${LENS_ZOOM})`;
  };

  const hideLens = () => {
    if (lensRef.current) lensRef.current.style.opacity = '0';
  };

  return (
    <section
      id="work"
      className="relative border-t border-ink/10 bg-canvas md:cursor-none"
      onPointerEnter={(event) => {
        syncLensContent();
        moveLens(event);
      }}
      onPointerMove={moveLens}
      onPointerLeave={hideLens}
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (!target.closest('input, button, a')) openArchive();
      }}
    >
      <div ref={contentRef} className="px-5 py-7 md:px-10 md:py-9 lg:px-12">
        <div className="mx-auto w-full max-w-[1540px]">
          <div className="mb-5 flex items-center justify-between gap-6 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
            <span>
              PROJECT INDEX <span className="mx-2 text-ink/20">—</span>
              {String(ARCHIVE_COUNT).padStart(2, '0')} GITHUB PROJECTS
            </span>
            <a
              href="/projects"
              className="group hidden items-center gap-3 text-ink transition-opacity hover:opacity-55 md:inline-flex md:cursor-none"
            >
              EXPLORE ALL
              <ArrowRight size={14} strokeWidth={1.4} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              openArchive();
            }}
            className="group grid min-h-[82px] grid-cols-[auto_1fr_auto] items-center gap-4 border-y border-ink/10 md:min-h-[98px] md:gap-6"
          >
            <Search size={20} strokeWidth={1.25} className="text-muted-gray transition-colors group-focus-within:text-ink md:h-6 md:w-6" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects, tools, experiments..."
              aria-label="Search all projects"
              className="min-w-0 cursor-none bg-transparent text-[clamp(20px,2.7vw,42px)] font-[500] tracking-[-0.045em] text-ink outline-none placeholder:text-ink/22"
            />
            <button
              type="submit"
              className="group/submit inline-flex h-11 cursor-none items-center gap-3 border-l border-ink/10 pl-4 font-mono text-[9px] uppercase tracking-[0.05em] text-ink transition-opacity hover:opacity-55 md:h-12 md:pl-7 md:text-[10px]"
            >
              SEARCH ARCHIVE
              <ArrowRight size={14} strokeWidth={1.4} className="transition-transform group-hover/submit:translate-x-1" />
            </button>
          </form>

          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
            {ARCHIVE_FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => openArchive(filter.value, '')}
                className={`shrink-0 cursor-none border px-3 py-2 font-mono text-[8px] uppercase tracking-[0.06em] transition-colors md:px-4 md:text-[9px] ${
                  filter.value === 'all'
                    ? 'border-ink bg-ink text-canvas'
                    : 'border-ink/12 text-muted-gray hover:border-ink/35 hover:text-ink'
                }`}
              >
                {filter.label}
              </button>
            ))}

            <a
              href="/projects"
              className="ml-auto hidden shrink-0 cursor-none items-center gap-3 pl-5 font-mono text-[9px] uppercase tracking-[0.05em] text-ink transition-opacity hover:opacity-55 lg:inline-flex"
            >
              VIEW {String(ARCHIVE_COUNT).padStart(2, '0')} PROJECTS
              <ArrowRight size={14} strokeWidth={1.4} />
            </a>
          </div>
        </div>
      </div>

      {!isCoarsePointer && (
        <div
          ref={lensRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[180] overflow-hidden rounded-full border border-ink/80 bg-canvas opacity-0 shadow-[0_3px_14px_rgba(17,17,17,0.16),inset_0_0_0_1px_rgba(255,255,255,0.65)] will-change-transform"
          style={{ width: LENS_SIZE, height: LENS_SIZE, transition: 'opacity 120ms ease' }}
        >
          <div
            ref={lensCloneRef}
            className="pointer-events-none absolute left-0 top-0 origin-top-left bg-canvas"
            style={{ transformOrigin: 'top left', willChange: 'transform' }}
          />
          <span className="pointer-events-none absolute inset-[3px] rounded-full border border-white/35" />
          <span className="pointer-events-none absolute left-[9px] top-[7px] h-[5px] w-[10px] rotate-[-28deg] rounded-full bg-white/45 blur-[0.2px]" />
        </div>
      )}
    </section>
  );
};
