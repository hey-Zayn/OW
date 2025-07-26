'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Use theme variables from :root (see @file_context_0)
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
        '>0.2'
      )
      .fromTo(textContentRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 1,
          ease: 'power3.out'
        },
        '>0.3'
      )
      .fromTo(buttonsRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
          stagger: 0.15
        },
        '>0.1'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className='w-full min-h-[80vh] flex flex-col lg:flex-row'>
      <div ref={textContentRef} className='w-full lg:w-1/2 py-10 lg:py-20 px-6 md:px-10 flex flex-col justify-center'>
        <span
          className='text-lg md:text-xl'
          style={{ color: 'var(--primary-color)' }}
        >
          Business Development & Strategy Executive
        </span>

        <h1
          className='text-4xl md:text-5xl lg:text-6xl font-bold mt-4'
          style={{ color: 'var(--text-color)' }}
        >
          Hi, I'm{' '}
          <span style={{ color: 'var(--primary-color)' }}>
            Olivier Williams
          </span>
        </h1>

        <h2
          className='text-base md:text-lg lg:text-xl mt-4 mb-8'
          style={{ color: 'var(--text-color)' }}
        >
          I help businesses grow through strategic planning, market expansion, and revenue optimization. With over a decade of experience, I deliver measurable results.
        </h2>

        <div ref={buttonsRef} className='flex flex-col sm:flex-row gap-4'>
          <button
            className='py-2 px-6 rounded-sm text-sm md:text-base'
            style={{
              background: 'var(--primary-color)',
              color: 'var(--text-color)',
              border: 'none'
            }}
          >
            View Portfolio
          </button>
          <button
            className='py-2 px-6 rounded-xl text-sm md:text-base'
            style={{
              border: '1.5px solid var(--primary-color)',
              color: 'var(--primary-color)',
              background: 'transparent'
            }}
          >
            Contact Me
          </button>
        </div>
      </div>
      <div className='w-full lg:w-1/2 relative order-first lg:order-none overflow-hidden'>
        <img
          ref={yellowBgRef}
          src="./images/yellow-bg.svg"
          alt=""
          className='w-full h-auto '
          style={{ filter: 'brightness(1) saturate(1)', zIndex: 1 }}
        />
        <div className='z-20 absolute top-0 w-full flex justify-center max-sm:top-12 max-sm:-left-4 max-md:top-30 '>
          <img 
            ref={heroImgRef}
            src="/images/hero-img.png" 
            alt="Portfolio hero image" 
            className='max-w-[80%] md:max-w-[70%] lg:max-w-full'
            style={{ zIndex: 2 }}
          />
        </div>
      </div>
    </section>
  )
}

export default PortfolioHero