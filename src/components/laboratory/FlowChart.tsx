import React from "react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

interface FlowChartProps {
  steps: string[];
}

export default function FlowChart({ steps }: FlowChartProps) {
  return (
    <div className="flex flex-col items-center py-8 px-4">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            className={`relative w-full max-w-md rounded-xl border-2 px-6 py-4 text-center transition-all ${
              index === 0
                ? "bg-red-50 border-red-300 shadow-lg shadow-red-100/50"
                : "bg-white border-slate-200 shadow-md shadow-slate-100/50 hover:border-purple-300 hover:shadow-purple-100/50"
            }`}
          >
            {/* Step number badge */}
            <div
              className={`absolute -top-3 -left-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${
                index === 0
                  ? "bg-red-500 text-white"
                  : "bg-purple-500 text-white"
              }`}
            >
              {index + 1}
            </div>

            <p
              className={`font-semibold text-sm ${
                index === 0 ? "text-red-700" : "text-slate-700"
              }`}
            >
              {step}
            </p>
          </motion.div>

          {/* Connector arrow */}
          {index < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: index * 0.08 + 0.04, duration: 0.2 }}
              className="flex flex-col items-center my-1"
            >
              <div className="w-0.5 h-5 bg-gradient-to-b from-purple-300 to-purple-400" />
              <ArrowDown className="w-4 h-4 text-purple-400 -mt-1" />
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
