"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { ReportContent } from "@/components/reports/ReportContent"
import { ReportSettingsDrawer } from "@/components/reports/ReportSettingsDrawer"
import { getNPSReportById } from "@/lib/data/nps-data"
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext"

function DashboardContent() {
  const { language } = useLanguage()

  const [reportData, setReportData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [selectedEntities, setSelectedEntities] = useState(["MotorK", "MotorK - RENT"])
  const [timeRange, setTimeRange] = useState("Last 7 days")
  const [customDateOpen, setCustomDateOpen] = useState(false)
  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()

  useEffect(() => {
    loadReport()
  }, [])

  const loadReport = async () => {
    setLoading(true)
    const data = await getNPSReportById("2")
    setReportData(data)
    setLoading(false)
  }

  if (loading || !reportData) {
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: "#F7F7F7" }}>
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#F7F7F7]" key={language}>
      <Sidebar />

      <ReportContent
        reportData={reportData}
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
        selectedEntities={selectedEntities}
        setSelectedEntities={setSelectedEntities}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        customDateOpen={customDateOpen}
        setCustomDateOpen={setCustomDateOpen}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />

      {/* Settings Drawer */}
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

export default function DashboardPage() {
  return (
    <LanguageProvider>
      <DashboardContent />
    </LanguageProvider>
  )
}
