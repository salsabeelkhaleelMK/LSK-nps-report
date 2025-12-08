"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "it"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Top Bar
    "search.placeholder": "Search contact...",
    "user.name": "Salsabeel Khaleel",

    // Breadcrumb
    "breadcrumb.reports": "Reports",
    "breadcrumb.postpurchase": "Post-purchase NPS",

    // Title & Actions
    "title.postpurchase": "Post-purchase NPS",
    "button.settings": "Settings",
    "button.viewOnFidspark": "View NPS Management on Fidspark",

    // Filters
    "filter.label": "Filters",
    "filter.all": "All",
    "filter.brand": "Brand",
    "filter.dealership": "Dealership",
    "filter.allBrands": "All Brands",
    "filter.allDealerships": "All Dealerships",
    "filter.clear": "Clear",
    "filter.apply": "Apply",
    "timerange.label": "Time range",
    "timerange.last7": "Last 7 days",
    "timerange.last30": "Last 30 days",
    "timerange.last90": "Last 90 days",
    "timerange.custom": "Custom",
    "timerange.from": "From",
    "timerange.to": "To",
    "timerange.selectDate": "Select date",

    // Status
    "status.active": "Active",
    "status.lastUpdated": "Last updated:",

    // Widgets
    "widget.contactStatus": "Contact Status",
    "widget.contacted": "Contacted",
    "widget.notContacted": "Not Contacted",
    "widget.responseSources": "Response Sources",
    "widget.aiAgent": "AI Agent Performance",
    "widget.totalCalls": "Total Calls",
    "widget.successful": "Successful",
    "widget.unreachable": "Unreachable",
    "widget.avgDuration": "Avg Duration",
    "widget.escalationReasons": "Escalation Reasons",
    "widget.detractorTasks": "Detractor Follow-up Tasks",
    "widget.detractorSubtitle": "Tasks created to follow up with detractor responses",
    "widget.totalResponses": "total responses",

    // Escalation Reasons
    "escalation.dissatisfaction": "Customer dissatisfaction",
    "escalation.technical": "Technical issue",
    "escalation.complaint": "Verbal complaint",

    // Table Headers
    "table.customer": "Customer",
    "table.owner": "Owner",
    "table.status": "Status",
    "table.dueDate": "Due Date",
    "table.noTasks": "No follow-up tasks created yet",

    // Status badges
    "badge.open": "Open",
    "badge.inProgress": "In Progress",
    "badge.completed": "Completed",

    // Response channels
    "channel.email": "Email",
    "channel.sms": "SMS",
    "channel.aiCall": "AI Call",

    // Settings Drawer
    "settings.title": "Edit Report",
    "settings.basics": "Basics",
    "settings.timeline": "Timeline",
    "settings.outcomes": "Outcomes",
    "settings.status": "Status",
    "settings.survey": "Survey",
    "settings.ratingScale": "Rating Scale", // Added rating scale translations
    "settings.scale1to5": "1-5 scale",
    "settings.scale1to10": "1-10 scale",
    "settings.cancel": "Cancel",
    "settings.save": "Save Changes",
    "settings.statusActive": "Active",
    "settings.statusPaused": "Paused",
    "settings.statusDraft": "Draft",
    "settings.statusCompleted": "Completed",
    "settings.triggerLabel": "Timeline starts",
    "settings.daysAfterPurchase": "days after purchase",
    "settings.searchSurveys": "Search surveys...",
    "settings.noSurvey": "No survey found.",
    "settings.selectSurvey": "Select survey...",
    "settings.settings": "Settings",

    // Timeline
    "timeline.step": "Step",
    "timeline.sendEmail": "Send Email",
    "timeline.sendSMS": "Send SMS",
    "timeline.sendAICall": "Send AI Call",
    "timeline.sendAiCall": "Send AI Call",
    "timeline.sendSms": "Send SMS",
    "timeline.delay": "Delay",
    "timeline.days": "days",
    "timeline.addStep": "Add Step",
    "timeline.settings": "Settings",
    "timeline.aiAgentSettings": "AI Agent Settings",
    "timeline.aiAgentDescription": 'Configure the AI agent for "Send AI Call" steps',
    "timeline.startAfter": "Start After",
    "timeline.startAfterDescription": "Minutes after trigger",
    "timeline.retryInterval": "Retry Interval",
    "timeline.retryIntervalDescription": "Minutes between retries",
    "timeline.maxRetries": "Max Retries",
    "timeline.voiceType": "Voice Type",
    "timeline.callWindowFrom": "Call Window From",
    "timeline.callWindowTo": "Call Window To",
    "timeline.personaScript": "Persona Script",
    "timeline.personaScriptDescription": "The script the AI will use during calls",
    "timeline.emailTemplate": "Email Template",
    "timeline.emailTemplateDescription": 'Select the email template for "Send Email" steps',
    "timeline.smsTemplate": "SMS Template",
    "timeline.smsTemplateDescription": 'Select the SMS template for "Send SMS" steps',
    "timeline.selectTemplate": "Select Template",
    "timeline.selectTemplatePlaceholder": "Choose a template...",

    // Outcomes
    "outcomes.detractors": "Detractors",
    "outcomes.promoters": "Promoters",
    "outcomes.nonResponders": "Non-responders",
    "outcomes.nonRespondersDescription": "Actions for customers who didn't respond to the survey",
    "outcomes.createTask": "Create Leadspark Task",
    "outcomes.manageOnFidspark": "Manage on Fidspark",

    // Sidebar
    "sidebar.reports": "Reports",
    "sidebar.sales": "Sales",
    "sidebar.postpurchaseNPS": "Post-purchase NPS",
  },
  it: {
    // Top Bar
    "search.placeholder": "Cerca contatto...",
    "user.name": "Salsabeel Khaleel",

    // Breadcrumb
    "breadcrumb.reports": "Report",
    "breadcrumb.postpurchase": "NPS Post-acquisto",

    // Title & Actions
    "title.postpurchase": "NPS Post-acquisto",
    "button.settings": "Impostazioni",
    "button.viewOnFidspark": "Visualizza Gestione NPS su Fidspark",

    // Filters
    "filter.label": "Filtri",
    "filter.all": "Tutti",
    "filter.brand": "Marca",
    "filter.dealership": "Concessionaria",
    "filter.allBrands": "Tutte le Marche",
    "filter.allDealerships": "Tutte le Concessionarie",
    "filter.clear": "Cancella",
    "filter.apply": "Applica",
    "timerange.label": "Intervallo di tempo",
    "timerange.last7": "Ultimi 7 giorni",
    "timerange.last30": "Ultimi 30 giorni",
    "timerange.last90": "Ultimi 90 giorni",
    "timerange.custom": "Personalizzato",
    "timerange.from": "Da",
    "timerange.to": "A",
    "timerange.selectDate": "Seleziona data",

    // Status
    "status.active": "Attivo",
    "status.lastUpdated": "Ultimo aggiornamento:",

    // Widgets
    "widget.contactStatus": "Stato Contatti",
    "widget.contacted": "Contattati",
    "widget.notContacted": "Non Contattati",
    "widget.responseSources": "Fonti di Risposta",
    "widget.aiAgent": "Prestazioni Agente AI",
    "widget.totalCalls": "Chiamate Totali",
    "widget.successful": "Riuscite",
    "widget.unreachable": "Non Raggiungibili",
    "widget.avgDuration": "Durata Media",
    "widget.escalationReasons": "Motivi di Escalation",
    "widget.detractorTasks": "Attività Follow-up Detrattori",
    "widget.detractorSubtitle": "Attività create per il follow-up delle risposte dei detrattori",
    "widget.totalResponses": "risposte totali",

    // Escalation Reasons
    "escalation.dissatisfaction": "Insoddisfazione del cliente",
    "escalation.technical": "Problema tecnico",
    "escalation.complaint": "Reclamo verbale",

    // Table Headers
    "table.customer": "Cliente",
    "table.owner": "Proprietario",
    "table.status": "Stato",
    "table.dueDate": "Data di Scadenza",
    "table.noTasks": "Nessuna attività di follow-up creata ancora",

    // Status badges
    "badge.open": "Aperto",
    "badge.inProgress": "In Corso",
    "badge.completed": "Completato",

    // Response channels
    "channel.email": "Email",
    "channel.sms": "SMS",
    "channel.aiCall": "Chiamata AI",

    // Settings Drawer
    "settings.title": "Modifica Report",
    "settings.basics": "Base",
    "settings.timeline": "Sequenza",
    "settings.outcomes": "Risultati",
    "settings.status": "Stato",
    "settings.survey": "Sondaggio",
    "settings.ratingScale": "Scala di Valutazione", // Added rating scale translations in Italian
    "settings.scale1to5": "scala 1-5",
    "settings.scale1to10": "scala 1-10",
    "settings.cancel": "Annulla",
    "settings.save": "Salva Modifiche",
    "settings.statusActive": "Attivo",
    "settings.statusPaused": "In Pausa",
    "settings.statusDraft": "Bozza",
    "settings.statusCompleted": "Completato",
    "settings.triggerLabel": "La sequenza inizia",
    "settings.daysAfterPurchase": "giorni dopo l'acquisto",
    "settings.searchSurveys": "Cerca sondaggi...",
    "settings.noSurvey": "Nessun sondaggio trovato.",
    "settings.selectSurvey": "Seleziona sondaggio...",
    "settings.settings": "Impostazioni",

    // Timeline
    "timeline.step": "Passo",
    "timeline.sendEmail": "Invia Email",
    "timeline.sendSMS": "Invia SMS",
    "timeline.sendAICall": "Invia Chiamata AI",
    "timeline.sendAiCall": "Invia Chiamata AI",
    "timeline.sendSms": "Invia SMS",
    "timeline.delay": "Ritardo",
    "timeline.days": "giorni",
    "timeline.addStep": "Aggiungi Passo",
    "timeline.settings": "Impostazioni",
    "timeline.aiAgentSettings": "Impostazioni Agente AI",
    "timeline.aiAgentDescription": 'Configura l\'agente AI per i passaggi "Invia Chiamata AI"',
    "timeline.startAfter": "Inizia Dopo",
    "timeline.startAfterDescription": "Minuti dopo l'attivazione",
    "timeline.retryInterval": "Intervallo Riprova",
    "timeline.retryIntervalDescription": "Minuti tra i tentativi",
    "timeline.maxRetries": "Tentativi Massimi",
    "timeline.voiceType": "Tipo di Voce",
    "timeline.callWindowFrom": "Finestra Chiamata Da",
    "timeline.callWindowTo": "Finestra Chiamata A",
    "timeline.personaScript": "Script Persona",
    "timeline.personaScriptDescription": "Lo script che l'AI utilizzerà durante le chiamate",
    "timeline.emailTemplate": "Modello Email",
    "timeline.emailTemplateDescription": 'Seleziona il modello email per i passaggi "Invia Email"',
    "timeline.smsTemplate": "Modello SMS",
    "timeline.smsTemplateDescription": 'Seleziona il modello SMS per i passaggi "Invia SMS"',
    "timeline.selectTemplate": "Seleziona Modello",
    "timeline.selectTemplatePlaceholder": "Scegli un modello...",

    // Outcomes
    "outcomes.detractors": "Detrattori",
    "outcomes.promoters": "Promotori",
    "outcomes.nonResponders": "Non Rispondenti",
    "outcomes.nonRespondersDescription": "Azioni per i clienti che non hanno risposto al sondaggio",
    "outcomes.createTask": "Crea Attività Leadspark",
    "outcomes.manageOnFidspark": "Gestisci su Fidspark",

    // Sidebar
    "sidebar.reports": "Report",
    "sidebar.sales": "Vendite",
    "sidebar.postpurchaseNPS": "NPS Post-acquisto",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("it")

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
