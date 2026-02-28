import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useApp } from "@/context/AppContext";
import { useTheme } from "@/context/ThemeContext";
import {
  GamepadIcon,
  HomeIcon,
  StoreIcon,
  SocialIcon,
  XPIcon,
  NewsIcon,
  ProfileIcon,
  BellIcon,
  CartIcon,
  ConsolesIcon,
  CameraIcon,
} from "@/components/icons";

const navItems = [
  { path: "/", label: "Home", icon: HomeIcon },
  { path: "/store", label: "Store", icon: StoreIcon },
  { path: "/consoles", label: "Consoles", icon: ConsolesIcon },
  { path: "/social", label: "Social", icon: SocialIcon },
  { path: "/experience", label: "XP", icon: XPIcon },
  { path: "/news", label: "News", icon: NewsIcon },
  { path: "/profile", label: "Profile", icon: ProfileIcon },
];

export default function Navbar() {
  const location = useLocation();
  const { user, cart, setCartOpen } = useApp();
  const { theme, setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications
  const notifications = [
    { id: 1, text: "Spider-Man 2 is now on sale for 40% off in the PS Store!", time: "2h ago", unread: true },
    { id: 2, text: "Friend request from ArcticFox99", time: "5h ago", unread: true },
    { id: 3, text: "System software update 8.00 installed successfully.", time: "1d ago", unread: false },
    { id: 4, text: "You earned a Trophy in God of War Ragnarök: The Bear and the Wolf.", time: "2d ago", unread: false },
  ];

  const handleWallpaperUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        localStorage.setItem("psWallpaper", imageData);
        // Dispatch custom event to notify Home component
        window.dispatchEvent(
          new CustomEvent("wallpaperChange", { detail: imageData }),
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const themeOptions = [
    { value: "dark", label: "Dark", emoji: "🌑" },
    { value: "blue", label: "Blue", emoji: "🔵" },
    { value: "gold", label: "Gold", emoji: "🟡" },
    { value: "green", label: "Green", emoji: "🟢" },
  ];

  return (
    <>
      {/* Desktop Left Sidebar */}
      <nav className="group fixed left-0 top-0 h-screen z-50 ps-glass border-r border-ps-border hidden md:flex flex-col items-center w-[80px] hover:w-[280px] transition-all duration-300 py-6">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 mb-8 whitespace-nowrap"
        >
          <div className="text-ps-neon w-8 h-8 flex-shrink-0">
            <GamepadIcon />
          </div>
          <div className="hidden group-hover:flex flex-col">
            <span className="font-sst font-bold text-xl tracking-wider">
              <span className="text-foreground">Play</span>
              <span className="text-ps-neon">Station</span>
            </span>
            <span className="text-ps-secondary font-sst text-xs tracking-widest uppercase leading-none">
              Next Level
            </span>
          </div>
        </NavLink>

        {/* Nav Items */}
        <div className="flex flex-col w-full flex-1 gap-2 px-2">
          {navItems.slice(0, 6).map((item) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;
            return (
              <NavLink key={item.path} to={item.path}>
                <motion.div
                  className={`relative w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${isActive
                    ? "text-ps-neon bg-ps-surface-2"
                    : "text-ps-secondary hover:text-foreground"
                    }`}
                  whileHover={{ x: 2 }}
                  title={item.label}
                >
                  <div className="w-6 h-6 flex-shrink-0">
                    <IconComponent />
                  </div>
                  <span className="hidden group-hover:block font-sst font-semibold text-base tracking-wide whitespace-nowrap">
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-highlight"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-ps-neon rounded-r-full"
                      style={{ boxShadow: "0 0 8px hsl(200 100% 50%)" }}
                    />
                  )}
                </motion.div>
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Controls */}
        <div className="flex flex-col items-center gap-3 border-t border-ps-border pt-4 px-2 w-full">
          {/* Theme Switcher */}
          <div
            className="relative flex items-center gap-2 w-full px-2"
            title="Theme"
          >
            <select
              className="bg-ps-surface text-ps-secondary border border-ps-neon rounded-lg px-2 py-2 font-sst text-sm focus:outline-none focus:ring-2 focus:ring-ps-neon transition-colors shadow appearance-none cursor-pointer"
              style={{
                boxShadow: "0 0 8px hsl(var(--ps-neon) / 0.2)",
                backgroundImage: "none",
              }}
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              aria-label="Theme Switcher"
            >
              {themeOptions.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-ps-surface text-ps-secondary"
                >
                  {opt.emoji}
                </option>
              ))}
            </select>
            <span className="hidden group-hover:block font-sst font-semibold text-sm tracking-wide whitespace-nowrap text-ps-secondary">
              Theme
            </span>
          </div>

          {/* Change Background */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-start gap-2 text-ps-secondary hover:text-ps-neon transition-colors p-2 w-full px-2 rounded-lg"
            title="Change Background"
          >
            <div className="w-6 h-6 flex-shrink-0">
              <CameraIcon />
            </div>
            <span className="hidden group-hover:block font-sst font-semibold text-sm tracking-wide whitespace-nowrap">
              Background
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleWallpaperUpload}
            className="hidden"
          />

          {/* Notification */}
          <div className="relative w-full">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex items-center justify-start gap-2 text-ps-secondary hover:text-foreground transition-colors p-2 w-full px-2 rounded-lg"
              title="Notifications"
            >
              <div className="w-6 h-6 flex-shrink-0">
                <BellIcon />
              </div>
              <span className="hidden group-hover:block font-sst font-semibold text-sm tracking-wide whitespace-nowrap">
                Notifications
              </span>
              {/* Notification Badge indicator */}
              {notifications.some(n => n.unread) && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-ps-neon rounded-full" />
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute left-[calc(100%+16px)] bottom-0 w-80 ps-glass border border-ps-border rounded-xl shadow-2xl z-[100]"
              >
                <div className="flex items-center justify-between p-4 border-b border-ps-border bg-ps-surface-2">
                  <h3 className="font-sst font-bold text-lg text-white">Notifications</h3>
                  <span className="text-xs text-ps-neon cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b border-ps-border/50 hover:bg-ps-surface transition-colors cursor-pointer flex gap-3 ${notif.unread ? 'bg-ps-surface/30' : ''}`}
                    >
                      <div className="mt-1">
                        {notif.unread ? (
                          <div className="w-2 h-2 rounded-full bg-ps-neon shadow-[0_0_8px_hsl(200,100%,50%)]" />
                        ) : (
                          <div className="w-2 h-2 rounded-full border border-ps-secondary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-sst text-sm leading-snug ${notif.unread ? 'text-white' : 'text-gray-300'}`}>
                          {notif.text}
                        </p>
                        <p className="font-rajdhani text-xs text-ps-secondary mt-1">
                          {notif.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center justify-start gap-2 text-ps-secondary hover:text-foreground transition-colors p-2 w-full px-2 rounded-lg"
            title="Cart"
          >
            <div className="w-6 h-6 flex-shrink-0">
              <CartIcon />
            </div>
            <span className="hidden group-hover:block font-sst font-semibold text-sm tracking-wide whitespace-nowrap">
              Cart
            </span>
            {cart.length > 0 && (
              <span className="absolute top-2 right-2 w-3 h-3 bg-ps-neon rounded-full text-[8px] flex items-center justify-center text-black font-bold">
                {cart.length}
              </span>
            )}
          </button>

          {/* Avatar and PS Plus Row */}
          <NavLink
            to="/profile"
            className="flex items-center justify-start gap-2 w-full px-2 rounded-lg transition-colors hover:bg-ps-surface-2"
            title="Profile"
          >
            <div
              className="w-10 h-10 rounded-lg overflow-hidden border-2 border-ps-neon flex-shrink-0"
              style={{ boxShadow: "0 0 8px hsl(200 100% 50% / 0.5)" }}
            >
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarSeed}`}
                alt="Avatar"
                className="w-full h-full object-cover bg-ps-surface-2"
              />
            </div>
            <span className="hidden group-hover:block font-sst font-semibold text-sm tracking-wide whitespace-nowrap">
              Profile
            </span>

            {/* PS Plus badge */}
            <div
              className="hidden group-hover:block ml-auto px-2 py-1 rounded-lg border border-ps-gold text-ps-gold font-sst text-xs font-bold tracking-wide text-center"
              style={{ boxShadow: "0 0 8px hsl(51 100% 50% / 0.3)" }}
              title="PS Plus"
            >
              PS+
            </div>
          </NavLink>
        </div>
      </nav>

      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden ps-glass border-t border-ps-border flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;
          return (
            <NavLink key={item.path} to={item.path} className="flex-1">
              <motion.div
                className={`flex flex-col items-center gap-0.5 py-1 rounded-lg transition-colors ${isActive ? "text-ps-neon" : "text-ps-secondary"
                  }`}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-5 h-5">
                  <IconComponent />
                </div>
                <span className="font-sst text-[10px] font-semibold">
                  {item.label}
                </span>
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
