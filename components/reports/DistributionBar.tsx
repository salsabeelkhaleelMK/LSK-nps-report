import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { NPSDistribution } from "@/lib/data/nps-data"

interface DistributionBarProps {
  distribution: NPSDistribution
}

export function DistributionBar({ distribution }: DistributionBarProps) {
  const total = distribution.promoters + distribution.passives + distribution.detractors

  const promotersPercent = total > 0 ? (distribution.promoters / total) * 100 : 0
  const passivesPercent = total > 0 ? (distribution.passives / total) * 100 : 0
  const detractorsPercent = total > 0 ? (distribution.detractors / total) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Sentiment Distribution</CardTitle>
        <CardDescription>Percentage breakdown of responses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-foreground">Promoters (9-10)</span>
            <span className="text-green-600 dark:text-green-400 font-semibold">{promotersPercent.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="bg-green-500 h-full transition-all duration-500"
              style={{ width: `${promotersPercent}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-foreground">Passives (7-8)</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">{passivesPercent.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${passivesPercent}%` }} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-foreground">Detractors (0-6)</span>
            <span className="text-red-600 dark:text-red-400 font-semibold">{detractorsPercent.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div className="bg-red-500 h-full transition-all duration-500" style={{ width: `${detractorsPercent}%` }} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
