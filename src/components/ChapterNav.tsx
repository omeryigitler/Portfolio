import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isOpen ? (
          <motion.button
            key="chapter-launcher"
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open section navigation"
            initial={{ opacity: 0, x: -10, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.94 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="group flex h-12 w-12 flex-col items-center justify-center rounded-[10px] border border-ink/10 bg-canvas/96 shadow-[0_14px_38px_rgba(17,17,17,0.08)] backdrop-blur-md md:h-14 md:w-14"
          >
            <span className="font-mono text-[9px] tracking-[0.06em] text-ink md:text-[10px]">{CHAPTERS[activeIndex].number}</span>
            <span className="mt-1 font-sans text-[13px] leading-none text-ink transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </motion.button>
        ) : (
          <motion.div
            key="chapter-panel"
            initial={{ opacity: 0, x: -18, clipPath: 'inset(0 100% 0 0 round 12px)' }}
            animate={{ opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0 round 12px)' }}
            exit={{ opacity: 0, x: -14, clipPath: 'inset(0 100% 0 0 round 12px)' }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="w-[262px] overflow-hidden rounded-[12px] border border-ink/10 bg-canvas/97 shadow-[0_24px_70px_rgba(17,17,17,0.12)] backdrop-blur-xl md:w-[292px]"
          >
            <div className="flex items-center justify-between border-b border-soft-gray/70 px-4 py-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close section navigation"
                className="group flex h-8 w-8 items-center justify-start font-sans text-[18px] text-ink focus-visible:outline-2 focus-visible:outline-acid"
              >
                <span className="transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:translate-x-1.5">↖</span>
              </button>

              <div className="text-right font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray">
                <p>INDEX</p>
                <p className="mt-1 text-ink">{CHAPTERS[activeIndex].number} / 06</p>
              </div>
            </div>

            <nav className="flex flex-col p-2" aria-label="Portfolio sections">
              {CHAPTERS.map((chapter) => {
                const active = chapter.id === activeId;
                return (
                  <a
                    key={chapter.id}
                    href={`#${chapter.id}`}
                    onClick={() => setIsOpen(false)}
                    className="group grid grid-cols-[36px_1fr_34px] items-center gap-2 rounded-[8px] px-3 py-3.5 transition-colors duration-200 hover:bg-ink/[0.025] focus-visible:outline-2 focus-visible:outline-acid"
                  >
                    <span className={`font-mono text-[9px] tracking-[0.05em] ${active ? 'text-ink' : 'text-muted-gray'}`}>
                      {chapter.number}
                    </span>
                    <span className="font-sans text-[13px] font-[500] uppercase tracking-[-0.015em] text-ink md:text-[14px]">
                      {chapter.label}
                    </span>
                    <span className="flex items-center justify-end" aria-hidden="true">
                      <span className={`h-[2px] origin-right bg-acid transition-all duration-300 ${active ? 'w-7' : 'w-0 group-hover:w-4'}`} />
                    </span>
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};
