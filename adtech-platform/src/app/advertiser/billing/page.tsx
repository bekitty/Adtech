"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CreditCard, Download, Plus } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

// Mock billing data
const mockInvoices = [
  {
    id: 'inv-001',
    date: '2025-06-01',
    amount: 12500,
    status: 'paid',
    campaign: 'Summer Tech Promo',
  },
  {
    id: 'inv-002',
    date: '2025-05-01',
    amount: 8750,
    status: 'paid',
    campaign: 'Q2 Brand Campaign',
  },
  {
    id: 'inv-003',
    date: '2025-04-01',
    amount: 15000,
    status: 'paid',
    campaign: 'Spring Launch',
  },
  {
    id: 'inv-004',
    date: '2025-07-01',
    amount: 9800,
    status: 'pending',
    campaign: 'Summer Tech Promo',
  },
]

const mockPaymentMethods = [
  {
    id: 'pm-1',
    type: 'visa',
    last4: '4242',
    expiry: '12/26',
    isDefault: true,
  },
  {
    id: 'pm-2',
    type: 'mastercard',
    last4: '8888',
    expiry: '08/25',
    isDefault: false,
  },
]

export default function BillingPage() {
  const [invoices] = useState(mockInvoices)
  const [paymentMethods] = useState(mockPaymentMethods)

  const totalSpent = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0)

  const pendingAmount = invoices
    .filter((inv) => inv.status === 'pending')
    .reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">Billing</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Total Spent (YTD)</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(totalSpent)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Pending Balance</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(pendingAmount)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Next Billing Date</p>
            <p className="text-3xl font-bold text-gray-900">Aug 1, 2025</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Payment Method
            </Button>
          </div>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium capitalize">
                      {method.type} ending in {method.last4}
                    </p>
                    <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {method.isDefault && (
                    <Badge variant="secondary">Default</Badge>
                  )}
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Invoice History
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id.toUpperCase()}</TableCell>
                  <TableCell>{formatDate(invoice.date)}</TableCell>
                  <TableCell>{invoice.campaign}</TableCell>
                  <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={invoice.status === 'paid' ? 'success' : 'warning'}
                    >
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
