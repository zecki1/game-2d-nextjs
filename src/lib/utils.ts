import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Remove campos undefined/null para não quebrar o Firestore
// E garante que não existam funções ou símbolos
export function sanitizeData(data: Record<string, unknown>): Record<string, unknown> {
  const clean: Record<string, unknown> = {};
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value !== undefined && value !== null) {
      clean[key] = value;
    } else {
      clean[key] = ""; // Converte null/undefined para string vazia
    }
  });
  return clean;
}