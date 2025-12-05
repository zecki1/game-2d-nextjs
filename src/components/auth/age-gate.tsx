"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/providers/preferences-provider";
import { ShieldAlert } from "lucide-react";

export function AgeGate() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {

        const timer = setTimeout(() => {
            const verified = localStorage.getItem("age-verified");
            if (!verified) {
                setIsOpen(true);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleAccept = () => {
        localStorage.setItem("age-verified", "true");
        setIsOpen(false);
    };

    const handleReject = () => {
        window.location.href = "https://www.google.com";
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => { }}>
            <DialogContent className="sm:max-w-md border-rose-200" showCloseButton={false}>
                <DialogHeader>
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
                        <ShieldAlert className="w-8 h-8" />
                    </div>
                    <DialogTitle className="text-center text-xl font-bold text-rose-700">
                        <Text pt="Conteúdo +18" en="18+ Content" es="Contenido +18" />
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        <Text
                            pt="Este site contém material adulto. Você confirma que tem 18 anos ou mais?"
                            en="This site contains adult material. Do you confirm you are 18 or older?"
                            es="Este sitio contiene material para adultos. ¿Confirmas que tienes 18 años o más?"
                        />
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col gap-2 sm:flex-col sm:space-x-0">
                    <Button onClick={handleAccept} className="w-full bg-rose-600 hover:bg-rose-700 font-bold h-12 text-lg">
                        <Text pt="SIM, SOU MAIOR DE 18" en="YES, I AM 18+" es="SÍ, SOY MAYOR DE 18" />
                    </Button>
                    <Button variant="ghost" onClick={handleReject} className="w-full">
                        <Text pt="Não, sair do site" en="No, leave site" es="No, salir del sitio" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}