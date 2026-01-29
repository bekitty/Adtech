"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronRight } from 'lucide-react'
import { pageCategories } from '@/data/mock'
import { cn } from '@/lib/utils'

const steps = ['General', 'Status']

export default function NewInventoryPage() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    domainName: '',
    adSlotNameId: '',
    width: '',
    height: '',
    tagType: 'GPT',
    adUnitPath: '',
    pageCategory: '',
    status: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In real app, would save to API
    console.log('Creating inventory:', formData)
    router.push('/publisher/inventory')
  }

  const handleDimensionPreset = (width: number, height: number) => {
    setFormData({ ...formData, width: width.toString(), height: height.toString() })
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/publisher/inventory" className="text-gray-500 hover:text-gray-700">
          Inventory
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">Add New Inventory</span>
      </div>

      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">Add New Inventory</h1>

      <div className="flex gap-8">
        {/* Form */}
        <Card className="flex-1">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Domain Name */}
              <div className="space-y-2">
                <Label htmlFor="domainName">Domain Name</Label>
                <Input
                  id="domainName"
                  value={formData.domainName}
                  onChange={(e) =>
                    setFormData({ ...formData, domainName: e.target.value })
                  }
                  placeholder="myblog.com"
                />
              </div>

              {/* Ad Slot Name/ID */}
              <div className="space-y-2">
                <Label htmlFor="adSlotNameId">Ad Slot Name/ID</Label>
                <Input
                  id="adSlotNameId"
                  value={formData.adSlotNameId}
                  onChange={(e) =>
                    setFormData({ ...formData, adSlotNameId: e.target.value })
                  }
                  placeholder="78-HY-89084"
                />
              </div>

              {/* Dimensions */}
              <div className="space-y-2">
                <Label>Dimensions</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={formData.width}
                    onChange={(e) =>
                      setFormData({ ...formData, width: e.target.value })
                    }
                    placeholder="W"
                    className="w-20"
                  />
                  <Input
                    value={formData.height}
                    onChange={(e) =>
                      setFormData({ ...formData, height: e.target.value })
                    }
                    placeholder="H"
                    className="w-20"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  e.g.{' '}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline"
                    onClick={() => handleDimensionPreset(720, 90)}
                  >
                    720x90
                  </button>
                  ,{' '}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline"
                    onClick={() => handleDimensionPreset(300, 250)}
                  >
                    300x250
                  </button>
                </p>
              </div>

              {/* Tag Type */}
              <div className="space-y-2">
                <Label>Tag Type</Label>
                <Select
                  value={formData.tagType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, tagType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GPT">GPT (Google Publisher Tag)</SelectItem>
                    <SelectItem value="Prebid">Header Bidding (Prebid.js)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ad Unit Path */}
              <div className="space-y-2">
                <Label htmlFor="adUnitPath">Ad Unit Path (GAM)</Label>
                <Input
                  id="adUnitPath"
                  value={formData.adUnitPath}
                  onChange={(e) =>
                    setFormData({ ...formData, adUnitPath: e.target.value })
                  }
                  placeholder="/21234567/myblog/header"
                />
              </div>

              {/* Page Category */}
              <div className="space-y-2">
                <Label>Page Category</Label>
                <Select
                  value={formData.pageCategory}
                  onValueChange={(value) =>
                    setFormData({ ...formData, pageCategory: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {pageCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Divider */}
              <hr className="border-gray-200" />

              {/* Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Status</h3>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.status}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, status: checked })
                    }
                  />
                  <span className="text-sm text-gray-700">Active</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/publisher/inventory')}
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
