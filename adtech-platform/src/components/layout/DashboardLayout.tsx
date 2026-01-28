"use client"

import React from 'react'
import { Sidebar } from './Sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-[200px] min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
