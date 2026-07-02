import React from "react";
import { motion } from "motion/react";
import { ExternalLink, GraduationCap } from "lucide-react";

interface Slide {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// Converte URLs do Google Drive para URLs de thumbnail
function getDriveThumbnail(driveUrl: string): string {
  const match = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return driveUrl;
}

const slides: Slide[] = [
  {
    id: "1",
    title: "Reações Transfusionais — O que fazer?",
    url: "https://drive.google.com/file/d/1RJydhc_fun6bPHab1uEwXZby6k5T2N1d/view?usp=drive_link",
    thumbnailUrl: getDriveThumbnail("https://drive.google.com/file/d/1RJydhc_fun6bPHab1uEwXZby6k5T2N1d/view"),
  },
  {
    id: "2",
    title: "Ato Transfusional",
    url: "https://drive.google.com/file/d/1pkCpoDzaTSO4j4N0VghHTuMkdMbWAqV3/view?usp=sharing",
    thumbnailUrl: getDriveThumbnail("https://drive.google.com/file/d/1pkCpoDzaTSO4j4N0VghHTuMkdMbWAqV3/view"),
  },
  {
    id: "3",
    title: "Tipagem Sanguínea",
    url: "https://drive.google.com/file/d/1zp5lUD69p6FGlymIbYu3JevEvUXO2iUz/view?usp=sharing",
    thumbnailUrl: getDriveThumbnail("https://drive.google.com/file/d/1zp5lUD69p6FGlymIbYu3JevEvUXO2iUz/view"),
  },
];

export default function EducationalSlidesModal() {
  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="relative overflow-hidden bg-white border-b border-slate-200 px-6 py-6 md:px-8 z-10 shadow-sm shrink-0">
        <div className="relative flex items-center gap-5">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-violet-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-purple-500 p-3 rounded-2xl shadow-xl shadow-purple-500/10 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase">
              Slides Educacionais
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Material educativo do Laboratório
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {slides.map((slide, index) => (
              <motion.a
                key={slide.id}
                href={slide.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="group block rounded-2xl overflow-hidden border-2 border-slate-200 bg-white shadow-md hover:shadow-xl hover:border-purple-300 transition-all duration-300 cursor-pointer"
              >
                {/* Image / Thumbnail */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-purple-100 via-slate-100 to-violet-100 overflow-hidden">
                  <img
                    src={slide.thumbnailUrl}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback: exibe ícone se a imagem falhar
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.classList.add("flex", "items-center", "justify-center");
                        const fallback = document.createElement("div");
                        fallback.className = "text-6xl opacity-30";
                        fallback.textContent = "📊";
                        parent.appendChild(fallback);
                      }
                    }}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                      <ExternalLink className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="px-5 py-4">
                  <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-purple-700 transition-colors line-clamp-2">
                    {slide.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-2 font-semibold uppercase tracking-wider flex items-center gap-1">
                    Clique para abrir
                    <ExternalLink className="w-3 h-3" />
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
