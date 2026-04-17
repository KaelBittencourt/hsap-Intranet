import React, { useState, useEffect, useMemo } from "react";
import { 
  Pill, 
  Search, 
  RefreshCw,
  AlertCircle,
  Clock,
  Syringe,
  Info,
  ShieldCheck,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import Papa from "papaparse";
import { motion, AnimatePresence } from "motion/react";
import { cn, normalizeString } from "@/lib/utils";

interface MedicationData {
  medicamento: string;
  via: string;
  reconstituicao: string;
  diluicao: string;
  praticaAssistencial: string;
  velocidade: string;
  estabilidade: string;
  observacoes: string;
  indicacao: string;
  paraFarmaceuticos: string;
}

const SHEET_URL = "https://docs.google.com/spreadsheets/d/1J2kw3mL9Zivx_uJVXdGZ6r0OApE0NBMbR-LrRbYJ1g4/export?format=csv";

export default function MedicationDilutionModal() {
  const [data, setData] = useState<MedicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(SHEET_URL);
      if (!response.ok) throw new Error("Erro ao carregar dados da planilha.");
      
      const csvData = await response.text();
      
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const formattedData: MedicationData[] = results.data.map((row: any) => ({
            medicamento: row["Medicamento"] || "",
            via: row["Via de administração"] || "",
            reconstituicao: row["Reconstituição"] || "",
            diluicao: row["Diluição"] || "",
            praticaAssistencial: row["Prática assistencial"] || "",
            velocidade: row["Tempo de infusão/velocidade"] || "",
            estabilidade: row["Estabilidade"] || "",
            observacoes: row["Obervações"] || row["Observações"] || "",
            indicacao: row["Indicação de uso"] || "",
            paraFarmaceuticos: row["Para Farmacêuticos"] || ""
          })).filter(m => m.medicamento.trim() !== "");
          
          // Sort alphabetically by medicamento name
          formattedData.sort((a, b) => a.medicamento.localeCompare(b.medicamento));
          
          setData(formattedData);
          setLoading(false);
        },
        error: (err: any) => {
          console.error("CSV Parse Error:", err);
          setError("Erro ao processar as informações da planilha.");
          setLoading(false);
        }
      });
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Não foi possível conectar à planilha de diluição. Tente novamente mais tarde.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    const normalizedQuery = normalizeString(searchQuery);
    return data.filter(med => 
      normalizeString(med.medicamento).includes(normalizedQuery) ||
      normalizeString(med.indicacao).includes(normalizedQuery)
    );
  }, [searchQuery, data]);

  const toggleExpand = (index: number) => {
    setExpandedId(expandedId === index ? null : index);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b px-6 py-6 md:px-8 shadow-sm z-10 shrink-0">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 w-full md:w-auto">
            <div className="relative group">
              <div className="absolute -inset-2 bg-emerald-500/20 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-emerald-50 p-3.5 rounded-2xl border border-emerald-100 shadow-sm text-emerald-600">
                <Pill className="w-7 h-7" />
              </div>
            </div>
            
            <div className="flex-grow">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase text-balance mb-1.5">
                Diluição de Medicamentos
              </h2>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-widest border border-emerald-200">
                  Rotinas Assistenciais
                </span>
                <span className="text-xs text-slate-400 font-medium tracking-wide">Guia Prático Rápido</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-1/3 shrink-0">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Buscar por medicamento ou indicação..." 
                className="pl-9 h-11 bg-white border-slate-200 rounded-xl focus:ring-emerald-500/20 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-11 w-11 rounded-xl bg-white shrink-0"
              onClick={fetchData}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 text-slate-500 ${loading ? 'animate-spin text-emerald-500' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto pb-10">
          {error && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center mb-8 shadow-sm">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <h3 className="font-bold text-amber-900 mb-1">Aviso de Sincronização</h3>
              <p className="text-sm text-amber-700/80 mb-4">{error}</p>
              <Button 
                variant="outline" 
                className="bg-white border-amber-200 text-amber-700 hover:bg-amber-100"
                onClick={fetchData}
              >
                Tentar Novamente
              </Button>
            </div>
          )}

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4 shadow-sm">
                    <div className="flex justify-between items-start">
                      <Skeleton className="h-6 w-1/3" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))
              ) : filteredData.length > 0 ? (
                filteredData.map((med, index) => {
                  const isExpanded = expandedId === index;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.05, 0.5) }}
                      className={cn(
                        "bg-white rounded-2xl border transition-all duration-300 overflow-hidden",
                        isExpanded ? "border-emerald-300 shadow-md ring-1 ring-emerald-500/10" : "border-slate-200 shadow-sm hover:border-emerald-200"
                      )}
                    >
                      {/* Card Header (Always Visible) */}
                      <button 
                        onClick={() => toggleExpand(index)}
                        className="w-full relative flex items-start sm:items-center justify-between p-5 md:p-6 text-left gap-4 hover:bg-slate-50/50 transition-colors"
                      >
                        <div className="flex items-start sm:items-center gap-4 min-w-0">
                          <div className={cn(
                            "hidden sm:flex mt-1 sm:mt-0 items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors",
                            isExpanded ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                          )}>
                            <Syringe className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-lg md:text-xl font-bold text-slate-800 leading-tight mb-1">
                              {med.medicamento}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              {med.via && med.via !== "-" && med.via !== "_" && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                                  {med.via}
                                </span>
                              )}
                              {med.indicacao && med.indicacao !== "-" && med.indicacao !== "_" && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 truncate max-w-[200px] md:max-w-md">
                                  {med.indicacao}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="shrink-0 p-2 text-slate-400 bg-slate-50 rounded-full">
                          <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", isExpanded && "rotate-180 text-emerald-600")} />
                        </div>
                      </button>

                      {/* Expandable Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-5 md:p-6 pt-0 border-t border-slate-100 bg-emerald-50/20 text-sm">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-6">
                                
                                {med.diluicao && med.diluicao !== "-" && med.diluicao !== "_" && (
                                  <div className="space-y-1.5">
                                    <div className="flex items-center gap-1.5 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Diluição
                                    </div>
                                    <p className="text-slate-800 leading-relaxed font-medium whitespace-pre-line">{med.diluicao}</p>
                                  </div>
                                )}
                                
                                {med.reconstituicao && med.reconstituicao !== "-" && med.reconstituicao !== "_" && (
                                  <div className="space-y-1.5">
                                    <div className="flex items-center gap-1.5 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                                      <RefreshCw className="w-3.5 h-3.5 text-blue-500" /> Reconstituição
                                    </div>
                                    <p className="text-slate-800 leading-relaxed font-medium whitespace-pre-line">{med.reconstituicao}</p>
                                  </div>
                                )}

                                {med.velocidade && med.velocidade !== "-" && med.velocidade !== "_" && (
                                  <div className="space-y-1.5">
                                    <div className="flex items-center gap-1.5 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                                      <Clock className="w-3.5 h-3.5 text-amber-500" /> Tempo / Velocidade
                                    </div>
                                    <p className="text-slate-800 leading-relaxed whitespace-pre-line">{med.velocidade}</p>
                                  </div>
                                )}

                                {med.estabilidade && med.estabilidade !== "-" && med.estabilidade !== "_" && (
                                  <div className="space-y-1.5">
                                    <div className="flex items-center gap-1.5 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                                      <Activity className="w-3.5 h-3.5 text-indigo-500" /> Estabilidade
                                    </div>
                                    <p className="text-slate-800 leading-relaxed whitespace-pre-line">{med.estabilidade}</p>
                                  </div>
                                )}

                                {med.praticaAssistencial && med.praticaAssistencial !== "-" && med.praticaAssistencial !== "_" && (
                                  <div className="space-y-1.5 md:col-span-2">
                                    <div className="flex items-center gap-1.5 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                                      <Info className="w-3.5 h-3.5 text-rose-500" /> Prática Assistencial
                                    </div>
                                    <p className="text-slate-800 leading-relaxed whitespace-pre-line p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                                      {med.praticaAssistencial}
                                    </p>
                                  </div>
                                )}

                                {med.observacoes && med.observacoes !== "-" && med.observacoes !== "_" && (
                                  <div className="space-y-1.5 md:col-span-2">
                                    <div className="flex items-center gap-1.5 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                                      <AlertCircle className="w-3.5 h-3.5 text-slate-400" /> Observações
                                    </div>
                                    <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm italic">
                                      {med.observacoes}
                                    </p>
                                  </div>
                                )}

                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-slate-400 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <Search className="w-12 h-12 mb-4 opacity-20 text-emerald-500" />
                  <p className="font-bold text-slate-600 text-lg">Nenhum medicamento encontrado</p>
                  <p className="text-sm mt-1">Verifique a ortografia ou tente outro termo de busca.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
