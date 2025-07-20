'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DownloadCVButton from './DownloadCVButton'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const aboutRef = useRef(null)
  const imageRef = useRef(null)
  const titleRef = useRef(null)
  const text1Ref = useRef(null)
  const text2Ref = useRef(null)
  const toolsRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    if (!aboutRef.current) return

    // Set initial state
    gsap.set(
      [imageRef.current, titleRef.current, text1Ref.current, text2Ref.current, toolsRef.current, buttonRef.current],
      { opacity: 0, y: 20 }
    )

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 20%",
        end: "bottom 20%",
        toggleActions: "play none none none"
      }
    })

    tl.to(imageRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to(text1Ref.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3")
    .to(text2Ref.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3")
    .to(toolsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2")
    .to(buttonRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "back.out(1.2)"
    }, "-=0.2")

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={aboutRef} className='w-full min-h-screen px-8 sm:px-16 lg:px-24 py-12 md:py-24 bg-white'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12'>
        <div ref={imageRef} className='w-full md:w-1/2'>
          <img 
            src="./images/about.jpeg" 
            alt="About me" 
            className='w-full h-auto rounded-lg shadow-lg object-cover'
          />
        </div>
        <div className='w-full md:w-1/2 space-y-6'>
          <h2 ref={titleRef} className='text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717]'>
            About <span className='text-[#FDC435]'>Me</span>
          </h2>
          <p ref={text1Ref} className='text-lg text-[#525252] leading-relaxed'>
            Dynamic and results-driven Business Development & Digital Strategy Executive with a track record of 
            elevating organizational digital capabilities and driving sustainable, data-informed growth. A proven leader in 
            orchestrating cross-platform brand campaigns that consistently deliver 25–30% revenue growth.
          </p>
          {/* <p ref={text2Ref} className='text-lg text-[#525252] leading-relaxed'>
            Expert in designing and implementing HIPAA-compliant CRM systems that boost digital inquiry submissions by 38% 
            and spearheading organic digital strategies that drive 300% increases in referrals. Certified Lean Six Sigma Green Belt, 
            recognized for operational excellence, stakeholder engagement, and transformative leadership in fast-paced environments.
          </p> */}
          <div ref={toolsRef} className="pt-2">
            <h3 className="text-lg font-semibold text-[#171717] mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Google Analytics',
                'Meta Ads',
                'Email Marketing',
                'CRM Tools',
                'Data Visualization',
                'SEO',
                'CMS',
                'Office Suite',
                'Adobe CC',
                'Automation',
                'Survey Tools'
              ].map((tool, index) => (
                <div 
                  key={index}
                  className="px-2.5 py-1.5 bg-yellow-50 rounded-md border border-yellow-100 text-xs text-yellow-800 hover:bg-yellow-100 transition-all hover:scale-105 shadow-sm"
                >
                  {tool}
                </div>
              ))}
            </div>
          </div>
          <div ref={buttonRef} className='pt-6'>
            <DownloadCVButton/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About