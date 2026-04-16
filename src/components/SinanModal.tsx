import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Search, 
  ExternalLink, 
  Clock,
  Info,
  ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { normalizeString } from "@/lib/utils";

interface SinanDocument {
  id: string;
  title: string;
  url: string;
}

const sinanDocuments: SinanDocument[] = [
  { id: "1", title: "Acidente por Animal Peconhento", url: "https://drive.google.com/file/d/1gIS_CFNSKv_xpL_DrSJ03Mi9EKLHYgG2/view?usp=sharing" },
  { id: "2", title: "Acidente de Trabalho com exposição a material Biologico", url: "https://drive.google.com/file/d/1EfavV101V5YUv3Cnt9oXOa73y7XU6Y0E/view?usp=sharing" },
  { id: "3", title: "Acidente de Trabalho Grave", url: "https://drive.google.com/file/d/1-rNiyKRVe9POO_m8nNA80Pm5QOsIHntL/view?usp=sharing" },
  { id: "4", title: "Acidente de Trabalho", url: "https://drive.google.com/file/d/1YQd2XAbvZ7IRQYe272wO5e5iZs124xkE/view?usp=sharing" },
  { id: "5", title: "Aids / HIV em Adulto", url: "https://drive.google.com/file/d/1OyjKkiutAs5YGETshSyFg8qxzmWAG_Sv/view?usp=sharing" },
  { id: "6", title: "Aids / HIV em Criança", url: "https://drive.google.com/file/d/16mlQ4CsGN6bExDXnlqMolHOMLbRor3N-/view?usp=sharing" },
  { id: "7", title: "Atendimento Antirrábico", url: "https://drive.google.com/file/d/1hUiDpps1qlNSr13koKqqoD6mzhEh2Nnt/view?usp=sharing" },
  { id: "8", title: "Botulismo", url: "https://drive.google.com/file/d/17jIUomY5T7Ts1EPORv_d9EaPv6GtdFv5/view?usp=sharing" },
  { id: "9", title: "Cólera", url: "https://drive.google.com/file/d/1lx6xc2-Ss9J45dB6eWHaoVmtQtxOYAc8/view?usp=sharing" },
  { id: "10", title: "Coqueluche", url: "https://drive.google.com/file/d/1mSqQg5Sj6aA9TmzC4YCMiToSf_PpicgS/view?usp=sharing" },
  { id: "11", title: "Dengue e Febre de Chikungunya", url: "https://drive.google.com/file/d/1rBa4KFnuS-pzbOhW92H0_-9D7MYDUirS/view?usp=sharing" },
  { id: "12", title: "Difteria", url: "https://drive.google.com/file/d/1j7cRqiEg9PWTR84BacHc6X4rZAagQGpO/view?usp=sharing" },
  { id: "13", title: "Doença de chagas aguda", url: "https://drive.google.com/file/d/1HkIjnm54Q0-cbninA4oHoh_VF2qdOEvP/view?usp=sharing" },
  { id: "14", title: "Doença de Creutzfeldt Jakob (DCJ)", url: "https://drive.google.com/file/d/1qKYU06OlDqWCgxZ1QneY05wI02HjO1Hn/view?usp=sharing" },
  { id: "15", title: "DRT Câncer", url: "https://drive.google.com/file/d/1mJE1rpxJtx7WnvmG4qFqkxGicjTqeLAY/view?usp=sharing" },
  { id: "16", title: "DRT Dermatoses", url: "https://drive.google.com/file/d/1jiRF_zuRHax7bYnB004uBKnrnACAW01i/view?usp=sharing" },
  { id: "17", title: "DRT Lerdort", url: "https://drive.google.com/file/d/1DZgn9SnWbhi_gV4dnaDTbp0NWTJoZJTo/view?usp=sharing" },
  { id: "18", title: "DRT Pair", url: "https://drive.google.com/file/d/1PUGYfD5FiqylfPhRVW37mPltC4dRLQGS/view?usp=sharing" },
  { id: "19", title: "DRT Pneumoconioses", url: "https://drive.google.com/file/d/11Mi1_ockcQTKkRfesNHLZakjAwg-cT8d/view?usp=sharing" },
  { id: "20", title: "DRT Transtornos Mentais", url: "https://drive.google.com/file/d/1VRZUuKszvcTReBq6UMcjku15bVwfuBr8/view?usp=sharing" },
  { id: "21", title: "Esquistossomose", url: "https://drive.google.com/file/d/1TOVstzCbTwz_RiWb4aahX7CUDxEDJwcb/view?usp=sharing" },
  { id: "22", title: "Febre Amarela", url: "https://drive.google.com/file/d/1LhrqYw2LGXdG-QIsr0iFKHO5CS2i4j_I/view?usp=sharing" },
  { id: "23", title: "Febre Maculosa", url: "https://drive.google.com/file/d/13vaD33A1scEJUtJ1cKSqydCjRduMagBq/view?usp=sharing" },
  { id: "24", title: "Febre Tifoide", url: "https://drive.google.com/file/d/1qQJ7Z74cYtOYzhxcCzKNvkkH-kkaWveT/view?usp=sharing" },
  { id: "25", title: "Ficha Conclusão", url: "https://drive.google.com/file/d/1v_x16zmzbSBYFM5dL-q0OlkvLntkCrxd/view?usp=sharing" },
  { id: "26", title: "Ficha Hepatites Virais", url: "https://drive.google.com/file/d/1_kMB0ZotfpzNl5ww2HXQrJ6Y9o5n4uPp/view?usp=sharing" },
  { id: "27", title: "Ficha Notificação Violência Domestica", url: "https://drive.google.com/file/d/1vf837MdUk3BXHqKeTIs3wz-fIR_9o64f/view?usp=sharing" },
  { id: "28", title: "Hanseníase", url: "https://drive.google.com/file/d/10pPOCLiHN2Wu5CQCon2fH7QyyOwyTVGg/view?usp=sharing" },
  { id: "29", title: "Influenza", url: "https://drive.google.com/file/d/1oj7gkBzqj3UX1EazbkRTSKb-YAXRLnhA/view?usp=sharing" },
  { id: "30", title: "Intoxicação Exógena", url: "https://drive.google.com/file/d/16EppfaGj7SDi0rFuipY4MnNUIMzJuBgB/view?usp=sharing" },
  { id: "31", title: "Investigação Surto", url: "https://drive.google.com/file/d/1riHIYz756iApGEguhsKrRGFtnYOwJxc3/view?usp=sharing" },
  { id: "32", title: "Leishmaniose", url: "https://drive.google.com/file/d/1Ieaxr9t86cbp5dxnYhmM_AvOvNJ8UuUq/view?usp=sharing" },
  { id: "33", title: "Leptospirose", url: "https://drive.google.com/file/d/1yp6zSIv9zvnxZHkVvu4BvKQFZkGSPx2p/view?usp=sharing" },
  { id: "34", title: "Malária", url: "https://drive.google.com/file/d/1VjU6NJNQaynLOziwTHiFthc4VjqHckUH/view?usp=sharing" },
  { id: "35", title: "Meningite", url: "https://drive.google.com/file/d/1kjOBYhQLi1hsQIC00Xi1A9mAEClhgUOx/view?usp=sharing" },
  { id: "36", title: "Notificação Individual", url: "https://drive.google.com/file/d/1Foe7C-KBzofq7Z7XBw7vEtPr2IEX2YQO/view?usp=sharing" },
  { id: "37", title: "Raiva Humana", url: "https://drive.google.com/file/d/1wmVt-RTJU9pa3mF3PmJUxYGuSaG-AL01/view?usp=sharing" },
  { id: "38", title: "Raiva", url: "https://drive.google.com/file/d/1tWwPGrkzKavXDSDUMYDD92JSwxwflUnk/view?usp=sharing" },
  { id: "39", title: "Rubéola", url: "https://drive.google.com/file/d/1_z5v-HJe158DV01NtTq4uOL6E2fPsi5L/view?usp=sharing" },
  { id: "40", title: "Sarampo", url: "https://drive.google.com/file/d/1qM4rh8D5DlNh_kcDh7u96SHYZxTnDLBu/view?usp=sharing" },
  { id: "41", title: "Sífilis Congênita", url: "https://drive.google.com/file/d/1FyUT0jJ8BUHaJfM2O-LKvvEqPs9JzVsM/view?usp=sharing" },
  { id: "42", title: "Sífilis Gestante", url: "https://drive.google.com/file/d/1mbXQyckZB2BSJeqUVjvbo0fQGERbKlOK/view?usp=sharing" },
  { id: "43", title: "Síndrome Respiratória Aguda Grave - SRAG", url: "https://drive.google.com/file/d/1LzCvvj_3btSxB0dJKshveN72NfEg2W6W/view?usp=sharing" },
  { id: "44", title: "Tétano Acidental", url: "https://drive.google.com/file/d/1zmbTDg4JVVoG9-s4pZeiJaoFY27SROeP/view?usp=sharing" },
  { id: "45", title: "Tétano Neonatal", url: "https://drive.google.com/file/d/1v74msPcqfIgH0Bn9-5Upf7sPkhauY7u4/view?usp=sharing" },
  { id: "46", title: "Toxoplasmose Gestacional", url: "https://drive.google.com/file/d/1MUIifB117JkwNnARQ4hRH9uCbKY_JKzz/view?usp=sharing" },
  { id: "47", title: "Tuberculose", url: "https://drive.google.com/file/d/1IPY7Pt27UKPbJab2HPRMYnTxv3Dh4_Of/view?usp=sharing" },
  { id: "48", title: "Violência Interpessoal / Autoprovocada", url: "https://drive.google.com/file/d/1UACHRJpBg7monMvAiifFlOUZgz9YcrVZ/view?usp=sharing" }
];

export default function SinanModal() {
  const [searchQuery, setSearchQuery] = useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (document.activeElement instanceof HTMLInputElement) {
        document.activeElement.blur();
      }
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const filteredDocuments = useMemo(() => {
    const normalizedQuery = normalizeString(searchQuery);
    return sinanDocuments.filter(doc => 
      normalizeString(doc.title).includes(normalizedQuery)
    );
  }, [searchQuery]);

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Premium Header */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200 px-6 py-6 md:px-8 z-10 shadow-sm shrink-0">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-green-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-brand p-3 rounded-2xl shadow-xl shadow-brand/10 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                <ShieldAlert className="w-7 h-7 text-white" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase text-center md:text-left">Sinan's</h2>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full max-w-md">
            <div className="relative flex-grow group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand transition-colors" />
              <Input 
                type="text" 
                placeholder="Pesquisar ficha..." 
                autoComplete="off"
                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:ring-brand/20 focus:border-brand h-11 rounded-xl transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="flex-grow overflow-y-auto p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-3">
            <AnimatePresence mode="popLayout">
              {filteredDocuments.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.02 }}
                  onClick={() => window.open(doc.url, "_blank")}
                  className="group relative bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-brand/30 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Hover background effect */}
                  <div className="absolute inset-0 bg-brand-light/0 group-hover:bg-brand-light/10 transition-colors" />

                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-brand group-hover:text-white transition-all duration-300 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <h3 className="text-xs font-bold text-slate-800 group-hover:text-brand transition-colors line-clamp-2 leading-tight">
                          {doc.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 bg-brand-light text-brand shrink-0">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredDocuments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Nenhuma ficha encontrada</h3>
              <p className="text-sm text-slate-500">Tente ajustar os termos da sua pesquisa.</p>
            </div>
          )}
        </div>
      </div>

      {/* Refined Footer */}
      <div className="px-8 py-4 bg-white border-t border-slate-100 flex flex-col sm:flex-row justify-center items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-400 font-medium tracking-wider uppercase">Hospital Santo Antônio da Patrulha</span>
        </div>
      </div>
    </div>
  );
}
