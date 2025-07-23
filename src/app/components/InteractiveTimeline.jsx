'use client';
import React, { useRef, useState, useCallback, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import DownloadCVButton from './DownloadCVButton';
import axios from 'axios';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger, useGSAP, MotionPathPlugin);

// Use CSS variables for theme colors
const THEME = {
  bg: 'var(--bg-color)',
  primary: 'var(--primary-color)',
  text: 'var(--text-color)',
};

const FloatingOrbs = memo(() => (
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="floating-orb absolute top-1/4 left-10 w-6 h-6 rounded-full blur-xl"
      style={{
        backgroundColor: 'rgba(253, 196, 53, 0.18)', // --primary-color with opacity
      }}
    />
    <div
      className="floating-orb absolute top-2/3 right-20 w-8 h-8 rounded-full blur-xl"
      style={{
        backgroundColor: 'rgba(253, 196, 53, 0.18)',
      }}
    />
    <div
      className="floating-orb absolute bottom-1/4 left-1/3 w-5 h-5 rounded-full blur-xl"
      style={{
        backgroundColor: 'rgba(253, 196, 53, 0.18)',
      }}
    />
  </div>
));

const SectionHeader = memo(() => (
  <div className="text-center mb-20">
    <h2
      className="text-5xl md:text-5xl font-bold mb-6"
      style={{ color: THEME.text }}
    >
      Professional Milestones
    </h2>
    <p
      className="text-xl max-w-2xl mx-auto"
      style={{ color: THEME.text }}
    >
      A comprehensive overview of my career progression, highlighting key achievements and{' '}
      <span
        className="font-bold"
        style={{ color: THEME.primary }}
      >
        strategic contributions
      </span>
    </p>
  </div>
));

const SkillBadge = memo(({ skill, isActive, index }) => (
  <span
    className={`skill-badge px-4 py-2 text-sm font-medium rounded-full border hover:scale-105 transition-all duration-300 ${isActive ? 'animate-pop' : ''}`}
    style={{
      backgroundColor: 'rgba(253, 196, 53, 0.12)', // --primary-color with opacity
      borderColor: 'rgba(253, 196, 53, 0.25)',
      color: THEME.primary,
      transitionDelay: `${index * 50}ms`,
    }}
  >
    {skill}
  </span>
));

const TimelineCard = memo(({ exp, index, isActive }) => {
  const isEven = index % 2 === 0;
  const shortDescription =
    exp.description.length > 100
      ? `${exp.description.substring(0, 100)}...`
      : exp.description;

  return (
    <div
      className={`relative timeline-item group md:flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-center`}
    >
      {/* Year (mobile) */}
      <div className="md:hidden mb-6">
        <span
          className="text-2xl font-bold"
          style={{ color: THEME.text }}
        >
          {exp.year}
        </span>
      </div>

      {/* Year (desktop) */}
      <div className={`hidden md:block md:w-1/2 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
        <div className={`h-full flex items-center ${isEven ? 'justify-end' : 'justify-start'}`}>
          <span
            className={`text-6xl font-bold timeline-year transition-all duration-500`}
            style={{
              color: isActive ? THEME.primary : '#e5e7eb', // gray-200 fallback
            }}
          >
            {exp.year}
          </span>
        </div>
      </div>

      {/* Modern Card */}
      <div className={`md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
        <div
          className={`relative overflow-hidden p-8 rounded-2xl border shadow-lg transition-all duration-500 timeline-card ${isActive ? 'scale-105' : ''} ${isEven ? 'md:translate-x-8' : 'md:-translate-x-8'}`}
          style={{
            background: 'rgba(253, 196, 53, 0.07)', // --primary-color with low opacity
            borderColor: THEME.primary,
          }}
        >
          <div className="relative z-10">
            <div className="mb-6">
              <h3
                className="text-2xl font-bold"
                style={{ color: THEME.text }}
              >
                {exp.title}
              </h3>
              <p style={{ color: THEME.primary, fontWeight: 600 }}>{exp.company}</p>
              {exp.location && (
                <div className="flex items-center gap-2 mt-2" style={{ color: 'rgba(23,23,23,0.6)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{exp.location}</span>
                </div>
              )}
            </div>

            <p className="mb-4" style={{ color: THEME.text }}>{shortDescription}</p>

            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2" style={{ color: THEME.primary }}>
                SKILLS
              </h4>
              <div className="flex flex-wrap gap-3">
                {exp.skills.map((skill, i) => (
                  <SkillBadge
                    key={i}
                    skill={skill}
                    isActive={isActive}
                    index={i}
                  />
                ))}
              </div>
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
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleCardEnter = useCallback((index) => {
    setActiveCard(index);
  }, []);

  const handleCardLeave = useCallback(() => {
    setActiveCard(null);
  }, []);

  React.useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('/api/experience');
        if (res.data && res.data.success && Array.isArray(res.data.data)) {
          setExperiences(res.data.data);
        } else {
          setExperiences([]);
        }
      } catch (err) {
        setError('Failed to load experiences.');
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
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
        const year = item.querySelector(".timeline-year");
        const card = item.querySelector(".timeline-card");
        const skills = item.querySelectorAll(".skill-badge");
        const media = item.querySelector("img");

        // Set initial states
        gsap.set([year, card, skills, media], { opacity: 0, y: 30 });

        // Create animation sequence with optimized settings
        const st = ScrollTrigger.create({
          trigger: item,
          start: "top 70%",
          end: "bottom 30%",
          onEnter: () => {
            const tl = gsap.timeline({
              defaults: { duration: 0.4, ease: "power2.out" }
            });

            // Remove icon animation (no icon in this version)
            tl
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
    <section
      className="relative py-28 px-4 sm:px-8 overflow-hidden"
      style={{ background: THEME.bg }}
    >
      <FloatingOrbs />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader />

        {/* Interactive timeline */}
        <div ref={containerRef} className="relative">
          {/* Animated gradient track */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-1 h-full timeline-track hidden md:block"
            style={{ background: THEME.primary }}
          />

          <div className="space-y-24 md:space-y-32">
            {loading && (
              <div className="text-center py-10" style={{ color: THEME.text }}>
                Loading experiences...
              </div>
            )}
            {error && (
              <div className="text-center py-10" style={{ color: '#ef4444' }}>
                {error}
              </div>
            )}
            {!loading && !error && experiences.length === 0 && (
              <div className="text-center py-10" style={{ color: THEME.text }}>
                No experiences found.
              </div>
            )}
            {!loading && !error && experiences.map((exp, index) => (
              <div
                key={exp._id || index}
                onMouseEnter={() => handleCardEnter(index)}
                onMouseLeave={handleCardLeave}
                onClick={() => router.push(`/experience/${exp._id}`)}
                tabIndex={0}
                role="button"
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    router.push(`/experience/${exp._id}`);
                  }
                }}
                className="cursor-pointer rounded-lg focus-visible:outline-none"
                aria-label={`View details for experience at ${exp.company}`}
              >
                <TimelineCard
                  exp={{
                    year: exp.duration,
                    title: exp.position,
                    company: exp.company,
                    description: exp.description,
                    skills: exp.skills || [],
                    location: exp.location,
                  }}
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
        <DownloadCVButton />
      </div>
    </section>
  );
};

export default memo(InteractiveTimeline);