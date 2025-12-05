"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { Crown, Loader2 } from "lucide-react";
import { Text } from "@/components/providers/preferences-provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SubscribeButton({ className }: { className?: string }) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubscribe = async () => {
        if (!user) {
            router.push("/login");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.uid,
                    email: user.email
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url; 
            } else {
                toast.error("Erro ao iniciar pagamento.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Erro de conexão.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleSubscribe}
            disabled={loading}
            className={`bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition-transform ${className}`}
        >
            {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <>
                    <Crown className="w-4 h-4 mr-2" />
                    <Text pt="Assinar Premium" en="Subscribe Premium" es="Suscribirse Premium" />
                </>
            )}
        </Button>
    );
}