export type AffiliateProduct = {
    id: string;
    name: string;
    description: { pt: string; en: string; es: string };
    url: string;
    image: string;
    category: "oleo" | "acessorio" | "jogo" | "cosmetico" | "fantasia";
};

export const AFFILIATE_PRODUCTS: AffiliateProduct[] = [
    {
        id: "contractor",
        name: "Contractor Soft Love",
        description: {
            pt: "Jatos de óleo adstringente para estreitar e intensificar.",
            en: "Astringent oil jets to tighten and intensify.",
            es: "Chorros de aceite astringente para estrechar e intensificar."
        },
        url: "https://www.gall.com.br/contractor-jatos-oleo-adstringente-15ml-soft-love",
        image: "💧",
        category: "cosmetico"
    },
    {
        id: "bronzy",
        name: "Bronzy Acelerador",
        description: {
            pt: "Pele dourada e radiante para brilhar na hora H.",
            en: "Golden radiant skin to shine in the moment.",
            es: "Piel dorada y radiante para brillar en el momento."
        },
        url: "https://www.gall.com.br/bronzy-acelerador-de-bronzeado-60g-cimed",
        image: "☀️",
        category: "cosmetico"
    },
    {
        id: "carmed-nuvens",
        name: "Body Splash Nuvens",
        description: {
            pt: "Aroma suave de 'beijo' para deixar no ar.",
            en: "Soft 'kiss' scent to leave in the air.",
            es: "Aroma suave de 'beso' para dejar en el aire."
        },
        url: "https://www.gall.com.br/carmed-body-splash-nas-nuvens-200ml-cimed",
        image: "☁️",
        category: "cosmetico"
    },
    {
        id: "carmed-amor",
        name: "Body Splash Amor",
        description: {
            pt: "Cheiro de verão e calor para esquentar o clima.",
            en: "Summer scent and heat to warm up the mood.",
            es: "Olor a verano y calor para calentar el ambiente."
        },
        url: "https://www.gall.com.br/carmed-body-splash-amor-de-verao-200ml-cimed",
        image: "🏖️",
        category: "cosmetico"
    }
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getSuggestedProduct(_category?: string): AffiliateProduct {
    return AFFILIATE_PRODUCTS[Math.floor(Math.random() * AFFILIATE_PRODUCTS.length)];
}