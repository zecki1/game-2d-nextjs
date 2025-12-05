"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useReward } from 'react-rewards';
import { motion } from "framer-motion";

// Ícones
import {
  Heart, Flame, Sparkles, HelpCircle, BookOpen, Gift, Play
} from "lucide-react";

import { FaWhatsapp, FaInstagram } from "react-icons/fa";

// Componentes UI (Seu template)
import { Text } from "@/components/providers/preferences-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// NOSSO COMPONENTE NOVO
import IntimacyGame from "@/components/game/IntimacyGame";

export default function Home() {
  const { reward: confettiReward } = useReward('confettiReward', 'confetti');

  return (
    <div className="flex flex-col w-full bg-slate-50 dark:bg-slate-950">

      {/* =========================================
          BLOCK 1: HERO SECTION (Sensual & Clean)
      ========================================= */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-rose-300/20 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div data-aos="fade-down">
            <Badge variant="outline" className="mb-6 py-1.5 px-4 text-sm border-rose-200 text-rose-600 bg-rose-50 rounded-full">
              <span className="mr-2">🔥</span>
              <Text pt="Intimidade & Conexão" en="Intimacy & Connection" es="Intimidad y Conexión" />
            </Badge>
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-slate-100 max-w-4xl mx-auto" data-aos="zoom-in" data-aos-delay="200">
            <Text
              pt="Transforme sua Rotina em Paixão."
              en="Turn Routine into Passion."
              es="Convierte la Rutina en Pasión."
            />
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed" data-aos="fade-up" data-aos-delay="400">
            <Text
              pt="Jogos interativos, dicas de bem-estar sexual e produtos selecionados para reacender a chama. Tudo leve, seguro e divertido."
              en="Interactive games, sexual wellness tips, and curated products to reignite the flame. Light, safe, and fun."
              es="Juegos interactivos, consejos de bienestar sexual y productos seleccionados para reavivar la llama."
            />
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-aos="fade-up" data-aos-delay="600">
            <Button
              size="lg"
              className="h-14 px-8 text-lg rounded-full w-full sm:w-auto shadow-xl shadow-rose-500/20 bg-rose-600 hover:bg-rose-700 transition-all"
              onClick={() => {
                document.getElementById('game-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Play className="mr-2 h-5 w-5 fill-current" />
              <Text pt="Começar a Jogar" en="Start Playing" es="Empezar a Jugar" />
            </Button>

            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-slate-300 w-full sm:w-auto">
              <BookOpen className="mr-2 h-5 w-5" />
              Guia de Cosméticos
            </Button>
          </div>
        </div>
      </section>

      {/* =========================================
          BLOCK 2: THE GAME (Core Feature)
      ========================================= */}
      <section id="game-section" className="py-16 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-rose-600 mb-2">Dado do Amor</h2>
            <p className="text-muted-foreground">Gire o dado para descobrir sua próxima aventura. Sem regras, apenas diversão.</p>
          </div>

          {/* INSERÇÃO DO COMPONENTE DO DADO */}
          <div data-aos="zoom-in">
            <IntimacyGame />
          </div>
        </div>
      </section>

      {/* =========================================
          BLOCK 3: EDUCATION & PRODUCTS
      ========================================= */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-start">

            {/* Lado Esquerdo: Info */}
            <div className="md:w-1/2" data-aos="fade-right">
              <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
                <Text pt="Guia Sensorial Gall" en="Gall Sensory Guide" es="Guía Sensorial Gall" />
              </h2>
              <p className="text-slate-600 mb-8">
                Muitas vezes queremos inovar, mas não sabemos por onde começar.
                Entenda a diferença entre os cosméticos e como eles funcionam.
              </p>

              <Accordion type="single" collapsible className="w-full bg-white dark:bg-slate-900 rounded-xl border px-4 shadow-sm">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-semibold text-rose-600">
                    O que são Géis Excitantes?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    São géis que provocam sensações físicas na pele, como <strong>aquecimento (Hot)</strong> ou <strong>resfriamento (Ice)</strong>.
                    Eles aumentam a circulação sanguínea no local, deixando a área muito mais sensível ao toque e ao sopro.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-semibold text-purple-600">
                    Óleos de Massagem Beijáveis
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    Diferente dos óleos comuns, os "beijáveis" são feitos para serem provados.
                    Eles não deixam gosto amargo e permitem que a massagem evolua para carícias orais sem precisar lavar a pele.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b-0">
                  <AccordionTrigger className="text-lg font-semibold text-orange-600">
                    Velas de Massagem
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    Não queimam a pele! A cera derrete a uma temperatura morna e confortável, transformando-se em um óleo hidratante
                    e aromático. Ideal para dias frios e massagens relaxantes.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Lado Direito: Cards de Categoria */}
            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4" data-aos="fade-left">
              <Card className="hover:shadow-lg transition-shadow border-none bg-gradient-to-br from-pink-50 to-rose-50">
                <CardHeader>
                  <Flame className="w-8 h-8 text-rose-500 mb-2" />
                  <CardTitle className="text-rose-700">Para Esquentar</CardTitle>
                  <CardDescription>Géis Hot e Velas</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-lg transition-shadow border-none bg-gradient-to-br from-teal-50 to-emerald-50">
                <CardHeader>
                  <Sparkles className="w-8 h-8 text-teal-500 mb-2" />
                  <CardTitle className="text-teal-700">Para Relaxar</CardTitle>
                  <CardDescription>Óleos Essenciais</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-lg transition-shadow border-none bg-gradient-to-br from-purple-50 to-indigo-50">
                <CardHeader>
                  <Gift className="w-8 h-8 text-purple-500 mb-2" />
                  <CardTitle className="text-purple-700">Kits Prontos</CardTitle>
                  <CardDescription>Caixas Surpresa</CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-lg transition-shadow border-none bg-gradient-to-br from-yellow-50 to-orange-50">
                <CardHeader>
                  <HelpCircle className="w-8 h-8 text-orange-500 mb-2" />
                  <CardTitle className="text-orange-700">Jogos</CardTitle>
                  <CardDescription>Cartas e Dados</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          BLOCK 4: CTA FINAL
      ========================================= */}
      <section className="py-24 container mx-auto px-4">
        <div className="bg-gradient-to-r from-rose-600 to-purple-700 text-white rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl" data-aos="zoom-in-up">
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse delay-700"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Quer ver mais produtos?
            </h2>
            <p className="text-rose-100 text-lg">
              Acesse a loja completa da Gall para encontrar lubrificantes, acessórios e cosméticos de alta qualidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="secondary" size="lg" className="rounded-full px-8 font-semibold shadow-lg hover:shadow-xl transition-all text-rose-600">
                Ir para Gall.com.br
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Simples
      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>© 2025 Love Dice. Diversão para maiores de 18 anos.</p>
        <div className="flex justify-center gap-4 mt-4 text-xl">
          <FaInstagram className="hover:text-rose-500 cursor-pointer transition-colors" />
          <FaWhatsapp className="hover:text-green-500 cursor-pointer transition-colors" />
        </div>
      </footer> */}

    </div>
  );
}