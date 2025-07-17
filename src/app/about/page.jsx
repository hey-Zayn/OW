import React from "react";

import InteractiveTimeline from "../components/InteractiveTimeline";
import Quote from "../components/Quote";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import AboutAPI from "../components/AboutAPI";

const page = () => {
  return (
    <>
      <div className="w-full h-full bg-[#010101]">

        <NavBar/>
        {/* --------------------------------  { Hero }  ------------------------------------------ */}
        <div className="w-full h-screen relative overflow-hidden bg-white">
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
            <div className="overflow-hidden">
              <h1 className="text-[#171717] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
                About <span className="text-[#FDC435]">Me</span>
              </h1>
            </div>
            <div className="overflow-hidden max-w-3xl">
              <p className="text-[#525252] text-base sm:text-lg md:text-xl font-light">
                I transform visions into growth through innovative digital
                strategies and data-driven business solutions.
              </p>
            </div>
            <div className="mt-8 overflow-hidden">
              <button className="px-6 py-2 sm:px-8 sm:py-3 bg-[#FDC435] text-[#171717] font-medium rounded-lg hover:bg-[#FDC435]/90 transition-all duration-300 shadow-lg hover:shadow-[#FDC435]/50">
                Connect Now
              </button>
            </div>
          </div>
          {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FDC435]/10 to-transparent"></div> */}
        </div>

       <AboutAPI/>

       

     

        <InteractiveTimeline />
        <Quote />

        <Footer/>
      </div>
    </>
  );
};

export default page;
