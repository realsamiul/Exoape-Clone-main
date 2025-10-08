// Spread.tsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { memo } from "react";

const Spread = memo(() => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#spread",
        scroller: "#homeFixedContainer",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });
    tl.to("#spreadContent", {
      yPercent: -50,
      ease: "none",
    });
  });

  return (
    <div id="spread" className="w-full">
      <div
        id="spreadContent"
        className="max-w-screen-2xl flex flex-col items-center mx-auto bg-white will-change-transform px-5"
      >
        <div className="flex items-center gap-3">
          <svg
            className="size-4"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.41908 4.56679L6.13722 0L4.85418 4.92566L0 6L4.85418 7.25435L6.13722 12L7.3276 7.25435L12 6L7.41908 4.56679Z"
              fill="currentColor"
            ></path>
          </svg>
          <h2 className="text-sm">In the media</h2>
        </div>

        <div className="text text-center mt-7">
          <h1 className="text-6xl sm:text-[9rem] tracking-tighter">Spread</h1>
          <h1 className="text-6xl sm:text-[9rem] tracking-tighter">the News</h1>
          <p className="text-lg sm:text-2xl sm:mt-10 mt-6 leading-[1.5rem] w-full sm:w-2/3 mx-auto">
            Find out more about our work on these leading design and technology
            platforms.
          </p>
          <a
            className="border-b border-b-zinc-400 mt-5 sm:mt-10 inline-block"
            href="#"
          >
            Browse all news
          </a>
        </div>
      </div>
    </div>
  );
});

Spread.displayName = "Spread";

export default Spread;

// Story.tsx
import React, { memo } from "react";
import gsap, { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

const Story = memo(({
  setLogoColor,
}: {
  setLogoColor: React.Dispatch<React.SetStateAction<string>>;
}) => {
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: `#story`,
      scroller: "#homeFixedContainer",
      start: "top 10%",
      end: "bottom 10%",
      onEnter: () => setLogoColor("#e0ccbb"),
      onEnterBack: () => setLogoColor("#e0ccbb"),
      onLeave: () => setLogoColor("#0d0e13"),
      onLeaveBack: () => setLogoColor("#0d0e13"),
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `#story`,
        scroller: "#homeFixedContainer",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });
    tl.from(
      "#storyTextContainer",
      {
        yPercent: -100,
        ease: "none",
      },
      0
    );
    tl.from(
      ".video-container",
      {
        yPercent: -100,
        ease: "none",
      },
      0
    );
  }, [setLogoColor]);

  return (
    <div id="story" className="overflow-hidden h-[85vh] sm:h-screen">
      <div
        id="storyContainer"
        className="relative w-full flex items-center overflow-hidden h-full origin-top bg-[#070707] text-[#e0ccbb]"
      >
        <div className="video-container absolute top-0 right-0 h-1/2 w-2/3 sm:w-3/5 flex items-center will-change-transform">
          <video
            className="w-full scale-125"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            src="https://www.exoape.com/video/video-6.mp4"
          ></video>
        </div>
        <div
          id="storyTextContainer"
          className="absolute w-full max-w-screen-2xl mx-auto px-7 sm:px-28 will-change-transform"
        >
          <div className="space-y-7 sm:space-y-10">
            <div>
              <h1 className="text-6xl sm:text-[10rem] sm:tracking-tighter">
                Our
              </h1>
              <h1 className="text-6xl sm:text-[10rem] sm:tracking-tighter">
                Story
              </h1>
            </div>
            <p className="text-lg sm:opacity-90 sm:text-2xl font-light sm:w-1/2 leading-[1.5rem]">
              The story behind Exo Ape is one of exploration, creativity and
              curiosity.
            </p>
            <a
              className="border-b-2 inline-block sm:hidden border-[#e0ccbb]"
              href="#"
            >
              Our Story
            </a>
            <span className="inline-block w-full h-[1px] opacity-50 bg-[#e0ccbb]"></span>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-0">
              <div className="flex gap-16 sm:gap-32">
                <ul className="space-y-2 max-sm:hidden">
                  {[
                    "Willem II Singel 8",
                    "6041 HS, Roermond",
                    "The Netherlands",
                    "gobinda993720@gmail.com",
                  ].map((item) => (
                    <a key={item} className="block text-sm opacity-85" href="#">
                      {item}
                    </a>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {["Work", "Studio", "News", "contact"].map((item) => (
                    <a
                      key={item}
                      className="block text-sm opacity-85 capitalize"
                      href="#"
                    >
                      {item}
                    </a>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {["Behance", "dribble", "twitter", "instagram"].map(
                    (item) => (
                      <a
                        key={item}
                        className="block text-sm opacity-85 capitalize"
                        href="#"
                      >
                        {item}
                      </a>
                    )
                  )}
                </ul>
              </div>

              <a
                className="border-b inline-block max-sm:hidden border-[#e0ccbb]"
                href="#"
              >
                Our Story
              </a>
            </div>
            <div className="opacity-85 text-sm">
              This is made for learning purpose only.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Story.displayName = "Story";

export default Story;
