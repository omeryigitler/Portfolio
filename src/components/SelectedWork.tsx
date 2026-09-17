import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ARCHIVE_COUNT, ARCHIVE_FILTERS } from '../archiveData';
import { DEFAULT_AMBIENT } from '../data';
import { useTheme } from '../context/ThemeContext';

export const SelectedWork: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const cursorX = useSpring(pointerX, { damping: 26, stiffness: 520, mass: 0.34 });
  const cursorY = useSpring(pointerY, { damping: 26, stiffness: 520, mass: 0.34 });
  const [pointerVisible, setPointerVisible] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(true);
  const { setActiveAmbient, setCursorState, setCursorText } = useTheme();

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)');
    setCoarsePointer(media.matches);
    const onChange = (event: MediaQueryListEvent) => setCoarsePointer(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveAmbient('#D8D8D2');
        else setActiveAmbient(DEFAULT_AMBIENT);
      },
      { threshold: 0.15 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [setActiveAmbient]);

  useEffect(() => {
    return () => {
      setCursorState('default');
      setCursorText('');
      setActiveAmbient(DEFAULT_AMBIENT);
    };
  }, [setActiveAmbient, setCursorState, setCursorText]);

  const showFinderCursor = () => {
    if (coarsePointer) return;
    setCursorState('default');
    setCursorText('');
    setPointerVisible(true);
  };

  const hideFinderCursor = () => {
    setPointerVisible(false);
  };

  const moveFinderCursor = (event: React.PointerEvent<HTMLElement>) => {
    if (coarsePointer) return;
    pointerX.set(event.clientX);
    pointerY.set(event.clientY);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full scroll-mt-0 border-t border-ink/10 bg-canvas"
      onPointerEnter={showFinderCursor}
      onPointerLeave={hideFinderCursor}
      onPointerMove={moveFinderCursor}
    >
      {!coarsePointer && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[180] h-[38px] w-[38px] rounded-full border-[1.25px] border-ink bg-canvas/10 backdrop-blur-[1px]"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{ opacity: pointerVisible ? 1 : 0, scale: pointerVisible ? 1 : 0.72 }}
          transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        />
      )}

      <a
        href="/projects"
        className="group block cursor-default px-5 pb-9 pt-7 md:px-10 md:pb-12 md:pt-9 lg:cursor-none lg:px-12"
        aria-label="Open all projects"
      >
        <div className="mx-auto w-full max-w-[1540px]">
          <header className="flex items-end justify-between gap-8 border-b border-ink/10 pb-5 md:pb-7">
            <div className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted-gray md:text-[10px]">
              <span className="text-ink">02 / PROJECT FINDER</span>
              <span className="mx-3 text-ink/20">—</span>
              <span>{String(ARCHIVE_COUNT).padStart(2, '0')} PROJECTS INDEXED</span>
            </div>
            <span className="hidden items-center gap-2 font-mono text-[8px] uppercase tracking-[0.06em] text-ink md:inline-flex md:text-[9px]">
              OPEN ARCHIVE
              <ArrowUpRight size={13} strokeWidth={1.35} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </header>

          <div className="flex min-h-[62svh] flex-col justify-between py-8 md:min-h-[68svh] md:py-10 lg:min-h-[72svh] lg:py-12">
            <div>
              <div className="grid min-h-[104px] grid-cols-[auto_1fr_auto] items-center gap-5 border-y border-ink/12 md:min-h-[138px] md:gap-8">
                <Search size={26} strokeWidth={1.1} className="text-ink md:h-9 md:w-9" />
                <span className="min-w-0 truncate text-[clamp(34px,5.3vw,88px)] font-[510] leading-none tracking-[-0.055em] text-ink/24 transition-colors duration-300 group-hover:text-ink">
                  Search all projects...
                </span>
                <span className="hidden font-mono text-[8px] uppercase tracking-[0.07em] text-muted-gray sm:block md:text-[9px]">
                  CLICK TO EXPLORE
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 md:mt-5">
                {ARCHIVE_FILTERS.map((filter, index) => (
                  <span
                    key={filter.value}
                    className={`border px-3 py-2 font-mono text-[8px] uppercase tracking-[0.06em] transition-[background-color,color,border-color,transform] duration-300 md:px-4 md:text-[9px] ${
                      index === 0
                        ? 'border-ink bg-ink text-canvas'
                        : 'border-ink/14 text-muted-gray group-hover:border-ink/28 group-hover:text-ink'
                    }`}
                  >
                    {filter.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-7 border-t border-ink/10 pt-6 md:grid-cols-[1fr_auto] md:items-end md:gap-12 md:pt-8">
              <p className="max-w-[760px] text-[clamp(25px,3.1vw,48px)] font-[500] leading-[0.98] tracking-[-0.047em] text-ink">
                Browse the full archive by discipline, format or technology<span className="text-acid">.</span>
              </p>

              <div className="flex items-center justify-between gap-8 md:justify-end">
                <span className="font-mono text-[8px] uppercase leading-[1.55] tracking-[0.06em] text-muted-gray md:text-[9px]">
                  SITES · COMMERCE · APPS<br />TOOLS · EXPERIMENTS
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 text-ink transition-[background-color,color,transform] duration-300 group-hover:-translate-y-1 group-hover:bg-ink group-hover:text-canvas md:h-14 md:w-14">
                  <ArrowUpRight size={18} strokeWidth={1.3} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </section>
  );
};
