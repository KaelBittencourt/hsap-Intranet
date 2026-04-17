/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Stethoscope,
  HeartPulse,
  UserRound,
  Building2,
  Phone,
  PhoneCall,
  ChevronRight,
  Hospital,
  Info,
  ExternalLink,
  Search,
  ArrowLeft,
  FileText,
  Calendar,
  Clock,
  Mail,
  MapPin,
  Globe,
  Zap,
  LogIn,
  Microscope,
  FlaskConical,
  Network,
  Table,
  BookOpen,
  Activity,
  Baby,
  Wind,
  Home,
  MessageSquare,
  Pill,
  Ambulance,
  ClipboardList,
  Syringe,
  ShieldCheck,
  GraduationCap,
  FileSearch,
  FileCheck,
  LayoutDashboard,
  Bot
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import PediatricArrestSheet from "@/src/components/PediatricArrestSheet";
import DengueManagementModal from "@/src/components/DengueManagementModal";
import CCIHModal from "@/src/components/CCIHModal";
import FormsModal from "@/src/components/FormsModal";
import SinanModal from "@/src/components/SinanModal";
import NursingProtocolsModal from "@/src/components/NursingProtocolsModal";
import NotificationsAndDocsModal from "@/src/components/NotificationsAndDocsModal";
import TomographyPreparationModal from "@/src/components/TomographyPreparationModal";
import SkinGroupModal from "@/src/components/SkinGroupModal";
import MedicationDilutionModal from "@/src/components/MedicationDilutionModal";
import AnnouncementsModal from "@/src/components/AnnouncementsModal";
import AIChatBalloon from "@/src/components/AIChatBalloon";
import CidModal from "@/src/components/CidModal";

const SECTORS = [
  {
    id: "medicos",
    title: "MÉDICOS",
    description: "Atalhos e protocolos clínicos para o corpo médico.",
    icon: Stethoscope,
    color: "bg-brand",
    hoverColor: "hover:bg-brand-hover",
    lightColor: "bg-brand-light",
    textColor: "text-brand",
    categories: [
      {
        name: "Sistemas Clínicos",
        items: [
          { title: "Portal Qualis", icon: LogIn, url: "https://portalqualis.com.br/login" },
          { title: "Gerint", icon: Network, url: "https://gerint.procempa.com.br/gerintweb/" },
          { title: "Sigtap", icon: Table, url: "http://sigtap.datasus.gov.br/tabela-unificada/app/sec/inicio.jsp" },
          { title: "CID", icon: BookOpen, isCidFeature: true },
        ]
      },
      {
        name: "Resultados de Exames",
        items: [
          { title: "Exames CDI", icon: Microscope, url: "http://192.168.0.200/login" },
          { title: "Exames LAB", icon: FlaskConical, url: "http://192.168.0.199:8081/$/" },
        ]
      },
      {
        name: "Protocolos e Rotinas",
        items: [
          { title: "Manejo Clínico para casos de Dengue", icon: Activity, isDengueFeature: true },
          { title: "Intubação e Parada Cardíaca", icon: Activity, isCustomFeature: true },
          { title: "Melhor em Casa", icon: Home, url: "https://docs.google.com/forms/d/e/1FAIpQLSc4ZBzYYtFp88b7svbOJr6RmilQ6qmZU6QaPZDE0aiqLS4xwA/viewform" },
        ]
      }
    ]
  },
  {
    id: "enfermagem",
    title: "ENFERMAGEM",
    description: "Escalas, procedimentos e registros de enfermagem.",
    icon: HeartPulse,
    color: "bg-emerald-500",
    hoverColor: "hover:bg-emerald-600",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    categories: [
      {
        name: "Sistemas Externos",
        items: [
          { title: "Gerint", icon: Network, url: "https://gerint.procempa.com.br/gerintweb/" },
          { title: "Documento Contrarreferência Gerint", icon: FileText, url: "https://drive.google.com/file/d/1xV8-CyJqEFZsz3oQ7VEMDDr2-fSkYZAm/view?usp=sharing" },
        ]
      },
      {
        name: "Resultados de Exames",
        items: [
          { title: "Exames CDI", icon: Microscope, url: "http://192.168.0.200/login" },
          { title: "Exames LAB", icon: FlaskConical, url: "http://192.168.0.199:8081/$/" },
        ]
      },
      {
        name: "Protocolos e Documentos",
        items: [
          { title: "Protocolos", icon: ClipboardList, isNursingProtocolsFeature: true },
          { title: "Notificações e Documentos", icon: ClipboardList, isNotificationsAndDocsFeature: true },
          { title: "Documentos SCIH", icon: ShieldCheck, isCCIHFeature: true },
          { title: "Formulários", icon: ClipboardList, isFormsFeature: true },
        ]
      },
      {
        name: "Rotinas Assistenciais",
        items: [
          { title: "Tomografia com Contraste", icon: Activity, isTomographyPrepFeature: true },
          { title: "Diluição de Medicamentos", icon: Pill, isMedicationDilutionFeature: true },
          { title: "Agência Transfusional", icon: Syringe, url: "https://drive.google.com/drive/folders/1660u_6O-Xp67q2U66X7_6O-Xp67q2U66?usp=drive_link" },
          { title: "Intubação e Parada Cardíaca", icon: Activity, isCustomFeature: true },
          { title: "Sinan's", icon: Info, isSinanFeature: true },
        ]
      },
      {
        name: "Unidade de Internação",
        isSpecialTeam: true,
        items: [
          { title: "Grupo de Pele", icon: Activity, isSkinGroupFeature: true },
        ]
      },
      {
        name: "Apoio e Encaminhamentos",
        items: [
          { title: "Melhor em Casa", icon: Home, url: "https://docs.google.com/forms/d/e/1FAIpQLSc4ZBzYYtFp88b7svbOJr6RmilQ6qmZU6QaPZDE0aiqLS4xwA/viewform" },
          { title: "Solicitar Ambulância", icon: Ambulance, url: "https://mcinfor-saude.net.br/login#!/index" },
          { title: "Educação Continuada", icon: GraduationCap, url: "https://drive.google.com/drive/folders/1660u_6O-Xp67q2U66X7_6O-Xp67q2U66?usp=drive_link" },
          { title: "Capacitação do PGRSS", icon: GraduationCap, url: "https://classroom.google.com/u/1/c/NTIyMzc0ODc3Mjc2" },
        ]
      },
      {
        name: "Suporte Administrativo",
        items: [
          { title: "Solicitação de Uniforme", icon: UserRound, url: "https://docs.google.com/forms/d/e/1FAIpQLScCIGKGwA79b8bdPdBcObZazuW-HIhdaOyDpUd6v0EyuSdQvg/viewform" }
        ]
      }
    ]
  },
  {
    id: "recepcao",
    title: "RECEPÇÃO",
    description: "Sistemas de atendimento e fluxo de pacientes.",
    icon: UserRound,
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
    lightColor: "bg-green-50",
    textColor: "text-green-700",
    categories: [
      {
        name: "Regulação",
        items: [
          { title: "Gerint", icon: Network, url: "https://gerint.procempa.com.br/gerintweb/" },
          { title: "Gercon", icon: FileSearch, url: "https://gerint.procempa.com.br/gerintweb/" },
          { title: "SISREG", icon: FileSearch, url: "https://sisregiii.saude.gov.br/cgi-bin/index" },
        ]
      },
      {
        name: "Resultados de Exames",
        items: [
          { title: "Exames CDI", icon: Microscope, url: "http://192.168.0.200/login" },
          { title: "Exames LAB", icon: FlaskConical, url: "http://192.168.0.199:8081/$/" },
        ]
      },
      {
        name: "Rotinas Administrativas",
        items: [
          { title: "Solicitar Prontuário", icon: ClipboardList, url: "https://forms.gle/tVGbAGvNBuNxEP6C8" },
          { title: "Melhor em Casa", icon: Home, url: "https://docs.google.com/forms/d/e/1FAIpQLSc4ZBzYYtFp88b7svbOJr6RmilQ6qmZU6QaPZDE0aiqLS4xwA/viewform" },
        ]
      }
    ]
  },
  {
    id: "administracao",
    title: "ADMINISTRAÇÃO",
    description: "Gestão interna, RH e processos administrativos.",
    icon: Building2,
    color: "bg-slate-700",
    hoverColor: "hover:bg-slate-800",
    lightColor: "bg-slate-50",
    textColor: "text-slate-700",
    categories: [
      {
        name: "Painéis de Bordo (Dashboards)",
        items: [
          { title: "Central de Dashboards", icon: LayoutDashboard, isDashboardsFeature: true },
        ]
      },
      {
        name: "Qualidade e Processos",
        items: [
          { title: "Auditoria Interna G.R", icon: FileCheck, url: "https://docs.google.com/forms/d/e/1FAIpQLSdWuLT1bI07cLRtK258JqGpEQHxTZC-sm75rV5kWkTJe4wlyQ/viewform?usp=header" },
          { title: "Capacitações Gerais", icon: GraduationCap, url: "https://docs.google.com/forms/d/e/1FAIpQLSeYAmacPjsPXY9e_0CAeIzQ89iyfoFhWUfLqmDWZC4pe5LLLQ/viewform?usp=sharing" },
        ]
      },
      {
        name: "Resultados de Exames",
        items: [
          { title: "Exames CDI", icon: Microscope, url: "http://192.168.0.200/login" },
          { title: "Exames LAB", icon: FlaskConical, url: "http://192.168.0.199:8081/$/" },
        ]
      }
    ]
  },
];

const DASHBOARDS_LIST = [
  { title: "Evento Adverso", icon: LayoutDashboard, url: "https://dashboard-evento-adverso.vercel.app/" },
  { title: "Contenções Psiquiátricas", icon: LayoutDashboard, url: "https://dashboard-contencoes-psiquiatricas.vercel.app/" },
  { title: "Auditoria Cateter Venoso", icon: LayoutDashboard, url: "https://dashboard-auditoria-cateter.vercel.app/" },
  { title: "Gestão de Risco", icon: LayoutDashboard, url: "https://dashboard-auditoria-interna-gestao.vercel.app/" },
  { title: "Esterilização em Autoclave", icon: LayoutDashboard, url: "https://dashboard-esterilizacao-em-autoclav.vercel.app/" },
  { title: "Internações em Saúde Mental", icon: LayoutDashboard, url: "https://dashboard-internacoes-em-saude-ment.vercel.app/" },
];

const CONTACTS = [
  { sector: "Recepção Emergência", ramal: "7600", type: "Interno" },
  { sector: "Lavanderia", ramal: "7601", type: "Interno" },
  { sector: "Same", ramal: "7602", type: "Interno" },
  { sector: "Nutrição", ramal: "7603", type: "Interno" },
  { sector: "Cozinha", ramal: "7604", type: "Interno" },
  { sector: "Hospedagem", ramal: "7605", type: "Interno" },
  { sector: "Faturamento", ramal: "7606", type: "Interno" },
  { sector: "Psiquiatria", ramal: "7607", type: "Interno" },
  { sector: "Assistente Social", ramal: "7608", type: "Interno" },
  { sector: "Supervisão Hospitalar", ramal: "7609", type: "Interno" },
  { sector: "Tecnologia da Informação", ramal: "7610", type: "Interno" },
  { sector: "Financeiro", ramal: "7611", type: "Interno", info: "Whats: (51) 99349-9937" },
  { sector: "Supervisão Médica", ramal: "7612", type: "Interno" },
  { sector: "Supervisão Enfermagem", ramal: "7613", type: "Interno" },
  { sector: "Almoxarifado", ramal: "7615", type: "Interno" },
  { sector: "Recepção CDI", ramal: "7616", type: "Interno" },
  { sector: "Sala de Comando CDI", ramal: "7617", type: "Interno" },
  { sector: "Sala de Laudos CDI", ramal: "7618", type: "Interno" },
  { sector: "Posto de Enfermagem", ramal: "7626", type: "Interno" },
  { sector: "Farmácia", ramal: "7627", type: "Interno" },
  { sector: "Manutenção", ramal: "7628", type: "Interno" },
  { sector: "CME Bloco", ramal: "7629", type: "Interno" },
  { sector: "Posto Bloco", ramal: "7630", type: "Interno" },
  { sector: "Oftalmo Marcações", ramal: "7636", type: "Interno" },
  { sector: "Recursos Humanos", ramal: "7638", type: "Interno", info: "Whats: (51) 99350-2834" },
  { sector: "Emergência", ramal: "7639", type: "Interno" },
  { sector: "Laboratório", ramal: "7646", type: "Interno" },
  { sector: "Recepção Emergência", ramal: "(51) 2500 7540", type: "Externo" },
];

export default function App() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [contactSearchQuery, setContactSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDengueOpen, setIsDengueOpen] = useState(false);
  const [isPediatricOpen, setIsPediatricOpen] = useState(false);
  const [isCCIHOpen, setIsCCIHOpen] = useState(false);
  const [isFormsOpen, setIsFormsOpen] = useState(false);
  const [isSinanOpen, setIsSinanOpen] = useState(false);
  const [isNursingProtocolsOpen, setIsNursingProtocolsOpen] = useState(false);
  const [isNotificationsAndDocsOpen, setIsNotificationsAndDocsOpen] = useState(false);
  const [isTomographyPrepOpen, setIsTomographyPrepOpen] = useState(false);
  const [isSkinGroupOpen, setIsSkinGroupOpen] = useState(false);
  const [isMedicationDilutionOpen, setIsMedicationDilutionOpen] = useState(false);
  const [isDashboardsOpen, setIsDashboardsOpen] = useState(false);
  const [isCidOpen, setIsCidOpen] = useState(false);
  const [dashboardSearchQuery, setDashboardSearchQuery] = useState("");

  // Keyboard shortcut for search
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const currentSector = SECTORS.find(s => s.id === selectedSector);

  const filteredContacts = CONTACTS.filter(c =>
    c.sector.toLowerCase().includes(contactSearchQuery.toLowerCase()) ||
    (c.ramal && c.ramal.toLowerCase().includes(contactSearchQuery.toLowerCase())) ||
    (c.info && c.info.toLowerCase().includes(contactSearchQuery.toLowerCase()))
  );

  const internalContacts = filteredContacts.filter(c => c.type === "Interno");
  const externalContacts = filteredContacts.filter(c => c.type === "Externo");

  const allSystems = SECTORS.flatMap(sector =>
    sector.categories.flatMap(cat => cat.items.map(item => ({ ...item, sectorId: sector.id, sectorTitle: sector.title, category: cat.name })))
  );

  const filteredSystems = searchQuery.trim() === ""
    ? []
    : allSystems.filter((item, index, self) =>
      // Filter by title or sector
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sectorTitle.toLowerCase().includes(searchQuery.toLowerCase())) &&
      // Remove duplicates (some items might be in multiple sectors)
      self.findIndex(t => t.title === item.title && t.url === item.url) === index
    );

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 selection:bg-brand-light selection:text-brand flex flex-col items-center">
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-brand-light/50 blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-emerald-50/50 blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md flex justify-center">
        <div className="container max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedSector(null)}>
            <div className="bg-brand p-1.5 rounded-lg shadow-lg shadow-brand/20">
              <Hospital className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-800">
              HSAP <span className="text-brand font-medium">Intranet</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger nativeButton={true} render={
                <Button
                  variant="outline"
                  className="hidden md:flex items-center justify-start gap-3 w-64 lg:w-80 h-10 px-4 bg-slate-50 border-slate-200 text-slate-400 hover:bg-white hover:border-brand hover:text-brand transition-all rounded-xl shadow-inner-sm text-sm"
                >
                  <Search className="w-4 h-4" />
                  <span className="flex-1 text-left opacity-70">Pesquisar...</span>
                  <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-slate-400">
                    ⌘K
                  </kbd>
                </Button>
              } />
              <DialogContent className="sm:max-w-[600px] w-full p-0 overflow-hidden border-none shadow-2xl">
                <div className="flex flex-col h-[500px]">
                  <div className="p-4 border-b bg-white flex items-center gap-3">
                    <Search className="w-5 h-5 text-slate-400" />
                    <Input
                      placeholder="Pesquisar sistemas, protocolos ou setores..."
                      className="border-none shadow-none focus-visible:ring-0 text-lg p-0 h-auto"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <ScrollArea className="flex-grow p-2">
                    {searchQuery.trim() === "" ? (
                      <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400">
                        <Search className="w-12 h-12 mb-4 opacity-20" />
                        <p>Digite algo para pesquisar...</p>
                      </div>
                    ) : filteredSystems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400">
                        <Info className="w-12 h-12 mb-4 opacity-20" />
                        <p>Nenhum resultado encontrado para "{searchQuery}"</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-1">
                        {filteredSystems.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer group transition-all border border-transparent hover:border-slate-100"
                            onClick={() => {
                              if (item.url) {
                                window.open(item.url, "_blank");
                              } else if (item.isCustomFeature) {
                                setSelectedSector(item.sectorId);
                                setTimeout(() => setIsPediatricOpen(true), 350);
                              } else if (item.isDengueFeature) {
                                setSelectedSector(item.sectorId);
                                setTimeout(() => setIsDengueOpen(true), 350);
                              } else if (item.isCCIHFeature) {
                                setSelectedSector(item.sectorId);
                                setTimeout(() => setIsCCIHOpen(true), 350);
                              } else if (item.isFormsFeature) {
                                setSelectedSector(item.sectorId);
                                setTimeout(() => setIsFormsOpen(true), 350);
                              } else if (item.isSinanFeature) {
                                setSelectedSector(item.sectorId);
                                setTimeout(() => setIsSinanOpen(true), 350);
                              } else if (item.isNursingProtocolsFeature) {
                                setSelectedSector(item.sectorId);
                                setTimeout(() => setIsNursingProtocolsOpen(true), 350);
                              } else if (item.isNotificationsAndDocsFeature) {
                                setSelectedSector(item.sectorId);
                                setTimeout(() => setIsNotificationsAndDocsOpen(true), 350);
                              } else if (item.isTomographyPrepFeature) {
                                setSelectedSector(item.sectorId);
                                setTimeout(() => setIsTomographyPrepOpen(true), 350);
                              } else if (item.isSkinGroupFeature) {
                                setSelectedSector(item.sectorId);
                                setTimeout(() => setIsSkinGroupOpen(true), 350);
                              } else if (item.isMedicationDilutionFeature) {
                                setSelectedSector(item.sectorId);
                                setTimeout(() => setIsMedicationDilutionOpen(true), 350);
                              } else if (item.isDashboardsFeature) {
                                setSelectedSector(item.sectorId);
                                setTimeout(() => setIsDashboardsOpen(true), 350);
                              } else if (item.isCidFeature) {
                                setSelectedSector(item.sectorId);
                                setTimeout(() => setIsCidOpen(true), 350);
                              } else {
                                setSelectedSector(item.sectorId);
                              }
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all">
                                <item.icon className="w-4 h-4 text-slate-600" />
                              </div>
                              <div>
                                <p className="font-medium text-slate-800">{item.title}</p>
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{item.sectorTitle}</p>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand transition-all" />
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger
                nativeButton={true}
                render={
                  <Button variant="outline" className="gap-2 h-10 px-4 flex items-center justify-center border-brand/20 bg-brand/5 text-brand focus:bg-brand/10 hover:bg-brand hover:text-white transition-all rounded-xl shadow-inner-sm text-sm font-semibold">
                    <Phone className="w-4 h-4" />
                    <span className="hidden sm:inline">Contatos / Ramais</span>
                  </Button>
                }
              />
              <DialogContent className="sm:max-w-[500px] w-full h-[85vh] max-h-[85vh] flex flex-col overflow-hidden p-0 border-none shadow-2xl bg-white sm:rounded-2xl">
                <div className="flex flex-col h-full">
                  <div className="px-6 py-5 border-b border-slate-100 bg-white">
                    <DialogHeader className="mb-4">
                      <DialogTitle className="text-xl font-semibold text-slate-800">
                        Contatos
                      </DialogTitle>
                      <DialogDescription className="hidden">Lista de contatos da intranet</DialogDescription>
                    </DialogHeader>

                    <div className="relative group">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand transition-colors" />
                      <Input
                        placeholder="Pesquisar..."
                        className="pl-9 h-10 bg-slate-50 border-transparent hover:bg-slate-100 focus:bg-white focus:ring-2 focus:ring-brand/20 focus:border-brand/40 transition-all text-sm rounded-lg shadow-none"
                        value={contactSearchQuery}
                        onChange={(e) => setContactSearchQuery(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <ScrollArea className="flex-grow min-h-0 bg-white">
                    <div className="pb-8">
                      {internalContacts.length > 0 && (
                        <div>
                          <div className="sticky top-0 bg-slate-50/90 backdrop-blur-sm border-b border-slate-100 px-6 py-2 z-10">
                            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                              Internos
                            </h3>
                          </div>
                          <div className="px-6">
                            {internalContacts.map((contact, i) => (
                              <div key={i} className="flex flex-row items-center justify-between py-3.5 border-b border-slate-50 last:border-none group hover:bg-slate-50/50 -mx-3 px-3 rounded-lg transition-colors cursor-default">
                                <div className="flex flex-col">
                                  <span className="font-medium text-slate-700 text-sm">{contact.sector}</span>
                                  {contact.info && (
                                    <span className="text-[11px] text-slate-400 mt-0.5">{contact.info}</span>
                                  )}
                                </div>
                                <span className="font-mono text-sm font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md group-hover:bg-brand group-hover:text-white group-hover:shadow-md group-hover:shadow-brand/20 transition-all border border-transparent group-hover:border-brand">
                                  {contact.ramal}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {externalContacts.length > 0 && (
                        <div>
                          <div className="sticky top-0 bg-slate-50/90 backdrop-blur-sm border-y border-slate-100 px-6 py-2 z-10 mt-2">
                            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                              Externos
                            </h3>
                          </div>
                          <div className="px-6 mt-1">
                            {externalContacts.map((contact, i) => (
                              <div key={i} className="flex flex-row items-center justify-between py-3.5 border-b border-slate-50 last:border-none group hover:bg-slate-50/50 -mx-3 px-3 rounded-lg transition-colors cursor-default">
                                <div className="flex flex-col">
                                  <span className="font-medium text-slate-700 text-sm">{contact.sector}</span>
                                  {contact.info && (
                                    <span className="text-[11px] text-slate-400 mt-0.5">{contact.info}</span>
                                  )}
                                </div>
                                <span className="font-mono text-sm font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md group-hover:bg-brand group-hover:text-white group-hover:shadow-md group-hover:shadow-brand/20 transition-all border border-transparent group-hover:border-brand">
                                  {contact.ramal}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {filteredContacts.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                          <p className="font-medium text-slate-600 mb-1">Nenhum resultado</p>
                          <p className="text-sm">Não encontramos nenhum ramal para sua busca.</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex-grow">
        <AnimatePresence mode="wait">
          {!selectedSector ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Section */}
              <div className="max-w-3xl mb-16">
                <Badge variant="secondary" className="mb-4 bg-brand-light text-brand-hover hover:bg-brand-light border-none px-3 py-1">
                  Intranet do Colaborador
                </Badge>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                  Bem-vindo à Intranet do <span className="text-brand">HSAP</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
                  Sua central de ferramentas e informações. Escolha seu setor abaixo para acessar
                  atalhos dedicados e informações pertinentes à sua rotina hospitalar.
                </p>
              </div>

              {/* Sectors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                {SECTORS.map((sector, index) => (
                  <motion.div
                    key={sector.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setSelectedSector(sector.id)}
                  >
                    <Card className="group relative overflow-hidden border-none shadow-xl shadow-slate-200/50 bg-white hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                      <div className={`absolute top-0 left-0 w-full h-1.5 ${sector.color}`} />

                      <CardHeader className="pb-4">
                        <div className={`w-12 h-12 rounded-2xl ${sector.lightColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <sector.icon className={`w-6 h-6 ${sector.textColor}`} />
                        </div>
                        <CardTitle className="text-xl font-bold tracking-tight group-hover:text-brand transition-colors">
                          {sector.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="flex-grow">
                        <CardDescription className="text-slate-500 text-sm leading-relaxed mb-6">
                          {sector.description}
                        </CardDescription>

                        <div className="flex items-center text-sm font-semibold text-brand group-hover:translate-x-1 transition-transform">
                          Acessar área
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </div>
                      </CardContent>

                      {/* Decorative background element */}
                      <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                        <sector.icon className="w-32 h-32 rotate-12" />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="sector"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              <Button
                variant="ghost"
                onClick={() => setSelectedSector(null)}
                className="mb-8 gap-2 text-slate-500 hover:text-brand"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao Início
              </Button>

              <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                <div className={`w-20 h-20 rounded-3xl ${currentSector?.lightColor} flex items-center justify-center shadow-lg shadow-slate-200`}>
                  {currentSector && <currentSector.icon className={`w-10 h-10 ${currentSector.textColor}`} />}
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{currentSector?.title}</h2>
                  <p className="text-slate-600 text-lg max-w-2xl">
                    {currentSector?.description} Bem-vindo à sua área de trabalho dedicada.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-10">
                {currentSector?.categories.map((category, catIdx) => (
                  <div key={catIdx} className="w-full">
                    <h3 className={cn(
                      "text-xs font-bold uppercase tracking-widest mb-4 px-2 border-b pb-3 opacity-90 flex items-center gap-2",
                      category.isSpecialTeam ? "text-rose-600 border-rose-200" : "text-slate-600 border-slate-200"
                    )}>
                      <span className={`w-2 h-2 rounded-full ${category.isSpecialTeam ? 'bg-rose-500' : currentSector.lightColor} border ${category.isSpecialTeam ? 'border-rose-300' : `border-[${currentSector.textColor}]`} shadow-sm`}></span>
                      {category.name}
                      {category.isSpecialTeam && <span className="ml-2 px-1.5 py-0.5 rounded text-[8px] bg-rose-100 text-rose-700">ESPECIALIDADE</span>}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                      {category.items.map((item, i) => (
                        <div key={i}>
                          {item.isCustomFeature ? (
                            <Dialog open={isPediatricOpen} onOpenChange={setIsPediatricOpen}>
                              <DialogTrigger
                                nativeButton={false}
                                render={
                                  <Card className="group hover:border-brand/20 transition-colors cursor-pointer border-slate-100 shadow-sm hover:shadow-md h-full">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-brand-light transition-colors">
                                        <item.icon className="w-5 h-5 text-slate-400 group-hover:text-brand" />
                                      </div>
                                      <div className="flex-1">
                                        <CardTitle className="text-lg flex items-center justify-between">
                                          {item.title}
                                          <Zap className="w-3 h-3 text-amber-500" />
                                        </CardTitle>
                                        <CardDescription>Ferramenta de cálculo integrada</CardDescription>
                                      </div>
                                    </CardHeader>
                                  </Card>
                                }
                              />
                              <DialogContent className="sm:max-w-6xl w-full max-h-[98vh] overflow-hidden pt-10 pb-5 px-5 border-none shadow-2xl">
                                <PediatricArrestSheet />
                              </DialogContent>
                            </Dialog>
                          ) : item.isDengueFeature ? (
                            <Dialog open={isDengueOpen} onOpenChange={setIsDengueOpen}>
                              <DialogTrigger
                                nativeButton={false}
                                render={
                                  <Card className="group hover:border-brand/30 transition-colors cursor-pointer border-slate-100 shadow-sm hover:shadow-md h-full">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-brand-light transition-colors">
                                        <item.icon className="w-5 h-5 text-slate-400 group-hover:text-brand" />
                                      </div>
                                      <div className="flex-1">
                                        <CardTitle className="text-lg flex items-center justify-between">
                                          {item.title}
                                          <Zap className="w-3 h-3 text-brand" />
                                        </CardTitle>
                                        <CardDescription>Protocolo de manejo clínico</CardDescription>
                                      </div>
                                    </CardHeader>
                                  </Card>
                                }
                              />
                              <DialogContent className="sm:max-w-5xl w-full h-[95vh] max-h-[95vh] overflow-hidden p-0 border-none shadow-2xl">
                                <DengueManagementModal />
                              </DialogContent>
                            </Dialog>
                          ) : item.isCCIHFeature ? (
                            <Dialog open={isCCIHOpen} onOpenChange={setIsCCIHOpen}>
                              <DialogTrigger
                                nativeButton={false}
                                render={
                                  <Card className="group hover:border-brand/20 transition-colors cursor-pointer border-slate-100 shadow-sm hover:shadow-md h-full">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-brand-light transition-colors">
                                        <item.icon className="w-5 h-5 text-slate-400 group-hover:text-brand" />
                                      </div>
                                      <div className="flex-1">
                                        <CardTitle className="text-lg flex items-center justify-between">
                                          {item.title}
                                          <Zap className="w-3 h-3 text-brand" />
                                        </CardTitle>
                                        <CardDescription>Protocolos e orientações SCIH</CardDescription>
                                      </div>
                                    </CardHeader>
                                  </Card>
                                }
                              />
                              <DialogContent className="sm:max-w-2xl w-full h-[90vh] max-h-[90vh] overflow-hidden p-0 border-none shadow-2xl">
                                <CCIHModal />
                              </DialogContent>
                            </Dialog>
                          ) : item.isFormsFeature ? (
                            <Dialog open={isFormsOpen} onOpenChange={setIsFormsOpen}>
                              <DialogTrigger
                                nativeButton={false}
                                render={
                                  <Card className="group hover:border-brand/30 transition-colors cursor-pointer border-slate-100 shadow-sm hover:shadow-md h-full">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-brand-light transition-colors">
                                        <item.icon className="w-5 h-5 text-slate-400 group-hover:text-brand" />
                                      </div>
                                      <div className="flex-1">
                                        <CardTitle className="text-lg flex items-center justify-between">
                                          {item.title}
                                          <Zap className="w-3 h-3 text-brand" />
                                        </CardTitle>
                                        <CardDescription>Repositório de formulários digitais</CardDescription>
                                      </div>
                                    </CardHeader>
                                  </Card>
                                }
                              />
                              <DialogContent className="sm:max-w-6xl w-full h-[90vh] max-h-[90vh] overflow-hidden p-0 border-none shadow-2xl">
                                <FormsModal />
                              </DialogContent>
                            </Dialog>
                          ) : item.isSinanFeature ? (
                            <Dialog open={isSinanOpen} onOpenChange={setIsSinanOpen}>
                              <DialogTrigger
                                nativeButton={false}
                                render={
                                  <Card className="group hover:border-brand/20 transition-colors cursor-pointer border-slate-100 shadow-sm hover:shadow-md h-full">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-brand-light transition-colors">
                                        <item.icon className="w-5 h-5 text-slate-400 group-hover:text-brand" />
                                      </div>
                                      <div className="flex-1">
                                        <CardTitle className="text-lg flex items-center justify-between">
                                          {item.title}
                                          <Zap className="w-3 h-3 text-brand" />
                                        </CardTitle>
                                        <CardDescription>Fichas de notificação compulsória</CardDescription>
                                      </div>
                                    </CardHeader>
                                  </Card>
                                }
                              />
                              <DialogContent className="sm:max-w-2xl w-full h-[90vh] max-h-[90vh] overflow-hidden p-0 border-none shadow-2xl">
                                <SinanModal />
                              </DialogContent>
                            </Dialog>
                          ) : item.isNursingProtocolsFeature ? (
                            <Dialog open={isNursingProtocolsOpen} onOpenChange={setIsNursingProtocolsOpen}>
                              <DialogTrigger
                                nativeButton={false}
                                render={
                                  <Card className="group hover:border-emerald-500/30 transition-colors cursor-pointer border-slate-100 shadow-sm hover:shadow-md h-full">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                                        <item.icon className="w-5 h-5 text-slate-400 group-hover:text-emerald-500" />
                                      </div>
                                      <div className="flex-1">
                                        <CardTitle className="text-lg flex items-center justify-between">
                                          {item.title}
                                          <Zap className="w-3 h-3 text-emerald-500" />
                                        </CardTitle>
                                        <CardDescription>Repositório de protocolos de enfermagem</CardDescription>
                                      </div>
                                    </CardHeader>
                                  </Card>
                                }
                              />
                              <DialogContent className="sm:max-w-4xl w-full h-[90vh] max-h-[90vh] overflow-hidden p-0 border-none shadow-2xl">
                                <NursingProtocolsModal />
                              </DialogContent>
                            </Dialog>
                          ) : item.isNotificationsAndDocsFeature ? (
                            <Dialog open={isNotificationsAndDocsOpen} onOpenChange={setIsNotificationsAndDocsOpen}>
                              <DialogTrigger
                                nativeButton={false}
                                render={
                                  <Card className="group hover:border-emerald-500/30 transition-colors cursor-pointer border-slate-100 shadow-sm hover:shadow-md h-full">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                                        <item.icon className="w-5 h-5 text-slate-400 group-hover:text-emerald-500" />
                                      </div>
                                      <div className="flex-1">
                                        <CardTitle className="text-lg flex items-center justify-between">
                                          {item.title}
                                          <Zap className="w-3 h-3 text-emerald-500" />
                                        </CardTitle>
                                        <CardDescription>Acesse Notificações e Documentos do setor</CardDescription>
                                      </div>
                                    </CardHeader>
                                  </Card>
                                }
                              />
                              <DialogContent className="sm:max-w-4xl w-full h-[90vh] max-h-[90vh] overflow-hidden p-0 border-none shadow-2xl">
                                <NotificationsAndDocsModal />
                              </DialogContent>
                            </Dialog>
                          ) : item.isTomographyPrepFeature ? (
                            <Dialog open={isTomographyPrepOpen} onOpenChange={setIsTomographyPrepOpen}>
                              <DialogTrigger
                                nativeButton={false}
                                render={
                                  <Card className="group hover:border-emerald-500/30 transition-colors cursor-pointer border-slate-100 shadow-sm hover:shadow-md h-full">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                                        <item.icon className="w-5 h-5 text-slate-400 group-hover:text-emerald-500" />
                                      </div>
                                      <div className="flex-1">
                                        <CardTitle className="text-lg flex items-center justify-between">
                                          {item.title}
                                          <Zap className="w-3 h-3 text-emerald-500" />
                                        </CardTitle>
                                        <CardDescription>Fluxo de preparo para exames de contraste</CardDescription>
                                      </div>
                                    </CardHeader>
                                  </Card>
                                }
                              />
                              <DialogContent className="sm:max-w-4xl w-full h-[90vh] max-h-[90vh] overflow-hidden p-0 border-none shadow-2xl">
                                <TomographyPreparationModal />
                              </DialogContent>
                            </Dialog>
                          ) : item.isSkinGroupFeature ? (
                            <Dialog open={isSkinGroupOpen} onOpenChange={setIsSkinGroupOpen}>
                              <DialogTrigger
                                nativeButton={false}
                                render={
                                  <Card className="group hover:border-rose-500/30 transition-colors cursor-pointer border-slate-100 shadow-sm hover:shadow-md h-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 relative">
                                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
                                        <item.icon className="w-5 h-5 text-slate-400 group-hover:text-rose-500" />
                                      </div>
                                      <div className="flex-1">
                                        <CardTitle className="text-lg flex items-center justify-between">
                                          {item.title}
                                          <Zap className="w-3 h-3 text-rose-500" />
                                        </CardTitle>
                                        <CardDescription>Ferramentas avaliativas de lesões e pele</CardDescription>
                                      </div>
                                    </CardHeader>
                                  </Card>
                                }
                              />
                              <DialogContent className="sm:max-w-4xl w-full h-[90vh] max-h-[90vh] overflow-hidden p-0 border-none shadow-2xl">
                                <SkinGroupModal />
                              </DialogContent>
                            </Dialog>
                          ) : item.isMedicationDilutionFeature ? (
                            <Dialog open={isMedicationDilutionOpen} onOpenChange={setIsMedicationDilutionOpen}>
                              <DialogTrigger 
                                nativeButton={false}
                                render={
                                  <Card className="group hover:border-emerald-500/30 transition-colors cursor-pointer border-slate-100 shadow-sm hover:shadow-md h-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 relative">
                                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                                        <item.icon className="w-5 h-5 text-slate-400 group-hover:text-emerald-500" />
                                      </div>
                                      <div className="flex-1">
                                        <CardTitle className="text-lg flex items-center justify-between">
                                          {item.title}
                                          <Zap className="w-3 h-3 text-emerald-500" />
                                        </CardTitle>
                                        <CardDescription>Consulta interativa sobre medicamentos</CardDescription>
                                      </div>
                                    </CardHeader>
                                  </Card>
                                } 
                              />
                              <DialogContent className="sm:max-w-4xl w-full h-[90vh] max-h-[90vh] overflow-hidden p-0 border-none shadow-2xl">
                                <MedicationDilutionModal />
                              </DialogContent>
                            </Dialog>
                          ) : item.isCidFeature ? (
                            <Dialog open={isCidOpen} onOpenChange={setIsCidOpen}>
                              <DialogTrigger 
                                nativeButton={false}
                                render={
                                  <Card className="group hover:border-brand/30 transition-colors cursor-pointer border-slate-100 shadow-sm hover:shadow-md h-full">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-brand-light transition-colors">
                                        <item.icon className="w-5 h-5 text-slate-400 group-hover:text-brand" />
                                      </div>
                                      <div className="flex-1">
                                        <CardTitle className="text-lg flex items-center justify-between">
                                          {item.title}
                                          <Zap className="w-3 h-3 text-brand" />
                                        </CardTitle>
                                        <CardDescription>Consulta de procedimentos e CIDs (SUS)</CardDescription>
                                      </div>
                                    </CardHeader>
                                  </Card>
                                } 
                              />
                              <DialogContent className="sm:max-w-4xl w-full h-[90vh] max-h-[90vh] overflow-hidden p-0 border-none shadow-2xl">
                                <CidModal />
                              </DialogContent>
                            </Dialog>
                          ) : item.isDashboardsFeature ? (
                            <Dialog open={isDashboardsOpen} onOpenChange={setIsDashboardsOpen}>
                              <DialogTrigger
                                nativeButton={false}
                                render={
                                  <Card className="group hover:border-brand/30 transition-colors cursor-pointer border-slate-100 shadow-sm hover:shadow-md h-full">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-brand-light transition-colors">
                                        <item.icon className="w-5 h-5 text-slate-400 group-hover:text-brand" />
                                      </div>
                                      <div className="flex-1">
                                        <CardTitle className="text-lg flex items-center justify-between">
                                          {item.title}
                                          <Zap className="w-3 h-3 text-brand" />
                                        </CardTitle>
                                        <CardDescription>Acesse todos os indicadores e métricas</CardDescription>
                                      </div>
                                    </CardHeader>
                                  </Card>
                                }
                              />
                              <DialogContent className="sm:max-w-4xl w-full h-[85vh] max-h-[85vh] flex flex-col p-0 overflow-hidden border-none shadow-2xl bg-[#f8fafc] sm:rounded-2xl">
                                <div className="flex flex-col h-full bg-white">
                                  <div className="px-6 py-5 border-b border-slate-100 bg-white shadow-sm relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                      <DialogHeader className="mb-0">
                                        <DialogTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
                                          <div className="p-2 bg-brand/10 text-brand rounded-lg">
                                            <LayoutDashboard className="w-5 h-5" />
                                          </div>
                                          Central de Dashboards
                                        </DialogTitle>
                                        <DialogDescription className="mt-1">
                                          Métricas, Painéis e Indicadores do Hospital
                                        </DialogDescription>
                                      </DialogHeader>
                                    </div>

                                    <div className="relative group w-full md:w-72">
                                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand transition-colors" />
                                      <Input
                                        placeholder="Pesquisar dashboards..."
                                        className="pl-9 h-10 bg-slate-50 border-transparent hover:bg-slate-100 focus:bg-white focus:ring-2 focus:ring-brand/20 focus:border-brand/40 transition-all text-sm rounded-lg shadow-none"
                                        value={dashboardSearchQuery}
                                        onChange={(e) => setDashboardSearchQuery(e.target.value)}
                                        autoComplete="off"
                                      />
                                    </div>
                                  </div>

                                  <ScrollArea className="flex-grow min-h-0 bg-slate-50/50 p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-10">
                                      {DASHBOARDS_LIST.filter(d => d.title.toLowerCase().includes(dashboardSearchQuery.toLowerCase())).map((dash, idx) => (
                                        <a key={idx} href={dash.url} target="_blank" rel="noopener noreferrer" className="block group">
                                          <div className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200/60 bg-white hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300">
                                            <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-brand text-slate-400 group-hover:text-white transition-colors duration-300 shadow-sm group-hover:scale-110">
                                              <dash.icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                              <h4 className="font-bold text-slate-700 group-hover:text-brand transition-colors leading-tight">{dash.title}</h4>
                                              <span className="text-[11px] font-medium text-slate-400 flex items-center mt-1.5 uppercase tracking-wide">
                                                Abrir no Navegador <ExternalLink className="w-3 h-3 ml-1.5 opacity-50" />
                                              </span>
                                            </div>
                                          </div>
                                        </a>
                                      ))}
                                      {DASHBOARDS_LIST.filter(d => d.title.toLowerCase().includes(dashboardSearchQuery.toLowerCase())).length === 0 && (
                                        <div className="col-span-full py-16 flex flex-col items-center justify-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                                          <Search className="w-10 h-10 mb-4 text-slate-200" />
                                          <p className="font-medium text-slate-500">Nenhum dashboard encontrado</p>
                                          <p className="text-sm">Tente usar outros termos de pesquisa.</p>
                                        </div>
                                      )}
                                    </div>
                                  </ScrollArea>
                                </div>
                              </DialogContent>
                            </Dialog>
                          ) : (
                            <a
                              href={item.url || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block group h-full"
                            >
                              <Card className="group hover:border-brand/20 transition-colors cursor-pointer border-slate-100 shadow-sm hover:shadow-md h-full">
                                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-brand-light transition-colors">
                                    <item.icon className="w-5 h-5 text-slate-400 group-hover:text-brand" />
                                  </div>
                                  <div className="flex-1">
                                    <CardTitle className="text-lg flex items-center justify-between">
                                      {item.title}
                                      {item.url && item.url !== "#" && <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                    </CardTitle>
                                    <CardDescription>Clique para abrir o recurso</CardDescription>
                                  </div>
                                </CardHeader>
                              </Card>
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Section (Only on Home) */}
        {!selectedSector && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row gap-8 items-center mt-12"
          >
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Mantenha-se Atualizado</h2>
              <p className="text-slate-600 mb-6 max-w-xl">
                A intranet é atualizada semanalmente com novos protocolos, escalas e avisos importantes
                da diretoria e coordenação de cada setor.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Sistemas Online
                </div>

              </div>
            </div>
            <div className="w-full md:w-auto">
              <Dialog>
                <DialogTrigger
                  nativeButton={true}
                  render={
                    <Button variant="outline" className="w-full md:w-auto px-8 py-6 rounded-xl border-slate-200">
                      Ver Últimos Comunicados
                    </Button>
                  }
                />
                <DialogContent className="sm:max-w-4xl w-full h-[80vh] max-h-[80vh] overflow-hidden p-0 border-none shadow-2xl">
                  <AnnouncementsModal />
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-12 w-full flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <Hospital className="w-5 h-5 text-brand" />
                <span className="font-bold text-slate-800">HSAP</span>
              </div>
              <p className="text-sm text-slate-500 max-w-xs">
                Hospital Santo Antônio da Patrulha. Cuidando da sua saúde com excelência e humanização.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeOy9cnx7N_BgLibedV_zuagztVTDdec9QzI0-K899VSM_LHA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "bg-brand hover:bg-brand-hover text-white rounded-xl px-6 h-10 shadow-md shadow-brand/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 border-none"
                )}
              >
                <MessageSquare className="w-4 h-4" />
                Ouvidoria
              </a>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>© 2023 - 2024 Hospital Santo Antônio da Patrulha. Todos os direitos reservados.</p>
            <p>Desenvolvido por <span className="text-slate-600 font-medium">Michael de Favere Bitencourt</span></p>
          </div>
        </div>
      </footer>

      <AIChatBalloon />
    </div>
  );
}
