import {
  User,
  Publisher,
  Advertiser,
  Inventory,
  Deal,
  Campaign,
  Creative,
  PublisherDashboardData,
  DSPConfig,
} from '@/types'

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'john.doe@publisher.com',
    name: 'John Doe',
    avatar: '/avatars/john.png',
    role: 'publisher',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'user-2',
    email: 'jane.smith@advertiser.com',
    name: 'Jane Smith',
    avatar: '/avatars/jane.png',
    role: 'advertiser',
    createdAt: '2024-02-20T14:30:00Z',
  },
  {
    id: 'user-3',
    email: 'admin@srmg.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
]

// Mock Publishers
export const mockPublishers: Publisher[] = [
  {
    id: 'pub-1',
    userId: 'user-1',
    companyName: 'Digital Media Group',
    websites: [
      { id: 'web-1', publisherId: 'pub-1', domain: 'healthline.com', status: 'active', createdAt: '2024-01-20T10:00:00Z' },
      { id: 'web-2', publisherId: 'pub-1', domain: 'myblog.com', status: 'active', createdAt: '2024-02-15T10:00:00Z' },
    ],
    createdAt: '2024-01-15T10:00:00Z',
  },
]

// Mock Advertisers
export const mockAdvertisers: Advertiser[] = [
  {
    id: 'adv-1',
    userId: 'user-2',
    companyName: 'Globex Corporation',
    industry: 'Technology',
    createdAt: '2024-02-20T14:30:00Z',
  },
  {
    id: 'adv-2',
    userId: 'user-2',
    companyName: 'Big Corporation',
    industry: 'Finance',
    createdAt: '2024-03-01T09:00:00Z',
  },
  {
    id: 'adv-3',
    userId: 'user-2',
    companyName: 'Top Company',
    industry: 'Retail',
    createdAt: '2024-03-10T11:00:00Z',
  },
  {
    id: 'adv-4',
    userId: 'user-2',
    companyName: 'Cherry Pie Inc',
    industry: 'Food & Beverage',
    createdAt: '2024-03-15T14:00:00Z',
  },
  {
    id: 'adv-5',
    userId: 'user-2',
    companyName: 'Tea Corporation',
    industry: 'Food & Beverage',
    createdAt: '2024-03-20T10:00:00Z',
  },
  {
    id: 'adv-6',
    userId: 'user-2',
    companyName: 'Hello Team',
    industry: 'Media',
    createdAt: '2024-03-25T16:00:00Z',
  },
]

// Mock Inventory
export const mockInventory: Inventory[] = [
  {
    id: 'inv-1',
    publisherId: 'pub-1',
    websiteId: 'web-1',
    domainName: 'healthline.com',
    adSlotNameId: '78-HY-89084',
    dimensions: { width: 720, height: 90 },
    tagType: 'GPT',
    adUnitPath: '/21234567/healthline/header',
    pageCategory: 'Health & Wellness',
    status: 'active',
    createdAt: '2024-02-01T10:00:00Z',
  },
  {
    id: 'inv-2',
    publisherId: 'pub-1',
    websiteId: 'web-2',
    domainName: 'myblog.com',
    adSlotNameId: '78-MB-12345',
    dimensions: { width: 300, height: 250 },
    tagType: 'GPT',
    adUnitPath: '/21234567/myblog/sidebar',
    pageCategory: 'Lifestyle',
    status: 'active',
    createdAt: '2024-02-15T14:00:00Z',
  },
  {
    id: 'inv-3',
    publisherId: 'pub-1',
    websiteId: 'web-1',
    domainName: 'healthline.com',
    adSlotNameId: '78-HY-89085',
    dimensions: { width: 300, height: 600 },
    tagType: 'Prebid',
    adUnitPath: '/21234567/healthline/skyscraper',
    pageCategory: 'Health & Wellness',
    status: 'active',
    createdAt: '2024-02-20T09:00:00Z',
  },
]

// Mock Deals
export const mockDeals: Deal[] = [
  {
    id: 'deal-1',
    publisherId: 'pub-1',
    dealName: 'Wellness Articles',
    inventoryId: 'inv-1',
    advertiserId: 'adv-1',
    advertiserName: 'Globex Corporation',
    startDate: '2025-06-21',
    endDate: '2025-07-21',
    dealType: 'Direct',
    priceOption: 'Price Floor',
    priceValue: 5.50,
    status: 'active',
    createdAt: '2024-06-01T10:00:00Z',
  },
  {
    id: 'deal-2',
    publisherId: 'pub-1',
    dealName: 'Premium Sidebar',
    inventoryId: 'inv-2',
    advertiserId: 'adv-2',
    advertiserName: 'Big Corporation',
    startDate: '2025-07-01',
    endDate: '2025-08-01',
    dealType: 'PMP',
    priceOption: 'Fixed Price',
    priceValue: 8.00,
    status: 'pending',
    createdAt: '2024-06-15T14:00:00Z',
  },
]

// Mock Campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    advertiserId: 'adv-1',
    name: 'Summer Tech Promo',
    status: 'active',
    flightDates: {
      startDate: '2025-06-01',
      endDate: '2025-08-31',
      runOnSchedule: false,
    },
    budget: {
      total: 50000,
      daily: 1500,
      cpmPrice: 4.50,
      frequencyCap: 3,
      pacing: 'Evenly',
    },
    inventory: {
      premiumSRMG: true,
      openMarket: false,
    },
    targeting: {
      geo: ['United States', 'Canada'],
      devices: ['Desktop', 'Mobile'],
      os: ['iOS', 'Android'],
      browsers: ['Chrome', 'Safari'],
      adSlots: ['inv-1', 'inv-2'],
      contextualCategories: ['Technology', 'Business'],
      audiences: ['Tech Enthusiasts', 'Business Professionals'],
    },
    creativeIds: ['cre-1', 'cre-2'],
    metrics: {
      impressions: 1250000,
      clicks: 15000,
      ctr: 1.2,
      spend: 28500,
      conversions: 450,
      cvr: 3.0,
    },
    createdAt: '2025-05-15T10:00:00Z',
  },
  {
    id: 'camp-2',
    advertiserId: 'adv-1',
    name: 'Brand Awareness Q3',
    status: 'draft',
    flightDates: {
      startDate: '2025-07-01',
      endDate: '2025-09-30',
      runOnSchedule: true,
    },
    budget: {
      total: 75000,
      daily: 2500,
      cpmPrice: 6.00,
      frequencyCap: 5,
      pacing: 'Standard',
    },
    inventory: {
      premiumSRMG: true,
      openMarket: true,
    },
    targeting: {
      geo: ['United States'],
      devices: ['Desktop', 'Mobile', 'Tablet'],
      os: ['iOS'],
      browsers: ['Chrome', 'Safari', 'Firefox'],
      adSlots: [],
      contextualCategories: ['Health & Wellness'],
      audiences: ['Health Conscious'],
    },
    creativeIds: ['cre-3'],
    metrics: {
      impressions: 0,
      clicks: 0,
      ctr: 0,
      spend: 0,
      conversions: 0,
      cvr: 0,
    },
    createdAt: '2025-06-20T14:00:00Z',
  },
]

// Mock Creatives
export const mockCreatives: Creative[] = [
  {
    id: 'cre-1',
    advertiserId: 'adv-1',
    name: 'Native Ad',
    type: 'Native',
    fileName: 'image.jpg',
    fileSize: 102400,
    dimensions: { width: 1200, height: 628 },
    landingPageUrl: 'https://website.com',
    status: 'submitted',
    createdAt: '2025-05-10T10:00:00Z',
  },
  {
    id: 'cre-2',
    advertiserId: 'adv-1',
    name: 'Banner 300x250',
    type: 'Display',
    fileName: 'banner-300x250.png',
    fileSize: 85000,
    dimensions: { width: 300, height: 250 },
    landingPageUrl: 'https://website.com/promo',
    status: 'approved',
    createdAt: '2025-05-12T11:00:00Z',
  },
  {
    id: 'cre-3',
    advertiserId: 'adv-1',
    name: 'Video Ad 15s',
    type: 'Video',
    fileName: 'promo-video.mp4',
    fileSize: 5242880,
    landingPageUrl: 'https://website.com/video',
    status: 'approved',
    createdAt: '2025-05-15T09:00:00Z',
  },
]

// Mock Publisher Dashboard Data
export const mockPublisherDashboard: PublisherDashboardData = {
  eCPM: 2.45,
  impressions: 1530000,
  fillRate: 85.6,
  revenue: 37485,
  topCampaigns: [
    { name: 'Big Corporation', revenue: 8500 },
    { name: 'Company', revenue: 7200 },
    { name: 'Top Company', revenue: 6800 },
    { name: 'Cherry Pie', revenue: 5400 },
    { name: 'Tea Corporation', revenue: 5100 },
    { name: 'Hello Team', revenue: 4485 },
  ],
  inventoryBreakdown: [
    { source: 'Direct Publisher', value: 35, color: '#A78BFA' },
    { source: 'Websites', value: 25, color: '#F97316' },
    { source: 'Open Auction', value: 15, color: '#10B981' },
    { source: 'Apps', value: 15, color: '#EC4899' },
    { source: 'Deals', value: 10, color: '#3B82F6' },
  ],
}

// Mock DSP Configurations
export const mockDSPConfigs: DSPConfig[] = [
  { id: 'dsp-1', name: 'Xandr', enabled: false },
  { id: 'dsp-2', name: 'OpenX', enabled: true },
  { id: 'dsp-3', name: 'Index Exchange', enabled: false },
  { id: 'dsp-4', name: 'GAM', enabled: false },
]

// Page Categories
export const pageCategories = [
  'Health & Wellness',
  'Technology',
  'Business',
  'Entertainment',
  'Sports',
  'News',
  'Lifestyle',
  'Travel',
  'Food & Dining',
  'Fashion',
  'Automotive',
  'Finance',
  'Education',
  'Real Estate',
]

// Contextual Categories
export const contextualCategories = [
  'Technology',
  'Business',
  'Health & Wellness',
  'Entertainment',
  'Sports',
  'News',
  'Lifestyle',
  'Travel',
  'Food & Dining',
  'Fashion',
  'Automotive',
  'Finance',
]

// Audience Segments
export const audienceSegments = [
  'Tech Enthusiasts',
  'Business Professionals',
  'Health Conscious',
  'Sports Fans',
  'Frequent Travelers',
  'Luxury Shoppers',
  'Parents',
  'Students',
  'Gamers',
  'Investors',
]

// Browser Options
export const browserOptions = [
  'Chrome',
  'Safari',
  'Firefox',
  'Edge',
  'Opera',
]
