import { useEffect, useState, memo } from "react";
import Navbar from "./components/Home/Navbar";
import Cursor from "./components/Cursor";
import Home from "./components/Home/Home";
import { Routes, Route, useLocation } from "react-router";
import WorkShowCase from "./components/Work/WorkShowCase";
import { AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";

const App = () => {
  const [logoColor, setLogoColor] = useState("#fff");
  const [cursorProps, setCursorProps] = useState({
    text: "Scroll",
    isVisible: false,
  });
  const location = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle initial page load and route changes
  useEffect(() => {
    if (isInitialLoad) {
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      }, 1500);

      return () => clearTimeout(loadingTimer);
    } else {
      setIsLoading(false);
    }
  }, [location.pathname, isInitialLoad]);

  // Detect viewport changes with throttling
  useEffect(() => {
    let timeoutId: number;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      id="parentWrapper"
      className="parentWrapper relative h-screen w-screen overflow-hidden"
    >
      <Loader />
      {!isLoading && (
        <Navbar
          pathName={location?.pathname}
          logoColor={logoColor}
          setLogoColor={setLogoColor}
        />
      )}
      <AnimatePresence mode="sync">
        {!isLoading && (
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <Home
                  setCursorProps={setCursorProps}
                  setLogoColor={setLogoColor}
                />
              }
            />
            <Route
              path="/work"
              element={<WorkShowCase setLogoColor={setLogoColor} />}
            />
          </Routes>
        )}
      </AnimatePresence>

      {!isLoading && !isMobile && <Cursor cursorProps={cursorProps} />}
    </div>
  );
};

export default memo(App);
