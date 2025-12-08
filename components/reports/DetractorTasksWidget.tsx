"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface DetractorTask {
  id: string
  customerName: string
  ownerName: string
  status: "open" | "in-progress" | "completed"
  dueDate: Date
}

interface DetractorTasksWidgetProps {
  tasks: DetractorTask[]
}

export function DetractorTasksWidget({ tasks }: DetractorTasksWidgetProps) {
  const { t } = useLanguage()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200 rounded-[20px]"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200 rounded-[20px]"
      case "open":
        return "bg-amber-100 text-amber-800 border-amber-200 rounded-[20px]"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 rounded-[20px]"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in-progress":
        return t("badge.inProgress")
      case "open":
        return t("badge.open")
      case "completed":
        return t("badge.completed")
      default:
        return status
    }
  }

  return (
    <Card className="overflow-hidden rounded-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="bg-card px-6 py-6 border-b">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#E41C24]" />
          <h3 className="text-lg font-semibold text-[#333333]">{t("widget.detractorTasks")}</h3>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{t("widget.detractorSubtitle")}</p>
      </div>

      <div className="overflow-x-auto px-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("table.customer")}</TableHead>
              <TableHead>{t("table.owner")}</TableHead>
              <TableHead>{t("table.status")}</TableHead>
              <TableHead>{t("table.dueDate")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  {t("table.noTasks")}
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.customerName}</TableCell>
                  <TableCell>{task.ownerName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(task.status)}>
                      {getStatusLabel(task.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {task.dueDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
