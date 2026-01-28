"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar, Mail } from 'lucide-react'
import { mockPublisherDashboard, mockPublishers } from '@/data/mock'
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts'

export default function PublisherDashboard() {
  const [selectedWebsite, setSelectedWebsite] = useState('all')
  const [dateRange, setDateRange] = useState('last30days')
  const data = mockPublisherDashboard
  const websites = mockPublishers[0]?.websites || []

  // Prepare chart data
  const campaignData = data.topCampaigns.map((c) => ({
    name: c.name,
    revenue: c.revenue / 100, // Scale for display
  }))

  const pieData = data.inventoryBreakdown

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-3">
          <Button variant="default" className="gap-2">
            <Calendar className="w-4 h-4" />
            Export
          </Button>
          <Button variant="outline" className="gap-2">
            <Mail className="w-4 h-4" />
            Schedule
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Select value={selectedWebsite} onValueChange={setSelectedWebsite}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Website" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Websites</SelectItem>
            {websites.map((w) => (
              <SelectItem key={w.id} value={w.id}>
                {w.domain}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last7days">Last 7 Days</SelectItem>
            <SelectItem value="last30days">Last 30 Days</SelectItem>
            <SelectItem value="last90days">Last 90 Days</SelectItem>
            <SelectItem value="thisYear">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">eCPM</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(data.eCPM)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Impressions</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatNumber(data.impressions)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Fill Rate</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatPercent(data.fillRate)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-5 gap-6">
        {/* Bar Chart - Top Campaigns */}
        <Card className="col-span-3">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Top Campaigns by Revenue
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={campaignData}
                  layout="vertical"
                  margin={{ top: 0, right: 30, left: 100, bottom: 0 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 14 }}
                  />
                  <Tooltip
                    formatter={(value) => [
                      formatCurrency((Number(value) || 0) * 100),
                      'Revenue',
                    ]}
                  />
                  <Bar
                    dataKey="revenue"
                    radius={[0, 4, 4, 0]}
                    fill="url(#barGradient)"
                  />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#A78BFA" />
                      <stop offset="100%" stopColor="#F9A8D4" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart - Inventory Breakdown */}
        <Card className="col-span-2">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Breakdown by Inventory source
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="source"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${Number(value) || 0}%`, 'Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-4 justify-center mt-4">
              {pieData.map((entry) => (
                <div key={entry.source} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-gray-600">{entry.source}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
