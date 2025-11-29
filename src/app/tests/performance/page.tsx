"use client";

import { useState, useEffect, useRef } from "react";
import { MdSpeed, MdMemory, MdPlayArrow, MdRefresh } from "react-icons/md";
import { useLanguage } from "@/providers/Providers";

export default function PerformanceTest() {
    const { t } = useLanguage();
    const [systemInfo, setSystemInfo] = useState<{ cores: number; memory: number | string }>({
        cores: 0,
        memory: "Unknown",
    });
    const [benchmarkStatus, setBenchmarkStatus] = useState<"idle" | "running" | "completed">("idle");
    const [progress, setProgress] = useState(0);
    const [score, setScore] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        // Get System Info
        const cores = navigator.hardwareConcurrency || 0;
        // @ts-expect-error - deviceMemory is non-standard but supported in Chrome
        const memory = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "Unknown";
        setSystemInfo({ cores, memory });
    }, []);

    const runBenchmark = () => {
        setBenchmarkStatus("running");
        setProgress(0);
        setScore(0);
        setDuration(0);

        const startTime = performance.now();
        const testDuration = 5000; // 5 seconds
        let iterations = 0;

        const isPrime = (num: number) => {
            for (let i = 2, s = Math.sqrt(num); i <= s; i++)
                if (num % i === 0) return false;
            return num > 1;
        };

        const loop = () => {
            const now = performance.now();
            const elapsed = now - startTime;
            setDuration(elapsed);

            if (elapsed < testDuration) {
                // Run a chunk of calculations
                const chunkStart = performance.now();
                while (performance.now() - chunkStart < 16) { // 16ms budget per frame
                    isPrime(iterations + 1000000); // Check large numbers
                    iterations++;
                }
                setProgress(Math.min((elapsed / testDuration) * 100, 100));
                requestAnimationFrame(loop);
            } else {
                // Finished
                const finalScore = Math.floor(iterations / 100); // Normalize score
                setScore(finalScore);
                setProgress(100);
                setBenchmarkStatus("completed");
            }
        };

        requestAnimationFrame(loop);
    };

    return (
        <div className="mx-auto max-w-4xl p-8">
            <header className="flex items-center justify-between pb-6 border-b border-slate-200/10 mb-8">
                <div>
                    <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                        {t.performance.title}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mt-1">
                        {t.performance.subtitle}
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* System Info */}
                <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <MdMemory className="text-primary" /> System Information
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                            <span className="text-slate-500 dark:text-slate-400">Logical Cores</span>
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">{systemInfo.cores || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                            <span className="text-slate-500 dark:text-slate-400">Estimated RAM</span>
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">{systemInfo.memory}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                            <span className="text-slate-500 dark:text-slate-400">User Agent</span>
                            <span className="text-xs font-mono text-slate-900 dark:text-white text-right max-w-[200px] truncate" title={typeof navigator !== 'undefined' ? navigator.userAgent : ''}>
                                {typeof navigator !== 'undefined' ? navigator.userAgent : ''}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Benchmark */}
                <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <MdSpeed className="text-primary" /> CPU Benchmark
                    </h2>

                    <div className="flex flex-col items-center justify-center h-full pb-6">
                        {benchmarkStatus === "idle" && (
                            <div className="text-center">
                                <p className="text-slate-500 mb-6">
                                    Run a 5-second stress test to calculate your CPU score.
                                </p>
                                <button
                                    onClick={runBenchmark}
                                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-transform hover:scale-105"
                                >
                                    <MdPlayArrow className="text-2xl" />
                                    Start Benchmark
                                </button>
                            </div>
                        )}

                        {benchmarkStatus === "running" && (
                            <div className="w-full text-center space-y-4">
                                <div className="text-4xl font-bold text-primary animate-pulse">
                                    Running...
                                </div>
                                <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-100 ease-linear"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-slate-500 text-sm">Calculating prime numbers...</p>
                            </div>
                        )}

                        {benchmarkStatus === "completed" && (
                            <div className="text-center w-full">
                                <div className="mb-2 text-slate-500">Benchmark Score</div>
                                <div className="text-6xl font-black text-primary mb-6">
                                    {score.toLocaleString()}
                                </div>
                                <button
                                    onClick={runBenchmark}
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors mx-auto"
                                >
                                    <MdRefresh className="text-xl" />
                                    Run Again
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
