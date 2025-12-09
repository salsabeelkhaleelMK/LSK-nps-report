"use client"

import { useState } from "react"
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Pause,
  SkipForward,
  Clock,
  Zap,
  Square
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface TimelineEvent {
  id: string
  time: string
  date?: string
  type: "action" | "decision" | "outcome" | "scheduled"
  title: string
  description?: string
  icon: React.ReactNode
  status: "completed" | "in-progress" | "scheduled" | "paused" | "skipped" | "cancelled"
  rating?: number
  canPause?: boolean
  canSkip?: boolean
  canCancel?: boolean
}

// Sample events showing feedback collection workflow
const mockTimelineEvents: TimelineEvent[] = [
  {
    id: "1",
    time: "9:00 AM",
    date: "Tuesday 25 March 2025",
    type: "action",
    title: "Agent sent Email",
    description: "Customer contacted by email for post-purchase feedback",
    icon: <Mail className="w-4 h-4" />,
    status: "completed",
  },
  {
    id: "2",
    time: "1:00 PM",
    type: "decision",
    title: "Decision: No response detected",
    description: "24h timer is at 16%. Proceeding to SMS.",
    icon: <MessageSquare className="w-4 h-4" />,
    status: "completed",
  },
  {
    id: "3",
    time: "3:00 PM",
    type: "decision",
    title: "Decision: SMS delivered but ignored",
    description: "Proceeding to AI Call.",
    icon: <MessageSquare className="w-4 h-4" />,
    status: "completed",
  },
  {
    id: "4",
    time: "3:05 PM",
    type: "action",
    title: "Action: AI Call initiated",
    description: "AI agent calling customer for feedback collection",
    icon: <Phone className="w-4 h-4" />,
    status: "in-progress",
    canPause: true,
    canSkip: true,
    canCancel: true,
  },
  {
    id: "5",
    time: "3:07 PM",
    type: "outcome",
    title: "Outcome: Customer rated 1 star",
    description: "Feedback: 1/10",
    icon: <AlertCircle className="w-4 h-4" />,
    status: "completed",
    rating: 1,
  },
  {
    id: "7",
    time: "4:00 PM",
    type: "scheduled",
    title: "Follow-up task: Human agent review",
    description: "Scheduled for today",
    icon: <Clock className="w-4 h-4" />,
    status: "scheduled",
    canCancel: true,
  },
]

// Alternative timeline with positive feedback (for demonstration)
export const alternativeTimelineEvents: TimelineEvent[] = [
  {
    id: "1",
    time: "9:00 AM",
    date: "Monday 24 March 2025",
    type: "action",
    title: "Agent sent Email",
    description: "Customer contacted by email for post-purchase feedback",
    icon: <Mail className="w-4 h-4" />,
    status: "completed",
  },
  {
    id: "2",
    time: "2:00 PM",
    type: "action",
    title: "Action: AI Call initiated",
    description: "AI agent calling customer for feedback collection",
    icon: <Phone className="w-4 h-4" />,
    status: "completed",
  },
  {
    id: "3",
    time: "2:05 PM",
    type: "outcome",
    title: "Outcome: Customer rated 9/10",
    description: "Feedback: 9/10 - Customer satisfied",
    icon: <CheckCircle2 className="w-4 h-4" />,
    status: "completed",
    rating: 9,
  },
]

export function ActivityTimeline() {
  const [events, setEvents] = useState<TimelineEvent[]>(mockTimelineEvents)
  const [pausedEvents, setPausedEvents] = useState<Set<string>>(new Set())
  const [skippedEvents, setSkippedEvents] = useState<Set<string>>(new Set())
  const [cancelledEvents, setCancelledEvents] = useState<Set<string>>(new Set())

  const handlePause = (eventId: string) => {
    setPausedEvents((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(eventId)) {
        newSet.delete(eventId)
      } else {
        newSet.add(eventId)
      }
      return newSet
    })
  }

  const handleSkip = (eventId: string) => {
    setSkippedEvents((prev) => new Set(prev).add(eventId))
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, status: "skipped" as const } : event
      )
    )
  }

  const handleCancel = (eventId: string) => {
    setCancelledEvents((prev) => new Set(prev).add(eventId))
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, status: "cancelled" as const } : event
      )
    )
  }

  const getEventColor = (event: TimelineEvent) => {
    if (cancelledEvents.has(event.id)) return "text-gray-400"
    if (pausedEvents.has(event.id)) return "text-yellow-600"
    if (skippedEvents.has(event.id)) return "text-gray-400"
    
    switch (event.status) {
      case "completed":
        return "text-green-600"
      case "in-progress":
        return "text-blue-600"
      case "scheduled":
        return "text-gray-400"
      case "paused":
        return "text-yellow-600"
      case "skipped":
        return "text-gray-400"
      case "cancelled":
        return "text-gray-400"
      default:
        return "text-gray-600"
    }
  }

  const getEventBgColor = (event: TimelineEvent) => {
    if (cancelledEvents.has(event.id)) return "bg-gray-50 border-gray-200"
    if (pausedEvents.has(event.id)) return "bg-yellow-50 border-yellow-200"
    if (skippedEvents.has(event.id)) return "bg-gray-50 border-gray-200"
    
    switch (event.status) {
      case "completed":
        return "bg-green-50 border-green-200"
      case "in-progress":
        return "bg-blue-50 border-blue-200"
      case "scheduled":
        return "bg-gray-50 border-gray-200"
      case "cancelled":
        return "bg-gray-50 border-gray-200"
      default:
        return "bg-white border-gray-200"
    }
  }

  const getIconColor = (event: TimelineEvent) => {
    if (cancelledEvents.has(event.id)) return "text-gray-400"
    if (pausedEvents.has(event.id)) return "text-yellow-600"
    if (skippedEvents.has(event.id)) return "text-gray-400"
    
    switch (event.status) {
      case "completed":
        return "text-green-600"
      case "in-progress":
        return "text-blue-600"
      case "scheduled":
        return "text-gray-400"
      case "cancelled":
        return "text-gray-400"
      default:
        return "text-gray-600"
    }
  }

  let lastDate = ""

  return (
    <div className="space-y-6">
      <div className="relative pl-2">
        {/* Timeline line */}
        <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-4">
          {events.map((event, index) => {
            const showDate = event.date && event.date !== lastDate
            if (showDate) lastDate = event.date || ""

            const isLive = event.status === "in-progress" && !pausedEvents.has(event.id) && !cancelledEvents.has(event.id)
            const isPaused = pausedEvents.has(event.id)
            const isSkipped = skippedEvents.has(event.id)
            const isCancelled = cancelledEvents.has(event.id)

            return (
              <div key={event.id} className="relative">
                {/* Date header */}
                {showDate && (
                  <div className="mb-2 ml-10 text-xs font-semibold text-gray-600">
                    {event.date}
                  </div>
                )}

                <div className="flex gap-4">
                  {/* Timeline dot and line */}
                  <div className="flex flex-col items-center relative z-10">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white",
                        getEventBgColor(event),
                        getEventColor(event)
                      )}
                    >
                      <div className={cn(getIconColor(event), "scale-75")}>{event.icon}</div>
                    </div>
                    {index < events.length - 1 && (
                      <div className="w-0.5 h-4 bg-gray-200 mt-1" />
                    )}
                  </div>

                  {/* Event content */}
                  <div className="flex-1 pb-4">
                    <div
                      className={cn(
                        "p-3 rounded-lg border transition-all",
                        getEventBgColor(event),
                        isLive && "ring-2 ring-blue-400 ring-opacity-50"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                            <span className="text-xs font-medium text-gray-600">
                              {event.time}
                            </span>
                            <span
                              className={cn(
                                "text-[10px] font-medium px-1.5 py-0.5 rounded",
                                event.type === "action" && "bg-blue-100 text-blue-700",
                                event.type === "decision" && "bg-purple-100 text-purple-700",
                                event.type === "outcome" && "bg-green-100 text-green-700",
                                event.type === "scheduled" && "bg-gray-100 text-gray-700"
                              )}
                            >
                              {event.type.toUpperCase()}
                            </span>
                            {isLive && (
                              <Badge
                                variant="default"
                                className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 h-5"
                              >
                                <span className="relative flex items-center">
                                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                                  <Zap className="w-2.5 h-2.5 mr-0.5 relative" />
                                  <span className="relative text-[10px]">Live</span>
                                </span>
                              </Badge>
                            )}
                            {isPaused && (
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300 text-[10px] px-1.5 py-0.5 h-5">
                                Paused
                              </Badge>
                            )}
                            {isSkipped && (
                              <Badge variant="outline" className="bg-gray-100 text-gray-500 border-gray-300 text-[10px] px-1.5 py-0.5 h-5">
                                Skipped
                              </Badge>
                            )}
                            {event.status === "scheduled" && !isCancelled && (
                              <Badge variant="outline" className="bg-gray-100 text-gray-500 border-gray-300 text-[10px] px-1.5 py-0.5 h-5">
                                Scheduled
                              </Badge>
                            )}
                            {isCancelled && (
                              <Badge variant="outline" className="bg-gray-100 text-gray-500 border-gray-300 text-[10px] px-1.5 py-0.5 h-5">
                                Cancelled
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm font-semibold text-gray-900 mb-1">
                            {event.title}
                          </div>
                          {event.description && (
                            <div className="text-xs text-gray-600 mb-2">
                              {event.description}
                            </div>
                          )}
                          {event.rating && (
                            <div className="flex items-center gap-2 mt-1.5">
                              <span className="text-xs text-gray-600">Rating:</span>
                              <div className="flex items-center gap-0.5">
                                {[...Array(10)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={cn(
                                      "w-2 h-2 rounded-full",
                                      i < event.rating!
                                        ? "bg-red-500"
                                        : "bg-gray-200"
                                    )}
                                  />
                                ))}
                                <span className="ml-1.5 text-xs font-medium text-gray-700">
                                  {event.rating}/10
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action buttons */}
                        {!isCancelled && (
                          <div className="flex gap-1">
                            {(event.canPause || event.canSkip) && !isSkipped && (
                              <>
                                {event.canPause && (
                                  <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    className={cn(
                                      "w-7 h-7 rounded-full",
                                      isPaused && "bg-yellow-100 text-yellow-700"
                                    )}
                                    onClick={() => handlePause(event.id)}
                                    title={isPaused ? "Resume" : "Pause"}
                                  >
                                    <Pause className="w-3 h-3" />
                                  </Button>
                                )}
                                {event.canSkip && (
                                  <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    className="w-7 h-7 rounded-full hover:bg-red-50 hover:text-red-700"
                                    onClick={() => handleSkip(event.id)}
                                    title="Skip"
                                  >
                                    <SkipForward className="w-3 h-3" />
                                  </Button>
                                )}
                              </>
                            )}
                            {event.canCancel && (event.status === "scheduled" || event.status === "in-progress") && (
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                className="w-7 h-7 rounded-full hover:bg-red-50 hover:text-red-700"
                                onClick={() => handleCancel(event.id)}
                                title="Stop"
                              >
                                <Square className="w-3 h-3 fill-current" />
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Add note input */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Add a note..."
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}

