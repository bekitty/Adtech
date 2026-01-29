import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { extractToken, verifyToken } from '@/lib/auth'

// GET - List all campaigns
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

    const campaigns = db.getCampaigns()

    // Support filtering
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const advertiserId = searchParams.get('advertiserId')
    const search = searchParams.get('search')

    let filtered = campaigns

    if (status) {
      filtered = filtered.filter(c => c.status === status)
    }

    if (advertiserId) {
      filtered = filtered.filter(c => c.advertiserId === advertiserId)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchLower)
      )
    }

    return NextResponse.json({ success: true, data: filtered })
  } catch (error) {
    console.error('Get campaigns error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new campaign
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = extractToken(authHeader)

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      name,
      advertiserId,
      budget,
      flightDates,
      targeting,
      inventory,
      status,
    } = body

    if (!name || !advertiserId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const now = new Date()
    const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

    const newCampaign = db.createCampaign({
      name,
      advertiserId,
      status: status || 'draft',
      flightDates: flightDates || {
        startDate: now.toISOString().split('T')[0],
        endDate: thirtyDaysLater.toISOString().split('T')[0],
        runOnSchedule: false,
      },
      budget: budget || {
        total: 10000,
        daily: 333,
        cpmPrice: 5,
        frequencyCap: 3,
        pacing: 'Standard',
      },
      inventory: inventory || {
        premiumSRMG: true,
        openMarket: false,
      },
      targeting: targeting || {
        geo: [],
        devices: ['Desktop', 'Mobile', 'Tablet'],
        os: [],
        browsers: [],
        adSlots: [],
        contextualCategories: [],
        audiences: [],
      },
      creativeIds: [],
    })

    return NextResponse.json({ success: true, data: newCampaign }, { status: 201 })
  } catch (error) {
    console.error('Create campaign error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
