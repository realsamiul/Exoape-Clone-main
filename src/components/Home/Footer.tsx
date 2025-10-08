import React, { memo } from "react";

const Footer = memo(() => {
  return (
    <div className="bg-[#070707] text-[#e0ccbb] py-20 px-7 sm:px-28">
      <div className="max-w-screen-2xl mx-auto">
        <div className="space-y-7 sm:space-y-10">
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
  );
});

Footer.displayName = "Footer";

export default Footer;
