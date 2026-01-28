"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { Plus, MoreVertical } from 'lucide-react'
import { mockDeals } from '@/data/mock'
import { Deal } from '@/types'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function DealsPage() {
  const router = useRouter()
  const [deals] = useState<Deal[]>(mockDeals)

  const handleAddDeal = () => {
    router.push('/publisher/deals/new')
  }

  if (deals.length === 0) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-900">Deals</h1>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-xl font-semibold text-gray-900 mb-4">No deals yet.</p>
          <Button onClick={handleAddDeal} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Deal
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Deals</h1>
        <Button onClick={handleAddDeal} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Deal
        </Button>
      </div>

      {/* Deals Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal Name</TableHead>
                <TableHead>Advertiser</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium">{deal.dealName}</TableCell>
                  <TableCell>{deal.advertiserName}</TableCell>
                  <TableCell>{deal.dealType}</TableCell>
                  <TableCell>
                    {formatCurrency(deal.priceValue)} ({deal.priceOption})
                  </TableCell>
                  <TableCell>{formatDate(deal.startDate)}</TableCell>
                  <TableCell>{formatDate(deal.endDate)}</TableCell>
                  <TableCell>
                    <Badge variant={deal.status as 'active' | 'pending' | 'completed' | 'paused'}>
                      {deal.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
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
