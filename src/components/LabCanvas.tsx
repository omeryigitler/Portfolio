import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { ArrowUpRight, X } from 'lucide-react';

const LAB_ITEMS = [
  { id: 1, label: "SHADER STUDY", year: "2026", w: 380, h: 480, x: 200, y: 150, img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" },
  { id: 2, label: "TYPE TEST", year: "2025", w: 500, h: 320, x: 700, y: 250, img: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop" },
  { id: 3, label: "AI VISUAL", year: "2026", w: 320, h: 320, x: 1300, y: 100, img: "https://images.unsplash.com/photo-1607499699365-d053229b48f9?q=80&w=800&auto=format&fit=crop" },
  { id: 4, label: "WEBGL INTERACTION", year: "2025", w: 300, h: 420, x: 400, y: 700, img: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=800&auto=format&fit=crop" },
  { id: 5, label: "MOTION EXPERIMENT", year: "2026", w: 450, h: 260, x: 900, y: 750, img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop" },
];

export const LabCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasDragged, setHasDragged] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { setCursorState, setCursorText } = useTheme();

  const handleMouseEnter = () => {
    setCursorState('project');
    setCursorText('VIEW EXPERIMENT ↗');
    document.body.classList.add('hide-cursor');
  };

  const handleMouseLeave = () => {
    setCursorState('default');
    setCursorText('');
    document.body.classList.remove('hide-cursor');
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    handleMouseLeave(); // reset cursor for overlay
  };

  return (
    <section id="lab" className="relative h-screen w-full bg-canvas border-t border-soft-gray/30 overflow-hidden pointer-events-auto">
      <div className="absolute top-12 left-4 md:left-12 z-20 pointer-events-none flex flex-col gap-2">
        <h2 className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-ink">LAB / EXPERIMENTS</h2>
        <AnimatePresence>
          {!hasDragged && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="font-mono text-[10px] uppercase tracking-[0.04em] text-muted-gray"
            >
              CLICK + DRAG TO EXPLORE ↔
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div 
        ref={containerRef}
        drag
        dragConstraints={{ left: -1000, right: 0, top: -500, bottom: 0 }}
        dragElastic={0.1}
        onDragStart={() => setHasDragged(true)}
        className="w-[200vw] h-[150vh] relative cursor-grab active:cursor-grabbing"
      >
        {LAB_ITEMS.map((item) => (
          <div
            key={item.id}
            className="absolute group"
            style={{
              width: item.w,
              height: item.h,
              left: item.x,
              top: item.y
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleItemClick(item)}
          >
            {/* Visual Preview */}
            <div className="w-full h-full overflow-hidden bg-soft-gray">
              <motion.div 
                className="w-full h-full bg-cover bg-center origin-center transition-transform duration-700 ease-out group-hover:scale-[1.03] grayscale-[0.2]"
                style={{ backgroundImage: `url(${item.img})` }}
              />
            </div>
            
            {/* Metadata overlay */}
            <div className="absolute -bottom-12 left-0 w-full flex justify-between items-start pt-3">
              <div className="flex flex-col gap-1 transition-transform duration-300 group-hover:translate-x-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] tracking-[0.04em] text-muted-gray">0{item.id} /</span>
                  <span className="font-sans text-[14px] font-[500] tracking-[-0.02em] text-ink flex items-center gap-2">
                    {item.label}
                    <span className="w-1.5 h-1.5 rounded-full bg-acid opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-muted-gray group-hover:text-ink transition-colors duration-300">
                <span className="font-mono text-[10px] tracking-[0.04em]">{item.year}</span>
                <ArrowUpRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Simple Overlay for Clicked Item */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-canvas/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-12 cursor-auto"
          >
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-8 right-8 p-4 text-ink hover:text-acid transition-colors"
            >
              <X size={32} strokeWidth={1.5} />
            </button>

            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl"
            >
              <div className="w-full aspect-video bg-soft-gray mb-8">
                <div 
                  className="w-full h-full bg-cover bg-center grayscale-[0.2]"
                  style={{ backgroundImage: `url(${selectedItem.img})` }}
                />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <span className="font-mono text-[11px] text-muted-gray tracking-[0.04em]">0{selectedItem.id} / {selectedItem.year}</span>
                  <h2 className="font-sans text-[32px] md:text-[56px] font-[500] tracking-[-0.04em] text-ink leading-none mt-2">{selectedItem.label}</h2>
                </div>
                <span className="font-mono text-[11px] text-acid bg-ink px-4 py-2 uppercase tracking-[0.04em]">PROTOTYPE</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
