'use client';
import React, { useRef, useState, useCallback, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import DownloadCVButton from './DownloadCVButton';

gsap.registerPlugin(ScrollTrigger, useGSAP, MotionPathPlugin);

const experiences = [
  {
    year: '2022 - Present',
    title: 'Chief Strategy Officer',
    company: 'The Recovery Center USA | Cary, NC',
    description: 'Spearheaded digital transformation for 6 behavioral health programs, increasing revenue by 25% in Year 1. Implemented HIPAA-compliant CRM system, boosting patient inquiries by 38%.',
    skills: ['Salesforce', 'Tableau', 'AI Automation', 'Team Leadership'],
    icon: '📈',
    color: 'bg-yellow-50',
    border: 'border-yellow-500',
    text: 'text-yellow-600'
  },
  {
    year: '2018 - 2022',
    title: 'Director of Development & Innovation',
    company: 'Healthcare Consultancy Group | Remote',
    description: 'Launched multi-state digital campaigns that grew engagement by 30%. Optimized vendor partnerships, reducing operational costs by 22%.',
    skills: ['HubSpot', 'Monday.com', 'Adobe Creative Suite', 'Data Analysis'],
    icon: '💡',
    color: 'bg-yellow-50',
    border: 'border-yellow-500',
    text: 'text-yellow-600'
  },
  {
    year: '2016 - 2018',
    title: 'Digital Strategy Consultant',
    company: 'Freelance Clients | National',
    description: 'Delivered $18K revenue growth via SEO/email campaigns. Automated reporting workflows saving 15+ hours weekly with Lean Six Sigma methods.',
    skills: ['WordPress', 'Mailchimp', 'Google Analytics', 'SEO'],
    icon: '🔍',
    color: 'bg-yellow-50',
    border: 'border-yellow-500',
    text: 'text-yellow-600'
  },
  {
    year: '2014 - 2016',
    title: 'Marketing Director',
    company: 'Nonprofit Health Initiative | Kansas City, MO',
    description: 'Secured $500K+ in grants through awareness campaigns. Revamped donor CRM system improving retention by 27%.',
    skills: ['Bloomerang', 'Canva', 'Meta Ads', 'Grant Writing'],
    icon: '📢',
    color: 'bg-yellow-50',
    border: 'border-yellow-500',
    text: 'text-yellow-600'
  }
];

const FloatingOrbs = memo(() => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="floating-orb absolute top-1/4 left-10 w-6 h-6 rounded-full bg-yellow-100/30 blur-xl" />
    <div className="floating-orb absolute top-2/3 right-20 w-8 h-8 rounded-full bg-yellow-100/30 blur-xl" />
    <div className="floating-orb absolute bottom-1/4 left-1/3 w-5 h-5 rounded-full bg-yellow-100/30 blur-xl" />
  </div>
));

const SectionHeader = memo(() => (
  <div className="text-center mb-20">
    <h2 className="text-5xl md:text-5xl font-bold text-gray-800 mb-6">
      Professional Milestones
    </h2>
    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
      A comprehensive overview of my career progression, highlighting key achievements and <span className="font-bold text-yellow-600">strategic contributions</span>
    </p>
  </div>
));

const SkillBadge = memo(({ skill, isActive, index, color }) => (
  <span 
    className={`skill-badge px-4 py-2 text-sm font-medium rounded-full bg-yellow-100 border border-yellow-200 text-yellow-800 hover:bg-yellow-200 hover:scale-105 transition-all duration-300 ${isActive ? 'animate-pop' : ''}`}
    style={{ transitionDelay: `${index * 50}ms` }}
  >
    {skill}
  </span>
));

const TimelineCard = memo(({ exp, index, isActive }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`relative timeline-item group md:flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-center`}>
      {/* Year (mobile) */}
      <div className="md:hidden mb-6">
        <span className="text-2xl font-bold text-gray-800">{exp.year}</span>
      </div>

      {/* Interactive icon */}
      <div className={`absolute left-1/2 -translate-x-1/2 md:left-auto md:right-1/2 md:translate-x-1/2 top-0 w-14 h-14 rounded-full bg-yellow-50 border-2 ${exp.border} shadow-lg z-10 flex items-center justify-center timeline-icon transition-all duration-500 ${isActive ? 'scale-110 bg-yellow-100' : 'bg-yellow-50'}`}>
        <span className={`text-3xl ${isActive ? 'animate-bounce' : ''}`}>{exp.icon}</span>
      </div>

      {/* Year (desktop) */}
      <div className={`hidden md:block md:w-1/2 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
        <div className={`h-full flex items-center ${isEven ? 'justify-end' : 'justify-start'}`}>
          <span className={`text-6xl font-bold timeline-year transition-all duration-500 ${isActive ? exp.text : 'text-gray-200'}`}>
            {exp.year.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Modern Card */}
      <div className={`md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
        <div className={`relative overflow-hidden p-8 ${exp.color} rounded-2xl border ${exp.border} shadow-lg transition-all duration-500 timeline-card ${isActive ? 'scale-105' : ''} ${isEven ? 'md:translate-x-8' : 'md:-translate-x-8'}`}>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-3 rounded-xl bg-yellow-100 ${isActive ? 'animate-pulse' : ''}`}>
                <span className="text-3xl">{exp.icon}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{exp.title}</h3>
                <p className={exp.text}>{exp.company}</p>
              </div>
            </div>

            <p className="text-gray-700 mb-8">{exp.description}</p>
            
            <div className="flex flex-wrap gap-3">
              {exp.skills.map((skill, i) => (
                <SkillBadge 
                  key={i} 
                  skill={skill} 
                  isActive={isActive} 
                  index={i}
                  color={exp.text}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const InteractiveTimeline = () => {
  const containerRef = useRef();
  const [activeCard, setActiveCard] = useState(null);
  const scrollTriggersRef = useRef([]);

  const handleCardEnter = useCallback((index) => {
    setActiveCard(index);
  }, []);

  const handleCardLeave = useCallback(() => {
    setActiveCard(null);
  }, []);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.to(".floating-orb", {
        y: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
      });

      const container = containerRef.current;
      container.addEventListener("mousemove", (e) => {
        if (!e.target.closest(".timeline-card")) return;
        
        const card = e.target.closest(".timeline-card");
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;

        gsap.to(card, {
          rotationX: angleX,
          rotationY: angleY,
          transformPerspective: 1000,
          ease: "power2.out",
          duration: 0.5,
          overwrite: true
        });
      });

      container.addEventListener("mouseleave", (e) => {
        if (!e.target.closest(".timeline-card")) return;
        
        const card = e.target.closest(".timeline-card");
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          ease: "elastic.out(1, 0.3)",
          duration: 1,
          overwrite: true
        });
      });

      // Scroll-triggered animations - batch for better performance
      const timelineItems = gsap.utils.toArray(".timeline-item");
      timelineItems.forEach((item, i) => {
        const icon = item.querySelector(".timeline-icon");
        const year = item.querySelector(".timeline-year");
        const card = item.querySelector(".timeline-card");
        const skills = item.querySelectorAll(".skill-badge");
        const media = item.querySelector("img");

        // Set initial states
        gsap.set([icon, year, card, skills, media], { opacity: 0, y: 30 });
        gsap.set(icon, { scale: 0 });

        // Create animation sequence with optimized settings
        const st = ScrollTrigger.create({
          trigger: item,
          start: "top 70%",
          end: "bottom 30%",
          onEnter: () => {
            const tl = gsap.timeline({
              defaults: { duration: 0.4, ease: "power2.out" }
            });
            
            tl.to(icon, { 
              scale: 1, 
              opacity: 1, 
              duration: 0.5
            })
            .to(year, { 
              opacity: 1, 
              y: 0
            }, "-=0.3")
            .to(card, { 
              opacity: 1, 
              y: 0
            }, "-=0.2")
            .to(media, {
              opacity: 1,
              y: 0
            }, "-=0.2")
            .to(skills, { 
              opacity: 1, 
              y: 0, 
              stagger: 0.05
            }, "-=0.1");
          },
          once: true
        });
        
        scrollTriggersRef.current.push(st);
      });

      // Animated gradient timeline track
      const track = document.querySelector(".timeline-track");
      const trackST = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 1,
        animation: gsap.from(track, {
          scaleY: 0,
          duration: 2,
          ease: "power3.out",
          transformOrigin: "top center"
        }),
        fastScrollEnd: true
      });
      
      scrollTriggersRef.current.push(trackST);
    }, containerRef);

    // Clean up function
    return () => {
      ctx.revert();
      scrollTriggersRef.current.forEach(st => st.kill());
      scrollTriggersRef.current = [];
    };
  }, { scope: containerRef });

  return (
    <section className="relative py-28 px-4 sm:px-8 bg-white overflow-hidden">
       
      <FloatingOrbs />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader />

        {/* Interactive timeline */}
        <div ref={containerRef} className="relative">
          {/* Animated gradient track */}
          <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-yellow-600 timeline-track hidden md:block" />

          <div className="space-y-24 md:space-y-32">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                onMouseEnter={() => handleCardEnter(index)}
                onMouseLeave={handleCardLeave}
              >
                <TimelineCard 
                  exp={exp} 
                  index={index} 
                  isActive={activeCard === index} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <div className="mt-20 text-center">
        {/* <button className="px-8 py-4 bg-gradient-to-r from-[#FDC435] via-[#FDC435]/80 to-[#FDC435]/50 rounded-xl text-gray-900 font-semibold shadow-lg hover:shadow-[#FDC435]/50 hover:scale-[1.02] transition-all duration-300 animate-float">
          Download Full Resume
        </button> */}
        <DownloadCVButton/>
      </div>
    </section>
  );
};

export default memo(InteractiveTimeline);