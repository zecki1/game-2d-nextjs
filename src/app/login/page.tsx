"use client";

import { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Text } from "@/components/providers/preferences-provider";
import { useRouter } from "next/navigation";
import { Dice5, ShieldCheck } from "lucide-react"; 
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
    const router = useRouter();
    const [isRegistering, setIsRegistering] = useState(false); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            router.push("/");
        } catch (error) {
            console.error("Erro no login Google", error);
            setError("Erro ao conectar com Google.");
        }
    };

    const handleEmailAuth = async () => {
        setLoading(true);
        setError("");
        try {
            if (isRegistering) {
               
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
              
                await signInWithEmailAndPassword(auth, email, password);
            }
            router.push("/");
        } catch (err) { 
            console.error(err);

           
            if (typeof err === 'object' && err !== null && 'code' in err) {
                const firebaseError = err as { code: string };
                if (firebaseError.code === 'auth/invalid-credential') setError("Senha ou email incorretos.");
                else if (firebaseError.code === 'auth/email-already-in-use') setError("Este email já está cadastrado.");
                else if (firebaseError.code === 'auth/weak-password') setError("A senha deve ter pelo menos 6 caracteres.");
                else setError("Ocorreu um erro. Tente novamente.");
            } else {
                setError("Ocorreu um erro desconhecido. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <Card className="w-full max-w-md border-rose-100 dark:border-slate-800 shadow-2xl animate-in fade-in zoom-in duration-500">
                <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-rose-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg rotate-3 transform hover:rotate-0 transition-all duration-300">
                        <Dice5 className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">
                        Love<span className="text-rose-600">Dice</span>
                    </CardTitle>
                    <CardDescription>
                        {isRegistering ? (
                            <Text pt="Crie sua conta para começar a jogar." en="Create account to start playing." es="Crea tu cuenta para jugar." />
                        ) : (
                            <Text pt="Entre para jogar e salvar seu histórico." en="Login to play and save history." es="Inicia sesión para jugar." />
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">

                    {/* Botões Sociais */}
                    <div className="grid gap-2">
                        <Button variant="outline" className="w-full h-12 text-base gap-2 hover:bg-slate-50 dark:hover:bg-slate-800" onClick={handleGoogleLogin}>
                            <FcGoogle className="w-5 h-5" />
                            <Text pt="Continuar com Google" en="Continue with Google" es="Continuar con Google" />
                        </Button>
                        {/* Microsoft Button - Placeholder visual até configurar Azure */}
                        <Button variant="outline" disabled className="w-full h-12 text-base gap-2 opacity-60">
                            <span className="text-blue-500 font-bold text-lg">❖</span>
                            <Text pt="Microsoft (Em breve)" en="Microsoft (Soon)" es="Microsoft (Pronto)" />
                        </Button>
                    </div>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground"><Text pt="Ou use email" en="Or use email" es="O usar email" /></span></div>
                    </div>

                    {/* Formulário de Email */}
                    <div className="space-y-3">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="h-12"
                        />
                        <Input
                            type="password"
                            placeholder={isRegistering ? "Crie uma senha" : "Sua senha"}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="h-12"
                        />
                        {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                    </div>

                    <Button className="w-full h-12 bg-rose-600 hover:bg-rose-700 font-bold text-lg shadow-md" onClick={handleEmailAuth} disabled={loading}>
                        {loading ? "..." : isRegistering ? <Text pt="CRIAR CONTA" en="SIGN UP" es="REGISTRARSE" /> : <Text pt="ENTRAR" en="LOGIN" es="ENTRAR" />}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-2">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                        <Text pt="Ambiente Seguro +18" en="Secure Environment 18+" es="Entorno Seguro +18" />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t p-4 bg-muted/20">
                    <Button variant="link" onClick={() => setIsRegistering(!isRegistering)} className="text-rose-600">
                        {isRegistering ? (
                            <Text pt="Já tem conta? Faça Login" en="Have an account? Login" es="¿Ya tienes cuenta? Entrar" />
                        ) : (
                            <Text pt="Não tem conta? Cadastre-se" en="No account? Sign up" es="¿Sin cuenta? Regístrate" />
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}