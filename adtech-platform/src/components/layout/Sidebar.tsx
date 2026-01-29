"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Monitor,
  Tags,
  Settings,
  Megaphone,
  Image,
  BarChart3,
  CreditCard,
  LogOut,
  User,
  ArrowLeftRight
} from 'lucide-react'
import { Logo } from './Logo'
import { useAuthStore } from '@/store/auth'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

const publisherNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/publisher/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Inventory', href: '/publisher/inventory', icon: <Monitor className="w-5 h-5" /> },
  { label: 'Deals', href: '/publisher/deals', icon: <Tags className="w-5 h-5" /> },
  { label: 'Settings', href: '/publisher/settings', icon: <Settings className="w-5 h-5" /> },
]

const advertiserNavItems: NavItem[] = [
  { label: 'Campaigns', href: '/advertiser/campaigns', icon: <Megaphone className="w-5 h-5" /> },
  { label: 'Creatives', href: '/advertiser/creatives', icon: <Image className="w-5 h-5" /> },
  { label: 'Analytics', href: '/advertiser/analytics', icon: <BarChart3 className="w-5 h-5" /> },
  { label: 'Billing', href: '/advertiser/billing', icon: <CreditCard className="w-5 h-5" /> },
  { label: 'Settings', href: '/advertiser/settings', icon: <Settings className="w-5 h-5" /> },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, clearRole, selectedRole } = useAuthStore()

  const isPublisher = pathname?.startsWith('/publisher') || selectedRole === 'publisher'
  const navItems = isPublisher ? publisherNavItems : advertiserNavItems

  const handleSwitchRole = () => {
    clearRole()
    router.push('/select-role')
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[200px] bg-white border-r border-gray-100 flex flex-col">
      {/* Logo */}
      <div className="p-4 pt-6">
        <Logo size="md" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-[#F97316]/10 via-[#EC4899]/10 to-[#A855F7]/10 text-[#A855F7] border-l-2 border-[#A855F7]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-100">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-4 p-2 rounded-lg bg-gray-50">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316] via-[#EC4899] to-[#A855F7] flex items-center justify-center text-white shadow-sm">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name || 'John Doe'}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {selectedRole || 'User'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-1">
          {/* Switch Role Button */}
          <button
            onClick={handleSwitchRole}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-sm font-medium text-gray-600 hover:text-[#A855F7] hover:bg-gradient-to-r hover:from-[#F97316]/5 hover:via-[#EC4899]/5 hover:to-[#A855F7]/5 rounded-lg transition-all duration-200"
          >
            <ArrowLeftRight className="w-5 h-5" />
            Switch Role
          </button>

          {/* Log Out Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-sm font-medium text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>
      </div>
    </aside>
  )
}
