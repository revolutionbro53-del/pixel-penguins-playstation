import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import Modal from '@/components/Modal';
import {
  TrophyIcon,
  MedalGoldIcon,
  MedalSilverIcon,
  MedalBronzeIcon,
  PlatinumIcon,
  PeopleIcon,
  FireIcon,
  CheckIcon,
  CommentIcon,
} from '@/components/icons';

const trophyData = [
  { name: "Platinum Soul", game: "Elden Ring", type: "platinum", date: "Jan 12, 2024", rarity: "0.8%" },
  { name: "Perfect Run", game: "Spider-Man 2", type: "gold", date: "Jan 8, 2024", rarity: "2.1%" },
  { name: "Speed Runner", game: "God of War", type: "gold", date: "Dec 28, 2023", rarity: "3.4%" },
  { name: "Untouchable", game: "Horizon FW", type: "silver", date: "Dec 18, 2023", rarity: "8.7%" },
  { name: "Completionist", game: "GT7", type: "silver", date: "Dec 10, 2023", rarity: "12.3%" },
  { name: "First Blood", game: "Bloodborne", type: "bronze", date: "Nov 30, 2023", rarity: "45.2%" },
  { name: "Explorer", game: "Elden Ring", type: "bronze", date: "Nov 22, 2023", rarity: "61.8%" },
  { name: "Story Mode", game: "Ghost of Tsushima", type: "bronze", date: "Nov 15, 2023", rarity: "38.5%" },
];

const activityFeed = [
  { user: 'GhostBlade42', action: 'earned Platinum in God of War', time: '2h ago', reaction: { clap: 12, fire: 8, comment: 3 }, seed: 'ghostblade' },
  { user: 'NightOwl_PS', action: 'hit Level 38', time: '4h ago', reaction: { clap: 5, fire: 2, comment: 1 }, seed: 'nightowl' },
  { user: 'ArcticFox99', action: 'completed Spider-Man 2 100%', time: '6h ago', reaction: { clap: 22, fire: 14, comment: 7 }, seed: 'arctic' },
  { user: 'GhostBlade42', action: 'earned Gold: "Speed Runner" in GT7', time: 'Yesterday', reaction: { clap: 9, fire: 5, comment: 2 }, seed: 'ghostblade' },
  { user: 'ShadowRunner', action: 'started playing Bloodborne', time: '2d ago', reaction: { clap: 3, fire: 6, comment: 0 }, seed: 'shadow' },
];

const library = {
  playing: [
    { title: "God of War", progress: 72, image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&q=80" },
    { title: "Spider-Man 2", progress: 44, image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&q=80" },
    { title: "Horizon FW", progress: 88, image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=200&q=80" },
  ],
  completed: [
    { title: "Elden Ring", progress: 100, image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&q=80" },
    { title: "Ghost of Tsushima", progress: 100, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80" },
  ],
  wishlist: [
    { title: "Bloodborne 2", progress: 0, image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=200&q=80" },
    { title: "Wolverine", progress: 0, image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&q=80" },
  ],
};

const avatarSeeds = ['ghostblade', 'neon', 'cosmic', 'pixel', 'velvet', 'shadow'];

function CountUp({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (1500 / 16);
    const id = setInterval(() => {
      start = Math.min(start + step, target);
      setVal(Math.floor(start));
      if (start >= target) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [inView, target]);

  return <span ref={ref} className="count-up-animate">{val.toLocaleString()}</span>;
}

export default function Profile() {
  const { user, setUser } = useApp();
  const [trophyFilter, setTrophyFilter] = useState('All');
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({
    username: user.username,
    bio: user.bio,
    favoriteGenre: user.favoriteGenre,
    avatarSeed: user.avatarSeed,
  });

  const trophyGlow: Record<string, string> = {
    platinum: '0 0 10px hsl(270 60% 60% / 0.5)',
    gold: '0 0 10px hsl(51 100% 50% / 0.5)',
    silver: '0 0 10px hsl(0 0% 75% / 0.5)',
    bronze: '0 0 10px hsl(25 60% 50% / 0.5)',
  };
  const trophyColor: Record<string, string> = {
    platinum: 'text-purple-400',
    gold: 'text-ps-gold',
    silver: 'text-gray-300',
    bronze: 'text-amber-600',
  };
  const trophyBorder: Record<string, string> = {
    platinum: 'border-purple-400/30',
    gold: 'border-yellow-400/30',
    silver: 'border-gray-400/30',
    bronze: 'border-amber-600/30',
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

  const filteredTrophies = trophyFilter === 'All' ? trophyData : trophyData.filter(t => t.type === trophyFilter.toLowerCase());
  const xpPct = (user.xpCurrent / user.xpNext) * 100;

  const particles = Array.from({ length: 20 }, (_, i) => ({
    left: `${(i * 37 + 13) % 100}%`,
    top: `${(i * 53 + 7) % 100}%`,
    delay: `${(i * 0.4) % 5}s`,
    duration: `${3 + (i % 4)}s`,
  }));

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-16">
      {/* Profile Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-ps-surface to-background min-h-[280px] flex items-end">
        {particles.map((p, i) => (
          <div key={i} className="particle" style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.duration }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-ps-blue/5 to-transparent" />
        <div className="relative w-full px-4 md:px-8 lg:px-20 pb-8 pt-24 md:pt-16">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-5">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-ps-neon" style={{ boxShadow: '0 0 20px hsl(200 100% 50% / 0.5)' }}>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarSeed}`} className="w-full h-full bg-ps-surface-2" alt="Avatar" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-ps-success border-2 border-background pulse-dot" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="font-rajdhani font-bold text-4xl">{user.username}</h1>
                <span className="bg-ps-blue/20 border border-ps-blue text-ps-neon text-xs font-rajdhani px-3 py-1 rounded-full" style={{ boxShadow: '0 0 8px hsl(200 100% 50% / 0.3)' }}>
                  Level {user.level}
                </span>
              </div>
              <p className="text-ps-secondary font-inter text-sm mb-1">@{user.psnId}</p>
              <p className="text-ps-secondary font-inter text-sm mb-3 max-w-md">{user.bio}</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 max-w-xs">
                  <div className="flex justify-between text-[11px] text-ps-secondary mb-1">
                    <span>XP</span>
                    <span>{user.xpCurrent.toLocaleString()} / {user.xpNext.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-ps-border rounded-full">
                    <div className="h-full bg-ps-neon rounded-full xp-bar" style={{ width: `${xpPct}%` }} />
                  </div>
                </div>
                <motion.button
                  className="px-4 py-2 border border-ps-border rounded-xl font-rajdhani font-semibold text-sm text-ps-secondary hover:text-foreground hover:border-ps-neon transition-colors"
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setEditModal(true)}
                >
                  ✏ Edit Profile
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-20 py-8 space-y-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Trophies', value: user.totalTrophies },
            { label: 'Games Played', value: user.gamesPlayed },
            { label: 'Hours Played', value: user.hoursPlayed },
            { label: 'Friends', value: user.friends },
          ].map(stat => (
            <motion.div key={stat.label} className="ps-card p-5 text-center" whileHover={{ y: -3 }}>
              <p className="font-rajdhani font-bold text-3xl text-ps-neon"><CountUp target={stat.value} /></p>
              <p className="text-ps-secondary text-sm font-inter mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Trophy Cabinet */}
        <section>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="font-rajdhani font-bold text-2xl">Trophy Cabinet</h2>
            <div className="flex gap-2 flex-wrap">
              {['All', 'Platinum', 'Gold', 'Silver', 'Bronze'].map(f => (
                <button key={f} onClick={() => setTrophyFilter(f)}
                  className={`px-3 py-1 rounded-lg font-rajdhani text-xs font-semibold transition-all ${trophyFilter === f ? 'bg-ps-blue text-white' : 'text-ps-secondary hover:text-foreground'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredTrophies.map(t => {
                const IconComponent = getTrophyIcon(t.type);
                return (
                  <motion.div key={t.name} className={`ps-glass rounded-xl p-4 border ${trophyBorder[t.type]}`}
                    layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -3 }} style={{ boxShadow: trophyGlow[t.type] }}>
                    <div className="w-8 h-8 mb-2 text-ps-neon">
                      <IconComponent />
                    </div>
                    <p className={`font-rajdhani font-bold text-base ${trophyColor[t.type]}`}>{t.name}</p>
                    <p className="text-ps-secondary text-xs">{t.game}</p>
                    <p className="text-ps-secondary text-xs mt-1">{t.date}</p>
                    <p className="text-ps-secondary text-[11px] mt-1">Earned by {t.rarity} of players</p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* Game Library */}
        <section>
          <h2 className="font-rajdhani font-bold text-2xl mb-4">Game Library</h2>
          {Object.entries(library).map(([status, games]) => (
            <div key={status} className="mb-6">
              <h3 className="font-rajdhani font-semibold text-lg text-ps-secondary mb-3">
                {status === 'playing' ? '🎮 Currently Playing' : status === 'completed' ? '✅ Completed' : '⭐ Wishlist'}
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {games.map((g, i) => (
                  <motion.div key={i} className="flex-shrink-0 w-28" whileHover={{ y: -3 }}>
                    <div className="relative rounded-xl overflow-hidden mb-2">
                      <img src={g.image} alt={g.title} className="w-full h-16 object-cover" />
                      {g.progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-ps-border">
                          <div className="h-full bg-ps-neon" style={{ width: `${g.progress}%` }} />
                        </div>
                      )}
                    </div>
                    <p className="font-rajdhani text-xs font-semibold truncate">{g.title}</p>
                    {g.progress > 0 && <p className="text-ps-secondary text-[11px]">{g.progress}%</p>}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Activity Feed */}
        <section>
          <h2 className="font-rajdhani font-bold text-2xl mb-4">Activity Feed</h2>
          <div className="space-y-3">
            {activityFeed.map((item, i) => (
              <motion.div key={i} className="ps-glass rounded-xl p-4 flex gap-3"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.seed}`}
                  className="w-10 h-10 rounded-full bg-ps-surface-2 flex-shrink-0" alt={item.user} />
                <div className="flex-1">
                  <p className="text-sm font-inter">
                    <span className="font-semibold text-foreground">{item.user}</span>
                    <span className="text-ps-secondary"> {item.action}</span>
                  </p>
                  <p className="text-ps-secondary text-[11px] mt-0.5">{item.time}</p>
                  <div className="flex gap-3 mt-2">
                    {[{ icon: '👏', count: item.reaction.clap }, { icon: '🔥', count: item.reaction.fire }, { icon: '💬', count: item.reaction.comment }].map(r => (
                      <button key={r.icon} className="flex items-center gap-1 text-ps-secondary hover:text-foreground transition-colors text-xs">
                        <span>{r.icon}</span><span>{r.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Profile">
        <div className="space-y-4">
          <div>
            <label className="text-ps-secondary text-sm font-inter block mb-1">Display Name</label>
            <input value={editData.username} onChange={e => setEditData(d => ({ ...d, username: e.target.value }))}
              className="w-full ps-glass border border-ps-border rounded-xl px-3 py-2 text-foreground text-sm focus:border-ps-neon focus:outline-none" />
          </div>
          <div>
            <label className="text-ps-secondary text-sm font-inter block mb-1">Bio</label>
            <textarea value={editData.bio} onChange={e => setEditData(d => ({ ...d, bio: e.target.value }))}
              rows={3} className="w-full ps-glass border border-ps-border rounded-xl px-3 py-2 text-foreground text-sm focus:border-ps-neon focus:outline-none resize-none" />
          </div>
          <div>
            <label className="text-ps-secondary text-sm font-inter block mb-1">Favorite Genre</label>
            <select value={editData.favoriteGenre} onChange={e => setEditData(d => ({ ...d, favoriteGenre: e.target.value }))}
              className="w-full ps-glass border border-ps-border rounded-xl px-3 py-2 text-foreground text-sm focus:border-ps-neon focus:outline-none bg-ps-surface">
              {['Action RPG', 'FPS', 'Racing', 'Horror', 'Indie', 'Sports'].map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="text-ps-secondary text-sm font-inter block mb-2">Avatar Style</label>
            <div className="grid grid-cols-6 gap-2">
              {avatarSeeds.map(seed => (
                <div key={seed} onClick={() => setEditData(d => ({ ...d, avatarSeed: seed }))}
                  className={`w-full aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${editData.avatarSeed === seed ? 'border-ps-neon' : 'border-ps-border'}`}
                  style={editData.avatarSeed === seed ? { boxShadow: '0 0 8px hsl(200 100% 50% / 0.5)' } : {}}>
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} className="w-full h-full bg-ps-surface-2" alt={seed} />
                </div>
              ))}
            </div>
          </div>
          <motion.button className="w-full py-3 bg-ps-blue rounded-xl font-rajdhani font-bold text-lg"
            whileHover={{ scale: 1.02 }}
            onClick={() => { setUser({ ...user, ...editData }); setEditModal(false); }}>
            Save Changes
          </motion.button>
        </div>
      </Modal>
    </div>
  );
}
