"use client";

import { useState, useEffect, useRef } from "react";
import { MdBlurOn, MdPlayArrow, MdPause } from "react-icons/md";

export default function MotionBlurTest() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [speed, setSpeed] = useState(10);
    const requestRef = useRef<number>(0);
    const positionRef = useRef<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const objectRef = useRef<HTMLDivElement>(null);

    const animate = () => {
        if (containerRef.current && objectRef.current) {
            positionRef.current += speed;
            if (positionRef.current > containerRef.current.clientWidth) {
                positionRef.current = -100; // Reset to left side
            }
            objectRef.current.style.transform = `translateX(${positionRef.current}px) translateY(-50%)`;
        }
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (isPlaying) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(requestRef.current);
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [isPlaying, speed]);

    return (
        <div className="mx-auto max-w-6xl p-8">
            <header className="flex items-center justify-between pb-6 border-b border-slate-200/10 mb-8">
                <div>
                    <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                        Motion Blur Test
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mt-1">
                        Track the moving object to check for ghosting and motion blur.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Speed:</span>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={speed}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                            className="w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-lg font-medium transition-colors"
                    >
                        {isPlaying ? <MdPause /> : <MdPlayArrow />}
                        {isPlaying ? "Pause" : "Play"}
                    </button>
                </div>
            </header>

            <div
                ref={containerRef}
                className="relative w-full h-96 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700"
            >
                {/* Moving Object */}
                <div
                    ref={objectRef}
                    className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                    style={{
                        willChange: "transform",
                    }}
                >
                    <div className="w-4 h-full absolute bg-red-500/20 -z-10 blur-sm"></div>
                    <MdBlurOn className="text-6xl text-primary" />
                    <span className="text-slate-900 dark:text-white font-bold whitespace-nowrap">
                        Motion Test
                    </span>
                    <div className="flex gap-1">
                        <div className="w-2 h-8 bg-red-500"></div>
                        <div className="w-2 h-8 bg-green-500"></div>
                        <div className="w-2 h-8 bg-blue-500"></div>
                    </div>
                </div>

                {/* Static Grid for Reference */}
                <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-10">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="border-r border-slate-900 dark:border-white h-full"></div>
                    ))}
                </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-lg text-sm">
                <p className="font-bold mb-1">Instructions:</p>
                <p>
                    Follow the moving icon with your eyes. If you see a significant trail or &quot;ghost&quot; behind the object, your monitor may have slow pixel response times. Adjust the speed to test different motion rates.
                </p>
            </div>
        </div>
    );
}
