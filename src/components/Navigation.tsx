import React from 'react';
import { motion } from 'motion/react';

export const Navigation: React.FC = () => {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="w-full flex justify-between items-center px-4 md:px-12 py-8 text-[12px] md:text-[13px] font-medium uppercase tracking-[-0.015em] sticky top-0 z-50 text-ink bg-canvas/80 backdrop-blur-md"
    >
      <div className="flex items-center gap-4">
        <span>OMERYIGITLER</span>
        <div className="hidden md:flex items-center gap-2 text-muted-gray font-mono text-[10px] tracking-[0.02em]">
          <span className="w-1.5 h-1.5 rounded-full bg-acid"></span>
          <span>AVAILABLE FOR SELECTED PROJECTS</span>
        </div>
      </div>
      
      <div className="flex gap-6 md:gap-12">
        <a href="#work" className="hover:text-muted-gray transition-colors duration-300">WORK</a>
        <a href="#about" className="hover:text-muted-gray transition-colors duration-300">ABOUT</a>
        <a href="#archive" className="hover:text-muted-gray transition-colors duration-300">ARCHIVE</a>
        <a href="#contact" className="hover:text-muted-gray transition-colors duration-300">CONTACT ↗</a>
      </div>
    </motion.nav>
  );
};
