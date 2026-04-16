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

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Premium Header */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200 px-8 py-6 z-10 shadow-sm">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-teal-600 p-3 rounded-2xl shadow-xl shadow-teal-100 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">SCIH</h2>
              </div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-[0.15em] leading-none">Serviço de Controle de Infecção Hospitalar</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full max-w-md">
            <div className="relative flex-grow group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
              <Input 
                type="text" 
                placeholder="Pesquisar documento..." 
                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:ring-teal-500/20 focus:border-teal-500 h-11 rounded-xl transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="hidden xl:flex items-center gap-4">
            <div className="flex flex-col items-end border-r border-slate-100 pr-6 mr-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Repositório Local</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold text-slate-700">Documentos Integrados</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="flex-grow overflow-y-auto p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredDocuments.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                      <FileText className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {doc.date}
                        </span>
                      </div>
                      
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-1 line-clamp-1">
                        {doc.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                        {doc.description}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        {doc.url ? (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 text-[11px] font-bold gap-2 rounded-lg border-slate-200 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all"
                            onClick={() => window.open(doc.url, "_blank")}
                          >
                            <ExternalLink className="w-3 h-3" />
                            Visualizar PDF
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            disabled
                            className="h-8 text-[11px] font-bold gap-2 rounded-lg border-slate-100 bg-slate-50 text-slate-400"
                          >
                            <Info className="w-3 h-3" />
                            Documento Interno
                          </Button>
                        )}
                      </div>
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
      <div className="px-8 py-4 bg-white border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Base de Dados Atualizada</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Hospital Santo Antônio da Patrulha</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">HSAP Portal v2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

