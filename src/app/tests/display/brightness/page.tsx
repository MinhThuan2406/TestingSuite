"use client";

import { useState } from "react";
import { MdFullscreen } from "react-icons/md";

export default function BrightnessTest() {
    const [brightness, setBrightness] = useState(75);

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
            {/* Full-screen Brightness Overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-100 bg-black"
                style={{ opacity: 1 - brightness / 100 }}
            ></div>

            {/* Header */}
            <header className="flex items-center justify-between pb-6 border-b border-slate-200/10">
                <div>
                    <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                        Brightness Test
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mt-1">
                        Adjust the slider to test your display&apos;s brightness levels. You
                        can also input a precise value.
                    </p>
                </div>
                <button
                    onClick={toggleFullScreen}
                    className="flex items-center gap-2 min-w-[84px] cursor-pointer justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90"
                >
                    <MdFullscreen className="text-xl" />
                    <span className="truncate">Enter Full Screen</span>
                </button>
            </header>

            {/* Test Canvas & Controls */}
            <div className="flex flex-col lg:flex-row gap-8 mt-8">
                {/* Canvas Preview (Optional, but keeps the UI consistent) */}
                <div className="flex-1 flex items-center justify-center rounded-xl bg-slate-900 p-4 aspect-[16/9] overflow-hidden relative border border-slate-700">
                    <div className="text-center">
                        <p className="text-white mb-2">Preview</p>
                        <div className="w-32 h-32 bg-white rounded-full mx-auto" style={{ opacity: brightness / 100 }}></div>
                    </div>
                </div>

                {/* Controls */}
                <div className="w-full lg:w-72 flex flex-col gap-6">
                    {/* Brightness Slider */}
                    <div className="w-full rounded-xl border border-slate-200/10 bg-background-light p-4 dark:bg-background-dark/50 relative z-[60]">
                        <div className="flex w-full shrink-0 items-center justify-between">
                            <p className="text-slate-900 dark:text-white text-base font-medium leading-normal">
                                Brightness Level
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
                            Note: This simulates brightness by overlaying a dark layer. For true hardware brightness, use your monitor buttons.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
