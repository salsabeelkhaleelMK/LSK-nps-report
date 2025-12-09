"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { 
  Phone, 
  Mail, 
  MapPin, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp,
  MoreVertical,
  Calendar,
  User,
  Link as LinkIcon
} from "lucide-react"
import { ActivityTimeline } from "./ActivityTimeline"
import type { OpportunityDetail } from "@/lib/data/opportunities-data"
import { cn } from "@/lib/utils"

interface OpportunityProfileProps {
  opportunity: OpportunityDetail
}

export function OpportunityProfile({ opportunity }: OpportunityProfileProps) {
  const [showEmptyFields, setShowEmptyFields] = useState(false)
  const [contactDetailsOpen, setContactDetailsOpen] = useState(true)
  const [otherNegotiationsOpen, setOtherNegotiationsOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[#F7F7F7] w-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <div className="border-b bg-white px-6 py-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <h1 className="text-lg font-semibold">{opportunity.header.title}</h1>
                {opportunity.header.relatedLead && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {opportunity.header.relatedLead}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{opportunity.header.dates.created}</span>
                <span>{opportunity.header.dates.updated}</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Reopen opportunity
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            {opportunity.progress.stages.map((stage, idx) => (
              <div key={idx} className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={cn(
                      "h-2 flex-1 rounded",
                      stage.completed
                        ? stage.active
                          ? "bg-green-500"
                          : "bg-green-300"
                        : "bg-gray-200"
                    )}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{stage.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Contact Info */}
          <div className="w-80 border-r bg-white p-4 overflow-y-auto flex-shrink-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <div className="font-semibold">{opportunity.contact.name}</div>
              </div>
            </div>

            {/* Contact Details */}
            <Collapsible open={contactDetailsOpen} onOpenChange={setContactDetailsOpen}>
              <CollapsibleTrigger className="w-full flex items-center justify-between py-2 text-sm font-medium">
                Contact details
                {contactDetailsOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-3 mt-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{opportunity.contact.phone}</span>
                  {opportunity.contact.hasWarning && (
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{opportunity.contact.email}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <span>{opportunity.contact.address}</span>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Other Negotiations */}
            <Collapsible open={otherNegotiationsOpen} onOpenChange={setOtherNegotiationsOpen} className="mt-4">
              <CollapsibleTrigger className="w-full flex items-center justify-between py-2 text-sm font-medium">
                Other negotiations {opportunity.details.negotiations}
                {otherNegotiationsOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="text-sm text-muted-foreground">No other negotiations</div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Right Panel - Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            <Tabs defaultValue="details" className="flex-1 flex flex-col overflow-hidden">
              <div className="border-b px-6">
                <TabsList className="bg-transparent h-auto p-0">
                  <TabsTrigger value="details" className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="tasks" className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary relative">
                    Tasks
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="details" className="flex-1 overflow-y-auto p-6 m-0">
                {/* Sub-tabs */}
                <div className="border-b mb-6">
                  <div className="flex gap-4">
                    <button className="px-4 py-2 border-b-2 border-primary text-sm font-medium">
                      Negotiations {opportunity.details.negotiations}
                    </button>
                    <button className="px-4 py-2 border-b-2 border-transparent text-sm text-muted-foreground hover:text-foreground">
                      Purchase {opportunity.details.purchases}
                    </button>
                    <button className="px-4 py-2 border-b-2 border-transparent text-sm text-muted-foreground hover:text-foreground">
                      Trade-in {opportunity.details.tradeIns}
                    </button>
                    <button className="px-4 py-2 border-b-2 border-transparent text-sm text-muted-foreground hover:text-foreground">
                      Attachments {opportunity.details.attachments}
                    </button>
                    <button className="px-4 py-2 border-b-2 border-transparent text-sm text-muted-foreground hover:text-foreground">
                      Conversations {opportunity.details.conversations}
                    </button>
                  </div>
                </div>

                {/* Offers Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold">Offers {opportunity.offers.count}</h3>
                  </div>
                </div>

                {/* Delivery Section */}
                <div className="mb-6 p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold">Delivery</h3>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <input
                          type="checkbox"
                          checked={showEmptyFields}
                          onChange={(e) => setShowEmptyFields(e.target.checked)}
                          className="w-4 h-4"
                        />
                        Show empty fields
                      </label>
                      <Button variant="ghost" size="icon-sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-muted-foreground mb-1">Contract date:</div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{opportunity.delivery.contractDate}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Vehicle driver</div>
                      <Button variant="outline" size="sm" className="mt-1">
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Link driver
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Winning Offer Section */}
                {opportunity.offers.winningOffer && (
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold">Winning Offer</h3>
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 text-sm text-muted-foreground">
                          <input
                            type="checkbox"
                            checked={showEmptyFields}
                            onChange={(e) => setShowEmptyFields(e.target.checked)}
                            className="w-4 h-4"
                          />
                          Show empty fields
                        </label>
                        <Button variant="ghost" size="icon-sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="text-muted-foreground mb-1">Contract date:</div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{opportunity.offers.winningOffer.contractDate}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1">Created:</div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{opportunity.offers.winningOffer.createdDate}</span>
                        </div>
                      </div>
                      {opportunity.offers.winningOffer.expectedDeliveryDate ? (
                        <div>
                          <div className="text-muted-foreground mb-1">Expected delivery date:</div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>{opportunity.offers.winningOffer.expectedDeliveryDate}</span>
                          </div>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" className="mt-2">
                          Add expected delivery date
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="tasks" className="flex-1 overflow-y-auto p-6 m-0">
                <div className="text-muted-foreground">No tasks yet</div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Activities Side Panel */}
      <div className="w-96 border-l bg-white flex flex-col overflow-hidden flex-shrink-0">
        <div className="border-b px-6 py-3 bg-white">
          <h2 className="text-sm font-semibold">Activity Summary</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <ActivityTimeline />
        </div>
      </div>

      {/* Right Sidebar - Action Icons */}
      <div className="w-16 border-l bg-white flex flex-col items-center py-4 gap-4 flex-shrink-0">
        <Button variant="ghost" size="icon" className="w-12 h-12">
          <Phone className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="w-12 h-12">
          <Mail className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="w-12 h-12">
          <Calendar className="w-5 h-5" />
        </Button>
        <div className="flex-1" />
        <Button variant="ghost" size="icon" className="w-12 h-12">
          <span className="text-lg">?</span>
        </Button>
      </div>
    </div>
  )
}

