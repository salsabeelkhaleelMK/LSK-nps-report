"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { NPSScoreDisplay } from "@/components/reports/NPSScoreDisplay"
import { StatusBadge } from "@/components/reports/StatusBadge"
import { NPSDonutChart } from "@/components/reports/NPSDonutChart"
import { NPSTrendChart } from "@/components/reports/NPSTrendChart"
import { DistributionBar } from "@/components/reports/DistributionBar"
import { DetractorCasesTable } from "@/components/reports/DetractorCasesTable"
import { InsightsCard } from "@/components/reports/InsightsCard"
import { ReportSettingsDrawer } from "@/components/reports/ReportSettingsDrawer"
import { getNPSReportById, type NPSReportData } from "@/lib/data/nps-data"
import { ArrowLeft, Settings } from "lucide-react"

export default function NPSReportDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [reportData, setReportData] = useState<NPSReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    loadReport()
  }, [params.id])

  const loadReport = async () => {
    setLoading(true)
    const data = await getNPSReportById(params.id as string)
    setReportData(data)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Loading report...</div>
      </div>
    )
  }

  if (!reportData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-2">Report not found</h2>
        <Button onClick={() => router.push("/reports/nps")}>Back to Reports</Button>
      </div>
    )
  }

  const { report, distribution, trendData, detractorCases, insights } = reportData

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.push("/reports/nps")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">{report.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
            </div>
            <Button variant="outline" onClick={() => setSettingsOpen(true)}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <StatusBadge status={report.status} />
            <div className="h-6 w-px bg-border" />
            <div className="text-sm text-muted-foreground">Last updated: {report.updatedAt.toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* NPS Score Overview */}
        <div className="mb-8 bg-card border border-border rounded-lg p-8 text-center">
          <NPSScoreDisplay score={report.npsScore} size="lg" showLabel />
          <p className="text-sm text-muted-foreground mt-4">
            Based on {distribution.promoters + distribution.passives + distribution.detractors} responses
          </p>
        </div>

        {/* Insights */}
        {insights.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {insights.map((insight) => (
                <InsightsCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <NPSDonutChart distribution={distribution} npsScore={report.npsScore} />
          <DistributionBar distribution={distribution} />
        </div>

        <div className="mb-8">
          <NPSTrendChart data={trendData} />
        </div>

        {/* Detractor Cases */}
        <div className="mb-8">
          <DetractorCasesTable cases={detractorCases} />
        </div>
      </div>

      <ReportSettingsDrawer
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        onSave={(settings) => {
          console.log("Settings saved:", settings)
        }}
      />
    </div>
  )
}
