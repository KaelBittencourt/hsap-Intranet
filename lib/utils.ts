import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Combina classes condicionais e resolve conflitos Tailwind. A ordem dos argumentos permite sobrescrever estilos padrão.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Remove acentos e converte para minúsculas para as buscas. Preserve o mesmo tratamento na consulta e nos campos pesquisados.
export function normalizeString(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
