"use client"

import React from 'react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: { container: 'h-8', text: 'text-sm' },
    md: { container: 'h-12', text: 'text-base' },
    lg: { container: 'h-16', text: 'text-lg' },
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`relative ${sizes[size].container} aspect-square`}>
        {/* Striped pattern */}
        <svg viewBox="0 0 40 40" className="w-full h-full">
          {/* Diagonal stripes */}
          <g stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round">
            <line x1="5" y1="35" x2="15" y2="5" />
            <line x1="12" y1="35" x2="22" y2="5" />
            <line x1="19" y1="35" x2="29" y2="5" />
          </g>
        </svg>
        {/* Gradient circle */}
        <div
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #F97316 0%, #EC4899 50%, #A855F7 100%)',
          }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className={`font-bold text-gray-900 ${sizes[size].text}`}>srmg</span>
        <span className={`text-gray-600 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>Media</span>
        <span className={`text-gray-600 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>Solutions</span>
      </div>
    </div>
  )
}
