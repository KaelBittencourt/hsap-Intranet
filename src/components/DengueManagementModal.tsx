import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, ZoomIn, ZoomOut, RotateCcw, Maximize } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function DengueManagementModal() {
  const imageUrl = "https://lh3.googleusercontent.com/d/1hXikDiR46GieiwFh6ZaYhndWPt9z75-A";
  
  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b bg-slate-50 print:hidden z-10">
        <div className="flex items-center gap-2">
          <div className="bg-brand p-1.5 rounded-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Manejo Clínico para Casos de Dengue</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center bg-white border rounded-lg p-1 shadow-sm">
            <span className="text-xs font-medium text-slate-400 px-2 border-r mr-1 uppercase tracking-wider">Zoom</span>
            <p className="text-[10px] text-slate-400 px-2">Use os botões de controle</p>
          </div>
        </div>
      </div>

      <div className="flex-grow relative bg-slate-200 overflow-hidden flex items-center justify-center">
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          centerOnInit={true}
          wheel={{ disabled: true }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20 print:hidden">
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="rounded-full shadow-lg bg-white hover:bg-slate-50" 
                  onClick={() => zoomIn()}
                  title="Aumentar Zoom"
                >
                  <ZoomIn className="w-5 h-5 text-slate-700" />
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="rounded-full shadow-lg bg-white hover:bg-slate-50" 
                  onClick={() => zoomOut()}
                  title="Diminuir Zoom"
                >
                  <ZoomOut className="w-5 h-5 text-slate-700" />
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="rounded-full shadow-lg bg-white hover:bg-slate-50" 
                  onClick={() => resetTransform()}
                  title="Resetar Visualização"
                >
                  <RotateCcw className="w-5 h-5 text-slate-700" />
                </Button>
              </div>

              <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                <div className="p-4 md:p-12 flex items-center justify-center min-h-full min-w-full">
                  <img 
                    src={imageUrl} 
                    alt="Manejo Clínico Dengue" 
                    className="max-w-full h-auto shadow-2xl rounded-sm print-content"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .print-content, .print-content * {
            visibility: visible;
          }
          .print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            height: auto !important;
            transform: none !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}} />
    </div>
  );
}
