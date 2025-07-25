'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MyExper = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const itemsRef = useRef([])

  const experiences = [
    {
      year: '2020 - Present',
      title: 'Senior Business Strategist',
      company: 'Global Growth Inc.',
      description: 'Leading strategic initiatives for Fortune 500 clients, driving revenue growth and market expansion.'
    },
    {
      year: '2016 - 2020',
      title: 'Business Development Manager',
      company: 'Market Solutions Ltd.',
      description: 'Developed and executed go-to-market strategies for new product lines across EMEA region.'
    },
    {
      year: '2013 - 2016',
      title: 'Consultant',
      company: 'Strategic Partners Consulting',
      description: 'Provided advisory services to startups and mid-sized companies on business optimization.'
    },
    {
      year: '2010 - 2013',
      title: 'Business Analyst',
      company: 'First National Bank',
      description: 'Conducted market research and financial analysis to support strategic decision making.'
    }
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    // Set initial state
    gsap.set(
      [titleRef.current, subtitleRef.current, ...itemsRef.current],
      { opacity: 0, y: 20 }
    )

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 20%",
        end: "bottom 20%",
        toggleActions: "play none none none"
      }
    })

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to(itemsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: "power2.out"
    }, "-=0.3")

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className='w-full py-20 bg-white' ref={sectionRef}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 ref={titleRef} className='text-3xl font-bold text-[#171717] mb-4'>Professional Journey</h2>
          <div ref={subtitleRef} className='w-20 h-1 bg-[#FDC435] mx-auto'></div>
        </div>

        <div className='relative'>
          {/* Timeline line */}
          <div className='absolute left-1/2 w-1 h-full bg-[#FDC435] transform -translate-x-1/2'></div>

          <div className='space-y-12'>
            {experiences.map((exp, index) => (
              <div 
                key={index}
                ref={el => itemsRef.current[index] = el}
                className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`w-full md:w-1/2 p-6 bg-[#F9FAFF] rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <div className='absolute top-6 w-4 h-4 rounded-full bg-[#FDC435] transform -translate-x-1/2 left-1/2'></div>
                  <div className='flex items-center mb-2'>
                    <span className='text-[#FDC435] font-medium'>{exp.year}</span>
                  </div>
                  <h3 className='text-xl font-bold text-[#171717]'>{exp.title}</h3>
                  <p className='text-[#525252] font-medium mb-2'>{exp.company}</p>
                  <p className='text-[#525252]'>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyExper