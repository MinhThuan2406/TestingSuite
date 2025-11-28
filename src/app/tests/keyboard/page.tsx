"use client";

import { useState, useEffect } from "react";
import { MdKeyboard, MdRefresh, MdFullscreen, MdFullscreenExit } from "react-icons/md";

export default function KeyboardTest() {
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
    const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
    const [lastPressed, setLastPressed] = useState<string>("");
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent default for all keys to avoid browser shortcuts interfering with test
            e.preventDefault();

            const key = e.code;
            setPressedKeys((prev) => new Set(prev).add(key));
            setActiveKeys((prev) => new Set(prev).add(key));
            setLastPressed(key);
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            e.preventDefault();
            const key = e.code;
            setActiveKeys((prev) => {
                const newSet = new Set(prev);
                newSet.delete(key);
                return newSet;
            });
        };

        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
            if (!document.fullscreenElement) {
                // Unlock keys when exiting fullscreen
                if ('keyboard' in navigator && 'unlock' in (navigator as any).keyboard) {
                    (navigator as any).keyboard.unlock();
                }
            } else {
                // Lock keys when entering fullscreen
                if ('keyboard' in navigator && 'lock' in (navigator as any).keyboard) {
                    (navigator as any).keyboard.lock(['MetaLeft', 'MetaRight', 'Escape']);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            // Unlock keys on cleanup
            if ('keyboard' in navigator && 'unlock' in (navigator as any).keyboard) {
                (navigator as any).keyboard.unlock();
            }
        };
    }, []);

    const resetTest = () => {
        setPressedKeys(new Set());
        setActiveKeys(new Set());
        setLastPressed("");
    };

    const toggleFullscreen = async () => {
        if (!document.fullscreenElement) {
            try {
                await document.documentElement.requestFullscreen();
            } catch (err) {
                console.error("Error attempting to enable fullscreen:", err);
            }
        } else {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            }
        }
    };

    const formatKeyDisplay = (code: string) => {
        if (!code) return "";
        if (code.startsWith("Key")) return code.slice(3);
        if (code.startsWith("Digit")) return code.slice(5);
        if (code.startsWith("Numpad")) return code.replace("Numpad", "Num ");
        if (code === "Space") return "Space";
        if (code === "MetaLeft") return "Win (L)";
        if (code === "MetaRight") return "Win (R)";
        if (code === "ControlLeft") return "Ctrl (L)";
        if (code === "ControlRight") return "Ctrl (R)";
        if (code.includes("Left")) return code.replace("Left", " (L)");
        if (code.includes("Right")) return code.replace("Right", " (R)");
        return code;
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
                        <span className="block text-sm text-amber-600 dark:text-amber-400 mt-1">
                            Note: Enter Fullscreen mode to test Windows/Meta keys.
                        </span>
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleFullscreen}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors text-slate-700 dark:text-slate-300"
                        title="Fullscreen mode is required to block Windows key"
                    >
                        {isFullscreen ? <MdFullscreenExit className="text-xl" /> : <MdFullscreen className="text-xl" />}
                        {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    </button>
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
                        <span className="font-mono font-bold text-slate-900 dark:text-white">{formatKeyDisplay(lastPressed) || "-"}</span>
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
                            {/* Row 1 (F-Keys) */}
                            <div className="flex gap-2 mb-4">
                                <Key code="Escape" label="Esc" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <div className="w-8"></div>
                                <Key code="F1" label="F1" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="F2" label="F2" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="F3" label="F3" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="F4" label="F4" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <div className="w-4"></div>
                                <Key code="F5" label="F5" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="F6" label="F6" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="F7" label="F7" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="F8" label="F8" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <div className="w-4"></div>
                                <Key code="F9" label="F9" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="F10" label="F10" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="F11" label="F11" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="F12" label="F12" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                            </div>

                            {/* Row 2 */}
                            <div className="flex gap-2">
                                <Key code="Backquote" label="`" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Digit1" label="1" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Digit2" label="2" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Digit3" label="3" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Digit4" label="4" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Digit5" label="5" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Digit6" label="6" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Digit7" label="7" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Digit8" label="8" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Digit9" label="9" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Digit0" label="0" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Minus" label="-" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Equal" label="=" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Backspace" label="Backspace" width="w-24 flex-grow" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                            </div>

                            {/* Row 3 */}
                            <div className="flex gap-2">
                                <Key code="Tab" label="Tab" width="w-20" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyQ" label="Q" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyW" label="W" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyE" label="E" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyR" label="R" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyT" label="T" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyY" label="Y" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyU" label="U" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyI" label="I" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyO" label="O" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyP" label="P" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="BracketLeft" label="[" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="BracketRight" label="]" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Backslash" label="\" width="flex-grow" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                            </div>

                            {/* Row 4 */}
                            <div className="flex gap-2">
                                <Key code="CapsLock" label="Caps" width="w-24" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyA" label="A" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyS" label="S" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyD" label="D" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyF" label="F" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyG" label="G" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyH" label="H" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyJ" label="J" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyK" label="K" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyL" label="L" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Semicolon" label=";" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Quote" label="'" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Enter" label="Enter" width="flex-grow" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                            </div>

                            {/* Row 5 */}
                            <div className="flex gap-2">
                                <Key code="ShiftLeft" label="Shift" width="w-32" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyZ" label="Z" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyX" label="X" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyC" label="C" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyV" label="V" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyB" label="B" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyN" label="N" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="KeyM" label="M" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Comma" label="," pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Period" label="." pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Slash" label="/" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="ShiftRight" label="Shift" width="flex-grow" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                            </div>

                            {/* Row 6 */}
                            <div className="flex gap-2">
                                <Key code="ControlLeft" label="Ctrl" width="w-16" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Fn" label="Fn" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="MetaLeft" label="Win" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="AltLeft" label="Alt" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Space" label="Space" width="flex-grow" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="AltRight" label="Alt" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="MetaRight" label="Win" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="ContextMenu" label="Menu" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="ControlRight" label="Ctrl" width="w-16" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                            </div>
                        </div>

                        {/* Navigation Block */}
                        <div className="flex flex-col justify-between pt-[64px]">
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <Key code="Insert" label="Ins" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                    <Key code="Home" label="Home" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                    <Key code="PageUp" label="PgUp" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                </div>
                                <div className="flex gap-2">
                                    <Key code="Delete" label="Del" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                    <Key code="End" label="End" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                    <Key code="PageDown" label="PgDn" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 mt-auto">
                                <div className="flex justify-center">
                                    <Key code="ArrowUp" label="↑" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                </div>
                                <div className="flex gap-2">
                                    <Key code="ArrowLeft" label="←" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                    <Key code="ArrowDown" label="↓" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                    <Key code="ArrowRight" label="→" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                </div>
                            </div>
                        </div>

                        {/* Numpad */}
                        <div className="flex flex-col gap-2 pt-[64px] ml-4">
                            <div className="flex gap-2">
                                <Key code="NumLock" label="Num" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="NumpadDivide" label="/" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="NumpadMultiply" label="*" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="NumpadSubtract" label="-" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                            </div>
                            <div className="flex gap-2">
                                <Key code="Numpad7" label="7" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Numpad8" label="8" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Numpad9" label="9" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="NumpadAdd" label="+" height="h-[104px]" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                            </div>
                            <div className="flex gap-2 -mt-[52px]"> {/* Adjust for tall + key */}
                                <Key code="Numpad4" label="4" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Numpad5" label="5" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Numpad6" label="6" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                            </div>
                            <div className="flex gap-2">
                                <Key code="Numpad1" label="1" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Numpad2" label="2" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="Numpad3" label="3" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="NumpadEnter" label="Ent" height="h-[104px]" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                            </div>
                            <div className="flex gap-2 -mt-[52px]">
                                <Key code="Numpad0" label="0" width="w-[104px]" pressedKeys={pressedKeys} activeKeys={activeKeys} />
                                <Key code="NumpadDecimal" label="." pressedKeys={pressedKeys} activeKeys={activeKeys} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Key({ code, label, width = "w-12", height = "h-12", pressedKeys, activeKeys }: { code: string; label: string; width?: string; height?: string; pressedKeys: Set<string>; activeKeys: Set<string> }) {
    const isPressed = pressedKeys.has(code);
    const isActive = activeKeys.has(code);
    const isFn = code === "Fn";

    // Dynamic styling for pop-up
    const isLongLabel = label.length > 2;
    const popupWidth = isLongLabel ? "min-w-[4rem] w-fit px-3" : "w-16";
    const popupHeight = "h-16";
    const popupTextSize = label.length > 6 ? "text-xs font-bold" : (label.length > 2 ? "text-sm font-bold" : "text-3xl font-bold");

    return (
        <div
            className={`${width} ${height} relative rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-100 border ${isPressed
                ? "bg-primary text-white border-primary shadow-[0_0_20px_rgba(13,147,242,0.8),0_0_40px_rgba(13,147,242,0.4)] z-10"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 shadow-sm hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
            title={isFn ? "The Fn key is often handled internally by hardware and may not register." : undefined}
        >
            {label}
            {isFn && (
                <div className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </div>
            )}
            {isActive && (
                <div className={`absolute -top-16 left-1/2 -translate-x-1/2 ${popupWidth} ${popupHeight} bg-primary text-white rounded-xl flex items-center justify-center ${popupTextSize} shadow-xl z-20 animate-in fade-in zoom-in duration-75 whitespace-nowrap`}>
                    {label}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45"></div>
                </div>
            )}
        </div>
    );
}
