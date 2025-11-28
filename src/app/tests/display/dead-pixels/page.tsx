"use client";

import { useState, useEffect, useCallback } from "react";
import { MdFullscreen, MdArrowForward, MdClose } from "react-icons/md";
import { useLanguage } from "@/providers/Providers";

export default function DeadPixelTest() {
    const { t } = useLanguage();
    const [isActive, setIsActive] = useState(false);
    const [colorIndex, setColorIndex] = useState(0);

    const colors = [
        "#ffffff", // White
        "#000000", // Black
        "#ff0000", // Red
        "#00ff00", // Green
        "#0000ff", // Blue
    ];

    const nextColor = useCallback(() => {
        setColorIndex((prev) => (prev + 1) % colors.length);
    }, [colors.length]);

    const startTest = () => {
        setIsActive(true);
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((e) => {
                console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`);
            });
        }
    };

    const exitTest = useCallback(() => {
        setIsActive(false);
        if (document.exitFullscreen && document.fullscreenElement) {
            document.exitFullscreen();
        }
    }, []);

    useEffect(() => {
        if (isActive) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isActive) return;

            if (e.key === "Escape") {
                exitTest();
            } else if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
                nextColor();
            } else if (e.key === "ArrowLeft") {
                setColorIndex((prev) => (prev - 1 + colors.length) % colors.length);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isActive, exitTest, nextColor, colors.length]);

    if (isActive) {
        return (
            <div
                className="fixed inset-0 z-50 cursor-none"
                style={{ backgroundColor: colors[colorIndex] }}
                onClick={nextColor}
                onContextMenu={(e) => {
                    e.preventDefault();
                    exitTest();
                }}
            >
                <div className="absolute top-4 right-4 opacity-0 hover:opacity-100 transition-opacity cursor-default">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            exitTest();
                        }}
                        className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                    >
                        <MdClose size={24} />
                    </button>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-sm bg-black/20 px-4 py-2 rounded-full pointer-events-none select-none">
                    Click to change color • Right click or Esc to exit
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl p-8">
            {/* Header */}
            <header className="flex items-center justify-between pb-6 border-b border-slate-200/10">
                <div>
                    <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                        {t.deadPixels.title}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mt-1">
                        {t.deadPixels.subtitle}
                    </p>
                </div>
            </header>

            {/* Content */}
            <div className="mt-12 flex flex-col items-center justify-center gap-8 text-center">
                <div className="max-w-xl text-slate-600 dark:text-slate-300">
                    <p className="mb-4">
                        {t.deadPixels.instruction}
                    </p>
                    <p>
                        {t.deadPixels.lookClosely}
                    </p>
                </div>

                <button
                    onClick={startTest}
                    className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl text-lg font-bold hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg shadow-primary/20"
                >
                    <MdFullscreen size={24} />
                    {t.deadPixels.startTest}
                    <MdArrowForward size={24} />
                </button>

                <div className="grid grid-cols-5 gap-2 mt-8 opacity-50">
                    {colors.map((c, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700" style={{ backgroundColor: c }}></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
