"use client";

"use client";

import { useState, useEffect } from "react";
import { MdKeyboard, MdRefresh } from "react-icons/md";

export default function KeyboardTest() {
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
    const [lastPressed, setLastPressed] = useState<string>("");
    const [layout, setLayout] = useState<"60%" | "TKL" | "Full">("TKL");

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            e.preventDefault();
            const key = e.code;
            setPressedKeys((prev) => new Set(prev).add(key));
            setLastPressed(key);

            // Auto-expand layout logic
            if (key.startsWith("Numpad")) {
                setLayout("Full");
            } else if (
                (key.startsWith("F") && !isNaN(Number(key.slice(1)))) ||
                ["Insert", "Home", "PageUp", "Delete", "End", "PageDown", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"].includes(key)
            ) {
                if (layout === "60%") setLayout("TKL");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [layout]);

    const resetTest = () => {
        setPressedKeys(new Set());
        setLastPressed("");
    };

    return (
        <div className="mx-auto max-w-[1600px] p-8">
            <header className="flex items-center justify-between pb-6 border-b border-slate-200/10 mb-8">
                <div>
                    <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                        Keyboard Test
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mt-1">
                        Press keys on your keyboard to verify they are working correctly.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        {(["60%", "TKL", "Full"] as const).map((l) => (
                            <button
                                key={l}
                                onClick={() => setLayout(l)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${layout === l
                                    ? "bg-white dark:bg-slate-700 text-primary shadow-sm"
                                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                                    }`}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={resetTest}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg font-medium transition-colors"
                    >
                        <MdRefresh className="text-xl" />
                        Reset
                    </button>
                </div>
            </header>

            <div className="flex flex-col gap-8">
                {/* Status Bar */}
                <div className="flex gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                        <MdKeyboard className="text-primary text-xl" />
                        <span className="text-slate-500 dark:text-slate-400">Last Pressed:</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white">{lastPressed || "-"}</span>
                    </div>
                    <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-500 dark:text-slate-400">Total Detected:</span>
                        <span className="font-bold text-slate-900 dark:text-white">{pressedKeys.size}</span>
                    </div>
                </div>

                {/* Virtual Keyboard */}
                <div className="p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm overflow-x-auto">
                    <div className="flex gap-6 min-w-max">
                        {/* Main Block */}
                        <div className="flex flex-col gap-2">
                            {/* Row 1 (F-Keys) - Hidden in 60% */}
                            {layout !== "60%" && (
                                <div className="flex gap-2 mb-4">
                                    <Key code="Escape" label="Esc" pressedKeys={pressedKeys} />
                                    <div className="w-8"></div>
                                    <Key code="F1" label="F1" pressedKeys={pressedKeys} />
                                    <Key code="F2" label="F2" pressedKeys={pressedKeys} />
                                    <Key code="F3" label="F3" pressedKeys={pressedKeys} />
                                    <Key code="F4" label="F4" pressedKeys={pressedKeys} />
                                    <div className="w-4"></div>
                                    <Key code="F5" label="F5" pressedKeys={pressedKeys} />
                                    <Key code="F6" label="F6" pressedKeys={pressedKeys} />
                                    <Key code="F7" label="F7" pressedKeys={pressedKeys} />
                                    <Key code="F8" label="F8" pressedKeys={pressedKeys} />
                                    <div className="w-4"></div>
                                    <Key code="F9" label="F9" pressedKeys={pressedKeys} />
                                    <Key code="F10" label="F10" pressedKeys={pressedKeys} />
                                    <Key code="F11" label="F11" pressedKeys={pressedKeys} />
                                    <Key code="F12" label="F12" pressedKeys={pressedKeys} />
                                </div>
                            )}

                            {/* Row 2 */}
                            <div className="flex gap-2">
                                <Key code="Backquote" label="`" pressedKeys={pressedKeys} />
                                <Key code="Digit1" label="1" pressedKeys={pressedKeys} />
                                <Key code="Digit2" label="2" pressedKeys={pressedKeys} />
                                <Key code="Digit3" label="3" pressedKeys={pressedKeys} />
                                <Key code="Digit4" label="4" pressedKeys={pressedKeys} />
                                <Key code="Digit5" label="5" pressedKeys={pressedKeys} />
                                <Key code="Digit6" label="6" pressedKeys={pressedKeys} />
                                <Key code="Digit7" label="7" pressedKeys={pressedKeys} />
                                <Key code="Digit8" label="8" pressedKeys={pressedKeys} />
                                <Key code="Digit9" label="9" pressedKeys={pressedKeys} />
                                <Key code="Digit0" label="0" pressedKeys={pressedKeys} />
                                <Key code="Minus" label="-" pressedKeys={pressedKeys} />
                                <Key code="Equal" label="=" pressedKeys={pressedKeys} />
                                <Key code="Backspace" label="Backspace" width="w-24 flex-grow" pressedKeys={pressedKeys} />
                            </div>

                            {/* Row 3 */}
                            <div className="flex gap-2">
                                <Key code="Tab" label="Tab" width="w-20" pressedKeys={pressedKeys} />
                                <Key code="KeyQ" label="Q" pressedKeys={pressedKeys} />
                                <Key code="KeyW" label="W" pressedKeys={pressedKeys} />
                                <Key code="KeyE" label="E" pressedKeys={pressedKeys} />
                                <Key code="KeyR" label="R" pressedKeys={pressedKeys} />
                                <Key code="KeyT" label="T" pressedKeys={pressedKeys} />
                                <Key code="KeyY" label="Y" pressedKeys={pressedKeys} />
                                <Key code="KeyU" label="U" pressedKeys={pressedKeys} />
                                <Key code="KeyI" label="I" pressedKeys={pressedKeys} />
                                <Key code="KeyO" label="O" pressedKeys={pressedKeys} />
                                <Key code="KeyP" label="P" pressedKeys={pressedKeys} />
                                <Key code="BracketLeft" label="[" pressedKeys={pressedKeys} />
                                <Key code="BracketRight" label="]" pressedKeys={pressedKeys} />
                                <Key code="Backslash" label="\" width="flex-grow" pressedKeys={pressedKeys} />
                            </div>

                            {/* Row 4 */}
                            <div className="flex gap-2">
                                <Key code="CapsLock" label="Caps" width="w-24" pressedKeys={pressedKeys} />
                                <Key code="KeyA" label="A" pressedKeys={pressedKeys} />
                                <Key code="KeyS" label="S" pressedKeys={pressedKeys} />
                                <Key code="KeyD" label="D" pressedKeys={pressedKeys} />
                                <Key code="KeyF" label="F" pressedKeys={pressedKeys} />
                                <Key code="KeyG" label="G" pressedKeys={pressedKeys} />
                                <Key code="KeyH" label="H" pressedKeys={pressedKeys} />
                                <Key code="KeyJ" label="J" pressedKeys={pressedKeys} />
                                <Key code="KeyK" label="K" pressedKeys={pressedKeys} />
                                <Key code="KeyL" label="L" pressedKeys={pressedKeys} />
                                <Key code="Semicolon" label=";" pressedKeys={pressedKeys} />
                                <Key code="Quote" label="'" pressedKeys={pressedKeys} />
                                <Key code="Enter" label="Enter" width="flex-grow" pressedKeys={pressedKeys} />
                            </div>

                            {/* Row 5 */}
                            <div className="flex gap-2">
                                <Key code="ShiftLeft" label="Shift" width="w-32" pressedKeys={pressedKeys} />
                                <Key code="KeyZ" label="Z" pressedKeys={pressedKeys} />
                                <Key code="KeyX" label="X" pressedKeys={pressedKeys} />
                                <Key code="KeyC" label="C" pressedKeys={pressedKeys} />
                                <Key code="KeyV" label="V" pressedKeys={pressedKeys} />
                                <Key code="KeyB" label="B" pressedKeys={pressedKeys} />
                                <Key code="KeyN" label="N" pressedKeys={pressedKeys} />
                                <Key code="KeyM" label="M" pressedKeys={pressedKeys} />
                                <Key code="Comma" label="," pressedKeys={pressedKeys} />
                                <Key code="Period" label="." pressedKeys={pressedKeys} />
                                <Key code="Slash" label="/" pressedKeys={pressedKeys} />
                                <Key code="ShiftRight" label="Shift" width="flex-grow" pressedKeys={pressedKeys} />
                            </div>

                            {/* Row 6 */}
                            <div className="flex gap-2">
                                <Key code="ControlLeft" label="Ctrl" width="w-16" pressedKeys={pressedKeys} />
                                <Key code="MetaLeft" label="Win" pressedKeys={pressedKeys} />
                                <Key code="AltLeft" label="Alt" pressedKeys={pressedKeys} />
                                <Key code="Space" label="Space" width="flex-grow" pressedKeys={pressedKeys} />
                                <Key code="AltRight" label="Alt" pressedKeys={pressedKeys} />
                                <Key code="MetaRight" label="Win" pressedKeys={pressedKeys} />
                                <Key code="ContextMenu" label="Menu" pressedKeys={pressedKeys} />
                                <Key code="ControlRight" label="Ctrl" width="w-16" pressedKeys={pressedKeys} />
                            </div>
                        </div>

                        {/* Navigation Block - Hidden in 60% */}
                        {layout !== "60%" && (
                            <div className={`flex flex-col justify-between ${layout === "TKL" || layout === "Full" ? "pt-[64px]" : ""}`}>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <Key code="Insert" label="Ins" pressedKeys={pressedKeys} />
                                        <Key code="Home" label="Home" pressedKeys={pressedKeys} />
                                        <Key code="PageUp" label="PgUp" pressedKeys={pressedKeys} />
                                    </div>
                                    <div className="flex gap-2">
                                        <Key code="Delete" label="Del" pressedKeys={pressedKeys} />
                                        <Key code="End" label="End" pressedKeys={pressedKeys} />
                                        <Key code="PageDown" label="PgDn" pressedKeys={pressedKeys} />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 mt-auto">
                                    <div className="flex justify-center">
                                        <Key code="ArrowUp" label="↑" pressedKeys={pressedKeys} />
                                    </div>
                                    <div className="flex gap-2">
                                        <Key code="ArrowLeft" label="←" pressedKeys={pressedKeys} />
                                        <Key code="ArrowDown" label="↓" pressedKeys={pressedKeys} />
                                        <Key code="ArrowRight" label="→" pressedKeys={pressedKeys} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Numpad - Only in Full */}
                        {layout === "Full" && (
                            <div className="flex flex-col gap-2 pt-[64px] ml-4">
                                <div className="flex gap-2">
                                    <Key code="NumLock" label="Num" pressedKeys={pressedKeys} />
                                    <Key code="NumpadDivide" label="/" pressedKeys={pressedKeys} />
                                    <Key code="NumpadMultiply" label="*" pressedKeys={pressedKeys} />
                                    <Key code="NumpadSubtract" label="-" pressedKeys={pressedKeys} />
                                </div>
                                <div className="flex gap-2">
                                    <Key code="Numpad7" label="7" pressedKeys={pressedKeys} />
                                    <Key code="Numpad8" label="8" pressedKeys={pressedKeys} />
                                    <Key code="Numpad9" label="9" pressedKeys={pressedKeys} />
                                    <Key code="NumpadAdd" label="+" height="h-[104px]" pressedKeys={pressedKeys} />
                                </div>
                                <div className="flex gap-2 -mt-[52px]"> {/* Adjust for tall + key */}
                                    <Key code="Numpad4" label="4" pressedKeys={pressedKeys} />
                                    <Key code="Numpad5" label="5" pressedKeys={pressedKeys} />
                                    <Key code="Numpad6" label="6" pressedKeys={pressedKeys} />
                                </div>
                                <div className="flex gap-2">
                                    <Key code="Numpad1" label="1" pressedKeys={pressedKeys} />
                                    <Key code="Numpad2" label="2" pressedKeys={pressedKeys} />
                                    <Key code="Numpad3" label="3" pressedKeys={pressedKeys} />
                                    <Key code="NumpadEnter" label="Ent" height="h-[104px]" pressedKeys={pressedKeys} />
                                </div>
                                <div className="flex gap-2 -mt-[52px]">
                                    <Key code="Numpad0" label="0" width="w-[104px]" pressedKeys={pressedKeys} />
                                    <Key code="NumpadDecimal" label="." pressedKeys={pressedKeys} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Key({ code, label, width = "w-12", height = "h-12", pressedKeys }: { code: string; label: string; width?: string; height?: string; pressedKeys: Set<string> }) {
    const isPressed = pressedKeys.has(code);
    return (
        <div
            className={`${width} ${height} rounded flex items-center justify-center text-sm font-medium transition-all duration-75 border ${isPressed
                ? "bg-primary text-white border-primary shadow-[0_0_10px_rgba(13,147,242,0.5)]"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600"
                }`}
        >
            {label}
        </div>
    );
}
