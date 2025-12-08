"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface OutcomesSettingsProps {
  detractorActions?: {
    createFidsparkDispute: boolean
    createLeadsparkTask: boolean
  }
  nonResponderActions?: {
    createFidsparkDispute: boolean
    createLeadsparkTask: boolean
  }
  onChange?: (settings: any) => void
}

export function OutcomesSettings({ detractorActions, nonResponderActions, onChange }: OutcomesSettingsProps) {
  const { t } = useLanguage()

  const [detractors, setDetractors] = useState(
    detractorActions || {
      createFidsparkDispute: false,
      createLeadsparkTask: true,
    },
  )

  const [nonResponders, setNonResponders] = useState(
    nonResponderActions || {
      createFidsparkDispute: false,
      createLeadsparkTask: true,
    },
  )

  const handleDetractorToggle = (key: keyof typeof detractors, value: boolean) => {
    const newDetractors = { ...detractors, [key]: value }
    setDetractors(newDetractors)
    onChange?.({ detractors: newDetractors, nonResponders })
  }

  const handleNonResponderToggle = (key: keyof typeof nonResponders, value: boolean) => {
    const newNonResponders = { ...nonResponders, [key]: value }
    setNonResponders(newNonResponders)
    onChange?.({ detractors, nonResponders: newNonResponders })
  }

  return (
    <div className="space-y-6">
      {/* Detractors Section */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-base font-semibold text-red-600 mb-1">{t("outcomes.detractors")} (0-6)</h3>
        <p className="text-sm text-gray-600 mb-4">Actions for customers who gave low scores</p>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="fidspark-dispute" className="text-sm font-normal">
              Create Fidspark Dispute
            </Label>
            <Switch
              id="fidspark-dispute"
              checked={detractors.createFidsparkDispute}
              onCheckedChange={(checked) => handleDetractorToggle("createFidsparkDispute", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="leadspark-task" className="text-sm font-normal">
              {t("outcomes.createTask")}
            </Label>
            <Switch
              id="leadspark-task"
              checked={detractors.createLeadsparkTask}
              onCheckedChange={(checked) => handleDetractorToggle("createLeadsparkTask", checked)}
            />
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-base font-semibold text-gray-600 mb-1">{t("outcomes.nonResponders")}</h3>
        <p className="text-sm text-gray-600 mb-4">{t("outcomes.nonRespondersDescription")}</p>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="nonresponder-fidspark-dispute" className="text-sm font-normal">
              Create Fidspark Dispute
            </Label>
            <Switch
              id="nonresponder-fidspark-dispute"
              checked={nonResponders.createFidsparkDispute}
              onCheckedChange={(checked) => handleNonResponderToggle("createFidsparkDispute", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="nonresponder-leadspark-task" className="text-sm font-normal">
              {t("outcomes.createTask")}
            </Label>
            <Switch
              id="nonresponder-leadspark-task"
              checked={nonResponders.createLeadsparkTask}
              onCheckedChange={(checked) => handleNonResponderToggle("createLeadsparkTask", checked)}
            />
          </div>
        </div>
      </div>

      {/* Promoters Section */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-base font-semibold text-green-600 mb-1">{t("outcomes.promoters")} (9-10)</h3>
        <p className="text-sm text-gray-600 mb-4">Actions for satisfied customers</p>

        <Button
          className="w-full justify-between bg-black hover:bg-gray-900 text-white"
          onClick={() => window.open("https://fidspark.com/reviews", "_blank")}
        >
          <span>{t("outcomes.manageOnFidspark")}</span>
          <ExternalLink className="h-4 w-4 text-white" />
        </Button>
      </div>

      {/* Passives Section */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-base font-semibold text-amber-600 mb-1">Passives (7-8)</h3>
        <p className="text-sm text-gray-600">No automatic action configured for passive responses</p>
      </div>
    </div>
  )
}
