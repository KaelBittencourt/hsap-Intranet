import React from "react";
import { motion } from "motion/react";
import { ExternalLink, FileText } from "lucide-react";

interface TermDocument {
  id: string;
  title: string;
  url: string;
}

const termDocuments: TermDocument[] = [
  {
    id: "1",
    title: "Termo de Responsabilidade — Transfusão Rh Diferente",
    url: "https://drive.google.com/file/d/1MgfZxS50qpvENr8h1kQDM-V142MXUj_g/view?usp=sharing",
  },
  {
    id: "2",
    title: "Termo de Responsabilidade — Transfusão de Emergência",
    url: "https://drive.google.com/file/d/1ymNqXRsTrTEa69-u3r3-5k3rr1PlAdyz/view?usp=sharing",
  },
  {
    id: "3",
    title: "Termo de Consentimento — Transfusão de Hemocomponentes",
    url: "https://drive.google.com/file/d/1NGu5xmMcpfWFS1H3Oy825pJ_cOUWMA8n/view?usp=sharing",
  },
];

export default function LabTermsModal() {
  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200 px-6 py-6 md:px-8 z-10 shadow-sm shrink-0">
        <div className="relative flex items-center gap-5">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-violet-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-purple-500 p-3 rounded-2xl shadow-xl shadow-purple-500/10 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
              <FileText className="w-7 h-7 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase">
              Termos
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Termos de responsabilidade e consentimento
            </p>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="flex-grow overflow-y-auto p-6 md:p-8">
        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-3">
          {termDocuments.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.3 }}
              onClick={() => window.open(doc.url, "_blank")}
              className="group relative bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors flex-shrink-0">
                  <FileText className="w-5 h-5 text-purple-500" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800 text-sm group-hover:text-purple-700 transition-colors leading-snug">
                    {doc.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 font-semibold uppercase tracking-wider flex items-center gap-1">
                    Clique para abrir
                    <ExternalLink className="w-3 h-3" />
                  </p>
                </div>

                <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-purple-500 transition-colors flex-shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
