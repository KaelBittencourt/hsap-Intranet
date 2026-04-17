import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Search, 
  ExternalLink,
  BellRing,
  FolderOpen,
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { normalizeString } from "@/lib/utils";

interface ItemDoc {
  id: string;
  title: string;
  url: string;
}

const notificacoes: ItemDoc[] = [
  { id: "1", title: "Suspeita de Endoftalmite", url: "https://docs.google.com/forms/d/e/1FAIpQLSfSjwyj5EzLEodHjabteZ_YI8BDgz1DRzMOC6CBRiSFomI5pA/viewform" },
  { id: "2", title: "Contenção Mecânica", url: "https://docs.google.com/forms/d/e/1FAIpQLSfDL4r2FkYL5eDeZ-dRzxTpsORCLWvWE5Aogk_w-14vQ2ua2g/viewform" },
  { id: "3", title: "Acidente de Trabalho", url: "https://docs.google.com/forms/d/e/1FAIpQLSebZemyYN-pdLEMmjV_9cey2Dz0OoABW5lzesMVDOqDOfjRig/viewform" },
  { id: "4", title: "Evento adverso", url: "https://docs.google.com/forms/d/e/1FAIpQLSc82dwssQmjmqrnE9ACIBHYX_b1FRqC3JwlVqs6M3TgEuWdig/viewform" },
  { id: "5", title: "Material hospitalar", url: "https://docs.google.com/forms/d/e/1FAIpQLSdSHL6ENtL0j1Rfxhn_E-_6ZfUDQHo9J65j_PqMlXQYJK2Ubg/viewform" },
  { id: "6", title: "Queda", url: "https://docs.google.com/forms/d/e/1FAIpQLSdoezrBiKDX6qVERMM2SMY1PJvci0JEavGFX9WbvxiQm-640Q/viewform" },
  { id: "7", title: "Flebite", url: "https://docs.google.com/forms/d/e/1FAIpQLSfRsjXsRcskaLgkZE2Zngjcxo2WRAiY4ISa6dqCgsN_2Em7Jw/viewform" },
  { id: "8", title: "Medicamentos", url: "https://docs.google.com/forms/d/e/1FAIpQLSeG1iSji4gxxIr28LjTQWDLpSb9M9i85v3gBQAnSpTPuEgPtw/viewform" },
  { id: "9", title: "Dengue", url: "https://docs.google.com/forms/d/e/1FAIpQLSeaqBNOWtx3Qqpc4YE3HulrGnqtqM-LrnQ8r2PCizH45J2h8Q/viewform" },
  { id: "10", title: "Inconformidade em Prontuário", url: "https://docs.google.com/forms/d/e/1FAIpQLSff88FJ4MFPR6Sw0NVz8MUDXpxTkRRRKw0VK_vTS-oEpb3FHw/viewform" },
  { id: "11", title: "Inconformidades dos Processos Assistenciais", url: "https://docs.google.com/forms/d/e/1FAIpQLSfGMDqjhEGzfX1Mrjj9w87GhZjl6Nn10bPxhmIZN_qJaVly2Q/viewform" },
  { id: "12", title: "Solicitação de compra", url: "https://docs.google.com/forms/d/e/1FAIpQLSfxe8BnkR7NromoEqPYAdVMu6YSBpNNWPX8cwinbhV30TZafA/viewform" },
  { id: "13", title: "Taxas Cirúrgicas", url: "https://docs.google.com/forms/d/e/1FAIpQLScGokXkG6Fckx3k3Q6fttpavWAO8xM4mU0la6vJekxX1wHm3Q/viewform" }
];

const documentos: ItemDoc[] = [
  { id: "d1", title: "Acidente de Trabalho Com Material Biológico", url: "https://drive.google.com/file/d/11ePUa632TnRAC3OjcZHlvwKsJ8HHkxQA/view?usp=sharing" },
  { id: "d2", title: "Acidente de Trabalho SEM Material Biológico", url: "https://drive.google.com/file/d/1-KZrJL-YENT9DVXwExyTZagRWJY_qgvN/view?usp=sharing" },
  { id: "d3", title: "Guia de Encaminhamento ao DML Necropsia", url: "https://drive.google.com/file/d/1zqptiQfG41CrB1xW5OAdhxny-iI_lS3E/view?usp=sharing" },
  { id: "d4", title: "Lista de Presença", url: "https://drive.google.com/file/d/1SJkpPE9vRVCLfHZBV20XYf-1DLn-ikli/view?usp=sharing" },
  { id: "d5", title: "Termo de Validação de Medicamento Extra Hospitalar", url: "https://drive.google.com/file/d/1glPav-qtr1W68RZpglbvVQrbNENw6PNW/view?usp=sharing" }
];

export default function NotificationsAndDocsModal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"notificacao" | "documento">("notificacao");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (document.activeElement instanceof HTMLInputElement) {
        document.activeElement.blur();
      }
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const currentList = activeTab === "notificacao" ? notificacoes : documentos;

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeString(searchQuery);
    return currentList.filter(item => 
      normalizeString(item.title).includes(normalizedQuery)
    );
  }, [searchQuery, currentList]);

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Premium Header */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200 px-6 py-6 md:px-8 z-10 shadow-sm shrink-0">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-emerald-500 p-3 rounded-2xl shadow-xl shadow-emerald-500/10 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500 text-white">
                {activeTab === "notificacao" ? <BellRing className="w-7 h-7" /> : <FolderOpen className="w-7 h-7" />}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase text-center md:text-left">
                  {activeTab === "notificacao" ? "Notificações" : "Documentos"}
                </h2>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full max-w-md">
            <div className="relative flex-grow group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <Input 
                type="text" 
                placeholder="Pesquisar..." 
                autoComplete="off"
                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:ring-emerald-500/20 focus:border-emerald-500 h-11 rounded-xl transition-all shadow-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl w-full max-w-sm mx-auto md:mx-0">
          <button
            onClick={() => { setActiveTab("notificacao"); setSearchQuery(""); }}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === "notificacao" 
                ? "bg-white text-emerald-600 shadow-sm border border-slate-200/50" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
            }`}
          >
            <BellRing className="w-4 h-4" /> Notificações
          </button>
          <button
            onClick={() => { setActiveTab("documento"); setSearchQuery(""); }}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === "documento" 
                ? "bg-white text-emerald-600 shadow-sm border border-slate-200/50" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
            }`}
          >
            <FolderOpen className="w-4 h-4" /> Documentos
          </button>
        </div>
      </div>

      {/* List content */}
      <div className="flex-grow overflow-y-auto p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-3">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.02 }}
                  onClick={() => window.open(doc.url, "_blank")}
                  className="group relative bg-white rounded-2xl border border-slate-200 p-4 md:p-5 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-emerald-50/0 group-hover:bg-emerald-50/50 transition-colors" />

                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="p-3 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shrink-0">
                        {activeTab === "notificacao" ? <Send className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <h3 className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-tight">
                          {doc.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 bg-emerald-100 text-emerald-600 shrink-0 hidden md:block">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Nenhum resultado encontrado</h3>
              <p className="text-sm text-slate-500">Tente buscar usando outro termo.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
