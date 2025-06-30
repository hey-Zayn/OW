"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const section2Ref = useRef(null);
  const section2TextRef = useRef(null);
  const section2ButtonRef = useRef(null);
  const wavyImagesRef = useRef([]);
  const animationCtx = useRef(null);

  // Setup animations directly in useGSAP (no useCallback)
  useGSAP(() => {
    if (!section2Ref.current) return;

    if (animationCtx.current) {
      animationCtx.current.revert();
    }

    animationCtx.current = gsap.context(() => {
      // Fade-in text and button
      gsap.from([section2TextRef.current, section2ButtonRef.current], {
        y: 100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "power2.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top 80%",
          end: "bottom bottom",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // Wavy scroll animation
      if (wavyImagesRef.current.length > 0) {
        ScrollTrigger.create({
          trigger: section2Ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const startX = window.innerWidth;
            const endX = -window.innerWidth - 300;
            const totalDistance = startX - endX;

            wavyImagesRef.current.forEach((img, index) => {
              if (img) {
                const offset = index * -15;
                const x = startX + offset - progress * totalDistance;
                gsap.set(img, { x });
              }
            });
          },
        });
      }
    }, section2Ref);

    return () => {
      if (animationCtx.current) animationCtx.current.revert();
    };
  }, { scope: section2Ref });

  // Cleanup scroll triggers on unmount
  useEffect(() => {
    return () => {
      if (animationCtx.current) animationCtx.current.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div
      ref={section2Ref}
    //   className="w-full h-screen max-sm:h-[70vh] relative flex flex-col justify-center items-center bg-gradient-to-b from-[#000]  to-[#191919] overflow-hidden"
      className="w-full h-screen max-sm:h-[70vh] relative flex flex-col justify-center items-center bg-gradient-to-b from-[#000]  to-[#191919] overflow-hidden"
    >
      {/* <span className="size-300 absolute top-[4%] left-[50%] rounded-full bg-[radial-gradient(circle_at_center,#a8288f_20%,transparent_70%)] blur-[90px]"></span> */}

      <div className="z-10 px-4 text-center">
        
        <h1
          ref={section2TextRef}
          className="text-4xl max-sm:text-2xl font-normal text-white/90"
        >
         Leveraging 7+ years of strategic leadership <br className="max-sm:hidden" />
         to drive revenue growth<span className="font-bold "> operational excellence,</span>
          <br className="max-sm:hidden" />
          <span className="font-bold"> and scalable digital innovation.</span>
        </h1>
      </div>

      <Link href={'/contact'}>
      <button
        // ref={section2ButtonRef}
        className="text-white/90 border border-[#A91F1E]/50 px-6 py-3 font-semibold rounded-lg mt-16 z-10 cursor-pointer 
        bg-[#A91F1E]/30 backdrop-blur-md hover:bg-[#A91F1E]/40 transition-all duration-300 
        shadow-lg hover:shadow-[#A91F1E]/30"
      >
        Get in Touch
      </button>
      </Link>

      <div className="w-full max-sm:w-[300%] flex justify-center items-center absolute top-[75%]">
        {[...Array(8)].map((_, index) => (
          <img
            key={index}
            ref={(el) => { if (el) wavyImagesRef.current[index] = el; }}
            src="/images/wavy.avif"
            alt=""
            loading="lazy"
            className="w-full"
            style={{
              filter: "brightness(0) invert(0.9) opacity(1)",
              willChange: "transform",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default About;