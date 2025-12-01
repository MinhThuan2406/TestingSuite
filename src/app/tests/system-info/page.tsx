"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/providers/Providers";
import PermissionDialog from "@/components/PermissionDialog";
import { MdDownload, MdCheckCircle, MdComputer, MdSpeed } from "react-icons/md";

export default function SystemInfoPage() {
    const router = useRouter();
    const { t } = useLanguage();
    const [showDialog, setShowDialog] = useState(true);
    const [userAgreed, setUserAgreed] = useState(false);

    const handleAgree = () => {
        setShowDialog(false);
        setUserAgreed(true);
    };

    const handleCancel = () => {
        setShowDialog(false);
        // Redirect back to dashboard after a short delay
        setTimeout(() => {
            router.push("/");
        }, 300);
    };

    // Download URL from GitHub Releases
    const DOWNLOAD_URL = "https://github.com/MinhThuan2406/TestingSuite/releases/download/v1.0.0/SystemAnalyzer.WinForms.exe";

    if (!userAgreed) {
        return (
            <PermissionDialog
                open={showDialog}
                onAgree={handleAgree}
                onCancel={handleCancel}
                title={t.systemInfo.permissionDialog.title}
                message={t.systemInfo.permissionDialog.message}
                agreeText={t.systemInfo.permissionDialog.agree}
                cancelText={t.systemInfo.permissionDialog.cancel}
            />
        );
    }

    return (
        <div className="mx-auto max-w-4xl p-8">
            {/* Header */}
            <header className="flex items-center justify-between pb-6 border-b border-slate-200/10 mb-8">
                <div>
                    <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                        {t.systemInfo.title}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mt-1">
                        {t.systemInfo.subtitle}
                    </p>
                </div>
            </header>

            {/* Download Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border border-blue-100 dark:border-slate-700 shadow-xl">
                {/* Icon and Title */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
                        <MdComputer className="text-3xl text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {t.systemInfo.downloadSection.title}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">
                            {t.systemInfo.downloadSection.fileSize}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                    {t.systemInfo.downloadSection.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                        <MdCheckCircle className="text-green-600 dark:text-green-400 text-xl mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">
                            {t.systemInfo.downloadSection.feature1}
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <MdCheckCircle className="text-green-600 dark:text-green-400 text-xl mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">
                            {t.systemInfo.downloadSection.feature2}
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <MdCheckCircle className="text-green-600 dark:text-green-400 text-xl mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">
                            {t.systemInfo.downloadSection.feature3}
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <MdCheckCircle className="text-green-600 dark:text-green-400 text-xl mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">
                            {t.systemInfo.downloadSection.feature4}
                        </span>
                    </li>
                </ul>

                {/* Download Button */}
                <a
                    href={DOWNLOAD_URL}
                    download
                    className="inline-flex items-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
                >
                    <MdDownload className="text-2xl" />
                    {t.systemInfo.downloadSection.downloadButton}
                </a>

                {/* Requirements */}
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        <strong className="text-slate-900 dark:text-white">
                            {t.systemInfo.downloadSection.requirements}
                        </strong>
                    </p>
                    <p className="text-sm text-slate-500 dar:text-slate-400 mt-2">
                        {t.systemInfo.downloadSection.helpText}
                    </p>
                </div>
            </div>

            {/* Preview Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Console Preview */}
                <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <MdSpeed className="text-blue-600" />
                        Console Version
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        Lightweight terminal interface with color-coded output and real-time updates.
                    </p>
                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-green-400">
                        <div className="mb-2">═══ SYSTEM ANALYZER ═══</div>
                        <div className="text-cyan-400">CPU: Intel Core i7-9700K</div>
                        <div className="text-yellow-400">Cores: 8 | Freq: 3600 MHz</div>
                        <div className="text-blue-400">RAM: 16.00 GB total</div>
                        <div className="text-green-400">Available: 7.55 GB</div>
                    </div>
                </div>

                {/* WinForms Preview */}
                <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <MdComputer className="text-purple-600" />
                        GUI Version
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        Modern Windows Forms interface with visual progress bars and auto-refresh.
                    </p>
                    <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 text-xs">
                        <div className="bg-white dark:bg-slate-800 rounded p-2 mb-2 border border-slate-300 dark:border-slate-600">
                            <div className="font-semibold text-blue-600 mb-1">⚙️ CPU Info</div>
                            <div className="text-slate-700 dark:text-slate-300">Intel Core i7-9700K</div>
                            <div className="text-slate-600 dark:text-slate-400 text-xs">8 cores • 3600 MHz</div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded p-2 border border-slate-300 dark:border-slate-600">
                            <div className="font-semibold text-green-600 mb-1">💾 Memory</div>
                            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-1/2"></div>
                            </div>
                            <div className="text-slate-600 dark:text-slate-400 text-xs mt-1">8.00 / 16.00 GB</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
