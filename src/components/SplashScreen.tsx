import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PS_SYMBOLS = ["△", "○", "✕", "□"];
const PS_SYMBOL_COLORS = [
    "text-green-400",
    "text-red-400",
    "text-blue-400",
    "text-pink-300",
];

const LOADING_TIPS = [
    "Syncing trophy data...",
    "Loading PlayStation Network...",
    "Initializing game library...",
    "Connecting to your squad...",
];

export default function SplashScreen({ onDone }: { onDone: () => void }) {
    const [progress, setProgress] = useState(0);
    const [tipIndex, setTipIndex] = useState(0);
    const [psSymbol, setPsSymbol] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Progress bar: ramp to 100 over ~2000ms
        const interval = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Accelerate near end
                return p < 80 ? p + 2.5 : p + 5;
            });
        }, 50);

        // Cycle loading tips
        const tipTimer = setInterval(() => {
            setTipIndex((i) => (i + 1) % LOADING_TIPS.length);
        }, 600);

        // Cycle PS symbols
        const symTimer = setInterval(() => {
            setPsSymbol((s) => (s + 1) % PS_SYMBOLS.length);
        }, 400);

        // Fade out + hand off after 2.5s
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(onDone, 500);
        }, 2500);

        return () => {
            clearInterval(interval);
            clearInterval(tipTimer);
            clearInterval(symTimer);
            clearTimeout(fadeTimer);
        };
    }, [onDone]);

    // Deterministic particles
    const particles = Array.from({ length: 30 }, (_, i) => ({
        left: `${(i * 37 + 11) % 100}%`,
        top: `${(i * 53 + 7) % 100}%`,
        size: `${6 + (i % 4) * 3}px`,
        delay: `${(i * 0.15) % 2}s`,
        duration: `${2.5 + (i % 4) * 0.5}s`,
        symbol: PS_SYMBOLS[i % 4],
        color: PS_SYMBOL_COLORS[i % 4],
    }));

    return (
        <AnimatePresence>
            {!fadeOut && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
                    style={{
                        background:
                            "radial-gradient(ellipse at 50% 40%, hsl(215 80% 10%) 0%, hsl(220 20% 4%) 70%)",
                    }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Animated background grid lines */}
                    <div
                        className="absolute inset-0 opacity-5"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(0deg, hsl(200 100% 50%) 0px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, hsl(200 100% 50%) 0px, transparent 1px, transparent 60px)",
                        }}
                    />

                    {/* Floating PS symbol particles */}
                    {particles.map((p, i) => (
                        <motion.div
                            key={i}
                            className={`absolute font-bold opacity-10 select-none pointer-events-none ${p.color}`}
                            style={{
                                left: p.left,
                                top: p.top,
                                fontSize: p.size,
                                animationDelay: p.delay,
                            }}
                            animate={{ y: [-8, 8, -8], opacity: [0.05, 0.15, 0.05] }}
                            transition={{
                                duration: parseFloat(p.duration),
                                repeat: Infinity,
                                delay: parseFloat(p.delay),
                            }}
                        >
                            {p.symbol}
                        </motion.div>
                    ))}

                    {/* Center glow */}
                    <div
                        className="absolute"
                        style={{
                            width: "500px",
                            height: "500px",
                            background:
                                "radial-gradient(circle, hsl(200 100% 50% / 0.12) 0%, transparent 70%)",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            borderRadius: "50%",
                        }}
                    />

                    {/* Main content */}
                    <div className="relative z-10 flex flex-col items-center gap-8">

                        {/* PS button ring with spinning symbol */}
                        <div className="relative flex items-center justify-center">
                            {/* Outer spinning ring */}
                            <motion.div
                                className="rounded-full"
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    border: "2px solid transparent",
                                    borderTopColor: "hsl(200 100% 50%)",
                                    borderRightColor: "hsl(200 100% 50% / 0.3)",
                                    boxShadow: "0 0 30px hsl(200 100% 50% / 0.4)",
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                            {/* Inner circle */}
                            <div
                                className="absolute rounded-full flex items-center justify-center"
                                style={{
                                    width: "90px",
                                    height: "90px",
                                    background: "hsl(220 30% 10%)",
                                    border: "1px solid hsl(200 100% 50% / 0.3)",
                                }}
                            >
                                {/* Animated PS symbol */}
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={psSymbol}
                                        className={`font-bold text-4xl ${PS_SYMBOL_COLORS[psSymbol]}`}
                                        style={{ textShadow: "0 0 16px currentColor" }}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {PS_SYMBOLS[psSymbol]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Brand text */}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <h1
                                className="font-rajdhani font-bold text-5xl tracking-[0.3em] mb-1"
                                style={{
                                    background:
                                        "linear-gradient(135deg, hsl(200 100% 70%), hsl(200 100% 50%), hsl(230 100% 70%))",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    textShadow: "none",
                                }}
                            >
                                PLAYSTATION
                            </h1>
                            <p
                                className="font-inter text-xs tracking-[0.5em] uppercase"
                                style={{ color: "hsl(200 100% 60% / 0.6)" }}
                            >
                                PlayStation Experience
                            </p>
                        </motion.div>

                        {/* XP / Loading bar */}
                        <motion.div
                            className="w-72 flex flex-col gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="flex justify-between text-xs font-rajdhani font-semibold">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={tipIndex}
                                        className="text-ps-secondary"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ color: "hsl(200 60% 60%)" }}
                                    >
                                        {LOADING_TIPS[tipIndex]}
                                    </motion.span>
                                </AnimatePresence>
                                <span style={{ color: "hsl(200 100% 60%)" }}>
                                    {Math.floor(progress)}%
                                </span>
                            </div>
                            <div
                                className="w-full h-1.5 rounded-full"
                                style={{ background: "hsl(215 30% 18%)" }}
                            >
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${progress}%`,
                                        background:
                                            "linear-gradient(90deg, hsl(200 100% 40%), hsl(200 100% 65%))",
                                        boxShadow: "0 0 10px hsl(200 100% 50% / 0.7)",
                                    }}
                                    transition={{ duration: 0.05 }}
                                />
                            </div>
                        </motion.div>

                        {/* PS symbol legend */}
                        <motion.div
                            className="flex gap-5 items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            {PS_SYMBOLS.map((sym, i) => (
                                <span
                                    key={sym}
                                    className={`font-bold text-lg ${PS_SYMBOL_COLORS[i]} opacity-50`}
                                    style={{ textShadow: "0 0 8px currentColor" }}
                                >
                                    {sym}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
