"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  const section3Ref = useRef(null);
  const textRefs = useRef({
    text1: null,
    text2: null,
  });

  const desktopCardRefs = useRef([]);
  const mobileCardRefs = useRef([]);
  const scrollTriggersRef = useRef([]);

  useGSAP(() => {
    // Kill existing ScrollTriggers
    scrollTriggersRef.current.forEach((st) => st.kill());
    scrollTriggersRef.current = [];

    // Animate header text
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: section3Ref.current,
        start: "top 80%",
        end: "bottom bottom",
        toggleActions: "play none none none",
        once: true,
      },
    });

    textTl.from([textRefs.current.text1, textRefs.current.text2], {
      y: -50,
      opacity: 0,
      duration: 0.4,
      stagger: 0.15,
      ease: "power2.out",
      clearProps: "transform",
    });

    // Animate desktop cards
    const desktopRotations = [-15, 15];
    desktopCardRefs.current.forEach((card, index) => {
      if (!card) return;

      const rotation = desktopRotations[index % desktopRotations.length];
      const st = ScrollTrigger.create({
        trigger: card,
        start: "top 60%",
        scrub: 1.5,
        toggleActions: "play none none reverse",
        animation: gsap.fromTo(
          card,
          {
            rotationX: -25,
            rotationY: -10,
            rotationZ: rotation,
            translateY: 100,
          },
          {
            rotationX: 0,
            rotationY: 0,
            rotationZ: -rotation,
            translateY: 50,
            duration: 0.8,
            ease: "power2.out",
          }
        ),
      });
      scrollTriggersRef.current.push(st);
    });

    // Animate mobile cards
    mobileCardRefs.current.forEach((card, index) => {
      if (!card) return;

      const isEven = index % 2 === 0;
      const st = ScrollTrigger.create({
        trigger: card,
        start: "top 70%",
        toggleActions: "play none none reverse",
        once: true,
        animation: gsap.fromTo(
          card,
          {
            x: isEven ? -150 : 150,
            y: 80,
            opacity: 0,
            scale: 0.7,
            rotation: isEven ? -20 : 20,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "back.out(1.5)",
          }
        ),
      });
      scrollTriggersRef.current.push(st);
    });

    return () => {
      scrollTriggersRef.current.forEach((st) => st.kill());
      scrollTriggersRef.current = [];
    };
  }, []);


  const client = [
    {
      title: "Chief Strategy Officer",
      company: "The Recovery Center USA",
      period: "2022–Present",
    },
    {
      title: "Director of Development & Innovation", 
      company: "Healthcare Consultancy",
      period: "2018–2022",
     
    },
    {
      title: "Digital Strategy Consultant",
      company: "Freelance Portfolio",
      period: "2016–2018",
      
    },
    {
      title: "Marketing Director",
      company: "Nonprofit Health Initiative",
      period: "2014–2016",
      
    },
    {
      title: "Creative Campaign Lead",
      company: "Author Branding Projects",
      period: "2012–2014",
      
    },
    {
      title: "Operations & Analytics Specialist",
      company: "Global Consulting Firm",
      period: "2010–2012",
     
    }
  ]

  return (
    <>
      <div
        ref={section3Ref}
        className="h-full w-full py-[100px] px-[70px] max-sm:hidden lg:block bg-[#E5E5E5]"
      >
        <div className="px-2">
          <div className="sticky top-[40%] flex flex-col justify-center z-20">
            <h2
              ref={(el) => (textRefs.current.text1 = el)}
              className="text-center text-6xl text-black"
            >
              EXPERIENCE UNFOLDED
            </h2>
            <h2
              ref={(el) => (textRefs.current.text2 = el)}
              className="text-center text-6xl font-bold uppercase  text-black"
            >
              Let's dive into my story
            </h2>
          </div>

          {client.map((item, index) => (
            <div
              key={`card-${index}`}
              ref={(el) => (desktopCardRefs.current[index] = el)}
              id={`card${index}`}
              className={`w-full flex ${
                index % 2 === 0 ? "justify-end" : "justify-start"
              } items-center ${
                index === 0
                  ? "mt-60"
                  : index % 2 === 0
                  ? "mt-30"
                  : ""
              } transform rotate-x-0 rotate-y-0 ${
                index % 2 === 0 ? "rotate-z-25" : "-rotate-z-15"
              } ${index === 5 ? "mb-40" : ""}`}
            >
              <div className="card w-80 bg-gradient-to-br from-red-900/30 to-red-800/40 backdrop-blur-lg rounded-2xl p-8 border border-red-500/30 shadow-xl shadow-red-900/20 transition-all duration-300 hover:shadow-red-800/30 hover:scale-[1.02] hover:border-red-500/50">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{item.title}</h3>
                  <p className="text-white/80 text-sm mt-2">{item.company} • <span className="text-white/60">{item.period}</span></p>
                </div>
                
                {item.achievements && (
                  <ul className="mb-6 space-y-2">
                    {item.achievements.map((achievement, i) => (
                      <li key={i} className="text-white/90 text-sm leading-relaxed flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500/80 mt-2 mr-2"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
                
                <button className="w-full mt-2 px-6 py-3 bg-red-600/80 text-white rounded-xl border border-red-500/50 hover:bg-red-700/90 transition-all duration-300 font-medium tracking-wide flex items-center justify-center gap-2">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile view */}
      <div className="w-full h-full overflow-hidden lg:hidden md:hidden max-sm:block bg-[#191919]">
        <div className="h-full w-full py-4 px-4 overflow-hidden">
          <div className="flex flex-col justify-center gap-6">
            <div className="w-full flex flex-col justify-center mb-8">
              <h2 className="text-center text-3xl">BPO OUTSOURCING?</h2>
              <h2 className="text-center text-3xl font-bold uppercase">
                Let's tackle your <br /> challenges
              </h2>
            </div>

            {[1, 2, 3, 4, 5, 6].map((num, index) => (
              <div
                key={`mobile-card-${num}`}
                ref={(el) => (mobileCardRefs.current[index] = el)}
                id={index === 0 ? "mobileCard1section3" : undefined}
                className="w-full flex justify-center items-center"
              >
                <div className="card w-80 bg-gradient-to-br from-red-900/30 to-red-800/40 backdrop-blur-lg rounded-2xl p-8 border border-red-500/30 shadow-xl shadow-red-900/20 transition-all hover:shadow-red-800/30 hover:scale-[1.02]">
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Challenge {num}</h3>
                  <p className="text-white/90 text-base leading-relaxed mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <ul className="text-white/90 text-base leading-relaxed mb-6 list-disc pl-5">
                    <li>Sample achievement 1</li>
                    <li>Sample achievement 2</li>
                    <li>Sample achievement 3</li>
                  </ul>
                  <button className="w-full mt-2 px-6 py-3 bg-red-600/80 text-white rounded-xl border border-red-500/50 hover:bg-red-700/90 transition-all duration-300 font-medium tracking-wide">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Section3;