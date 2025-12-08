"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { TimelineFlow, type TimelineStep } from "./TimelineFlow"
import { OutcomesSettings } from "./OutcomesSettings"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/LanguageContext"

interface ReportSettingsDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (settings: ReportSettings) => void
}

export interface ReportSettings {
  status: string
  surveyId: string
  timelineSteps: TimelineStep[]
  triggerDays: number
  ratingScale: "1-5" | "1-10" // Added rating scale option
}

export function ReportSettingsDrawer({ open, onOpenChange, onSave }: ReportSettingsDrawerProps) {
  const { t } = useLanguage()

  const [settings, setSettings] = useState<ReportSettings>({
    status: "active",
    surveyId: "2",
    triggerDays: 7,
    ratingScale: "1-10", // Default to 1-10 scale
    timelineSteps: [
      {
        id: "step-1",
        type: "email",
        delay: 0,
        settings: {
          subject: "We'd love your feedback!",
          body: "Hi {{customerName}},\n\nThank you for choosing us! We'd appreciate if you could take a moment to share your feedback using this link: {{surveyLink}}\n\nBest regards,\nThe Team",
        },
      },
      {
        id: "step-2",
        type: "ai-call",
        delay: 3,
        settings: {
          startAfter: 24,
          retryInterval: 4,
          maxRetries: 3,
          voiceType: "female1",
          callWindowFrom: "09:00",
          callWindowTo: "18:00",
          personaScript:
            "Hello, this is Sarah from AutoHaus. I'm calling to follow up on your recent experience with us...",
        },
      },
    ],
  })

  const [surveyOpen, setSurveyOpen] = useState(false)

  const handleSave = () => {
    onSave?.(settings)
    onOpenChange(false)
  }

  const selectedSurvey = AVAILABLE_SURVEYS.find((survey) => survey.id === settings.surveyId)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto bg-white px-8">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-2xl font-bold text-[#333333]">{t("settings.title")}</SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          <Tabs defaultValue="basics">
            <TabsList className="grid w-full grid-cols-3 bg-transparent p-0 h-auto gap-0 mb-8">
              <TabsTrigger
                value="basics"
                className="data-[state=active]:bg-[#1e293b] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-500 rounded-[4px] border-0 py-3 text-base font-medium"
              >
                {t("settings.basics")}
              </TabsTrigger>
              <TabsTrigger
                value="timeline"
                className="data-[state=active]:bg-[#1e293b] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-500 rounded-[4px] border-0 py-3 text-base font-medium"
              >
                {t("settings.timeline")}
              </TabsTrigger>
              <TabsTrigger
                value="outcomes"
                className="data-[state=active]:bg-[#1e293b] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-500 rounded-[4px] border-0 py-3 text-base font-medium"
              >
                {t("settings.outcomes")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basics" className="mt-0">
              <div className="space-y-6 bg-white p-6 rounded-[4px] border border-gray-200">
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium text-[#333333]">
                    {t("settings.status")}
                  </Label>
                  <Select
                    value={settings.status}
                    onValueChange={(value) => setSettings({ ...settings, status: value })}
                  >
                    <SelectTrigger id="status" className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">{t("settings.statusActive")}</SelectItem>
                      <SelectItem value="paused">{t("settings.statusPaused")}</SelectItem>
                      <SelectItem value="draft">{t("settings.statusDraft")}</SelectItem>
                      <SelectItem value="completed">{t("settings.statusCompleted")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#333333]">{t("settings.survey")}</Label>
                  <Popover open={surveyOpen} onOpenChange={setSurveyOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={surveyOpen}
                        className="w-full justify-between font-normal bg-white"
                      >
                        {selectedSurvey ? selectedSurvey.name : t("settings.selectSurvey")}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
                      <Command>
                        <CommandInput placeholder={t("settings.searchSurveys")} />
                        <CommandList>
                          <CommandEmpty>{t("settings.noSurvey")}</CommandEmpty>
                          <CommandGroup>
                            {AVAILABLE_SURVEYS.map((survey) => (
                              <CommandItem
                                key={survey.id}
                                value={survey.name}
                                onSelect={() => {
                                  setSettings({ ...settings, surveyId: survey.id })
                                  setSurveyOpen(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    settings.surveyId === survey.id ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {survey.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#333333] py-0 my-4">{t("settings.ratingScale")}</Label>
                  <RadioGroup
                    value={settings.ratingScale}
                    onValueChange={(value: "1-5" | "1-10") => setSettings({ ...settings, ratingScale: value })}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-5" id="scale-1-5" />
                      <Label htmlFor="scale-1-5" className="font-normal text-[#333333] cursor-pointer">
                        {t("settings.scale1to5")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-10" id="scale-1-10" />
                      <Label htmlFor="scale-1-10" className="font-normal text-[#333333] cursor-pointer">
                        {t("settings.scale1to10")}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="mt-0">
              <TimelineFlow
                steps={settings.timelineSteps}
                onChange={(steps) => setSettings({ ...settings, timelineSteps: steps })}
                triggerDays={settings.triggerDays}
                onTriggerChange={(days) => setSettings({ ...settings, triggerDays: days })}
              />
            </TabsContent>

            <TabsContent value="outcomes" className="mt-0">
              <OutcomesSettings />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            className="flex-1 bg-white border-[#DDDDDD] text-[#333333] hover:bg-gray-50 rounded-[4px]"
            onClick={() => onOpenChange(false)}
          >
            {t("settings.cancel")}
          </Button>
          <Button className="flex-1 bg-[#E41C24] hover:bg-[#C11119] text-white rounded-[4px]" onClick={handleSave}>
            {t("settings.save")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

const AVAILABLE_SURVEYS = [
  { id: "1", name: "Survey per opportunità dimenticate" },
  { id: "2", name: "Survey post preventivo o intervento in officina" },
  { id: "3", name: "Survey per verifica del contratto" },
]
