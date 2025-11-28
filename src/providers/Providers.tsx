"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { dictionary, Locale } from "@/lib/i18n";

// Language Context
type LanguageContextType = {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: typeof dictionary.en;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}

export function Providers({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>("en");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Try to load saved locale from localStorage
        const saved = localStorage.getItem("locale") as Locale;
        if (saved && (saved === "en" || saved === "vi")) {
            setLocale(saved);
        }
    }, []);

    const handleSetLocale = (newLocale: Locale) => {
        setLocale(newLocale);
        localStorage.setItem("locale", newLocale);
    };

    // Always render the providers to avoid runtime errors in children that use hooks.
    // We handle the hydration mismatch for theme by using next-themes (which handles it).
    // For language, we default to 'en' on server and hydrate to saved locale on client.

    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
            <LanguageContext.Provider
                value={{
                    locale,
                    setLocale: handleSetLocale,
                    t: dictionary[locale],
                }}
            >
                {children}
            </LanguageContext.Provider>
        </NextThemesProvider>
    );
}
