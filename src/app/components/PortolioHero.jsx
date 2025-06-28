"use client";
import React, { memo, lazy, Suspense } from "react";
import dynamic from 'next/dynamic';

// Lazy load SplineModel with intersection observer
const SplineModel = lazy(() => import("./SplineModel"));

// Simple text components without memo (less overhead than memo benefits)
const TopText = () => (
  <div className="absolute top-10 md:top-20 lg:top-30 right-5 md:right-10 lg:right-20 flex flex-col z-10">
    <div className="overflow-hidden">
      <h3 className="text-white text-left uppercase text-xl sm:text-2xl md:text-3xl leading-none">
        Transforming
      </h3>
    </div>
    <div className="overflow-hidden">
      <h3 className="text-white uppercase text-xl sm:text-2xl md:text-3xl leading-none">
        Vision into
      </h3>
    </div>
    <div className="overflow-hidden">
      <h3 className="text-white uppercase font-extrabold text-xl sm:text-2xl md:text-3xl leading-none">
        Growth.
      </h3>
    </div>
  </div>
);

const BottomText = () => (
  <div className="absolute bottom-10 md:bottom-20 left-5 md:left-10 lg:left-20 flex flex-col z-10">
    <div className="overflow-hidden">
      <h3 className="text-white uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-none text-right ml-10 sm:ml-15 md:ml-20">
        Strategizing
      </h3>
    </div>
    <div className="overflow-hidden">
      <h3 className="text-white uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-none">
        Tomorrow's
      </h3>
    </div>
    <div className="overflow-hidden">
      <h3 className="text-white uppercase font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none text-right ml-10 sm:ml-15 md:ml-20">
        Success
      </h3>
    </div>
  </div>
);

const PortfolioHero = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('#model-container');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-screen bg-black">
      <TopText />
      <BottomText />
      
      {/* 3D Model - lazy loaded only when in view */}
      <div id="model-container" className="absolute inset-0 z-0">
        {isVisible && (
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center text-white/70">
              Loading 3D Model...
            </div>
          }>
            <SplineModel />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default memo(PortfolioHero);