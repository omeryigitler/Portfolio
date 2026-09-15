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

        <div className="relative z-10 w-full min-h-screen py-4 md:py-7 flex flex-col items-center pointer-events-none">
          <main className="w-[calc(100vw-32px)] md:w-[calc(100vw-56px)] max-w-[1600px] rounded-[8px] md:rounded-[10px] pointer-events-auto overflow-hidden bg-transparent">
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
