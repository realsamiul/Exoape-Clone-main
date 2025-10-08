import { useGSAP } from "@gsap/react";
import gsap, { Power4 } from "gsap";

const Overflow = (
  elements: string,
  delay = 0,
  duration = 1.8,
  dependency?: any[]
) => {
  useGSAP(() => {
    gsap.fromTo(
      elements,
      {
        transformOrigin: "left",
        y: "100%",
        rotate: 30,
      },
      {
        y: 0,
        rotate: 0,
        duration: duration,
        delay: delay,
        ease: Power4.easeOut,
        stagger: 0.08,
        force3D: true,
        clearProps: "all",
      }
    );
  }, dependency);
};

export default Overflow;
