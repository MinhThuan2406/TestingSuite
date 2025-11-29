"use client";

import { useState, useEffect, useRef } from "react";
import { MdGamepad, MdVideogameAsset } from "react-icons/md";
import { useLanguage } from "@/providers/Providers";

type GamepadLayout = "xbox" | "playstation";

export default function GamepadTest() {
    const { t } = useLanguage();
    const [gamepads, setGamepads] = useState<(Gamepad | null)[]>([]);
    const [selectedLayout, setSelectedLayout] = useState<GamepadLayout>("xbox");
    const requestRef = useRef<number>(0);

    useEffect(() => {
        const scanGamepads = () => {
            const pads = navigator.getGamepads ? navigator.getGamepads() : [];
            setGamepads(Array.from(pads));
            requestRef.current = requestAnimationFrame(scanGamepads);
        };

        window.addEventListener("gamepadconnected", scanGamepads);
        window.addEventListener("gamepaddisconnected", scanGamepads);
        requestRef.current = requestAnimationFrame(scanGamepads);

        return () => {
            window.removeEventListener("gamepadconnected", scanGamepads);
            window.removeEventListener("gamepaddisconnected", scanGamepads);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const activeGamepad = gamepads.find((gp) => gp !== null);

    return (
        <div className="mx-auto max-w-5xl p-8">
            <header className="flex items-center justify-between pb-6 border-b border-slate-200/10 mb-8">
                <div>
                    <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                        {t.gamepad.title}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mt-1">
                        {t.gamepad.subtitle}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Layout Style:</span>
                    <div className="flex bg-slate-200 dark:bg-slate-700 rounded-lg p-1">
                        <button
                            onClick={() => setSelectedLayout("xbox")}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${selectedLayout === "xbox"
                                ? "bg-white dark:bg-slate-800 text-primary shadow-sm"
                                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                }`}
                        >
                            Xbox
                        </button>
                        <button
                            onClick={() => setSelectedLayout("playstation")}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${selectedLayout === "playstation"
                                ? "bg-white dark:bg-slate-800 text-primary shadow-sm"
                                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                }`}
                        >
                            PlayStation
                        </button>
                    </div>
                </div>
            </header>

            {!activeGamepad ? (
                <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">
                    <MdVideogameAsset className="text-6xl text-slate-400 mb-4" />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">No Gamepad Detected</h2>
                    <p className="text-slate-500 mt-2">Connect a controller and press any button to activate it.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Controller Visualizer */}
                    <div className="flex justify-center py-8 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <ControllerVisualizer gamepad={activeGamepad} layout={selectedLayout} />
                    </div>

                    {/* Raw Data */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Device Info</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">ID</span>
                                    <span className="font-mono truncate max-w-[200px]" title={activeGamepad.id}>{activeGamepad.id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Index</span>
                                    <span className="font-mono">{activeGamepad.index}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Mapping</span>
                                    <span className="font-mono">{activeGamepad.mapping}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Axes Data</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {activeGamepad.axes.map((val, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="flex justify-between text-xs text-slate-500">
                                            <span>Axis {i}</span>
                                            <span>{val.toFixed(2)}</span>
                                        </div>
                                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary transition-all duration-75"
                                                style={{
                                                    width: "50%",
                                                    transform: `translateX(${val * 100}%)`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ControllerVisualizer({ gamepad, layout }: { gamepad: Gamepad; layout: GamepadLayout }) {
    const buttons = gamepad.buttons;
    const axes = gamepad.axes;

    // Standard Mapping (Xbox/Generic)
    // 0: A, 1: B, 2: X, 3: Y
    // 4: LB, 5: RB, 6: LT, 7: RT
    // 8: Back, 9: Start, 10: L3, 11: R3
    // 12: Up, 13: Down, 14: Left, 15: Right
    // 16: Home

    const isPressed = (idx: number) => buttons[idx]?.pressed;
    const getValue = (idx: number) => buttons[idx]?.value || 0;

    // Layout Labels
    const labels = layout === "xbox"
        ? { a: "A", b: "B", x: "X", y: "Y", lb: "LB", rb: "RB", lt: "LT", rt: "RT" }
        : { a: "✕", b: "○", x: "□", y: "△", lb: "L1", rb: "R1", lt: "L2", rt: "R2" };

    const colors = layout === "xbox"
        ? { a: "bg-green-500", b: "bg-red-500", x: "bg-blue-500", y: "bg-yellow-500" }
        : { a: "bg-blue-400", b: "bg-red-400", x: "bg-pink-400", y: "bg-green-400" };

    return (
        <div className="relative w-[600px] h-[400px] bg-contain bg-center bg-no-repeat select-none">
            {/* Base Controller Shape (CSS Drawing for simplicity and flexibility) */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[500px] h-[300px] bg-slate-800 rounded-[80px] shadow-xl border-4 border-slate-700">

                    {/* Left Stick Area */}
                    <div className="absolute top-[80px] left-[60px] w-24 h-24 bg-slate-900 rounded-full border border-slate-700">
                        {/* Stick */}
                        <div
                            className={`absolute w-14 h-14 bg-slate-600 rounded-full top-1/2 left-1/2 -ml-7 -mt-7 shadow-lg transition-transform duration-75 ${isPressed(10) ? "bg-slate-500 scale-95" : ""}`}
                            style={{ transform: `translate(${axes[0] * 25}px, ${axes[1] * 25}px)` }}
                        ></div>
                    </div>

                    {/* Right Stick Area */}
                    <div className="absolute top-[140px] right-[120px] w-24 h-24 bg-slate-900 rounded-full border border-slate-700">
                        {/* Stick */}
                        <div
                            className={`absolute w-14 h-14 bg-slate-600 rounded-full top-1/2 left-1/2 -ml-7 -mt-7 shadow-lg transition-transform duration-75 ${isPressed(11) ? "bg-slate-500 scale-95" : ""}`}
                            style={{ transform: `translate(${axes[2] * 25}px, ${axes[3] * 25}px)` }}
                        ></div>
                    </div>

                    {/* D-Pad */}
                    <div className="absolute top-[140px] left-[120px] w-24 h-24">
                        <div className={`absolute top-0 left-8 w-8 h-8 bg-slate-700 rounded-t ${isPressed(12) ? "bg-primary" : ""}`}></div> {/* Up */}
                        <div className={`absolute bottom-0 left-8 w-8 h-8 bg-slate-700 rounded-b ${isPressed(13) ? "bg-primary" : ""}`}></div> {/* Down */}
                        <div className={`absolute top-8 left-0 w-8 h-8 bg-slate-700 rounded-l ${isPressed(14) ? "bg-primary" : ""}`}></div> {/* Left */}
                        <div className={`absolute top-8 right-0 w-8 h-8 bg-slate-700 rounded-r ${isPressed(15) ? "bg-primary" : ""}`}></div> {/* Right */}
                        <div className="absolute top-8 left-8 w-8 h-8 bg-slate-700"></div> {/* Center */}
                    </div>

                    {/* Face Buttons */}
                    <div className="absolute top-[80px] right-[60px] w-28 h-28">
                        {/* Y / Triangle */}
                        <div className={`absolute top-0 left-9 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md transition-all ${isPressed(3) ? colors.y + " scale-95" : "bg-slate-700"}`}>
                            {labels.y}
                        </div>
                        {/* B / Circle */}
                        <div className={`absolute top-9 right-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md transition-all ${isPressed(1) ? colors.b + " scale-95" : "bg-slate-700"}`}>
                            {labels.b}
                        </div>
                        {/* A / Cross */}
                        <div className={`absolute bottom-0 left-9 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md transition-all ${isPressed(0) ? colors.a + " scale-95" : "bg-slate-700"}`}>
                            {labels.a}
                        </div>
                        {/* X / Square */}
                        <div className={`absolute top-9 left-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md transition-all ${isPressed(2) ? colors.x + " scale-95" : "bg-slate-700"}`}>
                            {labels.x}
                        </div>
                    </div>

                    {/* Bumpers & Triggers (Visualized at top) */}
                    <div className="absolute -top-6 left-12 w-32 h-10 flex gap-2">
                        <div className={`flex-1 rounded-t-lg border-b-4 border-slate-800 flex items-center justify-center text-xs font-bold text-white ${isPressed(6) ? "bg-primary" : "bg-slate-600"}`}>
                            {labels.lt} <span className="ml-1 text-[10px] opacity-70">{(getValue(6) * 100).toFixed(0)}%</span>
                        </div>
                        <div className={`flex-1 rounded-t-lg border-b-4 border-slate-800 flex items-center justify-center text-xs font-bold text-white ${isPressed(4) ? "bg-primary" : "bg-slate-600"}`}>
                            {labels.lb}
                        </div>
                    </div>

                    <div className="absolute -top-6 right-12 w-32 h-10 flex gap-2 flex-row-reverse">
                        <div className={`flex-1 rounded-t-lg border-b-4 border-slate-800 flex items-center justify-center text-xs font-bold text-white ${isPressed(7) ? "bg-primary" : "bg-slate-600"}`}>
                            {labels.rt} <span className="ml-1 text-[10px] opacity-70">{(getValue(7) * 100).toFixed(0)}%</span>
                        </div>
                        <div className={`flex-1 rounded-t-lg border-b-4 border-slate-800 flex items-center justify-center text-xs font-bold text-white ${isPressed(5) ? "bg-primary" : "bg-slate-600"}`}>
                            {labels.rb}
                        </div>
                    </div>

                    {/* Center Buttons */}
                    <div className="absolute top-[120px] left-1/2 -ml-[60px] w-[120px] flex justify-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${isPressed(8) ? "bg-primary" : "bg-slate-700"}`}>
                            Select
                        </div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white -mt-4 ${isPressed(16) ? "bg-primary" : "bg-slate-700"}`}>
                            Home
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${isPressed(9) ? "bg-primary" : "bg-slate-700"}`}>
                            Start
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
