import React, { createContext, ReactNode, useContext, useState } from 'react';

interface UIContextType {
  isProjectOpen: boolean;
  setProjectOpen: (open: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isProjectOpen, setProjectOpen] = useState(false);

  return (
    <UIContext.Provider value={{ isProjectOpen, setProjectOpen }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within a UIProvider');
  return context;
};
