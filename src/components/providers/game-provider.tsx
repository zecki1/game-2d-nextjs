"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth-provider";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, updateDoc, setDoc } from "firebase/firestore";
import { toast } from "sonner";

interface GameContextType {
    attemptsLeft: number;
    consumeAttempt: (gameId: string) => Promise<boolean>;
    isPremium: boolean;
    loadingData: boolean;
}

const GameContext = createContext<GameContextType>({
    attemptsLeft: 0,
    consumeAttempt: async () => false,
    isPremium: false,
    loadingData: true
});

export const useGame = () => useContext(GameContext);

export function GameProvider({ children }: { children: React.ReactNode }) {
    const { user, loading: authLoading } = useAuth();

    const [isPremium, setIsPremium] = useState(false);
    const [attemptsUsed, setAttemptsUsed] = useState(0);
    const [playedGamesToday, setPlayedGamesToday] = useState<string[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    const FREE_LIMIT = 3;
    const PREMIUM_LIMIT = 999;

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoadingData(false);
            return;
        }

        const unsub = onSnapshot(doc(db, "users", user.uid), async (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                const todayStr = new Date().toDateString();

                // Verifica Reset Diário
                if (data.lastPlayDate !== todayStr) {
                    try {
                        // Inicia o update no DB para resetar o dia
                        await updateDoc(doc(db, "users", user.uid), {
                            dailyAttempts: 0,
                            playedGamesToday: [],
                            lastPlayDate: todayStr
                        });
                    } catch (e) { console.error("Erro reset dia:", e); }
                } else {
                    // Se o dia já foi resetado (ou não precisa), atualiza o state
                    setAttemptsUsed(typeof data.dailyAttempts === 'number' ? data.dailyAttempts : 0);
                    setPlayedGamesToday(Array.isArray(data.playedGamesToday) ? data.playedGamesToday : []);
                }

                setIsPremium(!!data.isPremium);
            } else {
                // Cria usuário inicial
                try {
                    await setDoc(doc(db, "users", user.uid), {
                        dailyAttempts: 0,
                        playedGamesToday: [],
                        isPremium: false,
                        lastPlayDate: new Date().toDateString(),
                        email: user.email || ""
                    }, { merge: true });
                } catch (e) { console.error("Erro criar user:", e); }
            }
            setLoadingData(false);
        });

        return () => unsub();
    }, [user, authLoading]);

    const consumeAttempt = async (gameId: string): Promise<boolean> => {
        if (!user) return false;

        // Se o gameId vier vazio, define um padrão para não quebrar
        const safeGameId = gameId || "unknown_game";

        if (isPremium) return true;

        const currentPlayedGames = Array.isArray(playedGamesToday) ? playedGamesToday : [];

        // 1. Verifica Limite
        if (attemptsUsed < FREE_LIMIT) {
            const newCount = attemptsUsed + 1;
            const newPlayedGames = currentPlayedGames.includes(safeGameId) ? currentPlayedGames : [...currentPlayedGames, safeGameId];

            // Otimista (apenas para UX, o onSnapshot irá sincronizar o estado real em seguida)
            setAttemptsUsed(newCount);
            setPlayedGamesToday(newPlayedGames);

            try {
                // Atualização que será lida pelo onSnapshot
                await updateDoc(doc(db, "users", user.uid), {
                    dailyAttempts: newCount,
                    playedGamesToday: newPlayedGames,
                    lastPlayDate: new Date().toDateString()
                });
            } catch (e) { console.error("Erro ao salvar jogada:", e); }

            return true;
        }

        // 2. Bônus Novo Jogo
        if (!currentPlayedGames.includes(safeGameId)) {
            toast.success("Bônus! Testando jogo novo.");
            const newPlayedGames = [...currentPlayedGames, safeGameId];

            // Otimista (apenas para UX)
            setPlayedGamesToday(newPlayedGames);

            try {
                // Atualização que será lida pelo onSnapshot
                await updateDoc(doc(db, "users", user.uid), {
                    playedGamesToday: newPlayedGames
                });
            } catch (e) { console.error("Erro ao salvar bônus:", e); }

            return true;
        }

        return false;
    };

    const currentLimit = isPremium ? PREMIUM_LIMIT : FREE_LIMIT;
    const attemptsLeft = Math.max(0, currentLimit - attemptsUsed);

    return (
        <GameContext.Provider value={{ attemptsLeft, consumeAttempt, isPremium, loadingData }}>
            {children}
        </GameContext.Provider>
    );
}