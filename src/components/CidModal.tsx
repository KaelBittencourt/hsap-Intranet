import React from "react";
import { BookOpen, ExternalLink, FileText, HeartPulse, BrainCircuit } from "lucide-react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CidModal() {
  const resources = [
    {
      title: "Clínica Médica",
      description: "Códigos de procedimentos e CIDs para internação clínica geral.",
      icon: HeartPulse,
      color: "blue",
      url: "https://drive.google.com/file/d/1XHl0KfwyQ5rvA7xU5tmWzrQ6AN_cC3oU/view?usp=sharing"
    },
    {
      title: "Psiquiatria",
      description: "Códigos de procedimentos e CIDs específicos da unidade psiquiátrica.",
      icon: BrainCircuit,
      color: "purple",
      url: "https://drive.google.com/file/d/10em-HufSqy2lRZYclcb_IiPC4DOLMUiy/view?usp=sharing"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <DialogHeader className="bg-white border-b px-6 py-5 shadow-sm sticky top-0 z-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-brand-light text-brand rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <DialogTitle className="text-2xl font-black text-slate-800 tracking-tight uppercase">
              CIDs e Procedimentos
            </DialogTitle>
            <DialogDescription className="text-sm font-medium text-slate-500 mt-0.5">
              Tabelas de faturamento SUS, códigos e diretrizes
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <ScrollArea className="flex-grow p-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <a 
                key={index} 
                href={resource.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group h-full"
              >
                <Card className={`group border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer hover:border-${resource.color}-300 h-full relative overflow-hidden bg-white`}>
                  <div className={`absolute inset-0 bg-${resource.color}-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <CardHeader className="flex flex-col items-start gap-4 space-y-0 relative p-6">
                    <div className={`p-4 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-${resource.color}-100 group-hover:text-${resource.color}-600 transition-all shadow-sm group-hover:scale-110 duration-300`}>
                      <resource.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl flex items-center justify-between font-bold text-slate-800">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="mt-2 text-sm text-slate-500 leading-relaxed font-medium">
                        {resource.description}
                      </CardDescription>
                    </div>
                    <div className={`mt-4 pt-4 border-t border-slate-100 w-full flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-${resource.color}-600 transition-colors`}>
                      <span>Acessar Documento</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </CardHeader>
                </Card>
              </a>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-brand" /> Instruções de Uso
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Os documentos listados formatam dados extraídos da tabela de faturamento de serviços do SUS. Use `Ctrl+F` ou a função de pesquisa ("Lupa") no leitor do Google Drive para localizar rapidamente CIDs ou descrições específicas durante as prescrições médicas.
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
