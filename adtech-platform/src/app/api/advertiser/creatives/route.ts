import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { extractToken, verifyToken } from '@/lib/auth'

// GET - List all creatives
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

    const creatives = db.getCreatives()

    // Support filtering
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const advertiserId = searchParams.get('advertiserId')
    const search = searchParams.get('search')

    let filtered = creatives

    if (status) {
      filtered = filtered.filter(c => c.status === status)
    }

    if (type) {
      filtered = filtered.filter(c => c.type === type)
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
    console.error('Get creatives error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new creative
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
      type,
      fileName,
      fileSize,
      dimensions,
      landingPageUrl,
      status,
    } = body

    if (!name || !advertiserId || !type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newCreative = db.createCreative({
      name,
      advertiserId,
      type,
      fileName: fileName || 'creative.png',
      fileSize: fileSize || 0,
      dimensions: dimensions || { width: 300, height: 250 },
      landingPageUrl: landingPageUrl || '',
      status: status || 'draft',
    })

    return NextResponse.json({ success: true, data: newCreative }, { status: 201 })
  } catch (error) {
    console.error('Create creative error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
