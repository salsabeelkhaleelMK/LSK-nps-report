"use client"

import { Card } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface ResponseSource {
  channel: string
  percentage: number
  count: number
  color: string
}

interface ResponseSourcesProps {
  sources: ResponseSource[]
}

export function ResponseSources({ sources }: ResponseSourcesProps) {
  const { t } = useLanguage()
  const total = sources.reduce((sum, source) => sum + source.count, 0)

  return (
    <Card className="p-6 rounded-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-[#333333]">{t("widget.responseSources")}</h3>
      </div>

      <div className="space-y-6">
        {sources.map((source) => (
          <div key={source.channel}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{source.channel}</span>
              <span className="text-sm text-muted-foreground">
                {source.percentage}% ({source.count})
              </span>
            </div>
            <div className="h-2 bg-muted rounded-[4px] overflow-hidden">
              <div
                className="h-full rounded-[4px] transition-all"
                style={{
                  width: `${source.percentage}%`,
                  backgroundColor: source.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
