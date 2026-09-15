import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DEFAULT_AMBIENT, DEFAULT_BG } from '../data';

interface ThemeContextType {
  activeImage: string;
  setActiveImage: (url: string) => void;
  activeAmbient: string;
  setActiveAmbient: (color: string) => void;
  cursorState: 'default' | 'project' | 'lab';
  setCursorState: (state: 'default' | 'project' | 'lab') => void;
  cursorText: string;
  setCursorText: (text: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [activeImage, setActiveImage] = useState(DEFAULT_BG);
  const [activeAmbient, setActiveAmbient] = useState(DEFAULT_AMBIENT);
  const [cursorState, setCursorState] = useState<'default' | 'project' | 'lab'>('default');
  const [cursorText, setCursorText] = useState('');

  return (
    <ThemeContext.Provider value={{ activeImage, setActiveImage, activeAmbient, setActiveAmbient, cursorState, setCursorState, cursorText, setCursorText }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
