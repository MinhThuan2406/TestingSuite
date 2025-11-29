"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useLanguage } from "@/providers/Providers";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const { t } = useLanguage();
    const [mounted, setMounted] = useState(false);

    // Only render theme icon after mounting to prevent hydration errors
    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    if (!mounted) {
        return <div className="w-9 h-9 p-2" />; // Placeholder to prevent layout shift
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
            title={t.common.theme}
            aria-label={t.common.theme}
        >
            {theme === "dark" ? (
                <MdLightMode className="text-xl" />
            ) : (
                <MdDarkMode className="text-xl" />
            )}
        </button>
    );
}
