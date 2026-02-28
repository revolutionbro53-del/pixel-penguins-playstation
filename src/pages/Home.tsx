import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useApp } from "@/context/AppContext";
import Modal from "@/components/Modal";
import { NavLink } from "react-router-dom";
import { gamesData } from "@/data/games";
import {
  TrophyIcon,
  MedalGoldIcon,
  MedalSilverIcon,
  MedalBronzeIcon,
  PlatinumIcon,
} from "@/components/icons";

const heroGames = [
  {
    id: 1,
    title: "Spider-Man 2",
    genre: "Action Adventure",
    rating: 9.3,
    image:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&q=80",
    description: "Swing through Marvel's New York as both Peter and Miles.",
  },
  {
    id: 2,
    title: "God of War: Ragnarök",
    genre: "Action RPG",
    rating: 9.5,
    image: "/god-of-war.jpg",
    description: "Kratos and Atreus face the Norse apocalypse together.",
  },
  {
    id: 3,
    title: "Gran Turismo 7",
    genre: "Racing Sim",
    rating: 8.7,
    image: "/gt7.jpg",
    description: "The most authentic racing experience on PlayStation.",
  },
];

const continuePlaying = [
  {
    id: 1,
    title: "God of War",
    image: "/god-of-war.jpg",
    progress: 72,
    lastPlayed: "2 hours ago",
  },
  {
    id: 2,
    title: "Spider-Man 2",
    image:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80",
    progress: 44,
    lastPlayed: "Yesterday",
  },
  {
    id: 3,
    title: "Horizon FW",
    image: "/horizon-fw.png",
    progress: 88,
    lastPlayed: "3 days ago",
  },
  {
    id: 4,
    title: "GT7",
    image: "/gt7.jpg",
    progress: 31,
    lastPlayed: "Last week",
  },
];

const aiPicks = [
  {
    id: 1,
    title: "Sekiro",
    image:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&q=80",
    why: "Because you loved God of War",
    genre: "Action",
  },
  {
    id: 2,
    title: "Bloodborne",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
    why: "Top-rated in your genre",
    genre: "Action RPG",
  },
  {
    id: 3,
    title: "Ghost of Tsushima",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80",
    why: "96% match with your taste",
    genre: "Open World",
  },
  {
    id: 4,
    title: "Returnal",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80",
    why: "PS Exclusive with high replayability",
    genre: "Roguelike",
  },
];

const trophies = [
  {
    id: 1,
    name: "Platinum Soul",
    game: "Elden Ring",
    type: "platinum",
    date: "Jan 12",
  },
  {
    id: 2,
    name: "100% Complete",
    game: "Spider-Man 2",
    type: "gold",
    date: "Jan 8",
  },
  {
    id: 3,
    name: "Speed Runner",
    game: "God of War",
    type: "silver",
    date: "Dec 28",
  },
  {
    id: 4,
    name: "First Blood",
    game: "GT7",
    type: "bronze",
    date: "Dec 20",
  },
];

const newsTicker =
  "Spider-Man 2 DLC Out Now · PS Plus February Games Revealed · GT7 Update 1.42 · Ghost of Tsushima PC Port Confirmed · PlayStation 6 Teaser Leaked · Horizon 3 in Development · Bloodborne Remaster Announced · PSVR2 Price Drop Incoming ·";

export default function Home() {
  const { user, friends } = useApp();
  const [joinModal, setJoinModal] = useState<string | null>(null);
  const [trophyModal, setTrophyModal] = useState(false);
  const [wallpaper, setWallpaper] = useState<string | null>(null);

  // Greeting logic
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  }

  // Load wallpaper from localStorage on mount
  useEffect(() => {
    const savedWallpaper = localStorage.getItem("psWallpaper");
    if (savedWallpaper) {
      setWallpaper(savedWallpaper);
    }

    // Listen for wallpaper changes from navbar
    const handleWallpaperChange = (e: any) => {
      setWallpaper(e.detail);
    };
    window.addEventListener("wallpaperChange", handleWallpaperChange);
    return () =>
      window.removeEventListener("wallpaperChange", handleWallpaperChange);
  }, []);

  const trophyGlow: Record<string, string> = {
    platinum: "0 0 12px hsl(270 60% 60% / 0.7)",
    gold: "0 0 12px hsl(51 100% 50% / 0.7)",
    silver: "0 0 12px hsl(0 0% 75% / 0.7)",
    bronze: "0 0 12px hsl(25 60% 50% / 0.7)",
  };

  const trophyColor: Record<string, string> = {
    platinum: "text-purple-400",
    gold: "text-ps-gold",
    silver: "text-gray-300",
    bronze: "text-amber-600",
  };

  const getTrophyIcon = (type: string) => {
    switch (type) {
      case "platinum":
        return PlatinumIcon;
      case "gold":
        return MedalGoldIcon;
      case "silver":
        return MedalSilverIcon;
      case "bronze":
        return MedalBronzeIcon;
      default:
        return TrophyIcon;
    }
  };

  // Scroll tracking for greeting fade
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const greetingOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* Hero Section - Section 1 */}
      <div
        ref={heroRef}
        className="relative h-screen w-full flex items-center justify-center snap-start overflow-hidden"
      >
        <motion.img
          src={wallpaper || "/IMAGE.png"}
          alt="PlayStation Background"
          className="fixed inset-0 w-full h-full object-cover z-0"
          style={{
            filter: "brightness(0.85)",
            opacity: bgOpacity,
            pointerEvents: "none",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
        <motion.div
          className="relative z-10 text-center"
          style={{ opacity: greetingOpacity }}
        >
          <h1 className="font-rajdhani font-bold text-4xl md:text-6xl text-foreground mb-3 drop-shadow-lg">
            Good {getGreeting()}, {user.username}
          </h1>
          <p className="text-ps-secondary font-inter text-xl md:text-2xl mb-2 drop-shadow">
            What do you want to play today?
          </p>
        </motion.div>
      </div>

      {/* Content Section - Section 2 */}
      <div className="relative z-10 w-full snap-start px-4 md:px-8 lg:px-20 space-y-10 py-8 bg-background md:pt-16 pb-20 md:pb-0">
        {/* Continue Playing */}
        <section>
          <h2 className="font-rajdhani font-bold text-2xl mb-4 text-foreground">
            Continue Playing
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {continuePlaying.map((game) => (
              <motion.div
                key={game.id}
                className="ps-card flex-shrink-0 w-48 overflow-hidden"
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-28 object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="font-rajdhani font-semibold text-sm mb-1 truncate">
                    {game.title}
                  </p>
                  <div className="w-full h-1 bg-ps-border rounded-full mb-1">
                    <div
                      className="h-full bg-ps-neon rounded-full"
                      style={{
                        width: `${game.progress}%`,
                        boxShadow: "0 0 6px hsl(200 100% 50% / 0.6)",
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-ps-secondary">
                    <span>{game.progress}%</span>
                    <span>{game.lastPlayed}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── New in Store ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-rajdhani font-bold text-2xl text-foreground">
              New in Store
            </h2>
            <NavLink
              to="/store"
              className="text-ps-neon font-rajdhani font-semibold text-sm hover:underline"
            >
              See all →
            </NavLink>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {gamesData.slice(0, 6).map((game) => (
              <NavLink key={game.id} to={`/store/${game.id}`}>
                <motion.div
                  className="flex-shrink-0 w-44 rounded-2xl overflow-hidden ps-card group cursor-pointer"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    {game.exclusive && (
                      <span
                        className="absolute top-2 left-2 text-[10px] font-rajdhani font-bold px-2 py-0.5 rounded text-white"
                        style={{ background: "hsl(200 100% 50%)" }}
                      >
                        PS EXCLUSIVE
                      </span>
                    )}
                    <div className="absolute bottom-2 right-2 flex items-center gap-0.5">
                      <span className="text-yellow-400 text-xs">★</span>
                      <span className="text-white text-xs font-rajdhani font-bold">
                        {game.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-rajdhani font-bold text-sm leading-tight mb-1 truncate">
                      {game.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-ps-secondary text-xs">{game.genre}</span>
                      <span
                        className="font-rajdhani font-bold text-sm"
                        style={{ color: "hsl(200 100% 60%)" }}
                      >
                        ₹{game.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </NavLink>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            {/* AI Picks */}
            <section>
              <div className="ps-card p-4 ps-gradient-border">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-ps-neon text-xl">🤖</span>
                  <div>
                    <h2 className="font-rajdhani font-bold text-xl">
                      Picked for you, {user.username}
                    </h2>
                    <p className="text-ps-secondary text-xs">
                      Powered by PlayStation AI
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {aiPicks.map((game) => (
                    <motion.div
                      key={game.id}
                      className="flex-shrink-0 w-40 group"
                      whileHover={{ y: -4 }}
                    >
                      <div className="relative rounded-xl overflow-hidden mb-2">
                        <img
                          src={game.image}
                          alt={game.title}
                          className="w-full h-24 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="relative group/why">
                            <span className="bg-ps-blue/30 border border-ps-blue text-ps-neon text-[10px] px-2 py-0.5 rounded-full">
                              WHY THIS?
                            </span>
                            <div className="absolute bottom-full left-0 mb-1 bg-ps-surface-2 border border-ps-border rounded-lg p-2 text-[11px] text-ps-secondary w-36 hidden group-hover/why:block z-10">
                              {game.why}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="font-rajdhani font-semibold text-sm">
                        {game.title}
                      </p>
                      <p className="text-ps-secondary text-[11px]">
                        {game.genre}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Trophy Showcase */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-rajdhani font-bold text-2xl">
                  Recent Trophies
                </h2>
                <button
                  onClick={() => setTrophyModal(true)}
                  className="text-ps-neon text-sm font-rajdhani"
                >
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {trophies.map((t) => {
                  const IconComponent = getTrophyIcon(t.type);
                  return (
                    <motion.div
                      key={t.id}
                      className="ps-card p-4 text-center"
                      whileHover={{ y: -3 }}
                      style={{ boxShadow: trophyGlow[t.type] }}
                    >
                      <div className="w-8 h-8 mx-auto mb-2 text-ps-neon">
                        <IconComponent />
                      </div>
                      <p
                        className={`font-rajdhani font-bold text-sm ${trophyColor[t.type]}`}
                      >
                        {t.name}
                      </p>
                      <p className="text-ps-secondary text-[11px]">{t.game}</p>
                      <p className="text-ps-secondary text-[10px]">{t.date}</p>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Friends Activity */}
          <aside className="space-y-4">
            <h2 className="font-rajdhani font-bold text-2xl">
              Friends Activity
            </h2>
            <div className="space-y-3">
              {friends.slice(0, 5).map((friend) => (
                <motion.div
                  key={friend.id}
                  className="ps-glass rounded-xl p-3 flex items-center gap-3"
                  whileHover={{ x: 3 }}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.seed}`}
                      alt={friend.name}
                      className="w-10 h-10 rounded-full bg-ps-surface-2"
                    />
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background pulse-dot ${friend.status === "ingame"
                        ? "bg-ps-success"
                        : friend.status === "online"
                          ? "bg-blue-400"
                          : friend.status === "away"
                            ? "bg-yellow-400"
                            : "bg-gray-500"
                        }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-rajdhani font-semibold text-sm">
                      {friend.name}
                    </p>
                    <p className="text-ps-secondary text-[11px] truncate">
                      {friend.currentGame ||
                        (friend.status === "online"
                          ? "Online"
                          : friend.status === "away"
                            ? "Away"
                            : "Offline")}
                    </p>
                  </div>
                  {friend.status === "ingame" && (
                    <motion.button
                      className="text-[11px] font-rajdhani font-bold text-ps-neon border border-ps-neon/30 px-2 py-1 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setJoinModal(friend.name)}
                    >
                      Join
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* News ticker removed - moved to News page */}

      {/* Join Game Modal */}
      <Modal
        isOpen={!!joinModal}
        onClose={() => setJoinModal(null)}
        title="Join Game"
      >
        <div className="text-center py-4">
          <div className="text-5xl mb-4">🎮</div>
          <p className="font-rajdhani text-xl text-foreground mb-2">
            Joining {joinModal}'s game
          </p>
          <p className="text-ps-secondary text-sm mb-6">
            You'll be matchmade into their current session.
          </p>
          <motion.button
            className="w-full py-3 bg-ps-blue rounded-xl font-rajdhani font-bold text-lg"
            whileHover={{ scale: 1.02 }}
            onClick={() => setJoinModal(null)}
          >
            ▶ Join Now
          </motion.button>
        </div>
      </Modal>

      {/* Trophy Modal */}
      <Modal
        isOpen={trophyModal}
        onClose={() => setTrophyModal(false)}
        title="Trophy Cabinet"
      >
        <div className="grid grid-cols-2 gap-3">
          {trophies.concat(trophies).map((t, i) => {
            const IconComponent = getTrophyIcon(t.type);
            return (
              <div
                key={i}
                className="ps-glass rounded-xl p-3 flex items-center gap-3"
                style={{ boxShadow: trophyGlow[t.type] }}
              >
                <div className="w-8 h-8 flex-shrink-0 text-ps-neon">
                  <IconComponent />
                </div>
                <div>
                  <p
                    className={`font-rajdhani font-bold text-sm ${trophyColor[t.type]}`}
                  >
                    {t.name}
                  </p>
                  <p className="text-ps-secondary text-[11px]">{t.game}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
