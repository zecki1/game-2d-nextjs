"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/providers/preferences-provider";
import { Beer, ThumbsUp, ThumbsDown } from "lucide-react";
import { ProductAd } from "@/components/ads/ProductAd";
import { getSuggestedProduct } from "@/data/affiliates";

const QUESTIONS = [
    { pt: "Eu nunca fiz sexo em local público.", en: "Never have I ever had sex in public.", es: "Yo nunca he tenido sexo en público." },
    { pt: "Eu nunca mandei nudes.", en: "Never have I ever sent nudes.", es: "Yo nunca he enviado nudes." },
    { pt: "Eu nunca usei algemas.", en: "Never have I ever used handcuffs.", es: "Yo nunca he usado esposas." },
    { pt: "Eu nunca fingi um orgasmo.", en: "Never have I ever faked an orgasm.", es: "Yo nunca he fingido un orgasmo." },
    { pt: "Eu nunca fui pego no flagra.", en: "Never have I ever been caught.", es: "Yo nunca he sido pillado." },
];

interface GameProps {
    onPlayAttempt?: () => Promise<boolean>;
    remainingPlays?: number;
    isPremium?: boolean;
}

export default function NeverHaveIEver({ onPlayAttempt, remainingPlays, isPremium }: GameProps) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextCard = async () => {
        if (onPlayAttempt) {
            const allowed = await onPlayAttempt();
            if (!allowed) return;
        }
        setDirection(1);
        setIndex((prev) => (prev + 1) % QUESTIONS.length);
    };

    const currentQ = QUESTIONS[index];
    const ad = getSuggestedProduct();

    return (
        <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6">
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-rose-600 flex items-center justify-center gap-2">
                    <Beer className="w-6 h-6" /> Eu Nunca...
                </h2>
                <p className="text-xs text-muted-foreground"><Text pt="Quem já fez, bebe!" en="If you did it, drink!" es="¡Si lo hiciste, bebe!" /></p>
            </div>

            <div className="relative w-full h-[300px] perspective-1000">
                <AnimatePresence initial={false} mode="wait" custom={direction}>
                    <motion.div key={index} custom={direction} initial={{ opacity: 0, x: 100, rotate: 10 }} animate={{ opacity: 1, x: 0, rotate: 0 }} exit={{ opacity: 0, x: -100, rotate: -10 }} transition={{ duration: 0.3 }} className="absolute w-full h-full">
                        <Card className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-rose-500 to-purple-600 text-white shadow-2xl rounded-3xl border-4 border-white/20">
                            <h3 className="text-2xl md:text-3xl font-black text-center leading-snug drop-shadow-md">&quot;<Text pt={currentQ.pt} en={currentQ.en} es={currentQ.es} />&quot;</h3>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="w-full space-y-3">
                <div className="grid grid-cols-2 gap-4 w-full">
                    <Button variant="outline" size="lg" className="h-16 border-green-500 text-green-600 hover:bg-green-50" onClick={nextCard}>
                        <ThumbsUp className="mr-2 h-5 w-5" /> <Text pt="Eu Nunca" en="I Never" es="Yo Nunca" />
                    </Button>
                    <Button size="lg" className="h-16 bg-rose-600 hover:bg-rose-700" onClick={nextCard}>
                        <ThumbsDown className="mr-2 h-5 w-5" /> <Text pt="Eu Já!" en="I Have!" es="¡Yo Ya!" />
                    </Button>
                </div>
                {!isPremium && remainingPlays !== undefined && (
                    <div className="text-center"><span className="text-xs font-medium text-muted-foreground bg-white dark:bg-slate-800 px-3 py-1 rounded-full border shadow-sm"><Text pt="Tentativas:" en="Attempts:" es="Intentos:" /> <span className="text-rose-600 font-bold ml-1">{remainingPlays}</span></span></div>
                )}
            </div>
            <div className="w-full mt-4"><ProductAd product={ad} /></div>
        </div>
    );
}