import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShieldCheck, 
  Search, 
  FileText, 
  ExternalLink, 
  Download,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn, normalizeString } from "@/lib/utils";

interface Document {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "Protocolo" | "Manual" | "Programa" | "Instrução";
  url?: string;
  isInternal?: boolean;
}

const documents: Document[] = [
  {
    id: "antirrabico-oficina",
    title: "Atendimento Antirrábico",
    description: "Orientações técnicas e fluxos para o atendimento antirrábico humano.",
    date: "2022",
    type: "Protocolo",
    url: "https://drive.google.com/file/d/11yPZc4vE1i3z8C6zn8AMC4H1NgOCXSSk/view?usp=sharing"
  },
  {
    id: "manual-amostras-lacen",
    title: "Manual de Amostras – LACEN/RS (2024)",
    description: "Guia completo para coleta, acondicionamento e transporte de amostras biológicas.",
    date: "2024",
    type: "Manual",
    url: "https://drive.google.com/file/d/1Z1wGp_6t-eHJD1wOnoO3sab3JXZ2u2ul/view?usp=sharing"
  },
  {
    id: "manual-infeccao-hospitalar",
    title: "Manual de Infecção Hospitalar",
    description: "Diretrizes e protocolos de controle de infecção para o ambiente hospitalar.",
    date: "2025",
    type: "Manual",
    url: "https://drive.google.com/file/d/1NCGn5Ly5o28CFtrq5Z6OgcFS8OgpoZlI/view?usp=sharing"
  },
  {
    id: "meningite-crs-2025",
    title: "Meningite – 18ª CRS (2025)",
    description: "Atualização sobre a vigilância epidemiológica das meningites na região.",
    date: "10/04/2025",
    type: "Protocolo",
    url: "https://drive.google.com/file/d/1BTwP9vcj7oJIe6AUghqIGmOOku96I73a/view?usp=sharing"
  },
  {
    id: "programa-infeccao-hospitalar",
    title: "Programa de Infecção Hospitalar",
    description: "Planejamento e ações estratégicas para o controle de infecções hospitalares.",
    date: "17/04/2025",
    type: "Programa",
    url: "https://drive.google.com/file/d/1l4e91-coJyAlwkGigr4VThYInB1eC63H/view?usp=sharing"
  },
  {
    id: "protocolo-influenza-2025",
    title: "Protocolo de Influenza (2025)",
    description: "Diretrizes para o manejo e vigilância epidemiológica da influenza sazonal.",
    date: "2025",
    type: "Protocolo",
    url: "https://drive.google.com/file/d/1cwuydfwvSDwOUYHuHTkBKqFg9Heukand/view?usp=sharing"
  }
];

export default function CCIHModal() {
  const [searchQuery, setSearchQuery] = useState("");

  React.useEffect(() => {
    // Small delay to ensure the focus trap has finished its work
    const timer = setTimeout(() => {
      if (document.activeElement instanceof HTMLInputElement) {
        document.activeElement.blur();
      }
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const filteredDocuments = useMemo(() => {
    const normalizedQuery = normalizeString(searchQuery);
    return documents.filter(doc => 
      normalizeString(doc.title).includes(normalizedQuery) ||
      normalizeString(doc.description).includes(normalizedQuery) ||
      normalizeString(doc.type).includes(normalizedQuery)
    );
  }, [searchQuery]);

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Premium Header */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200 px-6 py-6 md:px-8 z-10 shadow-sm shrink-0">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-green-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-emerald-600 p-3 rounded-2xl shadow-xl shadow-emerald-100 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase text-center md:text-left text-balance">SCIH</h2>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full max-w-md">
            <div className="relative flex-grow group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
              <Input 
                type="text" 
                placeholder="Pesquisar documento..." 
                autoComplete="off"
                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:ring-emerald-500/20 focus:border-emerald-500 h-11 rounded-xl transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="flex-grow overflow-y-auto p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-3">
            <AnimatePresence mode="popLayout">
              {filteredDocuments.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => doc.url && window.open(doc.url, "_blank")}
                  className={cn(
                    "group relative bg-white rounded-2xl border border-slate-200 p-5 shadow-sm transition-all duration-300 overflow-hidden",
                    doc.url ? "hover:shadow-md hover:border-brand/30 cursor-pointer" : "opacity-80"
                  )}
                >
                  {doc.url && <div className="absolute inset-0 bg-brand-light/0 group-hover:bg-brand-light/10 transition-colors" />}
                  
                  <div className="relative flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-xl bg-slate-50 text-slate-400 transition-colors shrink-0",
                      doc.url ? "group-hover:bg-brand group-hover:text-white" : ""
                    )}>
                      <FileText className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {doc.date}
                        </span>
                        {doc.url ? (
                          <div className="p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 bg-brand-light text-brand">
                            <ExternalLink className="w-3 h-3" />
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                            <Info className="w-3 h-3" />
                            Interno
                          </span>
                        )}
                      </div>
                      
                      <h3 className={cn(
                        "text-sm font-bold text-slate-900 mb-1 line-clamp-1 transition-colors",
                        doc.url ? "group-hover:text-brand" : ""
                      )}>
                        {doc.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredDocuments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Nenhum documento encontrado</h3>
              <p className="text-sm text-slate-500">Tente ajustar os termos da sua pesquisa.</p>
            </div>
          )}
        </div>
      </div>

      {/* Refined Footer */}
      <div className="px-8 py-4 bg-white border-t border-slate-100 flex flex-col sm:flex-row justify-center items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-400 font-medium">Hospital Santo Antônio da Patrulha</span>
        </div>
      </div>
    </div>
  );
}

