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
import { mockCampaigns } from '@/data/mock'
import { Campaign } from '@/types'
import { formatCurrency, formatNumber, formatPercent, formatDate } from '@/lib/utils'

export default function CampaignsPage() {
  const router = useRouter()
  const [campaigns] = useState<Campaign[]>(mockCampaigns)

  const handleCreateCampaign = () => {
    router.push('/advertiser/campaigns/new')
  }

  if (campaigns.length === 0) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-xl font-semibold text-gray-900 mb-4">No campaigns yet.</p>
          <Button onClick={handleCreateCampaign} className="gap-2">
            <Plus className="w-4 h-4" />
            Create Campaign
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
        <Button onClick={handleCreateCampaign} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Campaign
        </Button>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Impressions</TableHead>
                <TableHead>CTR</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <Badge variant={campaign.status as 'active' | 'draft' | 'paused' | 'pending' | 'completed'}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(campaign.budget.total)}</TableCell>
                  <TableCell>{formatCurrency(campaign.metrics.spend)}</TableCell>
                  <TableCell>{formatNumber(campaign.metrics.impressions)}</TableCell>
                  <TableCell>{formatPercent(campaign.metrics.ctr)}</TableCell>
                  <TableCell>{formatDate(campaign.flightDates.startDate)}</TableCell>
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
