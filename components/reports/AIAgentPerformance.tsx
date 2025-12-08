"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Phone, ChevronDown, ChevronUp } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface AIAgentPerformanceProps {
  totalCalls: number
  successful: number
  unreachable: number
  avgDuration: string
  escalationReasons: {
    reason: string
    count: number
  }[]
}

export function AIAgentPerformance({
  totalCalls,
  successful,
  unreachable,
  avgDuration,
  escalationReasons,
}: AIAgentPerformanceProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const { t } = useLanguage()

  return (
    <Card className="overflow-hidden rounded-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-[#333333]">{t("widget.aiAgent")}</h3>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-4 gap-6 pt-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">{t("widget.totalCalls")}</div>
              <div className="text-3xl font-bold">{totalCalls}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">{t("widget.successful")}</div>
              <div className="text-3xl font-bold text-green-600">{successful}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">{t("widget.unreachable")}</div>
              <div className="text-3xl font-bold text-orange-600">{unreachable}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">{t("widget.avgDuration")}</div>
              <div className="text-3xl font-bold">{avgDuration}</div>
            </div>
          </div>

          {/* Escalation Reasons */}
          <div>
            <h4 className="text-sm font-medium mb-3">{t("widget.escalationReasons")}</h4>
            <div className="space-y-2">
              {escalationReasons.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.reason}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
