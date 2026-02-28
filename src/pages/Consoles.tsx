import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import Toast from "@/components/Toast";

interface Product {
    id: number;
    name: string;
    category: "ps5" | "ps4" | "accessory";
    price: number;
    image: string;
    badge?: string;
    badgeColor?: string;
    tagline: string;
    description: string;
    specs: { label: string; value: string }[];
}

const products: Product[] = [
    // ============ PS5 CONSOLES ============
    {
        id: 1001,
        name: "PlayStation 5 Standard Edition",
        category: "ps5",
        price: 54990,
        image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80",
        badge: "LATEST",
        badgeColor: "hsl(200 100% 50%)",
        tagline: "Play has no limits.",
        description:
            "The PS5 Standard Edition includes the Ultra HD Blu-ray disc drive, enabling you to play physical PS5 games and 4K Blu-ray movies. With near-zero loading times enabled by the dedicated SSD, a revolutionary DualSense controller that brings haptic immersion like never before, and a custom GPU delivering ray-traced 4K at up to 120fps — the PS5 represents the definitive next-gen gaming console.",
        specs: [
            { label: "CPU", value: "8-core AMD Zen 2 @ 3.5 GHz" },
            { label: "GPU", value: "Custom AMD RDNA 2 — 10.28 TFLOPS" },
            { label: "RAM", value: "16 GB GDDR6" },
            { label: "SSD Storage", value: "825 GB Custom NVMe" },
            { label: "Optical Drive", value: "Ultra HD Blu-ray" },
            { label: "Max Resolution", value: "8K (upscaled), 4K 120fps" },
            { label: "Audio", value: "Tempest 3D AudioTech" },
            { label: "USB Ports", value: "1× USB-A (rear), 1× USB-C, 1× USB-A (front)" },
        ],
    },
    {
        id: 1002,
        name: "PlayStation 5 Digital Edition",
        category: "ps5",
        price: 44990,
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&q=80",
        badge: "DISC-FREE",
        badgeColor: "hsl(270 80% 55%)",
        tagline: "Pure digital play.",
        description:
            "The PS5 Digital Edition is the slimmer, disc-free version of Sony's flagship console. Delivering identical performance to the Standard Edition — same SSD, same GPU, same CPU, same DualSense — it simply removes the Blu-ray drive for a sleeker design and lower price. Ideal for gamers who shop exclusively on PlayStation Store. With PlayStation Now + PlayStation Plus, your entire game library lives in the cloud.",
        specs: [
            { label: "CPU", value: "8-core AMD Zen 2 @ 3.5 GHz" },
            { label: "GPU", value: "Custom AMD RDNA 2 — 10.28 TFLOPS" },
            { label: "RAM", value: "16 GB GDDR6" },
            { label: "SSD Storage", value: "825 GB Custom NVMe" },
            { label: "Optical Drive", value: "None (Digital Only)" },
            { label: "Max Resolution", value: "8K (upscaled), 4K 120fps" },
            { label: "Audio", value: "Tempest 3D AudioTech" },
            { label: "USB Ports", value: "1× USB-A (rear), 1× USB-C, 1× USB-A (front)" },
        ],
    },
    {
        id: 1003,
        name: "PlayStation 5 Slim",
        category: "ps5",
        price: 49990,
        image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80",
        badge: "NEW",
        badgeColor: "hsl(150 80% 40%)",
        tagline: "Smaller. Same power.",
        description:
            "The PS5 Slim is Sony's 2024 redesign of the PlayStation 5. It's 30% smaller in volume than the launch model while delivering identical performance. The disc drive is now detachable and sold separately, giving buyers flexibility. A new horizontal stand is bundled, Wi-Fi 7 is supported, and the SSD expansion bay is now more easily accessible. The perfect PS5 for tight entertainment setups.",
        specs: [
            { label: "CPU", value: "8-core AMD Zen 2 @ 3.5 GHz" },
            { label: "GPU", value: "Custom AMD RDNA 2 — 10.28 TFLOPS" },
            { label: "RAM", value: "16 GB GDDR6" },
            { label: "SSD Storage", value: "1 TB Custom NVMe" },
            { label: "Optical Drive", value: "Detachable Ultra HD Blu-ray" },
            { label: "Max Resolution", value: "8K (upscaled), 4K 120fps" },
            { label: "Wi-Fi", value: "Wi-Fi 7 (IEEE 802.11be)" },
            { label: "Volume", value: "~30% smaller than launch PS5" },
        ],
    },
    // ============ PS4 CONSOLES ============
    {
        id: 1004,
        name: "PlayStation 4 Pro",
        category: "ps4",
        price: 29990,
        image: "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=600&q=80",
        badge: "BEST VALUE",
        badgeColor: "hsl(45 100% 50%)",
        tagline: "4K gaming. Massive library.",
        description:
            "The PlayStation 4 Pro remains one of the best value gaming consoles ever made. Featuring a 1 TB hard drive, 4K and HDR output support for compatible titles, and access to the enormous PS4 game library of 4,000+ titles, it's the definitive way to enter the PlayStation ecosystem. It's also backward compatible with all PS4 games and plays thousands of titles at boosted performance via PS4 Pro Enhanced modes.",
        specs: [
            { label: "CPU", value: "8-core AMD Jaguar @ 2.1 GHz" },
            { label: "GPU", value: "AMD Polaris — 4.2 TFLOPS" },
            { label: "RAM", value: "8 GB GDDR5" },
            { label: "HDD Storage", value: "1 TB" },
            { label: "Optical Drive", value: "Blu-ray" },
            { label: "Max Resolution", value: "4K (checkerboard), 1080p 60fps native" },
            { label: "HDR", value: "Yes (HDR10)" },
            { label: "USB Ports", value: "3× USB 3.1 Gen 1" },
        ],
    },
    {
        id: 1005,
        name: "PlayStation 4 Slim",
        category: "ps4",
        price: 19990,
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80",
        tagline: "Compact. Powerful. Affordable.",
        description:
            "The PS4 Slim is the streamlined, compact version of Sony's beloved fourth-generation console. At just 265mm wide, it's the most space-efficient PS4 to date while offering the same PS4 gaming experience. With access to the complete PS4 library, PlayStation Network, and PlayStation Plus cloud saves — including a free monthly game selection — the PS4 Slim delivers extraordinary value for new gamers.",
        specs: [
            { label: "CPU", value: "8-core AMD Jaguar @ 1.6 GHz" },
            { label: "GPU", value: "AMD GCN — 1.84 TFLOPS" },
            { label: "RAM", value: "8 GB GDDR5" },
            { label: "HDD Storage", value: "500 GB / 1 TB" },
            { label: "Optical Drive", value: "Blu-ray" },
            { label: "Max Resolution", value: "1080p Full HD" },
            { label: "HDR", value: "Yes (HDR10)" },
            { label: "Dimensions", value: "265 × 39 × 288 mm" },
        ],
    },
    // ============ ACCESSORIES ============
    {
        id: 2001,
        name: "DualSense Wireless Controller",
        category: "accessory",
        price: 6490,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&q=80",
        badge: "MUST-HAVE",
        badgeColor: "hsl(200 100% 50%)",
        tagline: "Feel the game like never before.",
        description:
            "The DualSense is Sony's revolutionary PS5 controller that redefines how games feel. Adaptive triggers resist with varying tension depending on in-game actions — drawing a bowstring, accelerating on gravel, or squeezing a trigger during combat. Haptic feedback motors replace the traditional rumble with precise tactile sensations: rain pattering, terrain texture, impact vibrations. The built-in microphone and speaker further immerse players without headphones. The DualSense is the most innovative controller in console history.",
        specs: [
            { label: "Connectivity", value: "Bluetooth 5.1 / USB-C wired" },
            { label: "Battery", value: "Built-in Li-ion (1560 mAh)" },
            { label: "Battery Life", value: "Up to 12 hours" },
            { label: "Features", value: "Adaptive Triggers, Haptic Feedback" },
            { label: "Audio", value: "Integrated speaker + 3.5mm headphone jack" },
            { label: "Microphone", value: "Built-in dual mic array" },
            { label: "Colors", value: "White, Midnight Black, Cosmic Red, Nova Pink" },
            { label: "Compatibility", value: "PS5, PC (via USB or Bluetooth)" },
        ],
    },
    {
        id: 2002,
        name: "PlayStation VR2",
        category: "accessory",
        price: 54990,
        image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&q=80",
        badge: "NEXT-GEN VR",
        badgeColor: "hsl(280 80% 55%)",
        tagline: "Enter the world of the game.",
        description:
            "PlayStation VR2 is Sony's definitive Virtual Reality headset for PS5. Featuring 4K OLED HDR displays — one per eye — at 110° field of view, eye tracking for foveated rendering, and 3D Audio from the Tempest engine, PSVR2 delivers cinema-grade VR experiences without compromise. The Sense controllers mirror the DualSense's adaptive triggers and haptic feedback, putting sensation in your hands as well as your vision. Over 100 VR games available at launch.",
        specs: [
            { label: "Display", value: "4K OLED — 2000×2040 per eye" },
            { label: "Refresh Rate", value: "90Hz / 120Hz" },
            { label: "Field of View", value: "110 degrees" },
            { label: "Eye Tracking", value: "Yes — foveated rendering" },
            { label: "Audio", value: "3D Tempest + built-in mic" },
            { label: "Connectivity", value: "Single USB-C cable to PS5" },
            { label: "Cameras", value: "4× built-in IR cameras (inside-out tracking)" },
            { label: "Controllers", value: "2× VR Sense controllers" },
        ],
    },
    {
        id: 2003,
        name: "DualSense Charging Station",
        category: "accessory",
        price: 2999,
        image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=600&q=80",
        tagline: "Always charged. Always ready.",
        description:
            "The DualSense Charging Station lets you charge up to two DualSense controllers simultaneously without cables. Simply dock the controllers and the station's smart charging circuit maintains battery health automatically. Compatible with all DualSense color variants, the charging station's clean minimalist design complements the PS5's aesthetic perfectly. A must-have for serious PlayStation players.",
        specs: [
            { label: "Charges", value: "Up to 2 DualSense controllers" },
            { label: "Connector", value: "Proprietary dock (USB-C equivalent)" },
            { label: "Input", value: "USB-A (cable included for PS5)" },
            { label: "LED", value: "Ambient charging status indicator" },
            { label: "Compatibility", value: "All DualSense variants" },
            { label: "Dimensions", value: "155 × 102 × 62 mm" },
        ],
    },
    {
        id: 2004,
        name: "Sony Pulse 3D Wireless Headset",
        category: "accessory",
        price: 9990,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
        badge: "3D AUDIO",
        badgeColor: "hsl(200 100% 50%)",
        tagline: "Hear every dimension.",
        description:
            "The Sony Pulse 3D Wireless Headset is specifically engineered for PlayStation 5's Tempest 3D AudioTech. Dual noise-cancelling microphones positioned to avoid breath and friction noise, a 12-hour wireless battery life, and tuned audio specifically for PS5's spatial sound engine make this headset the ideal companion for immersive gaming. USB wireless adapter or 3.5mm wired connectivity supported.",
        specs: [
            { label: "Connectivity", value: "USB wireless adapter / 3.5mm" },
            { label: "Battery", value: "Li-ion 1100mAh" },
            { label: "Battery Life", value: "Up to 12 hours" },
            { label: "Microphone", value: "Dual noise-cancelling built-in" },
            { label: "Frequency", value: "20Hz – 20,000 Hz" },
            { label: "Audio", value: "Optimized for Tempest 3D AudioTech" },
            { label: "Colors", value: "White, Midnight Black, Grey Camouflage" },
            { label: "Compatibility", value: "PS5, PS4, PC, Mobile" },
        ],
    },
    {
        id: 2005,
        name: "PlayStation Media Remote",
        category: "accessory",
        price: 2490,
        image: "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=600&q=80",
        tagline: "Control without the controller.",
        description:
            "The PlayStation Media Remote is the perfect companion for using your PS5 as an entertainment hub. Control playback, volume, and navigation for streaming apps — Netflix, Disney+, Apple TV+, Spotify, YouTube — without needing to power on your DualSense. Infrared TV control lets you manage your TV and AV receiver volume from the same remote. Backlit buttons ensure comfortable use in dark home cinema setups.",
        specs: [
            { label: "Connectivity", value: "Bluetooth 4.2" },
            { label: "Battery", value: "2× AAA (included)" },
            { label: "Battery Life", value: "Up to 3 months" },
            { label: "Buttons", value: "Backlit in dark environments" },
            { label: "IR Control", value: "TV + AV receiver volume control" },
            { label: "Compatibility", value: "PlayStation 5 only" },
        ],
    },
    {
        id: 2006,
        name: "PlayStation 5 HD Camera",
        category: "accessory",
        price: 5990,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
        tagline: "Share your face with the world.",
        description:
            "The PlayStation 5 HD Camera adds a dual-lens 1080p camera to your PS5 setup, designed for streaming and video sharing. The built-in background removal algorithm removes your wallpaper cleanly without requiring a green screen, letting you overlay yourself onto gameplay. It supports PlayStation's SharePlay and Broadcast features, and is compatible with all major streaming platforms including Twitch and YouTube.",
        specs: [
            { label: "Resolution", value: "1080p (Full HD)" },
            { label: "Lenses", value: "Dual wide-angle lens array" },
            { label: "Background", value: "AI background segmentation" },
            { label: "Connectivity", value: "USB-A to PS5" },
            { label: "Microphone", value: "Built-in array mic" },
            { label: "Compatibility", value: "PlayStation 5 only" },
        ],
    },
];

const CATEGORIES = [
    { key: "all", label: "All Products" },
    { key: "ps5", label: "PlayStation 5" },
    { key: "ps4", label: "PlayStation 4" },
    { key: "accessory", label: "Accessories" },
];

export default function Consoles() {
    const { addToCart, setCartOpen } = useApp();
    const [category, setCategory] = useState<"all" | "ps5" | "ps4" | "accessory">("all");
    const [selected, setSelected] = useState<Product | null>(null);
    const [toastMsg, setToastMsg] = useState("");
    const [toastVisible, setToastVisible] = useState(false);

    const filtered =
        category === "all" ? products : products.filter((p) => p.category === category);

    const showToast = (msg: string) => {
        setToastMsg(msg);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2500);
    };

    const handleCart = (p: Product, e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart({ id: p.id, title: p.name, price: p.price, image: p.image });
        showToast(`${p.name} added to cart`);
        setCartOpen(true);
    };

    return (
        <motion.div
            className="min-h-screen pb-20 md:pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Toast message={toastMsg} visible={toastVisible} />

            {/* Hero */}
            <div
                className="relative h-64 flex items-center justify-center overflow-hidden"
                style={{
                    background:
                        "linear-gradient(135deg, hsl(220 30% 8%) 0%, hsl(215 80% 15%) 50%, hsl(220 30% 8%) 100%)",
                }}
            >
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(90deg, hsl(200 100% 50%) 0px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, hsl(200 100% 50%) 0px, transparent 1px, transparent 80px)",
                    }}
                />
                <div className="relative text-center">
                    <h1
                        className="font-rajdhani font-bold text-6xl md:text-8xl tracking-wider"
                        style={{
                            background:
                                "linear-gradient(135deg, hsl(200 100% 70%), hsl(200 100% 50%))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        PLAYSTATION
                    </h1>
                    <p className="text-ps-secondary font-inter tracking-widest text-sm uppercase mt-2">
                        Consoles · Accessories · Next Level
                    </p>
                </div>
            </div>

            <div className="px-4 md:px-10 py-8">
                {/* Category filter */}
                <div className="flex gap-3 flex-wrap mb-8">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => setCategory(cat.key as typeof category)}
                            className={`font-rajdhani font-bold px-5 py-2 rounded-xl text-sm tracking-wide transition-all ${category === cat.key
                                    ? "text-white"
                                    : "bg-ps-surface border border-ps-border text-ps-secondary hover:text-foreground hover:border-ps-neon"
                                }`}
                            style={
                                category === cat.key
                                    ? {
                                        background: "hsl(200 100% 50%)",
                                        boxShadow: "0 0 20px hsl(200 100% 50% / 0.4)",
                                    }
                                    : {}
                            }
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Product grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((p) => (
                            <motion.div
                                key={p.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -6 }}
                                className="ps-card rounded-2xl overflow-hidden cursor-pointer group"
                                onClick={() => setSelected(p)}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                                    {p.badge && (
                                        <span
                                            className="absolute top-3 left-3 text-white text-xs font-rajdhani font-bold px-3 py-1 rounded-lg"
                                            style={{ background: p.badgeColor }}
                                        >
                                            {p.badge}
                                        </span>
                                    )}
                                    <span className="absolute bottom-3 left-3 text-xs font-rajdhani font-semibold text-ps-secondary uppercase tracking-widest bg-background/70 px-2 py-0.5 rounded">
                                        {p.category === "ps5"
                                            ? "PlayStation 5"
                                            : p.category === "ps4"
                                                ? "PlayStation 4"
                                                : "Accessory"}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-rajdhani font-bold text-base leading-tight mb-1">
                                        {p.name}
                                    </h3>
                                    <p className="text-ps-secondary text-xs font-inter mb-3">
                                        {p.tagline}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span
                                            className="font-rajdhani font-bold text-2xl"
                                            style={{ color: "hsl(200 100% 60%)" }}
                                        >
                                            ₹{p.price.toLocaleString()}
                                        </span>
                                        <motion.button
                                            whileHover={{ scale: 1.08 }}
                                            whileTap={{ scale: 0.94 }}
                                            onClick={(e) => handleCart(p, e)}
                                            className="text-sm font-rajdhani font-bold px-4 py-1.5 rounded-xl text-white"
                                            style={{
                                                background: "hsl(200 100% 50%)",
                                                boxShadow: "0 0 12px hsl(200 100% 50% / 0.3)",
                                            }}
                                        >
                                            🛒 Add
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                    >
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
                        <motion.div
                            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-ps-border ps-glass"
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Banner */}
                            <div className="relative h-56 overflow-hidden rounded-t-2xl">
                                <img
                                    src={selected.image}
                                    alt={selected.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                                <button
                                    onClick={() => setSelected(null)}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/70 flex items-center justify-center text-ps-secondary hover:text-foreground transition-colors"
                                >
                                    ✕
                                </button>
                                {selected.badge && (
                                    <span
                                        className="absolute top-4 left-4 text-white text-xs font-rajdhani font-bold px-3 py-1 rounded-lg"
                                        style={{ background: selected.badgeColor }}
                                    >
                                        {selected.badge}
                                    </span>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div>
                                        <h2 className="font-rajdhani font-bold text-3xl leading-tight">
                                            {selected.name}
                                        </h2>
                                        <p className="text-ps-secondary font-inter text-sm mt-1">
                                            {selected.tagline}
                                        </p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p
                                            className="font-rajdhani font-bold text-3xl"
                                            style={{ color: "hsl(200 100% 60%)" }}
                                        >
                                            ₹{selected.price.toLocaleString()}
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={(e) => { handleCart(selected, e); setSelected(null); }}
                                            className="mt-2 text-sm font-rajdhani font-bold px-5 py-2 rounded-xl text-white"
                                            style={{
                                                background: "hsl(200 100% 50%)",
                                                boxShadow: "0 0 16px hsl(200 100% 50% / 0.4)",
                                            }}
                                        >
                                            🛒 Add to Cart
                                        </motion.button>
                                    </div>
                                </div>

                                <p className="text-foreground/80 font-inter text-sm leading-relaxed mb-6">
                                    {selected.description}
                                </p>

                                <h3
                                    className="font-rajdhani font-bold text-xl mb-3"
                                    style={{ color: "hsl(200 100% 60%)" }}
                                >
                                    Specifications
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {selected.specs.map((spec) => (
                                        <div
                                            key={spec.label}
                                            className="flex flex-col p-3 rounded-xl"
                                            style={{ background: "hsl(220 20% 8%)" }}
                                        >
                                            <span className="text-ps-secondary text-xs font-rajdhani uppercase tracking-widest">
                                                {spec.label}
                                            </span>
                                            <span className="text-sm font-semibold mt-0.5">
                                                {spec.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
