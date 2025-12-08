"use client";

import { AffiliateProduct } from "@/data/affiliates";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/providers/preferences-provider";
export function ProductAd({ product }: { product: AffiliateProduct }) {

    if (!product) return null;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <Text pt="Patrocinado" en="Sponsored" es="Patrocinado" />
                </span>
                <Badge variant="secondary" className="text-[10px] bg-rose-100 text-rose-600 hover:bg-rose-200 dark:bg-rose-900 dark:text-rose-200 dark:hover:bg-rose-800 transition-colors">
                    <Text pt="Dica Hot" en="Hot Tip" es="Consejo Hot" />
                </Badge>
            </div>

            <Card className="bg-white border-rose-100 dark:bg-slate-800 dark:border-slate-700 overflow-hidden relative group cursor-pointer hover:shadow-md transition-all">
                <a href={product.url} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 gap-3">
                    {/* Ícone/Imagem */}
                    <div className="h-12 w-12 min-w-[3rem] rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                        {product.image}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 group-hover:text-rose-600 transition-colors truncate">
                            {product.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                            <Text
                                pt={product.description.pt}
                                en={product.description.en}
                                es={product.description.es}
                            />
                        </p>
                    </div>

                    <Button size="icon" variant="ghost" className="text-rose-500 dark:text-rose-400 shrink-0">
                        <ExternalLink className="w-4 h-4" />
                    </Button>
                </a>
            </Card>
        </div>
    );
}