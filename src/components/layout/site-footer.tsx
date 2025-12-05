"use client";

import { Text } from "@/components/providers/preferences-provider";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

export function SiteFooter() {
    return (
        <footer className="border-t py-12 bg-slate-50 dark:bg-slate-950 mt-auto">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">

                {/* Brand & Warning */}
                <div className="mb-6">
                    <span className="font-bold text-xl text-slate-900 dark:text-slate-100">
                        Love<span className="text-rose-600">Dice</span>
                    </span>
                    <div className="mt-2">
                        <Badge variant="outline" className="border-rose-200 text-rose-600 bg-rose-50">
                            +18 Conteúdo Adulto
                        </Badge>
                    </div>
                </div>

                {/* Disclaimer */}
                <p className="max-w-md text-xs text-muted-foreground mb-8 leading-relaxed">
                    <Text
                        pt="Este site é destinado a maiores de 18 anos. As sugestões de jogos e produtos têm caráter lúdico e informativo. Pratique sempre com consentimento e segurança."
                        en="This site is intended for adults over 18. Game suggestions and products are for recreational and informational purposes. Always practice with consent and safety."
                        es="Este sitio está destinado a mayores de 18 años. Las sugerencias de juegos y productos son recreativas e informativas. Practique siempre con consentimiento y seguridad."
                    />
                </p>

                {/* Social Links */}
                <div className="flex gap-6 mb-8 text-2xl text-slate-400">
                    <a href="#" className="hover:text-rose-500 transition-colors"><FaInstagram /></a>
                    <a href="#" className="hover:text-green-500 transition-colors"><FaWhatsapp /></a>
                </div>

                {/* Copyright */}
                <div className="text-sm text-muted-foreground border-t border-slate-200 dark:border-slate-800 pt-6 w-full max-w-2xl">
                    &copy; {new Date().getFullYear()} Love Dice.
                    <span className="ml-1">
                        <Text pt="Todos os direitos reservados." en="All rights reserved." es="Todos los derechos reservados." />
                    </span>
                </div>
            </div>
        </footer>
    );
}