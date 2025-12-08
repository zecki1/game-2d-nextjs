"use client";

import { useState, useCallback } from "react";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"; // Importação padrão das funções
import { auth, googleProvider } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Text } from "@/components/providers/preferences-provider";
import { useRouter } from "next/navigation";
import { Dice5, ShieldCheck, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

// Interface para um erro que se parece com um FirebaseError
interface AuthErrorWithCode extends Error {
    code: string;
}

export default function LoginPage() {
    const router = useRouter();
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGoogleLogin = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            await signInWithPopup(auth, googleProvider);
            // O AuthProvider deve pegar o login e redirecionar para '/'
        } catch (err) {
            console.error("Erro no login Google:", err);
            const authError = err as AuthErrorWithCode;

            if (authError && authError.code) {
                if (authError.code === 'auth/popup-closed-by-user') {
                    setError("O popup de login foi fechado.");
                } else if (authError.code === 'auth/unauthorized-domain') {
                    setError("Erro de configuração. Domínio não autorizado no Firebase Console.");
                } else {
                    setError("Erro ao conectar com Google. Tente novamente.");
                }
            } else {
                setError("Ocorreu um erro desconhecido ao tentar login com Google.");
            }
        } finally {
            setLoading(false);
        }
    }, []); // Dependências vazias, pois router.push é pego pelo AuthProvider

    const handleEmailAuth = useCallback(async () => {
        if (!email || !password) {
            setError("Por favor, preencha o email e a senha.");
            return;
        }

        setLoading(true);
        setError("");
        try {
            if (isRegistering) {

                await createUserWithEmailAndPassword(auth, email, password);
            } else {

                await signInWithEmailAndPassword(auth, email, password);
            }
            // O AuthProvider deve pegar o login e redirecionar para '/'
        } catch (err) {
            console.error("Erro de autenticação:", err);

            const authError = err as AuthErrorWithCode;

            if (authError && authError.code) {
                switch (authError.code) {
                    case 'auth/invalid-credential':
                    case 'auth/wrong-password':
                    case 'auth/user-not-found':
                        setError(isRegistering ? "Email inválido ou senha fraca (mínimo 6 caracteres)." : "Senha ou email incorretos.");
                        break;
                    case 'auth/email-already-in-use':
                        setError("Este email já está cadastrado.");
                        break;
                    case 'auth/weak-password':
                        setError("A senha deve ter pelo menos 6 caracteres.");
                        break;
                    case 'auth/invalid-email':
                        setError("O formato do email é inválido.");
                        break;
                    default:
                        setError("Ocorreu um erro. Tente novamente.");
                        break;
                }
            } else {
                setError("Ocorreu um erro desconhecido. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    }, [isRegistering, email, password]);

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
                        <Button
                            variant="outline"
                            className="w-full h-12 text-base gap-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                        >
                            {loading && !isRegistering && email === "" ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <FcGoogle className="w-5 h-5" />
                            )}
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
                            disabled={loading}
                        />
                        <Input
                            type="password"
                            placeholder={isRegistering ? "Crie uma senha (mínimo 6 caracteres)" : "Sua senha"}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="h-12"
                            disabled={loading}
                        />
                        {error && <p className="text-red-500 text-sm text-center font-medium mt-2">{error}</p>}
                    </div>

                    <Button
                        className="w-full h-12 bg-rose-600 hover:bg-rose-700 font-bold text-lg shadow-md"
                        onClick={handleEmailAuth}
                        disabled={loading || !email || !password}
                    >
                        {loading && email !== "" ? (
                            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        ) : isRegistering ? (
                            <Text pt="CRIAR CONTA" en="SIGN UP" es="REGISTRARSE" />
                        ) : (
                            <Text pt="ENTRAR" en="LOGIN" es="ENTRAR" />
                        )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-2">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                        <Text pt="Ambiente Seguro +18" en="Secure Environment 18+" es="Entorno Seguro +18" />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t p-4 bg-muted/20">
                    <Button variant="link" onClick={() => { setIsRegistering(!isRegistering); setError(""); }} className="text-rose-600">
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