import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ALL_BACKGROUNDS } from '../data';

export const BackgroundLayer: React.FC = () => {
  const { activeImage } = useTheme();

  return (
    <div className="fixed inset-0 z-0 bg-ink overflow-hidden pointer-events-none">
      <div className="absolute inset-0 z-20 bg-ink/30 mix-blend-multiply"></div>
      
      {ALL_BACKGROUNDS.map((img) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center bg-fixed transition-opacity duration-[1200ms] ease-in-out grayscale-[0.85] contrast-[1.1] sepia-[0.1] ${
            activeImage === img ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
    </div>
  );
};
