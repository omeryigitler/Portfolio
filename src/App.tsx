import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
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
      <SmoothScroll>
        <CustomCursor />
        <BackgroundLayer />
        <Navigation />

        <div className="relative z-10 flex min-h-screen w-full flex-col items-center py-4 pointer-events-none md:py-7">
          <main className="w-[calc(100vw-32px)] max-w-[1600px] rounded-[8px] bg-canvas pointer-events-auto overflow-visible md:w-[calc(100vw-56px)] md:rounded-[10px]">
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
    </ThemeProvider>
  );
}
