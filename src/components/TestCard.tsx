import React from "react";

interface TestCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick?: () => void;
}

export default function TestCard({
    icon,
    title,
    description,
    onClick,
}: TestCardProps) {
    return (
        <div className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-[#3b4a54] bg-white dark:bg-[#1b2227] p-6 transition-shadow hover:shadow-lg dark:hover:shadow-primary/10">
            <div className="flex items-center gap-4">
                <div className="text-primary text-3xl">{icon}</div>
                <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-white">
                    {title}
                </h3>
            </div>
            <p className="text-sm font-normal leading-normal text-gray-600 dark:text-[#9cadba]">
                {description}
            </p>
            <button
                onClick={onClick}
                className="mt-auto flex w-full cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
            >
                <span className="truncate">Start Test</span>
            </button>
        </div>
    );
}
