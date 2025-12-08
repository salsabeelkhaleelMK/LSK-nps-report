"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { DetractorTasksWidget } from "@/components/reports/DetractorTasksWidget"
import { ChevronDown, Search, MessageSquare, Settings, Info, ExternalLink, CalendarIcon, Languages } from "lucide-react"
import { NPSScoreDisplay } from "@/components/reports/NPSScoreDisplay"
import { StatusBadge } from "@/components/reports/StatusBadge"
import { AIAgentPerformance } from "@/components/reports/AIAgentPerformance"
import { ContactedVsNotContacted } from "@/components/reports/ContactedVsNotContacted"
import { ResponseSources } from "@/components/reports/ResponseSources"
import { format } from "date-fns"
import { useState } from "react"
// Import useLanguage hook for translations
import { useLanguage } from "@/contexts/LanguageContext"

interface ReportContentProps {
  reportData: any
  settingsOpen: boolean
  setSettingsOpen: (open: boolean) => void
  selectedEntities: string[]
  setSelectedEntities: (entities: string[]) => void
  timeRange: string
  setTimeRange: (range: string) => void
  customDateOpen: boolean
  setCustomDateOpen: (open: boolean) => void
  fromDate: Date | undefined
  setFromDate: (date: Date | undefined) => void
  toDate: Date | undefined
  setToDate: (date: Date | undefined) => void
}

export function ReportContent({
  reportData,
  settingsOpen,
  setSettingsOpen,
  selectedEntities,
  setSelectedEntities,
  timeRange,
  setTimeRange,
  customDateOpen,
  setCustomDateOpen,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}: ReportContentProps) {
  const { report, distribution } = reportData
  // Get translation function and language state
  const { t, language, setLanguage } = useLanguage()

  const [selectedBrand, setSelectedBrand] = useState<string>(t("filter.allBrands"))
  const [selectedDealership, setSelectedDealership] = useState<string>(t("filter.allDealerships"))
  const [filtersOpen, setFiltersOpen] = useState(false)

  const brands = [t("filter.allBrands"), "BMW", "Mercedes", "Audi", "Volkswagen", "Porsche"]
  const dealerships = [
    t("filter.allDealerships"),
    "Farina Italy",
    "AutoMe Germany",
    "Speed Motors UK",
    "Elite Auto France",
  ]

  const handleTimeRangeChange = (value: string) => {
    if (value === t("timerange.custom")) {
      setCustomDateOpen(true)
    } else {
      setTimeRange(value)
    }
  }

  const handleApplyCustomDates = () => {
    if (fromDate && toDate) {
      setTimeRange(`${format(fromDate, "dd MMM yyyy")} - ${format(toDate, "dd MMM yyyy")}`)
      setCustomDateOpen(false)
    }
  }

  const getTimeRangeDisplay = () => {
    if (timeRange.includes(" - ")) {
      return timeRange
    }
    return timeRange
  }

  const getFiltersDisplay = () => {
    const filters = []
    if (selectedBrand !== t("filter.allBrands")) filters.push(selectedBrand)
    if (selectedDealership !== t("filter.allDealerships")) filters.push(selectedDealership)
    return filters.length > 0 ? filters.join(", ") : t("filter.all")
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="bg-white border-b border-[#DDDDDD]">
        <div className="h-16 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder={t("search.placeholder")} className="pl-10 bg-background" />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-8">
            {/* Add language switcher dropdown */}
            <Select value={language} onValueChange={(value: "en" | "it") => setLanguage(value)}>
              <SelectTrigger className="w-[140px] bg-transparent border-none">
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  <span className="text-sm">{language === "en" ? "English" : "Italiano"}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
              </SelectContent>
            </Select>
            <Button size="icon" variant="ghost">
              <MessageSquare className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost">
              <Settings className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted" />
              <span className="text-sm font-medium">{t("user.name")}</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb and Title */}
      <div className="bg-white border-b border-[#DDDDDD] px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>{t("breadcrumb.reports")}</span>
          <span>/</span>
          <span>{t("breadcrumb.postpurchase")}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[#333333]">{t("title.postpurchase")}</h1>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
          <Button onClick={() => setSettingsOpen(true)} className="bg-[#E41C24] hover:bg-[#C11119] text-white">
            <Settings className="mr-2 h-4 w-4" />
            {t("button.settings")}
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border-b border-[#DDDDDD] px-6 py-4">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block text-[#333333]">{t("filter.label")}</label>
            <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2 justify-between min-w-[200px] bg-transparent">
                  <span className="text-sm">{getFiltersDisplay()}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#333333]">{t("filter.brand")}</label>
                    <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#333333]">{t("filter.dealership")}</label>
                    <Select value={selectedDealership} onValueChange={setSelectedDealership}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {dealerships.map((dealership) => (
                          <SelectItem key={dealership} value={dealership}>
                            {dealership}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-[#DDDDDD]">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedBrand(t("filter.allBrands"))
                        setSelectedDealership(t("filter.allDealerships"))
                      }}
                    >
                      {t("filter.clear")}
                    </Button>
                    <Button
                      size="sm"
                      className="bg-[#E41C24] hover:bg-[#C11119] text-white"
                      onClick={() => setFiltersOpen(false)}
                    >
                      {t("filter.apply")}
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="min-w-fit">
            <label className="text-sm font-medium mb-2 block text-[#333333]">{t("timerange.label")}</label>
            <Popover open={customDateOpen} onOpenChange={setCustomDateOpen}>
              <Select value={timeRange} onValueChange={handleTimeRangeChange}>
                <SelectTrigger className="w-auto min-w-[180px]">
                  <SelectValue>{getTimeRangeDisplay()}</SelectValue>
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectItem value={t("timerange.last7")}>{t("timerange.last7")}</SelectItem>
                  <SelectItem value={t("timerange.last30")}>{t("timerange.last30")}</SelectItem>
                  <SelectItem value={t("timerange.last90")}>{t("timerange.last90")}</SelectItem>
                  <SelectItem value={t("timerange.custom")}>{t("timerange.custom")}</SelectItem>
                </SelectContent>
              </Select>

              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("timerange.from")}</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {fromDate ? format(fromDate, "dd MMM yyyy") : t("timerange.selectDate")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={fromDate} onSelect={setFromDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("timerange.to")}</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {toDate ? format(toDate, "dd MMM yyyy") : t("timerange.selectDate")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={toDate}
                          onSelect={(date) => {
                            setToDate(date)
                            if (date && fromDate) {
                              handleApplyCustomDates()
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto bg-[#F7F7F7]">
        <div className="p-6 max-w-[1600px] mx-auto space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <StatusBadge status={report.status} />
            <span className="text-sm text-muted-foreground">
              {t("status.lastUpdated")} {report.updatedAt.toLocaleDateString()}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Contact Status Widget - 1 column (20%) */}
            <div className="lg:col-span-1">
              <ContactedVsNotContacted contacted={1000} total={5000} />
            </div>

            {/* Response Sources Widget - 4 columns (80%) */}
            <div className="lg:col-span-4">
              <ResponseSources
                sources={[
                  { channel: t("channel.email"), percentage: 59, count: 145, color: "#3b82f6" },
                  { channel: t("channel.sms"), percentage: 25, count: 62, color: "#a855f7" },
                  { channel: t("channel.aiCall"), percentage: 16, count: 38, color: "#f97316" },
                ]}
              />
            </div>
          </div>

          {/* Action Card with NPS Score and Button */}
          <Card className="p-6 bg-white rounded-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <NPSScoreDisplay score={report.npsScore} size="lg" showLabel />
                <p className="text-sm text-muted-foreground">
                  {distribution.promoters + distribution.passives + distribution.detractors}{" "}
                  {t("widget.totalResponses")}
                </p>
              </div>
              <Button className="gap-2 bg-black hover:bg-gray-900 text-white">
                {t("button.viewOnFidspark")}
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* AI Agent Performance */}
          <AIAgentPerformance
            totalCalls={156}
            successful={124}
            unreachable={32}
            avgDuration="3:00"
            escalationReasons={[
              { reason: t("escalation.dissatisfaction"), count: 12 },
              { reason: t("escalation.technical"), count: 5 },
              { reason: t("escalation.complaint"), count: 8 },
            ]}
          />

          {/* Detractor Tasks Widget */}
          <DetractorTasksWidget tasks={reportData.detractorTasks || []} />
        </div>
      </div>
    </div>
  )
}
