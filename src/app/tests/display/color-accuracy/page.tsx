"use client";

import { useState } from "react";
import { MdFullscreen, MdClose } from "react-icons/md";
import { useLanguage } from "@/providers/Providers";

export default function ColorAccuracyTest() {
    const { t } = useLanguage();
    const [fullScreenColor, setFullScreenColor] = useState<string | null>(null);

    const colors = [
        { name: "Red", value: "#ff0000" },
        { name: "Green", value: "#00ff00" },
        { name: "Blue", value: "#0000ff" },
        { name: "White", value: "#ffffff" },
        { name: "Black", value: "#000000" },
        { name: "Cyan", value: "#00ffff" },
        { name: "Magenta", value: "#ff00ff" },
        { name: "Yellow", value: "#ffff00" },
    ];

    const gradients = [
        { name: "Grayscale", value: "linear-gradient(to right, #000000, #ffffff)" },
        {
            name: "Spectrum",
            value:
                "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
        },
    ];

    const openFullScreen = (color: string) => {
        setFullScreenColor(color);
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((e) => {
                console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`);
            });
        }
    };

    const closeFullScreen = () => {
        setFullScreenColor(null);
        if (document.exitFullscreen && document.fullscreenElement) {
            document.exitFullscreen();
        }
    };

    return (
        <div className="mx-auto max-w-4xl p-8">
            {fullScreenColor && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{ background: fullScreenColor }}
                    onClick={closeFullScreen}
                >
                    <button
                        onClick={closeFullScreen}
                        className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                        <MdClose size={32} />
                    </button>
                    <div className="pointer-events-none absolute bottom-10 text-white/50 text-sm bg-black/30 px-3 py-1 rounded-full">
                        Click anywhere or press Esc to exit
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="flex items-center justify-between pb-6 border-b border-slate-200/10">
                <div>
                    <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                        {t.colorAccuracy.title}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mt-1">
                        {t.colorAccuracy.subtitle}
                    </p>
                </div>
            </header>

            {/* Content */}
            <div className="mt-8 flex flex-col gap-8">
                {/* Solid Colors */}
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                        {t.colorAccuracy.solidColors}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {colors.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => openFullScreen(color.value)}
                                className="aspect-square rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform relative group overflow-hidden"
                                style={{ backgroundColor: color.value }}
                            >
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                                    <MdFullscreen className="text-white drop-shadow-md" size={32} />
                                </div>
                                <span className="sr-only">{color.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Gradients */}
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                        {t.colorAccuracy.gradients}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        {gradients.map((gradient) => (
                            <button
                                key={gradient.name}
                                onClick={() => openFullScreen(gradient.value)}
                                className="h-32 w-full rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:scale-[1.02] transition-transform relative group overflow-hidden"
                                style={{ background: gradient.value }}
                            >
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                                    <MdFullscreen className="text-white drop-shadow-md" size={32} />
                                </div>
                                <span className="sr-only">{gradient.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
