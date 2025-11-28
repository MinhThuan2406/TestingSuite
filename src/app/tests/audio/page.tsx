"use client";

import { useState, useRef, useEffect } from "react";
import { MdMic, MdVolumeUp, MdGraphicEq } from "react-icons/md";
import { useLanguage } from "@/providers/Providers";

export default function AudioTest() {
    const { t } = useLanguage();
    const [isMicActive, setIsMicActive] = useState(false);
    const [frequency, setFrequency] = useState(440);
    const [isPlayingTone, setIsPlayingTone] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    const initAudioContext = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext ||
                (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        }
        if (audioContextRef.current.state === "suspended") {
            audioContextRef.current.resume();
        }
    };

    const playStereoTest = (channel: "left" | "right") => {
        initAudioContext();
        if (!audioContextRef.current) return;

        const oscillator = audioContextRef.current.createOscillator();
        const panner = audioContextRef.current.createStereoPanner();
        const gain = audioContextRef.current.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(440, audioContextRef.current.currentTime);

        panner.pan.value = channel === "left" ? -1 : 1;

        gain.gain.setValueAtTime(0.5, audioContextRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.5);

        oscillator.connect(panner);
        panner.connect(gain);
        gain.connect(audioContextRef.current.destination);

        oscillator.start();
        oscillator.stop(audioContextRef.current.currentTime + 0.5);
    };

    const toggleTone = () => {
        if (isPlayingTone) {
            oscillatorRef.current?.stop();
            oscillatorRef.current?.disconnect();
            setIsPlayingTone(false);
        } else {
            initAudioContext();
            if (!audioContextRef.current) return;

            const oscillator = audioContextRef.current.createOscillator();
            const gain = audioContextRef.current.createGain();

            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
            gain.gain.value = 0.5;

            oscillator.connect(gain);
            gain.connect(audioContextRef.current.destination);
            oscillator.start();

            oscillatorRef.current = oscillator;
            setIsPlayingTone(true);
        }
    };

    useEffect(() => {
        if (isPlayingTone && oscillatorRef.current && audioContextRef.current) {
            oscillatorRef.current.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
        }
    }, [frequency, isPlayingTone]);

    const toggleMic = async () => {
        if (isMicActive) {
            sourceRef.current?.disconnect();
            setIsMicActive(false);
            cancelAnimationFrame(animationRef.current);
            // Clear canvas
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            if (canvas && ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        } else {
            try {
                initAudioContext();
                if (!audioContextRef.current) return;

                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const analyser = audioContextRef.current.createAnalyser();
                analyser.fftSize = 2048;

                const source = audioContextRef.current.createMediaStreamSource(stream);
                source.connect(analyser);

                analyserRef.current = analyser;
                sourceRef.current = source;
                setIsMicActive(true);
                drawVisualizer();
            } catch (err) {
                console.error("Error accessing microphone:", err);
                alert("Could not access microphone. Please check permissions.");
            }
        }
    };

    const drawVisualizer = () => {
        if (!analyserRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);
            analyserRef.current!.getByteTimeDomainData(dataArray);

            ctx.fillStyle = "rgb(20, 20, 20)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.lineWidth = 2;
            ctx.strokeStyle = "#0d93f2";
            ctx.beginPath();

            const sliceWidth = (canvas.width * 1.0) / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();
        };

        draw();
    };

    return (
        <div className="mx-auto max-w-4xl p-8">
            <header className="flex items-center justify-between pb-6 border-b border-slate-200/10 mb-8">
                <div>
                    <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                        {t.audio.title}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal mt-1">
                        {t.audio.subtitle}
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Stereo Test */}
                <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                        <MdVolumeUp className="text-primary text-2xl" />
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.audio.stereoTest}</h2>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">
                        {t.audio.stereoDesc}
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => playStereoTest("left")}
                            className="flex-1 py-3 px-4 bg-slate-100 dark:bg-slate-700 hover:bg-primary hover:text-white rounded-lg font-medium transition-colors"
                        >
                            {t.audio.leftChannel}
                        </button>
                        <button
                            onClick={() => playStereoTest("right")}
                            className="flex-1 py-3 px-4 bg-slate-100 dark:bg-slate-700 hover:bg-primary hover:text-white rounded-lg font-medium transition-colors"
                        >
                            {t.audio.rightChannel}
                        </button>
                    </div>
                </div>

                {/* Frequency Generator */}
                <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                        <MdGraphicEq className="text-primary text-2xl" />
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.audio.frequencyGenerator}</h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500 dark:text-slate-400">{t.audio.frequency} {frequency} Hz</span>
                            <button
                                onClick={toggleTone}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${isPlayingTone
                                    ? "bg-red-500 text-white hover:bg-red-600"
                                    : "bg-primary text-white hover:bg-primary/90"
                                    }`}
                            >
                                {isPlayingTone ? "Stop Tone" : t.audio.playTone}
                            </button>
                        </div>
                        <input
                            type="range"
                            min="20"
                            max="20000"
                            step="10"
                            value={frequency}
                            onChange={(e) => setFrequency(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>20 Hz</span>
                            <span>20 kHz</span>
                        </div>
                    </div>
                </div>

                {/* Microphone Test */}
                <div className="md:col-span-2 p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <MdMic className="text-primary text-2xl" />
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.audio.microphoneTest}</h2>
                        </div>
                        <button
                            onClick={toggleMic}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${isMicActive
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-primary text-white hover:bg-primary/90"
                                }`}
                        >
                            {isMicActive ? "Stop Mic" : t.audio.startMic}
                        </button>
                    </div>
                    <div className="w-full h-48 bg-black rounded-lg overflow-hidden relative">
                        <canvas
                            ref={canvasRef}
                            width={800}
                            height={192}
                            className="w-full h-full"
                        />
                        {!isMicActive && (
                            <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                                {t.audio.micInstruction}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
