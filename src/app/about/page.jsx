import React from "react";

import InteractiveTimeline from "../components/InteractiveTimeline";
import Quote from "../components/Quote";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import AboutAPI from "../components/AboutAPI";

// Theme color variables (should be defined in your global CSS)
// const THEME = {
//   bg: 'var(--bg-color)',
//   primary: 'var(--primary-color)',
//   text: 'var(--text-color)',
// };

const page = () => {
  return (
    <>
      <div
        className="w-full h-full"
        style={{ background: "var(--bg-color)" }}
      >
        <NavBar />
        {/* --------------------------------  { Hero }  ------------------------------------------ */}
        <div
          className="w-full h-screen relative overflow-hidden"
          style={{ background: "var(--bg-color)" }}
        >
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
            <div className="overflow-hidden">
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
                style={{
                  color: "var(--text-color)",
                }}
              >
                About{" "}
                <span style={{ color: "var(--primary-color)" }}>Me</span>
              </h1>
            </div>
            <div className="overflow-hidden max-w-3xl">
              <p
                className="text-base sm:text-lg md:text-xl font-light"
                style={{
                  color: "var(--muted-text-color, #525252)",
                }}
              >
                I transform visions into growth through innovative digital
                strategies and data-driven business solutions.
              </p>
            </div>
            <div className="mt-8 overflow-hidden">
              <button
                className="px-6 py-2 sm:px-8 sm:py-3 font-medium rounded-lg transition-all duration-300 shadow-lg"
                style={{
                  background: "var(--primary-color)",
                  color: "var(--text-color)",
                  boxShadow: "0 4px 24px 0 var(--primary-color, #FDC435)22",
                  border: "none",
                }}
              >
                Connect Now
              </button>
            </div>
          </div>
        </div>

        <AboutAPI />

        <InteractiveTimeline />
        <Quote />

        <Footer />
      </div>
    </>
  );
};

export default page;
