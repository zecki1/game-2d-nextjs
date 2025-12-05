"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Layers } from "lucide-react";
import { getSuggestedProduct } from "@/data/affiliates";
import { ProductAd } from "@/components/ads/ProductAd";
import { Text } from "@/components/providers/preferences-provider";

const POSITIONS = [
    { id: 1, title: { pt: "A Concha", en: "The Spoon", es: "La Cuchara" }, desc: { pt: "Clássico carinhoso.", en: "Affectionate classic.", es: "Clásico cariñoso." }, difficulty: "easy" },
    { id: 2, title: { pt: "O Lótus", en: "The Lotus", es: "El Loto" }, desc: { pt: "Sentados frente a frente.", en: "Sitting face to face.", es: "Sentados frente a frente." }, difficulty: "medium" },
    { id: 3, title: { pt: "A Ponte", en: "The Bridge", es: "El Puente" }, desc: { pt: "Exige força.", en: "Requires strength.", es: "Requiere fuerza." }, difficulty: "hard" },
    { id: 4, title: { pt: "69", en: "69", es: "69" }, desc: { pt: "Prazer mútuo.", en: "Mutual pleasure.", es: "Placer mutuo." }, difficulty: "medium" }
];

interface GameProps {
    playersMode: "2" | "4" | "grupo";
    onPlayAttempt?: () => Promise<boolean>;
}

// CORREÇÃO: Usando a sintaxe de renomeação na desestruturação (playersMode: _playersMode)
export default function KamaSutraGame({ playersMode: _playersMode, onPlayAttempt }: GameProps) {
    const [currentPos, setCurrentPos] = useState<typeof POSITIONS[0] | null>(null);
    const [isShuffling, setIsShuffling] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const suggestedProduct = getSuggestedProduct();

    const drawCard = async () => {
        if (onPlayAttempt) {
            const allowed = await onPlayAttempt();
            if (!allowed) return;
        }

        setIsShuffling(true);
        setTimeout(() => {
            const random = POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
            setCurrentPos(random);
            setIsShuffling(false);
            setTimeout(() => {
                const cardElement = document.getElementById("kama-card-result");
                if (cardElement) cardElement.focus();
            }, 100);
        }, 1500);
    };
    return (
        <div className="w-full max-w-md mx-auto perspective-1000">
            <div className="relative h-[500px] w-full flex items-center justify-center mb-6">
                <AnimatePresence mode="wait">
                    {(!currentPos || isShuffling) && (
                        <motion.div key="deck" initial={{ scale: 1 }} animate={isShuffling ? { x: [0, -5, 5, 0], scale: [1, 1.05, 1] } : {}} exit={{ x: -300, opacity: 0 }} transition={{ duration: 0.5 }} className="absolute w-full h-full">
                            <div className="absolute top-0 left-0 w-full h-full bg-rose-200 rounded-xl border-2 border-white transform rotate-3" />
                            <Card className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-rose-500 to-purple-600 border-4 border-white shadow-2xl flex flex-col items-center justify-center rounded-xl cursor-pointer" onClick={drawCard}>
                                <Layers className="w-24 h-24 text-white/50 mb-4" />
                                <h3 className="text-white font-bold text-2xl uppercase"><Text pt="Toque" en="Tap" es="Toque" /></h3>
                            </Card>
                        </motion.div>
                    )}
                    {currentPos && !isShuffling && (
                        <motion.div id="kama-card-result" key="card-face" initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="absolute w-full h-full">
                            <Card className="w-full h-full flex flex-col items-center justify-between p-6 bg-white dark:bg-slate-900 border-2 border-rose-200 shadow-2xl rounded-xl">
                                <div className="w-full flex justify-between items-center text-rose-400"><span className="text-xl font-bold">{currentPos.id}</span><Heart className="w-6 h-6 fill-current" /></div>
                                <div className="text-center my-4">
                                    <div className="w-24 h-24 bg-rose-50 dark:bg-rose-900/20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl shadow-inner">🧘</div>
                                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2"><Text pt={currentPos.title.pt} en={currentPos.title.en} es={currentPos.title.es} /></h2>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg"><Text pt={currentPos.desc.pt} en={currentPos.desc.en} es={currentPos.desc.es} /></p>
                                </div>
                                <div className="w-full mt-auto pt-4 border-t border-dashed border-rose-200"><ProductAd product={suggestedProduct} /></div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <Button ref={buttonRef} onClick={drawCard} disabled={isShuffling} className="w-full h-14 text-lg font-bold rounded-full bg-slate-900 text-white hover:scale-105 transition-transform shadow-lg">
                {isShuffling ? <Text pt="Embaralhando..." en="Shuffling..." es="Barajando..." /> : <Text pt="Tirar Outra Carta" en="Draw Another Card" es="Sacar Otra Carta" />}
            </Button>
        </div>
    );
}