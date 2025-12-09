"use client"

import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Car, MapPin, Sun, Calendar } from "lucide-react"
import type { Opportunity } from "@/lib/data/opportunities-data"
import { cn } from "@/lib/utils"

interface OpportunitiesTableProps {
  opportunities: Opportunity[]
}

export function OpportunitiesTable({ opportunities }: OpportunitiesTableProps) {
  const router = useRouter()

  const getStatusColor = (stage: string) => {
    switch (stage) {
      case "Won":
        return "bg-green-500"
      case "Open":
        return "bg-blue-500"
      case "Negotiation":
        return "bg-orange-500"
      case "Lost":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50 border-b">
            <TableHead className="w-[50px] bg-gray-50">
              <Checkbox />
            </TableHead>
            <TableHead className="font-medium text-gray-600 bg-gray-50">CUSTOMER</TableHead>
            <TableHead className="font-medium text-gray-600 bg-gray-50">VEHICLE INFORMATION</TableHead>
            <TableHead className="font-medium text-gray-600 bg-gray-50">ASSIGNEE</TableHead>
            <TableHead className="font-medium text-gray-600 bg-gray-50">STATUS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities.map((opportunity) => (
            <TableRow
              key={opportunity.id}
              className="cursor-pointer hover:bg-gray-50 border-b"
              onClick={() => router.push(`/opportunities/${opportunity.id}`)}
            >
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="font-medium text-foreground">{opportunity.customer.name}</div>
                  <div className="text-sm text-muted-foreground">{opportunity.customer.type}</div>
                  {opportunity.customer.source && (
                    <div className="text-sm text-muted-foreground">{opportunity.customer.source}</div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 flex-wrap">
                  <Car className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{opportunity.vehicle.name}</span>
                  <span className="text-muted-foreground">{opportunity.vehicle.price}</span>
                  {opportunity.vehicle.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="font-medium">{opportunity.assignee.name}</div>
                  <div className="text-sm text-muted-foreground">{opportunity.assignee.department}</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {opportunity.assignee.location}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className={cn("w-2 h-2 rounded-full", getStatusColor(opportunity.status.stage))} />
                  <span className="font-medium capitalize">{opportunity.status.stage}</span>
                  {opportunity.status.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      {tag}
                    </Badge>
                  ))}
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Sun className="w-3 h-3" />
                    {opportunity.status.createdDate}
                  </div>
                  {opportunity.status.expectedDate && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {opportunity.status.expectedDate}
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

