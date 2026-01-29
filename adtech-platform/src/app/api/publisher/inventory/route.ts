import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { extractToken, verifyToken } from '@/lib/auth'

// GET - List all inventory
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

    // Support filtering via query params
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const tagType = searchParams.get('tagType')
    const search = searchParams.get('search')

    let filtered = inventory

    if (status) {
      filtered = filtered.filter(i => i.status === status)
    }

    if (tagType) {
      filtered = filtered.filter(i => i.tagType === tagType)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(i =>
        i.domainName.toLowerCase().includes(searchLower) ||
        i.adSlotNameId.toLowerCase().includes(searchLower)
      )
    }

    return NextResponse.json({ success: true, data: filtered })
  } catch (error) {
    console.error('Get inventory error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new inventory
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
      websiteId,
      domainName,
      adSlotNameId,
      dimensions,
      tagType,
      adUnitPath,
      pageCategory,
      status,
    } = body

    if (!domainName || !adSlotNameId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newInventory = db.createInventory({
      publisherId: publisherId || 'pub-1',
      websiteId: websiteId || 'web-1',
      domainName,
      adSlotNameId,
      dimensions: dimensions || { width: 300, height: 250 },
      tagType: tagType || 'GPT',
      adUnitPath: adUnitPath || '/default/ad-unit',
      pageCategory: pageCategory || 'General',
      status: status || 'active',
    })

    return NextResponse.json({ success: true, data: newInventory }, { status: 201 })
  } catch (error) {
    console.error('Create inventory error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
