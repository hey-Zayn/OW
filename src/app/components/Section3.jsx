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
      company: "The Recovery Center USA | Cary, NC",
      period: "2022–Present",
      achievements: [
        "Spearheaded digital transformation for 6 behavioral health programs, increasing revenue by 25% in Year 1",
        "Implemented HIPAA-compliant CRM system, boosting patient inquiries by 38%",
        "Led cross-functional teams of 30+ to align tech infrastructure with strategic goals"
      ],
      tools: "Salesforce, Tableau, AI automation"
    },
    {
      title: "Director of Development & Innovation", 
      company: "Healthcare Consultancy Group | Remote",
      period: "2018–2022",
      achievements: [
        "Launched multi-state digital campaigns that grew engagement by 30% through targeted content",
        "Optimized vendor partnerships, reducing operational costs by 22%",
        "Trained 8-10 member teams on data-driven decision making"
      ],
      tools: "HubSpot, Monday.com, Adobe Creative Suite"
    },
    {
      title: "Digital Strategy Consultant",
      company: "Freelance Clients | National",
      period: "2016–2018",
      achievements: [
        "Delivered $18K revenue growth for small businesses via SEO/email campaigns",
        "Automated reporting workflows, saving 15+ hours weekly with Lean Six Sigma methods",
        "Conducted leadership workshops for 50+ professionals"
      ],
      tools: "WordPress, Mailchimp, Google Analytics"
    },
    {
      title: "Marketing Director",
      company: "Nonprofit Health Initiative | Kansas City, MO",
      period: "2014–2016",
      achievements: [
        "Secured $500K+ in grants through award-winning awareness campaigns",
        "Revamped donor CRM system, improving retention by 27%",
        "Negotiated contracts with 20+ vendors to enhance service delivery"
      ],
      tools: "Bloomerang, Canva, Meta Ads"
    },
    {
      title: "Creative Campaign Lead",
      company: "Author Branding Projects | Remote",
      period: "2012–2014",
      achievements: [
        "Orchestrated marketing for an Amazon #1 Best Seller launch",
        "Grew social media followings by 4,000+ through strategic content",
        "Developed brand storytelling frameworks that increased engagement by 25-30%"
      ],
      tools: "Adobe Premiere, Hootsuite, SEMrush"
    },
    {
      title: "Operations Analyst",
      company: "Global Consulting Firm | Chicago, IL",
      period: "2010–2012",
      achievements: [
        "Built real-time dashboards that reduced reporting time by 20%",
        "Authored 10+ whitepapers on digital transformation trends",
        "Streamlined client deliverables using Lean Six Sigma principles"
      ],
      tools: "SharePoint, Tableau, Microsoft Power BI"
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
              <div className="card w-80 bg-gradient-to-br from-red-900/30 to-red-800/40 backdrop-blur-lg rounded-xl p-6 border border-red-500/30 shadow-lg shadow-red-900/20 transition-all duration-300 hover:shadow-red-800/30 hover:scale-[1.02] hover:border-red-500/50">
                <div className="mb-5">
                  <h3 className="text-xl font-semibold text-white tracking-tight">{item.title}</h3>
                  <p className="text-white/80 text-xs mt-1.5 font-medium tracking-wide">{item.company} • <span className="text-white/60">{item.period}</span></p>
                </div>
                
                {item.achievements && (
                  <ul className="mb-5 space-y-2.5">
                    {item.achievements.map((achievement, i) => (
                      <li key={i} className="text-white/90 text-xs leading-relaxed flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500/80 mt-1.5 mr-2 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
                
               
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile view */}
      <div className="w-full h-full overflow-hidden lg:hidden md:hidden max-sm:block bg-[#E5E5E5]">
        <div className="h-full w-full py-4 px-4 overflow-hidden">
          <div className="flex flex-col justify-center gap-6">
            <div className="w-full flex flex-col justify-center mb-8">
              <h2 className="text-center text-3xl">BPO OUTSOURCING?</h2>
              <h2 className="text-center text-3xl font-bold uppercase">
                Let's tackle your <br /> challenges
              </h2>
            </div>

            {client.map((item, index) => (
              <div
                key={`mobile-card-${index}`}
                ref={(el) => (mobileCardRefs.current[index] = el)}
                id={index === 0 ? "mobileCard1section3" : undefined}
                className="w-full flex justify-center items-center"
              >
                <div className="card w-80 bg-gradient-to-br from-red-900/30 to-red-800/40 backdrop-blur-lg rounded-xl p-6 border border-red-500/30 shadow-lg shadow-red-900/20 transition-all duration-300 hover:shadow-red-800/30 hover:scale-[1.02] hover:border-red-500/50">
                  <div className="mb-5">
                    <h3 className="text-xl font-semibold text-white tracking-tight">{item.title}</h3>
                    <p className="text-white/80 text-xs mt-1.5 font-medium tracking-wide">{item.company} • <span className="text-white/60">{item.period}</span></p>
                  </div>
                  
                  {item.achievements && (
                    <ul className="mb-5 space-y-2.5">
                      {item.achievements.map((achievement, i) => (
                        <li key={i} className="text-white/90 text-xs leading-relaxed flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500/80 mt-1.5 mr-2 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
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