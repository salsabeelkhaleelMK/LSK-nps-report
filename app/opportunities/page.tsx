"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { OpportunitiesTable } from "@/components/opportunities/OpportunitiesTable"
import { getOpportunities, type Opportunity } from "@/lib/data/opportunities-data"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, RefreshCw, Grid, Filter, ArrowUpDown, Plus, MoreVertical } from "lucide-react"

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOpportunities()
  }, [])

  const loadOpportunities = async () => {
    setLoading(true)
    const data = getOpportunities()
    setOpportunities(data)
    setLoading(false)
  }

  return (
    <LanguageProvider>
      <div className="flex h-screen bg-[#F7F7F7]">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b px-6 py-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-muted-foreground">Opportunities /</span>
              <span className="text-sm font-semibold">Sales opportunities</span>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Sales opportunities</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <MoreVertical className="w-4 h-4 mr-2" />
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Create
                </Button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white border-b px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon-sm">
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Select defaultValue="default">
                  <SelectTrigger className="w-[180px]">
                    <Grid className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Default view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default view</SelectItem>
                    <SelectItem value="custom">Custom view</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="filters">
                  <SelectTrigger className="w-[120px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filters" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="filters">Filters (1)</SelectItem>
                    <SelectItem value="clear">Clear filters</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="created">
                  <SelectTrigger className="w-[160px]">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created">Created (Newest)</SelectItem>
                    <SelectItem value="oldest">Created (Oldest)</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white px-6 py-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-muted-foreground">Loading opportunities...</div>
              </div>
            ) : (
              <OpportunitiesTable opportunities={opportunities} />
            )}
          </div>
        </div>
      </div>
    </LanguageProvider>
  )
}



