import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Search, X } from 'lucide-react';
import {
  ARCHIVE_COUNT,
  ARCHIVE_FILTERS,
  ARCHIVE_PROJECTS,
  type ArchiveCategory,
} from '../archiveData';

type ArchiveFilter = 'all' | ArchiveCategory;

const isArchiveFilter = (value: string | null): value is ArchiveFilter =>
  value === 'all' || ARCHIVE_FILTERS.some((filter) => filter.value === value);

const githubFallback = (repo: string) => `https://github.com/omeryigitler/${repo}`;

const displayUrl = (url: string) =>
  url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');

const previewName = (repo: string) =>
  repo
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const previewUrl = (repo: string) => `/project-previews/${previewName(repo)}.png`;

export const ProjectsPageV2: React.FC = () => {
  const initialParams = new URLSearchParams(window.location.search);
  const initialFilter = initialParams.get('filter');
  const [query, setQuery] = useState(initialParams.get('q') ?? '');
  const [filter, setFilter] = useState<ArchiveFilter>(
    isArchiveFilter(initialFilter) ? initialFilter : 'all',
  );
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [loadedPreview, setLoadedPreview] = useState<string | null>(null);
  const [failedPreviews, setFailedPreviews] = useState<Set<string>>(() => new Set());

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return ARCHIVE_PROJECTS.filter((project) => {
      const matchesFilter = filter === 'all' || project.category === filter;
      const matchesQuery =
        !normalized ||
        project.title.toLowerCase().includes(normalized) ||
        project.repo.toLowerCase().includes(normalized) ||
        project.category.toLowerCase().includes(normalized) ||
        project.kind.toLowerCase().includes(normalized) ||
        project.stack.some((item) => item.toLowerCase().includes(normalized));

      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  const syncUrl = (nextFilter: ArchiveFilter, nextQuery: string) => {
    const params = new URLSearchParams();
    if (nextFilter !== 'all') params.set('filter', nextFilter);
    if (nextQuery.trim()) params.set('q', nextQuery.trim());
    window.history.replaceState(null, '', `/projects${params.toString() ? `?${params}` : ''}`);
  };

  const updateFilter = (nextFilter: ArchiveFilter) => {
    setFilter(nextFilter);
    syncUrl(nextFilter, query);
  };

  const updateQuery = (nextQuery: string) => {
    setQuery(nextQuery);
    syncUrl(filter, nextQuery);
  };

  const showPreview = (repo: string) => {
    if (failedPreviews.has(repo)) return;
    setLoadedPreview(null);
    setActivePreview(repo);
  };

  const hidePreview = (repo: string) => {
    setActivePreview((current) => (current === repo ? null : current));
    setLoadedPreview((current) => (current === repo ? null : current));
  };

  const markFailed = (repo: string) => {
    setFailedPreviews((current) => {
      const next = new Set(current);
      next.add(repo);
      return next;
    });
    setLoadedPreview(null);
  };

  return (
    <section className="min-h-[calc(100svh-24px)] w-full rounded-[22px] border border-white/70 bg-canvas px-5 pb-12 pt-7 shadow-[0_24px_80px_rgba(17,17,17,0.065)] md:min-h-[calc(100svh-48px)] md:px-10 md:pb-16 md:pt-9 lg:px-12">
      <div className="mx-auto w-full max-w-[1540px]">
        <header className="flex items-center justify-between gap-6 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
          <div className="flex items-center gap-4">
            <span className="text-ink">PROJECT ARCHIVE</span>
            <span className="h-px w-8 bg-soft-gray" aria-hidden="true" />
            <span>{String(ARCHIVE_COUNT).padStart(2, '0')} PROJECTS INDEXED</span>
          </div>
          <a href="/" className="group inline-flex items-center gap-3 text-ink transition-opacity hover:opacity-55">
            <ArrowLeft size={14} strokeWidth={1.4} className="transition-transform group-hover:-translate-x-1" />
            BACK HOME
          </a>
        </header>

        <div className="pb-12 pt-16 md:pb-16 md:pt-24">
          <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.07em] text-muted-gray md:text-[10px]">
            EVERYTHING I&apos;VE BUILT / SHIPPED / TESTED
          </p>
          <h1 className="max-w-[1240px] text-[clamp(54px,8.4vw,144px)] font-[560] leading-[0.86] tracking-[-0.065em] text-ink">
            All projects,
            <br />
            experiments &amp; tools<span className="text-acid">.</span>
          </h1>
        </div>

        <div className="sticky top-0 z-30 -mx-1 mb-8 bg-canvas/92 px-1 pb-3 pt-0 backdrop-blur-xl md:top-0 md:mb-10">
          <div className="grid min-h-[74px] grid-cols-[auto_1fr_auto] items-center gap-4 border-y border-ink/10 md:min-h-[88px] md:gap-6">
            <Search size={20} strokeWidth={1.25} className="text-muted-gray md:h-6 md:w-6" />
            <input
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="Search all projects..."
              className="min-w-0 bg-transparent text-[clamp(20px,2.2vw,36px)] font-[500] tracking-[-0.04em] text-ink outline-none placeholder:text-ink/22"
              aria-label="Search project archive"
            />
            <div className="flex items-center gap-4">
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray sm:block">
                {String(results.length).padStart(2, '0')} RESULTS
              </span>
              {query && (
                <button
                  type="button"
                  onClick={() => updateQuery('')}
                  className="grid h-9 w-9 place-items-center border-l border-ink/10 text-muted-gray transition-colors hover:text-ink"
                  aria-label="Clear search"
                >
                  <X size={16} strokeWidth={1.4} />
                </button>
              )}
            </div>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {ARCHIVE_FILTERS.map((item) => {
              const active = item.value === filter;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => updateFilter(item.value)}
                  className={`shrink-0 border px-3 py-2 font-mono text-[8px] uppercase tracking-[0.06em] transition-colors md:px-4 md:text-[9px] ${
                    active
                      ? 'border-ink bg-ink text-canvas'
                      : 'border-ink/12 text-muted-gray hover:border-ink/35 hover:text-ink'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 border-l border-t border-ink/10 md:grid-cols-2 xl:grid-cols-3">
            {results.map((project, index) => {
              const repositoryUrl = project.githubUrl ?? githubFallback(project.repo);
              const targetUrl = project.siteUrl ?? repositoryUrl;
              const hasLiveSite = Boolean(project.siteUrl);
              const previewActive = hasLiveSite && activePreview === project.repo;
              const previewLoaded = previewActive && loadedPreview === project.repo;

              return (
                <a
                  key={project.repo}
                  href={targetUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => hasLiveSite && showPreview(project.repo)}
                  onMouseLeave={() => hasLiveSite && hidePreview(project.repo)}
                  onFocus={() => hasLiveSite && showPreview(project.repo)}
                  onBlur={() => hasLiveSite && hidePreview(project.repo)}
                  className={`group relative flex min-h-[350px] overflow-hidden border-b border-r border-ink/10 p-5 md:min-h-[390px] md:p-6 ${
                    hasLiveSite ? 'bg-canvas' : 'transition-colors hover:bg-white'
                  }`}
                >
                  {previewActive && !failedPreviews.has(project.repo) && (
                    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
                      <img
                        src={previewUrl(project.repo)}
                        alt=""
                        onLoad={() => setLoadedPreview(project.repo)}
                        onError={() => markFailed(project.repo)}
                        className={`absolute inset-0 h-full w-full object-cover object-center transition-[opacity,transform] duration-450 ease-out ${
                          previewLoaded ? 'scale-100 opacity-100' : 'scale-[1.01] opacity-0'
                        }`}
                      />
                    </div>
                  )}

                  {hasLiveSite && (
                    <div
                      className={`pointer-events-none absolute inset-0 z-10 bg-canvas transition-opacity duration-250 ${previewLoaded ? 'opacity-0' : 'opacity-100'}`}
                      aria-hidden="true"
                    />
                  )}

                  <div className={`relative z-20 flex w-full flex-col transition-[opacity,transform] duration-250 ease-out ${previewLoaded ? 'pointer-events-none scale-[0.985] opacity-0' : 'scale-100 opacity-100'}`}>
                    <div className="flex items-start justify-between gap-6">
                      <span className="font-mono text-[9px] tracking-[0.05em] text-muted-gray md:text-[10px]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray md:text-[9px]">
                        {project.category}
                      </span>
                    </div>

                    <div className="mt-12 md:mt-16">
                      <h2 className="max-w-[92%] text-[clamp(24px,2.4vw,40px)] font-[520] leading-[0.96] tracking-[-0.045em] text-ink">
                        {project.title}
                      </h2>
                      <p className="mt-4 break-all font-mono text-[8px] uppercase tracking-[0.04em] text-muted-gray md:text-[9px]">
                        {hasLiveSite ? project.siteLabel ?? displayUrl(project.siteUrl!) : `github / omeryigitler / ${project.repo}`}
                      </p>

                      <div className="mt-7 space-y-2 border-t border-ink/10 pt-4 font-mono text-[8px] uppercase tracking-[0.055em] md:text-[9px]">
                        <div className="grid grid-cols-[64px_1fr] gap-3">
                          <span className="text-muted-gray">PROJECT</span>
                          <span className="text-ink/82">{project.kind}</span>
                        </div>
                        <div className="grid grid-cols-[64px_1fr] gap-3">
                          <span className="text-muted-gray">STACK</span>
                          <span className="text-ink/82">{project.stack.join(' · ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto flex items-end justify-between gap-6 pt-8 font-mono text-[8px] uppercase tracking-[0.06em] md:text-[9px]">
                      <span className="text-muted-gray">{hasLiveSite ? 'LIVE PROJECT' : 'REPOSITORY'}</span>
                      <span className="inline-flex items-center gap-2 text-ink">
                        {hasLiveSite ? 'LIVE SITE' : 'GITHUB'}
                        <ArrowUpRight size={13} strokeWidth={1.4} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="grid min-h-[42svh] place-items-center border-y border-ink/10 text-center">
            <div>
              <p className="text-[clamp(28px,4vw,54px)] font-[520] tracking-[-0.045em] text-ink">
                No matching projects<span className="text-acid">.</span>
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setFilter('all');
                  syncUrl('all', '');
                }}
                className="mt-6 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray underline underline-offset-4 hover:text-ink"
              >
                RESET ARCHIVE
              </button>
            </div>
          </div>
        )}

        <footer className="mt-8 flex flex-col gap-3 border-t border-ink/10 pt-5 font-mono text-[8px] uppercase tracking-[0.06em] text-muted-gray sm:flex-row sm:items-center sm:justify-between md:text-[9px]">
          <span>{String(ARCHIVE_COUNT).padStart(2, '0')} PROJECTS / STATIC UI PREVIEWS / LIVE SITE FIRST</span>
          <span>DESIGN / DEVELOPMENT / COMMERCE / TOOLS / EXPERIMENTS</span>
        </footer>
      </div>
    </section>
  );
};
