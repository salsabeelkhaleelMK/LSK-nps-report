"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ReportCard } from "@/components/reports/ReportCard"
import { EmptyState } from "@/components/reports/EmptyState"
import { Button } from "@/components/ui/button"
import { getNPSReports, type NPSReport } from "@/lib/data/nps-data"
import { Plus, FileBarChart } from "lucide-react"

export default function NPSReportsPage() {
  const router = useRouter()
  const [reports, setReports] = useState<NPSReport[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReports()
  }, [])

  const loadReports = async () => {
    setLoading(true)
    const data = await getNPSReports()
    setReports(data)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Loading reports...</div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">NPS Reports</h1>
          <p className="text-muted-foreground mt-1">Track and analyze customer satisfaction scores</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </div>

      {reports.length === 0 ? (
        <EmptyState
          icon={FileBarChart}
          title="No NPS Reports Yet"
          description="Create your first NPS report to start tracking customer satisfaction and loyalty."
          actionLabel="Create Report"
          onAction={() => console.log("Create report")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <ReportCard key={report.id} {...report} onClick={() => router.push(`/reports/nps/${report.id}`)} />
          ))}
        </div>
      )}
    </div>
  )
}
