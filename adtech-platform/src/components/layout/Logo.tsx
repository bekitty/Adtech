"use client"

import React from 'react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: 'text-sm', subtext: 'text-xs' },
    md: { icon: 40, text: 'text-base', subtext: 'text-sm' },
    lg: { icon: 56, text: 'text-xl', subtext: 'text-base' },
  }

  const iconSize = sizes[size].icon

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon - Circle with stripes and gradient overlay */}
      <div className="relative" style={{ width: iconSize, height: iconSize }}>
        <svg viewBox="0 0 48 48" className="w-full h-full">
          {/* Base circle with stripes (clipped) */}
          <defs>
            <clipPath id="circleClip">
              <circle cx="24" cy="24" r="22" />
            </clipPath>
            <linearGradient id="logoGradient" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
          </defs>

          {/* Circle background */}
          <circle cx="24" cy="24" r="22" fill="#f5f5f5" />

          {/* Diagonal stripes - clipped to circle */}
          <g clipPath="url(#circleClip)">
            <g stroke="#1a1a2e" strokeWidth="3.5" strokeLinecap="round">
              <line x1="6" y1="48" x2="18" y2="0" />
              <line x1="14" y1="48" x2="26" y2="0" />
              <line x1="22" y1="48" x2="34" y2="0" />
              <line x1="30" y1="48" x2="42" y2="0" />
            </g>
          </g>

          {/* Gradient circle overlay on top-right */}
          <circle cx="36" cy="12" r="10" fill="url(#logoGradient)" />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className={`font-bold text-gray-900 ${sizes[size].text}`}>srmg</span>
        <span className={`text-gray-600 ${sizes[size].subtext}`}>Media</span>
        <span className={`text-gray-600 ${sizes[size].subtext}`}>Solutions</span>
      </div>
    </div>
  )
}
