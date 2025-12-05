"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/providers/preferences-provider";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Card className="max-w-md w-full p-8 text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h1 className="text-2xl font-bold text-green-700">
                    <Text pt="Pagamento Aprovado!" en="Payment Successful!" es="¡Pago Exitoso!" />
                </h1>
                <p className="text-muted-foreground">
                    <Text
                        pt="Sua assinatura Premium está ativa. Aproveite jogos ilimitados."
                        en="Your Premium subscription is active. Enjoy unlimited games."
                        es="Tu suscripción Premium está activa. Disfruta juegos ilimitados."
                    />
                </p>
                <Button onClick={() => router.push('/')} className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Text pt="Voltar para os Jogos" en="Back to Games" es="Volver a los Juegos" />
                </Button>
            </Card>
        </div>
    );
}