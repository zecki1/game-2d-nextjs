import { Heart, Flame, Zap, Link, Smile, Star, LucideIcon } from "lucide-react"; // Importar LucideIcon para tipagem

// Definição dos tipos
export type DiceTheme = "soft" | "hetero" | "gay" | "fetish" | "positions";

// 1. Definição da interface para uma Face do Dado (corrigindo o 'any')
interface LocalizedLabel {
    pt: string;
    en: string;
    es: string;
}

export interface DiceFace {
    id: number;
    label: LocalizedLabel;
    icon: LucideIcon;
    color: string;
}

export const DICE_THEMES: Record<DiceTheme, DiceFace[]> = {
    soft: [
        { id: 1, label: { pt: "Beijo no Pescoço", en: "Neck Kiss", es: "Beso en el Cuello" }, icon: Heart, color: "bg-rose-100 text-rose-600" },
        { id: 2, label: { pt: "Massagem", en: "Massage", es: "Masaje" }, icon: Smile, color: "bg-teal-100 text-teal-600" },

    ],
    hetero: [
        { id: 1, label: { pt: "Ele: Tira a Camisa", en: "He: Shirt Off", es: "Él: Fuera Camisa" }, icon: Flame, color: "bg-blue-100 text-blue-600" },
        { id: 2, label: { pt: "Ela: Senta no Colo", en: "She: Sit on Lap", es: "Ella: Sentarse en el Regazo" }, icon: Heart, color: "bg-pink-100 text-pink-600" },
        // ...
    ],
    gay: [
        { id: 1, label: { pt: "Mordida no Lábio", en: "Lip Bite", es: "Mordida en el Labio" }, icon: Flame, color: "bg-purple-100 text-purple-600" },
        { id: 2, label: { pt: "Mão por dentro da roupa", en: "Hand inside clothes", es: "Mano dentro de la ropa" }, icon: Zap, color: "bg-indigo-100 text-indigo-600" },
        // ...
    ],
    fetish: [
        { id: 1, label: { pt: "Vendar os Olhos", en: "Blindfold", es: "Venda en los Ojos" }, icon: Link, color: "bg-slate-800 text-slate-200" },
        { id: 2, label: { pt: "Usar Algemas", en: "Use Handcuffs", es: "Usar Esposas" }, icon: Link, color: "bg-red-900 text-red-100" },
        // ...
    ],
    positions: [
         { id: 1, label: { pt: "Papai e Mamãe", en: "Missionary", es: "Misionero" }, icon: Star, color: "bg-yellow-100 text-yellow-600" },
        { id: 2, label: { pt: "De Quatro", en: "Doggy Style", es: "Estilo Perrito" }, icon: Star, color: "bg-orange-100 text-orange-600" },
    ]
};