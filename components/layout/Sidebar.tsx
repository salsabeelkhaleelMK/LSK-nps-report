"use client"

import { useState } from "react"
import { Users, Building2, Tag, Wrench, FileText, Clock, BarChart3, Plus, Megaphone } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export function Sidebar() {
  const [reportsSubmenuOpen, setReportsSubmenuOpen] = useState(false)
  const { t } = useLanguage()

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
        <button className="w-full h-14 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors rounded-[4px]">
          <Tag className="w-6 h-6" />
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

        {/* Reports Icon with Submenu - added default selected state */}
        <div
          className="relative"
          onMouseEnter={() => setReportsSubmenuOpen(true)}
          onMouseLeave={() => setReportsSubmenuOpen(false)}
        >
          <button className="w-full h-14 flex items-center justify-center text-white bg-white/10 transition-colors relative rounded-[4px]">
            <BarChart3 className="w-6 h-6" />
            <div className="absolute left-0 top-0 w-1 h-full bg-[#E41C24] rounded-r" />
          </button>

          {/* Submenu - positioned fixed to overlay everything */}
          {reportsSubmenuOpen && (
            <div className="fixed left-[72px] w-[240px] bg-[#2a2a2a] shadow-xl z-[100] rounded-r-[4px] overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-3 text-white">
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-base font-semibold">{t("sidebar.reports")}</span>
                </div>
              </div>
              <div className="py-2">
                <button className="w-full px-6 py-3 text-left text-sm text-white/70 hover:bg-white/10 transition-colors">
                  {t("sidebar.sales")}
                </button>
                <button className="w-full px-6 py-3 text-left text-sm text-white bg-white/10">
                  {t("sidebar.postpurchaseNPS")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
