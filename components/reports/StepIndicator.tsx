import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: number
  title: string
  completed: boolean
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Desktop: Horizontal */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors",
                  step.completed
                    ? "bg-primary text-primary-foreground"
                    : step.id === currentStep
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {step.completed ? <Check className="h-5 w-5" /> : step.id}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium text-center",
                  step.id === currentStep ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={cn("flex-1 h-0.5 mx-4 transition-colors", step.completed ? "bg-primary" : "bg-muted")} />
            )}
          </div>
        ))}
      </div>

      {/* Mobile: Vertical */}
      <div className="flex flex-col md:hidden space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start">
            <div className="flex flex-col items-center mr-4">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-colors",
                  step.completed
                    ? "bg-primary text-primary-foreground"
                    : step.id === currentStep
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {step.completed ? <Check className="h-4 w-4" /> : step.id}
              </div>
              {index < steps.length - 1 && (
                <div className={cn("w-0.5 h-12 my-2 transition-colors", step.completed ? "bg-primary" : "bg-muted")} />
              )}
            </div>
            <div className="flex-1 pt-1">
              <span
                className={cn(
                  "text-sm font-medium",
                  step.id === currentStep ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
