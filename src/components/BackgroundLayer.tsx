import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ALL_BACKGROUNDS } from '../data';

export const BackgroundLayer: React.FC = () => {
  const { activeImage, activeAmbient } = useTheme();

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-700 ease-out"
      style={{ backgroundColor: activeAmbient }}
    >
      {ALL_BACKGROUNDS.map((img) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[700ms] ease-out grayscale saturate-0 contrast-[0.92] brightness-[0.96] mix-blend-multiply will-change-opacity ${
            activeImage === img ? 'opacity-[0.16] z-10' : 'opacity-0 z-0'
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      <div className="absolute inset-0 z-20 bg-[#F7F5EF]/20" />
    </div>
  );
};
