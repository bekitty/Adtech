import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { extractToken, verifyToken } from '@/lib/auth'

// GET - Get publisher dashboard data
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = extractToken(authHeader)

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const inventory = db.getInventory()
    const deals = db.getDeals()
    const analytics = db.getAnalytics()
    const dashboardData = db.getPublisherDashboard()

    // Use pre-computed dashboard stats from mock data
    const activeInventory = inventory.filter(i => i.status === 'active').length
    const activeDeals = deals.filter(d => d.status === 'active').length
    const pendingDeals = deals.filter(d => d.status === 'pending').length

    // Revenue by day (last 7 days)
    const revenueByDay = analytics.revenueByDay.slice(-7)

    // Recent deals
    const recentDeals = [...deals]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
      .map(d => ({
        id: d.id,
        name: d.dealName,
        advertiser: d.advertiserName,
        type: d.dealType,
        price: d.priceValue,
        status: d.status,
      }))

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          eCPM: dashboardData.eCPM,
          impressions: dashboardData.impressions,
          fillRate: dashboardData.fillRate,
          revenue: dashboardData.revenue,
          activeInventory,
          totalInventory: inventory.length,
          activeDeals,
          pendingDeals,
          totalDeals: deals.length,
        },
        revenueByDay,
        topCampaigns: dashboardData.topCampaigns,
        inventoryBreakdown: dashboardData.inventoryBreakdown,
        recentDeals,
      },
    })
  } catch (error) {
    console.error('Get dashboard error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
