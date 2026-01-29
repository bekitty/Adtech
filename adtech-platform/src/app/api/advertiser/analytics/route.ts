import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { extractToken, verifyToken } from '@/lib/auth'

// GET - Get analytics data
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

    const analytics = db.getAnalytics()
    const campaigns = db.getCampaigns()
    const creatives = db.getCreatives()

    // Support filtering by date range
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const advertiserId = searchParams.get('advertiserId')

    // Filter campaigns by advertiser if specified
    let filteredCampaigns = campaigns
    if (advertiserId) {
      filteredCampaigns = campaigns.filter(c => c.advertiserId === advertiserId)
    }

    // Use analytics data for aggregate metrics
    const performanceByDay = analytics.performanceByDay
    const totalImpressions = performanceByDay.reduce((sum, d) => sum + d.impressions, 0)
    const totalClicks = performanceByDay.reduce((sum, d) => sum + d.clicks, 0)
    const totalConversions = performanceByDay.reduce((sum, d) => sum + d.conversions, 0)
    const totalSpent = performanceByDay.reduce((sum, d) => sum + d.spend, 0)
    const avgCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0
    const avgCPC = totalClicks > 0 ? totalSpent / totalClicks : 0
    const avgCPM = totalImpressions > 0 ? (totalSpent / totalImpressions) * 1000 : 0

    // Filter performance by day (filter by date range if specified)
    let filteredPerformance = performanceByDay
    if (startDate || endDate) {
      filteredPerformance = performanceByDay.filter(day => {
        const dayDate = new Date(day.date)
        if (startDate && dayDate < new Date(startDate)) return false
        if (endDate && dayDate > new Date(endDate)) return false
        return true
      })
    }

    // Top campaigns by budget
    const topCampaigns = [...filteredCampaigns]
      .sort((a, b) => b.budget.total - a.budget.total)
      .slice(0, 5)
      .map(c => ({
        id: c.id,
        name: c.name,
        status: c.status,
        budget: c.budget.total,
      }))

    // Creative performance
    let filteredCreatives = creatives
    if (advertiserId) {
      filteredCreatives = creatives.filter(c => c.advertiserId === advertiserId)
    }

    const creativesByType = filteredCreatives.reduce((acc, c) => {
      acc[c.type] = (acc[c.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalImpressions,
          totalClicks,
          totalConversions,
          totalSpent,
          avgCTR,
          avgCPC,
          avgCPM,
          activeCampaigns: filteredCampaigns.filter(c => c.status === 'active').length,
          totalCampaigns: filteredCampaigns.length,
        },
        performanceByDay: filteredPerformance,
        deviceBreakdown: analytics.deviceBreakdown,
        geoBreakdown: analytics.geoBreakdown,
        topCampaigns,
        creativesByType: Object.entries(creativesByType).map(([type, count]) => ({
          type,
          count,
        })),
      },
    })
  } catch (error) {
    console.error('Get analytics error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
