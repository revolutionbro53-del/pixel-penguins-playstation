import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import CustomCursor from "@/components/CustomCursor";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Profile from "./pages/Profile";
import Social from "./pages/Social";
import Experience from "./pages/Experience";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import GameDetails from "./pages/GameDetails";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  return (
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="noise-overlay min-h-screen bg-background">
            <CustomCursor />
            <Navbar />
            <CartSidebar />
            <main className="pb-20 md:pb-0 pl-0 md:pl-[80px]">
              <AnimatedRoutes />
            </main>
          </div>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
