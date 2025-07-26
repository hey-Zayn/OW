'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const expertiseCards = [
  {
    title: "Digital Transformation",
    icon: (
      <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m4 4v-4a4 4 0 00-8 0v4m4-8a4 4 0 014 4v4a4 4 0 01-8 0v-4a4 4 0 014-4z' />
      </svg>
    ),
    description: (
      <>
        <span>
          Driving digital growth and operational excellence.
        </span>
      </>
    ),
  },
  {
    title: "Leadership",
    icon: (
      <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75' />
      </svg>
    ),
    description: (
      <>
        <span>
          7+ years leading teams and delivering results.
        </span>
      </>
    ),
  },
  {
    title: "Storytelling & Campaigns",
    icon: (
      <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 10l4.553-2.276A2 2 0 0020 6.382V5a2 2 0 00-2-2H6a2 2 0 00-2 2v1.382a2 2 0 00.447 1.342L9 10m6 0v4m0 0l-4.553 2.276A2 2 0 016 17.618V19a2 2 0 002 2h8a2 2 0 002-2v-1.382a2 2 0 00-.447-1.342L15 14z' />
      </svg>
    ),
    description: (
      <>
        <span>
          Creating campaigns that boost engagement and growth.
        </span>
      </>
    ),
  },
  {
    title: "Process Optimization",
    icon: (
      <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 17v-2a4 4 0 018 0v2m-4-6a4 4 0 100-8 4 4 0 000 8zm-6 8v-2a4 4 0 014-4h4a4 4 0 014 4v2' />
      </svg>
    ),
    description: (
      <>
        <span>
          Improving efficiency with systems and automation.
        </span>
      </>
    ),
  },
  {
    title: "Vendor Management",
    icon: (
      <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75' />
      </svg>
    ),
    description: (
      <>
        <span>
          Managing vendors and contracts for business success.
        </span>
      </>
    ),
  },
  {
    title: "Tools & Tech",
    icon: (
      <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
      </svg>
    ),
    description: (
      <>
        <span>
          Skilled in analytics, CRM, and creative tools.
        </span>
      </>
    ),
  },
]

const MyExpertise = () => {
  const sectionRef = useRef(null)
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
    gsap.set(cardsRef.current, {
      opacity: 0,
      y: 40
    })

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
        markers: false
      }
    })

    tl.to(cardsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: "back.out(1.2)"
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className='w-full min-h-screen px-8 sm:px-16 lg:px-24 py-12 md:py-24'
      style={{ background: 'var(--bg-color)' }}
    >
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {expertiseCards.map((card, idx) => (
            <div
              key={card.title}
              ref={addToCardsRef}
              className='p-8 rounded-xl space-y-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/60'
              style={{
                background: 'rgba(253, 196, 53, 0.08)'
              }}
            >
              <div
                className='w-16 h-16 rounded-lg flex items-center justify-center mx-auto'
                style={{ background: 'var(--primary-color)' }}
              >
                {card.icon}
              </div>
              <h3 className='text-2xl font-bold text-center' style={{ color: 'var(--text-color)' }}>{card.title}</h3>
              <p style={{ color: '#525252' }} className='leading-relaxed text-center'>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyExpertise