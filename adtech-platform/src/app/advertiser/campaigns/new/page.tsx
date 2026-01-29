"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronRight, Plus, HelpCircle, Smartphone, Tablet, Monitor } from 'lucide-react'
import { contextualCategories, audienceSegments, browserOptions } from '@/data/mock'
import { cn } from '@/lib/utils'

const steps = ['General', 'Flight Dates', 'Budget', 'Creatives', 'Inventory', 'Targeting']

export default function NewCampaignPage() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    runOnSchedule: false,
    totalBudget: '',
    dailyBudget: '',
    cpmPrice: '',
    frequencyCap: '',
    pacing: 'Standard',
    premiumInventory: false,
    openMarket: false,
    geoTargeting: '',
    devices: [] as string[],
    os: [] as string[],
    browsers: [] as string[],
    adSlots: [] as string[],
    contextualCategories: [] as string[],
    audiences: [] as string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating campaign:', formData)
    router.push('/advertiser/campaigns')
  }

  const toggleDevice = (device: string) => {
    setFormData({
      ...formData,
      devices: formData.devices.includes(device)
        ? formData.devices.filter((d) => d !== device)
        : [...formData.devices, device],
    })
  }

  const toggleOS = (os: string) => {
    setFormData({
      ...formData,
      os: formData.os.includes(os)
        ? formData.os.filter((o) => o !== os)
        : [...formData.os, os],
    })
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/advertiser/campaigns" className="text-gray-500 hover:text-gray-700">
          Campaigns
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">Create Campaign</span>
      </div>

      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">Create Campaign</h1>

      <div className="flex gap-8">
        {/* Form */}
        <Card className="flex-1">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Campaign Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Summer Tech Promo"
                />
              </div>

              {/* Divider */}
              <hr className="border-gray-200" />

              {/* Flight Dates */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Flight Dates</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.runOnSchedule}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, runOnSchedule: checked })
                    }
                  />
                  <span className="text-sm text-gray-700">Run ads on a schedule</span>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200" />

              {/* Budget */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Budget</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Total Budget</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={formData.totalBudget}
                        onChange={(e) =>
                          setFormData({ ...formData, totalBudget: e.target.value })
                        }
                        placeholder="50000"
                        className="pr-8"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Label>Daily Budget</Label>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="relative">
                      <Input
                        type="number"
                        value={formData.dailyBudget}
                        onChange={(e) =>
                          setFormData({ ...formData, dailyBudget: e.target.value })
                        }
                        placeholder="1500"
                        className="pr-8"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Label>CPM Price</Label>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="relative w-1/2">
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.cpmPrice}
                      onChange={(e) =>
                        setFormData({ ...formData, cpmPrice: e.target.value })
                      }
                      placeholder="4.50"
                      className="pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Frequency Cap</Label>
                  <Input
                    type="number"
                    value={formData.frequencyCap}
                    onChange={(e) =>
                      setFormData({ ...formData, frequencyCap: e.target.value })
                    }
                    placeholder="3"
                    className="w-1/2"
                  />
                  <p className="text-sm text-gray-500">Impressions per user per day</p>
                </div>

                <div className="space-y-2">
                  <Label>Pacing</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {['Standard', 'Evenly', 'Accelerated'].map((pace) => (
                      <button
                        key={pace}
                        type="button"
                        onClick={() => setFormData({ ...formData, pacing: pace })}
                        className={cn(
                          'p-4 rounded-xl border-2 text-center transition-all',
                          formData.pacing === pace
                            ? 'border-[#A855F7] bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <span className="font-medium">{pace}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200" />

              {/* Creatives */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Creatives</h3>
                <Button type="button" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Creatives
                </Button>
              </div>

              {/* Divider */}
              <hr className="border-gray-200" />

              {/* Inventory */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Inventory</h3>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={cn(
                      'flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all',
                      formData.premiumInventory
                        ? 'border-[#A855F7] bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <Checkbox
                      checked={formData.premiumInventory}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, premiumInventory: !!checked })
                      }
                    />
                    <span className="font-medium">Premium SRMG Inventory</span>
                  </label>
                  <label
                    className={cn(
                      'flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all',
                      formData.openMarket
                        ? 'border-[#A855F7] bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <Checkbox
                      checked={formData.openMarket}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, openMarket: !!checked })
                      }
                    />
                    <span className="font-medium">Open Market Supply (via DSPs)</span>
                  </label>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200" />

              {/* Targeting */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Targeting</h3>

                {/* Geo */}
                <div className="space-y-2">
                  <Label>Geo</Label>
                  <Input
                    placeholder="Country, region, city"
                    value={formData.geoTargeting}
                    onChange={(e) =>
                      setFormData({ ...formData, geoTargeting: e.target.value })
                    }
                  />
                  {/* Map placeholder */}
                  <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                    Map Preview
                  </div>
                </div>

                {/* Device */}
                <div className="space-y-2">
                  <Label>Device</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'Mobile', icon: Smartphone },
                      { id: 'Tablet', icon: Tablet },
                      { id: 'Desktop', icon: Monitor },
                    ].map(({ id, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleDevice(id)}
                        className={cn(
                          'p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all',
                          formData.devices.includes(id)
                            ? 'border-[#A855F7] bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <Checkbox checked={formData.devices.includes(id)} />
                        <span className="font-medium">{id}</span>
                        <Icon className="w-6 h-6 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* OS */}
                <div className="space-y-2">
                  <Label>OS</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {['iOS', 'Android'].map((os) => (
                      <button
                        key={os}
                        type="button"
                        onClick={() => toggleOS(os)}
                        className={cn(
                          'p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all',
                          formData.os.includes(os)
                            ? 'border-[#A855F7] bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <Checkbox checked={formData.os.includes(os)} />
                        <span className="font-medium">{os}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Browser */}
                <div className="space-y-2">
                  <Label>Browser</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {browserOptions.map((browser) => (
                        <SelectItem key={browser} value={browser}>
                          {browser}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Ad Slot */}
                <div className="space-y-2">
                  <Label>Add Slot</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="header">Header (720x90)</SelectItem>
                      <SelectItem value="sidebar">Sidebar (300x250)</SelectItem>
                      <SelectItem value="footer">Footer (728x90)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Contextual Category */}
                <div className="space-y-2">
                  <Label>Contextual Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {contextualCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Audiences */}
                <div className="space-y-2">
                  <Label>Audiences</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {audienceSegments.map((audience) => (
                        <SelectItem key={audience} value={audience}>
                          {audience}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/advertiser/campaigns')}
                >
                  Cancel
                </Button>
                <Button type="submit">Launch Campaign</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Step Navigation */}
        <div className="w-48">
          <nav className="space-y-1">
            {steps.map((step, index) => (
              <button
                key={step}
                type="button"
                onClick={() => setActiveStep(index)}
                className={cn(
                  'w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  activeStep === index
                    ? 'bg-white border-l-4 border-[#A855F7] text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {step}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
