import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor: React.FC = () => {
  const { cursorState, cursorText } = useTheme();
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const velocityX = useVelocity(mouseX);
  const skewX = useTransform(velocityX, [-1800, 0, 1800], [-4, 0, 4], { clamp: true });

  const springConfig = { damping: 28, stiffness: 460, mass: 0.42 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)');
    setIsCoarsePointer(media.matches);

    const handleChange = (event: MediaQueryListEvent) => setIsCoarsePointer(event.matches);
    media.addEventListener('change', handleChange);

    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isCoarsePointer) return;

    const moveCursor = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [isCoarsePointer, mouseX, mouseY]);

  if (isCoarsePointer || cursorState === 'default') return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center font-mono uppercase tracking-[0.04em] text-[10px] whitespace-nowrap"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        skewX,
      }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="bg-ink text-canvas px-4 py-2 flex items-center gap-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
        <span>{cursorText}</span>
        <span className="w-1.5 h-1.5 bg-acid rounded-full" />
      </div>
    </motion.div>
  );
};
