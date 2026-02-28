import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AppProvider } from "@/context/AppContext";
import { useState } from "react";
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

const queryClient = new QueryClient();

// Inner shell — lives inside BrowserRouter so it can read location
function AppShell() {
  const location = useLocation();
  // Show splash only once on initial page load
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="noise-overlay min-h-screen bg-background">
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
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
