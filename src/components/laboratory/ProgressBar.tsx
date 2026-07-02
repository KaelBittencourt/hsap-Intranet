import React from "react";
import { motion } from "motion/react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
          Etapa {currentStep} de {totalSteps}
        </span>
        <span className="text-xs font-bold text-purple-600 tabular-nums">
          {percentage}%
        </span>
      </div>

      <div className="relative w-full h-2.5 bg-purple-100 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
      </div>

      {/* Step dots */}
      <div className="flex justify-between mt-2.5">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i < currentStep
                ? "bg-purple-500 scale-110 shadow-sm shadow-purple-300"
                : i === currentStep
                ? "bg-purple-300 ring-2 ring-purple-200"
                : "bg-slate-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
