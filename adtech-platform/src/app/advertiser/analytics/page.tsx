"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockCampaigns } from '@/data/mock'
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

// Generate mock time series data
const generateTimeSeriesData = () => {
  const data = []
  const now = new Date()
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      impressions: Math.floor(Math.random() * 50000) + 30000,
      clicks: Math.floor(Math.random() * 600) + 300,
      spend: Math.floor(Math.random() * 1500) + 500,
    })
  }
  return data
}

const timeSeriesData = generateTimeSeriesData()

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('last30days')
  const [selectedCampaign, setSelectedCampaign] = useState('all')

  // Calculate totals
  const totals = mockCampaigns.reduce(
    (acc, campaign) => ({
      impressions: acc.impressions + campaign.metrics.impressions,
      clicks: acc.clicks + campaign.metrics.clicks,
      spend: acc.spend + campaign.metrics.spend,
      conversions: acc.conversions + campaign.metrics.conversions,
    }),
    { impressions: 0, clicks: 0, spend: 0, conversions: 0 }
  )

  const averageCTR = totals.clicks / totals.impressions * 100 || 0

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <div className="flex items-center gap-4">
          <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Campaign" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              {mockCampaigns.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
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
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Total Impressions</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatNumber(totals.impressions)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Total Clicks</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatNumber(totals.clicks)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Average CTR</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatPercent(averageCTR)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">Total Spend</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(totals.spend)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Impressions Over Time */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Impressions Over Time
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="impressions"
                    stroke="#A855F7"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Spend Over Time */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Daily Spend
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip formatter={(value) => formatCurrency(Number(value) || 0)} />
                  <Bar
                    dataKey="spend"
                    fill="url(#spendGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Campaign Performance
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Campaign</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Impressions</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Clicks</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">CTR</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Conversions</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Spend</th>
                </tr>
              </thead>
              <tbody>
                {mockCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-gray-50">
                    <td className="py-3 px-4 font-medium">{campaign.name}</td>
                    <td className="py-3 px-4 text-right">{formatNumber(campaign.metrics.impressions)}</td>
                    <td className="py-3 px-4 text-right">{formatNumber(campaign.metrics.clicks)}</td>
                    <td className="py-3 px-4 text-right">{formatPercent(campaign.metrics.ctr)}</td>
                    <td className="py-3 px-4 text-right">{formatNumber(campaign.metrics.conversions)}</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(campaign.metrics.spend)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
