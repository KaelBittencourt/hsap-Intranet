import React, { useState, useEffect, useMemo } from "react";
import { 
  Pill, 
  Search, 
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden rounded-xl">
      {/* Header */}
      <div className="bg-white border-b px-6 py-6 shadow-sm z-10 shrink-0">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
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
                <span className="text-xs text-slate-400 font-medium tracking-wide">Tabela Completa</span>
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
        <div className="max-w-[1600px] mx-auto p-4 md:p-6 pb-12">
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

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="min-w-[1200px] text-sm">
                <TableHeader className="bg-slate-50 sticky top-0 z-10 shadow-sm">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[180px] font-bold text-slate-700 uppercase text-xs truncate">Medicamento</TableHead>
                    <TableHead className="w-[120px] font-bold text-slate-700 uppercase text-xs">Via</TableHead>
                    <TableHead className="w-[180px] font-bold text-slate-700 uppercase text-xs">Reconstituição</TableHead>
                    <TableHead className="w-[180px] font-bold text-slate-700 uppercase text-xs">Diluição</TableHead>
                    <TableHead className="w-[150px] font-bold text-slate-700 uppercase text-xs">Tempo/Velocidade</TableHead>
                    <TableHead className="w-[180px] font-bold text-slate-700 uppercase text-xs">Estabilidade</TableHead>
                    <TableHead className="w-[200px] font-bold text-slate-700 uppercase text-xs">Prática Assistencial</TableHead>
                    <TableHead className="min-w-[200px] font-bold text-slate-700 uppercase text-xs">Observações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence mode="popLayout">
                    {loading ? (
                      Array.from({ length: 8 }).map((_, i) => (
                        <TableRow key={i}>
                          {Array.from({ length: 8 }).map((_, j) => (
                            <TableCell key={j} className="py-4">
                              <Skeleton className="h-4 w-full" />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : filteredData.length > 0 ? (
                      filteredData.map((med, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: Math.min(index * 0.02, 0.2) }}
                          className="hover:bg-slate-50/80 transition-colors group align-top border-b border-slate-100 last:border-0"
                        >
                          <TableCell className="font-bold text-slate-800 py-4 whitespace-normal">
                            {med.medicamento}
                            {med.indicacao && med.indicacao.trim() !== "-" && med.indicacao.trim() !== "_" && (
                              <div className="mt-1">
                                <span className="inline-block px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-medium leading-tight">
                                  {med.indicacao}
                                </span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="py-4">
                            {med.via && med.via.trim() !== "-" && med.via.trim() !== "_" ? (
                              <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-xs border border-blue-100/50 whitespace-pre-line">
                                {med.via}
                              </span>
                            ) : (
                              <span className="text-slate-300">-</span>
                            )}
                          </TableCell>
                          <TableCell className="py-4 text-slate-600 whitespace-pre-line leading-relaxed">
                            {med.reconstituicao && med.reconstituicao.trim() !== "-" && med.reconstituicao.trim() !== "_" ? med.reconstituicao : <span className="text-slate-300">-</span>}
                          </TableCell>
                          <TableCell className="py-4 text-slate-600 whitespace-pre-line leading-relaxed">
                            {med.diluicao && med.diluicao.trim() !== "-" && med.diluicao.trim() !== "_" ? med.diluicao : <span className="text-slate-300">-</span>}
                          </TableCell>
                          <TableCell className="py-4 text-slate-600 whitespace-pre-line leading-relaxed text-sm">
                            {med.velocidade && med.velocidade.trim() !== "-" && med.velocidade.trim() !== "_" ? med.velocidade : <span className="text-slate-300">-</span>}
                          </TableCell>
                          <TableCell className="py-4 text-slate-600 whitespace-pre-line leading-relaxed text-xs">
                            {med.estabilidade && med.estabilidade.trim() !== "-" && med.estabilidade.trim() !== "_" ? med.estabilidade : <span className="text-slate-300">-</span>}
                          </TableCell>
                          <TableCell className="py-4 text-slate-700 whitespace-pre-line leading-relaxed font-medium bg-emerald-50/30">
                            {med.praticaAssistencial && med.praticaAssistencial.trim() !== "-" && med.praticaAssistencial.trim() !== "_" ? med.praticaAssistencial : <span className="text-slate-300">-</span>}
                          </TableCell>
                          <TableCell className="py-4 text-slate-500 whitespace-pre-line leading-relaxed text-xs italic">
                            {med.observacoes && med.observacoes.trim() !== "-" && med.observacoes.trim() !== "_" ? med.observacoes : <span className="text-slate-300">-</span>}
                          </TableCell>
                        </motion.tr>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-64 text-center">
                          <div className="flex flex-col items-center justify-center text-slate-400">
                            <Search className="w-10 h-10 mb-3 opacity-20 text-emerald-500" />
                            <p className="font-bold text-slate-600 text-lg">Nenhum resultado</p>
                            <p className="text-sm mt-1">Sua busca não encontrou medicamentos correspondentes.</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
