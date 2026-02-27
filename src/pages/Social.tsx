import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import Modal from '@/components/Modal';
import Toast from '@/components/Toast';

const initialLobbies = [
  { id: 1, game: "God of War: Ragnarök", host: "NightOwl_PS", hostSeed: "nightowl", slots: 4, filled: 3, status: "open", mode: "Co-op · Story", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80", players: 87 },
  { id: 2, game: "Spider-Man 2", host: "ArcticFox99", hostSeed: "arctic", slots: 2, filled: 2, status: "ingame", mode: "Ranked · Duos", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80", players: 142 },
  { id: 3, game: "GT7", host: "VelvetStrike", hostSeed: "velvet", slots: 6, filled: 4, status: "starting", mode: "Race · Custom", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80", players: 56 },
  { id: 4, game: "Horizon FW", host: "ShadowRunner", hostSeed: "shadow", slots: 4, filled: 1, status: "open", mode: "Casual · Free Roam", image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&q=80", players: 34 },
  { id: 5, game: "Returnal", host: "CosmicDrift", hostSeed: "cosmic", slots: 2, filled: 1, status: "open", mode: "Ranked · Solos", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80", players: 29 },
  { id: 6, game: "Bloodborne", host: "PixelProwler", hostSeed: "pixel", slots: 4, filled: 2, status: "starting", mode: "Co-op · Boss Rush", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80", players: 73 },
];

const gameOptions = ["God of War: Ragnarök", "Spider-Man 2", "GT7", "Horizon FW", "Returnal", "Bloodborne", "Ghost of Tsushima", "Elden Ring"];

const statusBadge: Record<string, { label: string; color: string; bg: string }> = {
  open: { label: 'Open', color: 'text-ps-success', bg: 'bg-ps-success/20 border-ps-success/30' },
  ingame: { label: 'In Game', color: 'text-red-400', bg: 'bg-red-500/20 border-red-500/30' },
  starting: { label: 'Starting Soon', color: 'text-yellow-400', bg: 'bg-yellow-500/20 border-yellow-500/30' },
};

export default function Social() {
  const { friends } = useApp();
  const [lobbies, setLobbies] = useState(initialLobbies);
  const [joinModal, setJoinModal] = useState<typeof initialLobbies[0] | null>(null);
  const [createModal, setCreateModal] = useState(false);
  const [squadModal, setSquadModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [muted, setMuted] = useState(false);
  const [newLobby, setNewLobby] = useState({ game: gameOptions[0], mode: 'Casual', maxPlayers: 4, name: '', privacy: 'Public' });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const handleCreateLobby = () => {
    const lobby = {
      id: Date.now(),
      game: newLobby.game,
      host: 'GhostBlade42',
      hostSeed: 'ghostblade',
      slots: newLobby.maxPlayers,
      filled: 1,
      status: 'open',
      mode: `${newLobby.mode} · ${newLobby.privacy}`,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80",
      players: 1,
    };
    setLobbies(prev => [lobby, ...prev]);
    setCreateModal(false);
    showToast('Lobby created!');
  };

  return (
    <div className="min-h-screen pb-32 md:pb-8 md:pt-20 px-4 md:px-8 lg:px-20">
      <Toast message={toastMsg} visible={toastVisible} />

      {/* Header */}
      <div className="py-4 md:py-0 mb-8">
        <h1 className="font-rajdhani font-bold text-4xl md:text-5xl">Your Squad. Your Game.</h1>
        <p className="text-ps-secondary font-inter text-sm mt-1">See who's online, jump in, and play together.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Friends Sidebar */}
        <aside className="lg:col-span-1 order-2 lg:order-1">
          <h2 className="font-rajdhani font-bold text-xl mb-4">Friends Online</h2>
          <div className="space-y-2">
            {friends.map(friend => (
              <motion.div
                key={friend.id}
                className="ps-glass rounded-xl p-3 flex items-center gap-3"
                whileHover={{ x: 3 }}
              >
                <div className="relative flex-shrink-0">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.seed}`} className="w-9 h-9 rounded-full bg-ps-surface-2" alt={friend.name} />
                  <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-background ${
                    friend.status === 'ingame' ? 'bg-ps-success pulse-dot' : friend.status === 'online' ? 'bg-blue-400' : friend.status === 'away' ? 'bg-yellow-400' : 'bg-gray-500'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-rajdhani font-semibold text-xs truncate">{friend.name}</p>
                  <p className="text-ps-secondary text-[10px] truncate">{friend.currentGame || friend.status}</p>
                </div>
                <motion.button
                  className="text-[10px] font-rajdhani font-bold text-ps-neon border border-ps-neon/30 px-2 py-1 rounded-lg"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => showToast(`Invite sent to ${friend.name}!`)}
                >
                  Invite
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Squad Card */}
          <div className="mt-6 ps-card p-4 border border-ps-gold/20" style={{ boxShadow: '0 0 12px hsl(51 100% 50% / 0.1)' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-ps-gold text-xl">⚔</span>
              <h3 className="font-rajdhani font-bold text-base">Ghost Division</h3>
              <span className="text-ps-secondary text-[11px]">[GD]</span>
            </div>
            <div className="text-ps-secondary text-xs space-y-1 mb-3">
              <p>👥 12 members · Win Rate 68%</p>
              <p>🏆 3 tournaments played</p>
            </div>
            <motion.button
              className="w-full py-2 border border-ps-gold/40 text-ps-gold rounded-xl font-rajdhani font-semibold text-xs"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSquadModal(true)}
            >
              View Squad
            </motion.button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          {/* Create Lobby Button */}
          <motion.button
            className="w-full mb-6 py-4 bg-ps-blue rounded-2xl font-rajdhani font-bold text-xl tracking-wide flex items-center justify-center gap-3"
            whileHover={{ scale: 1.01, boxShadow: '0 0 24px hsl(200 100% 50% / 0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCreateModal(true)}
          >
            <span className="text-2xl">+</span> Create a Lobby
          </motion.button>

          {/* Lobby Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimatePresence>
              {lobbies.map(lobby => {
                const sb = statusBadge[lobby.status];
                return (
                  <motion.div
                    key={lobby.id}
                    className="ps-card overflow-hidden"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="relative">
                      <img src={lobby.image} alt={lobby.game} className="w-full h-28 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <span className={`absolute top-2 right-2 text-[11px] font-rajdhani font-bold px-2 py-0.5 rounded-full border ${sb.bg} ${sb.color}`}>
                        {sb.label}
                      </span>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lobby.hostSeed}`} className="w-5 h-5 rounded-full bg-ps-surface-2" alt={lobby.host} />
                        <p className="font-rajdhani font-bold text-sm truncate">{lobby.game}</p>
                      </div>
                      <p className="text-ps-secondary text-xs mb-2">{lobby.mode}</p>
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: lobby.slots }).map((_, i) => (
                          <div key={i} className={`w-6 h-6 rounded-full border ${i < lobby.filled ? 'border-ps-neon bg-ps-blue/30' : 'border-ps-border bg-transparent'}`}>
                            {i < lobby.filled && <div className="w-full h-full rounded-full overflow-hidden"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lobby.hostSeed}${i}`} className="w-full h-full" alt="" /></div>}
                          </div>
                        ))}
                        <span className="text-ps-secondary text-[11px] ml-auto flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-ps-success inline-block pulse-dot" />{lobby.players}
                        </span>
                      </div>
                      <motion.button
                        disabled={lobby.status === 'ingame'}
                        className={`w-full py-2 rounded-xl font-rajdhani font-bold text-sm ${
                          lobby.status === 'ingame' ? 'bg-ps-border text-ps-secondary cursor-not-allowed' : 'bg-ps-blue'
                        }`}
                        whileHover={lobby.status !== 'ingame' ? { scale: 1.02 } : {}}
                        onClick={() => lobby.status !== 'ingame' && setJoinModal(lobby)}
                      >
                        {lobby.status === 'ingame' ? 'In Progress' : 'Request to Join'}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Voice Chat Bar */}
      <div className="fixed bottom-16 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 ps-glass border border-ps-neon/30 rounded-2xl p-3 z-40 flex items-center gap-3" style={{ boxShadow: '0 0 20px hsl(200 100% 50% / 0.15)' }}>
        <div className="flex items-end gap-0.5 h-6">
          <div className="waveform-bar" />
          <div className="waveform-bar" />
          <div className="waveform-bar" />
        </div>
        <div className="flex-1">
          <p className="font-rajdhani font-bold text-xs text-ps-neon">Voice Channel — Ghost Division</p>
          <div className="flex gap-2 mt-0.5">
            {['NightOwl', 'ArcticFox'].map(n => (
              <span key={n} className="text-[10px] text-ps-secondary">{n}</span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setMuted(m => !m)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${muted ? 'bg-red-500/20 text-red-400' : 'bg-ps-neon/20 text-ps-neon'}`}
        >
          {muted ? '🔇' : '🎤'}
        </button>
        <button className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-sm">✕</button>
      </div>

      {/* Join Modal */}
      <Modal isOpen={!!joinModal} onClose={() => setJoinModal(null)} title="Request to Join">
        {joinModal && (
          <div className="text-center py-4">
            <p className="font-rajdhani text-lg mb-2">Requesting to join <span className="text-ps-neon">{joinModal.host}</span>'s lobby</p>
            <p className="text-ps-secondary text-sm mb-2">{joinModal.game} · {joinModal.mode}</p>
            <p className="text-ps-secondary text-sm mb-6">{joinModal.filled}/{joinModal.slots} players</p>
            <motion.button
              className="w-full py-3 bg-ps-blue rounded-xl font-rajdhani font-bold text-lg"
              whileHover={{ scale: 1.02 }}
              onClick={() => { showToast(`Request sent to ${joinModal.host}!`); setJoinModal(null); }}
            >
              Send Request
            </motion.button>
          </div>
        )}
      </Modal>

      {/* Create Lobby Modal */}
      <Modal isOpen={createModal} onClose={() => setCreateModal(false)} title="Create Lobby">
        <div className="space-y-4">
          <div>
            <label className="text-ps-secondary text-sm block mb-1">Select Game</label>
            <select
              value={newLobby.game}
              onChange={e => setNewLobby(d => ({ ...d, game: e.target.value }))}
              className="w-full ps-glass border border-ps-border rounded-xl px-3 py-2 text-foreground text-sm focus:border-ps-neon focus:outline-none bg-ps-surface"
            >
              {gameOptions.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="text-ps-secondary text-sm block mb-1">Lobby Name</label>
            <input
              value={newLobby.name}
              onChange={e => setNewLobby(d => ({ ...d, name: e.target.value }))}
              placeholder="e.g. Chill Ranked Run"
              className="w-full ps-glass border border-ps-border rounded-xl px-3 py-2 text-foreground text-sm focus:border-ps-neon focus:outline-none"
            />
          </div>
          <div>
            <label className="text-ps-secondary text-sm block mb-2">Mode</label>
            <div className="flex gap-2">
              {['Casual', 'Ranked', 'Custom'].map(m => (
                <button
                  key={m}
                  onClick={() => setNewLobby(d => ({ ...d, mode: m }))}
                  className={`flex-1 py-2 rounded-xl font-rajdhani font-semibold text-sm border ${newLobby.mode === m ? 'bg-ps-blue border-ps-neon' : 'border-ps-border text-ps-secondary'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-ps-secondary text-sm block mb-2">Max Players: {newLobby.maxPlayers}</label>
            <div className="flex gap-2">
              {[2, 4, 6].map(n => (
                <button
                  key={n}
                  onClick={() => setNewLobby(d => ({ ...d, maxPlayers: n }))}
                  className={`flex-1 py-2 rounded-xl font-rajdhani font-semibold text-sm border ${newLobby.maxPlayers === n ? 'bg-ps-blue border-ps-neon' : 'border-ps-border text-ps-secondary'}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {['Public', 'Friends Only'].map(p => (
              <button
                key={p}
                onClick={() => setNewLobby(d => ({ ...d, privacy: p }))}
                className={`flex-1 py-2 rounded-xl font-rajdhani font-semibold text-sm border ${newLobby.privacy === p ? 'bg-ps-blue border-ps-neon' : 'border-ps-border text-ps-secondary'}`}
              >
                {p}
              </button>
            ))}
          </div>
          <motion.button
            className="w-full py-3 bg-ps-blue rounded-xl font-rajdhani font-bold text-lg"
            whileHover={{ scale: 1.02 }}
            onClick={handleCreateLobby}
          >
            Create Lobby
          </motion.button>
        </div>
      </Modal>

      {/* Squad Modal */}
      <Modal isOpen={squadModal} onClose={() => setSquadModal(false)} title="Ghost Division [GD]">
        <div className="space-y-3">
          <div className="flex gap-4 text-center mb-4">
            {[{ label: 'Members', val: 12 }, { label: 'Win Rate', val: '68%' }, { label: 'Tournaments', val: 3 }].map(s => (
              <div key={s.label} className="flex-1 ps-glass rounded-xl p-3">
                <p className="font-rajdhani font-bold text-xl text-ps-neon">{s.val}</p>
                <p className="text-ps-secondary text-xs">{s.label}</p>
              </div>
            ))}
          </div>
          {friends.map(f => (
            <div key={f.id} className="flex items-center gap-3">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${f.seed}`} className="w-8 h-8 rounded-full bg-ps-surface-2" alt={f.name} />
              <span className="font-rajdhani text-sm flex-1">{f.name}</span>
              <span className={`text-[11px] ${f.status === 'ingame' ? 'text-ps-success' : f.status === 'online' ? 'text-blue-400' : 'text-ps-secondary'}`}>{f.status}</span>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
