"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { mockDSPConfigs } from '@/data/mock'
import { DSPConfig } from '@/types'

export default function PublisherSettingsPage() {
  const [dspConfigs, setDspConfigs] = useState<DSPConfig[]>(mockDSPConfigs)

  const handleToggleDSP = (id: string, enabled: boolean) => {
    setDspConfigs(
      dspConfigs.map((dsp) =>
        dsp.id === id ? { ...dsp, enabled } : dsp
      )
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

      {/* Available DSPs */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Available DSPs
          </h2>
          <div className="space-y-4">
            {dspConfigs.map((dsp) => (
              <div
                key={dsp.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <span className="text-sm font-medium text-gray-700">{dsp.name}</span>
                <Switch
                  checked={dsp.enabled}
                  onCheckedChange={(checked) => handleToggleDSP(dsp.id, checked)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
