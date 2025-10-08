import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, WheelEvent, memo } from "react";
import { throttle } from "lodash";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { easeInExpo } from "../../utils/anim";
import { projectDetails } from "./projectDetails";

type Props = {
  setShowMoreProject: React.Dispatch<React.SetStateAction<boolean>>;
  currentNumber: number;
  showMoreProject: boolean;
};

const AllProjects = memo(({
  setShowMoreProject,
  currentNumber,
  showMoreProject,
}: Props) => {
  const [itemWidth, setItemWidth] = useState(0);
  const [containerCenter, setContainerCenter] = useState(0);

  const SCROLL_MULTIPLIER = 1;
  const containerRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement[]>([]);
  const velocityRef = useRef(0);

  const wrapPosition = useCallback(
    (position: number) => {
      const totalWidth = itemWidth * projectDetails.length;
      const halfWidth = totalWidth / 2;

      if (position < -halfWidth) {
        return position + totalWidth;
      } else if (position > halfWidth) {
        return position - totalWidth;
      }
      return position;
    },
    [itemWidth]
  );

  const { contextSafe } = useGSAP();

  const handleWheel = contextSafe(
    throttle((event: WheelEvent<HTMLDivElement>) => {
      event.preventDefault();

      velocityRef.current += event.deltaY * SCROLL_MULTIPLIER;

      boxesRef.current.forEach((box) => {
        gsap.to(box, {
          x: `+=${velocityRef.current}`,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
          onUpdate: () => {
            velocityRef.current *= 0.85;
            const newX = gsap.getProperty(box, "x");
            const wrappedX = wrapPosition(newX as number);

            if (wrappedX !== newX) {
              gsap.set(box, { x: wrappedX });
            }
          },
        });
      });
    }, 16)
  );

  const getItemPosition = (index: number) => {
    if (!itemWidth) return 0;

    let relativePosition = index - currentNumber;

    if (relativePosition < -2) {
      relativePosition += 12;
    } else if (relativePosition > 9) {
      relativePosition -= 12;
    }

    if (relativePosition === 0) {
      return containerCenter;
    } else if (relativePosition <= -1 && relativePosition >= -2) {
      return containerCenter + itemWidth * relativePosition;
    } else {
      return containerCenter + itemWidth * relativePosition;
    }
  };

  const getAdjacentIndexes = (index: number) => {
    const mod = (n: number, m: number) => ((n % m) + m) % m;

    return {
      prev: [
        mod(index - 2, projectDetails.length),
        mod(index - 1, projectDetails.length),
      ],
      next: [
        mod(index + 1, projectDetails.length),
        mod(index + 2, projectDetails.length),
      ],
    };
  };

  const { contextSafe: handleShowMoreSafe } = useGSAP(() => {
    const adjIndexes = getAdjacentIndexes(currentNumber - 1);
    boxesRef.current.forEach((box, index) => {
      if (showMoreProject) {
        gsap.set(box, {
          x: getItemPosition(index + 1),
          yPercent: 0,
        });

        if (index === adjIndexes.next[0]) {
          gsap.from(box, {
            yPercent: 90,
            duration: 0.5,
          });
        } else if (index === adjIndexes.next[1]) {
          gsap.from(box, {
            yPercent: 90,
            duration: 0.6,
          });
        } else if (index === adjIndexes.prev[1]) {
          gsap.from(box, {
            yPercent: 90,
            duration: 0.7,
          });
        } else if (index === adjIndexes.prev[0]) {
          gsap.from(box, {
            yPercent: 90,
            duration: 0.8,
          });
        }
      }
    });
  }, [currentNumber, showMoreProject]);

  const handleShowMoreProject = handleShowMoreSafe(() => {
    const adjIndexes = getAdjacentIndexes(currentNumber - 1);
    boxesRef.current.forEach((box, index) => {
      const tl = gsap.timeline();
      tl.to(box, {
        x: getItemPosition(index + 1),
        duration: 0.25,
      });
      if (index === adjIndexes.next[0]) {
        tl.to(box, {
          yPercent: -90,
          duration: 0.35,
        });
      } else if (index === adjIndexes.next[1]) {
        tl.to(box, {
          yPercent: -90,
          duration: 0.6,
        });
      } else if (index === adjIndexes.prev[1]) {
        tl.to(box, {
          yPercent: -90,
          duration: 0.7,
        });
      } else if (index === adjIndexes.prev[0]) {
        tl.to(box, {
          yPercent: -90,
          duration: 0.8,
        });
      }
    });

    setShowMoreProject((prev) => !prev);
  });

  useEffect(() => {
    let timeoutId: number;
    const updateMeasurements = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (containerRef.current) {
          const container = containerRef.current;
          const containerWidth = container?.offsetWidth;
          const vw = window.innerWidth / 100;
          const newItemWidth = 22 * vw + 2 * vw;
          setItemWidth(newItemWidth);
          setContainerCenter(containerWidth / 2 - newItemWidth / 2);
        }
      }, 100);
    };

    updateMeasurements();
    window.addEventListener("resize", updateMeasurements);
    return () => {
      window.removeEventListener("resize", updateMeasurements);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section
      onWheel={handleWheel}
      className="overview z-[1] absolute inset-0 overflow-hidden flex items-center justify-center bg-white"
    >
      <div
        ref={containerRef}
        className="overviewProjects relative h-[50vw] sm:h-[27vw] w-screen"
      >
        {projectDetails.map(({ id, img }, index) => {
          return (
            <div
              key={id}
              ref={(el) => (boxesRef.current[index] = el as HTMLDivElement)}
              className="overviewProject h-[50vw] min-w-[40vw] mx-[2vw] sm:h-[27vw] sm:min-w-[22vw] sm:mx-[1vw] absolute left-0 top-0 z-[2] will-change-transform"
            >
              <img
                src={img}
                alt={`Project ${id} showcase image`}
                className="img object-cover w-full h-full"
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          );
        })}
      </div>
      <motion.button
        className="close absolute flex gap-2 items-center z-[9] left-8 sm:left-14 bottom-8 sm:bottom-14 text-[#0d0e13]"
        whileHover="hover"
        onClick={handleShowMoreProject}
      >
        <motion.svg
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="icon w-4 h-4"
          variants={{
            hover: {
              rotate: 90,
            },
          }}
          transition={{
            ease: easeInExpo,
            duration: 0.6,
          }}
        >
          <line
            x1="13.788"
            y1="1.28816"
            x2="1.06011"
            y2="14.0161"
            stroke="currentColor"
            strokeWidth="1.2"
          ></line>
          <line
            x1="1.06049"
            y1="1.43963"
            x2="13.7884"
            y2="14.1675"
            stroke="currentColor"
            strokeWidth="1.2"
          ></line>
        </motion.svg>
        <span className="text-nowrap opacity-80 text-sm sm:text-base">Close</span>
      </motion.button>
      <div className="absolute z-[9] right-8 sm:right-14 bottom-8 sm:bottom-14 text-[#0d0e13] opacity-80 font-light text-sm sm:text-base">
        Scroll to explore
      </div>
    </section>
  );
});

AllProjects.displayName = "AllProjects";

export default AllProjects;
