"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

const Marquee = () => {
  const containerRef = useRef(null)
  const marqueeRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const marquee = marqueeRef.current

    if (!container || !marquee) return

    // Clone the marquee content to create a seamless loop
    const clone = marquee.cloneNode(true)
    container.appendChild(clone)

    // Get the width of the original marquee content
    const width = marquee.offsetWidth

    // Create the animation
    const animation = gsap.to(container, {
      x: -width,
      ease: "none",
      duration: 30, // Faster animation
      repeat: -1,
      onRepeat: () => {
        gsap.set(container, { x: 0 })
      },
    })

    // Pause animation when not visible
    const handleVisibility = () => {
      if (document.hidden) {
        animation.pause()
      } else {
        animation.play()
      }
    }

    document.addEventListener("visibilitychange", handleVisibility)

    // Interactive hover effects
    const handleMouseEnter = () => {
      gsap.to(animation, { timeScale: 0.3, duration: 0.3 })
    }

    const handleMouseLeave = () => {
      gsap.to(animation, { timeScale: 1, duration: 0.3 })
    }

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      animation.kill()
      document.removeEventListener("visibilitychange", handleVisibility)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Marquee content with yellow theme
  const marqueeItems = []
  for (let i = 0; i < 10; i++) {
    marqueeItems.push(
      <div key={i} className="inline-flex items-center gap-4">
        <span className="text-yellow-500 text-4xl md:text-6xl font-bold tracking-tight mr-4 hover:text-yellow-600 transition-colors">
          BOOK A DEMO
        </span>
        <span className="text-yellow-300 text-4xl md:text-6xl">•</span>
        <span className="text-yellow-500 text-4xl md:text-6xl font-bold tracking-tight hover:text-yellow-600 transition-colors">
          LET'S CONNECT
        </span>
        <span className="text-yellow-300 text-4xl md:text-6xl">•</span>
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden bg-white py-6 border-y-2 border-yellow-100 shadow-lg">
      <div className="relative">
        <div ref={containerRef} className="inline-block whitespace-nowrap">
          <div ref={marqueeRef} className="inline-block">
            {marqueeItems}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Marquee