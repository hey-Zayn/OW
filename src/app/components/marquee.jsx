"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

// Use THEME from @file_context_0
const THEME = {
  bg: 'var(--bg-color)',
  primary: 'var(--primary-color)',
  text: 'var(--text-color)',
}

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
      duration: 30,
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

  // Marquee content using THEME colors
  const marqueeItems = []
  for (let i = 0; i < 10; i++) {
    marqueeItems.push(
      <div key={i} className="inline-flex items-center gap-4">
        <span
          className="text-4xl md:text-6xl font-bold tracking-tight mr-4 transition-colors"
          style={{
            color: THEME.primary,
            cursor: "pointer"
          }}
          onMouseOver={e => e.currentTarget.style.color = "#eab308"} // fallback hover
          onMouseOut={e => e.currentTarget.style.color = THEME.primary}
        >
          BOOK A DEMO
        </span>
        <span
          className="text-4xl md:text-6xl"
          style={{
            color: "rgba(253,196,53,0.7)"
          }}
        >•</span>
        <span
          className="text-4xl md:text-6xl font-bold tracking-tight transition-colors"
          style={{
            color: THEME.primary,
            cursor: "pointer"
          }}
          onMouseOver={e => e.currentTarget.style.color = "#eab308"}
          onMouseOut={e => e.currentTarget.style.color = THEME.primary}
        >
          LET&apos;S CONNECT
        </span>
        <span
          className="text-4xl md:text-6xl"
          style={{
            color: "rgba(253,196,53,0.7)"
          }}
        >•</span>
      </div>
    )
  }

  return (
    <div
      className="w-full overflow-hidden py-6 border-y-2 shadow-lg"
      style={{
        background: "#fff",
        borderColor: "rgba(253,196,53,0.15)",
      }}
    >
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