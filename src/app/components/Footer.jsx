"use client";
import React, { useRef, useEffect, useState } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Footer = () => {
  const footerRef = useRef(null);
  const LeftHandRef = useRef(null);
  const RightHandRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const animationCtx = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
      ScrollTrigger.getAll().forEach(instance => instance.kill());
    };
  }, []);

  useGSAP(() => {
    if (!isMounted || !footerRef.current) return;

    const calculateMovement = () => ({
      left: window.innerWidth >= 1920 ? "-150%" : "-100%",
      right: window.innerWidth >= 1920 ? "150%" : "100%"
    });

    const { left: leftMovement, right: rightMovement } = calculateMovement();

    animationCtx.current = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
          scrub: 5,
          onRefresh: () => {
            const { left: newLeft, right: newRight } = calculateMovement();
            gsap.set(LeftHandRef.current, { x: newLeft });
            gsap.set(RightHandRef.current, { x: newRight });
          }
        }
      });

      tl.fromTo([LeftHandRef.current, RightHandRef.current], {
        x: (i) => i === 0 ? leftMovement : rightMovement,
        opacity: 1
      }, {
        x: "0%", 
        opacity: 1,
        ease: "power2.inOut"
      })
      .to([LeftHandRef.current, RightHandRef.current], {
        x: (i) => i === 0 ? leftMovement : rightMovement,
        opacity: 1,
        ease: "power2.inOut"
      });
    }, footerRef);

    return () => {
      if (animationCtx.current) {
        animationCtx.current.revert();
      }
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMounted]);

  return (
    <div id="footer" ref={footerRef} className="footer relative w-full h-screen max-sm:h-full bg-[#181818] pt-20 max-sm:pt-10 overflow-hidden">
      <div className="w-full flex items-center pl-30">
        <div className="w-full py-5">
          <h2 className="text-white text-5xl font-semibold">Let's</h2>
        </div>
      </div>
      <div className="w-full">
        <img 
          src="/images/footer2.svg" 
          alt="Chat Panda Logo" 
          className="w-full object-cover" 
          loading="lazy"
        />
      </div>
      <div className="w-full flex max-sm:flex-col justify-center items-center gap-15 text-white py-12">
        <div><p>Industries</p></div>
        <div><p>Locations</p></div>
        <div><p>Facebook</p></div>
        <div><p>Instagram</p></div>
        <div><p>Linkedin</p></div>
      </div>
      
      {isMounted && (
        <div className="w-full">
          <video
            src="/videos/footer.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
          />
        </div>
      )}

      <footer className="w-full flex max-sm:flex-col max-sm:hidden justify-between items-center px-10 py-4">
        <div className="text-white">
          <p>© 2025 Oliver Williams. All rights reserved.</p>
        </div>
        <div className="flex gap-1">
          <p className="text-white/50">Powered by:</p>
          <p className="text-white text-sm">Zayn-Butt</p>
        </div>
        {/* <div className="flex gap-1 max-sm:flex-col max-sm:text-center text-white">
          <p>We also develop software:</p>
          <p className="font-semibold">www.devpandas.co</p>
        </div> */}
      </footer>

      <img 
        ref={LeftHandRef} 
        src="/images/Handleft.avif" 
        alt="" 
        className="absolute top-[30%] -left-[05%] w-[60%]"
        loading="lazy"
      />
      <img 
        ref={RightHandRef} 
        src="/images/Handright.avif" 
        alt="" 
        className="absolute top-[30%] left-[55%] w-[60%]"
        loading="lazy"
      />
    </div>
  );
};

export default Footer;