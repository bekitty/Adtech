// Simple in-memory database service
// This can be upgraded to Prisma/PostgreSQL later
// For now, it provides API-like behavior while keeping mock data accessible

import {
  mockUsers,
  mockAdvertisers,
  mockInventory,
  mockDeals,
  mockCampaigns,
  mockCreatives,
  mockAnalyticsData,
  mockBillingData,
  audienceSegments,
  mockPublisherDashboard,
} from '@/data/mock'
import type {
  User,
  Advertiser,
  Inventory,
  Deal,
  Campaign,
  Creative,
} from '@/types'

// Derived types from mock data
type AnalyticsData = typeof mockAnalyticsData
type BillingData = typeof mockBillingData
type AudienceSegment = (typeof audienceSegments)[number]
type Invoice = BillingData['invoices'][number]

// Deep clone helper to avoid mutation
const clone = <T>(data: T): T => JSON.parse(JSON.stringify(data))

// In-memory data store (starts with mock data)
class Database {
  private users: User[] = clone(mockUsers)
  private advertisers: Advertiser[] = clone(mockAdvertisers)
  private inventory: Inventory[] = clone(mockInventory)
  private deals: Deal[] = clone(mockDeals)
  private campaigns: Campaign[] = clone(mockCampaigns)
  private creatives: Creative[] = clone(mockCreatives)
  private analyticsData: AnalyticsData = clone(mockAnalyticsData)
  private billingData: BillingData = clone(mockBillingData)
  private segments: AudienceSegment[] = clone(audienceSegments)

  // Users
  getUsers(): User[] {
    return clone(this.users)
  }

  getUserById(id: string): User | undefined {
    return clone(this.users.find(u => u.id === id))
  }

  getUserByEmail(email: string): User | undefined {
    return clone(this.users.find(u => u.email === email))
  }

  createUser(user: Omit<User, 'id' | 'createdAt'> & { avatar?: string }): User {
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    this.users.push(newUser)
    return clone(newUser)
  }

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const index = this.users.findIndex(u => u.id === id)
    if (index === -1) return undefined
    this.users[index] = { ...this.users[index], ...updates }
    return clone(this.users[index])
  }

  // Advertisers
  getAdvertisers(): Advertiser[] {
    return clone(this.advertisers)
  }

  getAdvertiserById(id: string): Advertiser | undefined {
    return clone(this.advertisers.find(a => a.id === id))
  }

  createAdvertiser(advertiser: Omit<Advertiser, 'id'>): Advertiser {
    const newAdvertiser: Advertiser = {
      ...advertiser,
      id: `adv-${Date.now()}`,
    }
    this.advertisers.push(newAdvertiser)
    return clone(newAdvertiser)
  }

  updateAdvertiser(id: string, updates: Partial<Advertiser>): Advertiser | undefined {
    const index = this.advertisers.findIndex(a => a.id === id)
    if (index === -1) return undefined
    this.advertisers[index] = { ...this.advertisers[index], ...updates }
    return clone(this.advertisers[index])
  }

  // Inventory
  getInventory(): Inventory[] {
    return clone(this.inventory)
  }

  getInventoryById(id: string): Inventory | undefined {
    return clone(this.inventory.find(i => i.id === id))
  }

  createInventory(inventory: Omit<Inventory, 'id' | 'createdAt'>): Inventory {
    const newInventory: Inventory = {
      ...inventory,
      id: `inv-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    this.inventory.push(newInventory)
    return clone(newInventory)
  }

  updateInventory(id: string, updates: Partial<Inventory>): Inventory | undefined {
    const index = this.inventory.findIndex(i => i.id === id)
    if (index === -1) return undefined
    this.inventory[index] = { ...this.inventory[index], ...updates }
    return clone(this.inventory[index])
  }

  deleteInventory(id: string): boolean {
    const index = this.inventory.findIndex(i => i.id === id)
    if (index === -1) return false
    this.inventory.splice(index, 1)
    return true
  }

  // Deals
  getDeals(): Deal[] {
    return clone(this.deals)
  }

  getDealById(id: string): Deal | undefined {
    return clone(this.deals.find(d => d.id === id))
  }

  createDeal(deal: Omit<Deal, 'id' | 'createdAt'>): Deal {
    const newDeal: Deal = {
      ...deal,
      id: `deal-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    this.deals.push(newDeal)
    return clone(newDeal)
  }

  updateDeal(id: string, updates: Partial<Deal>): Deal | undefined {
    const index = this.deals.findIndex(d => d.id === id)
    if (index === -1) return undefined
    this.deals[index] = { ...this.deals[index], ...updates }
    return clone(this.deals[index])
  }

  deleteDeal(id: string): boolean {
    const index = this.deals.findIndex(d => d.id === id)
    if (index === -1) return false
    this.deals.splice(index, 1)
    return true
  }

  // Campaigns
  getCampaigns(): Campaign[] {
    return clone(this.campaigns)
  }

  getCampaignById(id: string): Campaign | undefined {
    return clone(this.campaigns.find(c => c.id === id))
  }

  getCampaignsByAdvertiser(advertiserId: string): Campaign[] {
    return clone(this.campaigns.filter(c => c.advertiserId === advertiserId))
  }

  createCampaign(campaign: Omit<Campaign, 'id' | 'createdAt' | 'metrics'>): Campaign {
    const newCampaign: Campaign = {
      ...campaign,
      id: `camp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      metrics: {
        impressions: 0,
        clicks: 0,
        ctr: 0,
        spend: 0,
        conversions: 0,
        cvr: 0,
      },
    }
    this.campaigns.push(newCampaign)
    return clone(newCampaign)
  }

  updateCampaign(id: string, updates: Partial<Campaign>): Campaign | undefined {
    const index = this.campaigns.findIndex(c => c.id === id)
    if (index === -1) return undefined
    this.campaigns[index] = { ...this.campaigns[index], ...updates }
    return clone(this.campaigns[index])
  }

  deleteCampaign(id: string): boolean {
    const index = this.campaigns.findIndex(c => c.id === id)
    if (index === -1) return false
    this.campaigns.splice(index, 1)
    return true
  }

  // Creatives
  getCreatives(): Creative[] {
    return clone(this.creatives)
  }

  getCreativeById(id: string): Creative | undefined {
    return clone(this.creatives.find(c => c.id === id))
  }

  getCreativesByAdvertiser(advertiserId: string): Creative[] {
    return clone(this.creatives.filter(c => c.advertiserId === advertiserId))
  }

  createCreative(creative: Omit<Creative, 'id' | 'createdAt'>): Creative {
    const newCreative: Creative = {
      ...creative,
      id: `creative-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    this.creatives.push(newCreative)
    return clone(newCreative)
  }

  updateCreative(id: string, updates: Partial<Creative>): Creative | undefined {
    const index = this.creatives.findIndex(c => c.id === id)
    if (index === -1) return undefined
    this.creatives[index] = { ...this.creatives[index], ...updates }
    return clone(this.creatives[index])
  }

  deleteCreative(id: string): boolean {
    const index = this.creatives.findIndex(c => c.id === id)
    if (index === -1) return false
    this.creatives.splice(index, 1)
    return true
  }

  // Analytics
  getAnalytics() {
    // Transform to expected format for API
    return {
      revenueByDay: this.analyticsData.dailyMetrics.map(d => ({
        date: d.date,
        revenue: d.spend,
      })),
      performanceByDay: this.analyticsData.dailyMetrics,
      deviceBreakdown: this.analyticsData.deviceBreakdown,
      geoBreakdown: this.analyticsData.geoPerformance,
    }
  }

  // Publisher Dashboard
  getPublisherDashboard() {
    return clone(mockPublisherDashboard)
  }

  // Billing
  getBillingInfo() {
    // Return as array for consistency
    return [
      {
        advertiserId: 'adv-1',
        balance: this.billingData.currentBalance,
        creditLimit: this.billingData.creditLimit,
        paymentMethods: this.billingData.paymentMethods,
      },
    ]
  }

  getBillingByAdvertiser(advertiserId: string) {
    return {
      advertiserId,
      balance: this.billingData.currentBalance,
      creditLimit: this.billingData.creditLimit,
      paymentMethods: this.billingData.paymentMethods,
    }
  }

  updateBillingInfo(advertiserId: string, updates: { balance?: number }) {
    if (updates.balance !== undefined) {
      this.billingData.currentBalance = updates.balance
    }
    return this.getBillingByAdvertiser(advertiserId)
  }

  // Invoices (Transactions)
  getTransactions(): Invoice[] {
    return clone(this.billingData.invoices)
  }

  getTransactionsByAdvertiser(_advertiserId: string): Invoice[] {
    // In this mock, all invoices belong to the same advertiser
    return clone(this.billingData.invoices)
  }

  createTransaction(transaction: { amount: number; campaign: string; status?: string }): Invoice {
    const newInvoice = {
      id: `inv-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      amount: transaction.amount,
      status: transaction.status || 'pending',
      campaign: transaction.campaign,
    }
    this.billingData.invoices.push(newInvoice)
    return clone(newInvoice)
  }

  // Audience Segments (simple string array)
  getAudienceSegments(): string[] {
    return clone(this.segments)
  }

  getAudienceSegmentByName(name: string): string | undefined {
    return this.segments.find(s => s === name)
  }

  addAudienceSegment(segmentName: string): string {
    if (!this.segments.includes(segmentName)) {
      this.segments.push(segmentName)
    }
    return segmentName
  }

  // Reset to initial mock data
  reset(): void {
    this.users = clone(mockUsers)
    this.advertisers = clone(mockAdvertisers)
    this.inventory = clone(mockInventory)
    this.deals = clone(mockDeals)
    this.campaigns = clone(mockCampaigns)
    this.creatives = clone(mockCreatives)
    this.analyticsData = clone(mockAnalyticsData)
    this.billingData = clone(mockBillingData)
    this.segments = clone(audienceSegments)
  }
}

// Singleton instance
export const db = new Database()
