import React, { createContext, ReactNode, useContext, useState } from 'react';

interface UIContextType {
  isProjectOpen: boolean;
  setProjectOpen: (open: boolean) => void;
  isContactFormOpen: boolean;
  setContactFormOpen: (open: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isProjectOpen, setProjectOpen] = useState(false);
  const [isContactFormOpen, setContactFormOpen] = useState(false);

  return (
    <UIContext.Provider
      value={{ isProjectOpen, setProjectOpen, isContactFormOpen, setContactFormOpen }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within a UIProvider');
  return context;
};
