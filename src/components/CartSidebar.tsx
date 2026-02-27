import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';

export default function CartSidebar() {
  const { cart, removeFromCart, cartOpen, setCartOpen } = useApp();
  const total = cart.reduce((s, i) => s + i.price, 0);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-[900] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm z-[901] ps-glass border-l border-ps-border flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-ps-border">
              <h2 className="font-rajdhani font-bold text-2xl">Cart ({cart.length})</h2>
              <button onClick={() => setCartOpen(false)} className="text-ps-secondary hover:text-foreground text-xl">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center text-ps-secondary py-12">
                  <div className="text-5xl mb-3">🛒</div>
                  <p className="font-rajdhani">Your cart is empty</p>
                </div>
              ) : cart.map(item => (
                <div key={item.id} className="flex gap-3 p-3 bg-ps-surface-2 rounded-xl border border-ps-border">
                  <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-rajdhani font-semibold text-sm truncate">{item.title}</p>
                    <p className="text-ps-neon font-bold">₹{item.price.toLocaleString()}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-ps-secondary hover:text-red-400 transition-colors text-lg">✕</button>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="p-4 border-t border-ps-border space-y-3">
                <div className="flex justify-between font-rajdhani font-bold text-xl">
                  <span>Total</span>
                  <span className="text-ps-neon">₹{total.toLocaleString()}</span>
                </div>
                <motion.button
                  className="w-full py-3 bg-ps-blue rounded-xl font-rajdhani font-bold text-lg tracking-wide"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 20px hsl(200 100% 50% / 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setCartOpen(false);
                    alert('✅ Order placed successfully!');
                  }}
                >
                  Checkout · ₹{total.toLocaleString()}
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
