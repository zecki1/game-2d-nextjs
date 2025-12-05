"use client";

import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Text } from "@/components/providers/preferences-provider";

// ESTE COMPONENTE ESTAVA FALTANDO A EXPORTAÇÃO 'DEFAULT'
export default function PaymentCancelPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 text-center">
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 shadow-md animate-in zoom-in">
                <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-red-700 dark:text-red-500 mb-2">
                <Text pt="Pagamento Cancelado" en="Payment Canceled" es="Pago Cancelado" />
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md">
                <Text
                    pt="Sua transação não foi concluída. Você pode tentar novamente na página do seu perfil."
                    en="Your transaction was not completed. You can try again on your profile page."
                    es="Tu transacción no se completó. Puedes intentarlo de nuevo en la página de tu perfil."
                />
            </p>

            <div className="flex flex-col gap-4">
                <Button
                    onClick={() => router.push("/profile")}
                    className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg h-12 text-lg px-8"
                >
                    <Text pt="Ir para o Perfil" en="Go to Profile" es="Ir al Perfil" />
                </Button>
                <Button
                    onClick={() => router.push("/")}
                    variant="ghost"
                >
                    <Text pt="Voltar à Página Inicial" en="Back to Home" es="Volver a Inicio" />
                </Button>
            </div>
        </div>
    );
}