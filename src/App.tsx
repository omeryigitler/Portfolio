import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundLayer } from './components/BackgroundLayer';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { SignalScene } from './components/SignalScene';
import { SelectedWork as ProjectTheatre } from './components/SelectedWork';
import { MaskedWindow as MaskTransition } from './components/MaskedWindow';
import { About as AboutFormation } from './components/About';
import { SystemMap } from './components/Archive';
import { LabCanvas } from './components/LabCanvas';
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
          <main className="w-[calc(100vw-32px)] md:w-[calc(100vw-56px)] max-w-[1600px] rounded-[14px] md:rounded-[18px] shadow-[0_8px_40px_rgba(0,0,0,0.035)] pointer-events-auto overflow-hidden bg-transparent">
            <Hero />
            <SignalScene />
            <ProjectTheatre />
            <MaskTransition />
            <AboutFormation />
            <SystemMap />
            <LabCanvas />
            <Contact />
            <FooterWordmark />
          </main>
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}
