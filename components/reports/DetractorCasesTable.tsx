"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { DetractorCase } from "@/lib/data/nps-data"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DetractorCasesTableProps {
  cases: DetractorCase[]
}

export function DetractorCasesTable({ cases }: DetractorCasesTableProps) {
  const [sortKey, setSortKey] = useState<keyof DetractorCase>("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const handleSort = (key: keyof DetractorCase) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortOrder("desc")
    }
  }

  const sortedCases = [...cases].sort((a, b) => {
    const aValue = a[sortKey]
    const bValue = b[sortKey]

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
    return 0
  })

  const getStatusColor = (status: DetractorCase["status"]) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "in-progress":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detractor Feedback</CardTitle>
        <CardDescription>Recent cases requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" size="sm" className="-ml-3 h-8" onClick={() => handleSort("customerName")}>
                    Customer
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="min-w-[300px]">Feedback</TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="-ml-3 h-8" onClick={() => handleSort("score")}>
                    Score
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="-ml-3 h-8" onClick={() => handleSort("date")}>
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="-ml-3 h-8" onClick={() => handleSort("status")}>
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCases.map((detractorCase) => (
                <TableRow key={detractorCase.id}>
                  <TableCell className="font-medium">{detractorCase.customerName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{detractorCase.feedback}</TableCell>
                  <TableCell>
                    <span className="font-semibold text-red-600 dark:text-red-400">{detractorCase.score}</span>
                  </TableCell>
                  <TableCell className="text-sm">{detractorCase.date.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(detractorCase.status)}>
                      {detractorCase.status.replace("-", " ")}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
