import { motion } from "framer-motion";
import { easeOutExpo } from "../utils/anim";
import { memo } from "react";

const Loader = memo(() => {
  return (
    <motion.div
      className="z-0 absolute inset-0 bg-[#0D0E13] flex justify-center items-center will-change-transform"
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: 0,
      }}
      transition={{
        delay: 2.3,
        duration: 0.3,
      }}
    >
      <div className="mask h-[15vw] w-[15vw] sm:h-[7.5vw] sm:w-[7.5vw] relative overflow-hidden">
        <svg
          viewBox="0 0 108 103"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="icon absolute inset-0 z-[3] h-full w-full"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M108 0H0V106H108V0ZM92.6929 18.8319C92.6323 18.661 92.5301 18.661 92.4657 18.8319L90.4893 24.1769C90.2245 24.789 89.7371 25.2767 89.1263 25.5406L83.784 27.5274C83.6136 27.5882 83.6136 27.6908 83.784 27.7554L89.1263 29.7383C89.7382 30.0026 90.226 30.492 90.4893 31.1059L92.4657 36.466C92.5301 36.6332 92.6323 36.6332 92.6929 36.466L94.6693 31.1211C94.9364 30.5098 95.423 30.0216 96.0323 29.7535L101.375 27.7706C101.545 27.706 101.545 27.6034 101.375 27.5426L96.0323 25.5558C95.4237 25.2887 94.9372 24.802 94.6693 24.1921L92.6929 18.8319Z"
            fill="#0D0E13"
          ></path>
        </svg>
        <motion.div
          className="filler absolute inset-[3px] sm:inset-[3px] bg-[#e4e0db] z-[2]"
          style={{
            transformOrigin: "center bottom",
          }}
          initial={{
            y: "100%",
          }}
          animate={{
            y: 0,
          }}
          transition={{
            duration: 1.8,
            ease: easeOutExpo,
          }}
        />
        <div className="background z-[1] absolute inset-[3px] sm:inset-[3px] opacity-20 bg-[#E5E1DC]" />
      </div>
    </motion.div>
  );
});

Loader.displayName = "Loader";

export default Loader;
