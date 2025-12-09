"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/Sidebar"
import { OpportunityProfile } from "@/components/opportunities/OpportunityProfile"
import { getOpportunityById, type OpportunityDetail } from "@/lib/data/opportunities-data"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function OpportunityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [opportunity, setOpportunity] = useState<OpportunityDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOpportunity()
  }, [params.id])

  const loadOpportunity = async () => {
    setLoading(true)
    const data = getOpportunityById(params.id as string)
    setOpportunity(data)
    setLoading(false)
  }

  if (loading) {
    return (
      <LanguageProvider>
        <div className="flex h-screen items-center justify-center bg-[#F7F7F7]">
          <div className="text-muted-foreground">Loading opportunity...</div>
        </div>
      </LanguageProvider>
    )
  }

  if (!opportunity) {
    return (
      <LanguageProvider>
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7F7F7]">
          <h2 className="text-2xl font-bold mb-2">Opportunity not found</h2>
          <Button onClick={() => router.push("/opportunities")}>Back to Opportunities</Button>
        </div>
      </LanguageProvider>
    )
  }

  return (
    <LanguageProvider>
      <div className="flex h-screen bg-[#F7F7F7] w-full overflow-hidden">
        <Sidebar />
        <div className="flex-1 min-w-0 overflow-hidden">
          <OpportunityProfile opportunity={opportunity} />
        </div>
      </div>
    </LanguageProvider>
  )
}

