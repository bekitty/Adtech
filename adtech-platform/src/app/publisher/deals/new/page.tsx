"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronRight, Calendar } from 'lucide-react'
import { mockInventory, mockAdvertisers } from '@/data/mock'
import { cn } from '@/lib/utils'

const steps = ['General', 'Deal Type', 'Price Option']

export default function NewDealPage() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    dealName: '',
    inventoryId: '',
    advertiserId: '',
    startDate: '',
    endDate: '',
    dealType: 'Direct',
    priceOption: 'Price Floor',
    priceValue: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating deal:', formData)
    router.push('/publisher/deals')
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/publisher/deals" className="text-gray-500 hover:text-gray-700">
          Deals
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">Create Deal</span>
      </div>

      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">Create Deal</h1>

      <div className="flex gap-8">
        {/* Form */}
        <Card className="flex-1">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Deal Name */}
              <div className="space-y-2">
                <Label htmlFor="dealName">Deal Name</Label>
                <Input
                  id="dealName"
                  value={formData.dealName}
                  onChange={(e) =>
                    setFormData({ ...formData, dealName: e.target.value })
                  }
                  placeholder="Wellness Articles"
                />
              </div>

              {/* Inventory Selection */}
              <div className="space-y-2">
                <Label>Inventory Selection</Label>
                <Select
                  value={formData.inventoryId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, inventoryId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select inventory" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockInventory.map((inv) => (
                      <SelectItem key={inv.id} value={inv.id}>
                        {inv.domainName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Advertiser Selection */}
              <div className="space-y-2">
                <Label>Advertiser Selection</Label>
                <Select
                  value={formData.advertiserId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, advertiserId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select advertiser" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAdvertisers.map((adv) => (
                      <SelectItem key={adv.id} value={adv.id}>
                        {adv.companyName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200" />

              {/* Deal Type */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Deal Type</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, dealType: 'Direct' })}
                    className={cn(
                      'p-4 rounded-xl border-2 text-left transition-all',
                      formData.dealType === 'Direct'
                        ? 'border-[#A855F7] bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          'w-4 h-4 rounded-full border-2',
                          formData.dealType === 'Direct'
                            ? 'border-[#A855F7] bg-[#A855F7]'
                            : 'border-gray-300'
                        )}
                      >
                        {formData.dealType === 'Direct' && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                      <span className="font-medium">Direct</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, dealType: 'PMP' })}
                    className={cn(
                      'p-4 rounded-xl border-2 text-left transition-all',
                      formData.dealType === 'PMP'
                        ? 'border-[#A855F7] bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          'w-4 h-4 rounded-full border-2',
                          formData.dealType === 'PMP'
                            ? 'border-[#A855F7] bg-[#A855F7]'
                            : 'border-gray-300'
                        )}
                      >
                        {formData.dealType === 'PMP' && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                      <span className="font-medium">PMP</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200" />

              {/* Price Option */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Price Option</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, priceOption: 'Fixed Price' })}
                    className={cn(
                      'p-4 rounded-xl border-2 text-left transition-all',
                      formData.priceOption === 'Fixed Price'
                        ? 'border-[#A855F7] bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          'w-4 h-4 rounded-full border-2',
                          formData.priceOption === 'Fixed Price'
                            ? 'border-[#A855F7] bg-[#A855F7]'
                            : 'border-gray-300'
                        )}
                      >
                        {formData.priceOption === 'Fixed Price' && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                      <span className="font-medium">Fixed Price</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, priceOption: 'Price Floor' })}
                    className={cn(
                      'p-4 rounded-xl border-2 text-left transition-all',
                      formData.priceOption === 'Price Floor'
                        ? 'border-[#A855F7] bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          'w-4 h-4 rounded-full border-2',
                          formData.priceOption === 'Price Floor'
                            ? 'border-[#A855F7] bg-[#A855F7]'
                            : 'border-gray-300'
                        )}
                      >
                        {formData.priceOption === 'Price Floor' && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                      <span className="font-medium">Price Floor</span>
                    </div>
                  </button>
                </div>

                {/* Price Input */}
                <div className="space-y-2">
                  <Label>CPM Price ($)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.priceValue}
                    onChange={(e) =>
                      setFormData({ ...formData, priceValue: e.target.value })
                    }
                    placeholder="5.50"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/publisher/deals')}
                >
                  Cancel
                </Button>
                <Button type="submit">Create</Button>
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
