import React, { useState, useEffect, useMemo } from "react";
import { 
  Pill, 
  Search, 
  RefreshCw,
  AlertCircle,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import Papa from "papaparse";
import { motion, AnimatePresence } from "motion/react";
import { normalizeString } from "@/lib/utils";

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
      normalizeString(med.indicacao).includes(normalizedQuery) || 
      normalizeString(med.praticaAssistencial).includes(normalizedQuery)
    );
  }, [searchQuery, data]);

  const toggleExpand = (index: number) => {
    setExpandedId(expandedId === index ? null : index);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden rounded-xl">
      {/* Header */}
      <div className="bg-white border-b px-6 py-6 shadow-sm z-10 shrink-0">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
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
                <span className="text-xs text-slate-400 font-medium tracking-wide">Guia Rápido</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-1/3 shrink-0">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Buscar medicamento ou indicação..." 
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
      <ScrollArea className="flex-grow">
        <div className="max-w-[1000px] mx-auto p-4 md:p-6 pb-12">
          {error && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center shadow-sm max-w-xl mx-auto mb-6">
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

          <div className="flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                    <Skeleton className="h-6 w-1/3 mb-3" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))
              ) : filteredData.length > 0 ? (
                filteredData.map((med, index) => {
                  const isExpanded = expandedId === index;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.05, 0.3) }}
                      className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-2 ring-emerald-500/20' : 'hover:border-emerald-500/40'}`}
                    >
                      {/* Cabecalho do Card (Sempre Visível) */}
                      <div 
                        className="p-5 md:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                        onClick={() => toggleExpand(index)}
                      >
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-800 mb-1 leading-tight">
                            {med.medicamento}
                          </h3>
                          
                          {/* Informacoes Principais Resumidas */}
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                            {med.indicacao && med.indicacao.trim() !== "-" && med.indicacao.trim() !== "_" && (
                              <div className="text-sm">
                                <span className="font-semibold text-slate-400 mr-1.5 uppercase tracking-wide text-xs">Indicação:</span>
                                <span className="text-slate-600">{med.indicacao}</span>
                              </div>
                            )}
                            
                            {med.via && med.via.trim() !== "-" && med.via.trim() !== "_" && (
                              <div className="text-sm">
                                <span className="font-semibold text-slate-400 mr-1.5 uppercase tracking-wide text-xs">Via:</span>
                                <span className="text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{med.via}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`shrink-0 h-9 px-4 gap-2 border transition-all duration-300 ${isExpanded ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-800' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(index);
                          }}
                        >
                          <span className="font-medium">{isExpanded ? 'Ocultar Detalhes' : 'Ver Mais'}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </Button>
                      </div>

                      {/* Area Expandida (Detalhes) */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="border-t border-slate-100 bg-slate-50/50"
                          >
                            <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm">
                              {/* Preparo e Administracao */}
                              <div className="space-y-4">
                                <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs border-b border-emerald-100 pb-2 flex items-center gap-2">
                                  <Pill className="w-3.5 h-3.5 text-emerald-500" /> Preparo e Administração
                                </h4>
                                
                                <div>
                                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Reconstituição</span>
                                  <p className="text-slate-700 leading-relaxed font-medium">
                                    {med.reconstituicao && med.reconstituicao.trim() !== "-" && med.reconstituicao.trim() !== "_" ? med.reconstituicao : <span className="text-slate-300">-</span>}
                                  </p>
                                </div>

                                <div>
                                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Diluição</span>
                                  <p className="text-slate-700 leading-relaxed font-medium">
                                    {med.diluicao && med.diluicao.trim() !== "-" && med.diluicao.trim() !== "_" ? med.diluicao : <span className="text-slate-300">-</span>}
                                  </p>
                                </div>

                                <div>
                                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tempo de Infusão / Velocidade</span>
                                  <p className="text-slate-700 leading-relaxed font-medium">
                                    {med.velocidade && med.velocidade.trim() !== "-" && med.velocidade.trim() !== "_" ? med.velocidade : <span className="text-slate-300">-</span>}
                                  </p>
                                </div>
                              </div>

                              {/* Cuidados */}
                              <div className="space-y-4">
                                <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs border-b border-emerald-100 pb-2 flex items-center gap-2">
                                  <AlertCircle className="w-3.5 h-3.5 text-emerald-500" /> Estabilidade e Cuidados
                                </h4>
                                
                                <div>
                                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Estabilidade</span>
                                  <p className="text-slate-700 leading-relaxed font-medium">
                                    {med.estabilidade && med.estabilidade.trim() !== "-" && med.estabilidade.trim() !== "_" ? med.estabilidade : <span className="text-slate-300">-</span>}
                                  </p>
                                </div>

                                <div>
                                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Prática Assistencial</span>
                                  <div className="bg-white border border-emerald-100 p-3 rounded-lg text-slate-700 leading-relaxed shadow-sm font-medium">
                                    {med.praticaAssistencial && med.praticaAssistencial.trim() !== "-" && med.praticaAssistencial.trim() !== "_" ? med.praticaAssistencial : <span className="text-slate-300">-</span>}
                                  </div>
                                </div>

                                <div>
                                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Observações Gerais</span>
                                  <p className="text-slate-500 text-sm leading-relaxed italic">
                                    {med.observacoes && med.observacoes.trim() !== "-" && med.observacoes.trim() !== "_" ? med.observacoes : <span className="text-slate-300">-</span>}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              ) : (
                <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <Search className="w-12 h-12 mb-4 opacity-20 text-emerald-500" />
                    <p className="font-bold text-slate-600 text-xl mb-1">Nenhum resultado encontrado</p>
                    <p className="text-sm">Não localizamos medicamentos correspondentes à sua busca.</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
