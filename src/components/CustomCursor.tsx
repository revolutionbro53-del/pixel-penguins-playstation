import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [delayed, setDelayed] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setDelayed(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.15,
        y: prev.y + (pos.y - prev.y) * 0.15,
      }));
    });
    return () => cancelAnimationFrame(id);
  }, [pos, delayed]);

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{ left: pos.x, top: pos.y }}
        animate={{ x: 0, y: 0 }}
      >
        ✕
      </motion.div>
      <motion.div
        className="fixed pointer-events-none z-[99998] w-8 h-8 rounded-full border border-ps-neon opacity-30"
        style={{
          left: delayed.x - 16,
          top: delayed.y - 16,
        }}
      />
    </>
  );
}
