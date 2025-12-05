// data/gameData.tsx
import { Heart, Wind, Flame, Sparkles, Smile, Gift } from "lucide-react";

export type ProductSuggestion = {
    id: string;
    name: string;
    description: string;
    reason: string; // O "porquê" usar esse produto agora
    affiliateLink: string;
    price: string;
    image: string; // Em um app real, seria uma URL de imagem
};

export type GameFace = {
    id: number;
    label: string;
    instruction: string;
    icon: any;
    color: string;
    suggestedProduct: ProductSuggestion;
};

// Mapeamento: Face do Dado -> Ação -> Produto Recomendado
export const DICE_FACES: GameFace[] = [
    {
        id: 1,
        label: "Massagem Sensual",
        instruction: "Faça uma massagem de 5 minutos nas costas do parceiro(a).",
        icon: Wind,
        color: "bg-teal-100 text-teal-600",
        suggestedProduct: {
            id: "oil-massage",
            name: "Óleo de Massagem Beijável",
            description: "Óleo que esquenta em contato com a pele e tem sabor.",
            reason: "Dica: Use um óleo que aquece para relaxar os músculos e ativar os sentidos.",
            affiliateLink: "https://www.gall.com.br/pagina/cosmeticos",
            price: "R$ 29,90",
            image: "🧴"
        }
    },
    {
        id: 2,
        label: "Beijo no Pescoço",
        instruction: "Explore a região do pescoço com beijos e mordidinhas leves.",
        icon: Heart,
        color: "bg-rose-100 text-rose-600",
        suggestedProduct: {
            id: "gel-ice",
            name: "Gel Excitante Ice",
            description: "Gel que provoca sensação de frescor e arrepios.",
            reason: "Dica: Aplique um gel gelado no pescoço antes de beijar para causar arrepios intensos.",
            affiliateLink: "https://www.gall.com.br/pagina/cosmeticos",
            price: "R$ 19,90",
            image: "❄️"
        }
    },
    {
        id: 3,
        label: "Toque Provocante",
        instruction: "Passe as mãos pelo corpo do parceiro sem tocar nas partes íntimas... ainda.",
        icon: Sparkles,
        color: "bg-purple-100 text-purple-600",
        suggestedProduct: {
            id: "feather",
            name: "Pena para Carícias",
            description: "Acessório suave para estimular a pele.",
            reason: "Dica: Aumente a sensibilidade da pele usando texturas diferentes.",
            affiliateLink: "https://www.gall.com.br/",
            price: "R$ 15,00",
            image: "🪶"
        }
    },
    {
        id: 4,
        label: "Sussurro",
        instruction: "Sussurre no ouvido o que você quer fazer em seguida.",
        icon: Flame,
        color: "bg-orange-100 text-orange-600",
        suggestedProduct: {
            id: "candle",
            name: "Vela Aromática",
            description: "Vela que vira óleo de massagem.",
            reason: "Dica: Crie o ambiente perfeito com iluminação baixa e aroma envolvente.",
            affiliateLink: "https://www.gall.com.br/",
            price: "R$ 39,90",
            image: "🕯️"
        }
    },
    {
        id: 5,
        label: "Verdade ou Desafio",
        instruction: "O parceiro escolhe: responder uma pergunta íntima ou cumprir um desejo.",
        icon: Smile,
        color: "bg-yellow-100 text-yellow-600",
        suggestedProduct: {
            id: "card-game",
            name: "Baralho Kama Sutra",
            description: "Cartas ilustradas com posições.",
            reason: "Dica: Se faltar criatividade para o desafio, use cartas ilustradas.",
            affiliateLink: "https://www.gall.com.br/",
            price: "R$ 25,00",
            image: "🃏"
        }
    },
    {
        id: 6,
        label: "Vale Tudo",
        instruction: "Você ganhou um 'Vale Tudo'. Escolha qualquer posição ou carícia.",
        icon: Gift,
        color: "bg-red-100 text-red-600",
        suggestedProduct: {
            id: "kit-bondage",
            name: "Kit Iniciante",
            description: "Venda para olhos e algemas de pelúcia.",
            reason: "Dica: Vendar os olhos aumenta todos os outros sentidos em 100%.",
            affiliateLink: "https://www.gall.com.br/",
            price: "R$ 49,90",
            image: "🎀"
        }
    },
];