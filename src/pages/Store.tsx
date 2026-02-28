import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import Modal from '@/components/Modal';
import Toast from '@/components/Toast';
import { useNavigate } from 'react-router-dom';
import { gamesData } from '@/data/games';

const genres = ['All', 'Action', 'RPG', 'Sports', 'Horror', 'Indie', 'PS Exclusive'];

const psTiers = [
  { name: 'Essential', price: 499, features: ['Online Multiplayer', '2–3 Monthly Games', 'Exclusive Discounts', 'Cloud Saves (100GB)', 'Share Play'] },
  { name: 'Extra', price: 749, features: ['Everything in Essential', 'Game Catalog (400+ titles)', 'PS4 & PS5 games', 'Early Access Trials', 'Ubisoft+ Classics'] },
  { name: 'Premium', price: 999, features: ['Everything in Extra', 'PS1/PS2/PS3 Classics', 'Game Trials', 'Cloud Streaming', 'Exclusive PS Classics'] },
];

export default function Store() {
  const { addToCart, setCartOpen } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');
  const [activeTier, setActiveTier] = useState(1);
  const [countdown, setCountdown] = useState({ h: 23, m: 47, s: 12 });
  const [psModal, setPsModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setCountdown(prev => {
        let { h, m, s } = prev;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(g => {
      const matchSearch = g.title.toLowerCase().includes(search.toLowerCase());
      const matchGenre = activeGenre === 'All' || g.genre === activeGenre || (activeGenre === 'PS Exclusive' && g.exclusive);
      return matchSearch && matchGenre;
    });
  }, [search, activeGenre]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const handleAddToCart = (game: typeof gamesData[0]) => {
    addToCart({ id: game.id, title: game.title, price: game.price, image: game.image });
    showToast(`${game.title} added to cart`);
    setCartOpen(true);
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-20 px-4 md:px-8 lg:px-20">
      <Toast message={toastMsg} visible={toastVisible} />

      {/* Header */}
      <div className="mb-6 pt-4">
        <h1 className="font-rajdhani font-bold text-4xl mb-1">PS Store</h1>
        <p className="text-ps-secondary font-inter text-sm">Curated. Exclusive. Yours.</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ps-secondary">🔍</span>
          <input
            type="text"
            placeholder="Search games..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full ps-glass border border-ps-border rounded-xl pl-9 pr-4 py-3 text-foreground placeholder-ps-secondary font-inter text-sm focus:border-ps-neon focus:outline-none transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {genres.map(g => (
            <motion.button
              key={g}
              onClick={() => setActiveGenre(g)}
              className={`px-4 py-2 rounded-xl font-rajdhani font-semibold text-sm transition-all ${activeGenre === g
                ? 'bg-ps-blue text-foreground border border-ps-neon'
                : 'bg-ps-surface-2 border border-ps-border text-ps-secondary hover:text-foreground'
                }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={activeGenre === g ? { boxShadow: '0 0 12px hsl(200 100% 50% / 0.3)' } : {}}
            >
              {g}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Deal of the Day */}
      <motion.div
        className="relative overflow-hidden rounded-2xl mb-8 border border-ps-border"
        whileHover={{ scale: 1.005 }}
      >
        <div className="relative h-48 md:h-64">
          <img src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=1200&q=80" className="w-full h-full object-cover" alt="Deal" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 md:px-12">
            <div>
              <span className="bg-red-500 text-white text-xs font-rajdhani font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                🔥 Deal of the Day
              </span>
              <h3 className="font-rajdhani font-bold text-3xl md:text-4xl mb-1">DualSense Controller Bundle</h3>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-ps-secondary line-through text-lg">₹5,999</span>
                <span className="text-ps-success font-bold text-2xl">₹3,999</span>
                <span className="bg-ps-success/20 text-ps-success text-sm px-2 py-0.5 rounded-full font-bold">-33%</span>
              </div>
              <div className="flex items-center gap-2 font-rajdhani font-bold text-ps-neon text-xl">
                ⏱ {pad(countdown.h)}:{pad(countdown.m)}:{pad(countdown.s)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Game Grid */}
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {filteredGames.map(game => (
            <motion.div
              key={game.id}
              className="ps-card group overflow-hidden cursor-pointer"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -4, boxShadow: '0 0 24px hsl(200 100% 50% / 0.2), 0 8px 32px hsl(0 0% 0% / 0.4)' }}
              onClick={() => navigate(`/store/${game.id}`)}
            >
              <div className="relative overflow-hidden">
                <img src={game.image} alt={game.title} className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105" />
                {game.exclusive && (
                  <span className="absolute top-2 left-2 bg-ps-blue text-white text-[11px] font-rajdhani font-bold px-2 py-0.5 rounded-lg tracking-wide">
                    PS EXCLUSIVE
                  </span>
                )}
                <motion.button
                  className="absolute bottom-0 left-0 right-0 py-3 bg-ps-blue font-rajdhani font-bold text-sm tracking-wide translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(game);
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  🛒 Add to Cart
                </motion.button>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-rajdhani font-bold text-base flex-1">{game.title}</h3>
                  <span className="text-[11px] bg-ps-surface-2 border border-ps-border text-ps-secondary px-2 py-0.5 rounded-lg ml-2 flex-shrink-0">{game.genre}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className={star <= Math.round(game.rating) ? 'text-ps-gold text-xs' : 'text-ps-secondary text-xs'}>★</span>
                  ))}
                  <span className="text-ps-secondary text-[11px] ml-1">{game.rating}</span>
                </div>
                <p className="font-rajdhani font-bold text-ps-neon text-lg">₹{game.price.toLocaleString()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* PS Plus Section */}
      <section>
        <div className="mb-6">
          <h2 className="font-rajdhani font-bold text-3xl">PS Plus — Unlock More</h2>
          <p className="text-ps-secondary font-inter text-sm">Choose the plan that matches your game.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {psTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className={`relative rounded-2xl p-6 border cursor-pointer transition-all ${activeTier === i ? 'ps-gradient-border' : 'border-ps-border'
                }`}
              style={{
                background: 'hsl(240 14% 8%)',
                ...(activeTier === i ? { boxShadow: '0 0 24px hsl(200 100% 50% / 0.2)' } : {}),
              }}
              onClick={() => setActiveTier(i)}
              whileHover={{ y: -3 }}
            >
              {activeTier === i && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-ps-neon" style={{ boxShadow: '0 0 8px hsl(200 100% 50%)' }} />
              )}
              <div className="mb-1">
                <span className="text-ps-secondary text-[11px] font-rajdhani tracking-widest uppercase">PS Plus</span>
                <h3 className="font-rajdhani font-bold text-2xl">{tier.name}</h3>
              </div>
              <p className="font-rajdhani font-bold text-ps-gold text-3xl mb-4">
                ₹{tier.price}<span className="text-ps-secondary text-sm font-inter">/mo</span>
              </p>
              <ul className="space-y-2 mb-6">
                {tier.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-ps-secondary">
                    <span className="text-ps-success">✓</span>{f}
                  </li>
                ))}
              </ul>
              <motion.button
                className={`w-full py-2.5 rounded-xl font-rajdhani font-bold text-sm ${activeTier === i ? 'bg-ps-blue text-white' : 'border border-ps-border text-ps-secondary hover:text-foreground'
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={e => { e.stopPropagation(); setPsModal(true); }}
              >
                Subscribe Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      <Modal isOpen={psModal} onClose={() => setPsModal(false)} title="Subscribe to PS Plus">
        <div className="text-center py-4">
          <div className="text-5xl mb-4">⭐</div>
          <p className="font-rajdhani text-xl mb-2">You're subscribing to <span className="text-ps-gold">{psTiers[activeTier].name}</span></p>
          <p className="text-ps-secondary text-sm mb-2">₹{psTiers[activeTier].price}/month — cancel anytime</p>
          <p className="text-ps-secondary text-sm mb-6">First month free for new subscribers.</p>
          <motion.button
            className="w-full py-3 bg-ps-gold text-black rounded-xl font-rajdhani font-bold text-lg"
            whileHover={{ scale: 1.02 }}
            onClick={() => { setPsModal(false); showToast('Subscribed to PS Plus!'); }}
          >
            Confirm Subscription
          </motion.button>
        </div>
      </Modal>
    </div>
  );
}
