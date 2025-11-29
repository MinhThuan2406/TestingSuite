"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MdVideocam, MdVideocamOff, MdRefresh, MdCamera } from "react-icons/md";
import { useLanguage } from "@/providers/Providers";

export default function WebcamTest() {
    const { t } = useLanguage();
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [resolution, setResolution] = useState<{ width: number; height: number } | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const getDevices = useCallback(async () => {
        try {
            // Request permission first to get labels
            await navigator.mediaDevices.getUserMedia({ video: true });
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter((device) => device.kind === "videoinput");
            setDevices(videoDevices);

            // Only set default if none selected
            if (videoDevices.length > 0) {
                setSelectedDeviceId((prev) => prev || videoDevices[0].deviceId);
            }
        } catch (err) {
            console.error("Error enumerating devices:", err);
            setError("Could not access camera devices. Please check permissions.");
        }
    }, []);

    const startCamera = useCallback(async () => {
        if (!selectedDeviceId) return;

        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }

        try {
            const newStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    deviceId: { exact: selectedDeviceId },
                    width: { ideal: 1920 },
                    height: { ideal: 1080 },
                },
            });
            setStream(newStream);
            setError(null);
        } catch (err) {
            console.error("Error starting camera:", err);
            setError("Could not start video stream.");
        }
    }, [selectedDeviceId, stream]);

    useEffect(() => {
        getDevices();
        return () => {
            // Cleanup function to stop tracks when component unmounts
            // We can't access the *latest* stream here easily without a ref, 
            // but we can try to clean up if we have a stream in state.
            // Actually, the best way is to use a ref for the stream to clean it up.
        };
    }, [getDevices]);

    // Use a ref to track stream for cleanup
    const streamRef = useRef<MediaStream | null>(null);
    useEffect(() => {
        streamRef.current = stream;
    }, [stream]);

    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(t => t.stop());
            }
        };
    }, []);

    useEffect(() => {
        if (selectedDeviceId) {
            startCamera();
        }
    }, [selectedDeviceId, startCamera]);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
                setResolution({
                    width: videoRef.current?.videoWidth || 0,
                    height: videoRef.current?.videoHeight || 0,
                });
            };
        }
    }, [stream]);

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
            setResolution(null);
        }
    };

    return (
        <div className="mx-auto max-w-4xl p-8">
            <header className="flex items-center justify-between pb-6 border-b border-slate-200/10 mb-8">
                <div>
                    <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                        {t.webcam.title}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mt-1">
                        {t.webcam.subtitle}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={getDevices}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg font-medium transition-colors"
                    >
                        <MdRefresh className="text-xl" />
                        Refresh Devices
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Video Area */}
                <div className="lg:col-span-2">
                    <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
                        {stream ? (
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-contain transform scale-x-[-1]" // Mirror effect
                            />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                                <MdVideocamOff className="text-6xl mb-4" />
                                <p>Camera is off</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Controls & Info */}
                <div className="space-y-6">
                    <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <MdCamera /> Device Settings
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Select Camera
                                </label>
                                <select
                                    value={selectedDeviceId}
                                    onChange={(e) => setSelectedDeviceId(e.target.value)}
                                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                                    disabled={devices.length === 0}
                                >
                                    {devices.map((device) => (
                                        <option key={device.deviceId} value={device.deviceId}>
                                            {device.label || `Camera ${device.deviceId.slice(0, 5)}...`}
                                        </option>
                                    ))}
                                    {devices.length === 0 && <option>No cameras found</option>}
                                </select>
                            </div>

                            <div className="flex gap-3">
                                {stream ? (
                                    <button
                                        onClick={stopCamera}
                                        className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                                    >
                                        Stop Camera
                                    </button>
                                ) : (
                                    <button
                                        onClick={startCamera}
                                        className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                                        disabled={!selectedDeviceId}
                                    >
                                        Start Camera
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {stream && resolution && (
                        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                Stream Info
                            </h2>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 dark:text-slate-400">Resolution</span>
                                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                                        {resolution.width} x {resolution.height}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 dark:text-slate-400">Aspect Ratio</span>
                                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                                        {(resolution.width / resolution.height).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 dark:text-slate-400">Status</span>
                                    <span className="text-green-500 font-bold flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
