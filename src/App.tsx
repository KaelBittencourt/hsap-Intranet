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
import AnnouncementsModal from "@/src/components/AnnouncementsModal";
import AIChatBalloon from "@/src/components/AIChatBalloon";

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
    content: [
      { title: "Portal Qualis", icon: LogIn, url: "https://portalqualis.com.br/login" },
      { title: "Exames CDI", icon: Microscope, url: "http://192.168.0.200/login" },
      { title: "Exames LAB", icon: FlaskConical, url: "http://192.168.0.199:8081/$/" },
      { title: "Gerint", icon: Network, url: "https://gerint.procempa.com.br/gerintweb/" },
      { title: "Sigtap", icon: Table, url: "http://sigtap.datasus.gov.br/tabela-unificada/app/sec/inicio.jsp" },
      { title: "CID", icon: BookOpen, url: "https://hsap-portaldocolaborador.vercel.app/pages/medicos/pages/CIDS/CIDS.html" },
      { title: "Manejo Clínico para casos de Dengue", icon: Activity, isDengueFeature: true },
      { title: "Folha de Parada Pediatria", icon: Baby, isCustomFeature: true },
      { title: "Intubação e Parada Cardíaca", icon: Wind, url: "https://hsap-portaldocolaborador.vercel.app/pages/medicos/assets/HVN%20-%20Folha%20de%20Parada%20PEDIATRIA.pdf" },
      { title: "Melhor em Casa", icon: Home, url: "https://docs.google.com/forms/d/e/1FAIpQLSc4ZBzYYtFp88b7svbOJr6RmilQ6qmZU6QaPZDE0aiqLS4xwA/viewform" },
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
    content: [
      { title: "Exames CDI", icon: Microscope, url: "http://192.168.0.200/login" },
      { title: "Exames LAB", icon: FlaskConical, url: "http://192.168.0.199:8081/$/" },
      { title: "Gerint", icon: Network, url: "https://gerint.procempa.com.br/gerintweb/" },
      { title: "Diluição de Medicamentos", icon: Pill, url: "https://docs.google.com/spreadsheets/d/1WV7qsgwxt7jSLkk7acqcUdUVn7IpVjLd/edit?sharingaction=ownershiptransfer#gid=1764089371" },
      { title: "Melhor em Casa", icon: Home, url: "https://docs.google.com/forms/d/e/1FAIpQLSc4ZBzYYtFp88b7svbOJr6RmilQ6qmZU6QaPZDE0aiqLS4xwA/viewform" },
      { title: "Solicitar Ambulância", icon: Ambulance, url: "https://mcinfor-saude.net.br/login#!/index" },
      { title: "Protocolos de Enfermagem", icon: ClipboardList, url: "https://drive.google.com/drive/folders/1660u_6O-Xp67q2U66X7_6O-Xp67q2U66?usp=drive_link" },
      { title: "Sinan's", icon: Info, isSinanFeature: true },
      { title: "Notificações e Documentos", icon: ClipboardList, url: "https://drive.google.com/drive/folders/1660u_6O-Xp67q2U66X7_6O-Xp67q2U66?usp=drive_link" },
      { title: "Agência Transfusional", icon: Syringe, url: "https://drive.google.com/drive/folders/1660u_6O-Xp67q2U66X7_6O-Xp67q2U66?usp=drive_link" },
      { title: "Documentos SCIH", icon: ShieldCheck, isCCIHFeature: true },
      { title: "Educação Continuada", icon: GraduationCap, url: "https://drive.google.com/drive/folders/1660u_6O-Xp67q2U66X7_6O-Xp67q2U66?usp=drive_link" },
      { title: "Folha de Parada Pediatria", icon: Baby, isCustomFeature: true },
      { title: "Formulários", icon: ClipboardList, isFormsFeature: true },
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
    content: [
      { title: "Exames CDI", icon: Microscope, url: "http://192.168.0.200/login" },
      { title: "Exames LAB", icon: FlaskConical, url: "http://192.168.0.199:8081/$/" },
      { title: "Gerint", icon: Network, url: "https://gerint.procempa.com.br/gerintweb/" },
      { title: "Gercon", icon: FileSearch, url: "https://gerint.procempa.com.br/gerintweb/" },
      { title: "SISREG", icon: FileSearch, url: "https://sisregiii.saude.gov.br/cgi-bin/index" },
      { title: "Melhor em Casa", icon: Home, url: "https://docs.google.com/forms/d/e/1FAIpQLSc4ZBzYYtFp88b7svbOJr6RmilQ6qmZU6QaPZDE0aiqLS4xwA/viewform" },
      { title: "Solicitar Prontuário", icon: ClipboardList, url: "https://forms.gle/tVGbAGvNBuNxEP6C8" },
      { title: "Inteligência Artificial", icon: Bot, url: "https://grok.com/" },
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
    content: [
      { title: "Exames CDI", icon: Microscope, url: "http://192.168.0.200/login" },
      { title: "Exames LAB", icon: FlaskConical, url: "http://192.168.0.199:8081/$/" },
      { title: "Auditoria Interna G.R", icon: FileCheck, url: "https://docs.google.com/forms/d/e/1FAIpQLSdWuLT1bI07cLRtK258JqGpEQHxTZC-sm75rV5kWkTJe4wlyQ/viewform?usp=header" },
      { title: "Capacitações Gerais", icon: GraduationCap, url: "https://docs.google.com/forms/d/e/1FAIpQLSeYAmacPjsPXY9e_0CAeIzQ89iyfoFhWUfLqmDWZC4pe5LLLQ/viewform?usp=sharing" },
      { title: "Dashboard: Evento Adverso", icon: LayoutDashboard, url: "https://dashboard-evento-adverso.vercel.app/" },
      { title: "Dashboard: Contenções", icon: LayoutDashboard, url: "https://dashboard-contencoes-psiquiatricas.vercel.app/" },
      { title: "Dashboard: Cateter Venoso", icon: LayoutDashboard, url: "https://dashboard-auditoria-cateter.vercel.app/" },
      { title: "Dashboard: Gestão de Risco", icon: LayoutDashboard, url: "https://dashboard-auditoria-interna-gestao.vercel.app/" },
      { title: "Dashboard: Esterilização", icon: LayoutDashboard, url: "https://dashboard-esterilizacao-em-autoclav.vercel.app/" },
      { title: "Dashboard: Saúde Mental", icon: LayoutDashboard, url: "https://dashboard-internacoes-em-saude-ment.vercel.app/" },
      { title: "Inteligência Artificial", icon: Bot, url: "https://grok.com/" },
    ]
  },
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
    sector.content.map(item => ({ ...item, sectorId: sector.id, sectorTitle: sector.title }))
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
                    <span className="hidden sm:inline">Contatos Rápidos</span>
                  </Button>
                } 
              />
              <DialogContent className="sm:max-w-[800px] w-full h-[85vh] max-h-[85vh] flex flex-col overflow-hidden p-0 border-none shadow-2xl bg-[#f8fafc] sm:rounded-3xl">
                <div className="flex flex-col h-full relative">
                  {/* Decorative Header Background */}
                  <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-brand/10 to-transparent pointer-events-none" />
                  
                  <div className="p-8 pb-6 bg-white/40 backdrop-blur-md border-b border-white/50 relative z-10">
                    <DialogHeader className="mb-6">
                      <DialogTitle className="flex items-center gap-3 text-3xl font-black text-slate-900 tracking-tight">
                        <div className="bg-gradient-to-br from-brand to-brand-hover p-4 rounded-2xl shadow-lg shadow-brand/20">
                          <PhoneCall className="w-7 h-7 text-white" />
                        </div>
                        Diretório de Contatos
                      </DialogTitle>
                      <DialogDescription className="text-slate-500 text-base font-medium">
                        Acesse rapidamente os ramais internos e serviços de emergência externos.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="relative group shadow-sm bg-white rounded-2xl">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                      <Input 
                        placeholder="Pesquisar por setor, ramal ou serviço..." 
                        className="pl-12 h-14 bg-transparent border-slate-200 rounded-2xl focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all text-base shadow-inner-sm"
                        value={contactSearchQuery}
                        onChange={(e) => setContactSearchQuery(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <ScrollArea className="flex-grow p-4 sm:p-8 min-h-0 relative z-10">
                    <div className="space-y-10 pb-10">
                      {internalContacts.length > 0 && (
                        <div>
                          <div className="flex items-center gap-4 mb-6">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-4 py-1.5 bg-slate-200/50 rounded-full">
                              Ramais Internos
                            </h3>
                            <div className="h-px flex-grow bg-gradient-to-r from-slate-200 to-transparent" />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {internalContacts.map((contact, i) => (
                              <div key={i} className="flex flex-col p-5 rounded-3xl bg-white border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-brand/5 hover:border-brand/30 transition-all duration-300 group cursor-default relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-brand/5 rounded-bl-full -z-0 translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:-translate-y-0 transition-transform duration-500 ease-out" />
                                
                                <div className="flex items-start justify-between mb-4 relative z-10">
                                  <p className="font-extrabold text-sm text-slate-700 leading-snug pr-2 group-hover:text-brand transition-colors">
                                    {contact.sector}
                                  </p>
                                </div>
                                
                                <div className="mt-auto relative z-10 flex items-center justify-between">
                                  {contact.info ? (
                                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                      <p className="text-[10px] text-slate-500 font-bold truncate">{contact.info}</p>
                                    </div>
                                  ) : <div />}
                                  
                                  <Badge variant="outline" className="bg-brand-light/50 text-brand border-brand/20 font-bold text-sm px-3 py-1.5 rounded-xl shadow-inner">
                                    {contact.ramal}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {externalContacts.length > 0 && (
                        <div>
                          <div className="flex items-center gap-4 mb-6">
                            <h3 className="text-xs font-black text-rose-400 uppercase tracking-widest px-4 py-1.5 bg-rose-50 rounded-full">
                              Emergência / Externos
                            </h3>
                            <div className="h-px flex-grow bg-gradient-to-r from-rose-100 to-transparent" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {externalContacts.map((contact, i) => (
                              <div key={i} className="flex flex-row items-center p-4 rounded-3xl bg-white border border-rose-100 shadow-md hover:shadow-xl hover:border-rose-300 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-16 h-16 rounded-2xl bg-rose-50 shadow-inner flex items-center justify-center text-rose-500 shrink-0 mr-5 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                                  {contact.sector.toLowerCase().includes("samu") || contact.sector.toLowerCase().includes("ambulare") ? (
                                    <Ambulance className="w-8 h-8" />
                                  ) : (
                                    <Globe className="w-8 h-8" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-black text-lg text-slate-800 leading-tight mb-1">{contact.sector}</p>
                                  {contact.info && (
                                    <p className="text-[11px] text-slate-500 font-semibold mb-2">{contact.info}</p>
                                  )}
                                </div>
                                <div className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 group-hover:bg-rose-50 transition-colors shrink-0 flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-slate-400 group-hover:text-rose-400" />
                                  <span className="text-lg font-black text-slate-700 group-hover:text-rose-600 font-mono tracking-tight">
                                    {contact.ramal}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {filteredContacts.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                            <Search className="w-10 h-10 text-slate-300" />
                          </div>
                          <p className="font-bold text-xl text-slate-500 mb-2">Nenhum contato encontrado</p>
                          <p className="text-sm font-medium">Tente pesquisar por outro nome ou ramal.</p>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {currentSector?.content.map((item, i) => (
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
