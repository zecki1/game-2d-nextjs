"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { useGame } from "@/components/providers/game-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/providers/preferences-provider";
import { Crown, CreditCard, Camera, LogOut, Save, Loader2, ExternalLink, CheckCircle, XCircle, Search } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { sanitizeData } from "@/lib/utils";

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const { isPremium } = useGame();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const router = useRouter(); 
    const searchParams = useSearchParams();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);
    const [cepLoading, setCepLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [formData, setFormData] = useState({
        name: "", age: "", cep: "", street: "", neighborhood: "", city: "", state: "",
    });
    const [photoPreview, setPhotoPreview] = useState("");

    useEffect(() => {
        const paymentStatus = searchParams.get("payment");
        if (paymentStatus === "success") {
            setShowSuccessModal(true);
            window.history.replaceState(null, '', '/profile');
        } else if (paymentStatus === "canceled") {
            setShowErrorModal(true);
            window.history.replaceState(null, '', '/profile');
        }
    }, [searchParams]);

    useEffect(() => {
        if (user) {
            setPhotoPreview(user.photoURL || "");
            setFormData(prev => ({ ...prev, name: user.displayName || "" }));

            const loadData = async () => {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const d = docSnap.data();
                        setFormData({
                            name: (d.name as string) || user.displayName || "",
                            age: (d.age as string) || "",
                            cep: (d.cep as string) || "",
                            street: (d.logradouro as string) || "", 
                            neighborhood: (d.bairro as string) || "",
                            city: (d.localidade as string) || "", 
                            state: (d.uf as string) || "" 
                        });
                    }
                } catch (error) {
                    console.error("Erro ao carregar perfil", error);
                }
            };
            loadData();
        }
    }, [user]);

    const handleCepSearch = async () => {
        const cep = formData.cep?.replace(/\D/g, '') || "";
        if (cep.length !== 8) return toast.error("CEP inválido");

        setCepLoading(true);
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await res.json();
            if (!data.erro) {
                setFormData(prev => ({
                    ...prev,
                    street: data.logradouro || "",
                    neighborhood: data.bairro || "",
                    city: data.localidade || "",
                    state: data.uf || ""
                }));
                toast.success("Endereço encontrado!");
            } else toast.error("CEP não encontrado");
        } catch { toast.error("Erro no ViaCEP"); }
        finally { setCepLoading(false); }
    };

    const handleSave = async () => {
        if (!user) return;
        setLoading(true);

        const cleanData = sanitizeData(formData);

        try {
            await setDoc(doc(db, "users", user.uid), {
                ...cleanData,
                email: user.email,
                updatedAt: new Date().toISOString()
            }, { merge: true });
            toast.success("Perfil salvo com sucesso!");
        } catch (error) { 
            console.error(error);
            
            if (error instanceof Error) {
                toast.error(`Erro: ${error.message}`);
            } else {
                toast.error("Ocorreu um erro ao salvar o perfil.");
            }
        }
        finally { setLoading(false); }
    };

    const handleSubscribe = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user?.uid, email: user?.email }),
            });
            const data = await response.json();
            if (data.url) window.location.href = data.url;
            else toast.error("Erro ao iniciar checkout");
        } catch { toast.error("Erro de conexão."); }
        finally { setLoading(false); }
    };

    const handleManage = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/stripe/portal', {
                method: 'POST',
                body: JSON.stringify({ userId: user?.uid })
            });
            const data = await res.json();
            if (data.url) window.location.href = data.url;
            else toast.error("Erro ao abrir portal");
        } catch { toast.error("Erro de conexão."); }
        finally { setLoading(false); }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-10 px-4">
            <div className="max-w-xl mx-auto space-y-6">

                <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                    <DialogContent className="sm:max-w-md text-center border-green-200 bg-green-50/90 backdrop-blur">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2 animate-in zoom-in">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <DialogTitle className="text-green-800 text-xl"><Text pt="Pagamento Confirmado!" en="Success!" es="¡Éxito!" /></DialogTitle>
                        <DialogDescription className="text-green-700">
                            <Text pt="Sua conta agora é Premium. Aproveite jogos ilimitados!" en="You are now Premium." es="Ahora eres Premium." />
                        </DialogDescription>
                        <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white" onClick={() => setShowSuccessModal(false)}>
                            <Text pt="Começar a Jogar" en="Start Playing" es="Empezar a Jugar" />
                        </Button>
                    </DialogContent>
                </Dialog>

                <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
                    <DialogContent className="sm:max-w-md text-center">
                        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-2">
                            <XCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <DialogTitle><Text pt="Pagamento Cancelado" en="Cancelled" es="Cancelado" /></DialogTitle>
                        <Button variant="ghost" onClick={() => setShowErrorModal(false)}>Fechar</Button>
                    </DialogContent>
                </Dialog>

                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                    <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                            <AvatarImage src={photoPreview} />
                            <AvatarFallback className="text-4xl bg-slate-200">{user.email?.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="text-white w-8 h-8" />
                        </div>
                        {isPremium && (
                            <div className="absolute bottom-0 right-0 bg-yellow-400 text-yellow-900 text-xs px-3 py-1 rounded-full border-2 border-white font-bold flex items-center gap-1 shadow-sm">
                                <Crown className="w-3 h-3" /> PRO
                            </div>
                        )}
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
                    </div>
                    <h2 className="mt-4 text-2xl font-bold">{formData.name || user.displayName || "Usuário"}</h2>
                    <p className="text-slate-500">{user.email}</p>
                </div>

                <Card className={`border-2 shadow-sm ${isPremium ? 'border-green-200 bg-green-50/50' : 'border-rose-200 bg-rose-50/50'}`}>
                    <CardContent className="pt-6 flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                {isPremium ? <span className="text-green-700">Assinante Premium</span> : <span className="text-rose-700">Plano Gratuito</span>}
                            </h3>
                            <p className="text-xs opacity-80 mt-1">
                                {isPremium ? "Jogadas Ilimitadas ✨" : "3 Jogadas por dia"}
                            </p>
                        </div>
                        {!isPremium ? (
                            <Button onClick={handleSubscribe} disabled={loading} className="bg-rose-600 hover:bg-rose-700 text-white shadow-md rounded-full px-6">
                                {loading ? <Loader2 className="animate-spin" /> : "Virar PRO"}
                            </Button>
                        ) : (
                            <Button variant="outline" onClick={handleManage} className="border-green-600 text-green-700 hover:bg-green-100 rounded-full" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Gerenciar"}
                            </Button>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle><Text pt="Seus Dados" en="Your Data" es="Tus Datos" /></CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Nome</Label>
                            <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Seu nome" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1 space-y-2">
                                <Label>Idade</Label>
                                <Input type="number" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} />
                            </div>
                            <div className="col-span-2 space-y-2">
                                <Label>CEP</Label>
                                <div className="flex gap-2">
                                    <Input value={formData.cep} onChange={e => setFormData({ ...formData, cep: e.target.value })} maxLength={9} />
                                    <Button size="icon" variant="outline" onClick={handleCepSearch} disabled={cepLoading}>
                                        {cepLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 space-y-2">
                                <Label>Endereço</Label>
                                <Input value={formData.street} onChange={e => setFormData({ ...formData, street: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Bairro</Label>
                                <Input value={formData.neighborhood} onChange={e => setFormData({ ...formData, neighborhood: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Cidade / UF</Label>
                                <Input value={formData.city ? `${formData.city} - ${formData.state}` : ""} readOnly className="bg-slate-50" />
                            </div>
                        </div>
                        <div className="pt-4 border-t mt-4">
                            <h4 className="font-bold text-sm mb-2 flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                <CreditCard className="w-4 h-4" /> Pagamento Seguro
                            </h4>
                            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                                Processado via Stripe. Não armazenamos cartão.
                            </p>
                            {isPremium && (
                                <Button variant="ghost" className="w-full text-xs h-8 text-rose-600 hover:text-rose-700 justify-start px-0" onClick={handleManage}>
                                    <ExternalLink className="w-3 h-3 mr-2" /> Gerenciar Plano
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex gap-3 pt-4">
                    <Button className="flex-1 bg-slate-900 text-white hover:bg-slate-800 h-12 text-lg shadow-lg" onClick={handleSave} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Save className="w-5 h-5 mr-2" /> Salvar Perfil</>}
                    </Button>
                    <Button variant="outline" size="icon" className="h-12 w-12 border-red-200 text-red-500 hover:bg-red-50" onClick={logout} title="Sair">
                        <LogOut className="w-5 h-5" />
                    </Button>
                </div>

            </div>
        </div>
    );
}