import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AppProvider } from "@/context/AppContext";
import { DiscountProvider, useDiscounts } from "@/context/DiscountContext";
import { gamesData } from "@/data/games";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import SplashScreen from "@/components/SplashScreen";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Profile from "./pages/Profile";
import Social from "./pages/Social";
import Experience from "./pages/Experience";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import GameDetails from "./pages/GameDetails";
import Consoles from "./pages/Consoles";
import Chat from "./pages/Chat";
import DebugLogger from "@/components/DebugLogger";

const queryClient = new QueryClient();

// Discount scheduler — fires a toast every 15s, discount lasts 30s once activated
function DiscountScheduler() {
  const { applyDiscount, clearPendingDiscount, startDiscountTimer } = useDiscounts();
  const navigate = useNavigate();
  const lastGameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const fireDiscount = () => {
      // Clear previous un-activated discount if still running.
      // clearPendingDiscount safely checks the latest state to ensure we
      // only clear it if the user hasn't activated it (expiresAt === null).
      if (lastGameIdRef.current !== null) {
        clearPendingDiscount(lastGameIdRef.current);
      }

      // Pick a random game and a random discount %
      const game = gamesData[Math.floor(Math.random() * gamesData.length)];
      const pct = [10, 15, 20, 25, 30, 40][Math.floor(Math.random() * 6)];

      const discountedPrice = Math.round(game.price * (1 - pct / 100));

      // Null means pending — timer starts when user clicks
      const discount = { gameId: game.id, originalPrice: game.price, discountedPrice, pct, expiresAt: null };
      applyDiscount(discount);
      lastGameIdRef.current = game.id;

      // Fire Sonner toast
      toast.custom(
        (t) => (
          <div
            style={{
              background: 'hsl(220 20% 10%)',
              border: '1px solid hsl(200 100% 40% / 0.5)',
              borderRadius: '16px',
              padding: '14px 18px',
              boxShadow: '0 0 24px hsl(200 100% 50% / 0.25), 0 8px 32px hsl(0 0% 0% / 0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              minWidth: '300px',
              maxWidth: '360px',
              cursor: 'pointer',
            }}
            onClick={() => {
              startDiscountTimer(game.id);
              navigate(`/store/${game.id}`);
              toast.dismiss(t);
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'hsl(200 100% 60%)',
                }}
              >
                ⚡ Flash Deal
              </span>
              <span
                style={{
                  background: 'hsl(142 70% 35%)',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: 700,
                  fontFamily: 'Rajdhani, sans-serif',
                  padding: '2px 8px',
                  borderRadius: '999px',
                }}
              >
                -{pct}%
              </span>
            </div>
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '15px', color: 'white' }}>
              {game.title}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 700,
                  fontSize: '20px',
                  color: 'hsl(142 70% 55%)',
                }}
              >
                ₹{discountedPrice.toLocaleString()}
              </span>
              <span
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '14px',
                  color: 'hsl(215 15% 50%)',
                  textDecoration: 'line-through',
                }}
              >
                ₹{game.price.toLocaleString()}
              </span>
            </div>
            <div
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontWeight: 700,
                fontSize: '12px',
                color: 'hsl(200 100% 60%)',
                letterSpacing: '0.05em',
              }}
            >
              Only 30s once activated — Tap to claim →
            </div>
          </div>
        ),
        { duration: 8000 },
      );
    };

    // Fire first discount after 15s, then repeat every 15s
    const interval = setInterval(fireDiscount, 15_000);
    return () => {
      clearInterval(interval);
      if (lastGameIdRef.current !== null) {
        clearPendingDiscount(lastGameIdRef.current);
      }
    };
  }, [applyDiscount, clearPendingDiscount, startDiscountTimer, navigate]);

  return null;
}

// Inner shell — lives inside BrowserRouter so it can read location
function AppShell() {
  const location = useLocation();
  // Show splash only once on initial page load
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="noise-overlay min-h-screen bg-background">
      <DebugLogger />
      <DiscountScheduler />
      {/* Splash overlay — sits on top of everything when active */}
      {showSplash && (
        <SplashScreen onDone={() => setShowSplash(false)} />
      )}
      <Navbar />
      <CartSidebar />
      <main className="pb-20 md:pb-0 pl-0 md:pl-[80px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/store/:id" element={<GameDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/social" element={<Social />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/news" element={<News />} />
              <Route path="/consoles" element={<Consoles />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <DiscountProvider>
          <Toaster />
          <Sonner position="bottom-right" richColors={false} />
          <BrowserRouter>
            <AppShell />
          </BrowserRouter>
        </DiscountProvider>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
