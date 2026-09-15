import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { ArrowUpRight } from 'lucide-react';

const SYSTEMS = [
  {
    id: 'design',
    label: 'DESIGN',
    sub: ['ART DIRECTION', 'INTERFACE', 'IDENTITY', 'SYSTEMS'],
    x: '15%',
    y: '20%'
  },
  {
    id: 'build',
    label: 'BUILD',
    sub: ['FRONTEND', 'MOTION', 'APIS', 'WEBGL'],
    x: '45%',
    y: '55%'
  },
  {
    id: 'experiment',
    label: 'EXPERIMENT',
    sub: ['AI', 'GENERATIVE', '3D', 'INTERACTION'],
    x: '75%',
    y: '25%'
  }
];

const MagneticNode: React.FC<{ children: React.ReactNode, isActive: boolean, onClick: () => void, onMouseEnter: () => void, onMouseLeave: () => void, className?: string, style?: any }> = ({ children, isActive, onClick, onMouseEnter, onMouseLeave, className, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPos({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
    onMouseLeave();
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export const SystemMap: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const { setCursorState, setCursorText } = useTheme();

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
    <section id="system" className="relative h-[120vh] w-full bg-canvas px-4 md:px-12 py-24 border-t border-soft-gray/30 overflow-hidden pointer-events-auto">
      <div className="absolute top-24 left-4 md:left-12 z-20 flex items-center gap-4">
        <h2 className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-ink">CAPABILITIES / 05</h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.04em] text-muted-gray hidden md:block opacity-50">HOVER TO EXPLORE</span>
      </div>

      <div className="w-full h-full relative mt-16">
        {SYSTEMS.map((sys) => {
          const isActive = activeNode === sys.id;
          const isDimmed = activeNode !== null && !isActive;

          return (
            <MagneticNode
              key={sys.id}
              className={`absolute z-10 transition-opacity duration-500 ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
              style={{ left: sys.x, top: sys.y }}
              onMouseEnter={() => handleEnter(sys.id)}
              onMouseLeave={handleLeave}
              onClick={() => setActiveNode(isActive ? null : sys.id)}
              isActive={isActive}
            >
              <div className="relative cursor-pointer flex items-center gap-2 group">
                <span className={`font-sans text-[32px] md:text-[56px] font-[500] tracking-[-0.04em] leading-none transition-colors duration-300 ${isActive ? 'text-ink' : 'text-ink'}`}>
                  {sys.label}
                </span>
                <ArrowUpRight size={28} strokeWidth={1.5} className={`transition-transform duration-300 ${isActive ? 'translate-x-1 -translate-y-1' : ''}`} />
                
                {/* Acid yellow marker line */}
                <div className={`absolute -bottom-2 left-0 h-[3px] bg-acid transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} />
              </div>
              
              <div className="absolute top-full left-4 mt-6 flex flex-col gap-3">
                {sys.sub.map((subItem, index) => (
                  <motion.div
                    key={subItem}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
                    transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                    className="relative flex items-center whitespace-nowrap font-mono text-[10px] md:text-[11px] tracking-[0.04em] text-ink"
                  >
                    <span className="w-4 h-[1px] bg-ink/30 mr-3 inline-block"></span>
                    {subItem}
                  </motion.div>
                ))}
                {/* Vertical connecting line */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 top-0 w-[1px] h-[calc(100%-8px)] bg-ink/30 origin-top -z-10"
                />
              </div>
            </MagneticNode>
          );
        })}
      </div>
    </section>
  );
};
