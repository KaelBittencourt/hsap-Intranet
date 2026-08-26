/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ExternalLink, FileText, Baby, Pill } from "lucide-react";

const DILUTION_DOCS = [
  {
    id: "folha-diluicao",
    title: "Folha de Diluição",
    subtitle: "Pediatria — Dose e Diluição de Medicamentos",
    description: "Folha padrão de diluição de medicamentos para uso na unidade pediátrica.",
    icon: Pill,
    color: "from-sky-500 to-blue-600",
    lightColor: "bg-sky-50",
    textColor: "text-sky-600",
    borderColor: "border-sky-200 hover:border-sky-400",
    shadowColor: "hover:shadow-sky-100",
    url: "https://drive.google.com/file/d/1fyy39wjeWZOJhmvqL_0q2B2HPQUAqRzD/view?usp=sharing",
    badge: "PDF",
    badgeColor: "bg-sky-100 text-sky-700",
  },
  {
    id: "manual-diluicao",
    title: "Manual de Diluição",
    subtitle: "Pediatria 2025",
    description: "Manual atualizado 2025 com orientações completas de diluição para a equipe de Pediatria.",
    icon: Baby,
    color: "from-violet-500 to-purple-600",
    lightColor: "bg-violet-50",
    textColor: "text-violet-600",
    borderColor: "border-violet-200 hover:border-violet-400",
    shadowColor: "hover:shadow-violet-100",
    url: "https://drive.google.com/file/d/1Us0IAQGUAK9MS1wD0Dj2GhB7IIbTDzzQ/view?usp=sharing",
    badge: "Novo · 2025",
    badgeColor: "bg-violet-100 text-violet-700",
  },
];

export default function PedDilutionSelectorModal() {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-3.5 pr-14 md:px-6 md:py-5 md:pr-16 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 shadow-md shadow-sky-200 shrink-0">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 leading-tight">
              Diluição de Medicamentos — PED
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Selecione o documento que deseja acessar
            </p>
          </div>
        </div>
      </div>

      {/* Cards de seleção */}
      <div className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-6 flex-1 justify-center">
        {DILUTION_DOCS.map((doc, idx) => (
          <motion.a
            key={doc.id}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.1 }}
            className={`group flex items-center gap-3.5 sm:gap-5 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border-2 ${doc.borderColor} bg-white transition-all duration-300 shadow-xs ${doc.shadowColor} hover:shadow-lg cursor-pointer no-underline`}
          >
            {/* Ícone */}
            <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${doc.color} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
              <doc.icon className="w-8 h-8 text-white" />
            </div>

            {/* Conteúdo */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-bold text-slate-800 text-base leading-tight">
                  {doc.title}
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${doc.badgeColor}`}>
                  {doc.badge}
                </span>
              </div>
              <p className={`text-sm font-semibold ${doc.textColor} mb-1 leading-tight`}>
                {doc.subtitle}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                {doc.description}
              </p>
            </div>

            {/* Seta */}
            <div className={`flex-shrink-0 p-2 rounded-xl ${doc.lightColor} group-hover:scale-110 transition-transform duration-200`}>
              <ExternalLink className={`w-4 h-4 ${doc.textColor}`} />
            </div>
          </motion.a>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60">
        <p className="text-xs text-slate-400 text-center">
          Os documentos serão abertos no Google Drive em uma nova aba.
        </p>
      </div>
    </div>
  );
}
