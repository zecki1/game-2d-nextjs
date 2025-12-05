"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/providers/preferences-provider";
import { RefreshCw, User, MapPin } from "lucide-react";
import { ProductAd } from "@/components/ads/ProductAd";
import { getSuggestedProduct } from "@/data/affiliates";

const ROLES_A = [
    { pt: "Enfermeira(o)", en: "Nurse", es: "Enfermera(o)" },
    { pt: "Chefe", en: "Boss", es: "Jefe" }
];
const ROLES_B = [
    { pt: "Paciente", en: "Patient", es: "Paciente" },
    { pt: "Estagiário(a)", en: "Intern", es: "Becario" }
];
const LOCATIONS = [
    { pt: "Hospital", en: "Hospital", es: "Hospital" },
    { pt: "Elevador", en: "Elevator", es: "Ascensor" }
];

interface RoleplayResult {
    roleA: (typeof ROLES_A)[number];
    roleB: (typeof ROLES_B)[number];
    loc: (typeof LOCATIONS)[number];
}

interface GameProps {
    onPlayAttempt?: () => Promise<boolean>;
    remainingPlays?: number;
    isPremium?: boolean;
}

export default function RoleplayGenerator({ onPlayAttempt, remainingPlays, isPremium }: GameProps) {
    // Tipagem corrigida
    const [res, setRes] = useState<RoleplayResult | null>(null);
    const [loading, setLoading] = useState(false);

    const generate = async () => {
        if (onPlayAttempt) {
            const allowed = await onPlayAttempt();
            if (!allowed) return;
        }
        setLoading(true);
        setTimeout(() => {
            setRes({
                roleA: ROLES_A[Math.floor(Math.random() * ROLES_A.length)],
                roleB: ROLES_B[Math.floor(Math.random() * ROLES_B.length)],
                loc: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
            });
            setLoading(false);
        }, 1000);
    };

    const ad = getSuggestedProduct();

    return (
        <div className="w-full max-w-md mx-auto flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-2 h-40">
                <Card className="flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 border-rose-200">
                    <User className="w-6 h-6 text-rose-500 mb-2" />
                    <span className="text-xs font-bold text-center px-1">
                        {loading ? "..." : res ? <Text pt={res.roleA.pt} en={res.roleA.en} es={res.roleA.es} /> : "?"}
                    </span>
                </Card>
                <Card className="flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 border-rose-200">
                    <User className="w-6 h-6 text-purple-500 mb-2" />
                    <span className="text-xs font-bold text-center px-1">
                        {loading ? "..." : res ? <Text pt={res.roleB.pt} en={res.roleB.en} es={res.roleB.es} /> : "?"}
                    </span>
                </Card>
                <Card className="flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 border-rose-200">
                    <MapPin className="w-6 h-6 text-green-500 mb-2" />
                    <span className="text-xs font-bold text-center px-1">
                        {loading ? "..." : res ? <Text pt={res.loc.pt} en={res.loc.en} es={res.loc.es} /> : "?"}
                    </span>
                </Card>
            </div>

            {res && !loading && (
                <Card className="p-4 bg-rose-50 dark:bg-rose-900/20 border-rose-100 text-center animate-in fade-in slide-in-from-top-2">
                    <p className="italic text-slate-600 dark:text-slate-300">
                        &quot;<Text pt="Vocês estão no(a)" en="You are at" es="Están en el/la" /> <strong><Text pt={res.loc.pt} en={res.loc.en} es={res.loc.es} /></strong>.
                        A pessoa A é <strong><Text pt={res.roleA.pt} en={res.roleA.en} es={res.roleA.es} /></strong> e tenta seduzir <strong><Text pt={res.roleB.pt} en={res.roleB.en} es={res.roleB.es} /></strong>.&quot;
                    </p>
                </Card>
            )}

            <div className="w-full">
                <Button size="lg" onClick={generate} disabled={loading} className="w-full h-14 bg-gradient-to-r from-purple-600 to-rose-600 hover:opacity-90">
                    {loading ? <RefreshCw className="animate-spin" /> : <Text pt="Gerar Fantasia" en="Generate Fantasy" es="Generar Fantasía" />}
                </Button>
                {!isPremium && remainingPlays !== undefined && (
                    <div className="text-center mt-2">
                        <span className="text-xs font-medium text-muted-foreground bg-white dark:bg-slate-800 px-3 py-1 rounded-full border shadow-sm">
                            <Text pt="Tentativas:" en="Attempts:" es="Intentos:" /> <span className="text-rose-600 font-bold ml-1">{remainingPlays}</span>
                        </span>
                    </div>
                )}
            </div>

            <ProductAd product={ad} />
        </div>
    );
}