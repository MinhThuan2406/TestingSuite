"use client";

import { useState, useEffect, useRef } from "react";
import { MdMouse, MdRefresh } from "react-icons/md";

export default function MouseTest() {
    const [clicks, setClicks] = useState<{ [key: number]: boolean }>({});
    const [scroll, setScroll] = useState(0);
    const [pollingRate, setPollingRate] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const lastTimeRef = useRef(0);
    const eventsCountRef = useRef(0);

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            // Prevent default for side buttons (3: Back, 4: Forward) to stop browser navigation
            if (e.button === 3 || e.button === 4) {
                e.preventDefault();
            }
            setClicks((prev) => ({ ...prev, [e.button]: true }));
        };

        const handleMouseUp = (e: MouseEvent) => {
            if (e.button === 3 || e.button === 4) {
                e.preventDefault();
            }
            setClicks((prev) => ({ ...prev, [e.button]: false }));
        };

        const handleWheel = (e: WheelEvent) => {
            setScroll((prev) => prev + e.deltaY);
        };

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            eventsCountRef.current++;
        };

        // Polling rate calculator
        const interval = setInterval(() => {
            const now = performance.now();
            const elapsed = now - lastTimeRef.current;
            if (elapsed >= 1000) {
                setPollingRate(Math.round(eventsCountRef.current));
                eventsCountRef.current = 0;
                lastTimeRef.current = now;
            }
        }, 1000);

        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("wheel", handleWheel);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("contextmenu", (e) => e.preventDefault());

        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("contextmenu", (e) => e.preventDefault());
            clearInterval(interval);
        };
    }, []);

    const resetTest = () => {
        setClicks({});
        setScroll(0);
        setPollingRate(0);
        setPosition({ x: 0, y: 0 });
        eventsCountRef.current = 0;
        lastTimeRef.current = performance.now();
    };

    return (
        <div className="mx-auto max-w-4xl p-8">
            <header className="flex items-center justify-between pb-6 border-b border-slate-200/10 mb-8">
                <div>
                    <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                        Mouse Test
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mt-1">
                        Test your mouse buttons, scroll wheel, and polling rate.
                    </p>
                </div>
                <button
                    onClick={resetTest}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg font-medium transition-colors"
                >
                    <MdRefresh className="text-xl" />
                    Reset
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Buttons Test */}
                <div className="md:col-span-2">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Button Check</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                        <MouseButton button={0} label="Left Click" isActive={clicks[0]} />
                        <MouseButton button={1} label="Middle Click" isActive={clicks[1]} />
                        <MouseButton button={2} label="Right Click" isActive={clicks[2]} />
                        <MouseButton button={3} label="Side Back" isActive={clicks[3]} />
                        <MouseButton button={4} label="Side Fwd" isActive={clicks[4]} />
                    </div>
                </div>

                {/* Scroll Test */}
                <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Scroll Wheel</h2>
                    <div className="flex items-center justify-center h-32 bg-slate-100 dark:bg-slate-900 rounded-lg relative overflow-hidden">
                        <div
                            className="absolute w-full h-1 bg-primary transition-transform duration-75"
                            style={{ transform: `translateY(${scroll}px)` }}
                        ></div>
                        <div className="z-10 text-center">
                            <div className="text-3xl font-bold text-slate-900 dark:text-white">{scroll}</div>
                            <div className="text-sm text-slate-500">Scroll Value</div>
                        </div>
                    </div>
                </div>

                {/* Polling Rate & Position */}
                <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Performance</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
                            <span className="text-slate-500">Polling Rate</span>
                            <span className="text-2xl font-bold text-primary">{pollingRate} Hz</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
                            <span className="text-slate-500">Position</span>
                            <span className="font-mono text-slate-900 dark:text-white">
                                X: {position.x}, Y: {position.y}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-lg text-sm text-center">
                Note: Right-click context menu is disabled on this page to allow testing the Right Click button.
            </div>
        </div>
    );
}

function MouseButton({ button, label, isActive }: { button: number; label: string; isActive: boolean }) {
    return (
        <div
            className={`flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-100 ${isActive
                ? "bg-primary text-white border-primary shadow-lg scale-95"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                }`}
        >
            <MdMouse className={`text-4xl mb-2 ${isActive ? "text-white" : "text-primary"}`} />
            <span className="font-bold">{label}</span>
            <span className="text-xs opacity-70">Button {button}</span>
        </div>
    );
}
