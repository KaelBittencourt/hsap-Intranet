import React from "react";
import { motion } from "motion/react";
import { Check, FileDown, Printer, X } from "lucide-react";
import type { ProtocolStep } from "./types";

interface ChecklistFinalProps {
  steps: ProtocolStep[];
  elapsedFormatted: string;
  onGeneratePDF: () => void;
  onPrint: () => void;
  onFinish: () => void;
}

export default function ChecklistFinal({
  steps,
  elapsedFormatted,
  onGeneratePDF,
  onPrint,
  onFinish,
}: ChecklistFinalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 md:p-10"
    >
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-5">
            <Check className="w-10 h-10 text-green-600" strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            Protocolo Concluído
          </h2>
          <p className="text-slate-500">
            Todas as etapas foram realizadas com sucesso.
          </p>
          <p className="text-sm text-purple-600 font-semibold mt-2">
            Tempo total: {elapsedFormatted}
          </p>
        </div>

        {/* Checklist */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Checklist de Verificação
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
                className="flex items-center gap-4 px-6 py-4"
              >
                <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-green-600" strokeWidth={3} />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {step.checklistLabel}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onGeneratePDF}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 shadow-lg shadow-purple-200 transition-all active:scale-95"
          >
            <FileDown className="w-4 h-4" />
            Gerar PDF
          </button>
          <button
            onClick={onPrint}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Imprimir
          </button>
          <button
            onClick={onFinish}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 shadow-lg shadow-green-200 transition-all active:scale-95"
          >
            <X className="w-4 h-4" />
            Finalizar Atendimento
          </button>
        </div>
      </div>
    </motion.div>
  );
}
