import React, { useState, useEffect } from "react";
import { Clock, CheckCircle2, Activity } from "lucide-react";

interface StatusPanelProps {
  isRunning: boolean;
  completedSteps: number;
  totalSteps: number;
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function StatusPanel({
  isRunning,
  completedSteps,
  totalSteps,
}: StatusPanelProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    setElapsed(0);
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-100/50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-5 py-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-purple-200" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Painel de Status
          </h4>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Status */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-50" />
          </div>
          <span className="text-sm font-bold text-slate-800">Em Atendimento</span>
        </div>

        {/* Timer */}
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-purple-500" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Tempo desde início
            </span>
          </div>
          <p className="text-3xl font-mono font-bold text-slate-900 tabular-nums tracking-wider">
            {formatTime(elapsed)}
          </p>
        </div>

        {/* Steps counter */}
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-purple-500" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Etapas concluídas
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold text-slate-900 tabular-nums">
              {completedSteps}
            </span>
            <span className="text-lg text-slate-400 font-semibold">/ {totalSteps}</span>
          </div>

          {/* Mini progress */}
          <div className="mt-3 flex gap-1">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i < completedSteps
                    ? "bg-purple-500"
                    : "bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
