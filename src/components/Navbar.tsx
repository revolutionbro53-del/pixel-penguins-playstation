import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';

const navItems = [
  { path: '/', label: 'Home', icon: '⊞' },
  { path: '/store', label: 'Store', icon: '🛒' },
  { path: '/social', label: 'Social', icon: '👥' },
  { path: '/experience', label: 'XP', icon: '⚡' },
  { path: '/profile', label: 'Profile', icon: '👤' },
];

export default function Navbar() {
  const location = useLocation();
  const { user, cart, setCartOpen } = useApp();

  return (
    <>
      {/* Desktop Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 ps-glass border-b border-ps-border hidden md:flex items-center justify-between px-8 h-16">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-2xl">🎮</span>
          <span className="font-rajdhani font-bold text-2xl tracking-wider">
            <span className="text-foreground">Play</span>
            <span className="text-ps-neon">Station</span>
          </span>
          <span className="text-ps-secondary font-inter text-xs ml-1 tracking-widest uppercase">Next Level</span>
        </NavLink>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navItems.slice(0, 4).map(item => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink key={item.path} to={item.path}>
                <motion.div
                  className={`relative px-5 py-2 font-rajdhani font-semibold text-base tracking-wide transition-colors ${
                    isActive ? 'text-ps-neon' : 'text-ps-secondary hover:text-foreground'
                  }`}
                  whileHover={{ y: -1 }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-ps-neon rounded-full"
                      style={{ boxShadow: '0 0 8px hsl(200 100% 50%)' }}
                    />
                  )}
                </motion.div>
              </NavLink>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <button className="relative text-ps-secondary hover:text-foreground transition-colors">
            <span className="text-xl">🔔</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">3</span>
          </button>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-ps-secondary hover:text-foreground transition-colors"
          >
            <span className="text-xl">🛒</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-ps-neon rounded-full text-[10px] flex items-center justify-center text-black font-bold">
                {cart.length}
              </span>
            )}
          </button>

          {/* PS Plus badge */}
          <div className="px-2 py-0.5 rounded-full border border-ps-gold text-ps-gold font-rajdhani text-xs font-bold tracking-wide" style={{ boxShadow: '0 0 8px hsl(51 100% 50% / 0.3)' }}>
            PS PLUS
          </div>

          {/* Avatar */}
          <NavLink to="/profile">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-ps-neon" style={{ boxShadow: '0 0 8px hsl(200 100% 50% / 0.5)' }}>
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarSeed}`}
                alt="Avatar"
                className="w-full h-full object-cover bg-ps-surface-2"
              />
            </div>
          </NavLink>
        </div>
      </nav>

      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden ps-glass border-t border-ps-border flex items-center justify-around px-2 py-2">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink key={item.path} to={item.path} className="flex-1">
              <motion.div
                className={`flex flex-col items-center gap-0.5 py-1 rounded-lg transition-colors ${
                  isActive ? 'text-ps-neon' : 'text-ps-secondary'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-rajdhani text-[10px] font-semibold">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-dot"
                    className="w-1 h-1 rounded-full bg-ps-neon"
                  />
                )}
              </motion.div>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
