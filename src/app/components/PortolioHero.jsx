'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const PortfolioHero = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonsRef = useRef(null)
  const imageRef = useRef(null)
  const taglineRef = useRef(null)

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !buttonsRef.current || !imageRef.current || !taglineRef.current) {
      return
    }

    // Set initial hidden state
    gsap.set(
      [taglineRef.current, titleRef.current, subtitleRef.current, ...Array.from(buttonsRef.current.children), imageRef.current], 
      {
        opacity: 0
      }
    )

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
        markers: false
      }
    })

    // Animate elements in sequence with opacity transitions
    tl.to(taglineRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out"
    })
    .to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out"
    }, "-=0.8")
    .to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6")
    .to(Array.from(buttonsRef.current.children), {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.4)"
    }, "-=0.4")
    .to(imageRef.current, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.8")

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={heroRef} className='w-full min-h-[80vh] px-6 sm:px-12 lg:px-20 py-16 bg-white flex items-center'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16'>
        <div className='w-full md:w-1/2 space-y-4 md:space-y-6'>
          <span ref={taglineRef} className='text-[#FDC435] text-base md:text-lg font-medium tracking-wider uppercase'>
            Business Development & Strategy Executive
          </span>
          <h1 ref={titleRef} className='text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717] leading-snug'>
            Hi, I'm <span className='text-[#FDC435]'>Olivier Williams</span>
          </h1>
          <h2 ref={subtitleRef} className='text-base sm:text-lg text-[#525252] leading-relaxed max-w-lg'>
            I help businesses grow through strategic planning, market expansion, and revenue optimization. With over a decade of experience, I deliver measurable results.
          </h2>
          <div ref={buttonsRef} className='flex flex-col sm:flex-row gap-4 pt-4'>
            <Link href="/mywork" className='px-6 py-2.5 bg-[#FDC435] text-[#171717] font-medium rounded-md hover:bg-[#fdc435cc] transition-all duration-300 shadow-md hover:shadow-[#FDC435]/40 text-center'>
              View Portfolio
            </Link>
            <Link href="/contact" className='px-6 py-2.5 border border-[#FDC435] text-[#FDC435] font-medium rounded-md hover:bg-[#FDC435]/10 transition-all duration-300 text-center'>
              Contact Me
            </Link>
          </div>
        </div>
        <div className='w-full md:w-1/2 mt-8 md:mt-0 flex justify-center'>
          <div ref={imageRef}>
            <Image 
              src="/images/hero.png"
              alt="Olivier Williams, Business Development Executive standing confidently in professional attire"
              width={500}
              height={600}
              className='w-full max-w-md h-auto rounded-lg object-cover shadow-lg'
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PortfolioHero