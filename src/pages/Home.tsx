import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import Modal from '@/components/Modal';

const heroGames = [
  {
    id: 1,
    title: "Spider-Man 2",
    genre: "Action Adventure",
    rating: 9.3,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=80",
    description: "Swing through Marvel's New York as both Peter and Miles."
  },
  {
    id: 2,
    title: "God of War: Ragnarök",
    genre: "Action RPG",
    rating: 9.5,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=80",
    description: "Kratos and Atreus face the Norse apocalypse together."
  },
  {
    id: 3,
    title: "Gran Turismo 7",
    genre: "Racing Sim",
    rating: 8.7,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80",
    description: "The most authentic racing experience on PlayStation."
  },
];

const continuePlaying = [
  { id: 1, title: "God of War", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80", progress: 72, lastPlayed: "2 hours ago" },
  { id: 2, title: "Spider-Man 2", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80", progress: 44, lastPlayed: "Yesterday" },
  { id: 3, title: "Horizon FW", image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&q=80", progress: 88, lastPlayed: "3 days ago" },
  { id: 4, title: "GT7", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80", progress: 31, lastPlayed: "Last week" },
];

const aiPicks = [
  { id: 1, title: "Sekiro", image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&q=80", why: "Because you loved God of War", genre: "Action" },
  { id: 2, title: "Bloodborne", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80", why: "Top-rated in your genre", genre: "Action RPG" },
  { id: 3, title: "Ghost of Tsushima", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80", why: "96% match with your taste", genre: "Open World" },
  { id: 4, title: "Returnal", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80", why: "PS Exclusive with high replayability", genre: "Roguelike" },
];

const trophies = [
  { id: 1, name: "Platinum Soul", game: "Elden Ring", type: "platinum", icon: "🏆", date: "Jan 12" },
  { id: 2, name: "100% Complete", game: "Spider-Man 2", type: "gold", icon: "🥇", date: "Jan 8" },
  { id: 3, name: "Speed Runner", game: "God of War", type: "silver", icon: "🥈", date: "Dec 28" },
  { id: 4, name: "First Blood", game: "GT7", type: "bronze", icon: "🥉", date: "Dec 20" },
];

const newsTicker = "Spider-Man 2 DLC Out Now · PS Plus February Games Revealed · GT7 Update 1.42 · Ghost of Tsushima PC Port Confirmed · PlayStation 6 Teaser Leaked · Horizon 3 in Development · Bloodborne Remaster Announced · PSVR2 Price Drop Incoming ·";

export default function Home() {
  const { user, friends } = useApp();
  const [heroIdx, setHeroIdx] = useState(0);
  const [joinModal, setJoinModal] = useState<string | null>(null);
  const [trophyModal, setTrophyModal] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setHeroIdx(i => (i + 1) % heroGames.length);
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const trophyGlow: Record<string, string> = {
    platinum: '0 0 12px hsl(270 60% 60% / 0.7)',
    gold: '0 0 12px hsl(51 100% 50% / 0.7)',
    silver: '0 0 12px hsl(0 0% 75% / 0.7)',
    bronze: '0 0 12px hsl(25 60% 50% / 0.7)',
  };

  const trophyColor: Record<string, string> = {
    platinum: 'text-purple-400',
    gold: 'text-ps-gold',
    silver: 'text-gray-300',
    bronze: 'text-amber-600',
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pt-16">
      {/* Hero Carousel */}
      <div className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIdx}
            className="absolute inset-0"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.7, ease: 'easeInOut' }}
          >
            <img
              src={heroGames[heroIdx].image}
              alt={heroGames[heroIdx].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-16 left-8 md:left-20">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="inline-block bg-ps-blue/20 border border-ps-blue text-ps-neon text-xs font-rajdhani tracking-widest px-3 py-1 rounded-full mb-3">
                  {heroGames[heroIdx].genre}
                </span>
                <h1 className="font-rajdhani font-bold text-5xl md:text-7xl text-foreground mb-2">
                  {heroGames[heroIdx].title}
                </h1>
                <p className="text-ps-secondary font-inter text-base mb-1">{heroGames[heroIdx].description}</p>
                <div className="flex items-center gap-1 mb-6">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i} className={i < Math.floor(heroGames[heroIdx].rating / 2) ? 'text-ps-gold' : 'text-ps-secondary'}>{s}</span>
                  ))}
                  <span className="text-ps-secondary text-sm ml-1">{heroGames[heroIdx].rating}/10</span>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    className="px-6 py-3 bg-ps-blue rounded-xl font-rajdhani font-bold text-lg tracking-wide"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 24px hsl(200 100% 50% / 0.5)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    ▶ Play Now
                  </motion.button>
                  <motion.button
                    className="px-6 py-3 ps-glass border border-ps-border rounded-xl font-rajdhani font-bold text-lg tracking-wide text-ps-secondary hover:text-foreground"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    + Add to Library
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="absolute bottom-5 left-8 md:left-20 flex gap-2">
          {heroGames.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === heroIdx ? 'w-8 bg-ps-neon' : 'w-4 bg-ps-secondary/50'}`}
            />
          ))}
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-20 space-y-10 py-8">
        {/* Continue Playing */}
        <section>
          <h2 className="font-rajdhani font-bold text-2xl mb-4 text-foreground">Continue Playing</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {continuePlaying.map(game => (
              <motion.div
                key={game.id}
                className="ps-card flex-shrink-0 w-48 overflow-hidden"
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative">
                  <img src={game.image} alt={game.title} className="w-full h-28 object-cover" />
                </div>
                <div className="p-3">
                  <p className="font-rajdhani font-semibold text-sm mb-1 truncate">{game.title}</p>
                  <div className="w-full h-1 bg-ps-border rounded-full mb-1">
                    <div
                      className="h-full bg-ps-neon rounded-full"
                      style={{ width: `${game.progress}%`, boxShadow: '0 0 6px hsl(200 100% 50% / 0.6)' }}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            {/* AI Picks */}
            <section>
              <div className="ps-card p-4 ps-gradient-border">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-ps-neon text-xl">🤖</span>
                  <div>
                    <h2 className="font-rajdhani font-bold text-xl">Picked for you, {user.username}</h2>
                    <p className="text-ps-secondary text-xs">Powered by PlayStation AI</p>
                  </div>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {aiPicks.map(game => (
                    <motion.div key={game.id} className="flex-shrink-0 w-40 group" whileHover={{ y: -4 }}>
                      <div className="relative rounded-xl overflow-hidden mb-2">
                        <img src={game.image} alt={game.title} className="w-full h-24 object-cover" />
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
                      <p className="font-rajdhani font-semibold text-sm">{game.title}</p>
                      <p className="text-ps-secondary text-[11px]">{game.genre}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Trophy Showcase */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-rajdhani font-bold text-2xl">Recent Trophies</h2>
                <button onClick={() => setTrophyModal(true)} className="text-ps-neon text-sm font-rajdhani">View All →</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {trophies.map(t => (
                  <motion.div
                    key={t.id}
                    className="ps-card p-4 text-center"
                    whileHover={{ y: -3 }}
                    style={{ boxShadow: trophyGlow[t.type] }}
                  >
                    <div className="text-3xl mb-2">{t.icon}</div>
                    <p className={`font-rajdhani font-bold text-sm ${trophyColor[t.type]}`}>{t.name}</p>
                    <p className="text-ps-secondary text-[11px]">{t.game}</p>
                    <p className="text-ps-secondary text-[10px]">{t.date}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Friends Activity */}
          <aside className="space-y-4">
            <h2 className="font-rajdhani font-bold text-2xl">Friends Activity</h2>
            <div className="space-y-3">
              {friends.slice(0, 5).map(friend => (
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
                      className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background pulse-dot ${
                        friend.status === 'ingame' ? 'bg-ps-success' :
                        friend.status === 'online' ? 'bg-blue-400' :
                        friend.status === 'away' ? 'bg-yellow-400' : 'bg-gray-500'
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-rajdhani font-semibold text-sm">{friend.name}</p>
                    <p className="text-ps-secondary text-[11px] truncate">
                      {friend.currentGame || (friend.status === 'online' ? 'Online' : friend.status === 'away' ? 'Away' : 'Offline')}
                    </p>
                  </div>
                  {friend.status === 'ingame' && (
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

      {/* News Ticker */}
      <div className="bg-ps-blue mt-4 py-2 overflow-hidden">
        <div className="marquee-inner text-white font-rajdhani font-semibold text-sm tracking-wide">
          <span className="px-4">{newsTicker}</span>
          <span className="px-4">{newsTicker}</span>
        </div>
      </div>

      {/* Join Game Modal */}
      <Modal isOpen={!!joinModal} onClose={() => setJoinModal(null)} title="Join Game">
        <div className="text-center py-4">
          <div className="text-5xl mb-4">🎮</div>
          <p className="font-rajdhani text-xl text-foreground mb-2">Joining {joinModal}'s game</p>
          <p className="text-ps-secondary text-sm mb-6">You'll be matchmade into their current session.</p>
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
      <Modal isOpen={trophyModal} onClose={() => setTrophyModal(false)} title="Trophy Cabinet">
        <div className="grid grid-cols-2 gap-3">
          {trophies.concat(trophies).map((t, i) => (
            <div
              key={i}
              className="ps-glass rounded-xl p-3 flex items-center gap-3"
              style={{ boxShadow: trophyGlow[t.type] }}
            >
              <span className="text-2xl">{t.icon}</span>
              <div>
                <p className={`font-rajdhani font-bold text-sm ${trophyColor[t.type]}`}>{t.name}</p>
                <p className="text-ps-secondary text-[11px]">{t.game}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
