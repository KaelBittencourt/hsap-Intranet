import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ClipboardList, 
  Search, 
  FileEdit, 
  ExternalLink, 
  CheckCircle2,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn, normalizeString } from "@/lib/utils";

interface FormItem {
  id: string;
  title: string;
  description: string;
  date: string;
  url: string;
}

const forms: FormItem[] = [
  {
    id: "solicitacao-treinamentos",
    title: "Solicitação e Entrega de Treinamentos",
    description: "Formulário para requisição de novos treinamentos e registro de entregas.",
    date: "2025",
    url: "https://docs.google.com/forms/d/e/1FAIpQLScMjAsuTm0AQDpn4kh0llI2cT5Sw_jCuE-GV6HOls-CzQGhGw/viewform"
  },
  {
    id: "ficha-avaliacao-enfermagem",
    title: "Ficha de Avaliação Enfermagem",
    description: "Instrumento de avaliação técnica e desempenho para a equipe de enfermagem.",
    date: "2025",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSc0A3WkSZOpGCDVVKYnO_V8tGnRcDh1VMlOwtHUEic_aXkMig/viewform"
  },
  {
    id: "adesao-higienizacao-maos",
    title: "Adesão à Higienização de Mãos",
    description: "Registro de conformidade e monitoramento dos 5 momentos da higienização das mãos.",
    date: "2025",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdhSkgEB7Y8KC95ro9BUy85VM10Inu1rgOzE0CsmVuPdSkOVA/viewform"
  }
];

export default function FormsModal() {
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

  const filteredForms = useMemo(() => {
    const normalizedQuery = normalizeString(searchQuery);
    return forms.filter(form => 
      normalizeString(form.title).includes(normalizedQuery) ||
      normalizeString(form.description).includes(normalizedQuery)
    );
  }, [searchQuery]);

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Premium Header */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200 px-4 py-3.5 pr-14 md:px-8 md:py-5 md:pr-16 z-10 shadow-xs">
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand to-emerald-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
              <div className="relative bg-brand p-2 sm:p-2.5 rounded-xl shadow-md text-white">
                <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
            
            <div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-tight uppercase">Formulários</h2>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto sm:max-w-xs md:max-w-sm">
            <div className="relative flex-grow group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-brand transition-colors" />
              <Input 
                type="text" 
                placeholder="Pesquisar..." 
                autoComplete="off"
                className="pl-8 sm:pl-9 bg-slate-50 border-slate-200 focus:bg-white focus:ring-brand/20 focus:border-brand h-8 sm:h-9 md:h-10 rounded-lg sm:rounded-xl transition-all text-xs sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Forms List */}
      <div className="flex-grow overflow-y-auto p-3.5 sm:p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4">
            <AnimatePresence mode="popLayout">
              {filteredForms.map((form, index) => (
                <motion.div
                  key={form.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => window.open(form.url, "_blank")}
                  className="group relative bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-3.5 sm:p-5 shadow-xs hover:shadow-md hover:border-brand/30 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {form.date}
                      </span>
                      <div className="p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 bg-brand-light text-brand hidden sm:block">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-brand transition-colors line-clamp-2 leading-snug mb-1">
                      {form.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {form.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredForms.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Nenhum formulário encontrado</h3>
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
