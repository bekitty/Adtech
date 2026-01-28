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
import { mockInventory } from '@/data/mock'
import { Inventory } from '@/types'

export default function InventoryPage() {
  const router = useRouter()
  const [inventory] = useState<Inventory[]>(mockInventory)

  const handleAddInventory = () => {
    router.push('/publisher/inventory/new')
  }

  if (inventory.length === 0) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-xl font-semibold text-gray-900 mb-4">No inventory yet.</p>
          <Button onClick={handleAddInventory} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Inventory
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
        <Button onClick={handleAddInventory} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Inventory
        </Button>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>Ad Slot ID</TableHead>
                <TableHead>Dimensions</TableHead>
                <TableHead>Tag Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.domainName}</TableCell>
                  <TableCell>{item.adSlotNameId}</TableCell>
                  <TableCell>
                    {item.dimensions.width}x{item.dimensions.height}
                  </TableCell>
                  <TableCell>{item.tagType}</TableCell>
                  <TableCell>{item.pageCategory}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'active' ? 'active' : 'paused'}>
                      {item.status}
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
