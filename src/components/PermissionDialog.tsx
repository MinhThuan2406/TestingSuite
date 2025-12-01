"use client";

import { useEffect } from "react";

interface PermissionDialogProps {
    open: boolean;
    onAgree: () => void;
    onCancel: () => void;
    title: string;
    message: string;
    agreeText: string;
    cancelText: string;
}

export default function PermissionDialog({
    open,
    onAgree,
    onCancel,
    title,
    message,
    agreeText,
    cancelText,
}: PermissionDialogProps) {
    // Handle ESC key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && open) {
                onCancel();
            }
        };

        if (open) {
            document.addEventListener("keydown", handleEscape);
            // Prevent body scroll when dialog is open
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [open, onCancel]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onCancel}
            />

            {/* Dialog */}
            <div className="relative z-10 w-full max-w-md mx-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in duration-200">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <svg
                            className="w-6 h-6 text-blue-600 dark:text-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-3">
                    {title}
                </h2>

                {/* Message */}
                <p className="text-center text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    {message}
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onAgree}
                        className="flex-1 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-lg shadow-blue-500/30"
                    >
                        {agreeText}
                    </button>
                </div>
            </div>
        </div>
    );
}
