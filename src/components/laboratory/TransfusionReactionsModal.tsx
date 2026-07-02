import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  AlertTriangle,
  GitBranch,
  Info,
  TableProperties,
  ClipboardList,
  FlaskConical,
  ArrowLeft,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import ProgressBar from "./ProgressBar";
import StepCard from "./StepCard";
import StatusPanel from "./StatusPanel";
import FlowChart from "./FlowChart";
import ClassificationTable from "./ClassificationTable";
import ChecklistFinal from "./ChecklistFinal";
import { TRANSFUSION_REACTIONS_PROTOCOL } from "./protocols-data";

type TabType = "protocolo" | "fluxograma" | "importante" | "classificacao";
type ViewState = "landing" | "wizard" | "completed";

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function TransfusionReactionsModal() {
  const protocol = TRANSFUSION_REACTIONS_PROTOCOL;

  const [viewState, setViewState] = useState<ViewState>("landing");
  const [activeTab, setActiveTab] = useState<TabType>("protocolo");
  const [currentStep, setCurrentStep] = useState(0);
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer management
  useEffect(() => {
    if (viewState === "wizard") {
      setElapsed(0);
      timerRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [viewState]);

  const handleStartProtocol = useCallback(() => {
    setViewState("wizard");
    setCurrentStep(0);
    setCheckedSteps(new Set());
    setCompletedSteps(new Set());
    setActiveTab("protocolo");
  }, []);

  const handleCheckStep = useCallback(
    (stepIndex: number, checked: boolean) => {
      setCheckedSteps((prev) => {
        const next = new Set(prev);
        if (checked) next.add(stepIndex);
        else next.delete(stepIndex);
        return next;
      });
    },
    []
  );

  const handleNextStep = useCallback(() => {
    setCompletedSteps((prev) => new Set(prev).add(currentStep));
    setCheckedSteps((prev) => {
      const next = new Set(prev);
      next.delete(currentStep);
      return next;
    });

    if (currentStep < protocol.steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Protocol complete
      if (timerRef.current) clearInterval(timerRef.current);
      setViewState("completed");
    }
  }, [currentStep, protocol.steps.length]);

  const handleGeneratePDF = useCallback(() => {
    window.print();
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleFinish = useCallback(() => {
    setViewState("landing");
    setCurrentStep(0);
    setCheckedSteps(new Set());
    setCompletedSteps(new Set());
    setElapsed(0);
  }, []);

  const handleBackToLanding = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setViewState("landing");
    setCurrentStep(0);
    setCheckedSteps(new Set());
    setCompletedSteps(new Set());
    setElapsed(0);
  }, []);

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "protocolo", label: "Protocolo", icon: <ClipboardList className="w-4 h-4" /> },
    { id: "fluxograma", label: "Fluxograma", icon: <GitBranch className="w-4 h-4" /> },
    { id: "importante", label: "Importante", icon: <Info className="w-4 h-4" /> },
    { id: "classificacao", label: "Classificação", icon: <TableProperties className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden print:bg-white">
      {/* Header */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200 px-6 py-5 md:px-8 z-10 shadow-sm shrink-0">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            {viewState !== "landing" && (
              <button
                onClick={handleBackToLanding}
                className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-violet-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-purple-500 p-3 rounded-2xl shadow-xl shadow-purple-500/10 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                <FlaskConical className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-none uppercase text-center md:text-left text-balance">
                  {protocol.title}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1 hidden md:block">
                Protocolos Assistenciais — Laboratório
              </p>
            </div>
          </div>

          {/* Tabs */}
          {viewState === "wizard" && (
            <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-0.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === tab.id
                      ? "bg-white text-purple-700 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-grow min-h-0 print:overflow-visible">
        <AnimatePresence mode="wait">
          {/* ===================== LANDING ===================== */}
          {viewState === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-12"
            >
              <div className="max-w-lg text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-purple-100 mb-6">
                  <span className="text-5xl">🩸</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3 uppercase">
                  {protocol.title}
                </h1>

                {/* Subtitle */}
                <p className="text-lg text-slate-600 mb-8">
                  {protocol.subtitle}
                </p>

                {/* Alert Banner */}
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: [0.95, 1.02, 1] }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-red-600 text-white font-black text-lg md:text-xl px-8 py-5 rounded-2xl mb-8 shadow-xl shadow-red-200 flex items-center justify-center gap-3"
                >
                  <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                  {protocol.alertBanner}
                </motion.div>

                {/* Start Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={handleStartProtocol}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-purple-600 text-white font-bold text-lg rounded-2xl hover:bg-purple-700 shadow-xl shadow-purple-200 transition-all active:scale-95 hover:shadow-purple-300"
                >
                  <Play className="w-6 h-6" />
                  Iniciar Protocolo
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ===================== WIZARD ===================== */}
          {viewState === "wizard" && (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 md:p-8"
            >
              {activeTab === "protocolo" && (
                <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
                  {/* Main wizard area */}
                  <div className="flex-1 min-w-0">
                    {/* Progress Bar */}
                    <div className="mb-8">
                      <ProgressBar
                        currentStep={completedSteps.size}
                        totalSteps={protocol.steps.length}
                      />
                    </div>

                    {/* Steps */}
                    <div className="space-y-4">
                      {protocol.steps.map((step, index) => (
                        <StepCard
                          key={step.id}
                          step={step}
                          isActive={index === currentStep}
                          isCompleted={completedSteps.has(index)}
                          isChecked={checkedSteps.has(index)}
                          onCheck={(checked) => handleCheckStep(index, checked)}
                          onNext={handleNextStep}
                          isLast={index === protocol.steps.length - 1}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Status Panel - sidebar on desktop, below on mobile */}
                  <div className="w-full lg:w-72 flex-shrink-0">
                    <div className="lg:sticky lg:top-4">
                      <StatusPanel
                        isRunning={viewState === "wizard"}
                        completedSteps={completedSteps.size}
                        totalSteps={protocol.steps.length}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "fluxograma" && (
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      Fluxograma do Protocolo
                    </h3>
                    <p className="text-sm text-slate-500">
                      Visão geral sequencial de todas as etapas
                    </p>
                  </div>
                  <FlowChart steps={protocol.flowchartSteps} />
                </div>
              )}

              {activeTab === "importante" && (
                <div className="max-w-2xl mx-auto py-8">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border-2 border-amber-200 shadow-xl shadow-amber-50 overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-white" />
                      <h3 className="text-lg font-bold text-white">
                        Importante
                      </h3>
                    </div>
                    <div className="p-6 md:p-8">
                      {protocol.importantText
                        .split("\n\n")
                        .map((paragraph, i) => (
                          <p
                            key={i}
                            className="text-slate-700 leading-relaxed text-base mb-4 last:mb-0"
                          >
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  </motion.div>
                </div>
              )}

              {activeTab === "classificacao" && (
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      Classificação de Reações
                    </h3>
                    <p className="text-sm text-slate-500">
                      Tabela de apoio para identificação clínica
                    </p>
                  </div>
                  <ClassificationTable
                    items={protocol.classification}
                    disclaimer={protocol.classificationDisclaimer}
                  />
                </div>
              )}
            </motion.div>
          )}

          {/* ===================== COMPLETED ===================== */}
          {viewState === "completed" && (
            <motion.div
              key="completed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ChecklistFinal
                steps={protocol.steps}
                elapsedFormatted={formatTime(elapsed)}
                onGeneratePDF={handleGeneratePDF}
                onPrint={handlePrint}
                onFinish={handleFinish}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollArea>

      {/* Print Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          body * { visibility: hidden; }
          .print\\:bg-white, .print\\:bg-white * { visibility: visible; }
          .print\\:hidden { display: none !important; }
          .print\\:overflow-visible { overflow: visible !important; height: auto !important; }
        }
      `,
        }}
      />
    </div>
  );
}
