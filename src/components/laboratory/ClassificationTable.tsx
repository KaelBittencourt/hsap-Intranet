import React from "react";
import { AlertTriangle } from "lucide-react";
import type { ClassificationItem } from "./types";

interface ClassificationTableProps {
  items: ClassificationItem[];
  disclaimer: string;
}

export default function ClassificationTable({
  items,
  disclaimer,
}: ClassificationTableProps) {
  return (
    <div className="p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Table */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg shadow-slate-100/50">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-purple-600 to-purple-700">
                <th className="text-left text-white text-xs font-bold uppercase tracking-wider px-6 py-4">
                  Sintoma
                </th>
                <th className="text-left text-white text-xs font-bold uppercase tracking-wider px-6 py-4">
                  Possível Reação
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={index}
                  className={`transition-colors hover:bg-purple-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-semibold text-slate-800 border-b border-slate-100">
                    {item.symptom}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 border-b border-slate-100">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold">
                      {item.possibleReaction}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed font-medium">
            {disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
