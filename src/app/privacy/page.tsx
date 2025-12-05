"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrivacyPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
            <div className="max-w-3xl mx-auto space-y-6">
                <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Política de Privacidade e Cookies</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">1. Coleta de Dados</h3>
                        <p>
                            O LoveDice coleta apenas os dados necessários para o funcionamento do jogo e da conta, como Nome e E-mail (fornecidos pelo Google ou cadastro).
                            Dados de pagamento são processados inteiramente pelo Stripe e não são armazenados em nossos servidores.
                        </p>

                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">2. Uso de Endereço</h3>
                        <p>
                            Seus dados de endereço (CEP) são utilizados opcionalmente para personalização do perfil e não são compartilhados com terceiros para fins de marketing sem seu consentimento explícito.
                        </p>

                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">3. Cookies</h3>
                        <p>
                            Utilizamos cookies essenciais para manter sua sessão de login ativa e cookies de preferência para salvar seu progresso nos jogos (como o contador de tentativas diárias).
                        </p>

                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">4. Conteúdo +18</h3>
                        <p>
                            Ao utilizar este site, você confirma ser maior de 18 anos. O conteúdo gerado pelos jogos tem caráter lúdico e de entretenimento adulto.
                        </p>

                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">5. Exclusão de Dados</h3>
                        <p>
                            Você pode solicitar a exclusão completa de sua conta e dados a qualquer momento enviando um e-mail para suporte@lovedice.com ou através da opção &quot;Deletar Conta&quot; (em breve no perfil).
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}