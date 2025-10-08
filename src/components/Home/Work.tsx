import { motion } from "framer-motion";
import { memo, useState, useCallback } from "react";
import workimg1 from "../../assets/work_img1.webp";
import workimg2 from "../../assets/workimg2.webp";
import workimg3 from "../../assets/workimg3.webp";
import workimg4 from "../../assets/workimg4.webp";
import workvid1 from "../../assets/work_vid1.mp4";
import workvid2 from "../../assets/workvid2.mp4";
import workvid3 from "../../assets/workvid3.mp4";
import workvid4 from "../../assets/workvid4.mp4";

interface WorkItemProps {
  item: {
    heading: string;
    subHeading: string;
    video: string;
    image: string;
  };
  index: number;
  setCursorProps: React.Dispatch<React.SetStateAction<{
    text: string;
    isVisible: boolean;
  }>>;
}

const WorkItem = memo(({ item, index, setCursorProps }: WorkItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
    setCursorProps({ text: "View", isVisible: true });
  }, [setCursorProps]);

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
    setCursorProps({ text: "", isVisible: false });
  }, [setCursorProps]);

  return (
    <motion.div
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      key={item.heading}
      className="elem w-full sm:w-[48%] overflow-hidden mb-10 cursor-pointer"
    >
      <div className="video peer relative w-full h-[104vw] sm:h-[40vw] overflow-hidden will-change-transform group">
        <motion.img
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ ease: "linear", duration: 0.25 }}
          className="absolute max-sm:hidden z-[2] w-full h-full object-cover"
          src={item.image}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
        />
        <video
          className="w-full h-full object-cover will-change-transform"
          src={item.video}
          autoPlay
          muted
          loop
          playsInline
          preload={index < 2 ? "auto" : "none"}
          poster={item.image}
        />
      </div>

      <div className="description sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-3 sm:flex sm:items-center sm:gap-1">
        <h1 className="capitalize font-medium sm:text-sm">
          {item.heading}
        </h1>
        <p className="hidden sm:block font-extrabold">–</p>
        <p className="capitalize text-sm opacity-60 sm:opacity-80 sm:text-xs">
          {item.subHeading}
        </p>
      </div>
    </motion.div>
  );
});

WorkItem.displayName = "WorkItem";

const Work = memo(({
  setCursorProps,
}: {
  setCursorProps: React.Dispatch<
    React.SetStateAction<{
      text: string;
      isVisible: boolean;
    }>
  >;
}) => {
  const elems = [
    {
      heading: "Amaterasu",
      subHeading: "Frontier Health Innovation",
      video: workvid1,
      image: workimg1,
    },
    {
      heading: "Columbia Pictures",
      subHeading: "Celebrating a Century of Cinema",
      video: workvid2,
      image: workimg2,
    },
    {
      heading: "Cambium",
      subHeading: "Pioneering Sustainable Solutions",
      video: workvid3,
      image: workimg3,
    },
    {
      heading: "Studio D",
      subHeading: "Urban and Landscape Design",
      video: workvid4,
      image: workimg4,
    },
  ];

  return (
    <div
      id="work"
      className="max-w-screen-2xl mx-auto px-5 sm:px-52 py-20 bg-white"
    >
      <div className="featured flex items-center gap-3">
        <svg
          className="size-3 sm:size-7"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.41908 4.56679L6.13722 0L4.85418 4.92566L0 6L4.85418 7.25435L6.13722 12L7.3276 7.25435L12 6L7.41908 4.56679Z"
            fill="currentColor"
          ></path>
        </svg>
        <h2 className="capitalize font-normal text-sm sm:text-3xl">
          featured projects
        </h2>
      </div>

      <h2 className="text-7xl sm:text-[14rem] tracking-tight my-5 overflow-hidden">
        <motion.span
          initial={{ y: "90%", rotate: 30 }}
          whileInView={{ y: "0", rotate: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 1.2 }}
          className="inline-block origin-left will-change-transform"
        >
          Work
        </motion.span>
      </h2>
      <p className="text-lg leading-[1.5rem] sm:text-xl sm:w-2/3 sm:opacity-40">
        Highlights of cases that we passionately built with forward-thinking
        clients and friends over the years.
      </p>

      <div className="elems w-full mt-8 sm:flex sm:flex-wrap sm:justify-between">
        {elems.map((item, index) => (
          <WorkItem
            key={item.heading}
            item={item}
            index={index}
            setCursorProps={setCursorProps}
          />
        ))}
      </div>
    </div>
  );
});

Work.displayName = "Work";

export default Work;
