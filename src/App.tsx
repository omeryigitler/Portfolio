import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { UIProvider } from './context/UIContext';
import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundLayer } from './components/BackgroundLayer';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { SelectedWork as ProjectTheatre } from './components/SelectedWork';
import { MaskedWindow as MaskTransition } from './components/MaskedWindow';
import { About as AboutFormation } from './components/About';
import { SystemMap } from './components/Archive';
import { Contact } from './components/Contact';
import { FooterWordmark } from './components/FooterWordmark';

export default function App() {
  return (
    <ThemeProvider>
      <UIProvider>
        <SmoothScroll>
          <CustomCursor />
          <BackgroundLayer />
          <Navigation />

          <div className="pointer-events-none relative z-10 flex min-h-screen w-full flex-col items-center py-3 md:py-8">
            <main className="pointer-events-auto w-[calc(100vw-24px)] overflow-visible rounded-[8px] bg-canvas shadow-[0_22px_80px_rgba(17,17,17,0.065)] md:w-[92vw] md:max-w-[1680px] md:rounded-[10px]">
              <Hero />
              <ProjectTheatre />
              <MaskTransition />
              <AboutFormation />
              <SystemMap />
              <Contact />
              <FooterWordmark />
            </main>
          </div>
        </SmoothScroll>
      </UIProvider>
    </ThemeProvider>
  );
}
