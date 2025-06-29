import React from "react";
import SplineModel from "../components/SplineModel";
import InteractiveTimeline from "../components/InteractiveTimeline";
import Quote from "../components/Quote";
import AboutInfo from "../components/AboutInfo";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const page = () => {
  return (
    <>
      <div className="w-full h-full bg-[#010101]">

        <NavBar/>
        {/* --------------------------------  { Hero }  ------------------------------------------ */}
        <div className="w-full h-screen relative bg-[#010101] overflow-hidden">
          <SplineModel />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
            <div className="overflow-hidden">
              <h1 className="text-white text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-4">
                About Us
              </h1>
            </div>
            <div className="overflow-hidden max-w-3xl">
              <p className="text-white/80 text-lg sm:text-xl font-light">
                We transform visions into growth through innovative digital
                strategies and cutting-edge technology solutions.
              </p>
            </div>
            <div className="mt-8 overflow-hidden">
              <button className="px-8 py-3 bg-[#A91F1E]/30 text-white/90 font-medium rounded-lg hover:bg-[#A91F1E]/40 transition-all duration-300 backdrop-blur-md border border-[#A91F1E]/50 shadow-lg hover:shadow-[#A91F1E]/30">
                Connect Now
              </button>
            </div>
          </div>
        </div>

        <section className="w-full text-white body-font">
          <div className="container mx-auto flex gap-10 max-sm:gap-10 px-5 max-sm:px-2  py-24 md:flex-row flex-col items-center">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <video
                src="https://cdn.prod.website-files.com/660b9ff56cc1437adb553c40%2F66a3956e49d8a96e28ec7e12_111-transcode.mp4"
                className="object-cover object-center rounded w-full h-full"
                muted
                autoPlay
                loop
                playsInline
              />
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center max-sm:text-left max-sm:px-8">
              <h1 className="max-sm:text-2xl text-3xl mb-4 font-bold text-white">
              Business Development & Digital Strategy Executive
              </h1>
              <p className="mb-8 leading-relaxed">
                As a dynamic and results-driven Business Development & Digital
                Strategy Executive, I specialize in elevating organizational
                digital capabilities and driving sustainable, data-informed
                growth. With a passion for operational excellence and
                transformative leadership, I bring a unique combination of
                business acumen, creative strategy, and process improvement
                expertise to every project I undertake. My experience spans
                creative project management, strategic content development, and
                leading high-performing teams across departments. I excel in
                fostering cross-functional collaboration to launch impactful
                initiatives, streamline workflows, and align messaging with
                brand objectives. Whether I’m developing integrated marketing
                campaigns, refining internal processes, or managing diverse
                teams, I’m committed to delivering meaningful, measurable
                outcomes.
              </p>
              
            </div>
          </div>
        </section>

       

        <AboutInfo />

        <InteractiveTimeline />
        <Quote />

        <Footer/>
      </div>
    </>
  );
};

export default page;
