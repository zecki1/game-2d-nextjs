import type { Metadata } from "next";
import { PreferencesProvider } from "@/components/providers/preferences-provider";
import { VlibrasWidget } from "@/components/accessibility/vlibras-widget";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AOSInit } from "@/components/providers/aos-init";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Template Robusto Next.js 15",
  description: "Template Robusto Next.js 15",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
     
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PreferencesProvider>
            <AOSInit />
            <SiteHeader />
            {/* O main cresce para empurrar o footer, mas não força scroll interno */}
            <main className="flex-1 w-full max-w-[100vw]">
              {children}
            </main>
            <SiteFooter />
            <VlibrasWidget />
          </PreferencesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}