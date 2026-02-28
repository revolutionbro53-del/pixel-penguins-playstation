import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─── AI Coach ───────────────────────────────────────────────────────────────
const quickReplies = [
  "What should I play next?",
  "How do I beat Malenia?",
  "Build my gaming schedule",
  "Best PS5 exclusives 2024",
];

const aiResponses: Record<string, string> = {
  "What should I play next?":
    "Based on your 847 trophies and love for God of War, I'd recommend **Ghost of Tsushima** next. You've played 88% action RPGs — this checks every box. With your playstyle, you'll likely platinum it in ~40 hours. Your friends NightOwl and ArcticFox have already completed it — perfect excuse to co-op some missions.",
  "How do I beat Malenia?":
    "Malenia's core weakness is **Rivers of Blood** katana with Bloodhound's Step. For your build (Level 42, Action specialist): Stack bleed, dodge INTO her Waterfowl Dance 3 times, then backstep the 4th. Use Flask of Wondrous Physick with Crimsonwhorl Burstcrystal. Her healing resets on each weapon proc — so aggressive poke > cautious play. Avg player beats her in 47 tries. You can do it in 20.",
  "Build my gaming schedule":
    "📅 **Your Optimal Gaming Week:**\n\n🎮 Mon/Wed/Fri — God of War (2h): You're 72% done, push to finish this week!\n🏎 Tue/Thu — GT7 (1.5h): Daily races keep your rating climbing.\n🕸 Weekend — Spider-Man 2 (3h): Tackle the remaining 56% together.\n\n**Pro tip:** Your peak focus window is typically 9–11 PM based on session data. Schedule boss fights then.",
  "Best PS5 exclusives 2024":
    "Top 5 based on your DNA profile:\n\n1. **Astro Bot** — 96% match (platformer, story-rich)\n2. **Rise of the Ronin** — 94% match (action RPG, open world)\n3. **Helldivers 2** — 89% match (great for your squad squad)\n4. **Stellar Blade** — 87% match (combat depth)\n5. **Ghost of Tsushima PC Port** — Coming Q2 2025\n\nAll available on PS Plus Extra — no extra cost!",
};

// ─── Achievement Hunter ──────────────────────────────────────────────────────
const achievements = [
  {
    id: 1,
    game: "Elden Ring",
    trophy: "Elden Lord",
    desc: "Defeat Radagon of the Golden Order and Elden Beast",
    current: 1,
    target: 1,
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&q=80",
    boosted: false,
  },
  {
    id: 2,
    game: "Spider-Man 2",
    trophy: "100% Complete",
    desc: "Complete all activities in New York City",
    current: 72,
    target: 100,
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&q=80",
    boosted: false,
  },
  {
    id: 3,
    game: "GT7",
    trophy: "Collector",
    desc: "Own 80/100 legendary race cars",
    current: 67,
    target: 100,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80",
    boosted: false,
  },
  {
    id: 4,
    game: "God of War",
    trophy: "True Warrior",
    desc: "Defeat all Valkyries including the queen",
    current: 6,
    target: 9,
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&q=80",
    boosted: false,
  },
];

// ─── Playstyle DNA ───────────────────────────────────────────────────────────
const dnaAxes = [
  { label: "Action", value: 0.88 },
  { label: "Strategy", value: 0.45 },
  { label: "Story", value: 0.72 },
  { label: "Social", value: 0.55 },
  { label: "Competitive", value: 0.68 },
  { label: "Exploration", value: 0.8 },
];

const dnaBadges = [
  { icon: "🐺", label: "Lone Wolf", desc: "73% solo sessions" },
  { icon: "🏆", label: "Trophy Hunter", desc: "847 trophies earned" },
  { icon: "📖", label: "Story Seeker", desc: "72% story completion avg" },
];

// ─── Leaderboard ─────────────────────────────────────────────────────────────
function seededRand(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// ─── Controller Customizer ───────────────────────────────────────────────────
const controllerZones = [
  { id: "dpad", label: "D-Pad", cx: 110, cy: 210, r: 28 },
  { id: "face", label: "Face Buttons", cx: 330, cy: 210, r: 28 },
  { id: "touchpad", label: "Touchpad", cx: 220, cy: 185, r: 35 },
  { id: "l2", label: "L2 Trigger", cx: 95, cy: 68, r: 22 },
  { id: "r2", label: "R2 Trigger", cx: 345, cy: 68, r: 22 },
  { id: "grips", label: "Grips", cx: 220, cy: 290, r: 25 },
];

const colorSwatches = [
  "#00AAFF",
  "#FF4444",
  "#FFD700",
  "#00C853",
  "#CC44FF",
  "#FF8800",
];
const hapticLevels = ["Low", "Med", "High"];

function RadarChart({ axes }: { axes: typeof dnaAxes }) {
  const cx = 150,
    cy = 150,
    r = 110;
  const n = axes.length;
  const getPoint = (i: number, val: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * r * val,
      y: cy + Math.sin(angle) * r * val,
    };
  };
  const getLabelPoint = (i: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * (r + 20),
      y: cy + Math.sin(angle) * (r + 20),
    };
  };
  const points = axes.map((a, i) => getPoint(i, a.value));
  const gridPoints = (v: number) => axes.map((_, i) => getPoint(i, v));

  return (
    <svg viewBox="0 0 300 300" className="w-64 h-64 mx-auto">
      {[0.25, 0.5, 0.75, 1].map((v) => {
        const gp = gridPoints(v);
        return (
          <polygon
            key={v}
            points={gp.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="hsl(240 14% 20%)"
            strokeWidth="1"
          />
        );
      })}
      {axes.map((_, i) => {
        const p = getPoint(i, 1);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="hsl(240 14% 20%)"
            strokeWidth="1"
          />
        );
      })}
      <polygon
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="hsl(200 100% 50% / 0.2)"
        stroke="hsl(200 100% 50%)"
        strokeWidth="2"
      />
      {axes.map((a, i) => {
        const lp = getLabelPoint(i);
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="hsl(240 5% 55%)"
            fontSize="11"
            fontFamily="SST, Arial, sans-serif"
            fontWeight="600"
          >
            {a.label}
          </text>
        );
      })}
    </svg>
  );
}

function CountUpInView({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
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
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Experience() {
  // AI Coach
  const [messages, setMessages] = useState<
    { from: "user" | "ai"; text: string }[]
  >([
    {
      from: "ai",
      text: "Hey GhostBlade42! 👾 I'm your PlayStation AI Coach. Ask me anything about your games, trophies, or schedule.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // ==========================================
  // 🔑 DEVELOPER: ADD YOUR GEMINI API KEY HERE
  // ==========================================
  const GEMINI_API_KEY = "AIzaSyBTY1gHw4RB3vbSPLt8mphhoeklDd1Bkhw";

  const getGeminiResponse = async (prompt: string, key: string) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are Astro, a helpful PlayStation AI Coach. Your user is GhostBlade42, a Trophy Hunter. Keep responses short, enthusiastic, and focus on PlayStation games. User prompt: ${prompt}` }] }]
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      return data.candidates[0].content.parts[0].text;
    } catch (err: any) {
      console.error("Gemini Error Stack:", err);
      console.error("Gemini Error Message:", err?.message);
      return "Error connecting to AI Coach. Check console log.";
    }
  };

  const sendMessage = async (text: string) => {
    setMessages((m) => [...m, { from: "user", text }]);
    setTyping(true);

    if (GEMINI_API_KEY && GEMINI_API_KEY.trim() !== "") {
      const resp = await getGeminiResponse(text, GEMINI_API_KEY);
      setMessages((m) => [...m, { from: "ai", text: resp }]);
    } else {
      setTimeout(() => {
        const resp =
          aiResponses[text] ||
          "Great question! But my real AI brain is offline. Please paste your Gemini API key in the GEMINI_API_KEY variable in the code!";
        setMessages((m) => [...m, { from: "ai", text: resp }]);
      }, 1000);
    }
    setTyping(false);
  };

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, typing]);

  // Achievement Hunter
  const [achs, setAchs] = useState(achievements);
  const [unlocked, setUnlocked] = useState<number | null>(null);

  const toggleBoost = (id: number) => {
    setAchs((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        if (!a.boosted) {
          const boosted = {
            ...a,
            boosted: true,
            current: Math.min(
              a.target,
              Math.round(a.current + (a.target - a.current) * 0.85),
            ),
          };
          if (boosted.current >= boosted.target) {
            setTimeout(() => setUnlocked(id), 800);
            setTimeout(() => setUnlocked(null), 3500);
          }
          return boosted;
        }
        return { ...a, boosted: false };
      }),
    );
  };

  // Controller
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [zoneColors, setZoneColors] = useState<Record<string, string>>({});
  const [zoneMacros, setZoneMacros] = useState<Record<string, string>>({});
  const [zoneHaptics, setZoneHaptics] = useState<Record<string, string>>({});

  // Leaderboard
  const [lbTab, setLbTab] = useState<"Global" | "Friends">("Global");
  const countries = [
    "🇺🇸",
    "🇯🇵",
    "🇬🇧",
    "🇧🇷",
    "🇩🇪",
    "🇰🇷",
    "🇫🇷",
    "🇮🇳",
    "🇨🇦",
    "🇦🇺",
  ];
  const lbData = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        rank: i + 1,
        name:
          i === 4
            ? "GhostBlade42"
            : [
              "ShadowWolf",
              "NeonBlade",
              "PixelKing",
              "DragonSlayer",
              "GhostBlade42",
              "ArcticFox",
              "VelvetStrike",
              "CosmicDrift",
              "NightOwl",
              "CrimsonBlade",
            ][i],
        seed: [
          "shadow",
          "neon",
          "pixel",
          "dragon",
          "ghostblade",
          "arctic",
          "velvet",
          "cosmic",
          "nightowl",
          "crimson",
        ][i],
        country: countries[i],
        trophies: Math.round(1500 - i * 120 + seededRand(i) * 30),
        hours: Math.round(4000 - i * 300 + seededRand(i + 10) * 100),
        winRate: Math.round(85 - i * 4 + seededRand(i + 20) * 5),
        isMe: i === 4,
      })),
    [],
  );

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-20 px-4 md:px-8 lg:px-20 space-y-16 py-8">
      {/* Trophy Unlock Overlay */}
      <AnimatePresence>
        {unlocked !== null && (
          <motion.div
            className="fixed inset-0 z-[2000] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ps-gold/10 backdrop-blur-sm" />
            <motion.div
              className="relative text-center"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="text-8xl mb-4 trophy-burst">🏆</div>
              <h2
                className="font-rajdhani font-bold text-4xl text-ps-gold"
                style={{ textShadow: "0 0 30px hsl(51 100% 50%)" }}
              >
                TROPHY UNLOCKED
              </h2>
              <p className="text-foreground text-xl mt-2">
                {achs.find((a) => a.id === unlocked)?.trophy}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section 1 — AI Coach */}
      <section>
        <div className="mb-4">
          <h2 className="font-rajdhani font-bold text-3xl">
            Your AI PlayStation Coach
          </h2>
          <p className="text-ps-secondary text-sm">
            Personalized game guidance powered by your playstyle data.
          </p>
        </div>
        <div className="ps-card max-w-2xl ps-gradient-border">
          <div className="p-4 border-b border-ps-border flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full bg-ps-blue flex items-center justify-center text-sm"
              style={{ boxShadow: "0 0 12px hsl(200 100% 50% / 0.5)" }}
            >
              🤖
            </div>
            <div>
              <p className="font-rajdhani font-bold text-sm">
                PlayStation AI Coach
              </p>
              <p className="text-ps-success text-[11px]">● Online</p>
            </div>
          </div>
          <div ref={chatRef} className="p-4 space-y-3 h-72 overflow-y-auto">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className={`flex gap-2 ${msg.from === "user" ? "flex-row-reverse" : ""}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {msg.from === "ai" && (
                  <div className="w-7 h-7 rounded-full bg-ps-blue flex items-center justify-center text-xs flex-shrink-0">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-xs rounded-xl px-3 py-2 text-sm font-inter whitespace-pre-line ${msg.from === "ai"
                    ? "ps-glass border border-ps-border text-foreground"
                    : "bg-ps-blue text-white"
                    }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {typing && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-ps-blue flex items-center justify-center text-xs">
                  🤖
                </div>
                <div className="ps-glass border border-ps-border rounded-xl px-4 py-3 flex gap-1 items-center">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-ps-border flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((qr) => (
                <motion.button
                  key={qr}
                  className="text-[11px] font-rajdhani font-semibold border border-ps-neon/30 text-ps-neon px-3 py-1.5 rounded-full"
                  whileHover={{ scale: 1.03, borderColor: "hsl(200 100% 50%)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => !typing && sendMessage(qr)}
                >
                  {qr}
                </motion.button>
              ))}
            </div>
            <div className="flex gap-2 relative">
              <input
                type="text"
                placeholder="Ask your Coach (or type your API prompts)..."
                className="flex-1 ps-glass border border-ps-border rounded-xl px-3 py-2 text-sm focus:border-ps-neon focus:outline-none"
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    e.currentTarget.value.trim() &&
                    !typing
                  ) {
                    sendMessage(e.currentTarget.value);
                    e.currentTarget.value = "";
                  }
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Achievement Hunter */}
      <section>
        <div className="mb-4">
          <h2 className="font-rajdhani font-bold text-3xl">
            How close are you?
          </h2>
          <p className="text-ps-secondary text-sm">
            Track your trophy progress. Toggle Boost Mode to see the path ahead.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achs.map((a) => {
            const pct = Math.min(100, Math.round((a.current / a.target) * 100));
            return (
              <motion.div
                key={a.id}
                className="ps-card p-4"
                whileHover={{ y: -3 }}
              >
                <div className="relative rounded-xl overflow-hidden mb-3">
                  <img
                    src={a.image}
                    alt={a.game}
                    className="w-full h-28 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-2">
                    <span className="text-[11px] font-rajdhani font-bold text-ps-neon">
                      {a.game}
                    </span>
                  </div>
                </div>
                <p className="font-rajdhani font-bold text-sm mb-1">
                  {a.trophy}
                </p>
                <p className="text-ps-secondary text-[11px] mb-3 min-h-[28px]">
                  {a.desc}
                </p>
                <div className="mb-2">
                  <div className="flex justify-between text-[11px] text-ps-secondary mb-1">
                    <span>
                      {a.current}/{a.target}
                    </span>
                    <span>{pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-ps-border rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: a.boosted
                          ? "linear-gradient(90deg, hsl(200 100% 50%), hsl(270 80% 60%))"
                          : "hsl(200 100% 50%)",
                        boxShadow: a.boosted
                          ? "0 0 10px hsl(200 100% 50% / 0.8)"
                          : "none",
                      }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <motion.button
                  className={`w-full py-2 rounded-xl font-rajdhani font-semibold text-xs border ${a.boosted
                    ? "bg-ps-neon/20 border-ps-neon text-ps-neon"
                    : "border-ps-border text-ps-secondary hover:text-foreground"
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleBoost(a.id)}
                >
                  {a.boosted ? "⚡ Boost Active" : "⚡ Boost Mode"}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Section 3 — Playstyle DNA */}
      <section>
        <div className="mb-4">
          <h2 className="font-rajdhani font-bold text-3xl">Your Gaming DNA</h2>
          <p className="text-ps-secondary text-sm">
            Your unique playstyle fingerprint across 6 dimensions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="ps-card p-6 ps-gradient-border">
            <RadarChart axes={dnaAxes} />
          </div>
          <div>
            <div className="space-y-3 mb-6">
              {dnaAxes.map((a) => (
                <div key={a.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-rajdhani font-semibold">
                      {a.label}
                    </span>
                    <span className="text-ps-secondary">
                      {Math.round(a.value * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-ps-border rounded-full">
                    <motion.div
                      className="h-full bg-ps-neon rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${a.value * 100}%` }}
                      transition={{ duration: 1.2, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {dnaBadges.map((b) => (
                <motion.div
                  key={b.label}
                  className="ps-glass border border-ps-neon/30 rounded-xl px-4 py-3 flex items-center gap-2"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 12px hsl(200 100% 50% / 0.2)",
                  }}
                >
                  <span className="text-2xl">{b.icon}</span>
                  <div>
                    <p className="font-rajdhani font-bold text-sm text-ps-neon">
                      {b.label}
                    </p>
                    <p className="text-ps-secondary text-[11px]">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Controller Customizer */}
      <section>
        <div className="mb-4">
          <h2 className="font-rajdhani font-bold text-3xl">
            Controller Customizer
          </h2>
          <p className="text-ps-secondary text-sm">
            Click a zone to customize colors, macros, and haptics.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="ps-card p-6">
            <svg viewBox="0 0 440 340" className="w-full max-w-md mx-auto">
              {/* Controller body */}
              <ellipse
                cx="220"
                cy="200"
                rx="185"
                ry="110"
                fill="#12121A"
                stroke="#1E1E2E"
                strokeWidth="2"
              />
              <ellipse
                cx="110"
                cy="200"
                rx="100"
                ry="100"
                fill="#0A0A0F"
                stroke="#1E1E2E"
                strokeWidth="1.5"
              />
              <ellipse
                cx="330"
                cy="200"
                rx="100"
                ry="100"
                fill="#0A0A0F"
                stroke="#1E1E2E"
                strokeWidth="1.5"
              />
              {/* Grips */}
              <ellipse
                cx="140"
                cy="295"
                rx="65"
                ry="40"
                fill="#0A0A0F"
                stroke="#1E1E2E"
                strokeWidth="1.5"
              />
              <ellipse
                cx="300"
                cy="295"
                rx="65"
                ry="40"
                fill="#0A0A0F"
                stroke="#1E1E2E"
                strokeWidth="1.5"
              />
              {/* PS Logo */}
              <circle cx="220" cy="170" r="12" fill="#1E1E2E" />
              <text
                x="220"
                y="175"
                textAnchor="middle"
                fill="#8A8A9A"
                fontSize="12"
              >
                🎮
              </text>
              {/* Clickable Zones */}
              {controllerZones.map((zone) => {
                const color = zoneColors[zone.id] || "hsl(240 14% 18%)";
                const isActive = activeZone === zone.id;
                return (
                  <g
                    key={zone.id}
                    onClick={() => setActiveZone(isActive ? null : zone.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <circle
                      cx={zone.cx}
                      cy={zone.cy}
                      r={zone.r}
                      fill={color}
                      stroke={isActive ? "hsl(200 100% 50%)" : "#1E1E2E"}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      opacity={0.85}
                    />
                    {isActive && (
                      <circle
                        cx={zone.cx}
                        cy={zone.cy}
                        r={zone.r + 4}
                        fill="none"
                        stroke="hsl(200 100% 50%)"
                        strokeWidth="1"
                        opacity="0.4"
                      >
                        <animate
                          attributeName="r"
                          values={`${zone.r + 2};${zone.r + 8};${zone.r + 2}`}
                          dur="1.5s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.4;0.1;0.4"
                          dur="1.5s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                    <text
                      x={zone.cx}
                      y={zone.cy + 4}
                      textAnchor="middle"
                      fill="hsl(240 5% 75%)"
                      fontSize="10"
                      fontFamily="SST, Arial, sans-serif"
                      fontWeight="600"
                    >
                      {zone.label.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <AnimatePresence>
            {activeZone ? (
              <motion.div
                className="ps-card p-5 ps-gradient-border"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h3 className="font-rajdhani font-bold text-xl mb-4">
                  Customize:{" "}
                  {controllerZones.find((z) => z.id === activeZone)?.label}
                </h3>
                <div className="mb-4">
                  <label className="text-ps-secondary text-sm block mb-2">
                    Color
                  </label>
                  <div className="flex gap-2">
                    {colorSwatches.map((c) => (
                      <button
                        key={c}
                        className="w-8 h-8 rounded-full border-2 transition-all"
                        style={{
                          background: c,
                          borderColor:
                            zoneColors[activeZone] === c
                              ? "white"
                              : "transparent",
                          boxShadow:
                            zoneColors[activeZone] === c
                              ? `0 0 10px ${c}`
                              : "none",
                        }}
                        onClick={() =>
                          setZoneColors((prev) => ({
                            ...prev,
                            [activeZone]: c,
                          }))
                        }
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-ps-secondary text-sm block mb-2">
                    Macro Label
                  </label>
                  <input
                    placeholder="e.g. Quick Heal"
                    value={zoneMacros[activeZone] || ""}
                    onChange={(e) =>
                      setZoneMacros((prev) => ({
                        ...prev,
                        [activeZone]: e.target.value,
                      }))
                    }
                    className="w-full ps-glass border border-ps-border rounded-xl px-3 py-2 text-foreground text-sm focus:border-ps-neon focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-ps-secondary text-sm block mb-2">
                    Haptic Intensity
                  </label>
                  <div className="flex gap-2">
                    {hapticLevels.map((h) => (
                      <button
                        key={h}
                        onClick={() =>
                          setZoneHaptics((prev) => ({
                            ...prev,
                            [activeZone]: h,
                          }))
                        }
                        className={`flex-1 py-2 rounded-xl font-rajdhani font-semibold text-sm border ${zoneHaptics[activeZone] === h
                          ? "bg-ps-blue border-ps-neon"
                          : "border-ps-border text-ps-secondary"
                          }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="ps-card p-8 flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-5xl mb-3">🎮</div>
                <p className="font-rajdhani font-bold text-lg text-ps-secondary">
                  Select a zone
                </p>
                <p className="text-ps-secondary text-sm">
                  Click any highlighted zone on the controller to customize it
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Section 5 — Global Leaderboard */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-rajdhani font-bold text-3xl">
              Global Leaderboard
            </h2>
            <p className="text-ps-secondary text-sm">
              Top players worldwide. Updated daily.
            </p>
          </div>
          <div className="flex gap-2">
            {(["Global", "Friends"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setLbTab(t)}
                className={`px-4 py-2 rounded-xl font-rajdhani font-semibold text-sm border transition-all ${lbTab === t
                  ? "bg-ps-blue border-ps-neon"
                  : "border-ps-border text-ps-secondary"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="ps-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ps-border">
                  {[
                    "Rank",
                    "Player",
                    "Country",
                    "Trophies",
                    "Hours",
                    "Win Rate",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-ps-secondary font-rajdhani font-semibold text-sm"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lbData.map((row) => (
                  <motion.tr
                    key={row.rank}
                    className={`border-b border-ps-border/50 transition-colors ${row.isMe ? "bg-ps-blue/10" : "hover:bg-ps-surface-2"}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: row.rank * 0.05 }}
                    style={
                      row.rank <= 3
                        ? {
                          borderLeft: `3px solid ${row.rank === 1 ? "hsl(51 100% 50%)" : row.rank === 2 ? "hsl(0 0% 75%)" : "hsl(25 60% 50%)"}`,
                        }
                        : row.isMe
                          ? { borderLeft: "3px solid hsl(200 100% 50%)" }
                          : {}
                    }
                  >
                    <td className="px-4 py-3">
                      <span
                        className={`font-rajdhani font-bold ${row.rank === 1 ? "text-ps-gold" : row.rank === 2 ? "text-gray-300" : row.rank === 3 ? "text-amber-600" : "text-ps-secondary"}`}
                      >
                        {row.rank <= 3
                          ? ["🥇", "🥈", "🥉"][row.rank - 1]
                          : `#${row.rank}`}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.seed}`}
                          className="w-7 h-7 rounded-full bg-ps-surface-2"
                          alt={row.name}
                        />
                        <span
                          className={`font-rajdhani font-semibold text-sm ${row.isMe ? "text-ps-neon" : ""}`}
                        >
                          {row.name}
                        </span>
                        {row.isMe && (
                          <span className="text-[10px] bg-ps-blue/30 text-ps-neon px-1.5 py-0.5 rounded font-bold">
                            YOU
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-lg">{row.country}</td>
                    <td className="px-4 py-3 font-rajdhani font-bold text-ps-gold">
                      <CountUpInView target={row.trophies} />
                    </td>
                    <td className="px-4 py-3 font-rajdhani text-sm text-ps-secondary">
                      <CountUpInView target={row.hours} suffix="h" />
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-rajdhani font-bold text-ps-success">
                        <CountUpInView target={row.winRate} suffix="%" />
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
