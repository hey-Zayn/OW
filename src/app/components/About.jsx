'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const aboutRef = useRef(null)
  const imageRef = useRef(null)
  const titleRef = useRef(null)
  const text1Ref = useRef(null)
  const text2Ref = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    if (!aboutRef.current) return

    // Set initial state
    gsap.set(
      [imageRef.current, titleRef.current, text1Ref.current, text2Ref.current, buttonRef.current],
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
            src="./images/about.jpg" 
            alt="About me" 
            className='w-full h-auto rounded-lg shadow-lg object-cover'
          />
        </div>
        <div className='w-full md:w-1/2 space-y-6'>
          <h2 ref={titleRef} className='text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717]'>
            About <span className='text-[#FDC435]'>Me</span>
          </h2>
          <p ref={text1Ref} className='text-lg text-[#525252] leading-relaxed'>
            I'm a passionate Business Development & Strategy Executive with over 10 years of experience helping companies grow and scale. My expertise lies in identifying new market opportunities, developing strategic partnerships, and driving revenue growth.
          </p>
          <p ref={text2Ref} className='text-lg text-[#525252] leading-relaxed'>
            I combine analytical thinking with creative problem-solving to deliver exceptional results. My approach is data-driven yet human-centered, ensuring strategies that work for both businesses and their customers.
          </p>
          <div ref={buttonRef} className='pt-6'>
            <button className='px-8 py-3 bg-[#FDC435] text-[#171717] font-medium rounded-lg hover:bg-[#fdc435cc] transition-all duration-300 shadow-lg hover:shadow-[#FDC435]/50'>
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About