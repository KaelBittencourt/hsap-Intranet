import type { ProtocolData } from "./types";

// ============================================================
// Dados do protocolo: Reações Transfusionais
// ============================================================

export const TRANSFUSION_REACTIONS_PROTOCOL: ProtocolData = {
  id: "transfusion-reactions",
  title: "REAÇÕES TRANSFUSIONAIS",
  subtitle: "O que fazer diante de uma reação transfusional?",
  alertBanner: "⚠ PARE A TRANSFUSÃO IMEDIATAMENTE",

  steps: [
    {
      id: 1,
      title: "Interromper a Transfusão",
      description: "Interromper imediatamente a transfusão.",
      icon: "🛑",
      checklistLabel: "Transfusão interrompida",
    },
    {
      id: 2,
      title: "Comunicar",
      description:
        "Comunicar imediatamente o médico de plantão e a Agência Transfusional.",
      icon: "☎",
      checklistLabel: "Médico comunicado",
    },
    {
      id: 3,
      title: "Manter acesso venoso",
      description: "Manter o acesso venoso utilizando SF 0,9%.",
      icon: "💉",
      checklistLabel: "SF iniciado",
    },
    {
      id: 4,
      title: "Avaliar paciente",
      description: "Verificar sinais vitais e estado cardiorrespiratório.",
      icon: "❤️",
      checklistLabel: "Sinais vitais verificados",
    },
    {
      id: 5,
      title: "Checar documentação",
      description:
        "Conferir registros, formulários e identificação do receptor.",
      icon: "📁",
      checklistLabel: "Identificação conferida",
    },
    {
      id: 6,
      title: "Confirmar paciente",
      description:
        "Confirmar à beira do leito que o hemocomponente foi administrado ao paciente correto.",
      icon: "🛏",
      checklistLabel: "Paciente confirmado",
    },
    {
      id: 7,
      title: "Enviar material",
      description:
        "Manter o equipo e a bolsa intactos e encaminhar ao serviço de hemoterapia.",
      icon: "🩸",
      checklistLabel: "Bolsa encaminhada",
    },
    {
      id: 8,
      title: "Coletar amostra",
      description:
        "Coletar amostra utilizando tubo roxo para investigação laboratorial.",
      icon: "🧪",
      checklistLabel: "Amostra coletada",
    },
    {
      id: 9,
      title: "Registrar ocorrência",
      description:
        "Registrar todas as ações no prontuário e checklist institucional.",
      icon: "📄",
      checklistLabel: "Registro realizado",
    },
  ],

  classification: [
    { symptom: "Febre", possibleReaction: "Reação Febril Não Hemolítica" },
    { symptom: "Urticária", possibleReaction: "Reação Alérgica" },
    { symptom: "Dispneia", possibleReaction: "TRALI" },
    { symptom: "Hipotensão", possibleReaction: "Reação Hemolítica" },
    { symptom: "Dor Lombar", possibleReaction: "Hemólise Aguda" },
    { symptom: "Hemoglobinúria", possibleReaction: "Hemólise" },
  ],

  classificationDisclaimer:
    "Esta tabela possui finalidade educativa e de apoio. Não substitui avaliação médica.",

  importantText:
    "As reações transfusionais podem variar de leves a graves e exigem ação rápida e organizada.\n\nA conduta da equipe faz toda a diferença na segurança do paciente.",

  flowchartSteps: [
    "Paciente apresentou reação",
    "Interromper transfusão",
    "Comunicar Médico",
    "Comunicar Agência",
    "Manter SF 0,9%",
    "Verificar sinais vitais",
    "Conferir identificação",
    "Enviar bolsa/equipo",
    "Coletar tubo roxo",
    "Registrar ocorrência",
  ],
};

// ============================================================
// Registro de todos os protocolos disponíveis
// Adicionar novos protocolos aqui no futuro
// ============================================================

export const AVAILABLE_PROTOCOLS: ProtocolData[] = [
  TRANSFUSION_REACTIONS_PROTOCOL,
  // Futuros protocolos:
  // SEPSIS_PROTOCOL,
  // CARDIAC_ARREST_PROTOCOL,
  // CONTRAST_EXTRAVASATION_PROTOCOL,
  // PATIENT_FALL_PROTOCOL,
  // ALLERGIC_REACTION_PROTOCOL,
  // BIOLOGICAL_MATERIAL_ACCIDENT_PROTOCOL,
];
