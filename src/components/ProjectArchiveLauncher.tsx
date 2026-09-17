import React, { useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { ARCHIVE_COUNT, ARCHIVE_FILTERS } from '../archiveData';

export const ProjectArchiveLauncher: React.FC = () => {
  const [query, setQuery] = useState('');

  const openArchive = (filter = 'all', search = query) => {
    const params = new URLSearchParams();
    if (filter !== 'all') params.set('filter', filter);
    if (search.trim()) params.set('q', search.trim());
    const suffix = params.toString() ? `?${params.toString()}` : '';
    window.location.href = `/projects${suffix}`;
  };

  return (
    <section className="border-t border-ink/10 bg-canvas px-5 py-7 md:px-10 md:py-9 lg:px-12">
      <div className="mx-auto w-full max-w-[1540px]">
        <div className="mb-5 flex items-center justify-between gap-6 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
          <span>
            PROJECT INDEX <span className="mx-2 text-ink/20">—</span>
            {String(ARCHIVE_COUNT).padStart(2, '0')} GITHUB PROJECTS
          </span>
          <a
            href="/projects"
            className="group hidden items-center gap-3 text-ink transition-opacity hover:opacity-55 md:inline-flex"
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
            className="min-w-0 bg-transparent text-[clamp(20px,2.7vw,42px)] font-[500] tracking-[-0.045em] text-ink outline-none placeholder:text-ink/22"
          />
          <button
            type="submit"
            className="group/submit inline-flex h-11 items-center gap-3 border-l border-ink/10 pl-4 font-mono text-[9px] uppercase tracking-[0.05em] text-ink transition-opacity hover:opacity-55 md:h-12 md:pl-7 md:text-[10px]"
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
              className={`shrink-0 border px-3 py-2 font-mono text-[8px] uppercase tracking-[0.06em] transition-colors md:px-4 md:text-[9px] ${
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
            className="ml-auto hidden shrink-0 items-center gap-3 pl-5 font-mono text-[9px] uppercase tracking-[0.05em] text-ink transition-opacity hover:opacity-55 lg:inline-flex"
          >
            VIEW {String(ARCHIVE_COUNT).padStart(2, '0')} PROJECTS
            <ArrowRight size={14} strokeWidth={1.4} />
          </a>
        </div>
      </div>
    </section>
  );
};
