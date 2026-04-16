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
      <div className="relative overflow-hidden bg-white border-b border-slate-200 px-8 py-6 z-10 shadow-sm">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-brand p-3 rounded-2xl shadow-xl shadow-brand/10 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                <ClipboardList className="w-7 h-7 text-white" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Formulários</h2>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full max-w-md">
            <div className="relative flex-grow group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand transition-colors" />
              <Input 
                type="text" 
                placeholder="Pesquisar formulário..." 
                autoComplete="off"
                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:ring-brand/20 focus:border-brand h-11 rounded-xl transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Forms List */}
      <div className="flex-grow overflow-y-auto p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredForms.map((form, index) => (
                <motion.div
                  key={form.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => window.open(form.url, "_blank")}
                  className="group relative bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-brand/30 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-brand-light/0 group-hover:bg-brand-light/10 transition-colors" />

                  <div className="relative flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-brand group-hover:text-white transition-all duration-300 shrink-0">
                      <FileEdit className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {form.date}
                        </span>
                        <div className="p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 bg-brand-light text-brand">
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                      
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand transition-colors mb-1 line-clamp-1">
                        {form.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {form.description}
                       </p>
                    </div>
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
