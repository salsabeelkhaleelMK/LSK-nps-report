"use client"

import { Card } from "@/components/ui/card"
import { Users } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface ContactedVsNotContactedProps {
  contacted: number
  total: number
}

export function ContactedVsNotContacted({ contacted, total }: ContactedVsNotContactedProps) {
  const { t } = useLanguage()
  const percentage = Math.round((contacted / total) * 100)
  const notContacted = total - contacted

  return (
    <Card className="p-6 rounded-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-[4px] bg-blue-50 flex items-center justify-center flex-shrink-0">
          <Users className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-[#333333]">{t("widget.contactStatus")}</h3>
      </div>

      <div className="space-y-4">
        {/* Contacted stat - more compact */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{t("widget.contacted")}</span>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">{contacted.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">{percentage}%</div>
          </div>
        </div>

        {/* Visual bar */}
        <div className="h-2 bg-gray-100 rounded-[4px] overflow-hidden">
          <div className="h-full bg-green-500 rounded-[4px]" style={{ width: `${percentage}%` }} />
        </div>

        {/* Not contacted stat - more compact */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{t("widget.notContacted")}</span>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-400">{notContacted.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">{100 - percentage}%</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
