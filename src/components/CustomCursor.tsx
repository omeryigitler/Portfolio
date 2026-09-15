import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor: React.FC = () => {
  const { cursorState, cursorText } = useTheme();
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Spring physics for smooth pointer following
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  // Skew effect based on velocity
  const [skew, setSkew] = useState(0);
  const lastX = useRef(0);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      
      // Calculate skew
      const newSkew = Math.max(-8, Math.min(8, dx * 0.15));
      setSkew(newSkew);
      
      // Decay skew rapidly
      setTimeout(() => setSkew(0), 100);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [mouseX, mouseY]);

  // Hide cursor context on mobile completely
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center font-mono uppercase tracking-[0.04em] text-[10px] whitespace-nowrap transition-opacity duration-300 ${
          cursorState === 'project' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          skewX: skew
        }}
      >
        <div className="bg-ink text-canvas px-4 py-2 flex items-center gap-2 shadow-2xl">
          <span>{cursorText}</span>
          <span className="w-1.5 h-1.5 bg-acid rounded-full"></span>
        </div>
      </motion.div>
      
      {/* Tiny acid dot for default if needed, or native */}
      {cursorState === 'default' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[100] w-1.5 h-1.5 bg-acid rounded-full mix-blend-difference hidden md:block"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}
    </>
  );
};
