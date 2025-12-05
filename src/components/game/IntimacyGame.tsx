"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DICE_FACES } from "@/data/gameData";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ExternalLink, RefreshCw } from "lucide-react";
import { useReward } from 'react-rewards';
import { Text } from "@/components/providers/preferences-provider";

interface IntimacyGameProps {
    onPlayAttempt?: () => Promise<boolean>; 
    remainingPlays?: number;
    isPremium?: boolean;
}

export default function IntimacyGame({ onPlayAttempt, remainingPlays, isPremium }: IntimacyGameProps) {
    const [isRolling, setIsRolling] = useState(false);
    const [resultId, setResultId] = useState<number | null>(null);
    const [rotation, setRotation] = useState({ x: 45, y: 45 });
    const { reward } = useReward('diceReward', 'confetti', { elementCount: 50, spread: 60 });

    const rollDice = async () => {
        if (isRolling) return;
        if (onPlayAttempt) {
            const allowed = await onPlayAttempt();
            if (!allowed) return;
        }

        setIsRolling(true);
        setResultId(null);

        const newResult = Math.floor(Math.random() * 6) + 1;
        const randomSpinsX = Math.floor(Math.random() * 5) + 4;
        const randomSpinsY = Math.floor(Math.random() * 5) + 4;
        let targetX = randomSpinsX * 360;
        let targetY = randomSpinsY * 360;

        switch (newResult) {
            case 1: targetX += 0; targetY += 0; break;
            case 2: targetX += 180; targetY += 0; break;
            case 3: targetX += 0; targetY += -90; break;
            case 4: targetX += 0; targetY += 90; break;
            case 5: targetX += -90; targetY += 0; break;
            case 6: targetX += 90; targetY += 0; break;
        }

        setRotation({ x: targetX, y: targetY });

        setTimeout(() => {
            setResultId(newResult);
            setIsRolling(false);
            reward();
        }, 2000);
    };

    const resultData = resultId ? DICE_FACES.find(f => f.id === resultId) : null;

    return (
        <div className="flex flex-col items-center justify-center gap-8 py-6 w-full overflow-hidden">
            <div className="relative w-64 h-64 perspective-1000 my-8 scale-75 sm:scale-100 transition-transform">
                <motion.div
                    className="w-full h-full relative preserve-3d"
                    animate={{ rotateX: rotation.x, rotateY: rotation.y }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {DICE_FACES.map((face, index) => {
                        const zAxis = "translateZ(8rem)";
                        const transforms = [
                            `rotateY(0deg) ${zAxis}`, `rotateY(180deg) ${zAxis}`, `rotateY(90deg) ${zAxis}`,
                            `rotateY(-90deg) ${zAxis}`, `rotateX(90deg) ${zAxis}`, `rotateX(-90deg) ${zAxis}`,
                        ];
                        return (
                            <div key={face.id} className={`absolute w-full h-full flex flex-col items-center justify-center border-4 border-white/80 rounded-3xl shadow-lg backface-hidden ${face.color} bg-opacity-95`} style={{ transform: transforms[index], backfaceVisibility: "hidden" }}>
                                <face.icon className="w-20 h-20 mb-2 opacity-90 drop-shadow-md" />
                                <span className="text-3xl font-black uppercase tracking-wider text-center drop-shadow-sm px-2">{face.label}</span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            <div className="w-full max-w-xs flex flex-col gap-3 relative z-10">
                <span id="diceReward" className="absolute left-1/2 top-1/2" />
                <Button size="lg" onClick={rollDice} disabled={isRolling} className="w-full h-14 rounded-full text-lg font-bold shadow-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white">
                    {isRolling ? <RefreshCw className="animate-spin mr-2" /> : <Text pt="GIRAR O DADO" en="ROLL DICE" es="GIRAR DADO" />}
                </Button>
                {!isPremium && remainingPlays !== undefined && (
                    <div className="text-center animate-in fade-in slide-in-from-top-1">
                        <span className="text-xs font-medium text-muted-foreground bg-white dark:bg-slate-800 px-3 py-1 rounded-full border shadow-sm">
                            <Text pt="Tentativas:" en="Attempts:" es="Intentos:" /> <span className="text-rose-600 font-bold ml-1">{remainingPlays}</span>
                        </span>
                    </div>
                )}
            </div>

            <div className="w-full max-w-md min-h-[120px]">
                <AnimatePresence mode="wait">
                    {resultData && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full">
                            <Card className="border-rose-200 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-2xl">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-rose-600">
                                        <resultData.icon className="w-5 h-5" /> {resultData.label}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-lg font-medium text-slate-700 dark:text-slate-300">{resultData.instruction}</p>
                                    <div className="flex items-center gap-3 p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg border border-rose-100 dark:border-rose-900 cursor-pointer" onClick={() => window.open(resultData.suggestedProduct.affiliateLink, '_blank')}>
                                        <div className="text-3xl">{resultData.suggestedProduct.image}</div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{resultData.suggestedProduct.name}</p>
                                            <p className="text-[10px] text-slate-500 italic">&quot;{resultData.suggestedProduct.reason}&quot;</p>
                                        </div>
                                        <div className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm text-rose-500"><ExternalLink className="w-4 h-4" /></div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}