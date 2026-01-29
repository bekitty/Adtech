import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { extractToken, verifyToken } from '@/lib/auth'

// GET - Get billing info and invoices
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

    const { searchParams } = new URL(request.url)
    const advertiserId = searchParams.get('advertiserId')

    const billingInfo = advertiserId
      ? db.getBillingByAdvertiser(advertiserId)
      : db.getBillingInfo()[0]

    const invoices = advertiserId
      ? db.getTransactionsByAdvertiser(advertiserId)
      : db.getTransactions()

    // Sort invoices by date descending
    const sortedInvoices = [...invoices].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    // Calculate totals
    const totalPaid = sortedInvoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.amount, 0)

    const totalPending = sortedInvoices
      .filter(inv => inv.status === 'pending')
      .reduce((sum, inv) => sum + inv.amount, 0)

    return NextResponse.json({
      success: true,
      data: {
        billingInfo,
        invoices: sortedInvoices,
        summary: {
          totalPaid,
          totalPending,
          totalInvoices: sortedInvoices.length,
        },
      },
    })
  } catch (error) {
    console.error('Get billing error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create invoice or add payment
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
    const { amount, campaign, status } = body

    if (!amount || !campaign) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (amount, campaign)' },
        { status: 400 }
      )
    }

    // Create invoice
    const invoice = db.createTransaction({
      amount,
      campaign,
      status: status || 'pending',
    })

    return NextResponse.json({ success: true, data: invoice }, { status: 201 })
  } catch (error) {
    console.error('Billing operation error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
