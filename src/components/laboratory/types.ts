// ============================================================
// Tipos e interfaces do módulo de Protocolos Assistenciais
// Preparado para escalabilidade e futura integração com DB
// ============================================================

/** Representa uma etapa individual de um protocolo */
export interface ProtocolStep {
  id: number;
  title: string;
  description: string;
  icon: string; // emoji
  checklistLabel: string; // Texto resumido para o checklist final
}

/** Representa um item da tabela de classificação */
export interface ClassificationItem {
  symptom: string;
  possibleReaction: string;
}

/** Dados completos de um protocolo assistencial */
export interface ProtocolData {
  id: string;
  title: string;
  subtitle: string;
  alertBanner: string;
  steps: ProtocolStep[];
  classification: ClassificationItem[];
  classificationDisclaimer: string;
  importantText: string;
  flowchartSteps: string[];
}

// ============================================================
// Tipos preparados para futura integração com banco de dados
// ============================================================

/** Registro de timestamp de cada etapa concluída */
export interface StepTimestamp {
  stepId: number;
  completedAt: Date;
}

/** Registro completo de uma ocorrência de protocolo */
export interface ProtocolOccurrence {
  id: string;
  protocolId: string;
  startedAt: Date;
  completedAt: Date | null;
  stepsCompleted: StepTimestamp[];
  totalDurationMs: number | null;
  // Campos para futura integração
  patientId?: string;
  sector?: string;
  hemocomponentType?: string;
  operatorName?: string;
  notes?: string;
}

/** Indicadores para dashboard futuro */
export interface ProtocolMetrics {
  totalOccurrences: number;
  completedOccurrences: number;
  completionRate: number;
  averageDurationMs: number;
  occurrencesByMonth: Record<string, number>;
  occurrencesBySector: Record<string, number>;
  occurrencesByHemocomponent: Record<string, number>;
  averageTimeToInterruptMs: number;
  averageTimeToCommunicateMs: number;
}
