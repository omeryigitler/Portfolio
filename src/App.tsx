import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { UIProvider } from './context/UIContext';
import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundLayer } from './components/BackgroundLayer';
import { ChapterNav } from './components/ChapterNav';
import { Hero } from './components/Hero';
import { FeaturedProjects } from './components/FeaturedProjects';
import { MaskedWindow as MaskTransition } from './components/MaskedWindow';
import { About as AboutFormation } from './components/About';
import { SystemMap } from './components/Archive';
import { Contact } from './components/Contact';
import { FooterWordmark } from './components/FooterWordmark';
import { ProjectsPageV2 } from './components/ProjectsPageV2';

const isProjectsPath = () => window.location.pathname.replace(/\/+$/, '') === '/projects';

export default function App() {
  const projectsPage = isProjectsPath();

  return (
    <ThemeProvider>
      <UIProvider>
        <SmoothScroll>
          <CustomCursor />
          <BackgroundLayer />
          {!projectsPage && <ChapterNav />}

          <div className="pointer-events-none relative z-10 flex min-h-screen w-full flex-col items-center py-3 md:py-6">
            {projectsPage ? (
              <main className="pointer-events-auto flex w-[calc(100vw-24px)] flex-col gap-4 bg-transparent md:w-[92vw] md:max-w-[1680px] md:gap-6">
                <ProjectsPageV2 />
                <FooterWordmark />
              </main>
            ) : (
              <main className="pointer-events-auto flex w-[calc(100vw-24px)] flex-col gap-4 bg-transparent md:w-[92vw] md:max-w-[1680px] md:gap-6">
                <div className="relative w-full overflow-hidden rounded-[22px] border border-white/70 bg-canvas shadow-[0_24px_80px_rgba(17,17,17,0.065)]">
                  <Hero />
                  <FeaturedProjects />
                </div>
                <MaskTransition />
                <AboutFormation />
                <SystemMap />
                <Contact />
                <FooterWordmark />
              </main>
            )}
          </div>
        </SmoothScroll>
      </UIProvider>
    </ThemeProvider>
  );
}
