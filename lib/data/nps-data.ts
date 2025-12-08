// Data layer for NPS reports - designed to be easily replaced with API calls

export type ReportStatus = "active" | "paused" | "draft" | "completed"

export interface NPSReport {
  id: string
  name: string
  status: ReportStatus
  npsScore: number
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface NPSDistribution {
  promoters: number // 9-10 scores
  passives: number // 7-8 scores
  detractors: number // 0-6 scores
}

export interface NPSTrendData {
  date: string
  npsScore: number
}

export interface DetractorCase {
  id: string
  customerName: string
  feedback: string
  date: Date
  status: "open" | "in-progress" | "resolved"
  score: number
}

export interface DetractorTask {
  id: string
  customerName: string
  ownerName: string
  status: "open" | "in-progress" | "completed"
  dueDate: Date
}

export interface NPSInsight {
  id: string
  title: string
  description: string
  actionLabel?: string
  priority: "high" | "medium" | "low"
}

export interface ResponseSource {
  channel: string
  percentage: number
  count: number
  color: string
}

export interface NPSReportData {
  report: NPSReport
  distribution: NPSDistribution
  trendData: NPSTrendData[]
  detractorCases: DetractorCase[]
  insights: NPSInsight[]
  responseSources: ResponseSource[]
  detractorTasks: DetractorTask[]
}

// Mock data - replace with actual API calls
export async function getNPSReports(): Promise<NPSReport[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return [
    {
      id: "1",
      name: "Q4 2025 Customer Satisfaction",
      status: "active",
      npsScore: 72,
      description: "Quarterly NPS tracking for all customers",
      createdAt: new Date("2025-10-01"),
      updatedAt: new Date("2025-12-01"),
    },
    {
      id: "2",
      name: "Post-Purchase Experience",
      status: "active",
      npsScore: 65,
      description: "NPS survey sent 7 days after purchase",
      createdAt: new Date("2025-09-15"),
      updatedAt: new Date("2025-11-30"),
    },
    {
      id: "3",
      name: "Support Interaction Feedback",
      status: "paused",
      npsScore: 58,
      description: "Feedback collected after support tickets",
      createdAt: new Date("2025-08-01"),
      updatedAt: new Date("2025-10-15"),
    },
  ]
}

export async function getNPSReportById(id: string): Promise<NPSReportData | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const reports = await getNPSReports()
  const report = reports.find((r) => r.id === id)

  if (!report) return null

  // Calculate distribution based on NPS score
  const total = 1000
  const nps = report.npsScore

  // NPS = % Promoters - % Detractors
  // Rough estimation
  const promotersPercent = Math.min(Math.max((nps + 50) / 1.5, 20), 80)
  const detractorsPercent = Math.min(Math.max((50 - nps) / 1.5, 5), 40)
  const passivesPercent = 100 - promotersPercent - detractorsPercent

  const distribution: NPSDistribution = {
    promoters: Math.round((promotersPercent / 100) * total),
    passives: Math.round((passivesPercent / 100) * total),
    detractors: Math.round((detractorsPercent / 100) * total),
  }

  // Generate trend data (last 12 months)
  const trendData: NPSTrendData[] = []
  const now = new Date()
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now)
    date.setMonth(date.getMonth() - i)
    const variation = Math.random() * 10 - 5
    trendData.push({
      date: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      npsScore: Math.round(Math.max(0, Math.min(100, nps + variation))),
    })
  }

  // Generate detractor cases
  const detractorCases: DetractorCase[] = [
    {
      id: "d1",
      customerName: "John Smith",
      feedback: "Product arrived damaged and support was slow to respond",
      date: new Date("2025-11-28"),
      status: "in-progress",
      score: 3,
    },
    {
      id: "d2",
      customerName: "Sarah Johnson",
      feedback: "Misleading product description, not what I expected",
      date: new Date("2025-11-27"),
      status: "open",
      score: 4,
    },
    {
      id: "d3",
      customerName: "Mike Davis",
      feedback: "Poor quality materials, broke after first use",
      date: new Date("2025-11-25"),
      status: "resolved",
      score: 2,
    },
    {
      id: "d4",
      customerName: "Emily Wilson",
      feedback: "Delivery was very late, no communication about delays",
      date: new Date("2025-11-24"),
      status: "resolved",
      score: 5,
    },
    {
      id: "d5",
      customerName: "David Brown",
      feedback: "Difficult checkout process, payment failed multiple times",
      date: new Date("2025-11-23"),
      status: "open",
      score: 6,
    },
  ]

  // Generate insights
  const insights: NPSInsight[] = [
    {
      id: "i1",
      title: "Shipping delays impacting satisfaction",
      description: "23% of detractors mention delivery issues. Consider improving logistics partner communication.",
      actionLabel: "Review shipping process",
      priority: "high",
    },
    {
      id: "i2",
      title: "Product quality concerns rising",
      description: "Quality mentions up 15% month-over-month. QA review recommended.",
      actionLabel: "Analyze quality metrics",
      priority: "high",
    },
    {
      id: "i3",
      title: "Positive trend in support scores",
      description: "Support-related NPS improved by 8 points after team training.",
      priority: "medium",
    },
  ]

  // Generate response sources
  const responseSources: ResponseSource[] = [
    { channel: "Email", percentage: 59, count: 145, color: "#3b82f6" },
    { channel: "SMS", percentage: 25, count: 62, color: "#a855f7" },
    { channel: "AI Call", percentage: 16, count: 38, color: "#f97316" },
  ]

  const detractorTasks: DetractorTask[] = [
    {
      id: "t1",
      customerName: "John Smith",
      ownerName: "Marco Neri",
      status: "in-progress",
      dueDate: new Date("2025-12-05"),
    },
    {
      id: "t2",
      customerName: "Sarah Johnson",
      ownerName: "Ilenia Magenta",
      status: "open",
      dueDate: new Date("2025-12-06"),
    },
    {
      id: "t3",
      customerName: "Mike Davis",
      ownerName: "Marco Neri",
      status: "completed",
      dueDate: new Date("2025-11-28"),
    },
    {
      id: "t4",
      customerName: "Emily Wilson",
      ownerName: "Dario Zaffiro",
      status: "completed",
      dueDate: new Date("2025-11-27"),
    },
    {
      id: "t5",
      customerName: "David Brown",
      ownerName: "Ilenia Magenta",
      status: "open",
      dueDate: new Date("2025-12-08"),
    },
  ]

  return {
    report,
    distribution,
    trendData,
    detractorCases,
    insights,
    responseSources,
    detractorTasks,
  }
}

export function calculateNPS(distribution: NPSDistribution): number {
  const total = distribution.promoters + distribution.passives + distribution.detractors
  if (total === 0) return 0

  const promoterPercent = (distribution.promoters / total) * 100
  const detractorPercent = (distribution.detractors / total) * 100

  return Math.round(promoterPercent - detractorPercent)
}

export async function getResponseSources(): Promise<ResponseSource[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  return [
    { channel: "Email", percentage: 59, count: 145, color: "#3b82f6" },
    { channel: "SMS", percentage: 25, count: 62, color: "#a855f7" },
    { channel: "AI Call", percentage: 16, count: 38, color: "#f97316" },
  ]
}
