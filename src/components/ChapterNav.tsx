import React, { useEffect, useMemo, useState } from 'react';
import { useUI } from '../context/UIContext';

const CHAPTERS = [
  { id: 'home', number: '01', label: 'INTRO' },
  { id: 'work', number: '02', label: 'SELECTED WORK' },
  { id: 'transition', number: '03', label: 'TRANSITION' },
  { id: 'about', number: '04', label: 'ABOUT' },
  { id: 'capabilities', number: '05', label: 'CAPABILITIES' },
  { id: 'contact', number: '06', label: 'CONTACT' },
] as const;

export const ChapterNav: React.FC = () => {
  const { isProjectOpen } = useUI();
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<(typeof CHAPTERS)[number]['id']>('home');

  const activeIndex = useMemo(
    () => Math.max(0, CHAPTERS.findIndex((chapter) => chapter.id === activeId)),
    [activeId],
  );

  useEffect(() => {
    let frame = 0;

    const updateActiveChapter = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const probe = window.innerHeight * 0.46;
        let nextId: (typeof CHAPTERS)[number]['id'] = 'home';

        CHAPTERS.forEach((chapter) => {
          const element = document.getElementById(chapter.id);
          if (!element) return;
          const bounds = element.getBoundingClientRect();
          if (bounds.top <= probe && bounds.bottom > probe) nextId = chapter.id;
        });

        setActiveId(nextId);
      });
    };

    updateActiveChapter();
    window.addEventListener('scroll', updateActiveChapter, { passive: true });
    window.addEventListener('resize', updateActiveChapter);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActiveChapter);
      window.removeEventListener('resize', updateActiveChapter);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (isProjectOpen) return null;

  return (
    <aside
      className="fixed left-2 top-1/2 z-[140] -translate-y-1/2 pointer-events-auto md:left-4"
      aria-label="Section navigation"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close section navigation' : 'Open section navigation'}
        className={`relative z-20 flex min-h-[154px] w-10 flex-col items-center justify-center gap-2 rounded-[9px] border border-ink/10 bg-canvas/95 shadow-[0_14px_40px_rgba(17,17,17,0.08)] backdrop-blur-md transition-[opacity,transform] duration-300 md:w-11 ${isOpen ? 'opacity-0 pointer-events-none -translate-x-2' : 'opacity-100 translate-x-0'}`}
      >
        <span className="mb-1 font-mono text-[9px] tracking-[0.06em] text-ink">{CHAPTERS[activeIndex].number}</span>
        <span className="flex flex-col items-start gap-[7px]" aria-hidden="true">
          {CHAPTERS.map((chapter, index) => (
            <span
              key={chapter.id}
              className={`block h-[2px] origin-left transition-all duration-300 ${index === activeIndex ? 'w-6 bg-acid' : 'w-3 bg-ink/25'}`}
            />
          ))}
        </span>
      </button>

      <div
        className={`absolute left-0 top-1/2 w-[248px] -translate-y-1/2 rounded-[10px] border border-ink/10 bg-canvas/95 p-3 shadow-[0_24px_70px_rgba(17,17,17,0.12)] backdrop-blur-xl transition-[opacity,transform] duration-300 ease-[0.16,1,0.3,1] md:w-[272px] ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0 pointer-events-none'}`}
      >
        <div className="mb-3 flex items-center justify-between px-2 pb-3 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray border-b border-soft-gray/70">
          <span>SECTIONS</span>
          <span>{CHAPTERS[activeIndex].number} / 06</span>
        </div>

        <nav className="flex flex-col" aria-label="Portfolio sections">
          {CHAPTERS.map((chapter, index) => {
            const active = chapter.id === activeId;
            return (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                onClick={() => setIsOpen(false)}
                className={`group grid grid-cols-[34px_1fr_auto] items-center gap-2 rounded-[7px] px-2 py-3 transition-colors duration-200 ${active ? 'bg-ink/[0.035]' : 'hover:bg-ink/[0.025]'}`}
              >
                <span className="font-mono text-[9px] tracking-[0.05em] text-muted-gray">{chapter.number}</span>
                <span className="font-sans text-[13px] font-[500] uppercase tracking-[-0.015em] text-ink">{chapter.label}</span>
                <span className={`h-2 w-2 rounded-full transition-all duration-200 ${active ? 'bg-acid scale-100' : 'bg-ink/10 scale-75 group-hover:bg-ink/25'}`} />
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
