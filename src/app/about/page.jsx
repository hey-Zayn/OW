import React from "react";
import SplineModel from "../components/SplineModel";
import InteractiveTimeline from "../components/InteractiveTimeline";

const page = () => {
  return (
    <>
      <div className="w-full h-full bg-[#181818]">
        {/* --------------------------------  { Hero }  ------------------------------------------ */}
        <div className="w-full h-screen relative bg-[#181818] overflow-hidden">
          <SplineModel />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
            <div className="overflow-hidden">
              <h1 className="text-white text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-4">
                About Us
              </h1>
            </div>
            <div className="overflow-hidden max-w-3xl">
              <p className="text-white/80 text-lg sm:text-xl font-light">
                We transform visions into growth through innovative digital strategies
                and cutting-edge technology solutions.
              </p>
            </div>
            <div className="mt-8 overflow-hidden">
              <button className="px-8 py-3 bg-[#A91F1E]/30 text-white/90 font-medium rounded-lg hover:bg-[#A91F1E]/40 transition-all duration-300 backdrop-blur-md border border-[#A91F1E]/50 shadow-lg hover:shadow-[#A91F1E]/30">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <InteractiveTimeline/>
      </div>
    </>
  );
};

export default page;
