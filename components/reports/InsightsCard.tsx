"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { NPSInsight } from "@/lib/data/nps-data"
import { AlertCircle, TrendingUp, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface InsightsCardProps {
  insight: NPSInsight
  onAction?: () => void
}

export function InsightsCard({ insight, onAction }: InsightsCardProps) {
  const getPriorityConfig = (priority: NPSInsight["priority"]) => {
    switch (priority) {
      case "high":
        return {
          icon: AlertCircle,
          bgColor: "bg-red-50 dark:bg-red-950/20",
          iconColor: "text-red-600 dark:text-red-400",
        }
      case "medium":
        return {
          icon: TrendingUp,
          bgColor: "bg-amber-50 dark:bg-amber-950/20",
          iconColor: "text-amber-600 dark:text-amber-400",
        }
      case "low":
        return {
          icon: Info,
          bgColor: "bg-blue-50 dark:bg-blue-950/20",
          iconColor: "text-blue-600 dark:text-blue-400",
        }
    }
  }

  const config = getPriorityConfig(insight.priority)
  const Icon = config.icon

  return (
    <Card className={cn("border-l-4", config.bgColor)}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Icon className={cn("h-5 w-5 mt-0.5", config.iconColor)} />
          <div className="flex-1">
            <CardTitle className="text-base">{insight.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm mb-4">{insight.description}</CardDescription>
        {insight.actionLabel && (
          <Button variant="outline" size="sm" onClick={onAction}>
            {insight.actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
