"use client";

import { useState, useEffect } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { useLanguage } from "@/providers/Providers";

export default function BrightnessTest() {
    const [brightness, setBrightness] = useState(75);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const { t, locale } = useLanguage();

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    return (
        <div className="mx-auto max-w-4xl p-8">
            {/* Custom Fullscreen Notification - Much More Visible! */}
            {isFullscreen && (
                <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
                    <div className="bg-gradient-to-r from-primary via-blue-600 to-primary text-white px-6 py-4 shadow-2xl border-b-4 border-white/30 animate-pulse">
                        <div className="flex items-center justify-center gap-3 text-center">
                            <MdFullscreenExit className="text-2xl animate-bounce" />
                            <div>
                                <p className="font-bold text-lg">
                                    {locale === "vi"
                                        ? "Để thoát khỏi chế độ toàn màn hình, bấm"
                                        : "To exit fullscreen mode, press"}
                                </p>
                                <div className="flex items-center justify-center gap-2 mt-1">
                                    <kbd className="px-3 py-1 bg-white/20 rounded border-2 border-white/40 font-mono text-sm font-bold">
                                        ESC
                                    </kbd>
                                    <span className="text-sm opacity-90">
                                        {locale === "vi" ? "hoặc" : "or"}
                                    </span>
                                    <kbd className="px-3 py-1 bg-white/20 rounded border-2 border-white/40 font-mono text-sm font-bold">
                                        F11
                                    </kbd>
                                </div>
                            </div>
                            <MdFullscreenExit className="text-2xl animate-bounce" />
                        </div>
                    </div>
                </div>
            )}

            {/* Full-screen Brightness Overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-100 bg-black"
                style={{ opacity: 1 - brightness / 100 }}
            ></div>

            {/* Header */}
            <header className="flex items-center justify-between pb-6 border-b border-slate-200/10">
                <div>
                    <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                        {t.brightness.title}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mt-1">
                        {t.brightness.subtitle}
                    </p>
                </div>
                <button
                    onClick={toggleFullScreen}
                    className="flex items-center gap-2 min-w-[84px] cursor-pointer justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90"
                >
                    {isFullscreen ? <MdFullscreenExit className="text-xl" /> : <MdFullscreen className="text-xl" />}
                    <span className="truncate">{t.brightness.enterFullScreen}</span>
                </button>
            </header>

            {/* Test Canvas & Controls */}
            <div className="flex flex-col lg:flex-row gap-8 mt-8">
                {/* Canvas Preview */}
                <div className="flex-1 flex items-center justify-center rounded-xl bg-slate-900 p-4 aspect-[16/9] overflow-hidden relative border border-slate-700">
                    <div className="text-center">
                        <p className="text-white mb-2">{t.common.preview}</p>
                        <div className="w-32 h-32 bg-white rounded-full mx-auto" style={{ opacity: brightness / 100 }}></div>
                    </div>
                </div>

                {/* Controls */}
                <div className="w-full lg:w-72 flex flex-col gap-6">
                    {/* Brightness Slider */}
                    <div className="w-full rounded-xl border border-slate-200/10 bg-background-light p-4 dark:bg-background-dark/50 relative z-[60]">
                        <div className="flex w-full shrink-0 items-center justify-between">
                            <p className="text-slate-900 dark:text-white text-base font-medium leading-normal">
                                {t.brightness.brightnessLevel}
                            </p>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                                {brightness}%
                            </p>
                        </div>
                        <div className="flex h-4 w-full items-center gap-4 mt-3">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={brightness}
                                onChange={(e) => setBrightness(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            {t.brightness.note}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
