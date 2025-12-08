import { Badge } from "@/components/ui/badge"
import type { ReportStatus } from "@/lib/data/nps-data"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: ReportStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    active: {
      label: "Active",
      className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-[20px]",
    },
    paused: {
      label: "Paused",
      className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 rounded-[20px]",
    },
    draft: {
      label: "Draft",
      className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400 rounded-[20px]",
    },
    completed: {
      label: "Completed",
      className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-[20px]",
    },
  }

  const { label, className } = config[status]

  return (
    <Badge variant="secondary" className={cn("font-medium px-3", className)}>
      {label}
    </Badge>
  )
}
