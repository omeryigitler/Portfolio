import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ALL_BACKGROUNDS } from '../data';

export const BackgroundLayer: React.FC = () => {
  const { activeImage } = useTheme();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#D9D9D2] pointer-events-none">
      <div className="absolute inset-0 z-20 bg-[#F3F1E9]/20" />

      {ALL_BACKGROUNDS.map((img) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[700ms] ease-out grayscale-[0.92] saturate-[0.18] contrast-[0.96] brightness-[0.88] will-change-opacity ${
            activeImage === img ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
    </div>
  );
};
