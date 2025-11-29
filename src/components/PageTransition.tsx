"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/providers/Providers";
import { useEffect, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();
    const { locale } = useLanguage();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent animation on initial mount
    if (!mounted) {
        return <>{children}</>;
    }

    // Use theme + locale as key to trigger animation on changes
    const transitionKey = `${theme}-${locale}`;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={transitionKey}
                initial={{ opacity: 0.8, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0.8, y: -10 }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
