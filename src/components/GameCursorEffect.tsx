import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Burst {
    id: number;
    x: number;
    y: number;
}

// PlayStation face-button symbols, randomly picked for each burst particle
const PS_SYMBOLS = ["△", "○", "✕", "□"];
const SYMBOL_COLORS: Record<string, string> = {
    "△": "#3ab4f2",
    "○": "#f24e3a",
    "✕": "#7ab3f2",
    "□": "#e97af2",
};

/** Renders one particle that flies outward from the burst origin */
function Particle({
    symbol,
    angle,
    color,
}: {
    symbol: string;
    angle: number;
    color: string;
}) {
    const dist = 48 + Math.random() * 32;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;

    return (
        <motion.span
            className="pointer-events-none absolute select-none font-bold"
            style={{
                fontSize: "18px",
                color,
                textShadow: `0 0 8px ${color}`,
                left: 0,
                top: 0,
                lineHeight: 1,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: dx, y: dy, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        />
    );
}

/** The central gamepad icon that pops + fades */
function GamepadPop() {
    return (
        <motion.div
            className="pointer-events-none absolute"
            style={{ left: -18, top: -18 }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Ripple ring */}
            <div
                style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "2px solid hsl(200 100% 60%)",
                    boxShadow: "0 0 12px hsl(200 100% 60% / 0.8)",
                }}
            />
        </motion.div>
    );
}

export default function GameCursorEffect() {
    const [bursts, setBursts] = useState<Burst[]>([]);

    const handleContextMenu = useCallback((e: MouseEvent) => {
        e.preventDefault(); // block browser menu
        const id = Date.now();
        setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
        // Auto-remove after animation ends
        setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== id)), 900);
    }, []);

    useEffect(() => {
        window.addEventListener("contextmenu", handleContextMenu);
        return () => window.removeEventListener("contextmenu", handleContextMenu);
    }, [handleContextMenu]);

    return (
        <AnimatePresence>
            {bursts.map((burst) => {
                // Generate 8 particles spread evenly in a circle
                const particles = Array.from({ length: 8 }, (_, i) => {
                    const symbol = PS_SYMBOLS[i % PS_SYMBOLS.length];
                    return {
                        symbol,
                        angle: (i / 8) * Math.PI * 2,
                        color: SYMBOL_COLORS[symbol],
                    };
                });

                return (
                    <div
                        key={burst.id}
                        className="pointer-events-none fixed z-[9999]"
                        style={{ left: burst.x, top: burst.y }}
                    >
                        <GamepadPop />
                        {particles.map((p, i) => (
                            <Particle key={i} {...p} />
                        ))}
                    </div>
                );
            })}
        </AnimatePresence>
    );
}
