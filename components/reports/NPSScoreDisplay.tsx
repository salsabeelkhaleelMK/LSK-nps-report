import { cn } from "@/lib/utils"

interface NPSScoreDisplayProps {
  score: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

export function NPSScoreDisplay({ score, size = "md", showLabel = false }: NPSScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600 dark:text-green-400"
    if (score >= 50) return "text-amber-600 dark:text-amber-400"
    return "text-red-600 dark:text-red-400"
  }

  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
  }

  return (
    <div className="flex flex-col items-center">
      <div className={cn("font-bold tabular-nums", sizeClasses[size], getScoreColor(score))}>{score}</div>
      {showLabel && <div className="text-sm text-muted-foreground mt-1">NPS Score</div>}
    </div>
  )
}
