"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dice5, Heart, Users, User, ArrowRight, Beer, Timer, Drama, ChevronLeft, LogOut } from "lucide-react";
import { Text } from "@/components/providers/preferences-provider";
import { useAuth } from "@/components/providers/auth-provider";

import IntimacyGame from "@/components/game/IntimacyGame";
import KamaSutraGame from "@/components/game/KamaSutraGame";
import NeverHaveIEver from "@/components/game/NeverHaveIEver";
import ForeplayRoulette from "@/components/game/ForeplayRoulette";
import RoleplayGenerator from "@/components/game/RoleplayGenerator";
import { GameShell } from "@/components/game/GameShell";

export default function Home() {
  const { user, logout } = useAuth();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [playersMode, setPlayersMode] = useState<"2" | "4" | "grupo">("2");

  // Removido: const isPremium = false; // Corrigindo o warning de unused-vars

  // --- MODO DE JOGO ATIVO ---
  if (selectedGame) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 flex flex-col items-center">
        <div className="w-full max-w-4xl mb-6 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedGame(null)} className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            <Text pt="Voltar" en="Back" es="Volver" />
          </Button>

          <Badge variant="outline" className="px-3 py-1 gap-2">
            <Text pt="Modo:" en="Mode:" es="Modo:" />
            {playersMode === "2" ? (
              <Text pt="Casal (2)" en="Couple (2)" es="Pareja (2)" />
            ) : (
              <Text pt="Grupo (4+)" en="Group (4+)" es="Grupo (4+)" />
            )}
          </Badge>
        </div>

        <GameShell gameId={selectedGame}>
          {selectedGame === "dice" && <IntimacyGame />}
          {selectedGame === "kama" && <KamaSutraGame playersMode={playersMode} />}
          {selectedGame === "never" && <NeverHaveIEver />}
          {selectedGame === "roulette" && <ForeplayRoulette />}
          {selectedGame === "roleplay" && <RoleplayGenerator />}
        </GameShell>
      </div>
    );
  }

  // --- TELA INICIAL: DASHBOARD ---
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 py-16">

      <div className="absolute top-20 right-4 md:right-10 flex items-center gap-2">
        <span className="text-xs text-muted-foreground hidden sm:inline-block">
          <Text pt="Olá," en="Hello," es="Hola," /> {user?.displayName || user?.email?.split('@')[0]}
        </span>
        <Button variant="ghost" size="icon" onClick={logout} title="Sair">
          <LogOut className="w-4 h-4 text-rose-500" />
        </Button>
      </div>

      <div className="text-center mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
          <Text pt="Escolha sua" en="Choose your" es="Elige tu" />{" "}
          <span className="text-rose-600">
            <Text pt="Experiência" en="Experience" es="Experiencia" />
          </span>
        </h1>
        <p className="text-muted-foreground text-lg">
          <Text
            pt="Selecione o modo de jogo e quem vai participar."
            en="Select the game mode and who will participate."
            es="Selecciona el modo de juego y quién participará."
          />
        </p>
      </div>

      {/* Seletor de Jogadores */}
      <div className="bg-white dark:bg-slate-900 p-1 rounded-full border shadow-sm mb-12 animate-in fade-in zoom-in duration-500 delay-100">
        <Tabs defaultValue="2" onValueChange={(v) => setPlayersMode(v as "2" | "4" | "grupo")}>
          <TabsList className="grid w-[300px] grid-cols-2">
            <TabsTrigger value="2" className="gap-2">
              <User className="w-4 h-4" /> <Text pt="A Dois" en="Couples" es="Pareja" />
            </TabsTrigger>
            <TabsTrigger value="4" className="gap-2">
              <Users className="w-4 h-4" /> <Text pt="Grupo" en="Group" es="Grupo" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Grid de Jogos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4 pb-20">

        {/* 1. Dado do Amor */}
        <Card
          className="cursor-pointer hover:border-rose-500 hover:shadow-lg transition-all group animate-in fade-in slide-in-from-bottom-8 duration-500 delay-100"
          onClick={() => setSelectedGame("dice")}
        >
          <CardHeader>
            <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-lg flex items-center justify-center mb-4 text-rose-600 group-hover:scale-110 transition-transform">
              <Dice5 className="w-7 h-7" />
            </div>
            <CardTitle><Text pt="Dado do Amor" en="Love Dice" es="Dado del Amor" /></CardTitle>
            <CardDescription>
              <Text
                pt="Ações aleatórias para esquentar o clima. Beijos, toques e desafios."
                en="Random actions to heat up the mood. Kisses, touches, and challenges."
                es="Acciones aleatorias para calentar el ambiente. Besos, toques y desafíos."
              />
            </CardDescription>
          </CardHeader>
          <CardFooter className="text-rose-600 font-semibold text-sm group-hover:underline">
            <Text pt="Jogar Agora" en="Play Now" es="Jugar Ahora" /> <ArrowRight className="w-4 h-4 ml-2" />
          </CardFooter>
        </Card>

        {/* 2. Kama Sutra */}
        <Card
          className="cursor-pointer hover:border-purple-500 hover:shadow-lg transition-all group animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200"
          onClick={() => setSelectedGame("kama")}
        >
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 text-purple-600 group-hover:scale-110 transition-transform">
              <Heart className="w-7 h-7" />
            </div>
            <CardTitle><Text pt="Kama Sutra Cards" en="Kama Sutra Cards" es="Cartas Kama Sutra" /></CardTitle>
            <CardDescription>
              <Text
                pt="Descubra novas posições com ilustrações e dicas de execução."
                en="Discover new positions with illustrations and execution tips."
                es="Descubre nuevas posiciones con ilustraciones y consejos de ejecución."
              />
            </CardDescription>
          </CardHeader>
          <CardFooter className="text-purple-600 font-semibold text-sm group-hover:underline">
            <Text pt="Sortear Posição" en="Draw Position" es="Sortear Posición" /> <ArrowRight className="w-4 h-4 ml-2" />
          </CardFooter>
        </Card>

        {/* 3. Eu Nunca */}
        <Card
          className="cursor-pointer hover:border-green-500 hover:shadow-lg transition-all group animate-in fade-in slide-in-from-bottom-8 duration-500 delay-300"
          onClick={() => setSelectedGame("never")}
        >
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 text-green-600 group-hover:scale-110 transition-transform">
              <Beer className="w-7 h-7" />
            </div>
            <CardTitle><Text pt="Eu Nunca" en="Never Have I Ever" es="Yo Nunca" /></CardTitle>
            <CardDescription>
              <Text
                pt="Perguntas picantes. Quem já fez, bebe ou tira uma peça de roupa!"
                en="Spicy questions. If you did it, drink or remove a clothing item!"
                es="Preguntas picantes. ¡Quien lo hizo, bebe o quítate una prenda!"
              />
            </CardDescription>
          </CardHeader>
          <CardFooter className="text-green-600 font-semibold text-sm group-hover:underline">
            <Text pt="Começar" en="Start" es="Empezar" /> <ArrowRight className="w-4 h-4 ml-2" />
          </CardFooter>
        </Card>

        {/* 4. Roleta Preliminar */}
        <Card
          className="cursor-pointer hover:border-orange-500 hover:shadow-lg transition-all group animate-in fade-in slide-in-from-bottom-8 duration-500 delay-400"
          onClick={() => setSelectedGame("roulette")}
        >
          <CardHeader>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4 text-orange-600 group-hover:scale-110 transition-transform">
              <Timer className="w-7 h-7" />
            </div>
            <CardTitle><Text pt="Roleta Preliminar" en="Foreplay Roulette" es="Ruleta Preliminar" /></CardTitle>
            <CardDescription>
              <Text
                pt="Gire para combinar: Ação + Parte do Corpo + Tempo."
                en="Spin to combine: Action + Body Part + Time."
                es="Gira para combinar: Acción + Parte del Cuerpo + Tiempo."
              />
            </CardDescription>
          </CardHeader>
          <CardFooter className="text-orange-600 font-semibold text-sm group-hover:underline">
            <Text pt="Girar Roleta" en="Spin Roulette" es="Girar Ruleta" /> <ArrowRight className="w-4 h-4 ml-2" />
          </CardFooter>
        </Card>

        {/* 5. Roleplay Generator */}
        <Card
          className="cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all group animate-in fade-in slide-in-from-bottom-8 duration-500 delay-500"
          onClick={() => setSelectedGame("roleplay")}
        >
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
              <Drama className="w-7 h-7" />
            </div>
            <CardTitle><Text pt="Gerador de Fantasia" en="Fantasy Generator" es="Generador de Fantasía" /></CardTitle>
            <CardDescription>
              <Text
                pt="Crie cenários e personagens aleatórios para atuar com seu par."
                en="Create random scenarios and characters to act out with your partner."
                es="Crea escenarios y personajes aleatorios para actuar con tu pareja."
              />
            </CardDescription>
          </CardHeader>
          <CardFooter className="text-blue-600 font-semibold text-sm group-hover:underline">
            <Text pt="Criar Cena" en="Create Scene" es="Crear Escena" /> <ArrowRight className="w-4 h-4 ml-2" />
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}

