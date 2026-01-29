// User & Auth Types
export type UserRole = 'publisher' | 'advertiser' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: UserRole
  createdAt: string
}

// Publisher Types
export interface Publisher {
  id: string
  userId: string
  companyName: string
  websites: Website[]
  createdAt: string
}

export interface Website {
  id: string
  publisherId: string
  domain: string
  status: 'active' | 'pending' | 'inactive'
  createdAt: string
}

export interface Inventory {
  id: string
  publisherId: string
  websiteId: string
  domainName: string
  adSlotNameId: string
  dimensions: { width: number; height: number }
  tagType: 'GPT' | 'Prebid'
  adUnitPath: string
  pageCategory: string
  status: 'active' | 'inactive'
  createdAt: string
}

export interface Deal {
  id: string
  publisherId: string
  dealName: string
  inventoryId: string
  advertiserId: string
  advertiserName: string
  startDate: string
  endDate: string
  dealType: 'Direct' | 'PMP'
  priceOption: 'Fixed Price' | 'Price Floor'
  priceValue: number
  status: 'active' | 'pending' | 'completed' | 'paused'
  createdAt: string
}

// Advertiser Types
export interface Advertiser {
  id: string
  userId: string
  companyName: string
  industry: string
  createdAt: string
}

export interface Campaign {
  id: string
  advertiserId: string
  name: string
  status: 'draft' | 'pending' | 'active' | 'paused' | 'completed'
  flightDates: {
    startDate: string
    endDate: string
    runOnSchedule: boolean
  }
  budget: {
    total: number
    daily: number
    cpmPrice: number
    frequencyCap: number
    pacing: 'Standard' | 'Evenly' | 'Accelerated'
  }
  inventory: {
    premiumSRMG: boolean
    openMarket: boolean
  }
  targeting: {
    geo: string[]
    devices: ('Mobile' | 'Tablet' | 'Desktop')[]
    os: ('iOS' | 'Android')[]
    browsers: string[]
    adSlots: string[]
    contextualCategories: string[]
    audiences: string[]
  }
  creativeIds: string[]
  metrics: CampaignMetrics
  createdAt: string
}

export interface CampaignMetrics {
  impressions: number
  clicks: number
  ctr: number
  spend: number
  conversions: number
  cvr: number
}

export interface Creative {
  id: string
  advertiserId: string
  name: string
  type: 'Display' | 'Video' | 'Native'
  fileName: string
  fileSize: number
  dimensions?: { width: number; height: number }
  landingPageUrl: string
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  createdAt: string
}

// Analytics Types
export interface PublisherDashboardData {
  eCPM: number
  impressions: number
  fillRate: number
  revenue: number
  topCampaigns: {
    name: string
    revenue: number
  }[]
  inventoryBreakdown: {
    source: string
    value: number
    color: string
  }[]
}

export interface AdvertiserAnalytics {
  totalSpend: number
  totalImpressions: number
  totalClicks: number
  averageCTR: number
  conversions: number
  campaigns: CampaignMetrics[]
}

// Settings Types
export interface DSPConfig {
  id: string
  name: string
  enabled: boolean
}

export interface PublisherSettings {
  userId: string
  availableDSPs: DSPConfig[]
  notificationPreferences: {
    email: boolean
    slack: boolean
  }
}

export interface AdvertiserSettings {
  userId: string
  availableDSPs: DSPConfig[]
  defaultBudget: number
  defaultCPM: number
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
