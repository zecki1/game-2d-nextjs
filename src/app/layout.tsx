import type { Metadata } from "next";
import { PreferencesProvider } from "@/components/providers/preferences-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { GameProvider } from "@/components/providers/game-provider"; 
import { VlibrasWidget } from "@/components/accessibility/vlibras-widget";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AgeGate } from "@/components/auth/age-gate";
import { AOSInit } from "@/components/providers/aos-init";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "LoveDice",
  description: "LoveDice",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <PreferencesProvider>
            <AuthProvider>
              <GameProvider> 
                <AOSInit />
                <AgeGate />
                <SiteHeader />
                <main className="flex-1 w-full max-w-[100vw]">
                  {children}
                </main>
                <SiteFooter />
                <VlibrasWidget />
              </GameProvider>
            </AuthProvider>
          </PreferencesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}