"use client";
import Spline from '@splinetool/react-spline';
import { Suspense, useState, useEffect, memo } from 'react';

const SplineComponent = memo(({ scene }) => {
  return <Spline scene={scene} />;
});

export default function SplineModel() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Only load the 3D model when component is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const container = document.querySelector('.spline-container');
    if (container) observer.observe(container);
    
    return () => {
      if (container) observer.disconnect();
    };
  }, []);

  return (
    <main className="w-full h-full">
      <div className="spline-container w-full h-full">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center text-white/70">
            Loading 3D Model...
          </div>
        }>
          {isVisible && (
            <SplineComponent 
            // scene="https://prod.spline.design/P8iUV3zc5so1wun6/scene.splinecode" 
                // scene="https://prod.spline.design/AAFqKJ70IgxxvJi5/scene.splinecode"
                //  scene="https://prod.spline.design/dotiTBcq-AmvMw5q/scene.splinecode"
                 scene="https://prod.spline.design/syhpYJcwn3yLtpc1/scene.splinecode"
            />
          )}
        </Suspense>
      </div>
    </main>
  );
}