'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MyExpertise = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const cardsRef = useRef([])
  
  // Store card refs properly
  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  useEffect(() => {
    if (!sectionRef.current) return

    // Set initial state
    gsap.set(
      [titleRef.current, subtitleRef.current, ...cardsRef.current],
      {
        opacity: 0,
        y: 40
      }
    )

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
        markers: false
      }
    })

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to(cardsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: "back.out(1.2)"
    }, "-=0.3")

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={sectionRef} className='w-full min-h-screen px-8 sm:px-16 lg:px-24 py-12 md:py-24 bg-white'>
      <div className='max-w-7xl mx-auto space-y-12'>
        <div className='text-center space-y-4'>
          <h2 ref={titleRef} className='text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717]'>
            My <span className='text-[#FDC435]'>Expertise</span>
          </h2>
          <p ref={subtitleRef} className='text-lg text-[#525252] max-w-3xl mx-auto'>
            Here are the key areas where I excel and can deliver exceptional value to your business
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Expertise Card 1 */}
          <div ref={addToCardsRef} className='bg-[#F9FAFF] p-8 rounded-xl space-y-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
            <div className='w-16 h-16 bg-[#FDC435] rounded-lg flex items-center justify-center'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
              </svg>
            </div>
            <h3 className='text-2xl font-bold text-[#171717]'>Digital Analytics</h3>
            <p className='text-[#525252] leading-relaxed'>
              Expert in Google Analytics, Domo, and Tableau for data-driven decision making and performance tracking.
            </p>
          </div>

          {/* Expertise Card 2 */}
          <div ref={addToCardsRef} className='bg-[#F9FAFF] p-8 rounded-xl space-y-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
            <div className='w-16 h-16 bg-[#FDC435] rounded-lg flex items-center justify-center'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' />
              </svg>
            </div>
            <h3 className='text-2xl font-bold text-[#171717]'>Marketing Automation</h3>
            <p className='text-[#525252] leading-relaxed'>
              Proficient in Mailchimp, Constant Contact, and email automation platforms for effective campaign management.
            </p>
          </div>

          {/* Expertise Card 3 */}
          <div ref={addToCardsRef} className='bg-[#F9FAFF] p-8 rounded-xl space-y-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
            <div className='w-16 h-16 bg-[#FDC435] rounded-lg flex items-center justify-center'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <h3 className='text-2xl font-bold text-[#171717]'>CRM Platforms</h3>
            <p className='text-[#525252] leading-relaxed'>
              Skilled in Salesforce and HubSpot CRM for customer relationship management and sales pipeline optimization.
            </p>
          </div>

          {/* Expertise Card 4 */}
          <div ref={addToCardsRef} className='bg-[#F9FAFF] p-8 rounded-xl space-y-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
            <div className='w-16 h-16 bg-[#FDC435] rounded-lg flex items-center justify-center'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' />
              </svg>
            </div>
            <h3 className='text-2xl font-bold text-[#171717]'>SEO/SEM Tools</h3>
            <p className='text-[#525252] leading-relaxed'>
              Experienced with Yoast SEO, Moz, and SEMrush for search engine optimization and marketing strategies.
            </p>
          </div>

          {/* Expertise Card 5 */}
          <div ref={addToCardsRef} className='bg-[#F9FAFF] p-8 rounded-xl space-y-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
            <div className='w-16 h-16 bg-[#FDC435] rounded-lg flex items-center justify-center'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
              </svg>
            </div>
            <h3 className='text-2xl font-bold text-[#171717]'>Web Development</h3>
            <p className='text-[#525252] leading-relaxed'>
              Proficient in modern web technologies including React, Next.js, and responsive design principles.
            </p>
          </div>

          {/* Expertise Card 6 */}
          <div ref={addToCardsRef} className='bg-[#F9FAFF] p-8 rounded-xl space-y-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
            <div className='w-16 h-16 bg-[#FDC435] rounded-lg flex items-center justify-center'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' />
              </svg>
            </div>
            <h3 className='text-2xl font-bold text-[#171717]'>Social Media</h3>
            <p className='text-[#525252] leading-relaxed'>
              Expertise in social media strategy, content creation, and analytics across major platforms.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyExpertise