import { motion } from 'framer-motion';

interface ToastProps {
  message: string;
  visible: boolean;
}

export default function Toast({ message, visible }: ToastProps) {
  return (
    <motion.div
      className="fixed top-20 right-4 z-[2000] ps-glass border border-ps-neon rounded-xl px-4 py-3 font-rajdhani font-semibold text-ps-neon text-sm"
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 50, scale: visible ? 1 : 0.9 }}
      style={{ boxShadow: visible ? '0 0 20px hsl(200 100% 50% / 0.3)' : 'none' }}
    >
      ✓ {message}
    </motion.div>
  );
}
