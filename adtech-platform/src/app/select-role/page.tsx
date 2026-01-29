"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth'
import { Logo } from '@/components/layout/Logo'
import { ArrowLeft } from 'lucide-react'

export default function SelectRolePage() {
  const router = useRouter()
  const { selectRole, logout, user } = useAuthStore()
  const [loadingRole, setLoadingRole] = useState<'publisher' | 'advertiser' | null>(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleSelectRole = async (role: 'publisher' | 'advertiser') => {
    setLoadingRole(role)
    // Small delay for UX feedback
    await new Promise(resolve => setTimeout(resolve, 300))
    selectRole(role)
    if (role === 'publisher') {
      router.push('/publisher/dashboard')
    } else {
      router.push('/advertiser/campaigns')
    }
  }

  const handleBack = async () => {
    setIsLoggingOut(true)
    await new Promise(resolve => setTimeout(resolve, 300))
    logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="h-12 bg-[#1a1a2e]" />

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {user?.name || 'User'}!
            </h1>
            <p className="text-gray-500 mt-2">Select your role to continue</p>
          </div>

          <div className="flex gap-8 justify-center items-stretch">
            {/* Publisher Card */}
            <div className="w-72 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center hover:shadow-lg hover:border-purple-200 transition-all duration-300 group">
              {/* Illustration */}
              <div className="w-32 h-32 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <svg viewBox="0 0 120 100" className="w-full h-full">
                  {/* Monitor */}
                  <rect x="15" y="10" width="90" height="60" rx="4" fill="#FDF2F8" stroke="#EC4899" strokeWidth="2" />
                  <rect x="25" y="20" width="30" height="20" fill="#F97316" />
                  <rect x="60" y="20" width="35" height="10" fill="#A855F7" />
                  <rect x="60" y="35" width="35" height="5" fill="#FCD34D" />
                  <rect x="25" y="45" width="70" height="15" fill="#FEE2E2" />
                  {/* Stand */}
                  <rect x="50" y="70" width="20" height="8" fill="#D1D5DB" />
                  <rect x="40" y="78" width="40" height="4" fill="#9CA3AF" />
                  {/* Decorations */}
                  <circle cx="100" cy="15" r="6" fill="#FCD34D" />
                  <circle cx="108" cy="25" r="3" fill="#F97316" opacity="0.6" />
                  {/* Plant */}
                  <ellipse cx="12" cy="85" rx="8" ry="10" fill="#F97316" />
                  <rect x="10" y="85" width="4" height="10" fill="#9CA3AF" />
                </svg>
              </div>

              <p className="text-gray-500 text-sm">Continue as</p>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Publisher</h2>
              <p className="text-xs text-gray-400 text-center h-8 flex items-center">Manage inventory, deals & monetization</p>

              <div className="mt-auto pt-4 w-full">
                <Button
                  variant="default"
                  onClick={() => handleSelectRole('publisher')}
                  loading={loadingRole === 'publisher'}
                  disabled={loadingRole === 'advertiser' || isLoggingOut}
                  className="w-full"
                >
                  Continue
                </Button>
              </div>
            </div>

            {/* Advertiser Card */}
            <div className="w-72 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center hover:shadow-lg hover:border-purple-200 transition-all duration-300 group">
              {/* Illustration */}
              <div className="w-32 h-32 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <svg viewBox="0 0 120 100" className="w-full h-full">
                  {/* Megaphone */}
                  <ellipse cx="75" cy="50" rx="25" ry="30" fill="#FDF2F8" />
                  <ellipse cx="75" cy="50" rx="18" ry="22" fill="#EC4899" />
                  <rect x="30" y="40" width="45" height="20" fill="#F97316" />
                  <rect x="20" y="42" width="15" height="16" rx="2" fill="#A855F7" />
                  {/* Stars */}
                  <polygon points="95,15 97,21 103,21 98,25 100,31 95,27 90,31 92,25 87,21 93,21" fill="#FCD34D" />
                  <polygon points="105,35 106,38 109,38 107,40 108,43 105,41 102,43 103,40 101,38 104,38" fill="#FCD34D" />
                  <polygon points="85,25 86,28 89,28 87,30 88,33 85,31 82,33 83,30 81,28 84,28" fill="#FCD34D" />
                  {/* Ice cream decoration */}
                  <path d="M15 70 L25 95 L35 70 Z" fill="#FEE2E2" />
                  <circle cx="20" cy="65" r="8" fill="#EC4899" />
                  <circle cx="30" cy="65" r="8" fill="#A855F7" />
                  <circle cx="25" cy="58" r="6" fill="#FCD34D" />
                  {/* Leaf */}
                  <ellipse cx="45" cy="85" rx="6" ry="10" fill="#A855F7" opacity="0.5" transform="rotate(-30 45 85)" />
                </svg>
              </div>

              <p className="text-gray-500 text-sm">Continue as</p>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Advertiser</h2>
              <p className="text-xs text-gray-400 text-center h-8 flex items-center">Create campaigns, manage creatives & analytics</p>

              <div className="mt-auto pt-4 w-full">
                <Button
                  variant="default"
                  onClick={() => handleSelectRole('advertiser')}
                  loading={loadingRole === 'advertiser'}
                  disabled={loadingRole === 'publisher' || isLoggingOut}
                  className="w-full"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>

          {/* Back button */}
          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              onClick={handleBack}
              loading={isLoggingOut}
              disabled={loadingRole !== null}
              className="gap-2"
            >
              {!isLoggingOut && <ArrowLeft className="w-4 h-4" />}
              Back to Login
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="h-12 bg-[#1a1a2e]" />
    </div>
  )
}
