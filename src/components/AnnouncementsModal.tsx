import React, { useState, useEffect } from "react";
import { 
  Bell, 
  Calendar, 
  Clock, 
  RefreshCw, 
  Search, 
  AlertCircle,
  Megaphone,
  CheckCircle2,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Papa from "papaparse";
import { motion, AnimatePresence } from "motion/react";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { normalizeString } from "@/lib/utils";

interface Announcement {
  timestamp: string;
  message: string;
  sender: string;
  role: string;
  id: string;
}

const SHEET_URL = "https://docs.google.com/spreadsheets/d/1x2C_Ho2NNK8qB3UCViPP29q1eFTFa5WrwOwzwSgKQus/export?format=csv";

export default function AnnouncementsModal() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof document !== 'undefined') {
        (document.activeElement as HTMLElement)?.blur();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const fetchAnnouncements = async () => {
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
          const formattedData: Announcement[] = results.data.map((row: any, index: number) => ({
            timestamp: row["Carimbo de data/hora"] || "",
            message: row["Faça seu Comunicado"] || "",
            sender: row["Quem está enviando o comunicado?"] || "",
            role: row["Seu Cargo / Ocupação no HSAP?"] || "",
            id: `announcement-${index}`
          })).reverse(); // Newest first
          
          setAnnouncements(formattedData);
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
      setError("Não foi possível conectar à planilha. Verifique se ela está como 'Qualquer pessoa com o link pode ler' ou tente novamente mais tarde.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const filteredAnnouncements = announcements.filter(ann => {
    const normalizedQuery = normalizeString(searchQuery);
    return normalizeString(ann.message).includes(normalizedQuery) ||
           normalizeString(ann.timestamp).includes(normalizedQuery);
  });

  const formatTimestamp = (ts: string) => {
    try {
      // Input format: 16/04/2026 13:59:20
      const date = parse(ts, "dd/MM/yyyy HH:mm:ss", new Date());
      return format(date, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR });
    } catch (e) {
      return ts;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b px-6 py-6 shadow-sm z-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-brand p-2.5 rounded-2xl shadow-lg shadow-brand/20">
              <Megaphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase text-center md:text-left text-balance">Comunicados Oficiais</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Atualizações em tempo real</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Filtrar por texto..." 
                className="pl-9 h-10 bg-slate-50 border-slate-200 rounded-xl focus:ring-brand/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 rounded-xl"
              onClick={fetchAnnouncements}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-grow p-6">
        <div className="max-w-4xl mx-auto min-h-full">
          {error && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center mb-8">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <h3 className="font-bold text-amber-900 mb-1">Aviso de Acesso</h3>
              <p className="text-sm text-amber-700/80 mb-4">{error}</p>
              <Button 
                variant="outline" 
                className="bg-white border-amber-200 text-amber-700 hover:bg-amber-100"
                onClick={() => window.open("https://docs.google.com/spreadsheets/d/1x2C_Ho2NNK8qB3UCViPP29q1eFTFa5WrwOwzwSgKQus/edit", "_blank")}
              >
                Abrir Planilha
              </Button>
            </div>
          )}

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 space-y-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-2/3" />
                  </div>
                ))
              ) : filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((ann, index) => (
                  <motion.div
                    key={ann.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                        <Calendar className="w-3 h-3" />
                        {formatTimestamp(ann.timestamp)}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4">
                        <div className="mt-1">
                          <div className="w-2 h-2 rounded-full bg-brand shadow-sm shadow-brand/20 animate-pulse" />
                        </div>
                        <p className="text-slate-700 leading-relaxed font-medium">
                          {ann.message}
                        </p>
                      </div>

                      {(ann.sender || ann.role) && (
                        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                              <User className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800 leading-none mb-1">
                                {ann.sender || "Colaborador HSAP"}
                              </p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                {ann.role || "Setor Hospitalar"}
                              </p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-slate-50 text-slate-400 border-none text-[9px] uppercase font-bold px-2 py-0">
                            Autorizado
                          </Badge>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <Megaphone className="w-12 h-12 mb-4 opacity-10" />
                  <p className="font-bold text-slate-500">Nenhum comunicado encontrado</p>
                  <p className="text-sm">Tudo tranquilo por enquanto!</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="bg-white border-t px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            Sincronização Ativa
          </div>
          <div>Hospital Santo Antônio da Patrulha</div>
        </div>
      </div>
    </div>
  );
}
