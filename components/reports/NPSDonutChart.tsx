"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import type { NPSDistribution } from "@/lib/data/nps-data"

interface NPSDonutChartProps {
  distribution: NPSDistribution
  npsScore: number
}

export function NPSDonutChart({ distribution, npsScore }: NPSDonutChartProps) {
  const data = [
    { name: "Promoters", value: distribution.promoters, color: "#22c55e" },
    { name: "Passives", value: distribution.passives, color: "#f59e0b" },
    { name: "Detractors", value: distribution.detractors, color: "#ef4444" },
  ]

  const total = distribution.promoters + distribution.passives + distribution.detractors

  return (
    <Card>
      <CardHeader>
        <CardTitle>Response Distribution</CardTitle>
        <CardDescription>Breakdown of customer sentiment</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            promoters: { label: "Promoters", color: "#22c55e" },
            passives: { label: "Passives", color: "#f59e0b" },
            detractors: { label: "Detractors", color: "#ef4444" },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground text-3xl font-bold"
              >
                {npsScore}
              </text>
              <Legend
                verticalAlign="bottom"
                height={36}
                content={({ payload }) => (
                  <div className="flex justify-center gap-6 mt-4">
                    {payload?.map((entry, index) => (
                      <div key={`legend-${index}`} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-sm text-muted-foreground">
                          {entry.value}: {entry.payload?.value} ({((entry.payload?.value / total) * 100).toFixed(1)}%)
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
