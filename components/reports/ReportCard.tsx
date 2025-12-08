"use client"

import { Card } from "@/components/ui/card"
import { StatusBadge } from "./StatusBadge"
import { NPSScoreDisplay } from "./NPSScoreDisplay"
import { ArrowRight } from "lucide-react"
import type { ReportStatus } from "@/lib/data/nps-data"
import { cn } from "@/lib/utils"

interface ReportCardProps {
  id: string
  name: string
  status: ReportStatus
  npsScore: number
  description: string
  onClick?: () => void
}

export function ReportCard({ id, name, status, npsScore, description, onClick }: ReportCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all hover:shadow-md cursor-pointer",
        "bg-card border border-border",
      )}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-card-foreground mb-2">{name}</h3>
            <StatusBadge status={status} />
          </div>
          <div className="ml-4">
            <NPSScoreDisplay score={npsScore} size="sm" />
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{description}</p>

        <div className="flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          View details
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Card>
  )
}
