import React from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { ProtocolStep } from "./types";

interface StepCardProps {
  step: ProtocolStep;
  isActive: boolean;
  isCompleted: boolean;
  isChecked: boolean;
  onCheck: (checked: boolean) => void;
  onNext: () => void;
  isLast: boolean;
}

export default function StepCard({
  step,
  isActive,
  isCompleted,
  isChecked,
  onCheck,
  onNext,
  isLast,
}: StepCardProps) {
  if (!isActive && !isCompleted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`relative rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
        isActive
          ? "border-purple-300 bg-white shadow-xl shadow-purple-100/50"
          : "border-slate-100 bg-slate-50/50 shadow-sm"
      }`}
    >
      {/* Active indicator bar */}
      {isActive && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600" />
      )}

      <div className="p-6">
        <div className="flex items-start gap-5">
          {/* Icon / Status */}
          <div
            className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 ${
              isCompleted
                ? "bg-green-100 text-green-600"
                : isActive
                ? "bg-purple-100 shadow-sm"
                : "bg-slate-100"
            }`}
          >
            {isCompleted ? (
              <Check className="w-7 h-7 text-green-600" strokeWidth={3} />
            ) : (
              <span className="text-2xl">{step.icon}</span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold text-purple-500 uppercase tracking-wider bg-purple-50 px-2 py-0.5 rounded-full">
                Etapa {step.id}
              </span>
              {isCompleted && (
                <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider bg-green-50 px-2 py-0.5 rounded-full">
                  Concluída
                </span>
              )}
            </div>

            <h3
              className={`text-lg font-bold mb-1.5 ${
                isActive ? "text-slate-900" : "text-slate-500"
              }`}
            >
              {step.title}
            </h3>

            <p
              className={`text-sm leading-relaxed ${
                isActive ? "text-slate-600" : "text-slate-400"
              }`}
            >
              {step.description}
            </p>

            {/* Checkbox + Next Button */}
            {isActive && !isCompleted && (
              <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <label
                  className="flex items-center gap-3 cursor-pointer group select-none"
                  onClick={() => onCheck(!isChecked)}
                >
                  <div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                      isChecked
                        ? "bg-purple-600 border-purple-600 shadow-sm shadow-purple-300"
                        : "border-slate-300 bg-white group-hover:border-purple-400"
                    }`}
                  >
                    {isChecked && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-purple-700 transition-colors">
                    Confirmar realização desta etapa
                  </span>
                </label>

                <button
                  onClick={onNext}
                  disabled={!isChecked}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                    isChecked
                      ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-200 hover:shadow-purple-300 active:scale-95"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {isLast ? "Finalizar Protocolo" : "Próximo →"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
