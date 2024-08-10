"use client"

import Link from "next/link"
import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"

const Logo: React.FC = () => {
  const circleRef = useRef<HTMLSpanElement>(null)
  const rotationTimeline = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (circleRef.current) {
      rotationTimeline.current = gsap.to(circleRef.current, {
        rotation: 360,
        duration: 2,
        ease: "none",
        repeat: -1,
        paused: true, // Start paused
      })
    }
  }, [])

  const handleMouseEnter = () => {
    if (rotationTimeline.current) {
      rotationTimeline.current.play() // Start the rotation on hover
    }
  }

  const handleMouseLeave = () => {
    if (rotationTimeline.current) {
      rotationTimeline.current.pause() // Stop the rotation when not hovering
    }
  }

  return (
    <div className="flex items-center">
      <Link
        href="/"
        className="flex items-center text-[#A435F0] font-semibold text-xl hover:text-[#A435F0] transition-colors duration-300"
      >
        <div
          className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#A435F0] to-[#6F21B4] shadow-xl mr-2 transform hover:scale-105 transition-transform duration-300 ease-out"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span
            ref={circleRef}
            className="circle text-white text-xl font-extrabold tracking-wide drop-shadow-lg"
          >
            𝐀
          </span>
          <div className="absolute inset-0 rounded-full border-2 border-white opacity-50 blur-sm"></div>
          <div className="absolute inset-0 rounded-full border-2 border-white opacity-20"></div>
        </div>
        <span>𝐚𝐝𝐡𝐲𝐞𝐧</span>
      </Link>
    </div>
  )
}

export default Logo
