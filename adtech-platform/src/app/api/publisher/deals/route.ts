import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { extractToken, verifyToken } from '@/lib/auth'

// GET - List all deals
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

    const deals = db.getDeals()

    // Support filtering
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const dealType = searchParams.get('dealType')
    const search = searchParams.get('search')

    let filtered = deals

    if (status) {
      filtered = filtered.filter(d => d.status === status)
    }

    if (dealType) {
      filtered = filtered.filter(d => d.dealType === dealType)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(d =>
        d.dealName.toLowerCase().includes(searchLower) ||
        d.advertiserName.toLowerCase().includes(searchLower)
      )
    }

    return NextResponse.json({ success: true, data: filtered })
  } catch (error) {
    console.error('Get deals error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new deal
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
      publisherId,
      dealName,
      inventoryId,
      advertiserId,
      advertiserName,
      startDate,
      endDate,
      dealType,
      priceOption,
      priceValue,
      status,
    } = body

    if (!dealName || !advertiserId || !advertiserName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const now = new Date()
    const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

    const newDeal = db.createDeal({
      publisherId: publisherId || 'pub-1',
      dealName,
      inventoryId: inventoryId || 'inv-1',
      advertiserId,
      advertiserName,
      startDate: startDate || now.toISOString().split('T')[0],
      endDate: endDate || thirtyDaysLater.toISOString().split('T')[0],
      dealType: dealType || 'Direct',
      priceOption: priceOption || 'Fixed Price',
      priceValue: priceValue || 0,
      status: status || 'pending',
    })

    return NextResponse.json({ success: true, data: newDeal }, { status: 201 })
  } catch (error) {
    console.error('Create deal error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
