"use client";

import { usePreferences } from "@/components/providers/preferences-provider";
import { Button } from "@/components/ui/button";

const LANGUAGES = [
    { code: "pt", label: "PT" },
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
] as const;

export function LanguageSwitcher() {
    const { language, setLanguage } = usePreferences();

    const toggleLanguage = () => {
        const currentIndex = LANGUAGES.findIndex(l => l.code === language);
        const nextIndex = (currentIndex + 1) % LANGUAGES.length;
        setLanguage(LANGUAGES[nextIndex].code);
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="w-12 h-9 px-0 font-bold border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 transition-all"
        >
            <span className="text-xs uppercase">{language}</span>
        </Button>
    );
}