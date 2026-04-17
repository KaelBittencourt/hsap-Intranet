import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Search, 
  ExternalLink, 
  Activity,
  FolderOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn, normalizeString } from "@/lib/utils";

interface SkinGroupDocument {
  id: string;
  title: string;
  url: string;
  type: "document" | "spreadsheet" | "folder";
}

const documents: SkinGroupDocument[] = [
  { id: "1", title: "Instruções - TABELA CLASSIFICAÇÃO ESTÁGIO LPP", url: "https://drive.google.com/file/d/1MSnO3dlqG74a5iAx_oa_3l1GqRzviThe/view", type: "document" },
  { id: "2", title: "Instruções de USO / Tutorial - FERRAMENTA TIME", url: "https://drive.google.com/file/d/1cxK-stPrqCceBnGIbY2B9YFjUeqbzDC9/view", type: "document" },
  { id: "3", title: "PLANILHA DE CUIDADOS DE PELE", url: "https://docs.google.com/spreadsheets/d/1-xzuwmvB_rVXlDElissq21RVR4KtdvmtDt43K7cTnpU/edit", type: "spreadsheet" },
  { id: "4", title: "FORMULÁRIO AVALIAÇÃO FERIDAS", url: "https://drive.google.com/file/d/1m4kOT8nGrY3tCwW1ckuKpnfpiBRgLkjZ/view", type: "document" },
  { id: "5", title: "Modelos editáveis em DOCX", url: "https://drive.google.com/drive/folders/1MX9iKSPLVjzCoWYlBLg--0rAuGK5hTtN", type: "folder" },
  { id: "6", title: "Arquivos em PDF", url: "https://drive.google.com/drive/folders/1KGJOA4tmeqIh3xIuJ-uSG6SkNEQF2Ywo", type: "folder" }
];

export default function SkinGroupModal() {
  const [searchQuery, setSearchQuery] = useState("");

  React.useEffect(() => {
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
      normalizeString(doc.title).includes(normalizedQuery)
    );
  }, [searchQuery]);

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Premium Header - Distinctive Magenta Theme for Skin Group */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200 px-6 py-6 md:px-8 z-10 shadow-sm shrink-0">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-rose-500 p-3 rounded-2xl shadow-xl shadow-rose-500/10 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                <Activity className="w-7 h-7 text-white" />
              </div>
            </div>
            
            <div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 uppercase tracking-widest border border-rose-200">
                    Unidade de Internação
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase text-center md:text-left text-balance">
                  Grupo de Pele
                </h2>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full max-w-md">
            <div className="relative flex-grow group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
              <Input 
                type="text" 
                placeholder="Pesquisar documento..." 
                autoComplete="off"
                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:ring-rose-500/20 focus:border-rose-500 h-11 rounded-xl transition-all"
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
                  transition={{ delay: index * 0.02 }}
                  onClick={() => window.open(doc.url, "_blank")}
                  className="group relative bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-rose-500/30 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-rose-50/0 group-hover:bg-rose-50 transition-colors" />

                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 shrink-0">
                        {doc.type === "folder" ? <FolderOpen className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <h3 className="text-sm font-bold text-slate-800 group-hover:text-rose-600 transition-colors line-clamp-2 leading-tight">
                          {doc.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 bg-rose-100 text-rose-600 shrink-0">
                      <ExternalLink className="w-3.5 h-3.5" />
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
          <span className="text-[11px] text-slate-400 font-medium tracking-wider uppercase">Hospital Santo Antônio da Patrulha</span>
        </div>
      </div>
    </div>
  );
}
