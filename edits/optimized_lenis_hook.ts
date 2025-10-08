import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useLenisGsap = (containerRef: React.RefObject<HTMLDivElement>) => {
  const lenisRef = useRef<Lenis>();
  const rafIdRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Create Lenis instance with optimized settings
    lenisRef.current = new Lenis({
      wrapper: containerRef.current,
      content: containerRef.current?.firstChild as HTMLDivElement,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Optimized update function
    const update = (time: number) => {
      lenisRef.current?.raf(time);
      rafIdRef.current = requestAnimationFrame(update);
    };

    // Synchronize with ScrollTrigger
    lenisRef.current?.on("scroll", ScrollTrigger.update);

    // Start RAF loop
    rafIdRef.current = requestAnimationFrame(update);

    // GSAP ticker integration
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current?.destroy();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [containerRef]);

  return lenisRef;
};
