import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Monitor,
  MousePointerClick,
  LogIn,
  KeyRound,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Info,
  ChevronDown,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Converte URL do Google Drive para URL de imagem direta
function driveUrl(fileId: string) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
}

// Imagens reais do documento
const IMAGES = {
  iconeAreaTrabalho: driveUrl("1IqCr1LrG-X8viRXumk6U3TnYmrxW8mAc"),
  telaAplicativo: driveUrl("172zIC5MVF-m6mN2LQ8GSJRdDZ566b7N4"),
  barraTarefas: driveUrl("1iKHASeuhD7SLDbxoShrp8DwT73ARtv8h"),
  telaPrincipal: driveUrl("1BeqBUDERIKmEY-SOlMNVl9h29dQcBsNM"),
  iconeSigh: driveUrl("13m5vxvZjFHxxyI-CCHiUOYNV-8YSALQp"),
  telaLogin: driveUrl("1g1d7MySpnNktLcWbFYyy8p0-esclu9nl"),
};

interface TroubleshootItem {
  title: string;
  description: string;
  images: { src: string; caption: string }[];
}

interface Step {
  id: number;
  icon: React.ElementType;
  color: string;
  bgLight: string;
  textColor: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description: string;
  details: { type: string; text: string }[];
  images: { src: string; caption: string }[];
  troubleshoot?: TroubleshootItem;
}

const steps: Step[] = [
  {
    id: 1,
    icon: Monitor,
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
    badgeColor: "bg-blue-100 text-blue-700",
    title: "Encontre o Ícone na Área de Trabalho",
    subtitle: "1º Passo",
    description:
      "O primeiro passo é localizar o ícone do sistema na área de trabalho do seu computador.",
    details: [
      {
        type: "info",
        text: 'Procure pelo ícone com o nome "SistemasHD" na área de trabalho do computador.',
      },
    ],
    images: [
      { src: IMAGES.iconeAreaTrabalho, caption: "Ícone SistemasHD na área de trabalho" },
    ],
  },
  {
    id: 2,
    icon: MousePointerClick,
    color: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-50",
    textColor: "text-violet-600",
    badgeColor: "bg-violet-100 text-violet-700",
    title: "Abra o Aplicativo",
    subtitle: "2º Passo",
    description:
      "Com o ícone localizado, abra o aplicativo com um duplo clique para abrí-lo.",
    details: [
      {
        type: "action",
        text: "Dê 2 cliques sobre o ícone \"SistemasHD\" para abrir o aplicativo. Na maioria dos casos, o sistema abrirá normalmente.",
      },
    ],
    images: [],
    troubleshoot: {
      title: "Teve algum problema ao abrir?",
      description:
        "Em alguns casos o aplicativo já pode estar aberto e minimizado na barra de tarefas do Windows. Se aparecer uma mensagem de erro ao tentar abrir, não se preocupe — basta localizar o ícone na barra inferior e clicar nele para maximizar.",
      images: [
        { src: IMAGES.telaAplicativo, caption: "Mensagem de erro: o sistema já está aberto em segundo plano" },
        { src: IMAGES.barraTarefas, caption: "Localize o ícone na barra de tarefas e clique para maximizar" },
      ],
    },
  },
  {
    id: 3,
    icon: LogIn,
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
    badgeColor: "bg-emerald-100 text-emerald-700",
    title: "Abra o Sistema SIGH",
    subtitle: "3º Passo",
    description:
      "Após o aplicativo abrir, você verá a tela principal com os sistemas disponíveis.",
    details: [
      {
        type: "action",
        text: 'Clique no ícone do centro onde está escrito "SIGH" !!!',
      },
      {
        type: "info",
        text: "O SIGH é o sistema principal de atendimento e registro dos pacientes.",
      },
    ],
    images: [
      { src: IMAGES.telaPrincipal, caption: "Tela principal do aplicativo — localize o ícone SIGH" },
      { src: IMAGES.iconeSigh, caption: "Ícone SIGH no centro da tela — clique aqui" },
    ],
  },
  {
    id: 4,
    icon: KeyRound,
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
    badgeColor: "bg-amber-100 text-amber-700",
    title: "Faça o Login",
    subtitle: "4º Passo",
    description: "Insira suas credenciais para acessar o sistema.",
    details: [
      {
        type: "action",
        text: "Preencha com seu login e senha nos campos indicados.",
      },
      {
        type: "info",
        text: "Se for o primeiro acesso, basta digitar apenas o Login e pressionar Enter. O sistema irá solicitar que você cadastre uma senha em seguida!",
      },
    ],
    images: [
      { src: IMAGES.telaLogin, caption: "Tela de login do SIGH — preencha com seus dados" },
    ],
  },
  {
    id: 5,
    icon: CheckCircle2,
    color: "from-green-500 to-emerald-600",
    bgLight: "bg-green-50",
    textColor: "text-green-600",
    badgeColor: "bg-green-100 text-green-700",
    title: "Acesso Concluído!",
    subtitle: "Pronto!",
    description: "Parabéns! Você acessou o sistema com sucesso.",
    details: [
      {
        type: "success",
        text: "Você agora está dentro do sistema e pode iniciar o atendimento dos pacientes.",
      },
      {
        type: "info",
        text: "Em caso de dúvidas ou problemas de acesso, entre em contato com a Tecnologia da Informação pelo ramal 7610.",
      },
    ],
    images: [],
  },
];

// Carrossel de imagens para cada passo
function ImageCarousel({ images }: { images: { src: string; caption: string }[] }) {
  const [current, setCurrent] = useState(0);
  const [imgError, setImgError] = useState<boolean[]>(images.map(() => false));

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-52 gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-200"
        >
          <CheckCircle2 className="w-14 h-14 text-white" />
        </motion.div>
        <div className="text-center">
          <p className="font-bold text-green-700 text-base">Acesso liberado!</p>
          <p className="text-xs text-slate-500">Sistema SIGH ativo</p>
        </div>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-green-400"
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [1, 1, 0],
              x: Math.cos((i / 6) * Math.PI * 2) * 55,
              y: Math.sin((i / 6) * Math.PI * 2) * 55,
            }}
            transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-inner">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {imgError[current] ? (
              <div className="flex flex-col items-center justify-center h-52 text-slate-400 gap-2">
                <Monitor className="w-10 h-10 opacity-30" />
                <p className="text-xs">Imagem não disponível</p>
              </div>
            ) : (
              <img
                src={images[current].src}
                alt={images[current].caption}
                className="w-full max-h-56 object-contain rounded-xl"
                onError={() => {
                  const newErrors = [...imgError];
                  newErrors[current] = true;
                  setImgError(newErrors);
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navegação do carrossel (só se houver mais de 1 imagem) */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors border border-slate-100"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={() => setCurrent((c) => (c + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors border border-slate-100"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </>
        )}
      </div>

      {/* Legenda */}
      <p className="text-center text-xs text-slate-500 italic px-2">
        {images[current].caption}
      </p>

      {/* Indicadores de página */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={cn(
                "rounded-full transition-all duration-200",
                idx === current ? "w-5 h-2 bg-slate-500" : "w-2 h-2 bg-slate-200"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Painel colapsível para resolução de problemas eventuais
function TroubleshootPanel({ item }: { item: TroubleshootItem }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [imgError, setImgError] = useState<boolean[]>(item.images.map(() => false));

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-amber-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <span className="text-sm font-semibold text-amber-800">{item.title}</span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-amber-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              <p className="text-xs text-amber-700 leading-relaxed">
                {item.description}
              </p>

              {/* Mini carrossel de imagens do troubleshoot */}
              <div className="relative overflow-hidden rounded-lg border border-amber-200 bg-white shadow-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                  >
                    {imgError[current] ? (
                      <div className="flex flex-col items-center justify-center h-36 text-slate-300 gap-1">
                        <Monitor className="w-8 h-8" />
                        <p className="text-xs">Imagem não disponível</p>
                      </div>
                    ) : (
                      <img
                        src={item.images[current].src}
                        alt={item.images[current].caption}
                        className="w-full max-h-44 object-contain rounded-lg"
                        onError={() => {
                          const e = [...imgError];
                          e[current] = true;
                          setImgError(e);
                        }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {item.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrent((c) => (c - 1 + item.images.length) % item.images.length)}
                      className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/90 shadow flex items-center justify-center border border-slate-100 hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-3 h-3 text-slate-600" />
                    </button>
                    <button
                      onClick={() => setCurrent((c) => (c + 1) % item.images.length)}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/90 shadow flex items-center justify-center border border-slate-100 hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-3 h-3 text-slate-600" />
                    </button>
                  </>
                )}
              </div>

              <p className="text-center text-[11px] text-amber-600 italic">
                {item.images[current].caption}
              </p>

              {item.images.length > 1 && (
                <div className="flex justify-center gap-1.5">
                  {item.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrent(idx)}
                      className={cn(
                        "rounded-full transition-all duration-200",
                        idx === current ? "w-4 h-1.5 bg-amber-400" : "w-1.5 h-1.5 bg-amber-200"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailItem({ type, text }: { type: string; text: string }) {
  const configs = {
    info: {
      icon: Info,
      bg: "bg-blue-50",
      border: "border-blue-100",
      iconColor: "text-blue-500",
      textColor: "text-blue-800",
    },
    warning: {
      icon: AlertCircle,
      bg: "bg-amber-50",
      border: "border-amber-100",
      iconColor: "text-amber-500",
      textColor: "text-amber-800",
    },
    action: {
      icon: MousePointerClick,
      bg: "bg-slate-50",
      border: "border-slate-100",
      iconColor: "text-slate-500",
      textColor: "text-slate-700",
    },
    success: {
      icon: CheckCircle2,
      bg: "bg-green-50",
      border: "border-green-100",
      iconColor: "text-green-500",
      textColor: "text-green-800",
    },
  };

  const cfg = configs[type as keyof typeof configs] || configs.info;
  const Icon = cfg.icon;

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-xl border",
        cfg.bg,
        cfg.border
      )}
    >
      <Icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", cfg.iconColor)} />
      <p className={cn("text-sm leading-relaxed", cfg.textColor)}>{text}</p>
    </div>
  );
}

export default function SystemLoginTrainingModal() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const step = steps[currentStep];
  const Icon = step.icon;
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const goNext = () => {
    if (!isLast) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    }
  };

  const goPrev = () => {
    if (!isFirst) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "p-2.5 rounded-xl bg-gradient-to-br text-white shadow-lg",
              step.color
            )}
          >
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Treinamento: Acesso ao Sistema
            </h2>
            <p className="text-sm text-slate-500">
              Aprenda a abrir e fazer login no SIGH passo a passo
            </p>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-500">Progresso</span>
            <span className="text-xs font-bold text-slate-600">
              {currentStep + 1} / {steps.length}
            </span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className={cn("h-full rounded-full bg-gradient-to-r", step.color)}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Indicadores de etapa clicáveis */}
        <div className="flex items-center gap-2 mt-3">
          {steps.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setDirection(idx > currentStep ? 1 : -1);
                setCurrentStep(idx);
              }}
              className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-200",
                idx === currentStep
                  ? cn("bg-gradient-to-br text-white shadow-md scale-110", s.color)
                  : idx < currentStep
                  ? "bg-green-100 text-green-600 ring-1 ring-green-200"
                  : "bg-slate-100 text-slate-400"
              )}
            >
              {idx < currentStep ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                s.id
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-5"
            >
              {/* Badge do passo */}
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
                    step.badgeColor
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {step.subtitle}
                </span>
              </div>

              {/* Título */}
              <div>
                <h3 className="text-2xl font-bold text-slate-800 leading-tight">
                  {step.title}
                </h3>
                <p className="text-slate-500 mt-1 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Imagens reais — só exibe o bloco se houver imagens */}
              {step.images.length > 0 && (
                <div className={cn("rounded-2xl p-4 border border-slate-100 shadow-sm", step.bgLight)}>
                  <ImageCarousel images={step.images} />
                </div>
              )}

              {/* Detalhes e instruções */}
              <div className="space-y-2.5">
                {step.details.map((detail, idx) => (
                  <DetailItem key={idx} type={detail.type} text={detail.text} />
                ))}
              </div>

              {/* Painel de resolução de problemas eventuais */}
              {step.troubleshoot && (
                <TroubleshootPanel item={step.troubleshoot} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Rodapé de Navegação */}
      <div className="px-6 py-4 border-t border-slate-100 flex-shrink-0 flex items-center justify-between gap-3">
        <Button
          variant="outline"
          onClick={goPrev}
          disabled={isFirst}
          className="gap-2 rounded-xl border-slate-200 text-slate-600 hover:text-slate-800 disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Button>

        <div className="flex items-center gap-1.5">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "rounded-full transition-all duration-300",
                idx === currentStep
                  ? cn("w-5 h-2 bg-gradient-to-r", step.color)
                  : idx < currentStep
                  ? "w-2 h-2 bg-green-400"
                  : "w-2 h-2 bg-slate-200"
              )}
            />
          ))}
        </div>

        {isLast ? (
          <Button
            className={cn(
              "gap-2 rounded-xl text-white font-semibold shadow-md bg-gradient-to-r",
              step.color
            )}
            onClick={() => setCurrentStep(0)}
          >
            Recomeçar
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            className={cn(
              "gap-2 rounded-xl text-white font-semibold shadow-md bg-gradient-to-r",
              step.color
            )}
            onClick={goNext}
          >
            Próximo
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
