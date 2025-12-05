"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DICE_FACES } from "@/data/gameData"; // Certifique-se que o data existe (Passo 2)
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, RefreshCw } from "lucide-react";
import { useReward } from 'react-rewards';

export default function IntimacyGame() {
    const [isRolling, setIsRolling] = useState(false);
    const [resultId, setResultId] = useState<number | null>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const { reward } = useReward('diceReward', 'confetti', { elementCount: 50, spread: 60 });

    const rollDice = () => {
        if (isRolling) return;
        setIsRolling(true);
        setResultId(null);

        const newResult = Math.floor(Math.random() * 6) + 1;

        // Lógica de rotação para cair na face certa
        let rotX = 720; // 2 voltas completas base
        let rotY = 720;

        switch (newResult) {
            case 1: rotX += 0; rotY += 0; break;      // Frente
            case 2: rotX += 180; rotY += 0; break;    // Trás
            case 3: rotX += 0; rotY += -90; break;    // Direita
            case 4: rotX += 0; rotY += 90; break;     // Esquerda
            case 5: rotX += -90; rotY += 0; break;    // Topo
            case 6: rotX += 90; rotY += 0; break;     // Baixo
        }

        setRotation({ x: rotX, y: rotY });

        setTimeout(() => {
            setResultId(newResult);
            setIsRolling(false);
            reward();
        }, 2000);
    };

    const resultData = resultId ? DICE_FACES.find(f => f.id === resultId) : null;

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 py-10 min-h-[500px]">

            {/* --- LADO ESQUERDO: O DADO --- */}
            <div className="flex flex-col items-center gap-8 perspective-1000">
                <div className="relative w-40 h-40 sm:w-56 sm:h-56" style={{ perspective: "1000px" }}>
                    <motion.div
                        className="w-full h-full relative preserve-3d"
                        animate={{ rotateX: rotation.x, rotateY: rotation.y }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {DICE_FACES.map((face, index) => {
                            // Valores fixos em pixels para evitar quebra no mobile
                            const transforms = [
                                "rotateY(0deg) translateZ(112px)",    // 1
                                "rotateY(180deg) translateZ(112px)",  // 2
                                "rotateY(90deg) translateZ(112px)",   // 3
                                "rotateY(-90deg) translateZ(112px)",  // 4
                                "rotateX(90deg) translateZ(112px)",   // 5
                                "rotateX(-90deg) translateZ(112px)",  // 6
                            ];

                            return (
                                <div
                                    key={face.id}
                                    className={`absolute w-full h-full flex flex-col items-center justify-center border-4 border-white/50 rounded-2xl shadow-inner backface-hidden ${face.color}`}
                                    style={{ transform: transforms[index] }}
                                >
                                    <face.icon className="w-12 h-12 sm:w-16 sm:h-16 mb-2 opacity-80" />
                                    <span className="text-xl sm:text-2xl font-bold">{face.label}</span>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>

                <div className="relative">
                    <span id="diceReward" className="absolute left-1/2 top-1/2" />
                    <Button
                        size="lg"
                        onClick={rollDice}
                        disabled={isRolling}
                        className="rounded-full px-10 py-6 text-lg font-bold shadow-xl shadow-rose-500/20 bg-gradient-to-r from-rose-500 to-purple-600 hover:scale-105 transition-transform"
                    >
                        {isRolling ? <RefreshCw className="animate-spin mr-2" /> : "GIRAR O DADO"}
                    </Button>
                </div>
            </div>

            {/* --- LADO DIREITO: O RESULTADO E O PRODUTO --- */}
            <div className="w-full max-w-md min-h-[300px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {resultData ? (
                        <motion.div
                            key={resultData.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full"
                        >
                            <Card className="border-rose-200 bg-white/50 backdrop-blur-sm shadow-2xl overflow-hidden dark:bg-slate-900/80 dark:border-rose-900">
                                <div className="h-2 w-full bg-gradient-to-r from-rose-400 to-purple-500" />
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
                                        <resultData.icon className="w-6 h-6" />
                                        {resultData.label}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-lg font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                                        {resultData.instruction}
                                    </p>

                                    {/* Contextual Commerce Block */}
                                    <div className="mt-6 bg-rose-50 dark:bg-rose-950/30 p-4 rounded-xl border border-rose-100 dark:border-rose-900">
                                        <Badge variant="outline" className="mb-2 bg-white dark:bg-slate-800 text-rose-500 border-rose-200 dark:border-rose-800">
                                            Dica de Especialista
                                        </Badge>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 italic mb-3">
                                            "{resultData.suggestedProduct.reason}"
                                        </p>
                                        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-lg shadow-sm">
                                            <div className="h-12 w-12 bg-rose-100 dark:bg-rose-900 rounded-md flex items-center justify-center text-2xl">
                                                {resultData.suggestedProduct.image}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{resultData.suggestedProduct.name}</h4>
                                                <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold">{resultData.suggestedProduct.price}</span>
                                            </div>
                                            <Button size="sm" variant="ghost" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900" asChild>
                                                <a href={resultData.suggestedProduct.affiliateLink} target="_blank">
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-muted-foreground w-full p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl"
                        >
                            <p>Clique em "Girar" para receber sua missão e uma dica exclusiva.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}