"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const consent = localStorage.getItem("cookie-consent");
            if (!consent) {
                setIsVisible(true);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "true");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur text-white p-4 z-50 border-t border-slate-700 animate-in slide-in-from-bottom-full duration-500">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-slate-300 max-w-2xl">
                    <p>
                        <span className="font-bold text-white">Nós usamos cookies 🍪</span>
                        <br />
                        Utilizamos cookies para melhorar sua experiência e salvar seu progresso.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="text-slate-900 border-slate-300 hover:bg-slate-100" onClick={() => window.open('/privacy', '_blank')}>
                        Política
                    </Button>
                    <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white px-6 font-bold" onClick={handleAccept}>
                        Aceitar Tudo
                    </Button>
                    <button onClick={() => setIsVisible(false)} className="md:hidden absolute top-2 right-2 text-slate-400">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}