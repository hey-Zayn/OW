'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

const PortfolioHero = () => {
  const sectionRef = useRef(null)
  const yellowBgRef = useRef(null)
  const heroImgRef = useRef(null)
  const textContentRef = useRef(null)
  const buttonsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([yellowBgRef.current, heroImgRef.current, textContentRef.current, buttonsRef.current], {
        opacity: 0,
        y: 30
      })

      // Create timeline with scroll trigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          toggleActions: 'play none none none',
          markers: false
        },
        defaults: {
          duration: 1,
          ease: 'expo.out'
        }
      })

      // Luxury sequential animation with refined timing and effects
      tl.fromTo(yellowBgRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 1.1,
          ease: 'power4.out'
        }
      )
      .fromTo(heroImgRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.4)'
        },
        '>0.2' // starts 0.2s after previous animation ends
      )
      .fromTo(textContentRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 1,
          ease: 'power3.out'
        },
        '>0.3' // starts 0.3s after previous animation ends
      )
      .fromTo(buttonsRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
          stagger: 0.15 // slight stagger between buttons
        },
        '>0.1' // starts 0.1s after previous animation ends
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className='w-full min-h-[80vh] flex flex-col lg:flex-row'>
      <div ref={textContentRef} className='w-full lg:w-1/2 py-10 lg:py-20 px-6 md:px-10 flex flex-col justify-center'>
        <span className='text-yellow-600 text-lg md:text-xl'>
          Business Development & Strategy Executive
        </span>

        <h1 className='text-4xl md:text-5xl lg:text-6xl text-black font-bold mt-4'>
          Hi, I'm <span className='text-yellow-500'>Olivier Williams</span>
        </h1>

        <h2 className='text-black/50 text-base md:text-lg lg:text-xl mt-4 mb-8'>
          I help businesses grow through strategic planning, market expansion, and revenue optimization. With over a decade of experience, I deliver measurable results.
        </h2>

        <div ref={buttonsRef} className='flex flex-col sm:flex-row gap-4'>
          <button className='py-2 px-6 bg-yellow-500 rounded-sm text-sm md:text-base'>
            View Portfolio
          </button>
          <button className='py-2 px-6 border border-yellow-400 text-yellow-500 rounded-xl text-sm md:text-base'>
            Contact Me
          </button>
        </div>
      </div>
      <div className='w-full lg:w-1/2 relative order-first lg:order-none overflow-hidden'>
        <img ref={yellowBgRef} src="./images/yellow-bg.png" alt="" className='w-full h-auto' />
        <div className='z-20 absolute top-0 w-full flex justify-center max-sm:top-12 max-sm:-left-4 max-md:top-30 '>
          <img 
            ref={heroImgRef}
            src="/images/hero-img.png" 
            alt="Portfolio hero image" 
            className='max-w-[80%] md:max-w-[70%] lg:max-w-full'
          />
        </div>
      </div>
    </section>
  )
}

export default PortfolioHero