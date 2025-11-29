"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useLanguage } from "@/providers/Providers";
import { motion, AnimatePresence } from "framer-motion";

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
        <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
            title={t.common.theme}
            aria-label={t.common.theme}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
        >
            <AnimatePresence mode="wait">
                {theme === "dark" ? (
                    <motion.div
                        key="dark"
                        initial={{ rotate: 180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -180, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <MdDarkMode className="text-xl" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="light"
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 180, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <MdLightMode className="text-xl" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
