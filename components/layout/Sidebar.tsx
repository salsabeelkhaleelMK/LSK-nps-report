"use client"

import { usePathname, useRouter } from "next/navigation"
import { Users, Building2, Tag, Wrench, FileText, Clock, BarChart3, Plus, Megaphone } from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  
  const isOpportunitiesActive = pathname?.startsWith("/opportunities")
  const isRootPageActive = pathname === "/"

  return (
    <div className="w-[72px] bg-[#1a1a1a] flex flex-col border-r border-border/50 relative z-50">
      {/* Plus button */}
      <div className="h-16 flex items-center justify-center border-b border-border/50 px-4">
        <button className="w-10 h-10 rounded-[4px] bg-white flex items-center justify-center hover:bg-white/90 transition-colors">
          <Plus className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Navigation Icons */}
      <div className="flex-1 overflow-auto py-4 px-3">
        <button className="w-full h-14 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors rounded-[4px]">
          <Users className="w-6 h-6" />
        </button>
        <button className="w-full h-14 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors rounded-[4px]">
          <Building2 className="w-6 h-6" />
        </button>
        <button
          onClick={() => router.push("/opportunities")}
          className={cn(
            "w-full h-14 flex items-center justify-center transition-colors rounded-[4px] relative",
            isOpportunitiesActive
              ? "text-white bg-white/10"
              : "text-white/60 hover:text-white hover:bg-white/5"
          )}
        >
          <Tag className="w-6 h-6" />
          {isOpportunitiesActive && (
            <div className="absolute left-0 top-0 w-1 h-full bg-[#E41C24] rounded-r" />
          )}
        </button>
        <button className="w-full h-14 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors rounded-[4px]">
          <Wrench className="w-6 h-6" />
        </button>
        <button className="w-full h-14 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors rounded-[4px]">
          <FileText className="w-6 h-6" />
        </button>
        <button className="w-full h-14 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors rounded-[4px]">
          <Clock className="w-6 h-6" />
        </button>
        <button className="w-full h-14 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors rounded-[4px]">
          <Megaphone className="w-6 h-6" />
        </button>

        {/* Reports Icon - navigates to root page */}
        <button
          onClick={() => router.push("/")}
          className={cn(
            "w-full h-14 flex items-center justify-center transition-colors rounded-[4px] relative",
            isRootPageActive
              ? "text-white bg-white/10"
              : "text-white/60 hover:text-white hover:bg-white/5"
          )}
        >
          <BarChart3 className="w-6 h-6" />
          {isRootPageActive && (
            <div className="absolute left-0 top-0 w-1 h-full bg-[#E41C24] rounded-r" />
          )}
        </button>
      </div>
    </div>
  )
}
