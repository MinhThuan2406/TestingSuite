"use client";

import { MdContrast } from "react-icons/md";

export default function ContrastTest() {
    return (
        <div className="mx-auto max-w-6xl p-8">
            <header className="flex items-center justify-between pb-6 border-b border-slate-200/10 mb-8">
                <div>
                    <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                        Contrast Test
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mt-1">
                        Check your display&apos;s dynamic range and contrast ratio.
                    </p>
                </div>
            </header>

            <div className="flex flex-col gap-8">
                {/* White Saturation */}
                <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">White Saturation</h2>
                    <p className="text-sm text-slate-500 mb-4">
                        You should be able to distinguish each block from the background.
                    </p>
                    <div className="grid grid-cols-12 h-32 gap-1">
                        {Array.from({ length: 12 }).map((_, i) => {
                            const value = 255 - i * 2; // 255, 253, 251...
                            return (
                                <div
                                    key={i}
                                    className="flex items-center justify-center text-xs font-mono text-slate-400"
                                    style={{ backgroundColor: `rgb(${value}, ${value}, ${value})` }}
                                >
                                    {value}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Black Level */}
                <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Black Level</h2>
                    <p className="text-sm text-slate-500 mb-4">
                        You should be able to distinguish each block from the background.
                    </p>
                    <div className="grid grid-cols-12 h-32 gap-1 bg-black p-1">
                        {Array.from({ length: 12 }).map((_, i) => {
                            const value = i * 2; // 0, 2, 4...
                            return (
                                <div
                                    key={i}
                                    className="flex items-center justify-center text-xs font-mono text-slate-600"
                                    style={{ backgroundColor: `rgb(${value}, ${value}, ${value})` }}
                                >
                                    {value}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Color Contrast */}
                <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Color Contrast</h2>
                    <div className="flex flex-col gap-2">
                        <div className="h-16 w-full bg-gradient-to-r from-black via-red-500 to-white"></div>
                        <div className="h-16 w-full bg-gradient-to-r from-black via-green-500 to-white"></div>
                        <div className="h-16 w-full bg-gradient-to-r from-black via-blue-500 to-white"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
