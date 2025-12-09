export interface Opportunity {
  id: string
  customer: {
    name: string
    type: string
    source?: string
  }
  vehicle: {
    name: string
    price: string
    tags: string[]
  }
  assignee: {
    name: string
    department: string
    location: string
  }
  status: {
    stage: "Won" | "Open" | "Negotiation" | "Lost"
    tags: string[]
    createdDate: string
    expectedDate?: string
  }
}

export interface OpportunityDetail extends Opportunity {
  header: {
    title: string
    subtitle: string
    amount: string
    dates: {
      created: string
      updated: string
    }
    relatedLead?: string
  }
  progress: {
    stages: Array<{
      label: string
      active: boolean
      completed: boolean
    }>
  }
  contact: {
    name: string
    phone: string
    email: string
    address: string
    hasWarning?: boolean
  }
  details: {
    negotiations: number
    purchases: number
    tradeIns: number
    attachments: number
    conversations: number
  }
  offers: {
    count: number
    winningOffer?: {
      contractDate: string
      createdDate: string
      expectedDeliveryDate?: string
    }
  }
  delivery: {
    contractDate: string
    vehicleDriver?: string
  }
}

export const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    customer: {
      name: "Damiano Costa",
      type: "Generic sales",
      source: "Automobile.it",
    },
    vehicle: {
      name: "Nissan Qashqai",
      price: "€46,500",
      tags: ["New", "Trade-in"],
    },
    assignee: {
      name: "Alessio Bianco",
      department: "Vendite (usato)",
      location: "Milano",
    },
    status: {
      stage: "Won",
      tags: ["FinanziamentoPermuta"],
      createdDate: "12/11/2025",
      expectedDate: "07/12/2025",
    },
  },
  {
    id: "2",
    customer: {
      name: "Flavia Gatti",
      type: "Generic sales",
    },
    vehicle: {
      name: "Volkswagen Polo",
      price: "€26,750",
      tags: ["New", "Trade-in"],
    },
    assignee: {
      name: "Mario Rossi",
      department: "Vendite (nuovo)",
      location: "Milano",
    },
    status: {
      stage: "Won",
      tags: ["FinanziamentoPermuta"],
      createdDate: "12/11/2025",
    },
  },
  {
    id: "3",
    customer: {
      name: "Annunziata Colombelli",
      type: "Generic sales",
      source: "Autoscout24.it",
    },
    vehicle: {
      name: "Mini Mini 3 Porte",
      price: "€36,250",
      tags: ["New", "Trade-in"],
    },
    assignee: {
      name: "Tommaso Celeste",
      department: "Vendite (usato)",
      location: "Firenze",
    },
    status: {
      stage: "Won",
      tags: ["FinanziamentoPermuta"],
      createdDate: "12/11/2025",
      expectedDate: "07/12/2025",
    },
  },
  {
    id: "4",
    customer: {
      name: "Massimo Carbonelli",
      type: "Generic sales",
      source: "Add-sales.getwebspark.com",
    },
    vehicle: {
      name: "Mini Mini 3 Porte",
      price: "€43,750",
      tags: ["New", "Trade-in"],
    },
    assignee: {
      name: "Alessio Bianco",
      department: "Vendite (usato)",
      location: "Milano",
    },
    status: {
      stage: "Won",
      tags: ["FinanziamentoPermuta"],
      createdDate: "12/11/2025",
      expectedDate: "07/12/2025",
    },
  },
]

export function getOpportunities(): Opportunity[] {
  return mockOpportunities
}

export function getOpportunityById(id: string): OpportunityDetail | null {
  const opportunity = mockOpportunities.find((opp) => opp.id === id)
  if (!opportunity) return null

  return {
    ...opportunity,
    header: {
      title: `${opportunity.customer.name} • ${opportunity.customer.type} • ${opportunity.customer.source || "Direct"} • ${opportunity.vehicle.price}`,
      subtitle: opportunity.vehicle.name,
      amount: opportunity.vehicle.price,
      dates: {
        created: opportunity.status.createdDate,
        updated: opportunity.status.expectedDate || opportunity.status.createdDate,
      },
      relatedLead: opportunity.customer.source ? "Related lead" : undefined,
    },
    progress: {
      stages: [
        { label: "Open opportunity", active: false, completed: true },
        { label: "Opportunity in negotiation", active: false, completed: true },
        { label: "Closed Won", active: true, completed: true },
      ],
    },
    contact: {
      name: opportunity.customer.name,
      phone: "+39 34013944",
      email: `${opportunity.customer.name.toLowerCase().replace(" ", ".")}@leadspark.io`,
      address: "Via Adriatica 87, 37121 Verona",
      hasWarning: true,
    },
    details: {
      negotiations: 2,
      purchases: 1,
      tradeIns: 1,
      attachments: 0,
      conversations: 0,
    },
    offers: {
      count: 2,
      winningOffer: {
        contractDate: "19/11/2025, 13:38",
        createdDate: "12/11/2025, 23:24",
        expectedDeliveryDate: "07/12/2025",
      },
    },
    delivery: {
      contractDate: "19/11/2025, 13:38",
    },
  }
}

