"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/providers/preferences-provider";
import { Timer } from "lucide-react";
import { ProductAd } from "@/components/ads/ProductAd";
import { getSuggestedProduct } from "@/data/affiliates";

type RouletteResult = {
    action: { pt: string, en: string, es: string };
    body: { pt: string, en: string, es: string };
    time: number;
};

const ACTIONS = [
    { pt: "Beijar", en: "Kiss", es: "Besar" }, { pt: "Lamber", en: "Lick", es: "Lamer" },
    { pt: "Soprar", en: "Blow", es: "Soplar" }, { pt: "Massagear", en: "Massage", es: "Masajear" },
    { pt: "Mordiscar", en: "Nibble", es: "Mordisquear" }
];
const BODY_PARTS = [
    { pt: "Pescoço", en: "Neck", es: "Cuello" }, { pt: "Orelha", en: "Ear", es: "Oreja" },
    { pt: "Coxa", en: "Thigh", es: "Muslo" }, { pt: "Umbigo", en: "Belly Button", es: "Ombligo" },
    { pt: "Costas", en: "Back", es: "Espalda" }
];
const DURATIONS = [30, 45, 60, 90];

interface GameProps {
    onPlayAttempt?: () => Promise<boolean>;
    remainingPlays?: number;
    isPremium?: boolean;
}

export default function ForeplayRoulette({ onPlayAttempt, remainingPlays, isPremium }: GameProps) {
    const [result, setResult] = useState<RouletteResult | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    const spin = async () => {
        if (onPlayAttempt) {
            const allowed = await onPlayAttempt();
            if (!allowed) return;
        }

        setIsSpinning(true);
        setResult(null);
        setTimerActive(false);

        setTimeout(() => {
            const randomAction = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
            const randomBody = BODY_PARTS[Math.floor(Math.random() * BODY_PARTS.length)];
            const randomTime = DURATIONS[Math.floor(Math.random() * DURATIONS.length)];
            setResult({ action: randomAction, body: randomBody, time: randomTime });
            setTimeLeft(randomTime);
            setIsSpinning(false);
        }, 1500);
    };

    const toggleTimer = () => setTimerActive(!timerActive);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setTimerActive(false); 
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive, timeLeft]);

    const ad = getSuggestedProduct();

    return (
        <div className="w-full max-w-md mx-auto flex flex-col gap-6">
            <Card className="p-8 text-center bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 min-h-[300px] flex flex-col items-center justify-center shadow-xl">
                {isSpinning ? (
                    <div className="animate-pulse text-2xl font-bold text-rose-500"><Text pt="Girando..." en="Spinning..." es="Girando..." /></div>
                ) : result ? (
                    <div className="space-y-6 w-full animate-in zoom-in duration-300">
                        <div className="space-y-2">
                            <p className="text-xs text-muted-foreground uppercase tracking-widest"><Text pt="Sua Missão" en="Your Mission" es="Tu Misión" /></p>
                            <h2 className="text-4xl font-black text-rose-600"><Text pt={result.action.pt} en={result.action.en} es={result.action.es} /></h2>
                            <p className="text-lg"><Text pt="em" en="on" es="en" /> <span className="font-bold underline"><Text pt={result.body.pt} en={result.body.en} es={result.body.es} /></span></p>
                        </div>
                        <div className="py-4 border-t border-b border-dashed border-slate-200 dark:border-slate-800">
                            <div className="text-5xl font-mono font-bold text-slate-800 dark:text-white tabular-nums">00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</div>
                            <Button variant="ghost" size="sm" onClick={toggleTimer} className="mt-2 text-rose-500 hover:bg-rose-50">{timerActive ? "⏸ Pause" : "▶ Start"}</Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center opacity-50"><Timer className="w-16 h-16 mx-auto mb-4" /><p><Text pt="Gire a roleta" en="Spin roulette" es="Gira ruleta" /></p></div>
                )}
            </Card>
            <div className="w-full">
                <Button size="lg" onClick={spin} disabled={isSpinning || (timerActive && timeLeft > 0)} className="w-full h-14 rounded-full bg-slate-900 text-white hover:scale-105 transition-transform">
                    {result ? <Text pt="Nova Rodada" en="New Round" es="Nueva Ronda" /> : <Text pt="Girar Roleta" en="Spin Roulette" es="Girar Ruleta" />}
                </Button>
                {!isPremium && remainingPlays !== undefined && (
                    <div className="text-center mt-2"><span className="text-xs font-medium text-muted-foreground bg-white dark:bg-slate-800 px-3 py-1 rounded-full border shadow-sm"><Text pt="Tentativas:" en="Attempts:" es="Intentos:" /> <span className="text-rose-600 font-bold ml-1">{remainingPlays}</span></span></div>
                )}
            </div>
            <ProductAd product={ad} />
        </div>
    );
}