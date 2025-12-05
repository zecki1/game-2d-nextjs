"use client";

import Link from "next/link";
import { Dice5, ShoppingBag, Heart } from "lucide-react"; // Novos ícones
import { SettingsMenu } from "@/components/settings-menu";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Text } from "@/components/providers/preferences-provider";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SiteHeader() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                {/* Logo Area */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="p-2 bg-gradient-to-br from-rose-500 to-purple-600 rounded-lg shadow-md rotate-3 hover:rotate-0 transition-transform">
                        <Dice5 className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden md:inline-block">
                        Love<span className="text-rose-600">Dice</span>
                    </span>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <button onClick={() => scrollToSection('game-section')} className="hover:text-rose-600 transition-colors flex items-center gap-1">
                        <Dice5 className="w-4 h-4" />
                        <Text pt="O Jogo" en="The Game" es="El Juego" />
                    </button>

                    <button onClick={() => window.open('https://www.gall.com.br/pagina/cosmeticos', '_blank')} className="hover:text-rose-600 transition-colors flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <Text pt="Guia Sensual" en="Sensual Guide" es="Guía Sensual" />
                    </button>

                    <Link href="https://www.gall.com.br" target="_blank" className="hover:text-rose-600 transition-colors flex items-center gap-1">
                        <ShoppingBag className="w-4 h-4" />
                        <Text pt="Loja" en="Shop" es="Tienda" />
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <div className="hidden sm:flex">
                        <LanguageSwitcher />
                        <SettingsMenu />
                    </div>

                    <Separator orientation="vertical" className="h-6 mx-2 hidden sm:block" />

                    {/* CTA Mobile ou Avatar Desktop */}
                    <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-4">
                        <Text pt="Jogar Agora" en="Play Now" es="Jugar Ahora" />
                    </Button>
                </div>
            </div>
        </header>
    );
}