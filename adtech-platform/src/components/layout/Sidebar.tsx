"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  User
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
  const { user, logout, selectedRole } = useAuthStore()

  const isPublisher = pathname?.startsWith('/publisher') || selectedRole === 'publisher'
  const navItems = isPublisher ? publisherNavItems : advertiserNavItems

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
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gray-100 text-gray-900"
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
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white">
            <User className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium text-gray-900">
            {user?.name || 'John Doe'}
          </span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 w-full text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </aside>
  )
}
