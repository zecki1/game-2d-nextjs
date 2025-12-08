"use client";

import Link from "next/link";
import { Dice5, ShoppingBag, User as UserIcon, LogOut } from "lucide-react"; // Adicionado Settings
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Text } from "@/components/providers/preferences-provider";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/providers/auth-provider";
import { useGame } from "@/components/providers/game-provider";
import { useRouter } from "next/navigation";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

// Importa o componente SettingsMenu
import { SettingsMenu } from "@/components/settings-menu";

export function SiteHeader() {
    const { user, logout } = useAuth();
    const { isPremium, attemptsLeft } = useGame();
    const router = useRouter();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        else router.push(`/#${id}`);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                <Link href="/" className="flex items-center gap-2 cursor-pointer group">
                    <div className="p-2 bg-gradient-to-br from-rose-500 to-purple-600 rounded-lg shadow-md group-hover:rotate-12 transition-transform duration-300">
                        <Dice5 className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden md:inline-block">
                        Love<span className="text-rose-600">Dice</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <button onClick={() => scrollToSection('game-section')} className="hover:text-rose-600 transition-colors flex items-center gap-1">
                        <Dice5 className="w-4 h-4" /> <Text pt="Jogos" en="Games" es="Juegos" />
                    </button>
                    <Link href="https://www.gall.com.br" target="_blank" className="hover:text-rose-600 transition-colors flex items-center gap-1">
                        <ShoppingBag className="w-4 h-4" /> <Text pt="Loja" en="Shop" es="Tienda" />
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    <LanguageSwitcher />
                    <Separator orientation="vertical" className="h-6 hidden sm:block" />

                    {/* Botão de Settings para o layout Mobile/Desktop que não está logado */}
                    {!user && (
                        <div className="hidden sm:block">
                            <SettingsMenu />
                        </div>
                    )}


                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="relative cursor-pointer group">
                                    <Avatar className={`h-10 w-10 border-2 transition-all ${isPremium ? 'border-yellow-400' : 'border-slate-200 group-hover:border-rose-400'}`}>
                                        <AvatarImage src={user.photoURL || ""} />
                                        <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">
                                            {user.email?.substring(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    {/* Indicador de Status */}
                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white ${isPremium ? 'bg-yellow-400' : 'bg-rose-500'}`}>
                                        {isPremium ? '★' : attemptsLeft}
                                    </div>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col">
                                        <span>{user.displayName || "Usuário"}</span>
                                        <span className="text-xs font-normal text-muted-foreground">{isPremium ? "Membro Premium 👑" : "Plano Grátis"}</span>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer">
                                    <UserIcon className="mr-2 h-4 w-4" /> <Text pt="Meu Perfil" en="My Profile" es="Mi Perfil" />
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer text-rose-600 focus:text-rose-700">
                                    <ShoppingBag className="mr-2 h-4 w-4" /> <Text pt={isPremium ? "Assinatura" : "Virar Premium"} en={isPremium ? "Subscription" : "Go Premium"} es={isPremium ? "Suscripción" : "Hazte Premium"} />
                                </DropdownMenuItem>

                                {/* NOVO ITEM: Configurações de Acessibilidade/Aparência */}
                                <SettingsMenu isMenuItem={true} />

                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" /> <Text pt="Sair" en="Logout" es="Salir" />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button size="sm" onClick={() => router.push("/login")} className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-6 shadow-md shadow-rose-200">
                            <Text pt="Entrar" en="Login" es="Entrar" />
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}