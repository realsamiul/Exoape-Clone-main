import { useState, useEffect, memo, useCallback } from "react";
import { motion, useAnimationControls, useSpring } from "framer-motion";

const Cursor = memo(({
  cursorProps,
}: {
  cursorProps: { text: string; isVisible: boolean };
}) => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const controls = useAnimationControls();
  const { text, isVisible } = cursorProps;

  // Optimized spring config
  const springConfig = { damping: 25, stiffness: 400, mass: 0.3 };

  const springX = useSpring(mousePosition.x, springConfig);
  const springY = useSpring(mousePosition.y, springConfig);

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
    springX.set(e.clientX);
    springY.set(e.clientY);
  }, [springX, springY]);

  useEffect(() => {
    // Use passive event listener for better performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    controls.start({
      opacity: isVisible ? 1 : 0,
      scale: isVisible ? 1 : 0.8,
      transition: { duration: 0.2, ease: "easeOut" },
    });
  }, [isVisible, controls]);

  return (
    <motion.div
      className="fixed pointer-events-none z-[500] will-change-transform"
      animate={controls}
      initial={{ opacity: 0, scale: 0.8 }}
      style={{
        left: springX,
        top: springY,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="rounded-full flex items-center justify-center"
        style={{
          width: 100,
          height: 100,
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <span className="text-white text-sm font-medium">{text}</span>
      </div>
    </motion.div>
  );
});

Cursor.displayName = "Cursor";

export default Cursor;
