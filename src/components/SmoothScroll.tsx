import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useUI } from '../context/UIContext';

gsap.registerPlugin(ScrollTrigger);

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const { isProjectOpen } = useUI();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    });

    if (prefersReducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      lerp: 0.11,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      anchors: { offset: -72 },
    });

    lenisRef.current = lenis;

    const handleLenisScroll = () => ScrollTrigger.update();
    const tick = (time: number) => lenis.raf(time * 1000);
    const refresh = () => ScrollTrigger.refresh();

    lenis.on('scroll', handleLenisScroll);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    window.addEventListener('load', refresh, { once: true });
    document.fonts?.ready.then(refresh).catch(() => undefined);
    requestAnimationFrame(() => requestAnimationFrame(refresh));

    return () => {
      window.removeEventListener('load', refresh);
      gsap.ticker.remove(tick);
      lenis.off('scroll', handleLenisScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (isProjectOpen) {
      lenis.stop();
    } else {
      lenis.start();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [isProjectOpen]);

  return <>{children}</>;
};
