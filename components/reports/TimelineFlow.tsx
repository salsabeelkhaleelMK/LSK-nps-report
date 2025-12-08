"use client"

import { useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Trash2, ChevronDown, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useLanguage } from "@/contexts/LanguageContext"

export type StepType = "ai-call" | "email" | "sms"

export interface TimelineStep {
  id: string
  type: StepType
  delay: number
  settings: AICallSettings | EmailSettings | SMSSettings
}

export interface AICallSettings {
  startAfter: number
  retryInterval: number
  maxRetries: number
  voiceType: string
  callWindowFrom: string
  callWindowTo: string
  personaScript: string
}

export interface EmailSettings {
  template: string
}

export interface SMSSettings {
  template: string
}

interface TimelineFlowProps {
  steps: TimelineStep[]
  onChange: (steps: TimelineStep[]) => void
  triggerDays?: number
  onTriggerChange?: (days: number) => void
}

const stepTypeLabels: Record<StepType, string> = {
  "ai-call": "Send AI Call",
  email: "Send Email",
  sms: "Send SMS",
}

const EMAIL_TEMPLATES = [
  "24 hour Notification Appointment - at the customer's site",
  "24 hour Notification Appointment - at the dealership",
  "Event notification to the customer",
  "Event Notification to Organiser Event notification to the customer",
  "Event reminder to the organiser",
  "Leadspark - owner not recognized",
  "LeadSparK - Task warning",
  "LeadSparK login credentials",
  "New lead received",
  "New record assigned",
  "Task assigned to the team",
  "Update brand alias",
  "{{ channel_integration.name }} integration - User sync failure",
  "%dealerName%.leadspark.app",
  "OEM Instance - Receive Leads",
]

const SMS_TEMPLATES = [
  "24 hour notification SMS appointment - customer site",
  "24 hour notification SMS appointment - dealership",
  "Event notification to the customer",
  "Event reminder to the organiser",
]

function SortableStep({
  step,
  steps,
  onRemove,
  onUpdate,
}: {
  step: TimelineStep
  steps: TimelineStep[]
  onRemove: () => void
  onUpdate: (step: TimelineStep) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: step.id })
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const renderSettings = () => {
    switch (step.type) {
      case "ai-call":
        const aiSettings = step.settings as AICallSettings
        return (
          <div className="space-y-4">
            <h4 className="font-medium text-sm">{t("timeline.aiAgentSettings")}</h4>
            <p className="text-sm text-muted-foreground">{t("timeline.aiAgentDescription")}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("timeline.startAfter")}</Label>
                <Input
                  type="number"
                  value={aiSettings.startAfter}
                  onChange={(e) =>
                    onUpdate({
                      ...step,
                      settings: { ...aiSettings, startAfter: Number.parseInt(e.target.value) || 0 },
                    })
                  }
                />
                <p className="text-xs text-muted-foreground">{t("timeline.startAfterDescription")}</p>
              </div>
              <div className="space-y-2">
                <Label>{t("timeline.retryInterval")}</Label>
                <Input
                  type="number"
                  value={aiSettings.retryInterval}
                  onChange={(e) =>
                    onUpdate({
                      ...step,
                      settings: { ...aiSettings, retryInterval: Number.parseInt(e.target.value) || 0 },
                    })
                  }
                />
                <p className="text-xs text-muted-foreground">{t("timeline.retryIntervalDescription")}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("timeline.maxRetries")}</Label>
                <Input
                  type="number"
                  value={aiSettings.maxRetries}
                  onChange={(e) =>
                    onUpdate({
                      ...step,
                      settings: { ...aiSettings, maxRetries: Number.parseInt(e.target.value) || 0 },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>{t("timeline.voiceType")}</Label>
                <Select
                  value={aiSettings.voiceType}
                  onValueChange={(value) => onUpdate({ ...step, settings: { ...aiSettings, voiceType: value } })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female1">Female 1</SelectItem>
                    <SelectItem value="female2">Female 2</SelectItem>
                    <SelectItem value="male1">Male 1</SelectItem>
                    <SelectItem value="male2">Male 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("timeline.callWindowFrom")}</Label>
                <div className="relative">
                  <Input
                    type="time"
                    value={aiSettings.callWindowFrom}
                    onChange={(e) => onUpdate({ ...step, settings: { ...aiSettings, callWindowFrom: e.target.value } })}
                  />
                  <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t("timeline.callWindowTo")}</Label>
                <div className="relative">
                  <Input
                    type="time"
                    value={aiSettings.callWindowTo}
                    onChange={(e) => onUpdate({ ...step, settings: { ...aiSettings, callWindowTo: e.target.value } })}
                  />
                  <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("timeline.personaScript")}</Label>
              <Textarea
                value={aiSettings.personaScript}
                onChange={(e) => onUpdate({ ...step, settings: { ...aiSettings, personaScript: e.target.value } })}
                rows={4}
                placeholder="Hello, this is Sarah from AutoHaus. I'm calling to follow up on your recent experience with us..."
              />
              <p className="text-xs text-muted-foreground">{t("timeline.personaScriptDescription")}</p>
            </div>
          </div>
        )

      case "email":
        const emailSettings = step.settings as EmailSettings
        return (
          <div className="space-y-4">
            <h4 className="font-medium text-sm">{t("timeline.emailTemplate")}</h4>
            <p className="text-sm text-muted-foreground">{t("timeline.emailTemplateDescription")}</p>

            <div className="space-y-2">
              
              <Select
                value={emailSettings.template}
                onValueChange={(value) => onUpdate({ ...step, settings: { template: value } })}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder={t("timeline.selectTemplatePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {EMAIL_TEMPLATES.map((template) => (
                    <SelectItem key={template} value={template}>
                      {template}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case "sms":
        const smsSettings = step.settings as SMSSettings
        return (
          <div className="space-y-4">
            <h4 className="font-medium text-sm">{t("timeline.smsTemplate")}</h4>
            <p className="text-sm text-muted-foreground">{t("timeline.smsTemplateDescription")}</p>

            <div className="space-y-2">
              
              <Select
                value={smsSettings.template}
                onValueChange={(value) => onUpdate({ ...step, settings: { template: value } })}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder={t("timeline.selectTemplatePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {SMS_TEMPLATES.map((template) => (
                    <SelectItem key={template} value={template}>
                      {template}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-white border-2 border-gray-200 rounded-[4px] overflow-hidden transition-all",
        isDragging && "opacity-50 shadow-lg",
        isOpen && "border-blue-200",
      )}
    >
      <div className="flex items-center gap-3 p-4 bg-white">
        <button
          className="touch-none cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5" />
        </button>

        <span className="text-sm font-semibold text-gray-500 min-w-[32px]">
          #{steps.findIndex((s) => s.id === step.id) + 1}
        </span>

        <Select
          value={step.type}
          onValueChange={(value) =>
            onUpdate({
              ...step,
              type: value as StepType,
            })
          }
        >
          <SelectTrigger className="flex-1 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ai-call">{t("timeline.sendAiCall")}</SelectItem>
            <SelectItem value="email">{t("timeline.sendEmail")}</SelectItem>
            <SelectItem value="sms">{t("timeline.sendSms")}</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 whitespace-nowrap">{t("timeline.delay")}</span>
          <Input
            type="number"
            value={step.delay}
            onChange={(e) => onUpdate({ ...step, delay: Number.parseInt(e.target.value) || 0 })}
            className="w-20 bg-white"
            min="0"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-[#E41C24] hover:text-[#C11119] hover:bg-red-50"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors border-t border-gray-200">
            <span className="font-medium text-sm text-gray-700">{t("timeline.settings")}</span>
            <ChevronDown className={cn("h-4 w-4 text-gray-500 transition-transform", isOpen && "rotate-180")} />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 py-4 bg-gray-50 border-t border-gray-200">{renderSettings()}</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export function TimelineFlow({ steps, onChange, triggerDays = 7, onTriggerChange }: TimelineFlowProps) {
  const { t } = useLanguage()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = steps.findIndex((step) => step.id === active.id)
      const newIndex = steps.findIndex((step) => step.id === over.id)

      onChange(arrayMove(steps, oldIndex, newIndex))
    }
  }

  const handleAddStep = () => {
    const newStep: TimelineStep = {
      id: `step-${Date.now()}`,
      type: "email",
      delay: 0,
      settings: {
        template: EMAIL_TEMPLATES[0],
      },
    }
    onChange([...steps, newStep])
  }

  const handleRemove = (id: string) => {
    onChange(steps.filter((step) => step.id !== id))
  }

  const handleUpdate = (updatedStep: TimelineStep) => {
    onChange(steps.map((step) => (step.id === updatedStep.id ? updatedStep : step)))
  }

  return (
    <div className="space-y-4">
      <div className="bg-white border-2 border-gray-200 rounded-[4px] p-6 mb-6">
        <div className="flex items-center gap-4">
          <Label className="text-sm font-medium text-[#333333] whitespace-nowrap">{t("settings.triggerLabel")}</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={triggerDays}
              onChange={(e) => onTriggerChange?.(Number.parseInt(e.target.value) || 0)}
              className="w-24 bg-white"
              min="0"
            />
            <span className="text-sm text-gray-600">{t("settings.daysAfterPurchase")}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {t("settings.triggerLabel")} {triggerDays} {t("settings.daysAfterPurchase")}
        </p>
      </div>

      <div className="flex items-center justify-end mb-6">
        <Button onClick={handleAddStep} variant="outline" size="sm" className="bg-white rounded-[4px]">
          <span className="mr-2">+</span>
          {t("timeline.addStep")}
        </Button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={steps.map((step) => step.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {steps.map((step) => (
              <SortableStep
                key={step.id}
                step={step}
                steps={steps}
                onRemove={() => handleRemove(step.id)}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {steps.length === 0 && (
        <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-[4px] border-2 border-dashed border-gray-200">
          <p className="text-sm">{t("timeline.addStep")}</p>
        </div>
      )}
    </div>
  )
}
