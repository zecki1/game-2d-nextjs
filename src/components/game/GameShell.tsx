"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Text } from "@/components/providers/preferences-provider";
import { useRouter } from "next/navigation";
import { useGame } from "@/components/providers/game-provider";

interface GameShellProps {
    children: React.ReactNode;
    gameId?: string;
}

export function GameShell({ children, gameId }: GameShellProps) {
    const { consumeAttempt, attemptsLeft, isPremium, loadingData } = useGame();
    const [showPaywall, setShowPaywall] = useState(false);
    const router = useRouter();

    const handlePlayAttempt = async (): Promise<boolean> => {
        if (loadingData) return false;

        const safeId = gameId || "unknown_game";

        const allowed = await consumeAttempt(safeId);

        if (!allowed) {
            setShowPaywall(true);
            return false;
        }
        return true;
    };

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            // Desabilita a checagem de 'no-explicit-any' para a linha
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return React.cloneElement(child as React.ReactElement<any>, {
                onPlayAttempt: handlePlayAttempt,
                remainingPlays: isPremium ? 999 : attemptsLeft,
                isPremium: isPremium
            });
        }
        return child;
    });

    return (
        <div className="w-full relative">
            {childrenWithProps}

            <Dialog open={showPaywall} onOpenChange={setShowPaywall}>
                <DialogContent className="sm:max-w-md text-center rounded-2xl border-rose-200">
                    <DialogHeader>
                        <div className="mx-auto w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mb-4 shadow-sm animate-bounce">
                            <Crown className="w-8 h-8 text-rose-600" />
                        </div>
                        <DialogTitle className="text-xl text-center font-bold text-rose-800">
                            <Text pt="Fim das Tentativas!" en="Out of Attempts!" es="¡Fin de los Intentos!" />
                        </DialogTitle>
                        <DialogDescription className="text-center text-slate-600">
                            <Text
                                pt="Você atingiu o limite diário. Assine o Premium para jogar ilimitado."
                                en="Daily limit reached. Subscribe for unlimited play."
                                es="Límite diario alcanzado. Suscríbete para juego ilimitado."
                            />
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-3 py-4">
                        <Button className="w-full bg-gradient-to-r from-rose-600 to-purple-600 font-bold h-12 text-lg shadow-lg hover:scale-105 transition-transform" onClick={() => router.push('/profile')}>
                            <Text pt="Quero Ilimitado (R$ 9,90)" en="Go Unlimited" es="Quiero Ilimitado" />
                        </Button>
                        <Button variant="ghost" onClick={() => setShowPaywall(false)}>
                            <Text pt="Voltar amanhã" en="Come back tomorrow" es="Volver mañana" />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}