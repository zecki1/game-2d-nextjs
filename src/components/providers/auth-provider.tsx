"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import { RefreshCw } from "lucide-react";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        let isInitialLoad = true;
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            // Lógica de Redirecionamento Imediato
            // 1. Redireciona para login se não estiver logado E não estiver na página de login
            if (!currentUser && pathname !== "/login") {
                router.push("/login");
            }
            // 2. Opcional: Redireciona para home se estiver logado E na página de login
            else if (currentUser && pathname === "/login") {
                router.push("/");
            }

            // Define loading como false APENAS após a primeira verificação completa
            if (isInitialLoad) {
                setLoading(false);
                isInitialLoad = false;
            }
        });

        // Limpeza: a dependência 'loading' foi removida.
        return () => unsubscribe();
    }, [router, pathname]); // Dependências: router e pathname são as únicas externas necessárias.

    const logout = async () => {
        await signOut(auth);
        // O onAuthStateChanged deve pegar e redirecionar, mas o push aqui é uma garantia.
        router.push("/login");
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-background">
                <RefreshCw className="w-10 h-10 text-rose-600 animate-spin" />
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}