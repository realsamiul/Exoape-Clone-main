import React, { memo } from "react";
import gsap, { ScrollTrigger } from "gsap/all";
import Overflow from "../../utils/Overflow";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = memo(({
  logoColor,
  setLogoColor,
  pathName,
}: {
  logoColor: string;
  setLogoColor: React.Dispatch<React.SetStateAction<string>>;
  pathName: string;
}) => {
  Overflow(".logo svg, .links div", 0.5);

  useGSAP(() => {
    setTimeout(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".name-logo",
          scroller: "#homeFixedContainer",
          start: "-20 0",
          end: "+=150",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      
      tl.to(".name-logo", { opacity: 0 })
        .to(".links", { display: "none", opacity: 0 }, "<")
        .to(".brandmark", { opacity: 1 })
        .to(".secondary-menu", { display: "flex", opacity: 1 });

      const sections = [
        { id: "hero", color: "#ffff" },
        { id: "work", color: "#0d0e13" },
        { id: "playreel", color: "#e4e0db" },
        { id: "images", color: "#0d0e13" },
        { id: "spread", color: "#0d0e13" },
        { id: "story", color: "#e0ccbb" },
      ];

      sections.forEach((section) => {
        if (section.id === "playreel") {
          ScrollTrigger.create({
            trigger: `#${section.id}`,
            scroller: "#homeFixedContainer",
            start: "top 10%",
            end: "+=250%",
            onEnter: () => setLogoColor(section.color),
            onEnterBack: () => setLogoColor(section.color),
            onLeave: () => {
              const nextIdx = sections.findIndex((s) => s.id === section.id) - 1;
              if (nextIdx >= 0) setLogoColor(sections[nextIdx].color);
            },
            onLeaveBack: () => {
              const prevIdx = sections.findIndex((s) => s.id === section.id) + 1;
              if (prevIdx < sections.length) setLogoColor(sections[prevIdx].color);
            },
          });
        } else if (section.id === "work" || section.id === "hero") {
          ScrollTrigger.create({
            trigger: `#${section.id}`,
            scroller: "#homeFixedContainer",
            start: "top 10%",
            end: "bottom 10%",
            onEnter: () => setLogoColor(section.color),
            onEnterBack: () => setLogoColor(section.color),
          });
        }
      });
    }, 100);
  }, [pathName, setLogoColor]);

  return (
    <div className="w-full fixed z-[999]">
      <div className="mx-auto p-5 sm:p-12 flex justify-between items-center text-white">
        <Link to="/">
          <div className="logo overflow-hidden flex">
            <svg
              viewBox="0 0 95 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="name-logo relative left-0 w-20 sm:w-28 transition-colors duration-300"
              style={{ color: logoColor }}
            >
              <path
                d="M7.70542 17.0085C10.8808 17.2469 13.8123 15.2096 14.8524 12.0415H11.0216C10.4531 13.3929 9.1325 14.2151 7.73401 14.0885C5.56111 14.1223 3.7654 12.3119 3.7031 10.0246H15.1383V9.42253C15.1383 4.45554 12.9656 0.391646 7.64824 0.391646C5.56968 0.342653 3.56563 1.20734 2.11735 2.77806C0.66907 4.34878 -0.0925972 6.48364 0.0152567 8.66995C-0.119195 10.8796 0.639738 13.0461 2.10466 14.6345C3.56958 16.223 5.60394 17.0852 7.70542 17.0085ZM11.4473 7.22456H3.69995V7.16435C3.85008 4.98837 5.57318 3.30544 7.64509 3.31117C8.64896 3.27405 9.62348 3.67141 10.3418 4.41075C11.0601 5.15009 11.4596 6.16692 11.4473 7.22456Z"
                fill="currentColor"
              />
              <path
                d="M14.3124 16.5562L19.8584 8.45855L14.7412 0.932817H18.9436L21.8024 5.56867L24.6612 0.932817H28.8065L23.6892 8.45855L29.3496 16.5562H25.0615L21.7738 11.3183L18.6006 16.5562H14.3124Z"
                fill="currentColor"
              />
              <path
                d="M30.5951 14.603C32.0722 16.1756 34.1067 17.0258 36.206 16.9477C38.3052 17.0258 40.3397 16.1756 41.8169 14.603C43.294 13.0304 44.0791 10.8789 43.9819 8.66942C44.0791 6.45993 43.294 4.30839 41.8169 2.73582C40.3397 1.16325 38.3052 0.313055 36.206 0.391113C34.1067 0.313055 32.0722 1.16325 30.5951 2.73582C29.118 4.30839 28.3329 6.45993 28.4301 8.66942C28.3329 10.8789 29.118 13.0304 30.5951 14.603ZM40.4945 8.66941C40.4945 11.2282 39.208 13.9374 36.2063 13.9374C33.2045 13.9374 31.9181 11.2282 31.9181 8.66941C31.9181 6.11066 33.1474 3.4014 36.2063 3.4014C39.2652 3.4014 40.4945 6.11066 40.4945 8.66941Z"
                fill="currentColor"
              />
              <path
                d="M63.1673 0H62.1668L60.4801 1.50515C59.6645 0.647023 58.5445 0.188391 57.3926 0.240823C53.1044 0.240823 48.5589 5.77976 48.5589 12.282C48.5589 15.1117 49.731 16.7974 51.7322 16.7974C54.0764 16.7974 56.5063 13.5463 58.193 9.69314H58.3932C57.8349 11.3272 57.4607 13.0246 57.2782 14.7504C57.2782 15.9847 57.7928 16.7974 58.8791 16.7974C60.3085 16.7974 61.595 15.8943 63.3103 13.155L62.7099 12.5228C61.5092 14.1785 60.623 14.7805 60.0798 14.7805C59.8225 14.7805 59.6796 14.63 59.6796 14.329C59.7259 13.88 59.8121 13.4366 59.9369 13.0045L62.1668 3.37153L63.1673 0ZM57.479 1.50531C58.4163 1.46304 59.2939 1.98942 59.7374 2.85995C57.9364 10.2954 54.8203 14.7807 52.7048 14.7807C51.7042 14.7807 51.1611 13.697 51.1611 12.0413C51.1897 7.16466 53.8197 1.50531 57.479 1.50531Z"
                fill="currentColor"
              />
              <path
                d="M76.1121 0.240769C73.5964 0.240769 70.7948 3.46178 68.3076 8.63949L68.0503 8.66959L69.4797 4.51539L70.4231 0.240769H69.7084L65.4202 1.26427L65.2487 1.89643L67.45 2.73931L63.562 19.6572C63.2475 21.0419 62.2184 21.1924 60.8747 21.373L60.7461 21.9299H67.8931L68.0217 21.373C66.9068 21.2225 66.0778 21.072 66.0778 20.1689C66.0804 19.8542 66.1188 19.5409 66.1921 19.2357L67.0211 15.4729C67.6495 16.3276 68.6249 16.8188 69.6512 16.7974C74.0538 16.7974 79.2568 11.0176 79.2568 4.51539C79.2568 2.01684 77.9989 0.240769 76.1121 0.240769ZM68.0377 14.7682C67.6366 14.3059 67.4358 13.6889 67.4835 13.0647C69.1987 6.95381 73.201 2.31796 74.9449 2.31796C75.9455 2.31796 76.5458 3.10064 76.5458 4.7563C76.5172 9.66308 73.2296 15.503 69.599 15.503C69.0043 15.4967 68.4388 15.2306 68.0377 14.7682Z"
                fill="currentColor"
              />
              <path
                d="M82.6967 10.7163V9.93362C86.8705 8.75961 91.9878 7.19425 91.9878 3.5518C92.0462 2.61809 91.705 1.70579 91.0576 1.06484C90.4102 0.423885 89.5244 0.121481 88.643 0.240476C84.0117 0.240476 80.1523 5.5988 80.1523 10.7765C80.1523 13.7868 81.496 16.7971 84.8408 16.7971C87.1278 16.7971 88.9003 15.8338 91.0158 12.8235L90.3011 12.2214C89.2621 13.8114 87.6086 14.8363 85.7842 15.021C83.8688 15.021 82.6967 13.3353 82.6967 10.7163ZM89.5878 3.79273C89.5878 6.17087 87.3008 7.5255 82.8125 9.03065C83.3271 4.87644 85.5855 1.74573 87.8726 1.74573C88.3685 1.74602 88.8404 1.97044 89.1685 2.362C89.4966 2.75355 89.6493 3.27457 89.5878 3.79273Z"
                fill="currentColor"
              />
            </svg>
            <svg
              viewBox="0 0 64 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="brandmark w-10 sm:w-14 relative -left-20 sm:-left-28 opacity-0 transition-colors duration-300"
              style={{ color: logoColor }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M58.1471 10.4536C58.1887 10.3412 58.2549 10.3412 58.2942 10.4536L59.5766 13.9755C59.749 14.3768 60.0632 14.6975 60.4569 14.8741L63.9191 16.1771C64.027 16.217 64.027 16.2844 63.9191 16.3268L60.4569 17.6298C60.0623 17.8052 59.7478 18.1263 59.5766 18.5284L58.2942 22.0403C58.2549 22.1527 58.1887 22.1527 58.1471 22.0403L56.8671 18.5184C56.6959 18.1163 56.3813 17.7952 55.9868 17.6198L52.5246 16.3168C52.4167 16.2744 52.4167 16.207 52.5246 16.1671L55.9868 14.8641C56.3805 14.6875 56.6947 14.3668 56.8671 13.9655L58.1471 10.4536Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M45.681 33.1454C46.2842 32.6462 46.9365 31.4655 47.2528 30.5919C44.3373 32.0122 43.0328 30.0353 40.8775 30.4995C37.3589 31.2484 36.074 32.8933 31.224 31.7875C32.7197 32.8309 34.8063 34.0939 36.5129 34.6405C34.365 36.852 32.9943 39.7874 32.2195 43.6863C34.2399 43.9634 36.5816 43.3319 39.1954 42.7403C38.195 41.1004 37.7046 38.9088 37.5305 36.3803C38.5152 38.6814 40.0771 40.6785 42.0594 42.1712C45.1808 41.672 48.6185 41.647 52.2965 43.4192C50.509 36.2505 45.681 33.1454 45.681 33.1454Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </Link>

        <div className="secondary-menu hidden opacity-0 items-center gap-3 sm:gap-4">
          <p className="text-sm sm:text-base font-light transition-colors duration-300" style={{ color: logoColor }}>
            Menu
          </p>
          <div className="cursor-pointer space-y-[3px]">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="line w-4 sm:w-5 h-[1.5px] transition-colors duration-300"
                style={{ backgroundColor: logoColor }}
              />
            ))}
          </div>
        </div>

        <div className="links overflow-hidden hidden sm:flex items-center gap-6 lg:gap-10">
          <div className="flex items-center gap-4 lg:gap-5">
            <Link to={"/work"} className="relative group">
              <a style={{ color: logoColor }} className="text-sm lg:text-base font-light">
                Work
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
