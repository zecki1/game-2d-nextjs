"use client";

import React, { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Layers, Loader2 } from "lucide-react";
import { getSuggestedProduct } from "@/data/affiliates";
import { ProductAd } from "@/components/ads/ProductAd";
import { Text } from "@/components/providers/preferences-provider";

// --- DADOS ---
const POSITIONS = [
    { id: 1, title: { pt: "A Concha", en: "The Spoon", es: "La Cuchara" }, desc: { pt: "Clássico carinhoso.", en: "Affectionate classic.", es: "Clásico cariñoso." }, difficulty: "easy" },
    { id: 2, title: { pt: "O Lótus", en: "The Lotus", es: "El Loto" }, desc: { pt: "Sentados frente a frente.", en: "Sitting face to face.", es: "Sentados frente a frente." }, difficulty: "medium" },
    { id: 3, title: { pt: "A Ponte", en: "The Bridge", es: "El Puente" }, desc: { pt: "Exige força.", en: "Requires strength.", es: "Requiere fuerza." }, difficulty: "hard" },
    { id: 4, title: { pt: "69", en: "69", es: "69" }, desc: { pt: "Prazer mútuo.", en: "Mutual pleasure.", es: "Placer mútuo." }, difficulty: "medium" }
];

const deckVariants: Variants = {
    initial: { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 },
    shuffling: {
        x: [0, -10, 10, -5, 5, 0],
        y: [0, 5, -5, 3, -3, 0],
        rotate: [0, 5, -5, 3, -3, 0],
        scale: [1, 1.05, 1],
        transition: {
            duration: 1.5,
            ease: "easeInOut",
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
            repeat: 0,
        },
    },
    exit: { x: -300, opacity: 0, transition: { duration: 0.5 } },
};

const cardVariants: Variants = {
    initial: { x: 300, opacity: 0, rotateY: -90 },
    animate: { x: 0, opacity: 1, rotateY: 0, transition: { duration: 0.5 } },
};


interface GameProps {
    playersMode: "2" | "4" | "grupo";
    onPlayAttempt?: () => Promise<boolean>;
}

export default function KamaSutraGame({ playersMode: _playersMode, onPlayAttempt }: GameProps) { // eslint-disable-line @typescript-eslint/no-unused-vars
    const [currentPos, setCurrentPos] = useState<typeof POSITIONS[0] | null>(null);
    const [isShuffling, setIsShuffling] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const suggestedProduct = useMemo(() => getSuggestedProduct(), []);


    const drawCard = useCallback(async () => {
        if (isShuffling) return;

        if (onPlayAttempt) {
            const allowed = await onPlayAttempt();
            if (!allowed) return;
        }

        setCurrentPos(null);
        setIsShuffling(true);

        setTimeout(() => {
            const random = POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
            setCurrentPos(random);
            setIsShuffling(false);

            setTimeout(() => {
                const cardElement = document.getElementById("kama-card-result");
                if (cardElement) cardElement.focus();
            }, 500);
        }, 1500);
    }, [isShuffling, onPlayAttempt]);

    const deckAnimationState = isShuffling ? "shuffling" : "initial";

    return (
        <div className="w-full max-w-md mx-auto perspective-1000">
            <div className="relative h-[500px] w-full flex items-center justify-center mb-6">
                <AnimatePresence mode="wait">
                    {(!currentPos || isShuffling) && (
                        <motion.div
                            key="deck"
                            variants={deckVariants} 
                            initial="initial"
                            animate={deckAnimationState}
                            exit="exit"
                            className="absolute w-full h-full"
                        >
                            {/* A CARTA ATRÁS (Shadow) */}
                            <div className="absolute top-0 left-0 w-full h-full bg-rose-200 dark:bg-slate-800 rounded-xl border-2 border-white dark:border-slate-700 transform rotate-3" />

                            {/* A CARTA PRINCIPAL DO BARALHO */}
                            <Card className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-rose-600 to-purple-700 border-4 border-white shadow-2xl flex flex-col items-center justify-center rounded-xl cursor-pointer" onClick={drawCard}>
                                <Layers className="w-24 h-24 text-white/50 mb-4" />
                                <h3 className="text-white font-bold text-2xl uppercase"><Text pt="Toque para Revelar" en="Tap to Reveal" es="Toca para Revelar" /></h3>
                            </Card>
                        </motion.div>
                    )}
                    {currentPos && !isShuffling && (
                        <motion.div
                            id="kama-card-result"
                            key="card-face"
                            tabIndex={-1}
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            className="absolute w-full h-full focus:outline-none"
                        >
                            {/* CARTA REVELADA - Cores ajustadas para tema escuro */}
                            <Card className="w-full h-full flex flex-col justify-between p-6 bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-slate-700 shadow-2xl rounded-xl">

                                {/* Conteúdo Superior */}
                                <div className="w-full flex justify-between items-center text-rose-600 dark:text-rose-400">
                                    <span className="text-xl font-bold">{currentPos.id}</span>
                                    <Heart className="w-6 h-6 fill-rose-600 dark:fill-rose-400" />
                                </div>

                                {/* Conteúdo Central */}
                                <div className="text-center my-4 flex-1 flex flex-col justify-center items-center">
                                    <div className="w-24 h-24 bg-rose-50 dark:bg-slate-800 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl shadow-inner">🧘</div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2"><Text pt={currentPos.title.pt} en={currentPos.title.en} es={currentPos.title.es} /></h2>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg"><Text pt={currentPos.desc.pt} en={currentPos.desc.en} es={currentPos.desc.es} /></p>
                                </div>

                                {/* CONTAINER DA PROPAGANDA */}
                                <div className="w-full pt-4 border-t border-dashed border-rose-200 dark:border-slate-700">
                                    <ProductAd product={suggestedProduct} />
                                </div>

                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* BOTÃO DE TIRAR OUTRA CARTA - Cores ajustadas para melhor contraste */}
            <Button
                ref={buttonRef}
                onClick={drawCard}
                disabled={isShuffling}
                className="w-full h-14 text-lg font-bold rounded-full bg-rose-600 dark:bg-rose-700 text-white hover:bg-rose-700 dark:hover:bg-rose-800 transition-colors hover:scale-105 shadow-lg"
            >
                {isShuffling ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        <Text pt="Embaralhando..." en="Shuffling..." es="Barajando..." />
                    </>
                ) : (
                    <Text pt="Tirar Outra Carta" en="Draw Another Card" es="Sacar Otra Carta" />
                )}
            </Button>
        </div>
    );
}