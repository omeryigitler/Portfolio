import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { ArrowUpRight } from 'lucide-react';

const SYSTEMS = [
  {
    id: 'design',
    label: 'DESIGN',
    sub: ['ART DIRECTION', 'INTERFACE', 'IDENTITY', 'SYSTEMS'],
    x: '13%',
    y: '24%',
  },
  {
    id: 'build',
    label: 'BUILD',
    sub: ['FRONTEND', 'MOTION', 'APIS', 'WEBGL'],
    x: '44%',
    y: '52%',
  },
  {
    id: 'experiment',
    label: 'EXPERIMENT',
    sub: ['AI', 'GENERATIVE', '3D', 'INTERACTION'],
    x: '73%',
    y: '27%',
  },
];

interface MagneticNodeProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const MagneticNode: React.FC<MagneticNodeProps> = ({
  children,
  isActive,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  className,
  style,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const bounds = ref.current.getBoundingClientRect();
    const middleX = event.clientX - (bounds.left + bounds.width / 2);
    const middleY = event.clientY - (bounds.top + bounds.height / 2);

    setPos({ x: middleX * 0.12, y: middleY * 0.12 });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
    onMouseLeave();
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-expanded={isActive}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 18, mass: 0.12 }}
      className={`appearance-none border-0 bg-transparent p-0 text-left ${className ?? ''}`}
      style={style}
    >
      {children}
    </motion.button>
  );
};

export const SystemMap: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const { setCursorState, setCursorText } = useTheme();

  useEffect(() => () => {
    document.body.classList.remove('hide-cursor');
  }, []);

  const handleEnter = (id: string) => {
    setActiveNode(id);
    setCursorState('project');
    setCursorText('EXPLORE ↗');
    document.body.classList.add('hide-cursor');
  };

  const handleLeave = () => {
    setActiveNode(null);
    setCursorState('default');
    setCursorText('');
    document.body.classList.remove('hide-cursor');
  };

  return (
    <section id="system" className="relative h-[100svh] min-h-[720px] w-full bg-canvas px-4 md:px-12 py-24 border-t border-soft-gray/30 overflow-hidden pointer-events-auto">
      <div className="absolute top-24 left-4 md:left-12 z-20 flex items-center gap-4">
        <h2 className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-ink">CAPABILITIES / 05</h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.04em] text-muted-gray hidden md:block opacity-50">HOVER / TAP TO EXPLORE</span>
      </div>

      <div className="w-full h-full relative mt-12">
        {SYSTEMS.map((sys) => {
          const isActive = activeNode === sys.id;
          const isDimmed = activeNode !== null && !isActive;

          return (
            <MagneticNode
              key={sys.id}
              isActive={isActive}
              className={`absolute z-10 transition-opacity duration-300 focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-8 ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
              style={{ left: sys.x, top: sys.y }}
              onMouseEnter={() => handleEnter(sys.id)}
              onMouseLeave={handleLeave}
              onClick={() => setActiveNode(sys.id)}
              onFocus={() => setActiveNode(sys.id)}
              onBlur={() => setActiveNode(null)}
            >
              <span className="relative flex items-center gap-2 group">
                <span className="font-sans text-[32px] md:text-[56px] font-[500] tracking-[-0.04em] leading-none text-ink">
                  {sys.label}
                </span>
                <ArrowUpRight size={28} strokeWidth={1.5} className={`transition-transform duration-300 ${isActive ? 'translate-x-1 -translate-y-1' : ''}`} />
                <span className={`absolute -bottom-2 left-0 h-[3px] bg-acid transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} />
              </span>

              <span className="absolute top-full left-4 mt-6 flex flex-col gap-3">
                {sys.sub.map((subItem, index) => (
                  <motion.span
                    key={subItem}
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
                    transition={{ duration: 0.25, delay: index * 0.04, ease: 'easeOut' }}
                    className="relative flex items-center whitespace-nowrap font-mono text-[10px] md:text-[11px] tracking-[0.04em] text-ink"
                  >
                    <span className="w-4 h-px bg-ink/30 mr-3 inline-block" />
                    {subItem}
                  </motion.span>
                ))}
                <motion.span
                  initial={false}
                  animate={{ scaleY: isActive ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute left-0 top-0 w-px h-[calc(100%-8px)] bg-ink/30 origin-top -z-10"
                />
              </span>
            </MagneticNode>
          );
        })}
      </div>
    </section>
  );
};
