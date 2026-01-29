"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, Upload, MoreVertical, FileIcon, X, Check } from 'lucide-react'
import { mockCreatives } from '@/data/mock'
import { Creative } from '@/types'

export default function CreativesPage() {
  const [creatives, setCreatives] = useState<Creative[]>(mockCreatives)
  const [statusFilter, setStatusFilter] = useState('all')
  const [formatFilter, setFormatFilter] = useState('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newCreative, setNewCreative] = useState({
    name: '',
    landingPageUrl: '',
    file: null as File | null,
  })

  const filteredCreatives = creatives.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false
    if (formatFilter !== 'all' && c.type !== formatFilter) return false
    return true
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewCreative({ ...newCreative, file })
    }
  }

  const handleCreateCreative = () => {
    if (newCreative.name && newCreative.landingPageUrl) {
      const creative: Creative = {
        id: `cre-${Date.now()}`,
        advertiserId: 'adv-1',
        name: newCreative.name,
        type: 'Native',
        fileName: newCreative.file?.name || 'image.jpg',
        fileSize: newCreative.file?.size || 100000,
        landingPageUrl: newCreative.landingPageUrl,
        status: 'submitted',
        createdAt: new Date().toISOString(),
      }
      setCreatives([creative, ...creatives])
      setNewCreative({ name: '', landingPageUrl: '', file: null })
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Creatives</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Upload
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Creative</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Creative Name</Label>
                  <Input
                    value={newCreative.name}
                    onChange={(e) =>
                      setNewCreative({ ...newCreative, name: e.target.value })
                    }
                    placeholder="Native Ad"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload Banner</Label>
                  {newCreative.file ? (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileIcon className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">{newCreative.file.name}</p>
                          <p className="text-xs text-gray-500">
                            {Math.round(newCreative.file.size / 1024)}kb • Complete
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setNewCreative({ ...newCreative, file: null })}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                        <Check className="w-5 h-5 text-green-500" />
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer text-sm text-gray-500 hover:text-gray-700"
                      >
                        Click to upload or drag and drop
                      </label>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Landing Page URL</Label>
                  <Input
                    value={newCreative.landingPageUrl}
                    onChange={(e) =>
                      setNewCreative({ ...newCreative, landingPageUrl: e.target.value })
                    }
                    placeholder="website.com"
                  />
                </div>

                <Button onClick={handleCreateCreative} className="w-full">
                  Create and Submit for Approval
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select value={formatFilter} onValueChange={setFormatFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Formats</SelectItem>
            <SelectItem value="Display">Display</SelectItem>
            <SelectItem value="Video">Video</SelectItem>
            <SelectItem value="Native">Native</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Creatives Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Creative Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCreatives.map((creative) => (
                <TableRow key={creative.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs">IMG</span>
                      </div>
                      <div>
                        <p className="font-medium">{creative.name}</p>
                        <p className="text-sm text-gray-500">{creative.fileName}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{creative.type}</TableCell>
                  <TableCell>{creative.landingPageUrl}</TableCell>
                  <TableCell>
                    <Badge variant={creative.status as 'submitted' | 'approved' | 'rejected' | 'draft'}>
                      {creative.status.charAt(0).toUpperCase() + creative.status.slice(1)}
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
