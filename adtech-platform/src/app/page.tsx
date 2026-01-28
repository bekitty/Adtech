"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, selectedRole } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    } else if (!selectedRole) {
      router.push('/select-role')
    } else if (selectedRole === 'publisher') {
      router.push('/publisher/dashboard')
    } else {
      router.push('/advertiser/campaigns')
    }
  }, [isAuthenticated, selectedRole, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  )
}
