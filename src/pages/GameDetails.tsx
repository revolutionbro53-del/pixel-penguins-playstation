import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gamesData } from '@/data/games';
import { useApp } from '@/context/AppContext';
import Toast from '@/components/Toast';
import { useState } from 'react';

export default function GameDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, setCartOpen } = useApp();

    const [toastMsg, setToastMsg] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const [following, setFollowing] = useState(false);

    const game = gamesData.find(g => g.id === Number(id));

    if (!game) {
        return (
            <div className="min-h-screen flex items-center justify-center text-ps-secondary font-rajdhani text-2xl">
                Game Not Found
            </div>
        );
    }

    const showToast = (msg: string) => {
        setToastMsg(msg);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2500);
    };

    const handleAddToCart = () => {
        addToCart({ id: game.id, title: game.title, price: game.price, image: game.image });
        showToast(`${game.title} added to cart`);
        setCartOpen(true);
    };

    const handleFollow = () => {
        setFollowing(prev => !prev);
        showToast(following ? `Unfollowed ${game.title}` : `Now following ${game.title}!`);
    };

    const accentColor = `hsl(${game.themeColor})`;
    const accentGlow = `0 0 30px hsl(${game.themeColor} / 0.4)`;

    return (
        <motion.div
            className="min-h-screen pb-20 md:pb-8 pt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Toast message={toastMsg} visible={toastVisible} />

            {/* Hero Banner */}
            <div className="relative h-[55vh] min-h-[420px] w-full">
                <div className="absolute inset-0">
                    <img
                        src={game.bannerImage}
                        alt={game.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
                {/* Colour accent from game theme */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ background: `linear-gradient(135deg, ${accentColor} 0%, transparent 60%)` }}
                />

                {/* Content */}
                <div className="absolute inset-0 px-6 md:px-14 flex flex-col justify-end pb-10">
                    <button
                        onClick={() => navigate('/store')}
                        className="mb-4 self-start flex gap-2 items-center text-ps-secondary hover:text-foreground transition-colors font-rajdhani text-xs uppercase tracking-widest font-bold"
                    >
                        ← BACK TO STORE
                    </button>

                    <div className="flex items-center gap-3 mb-3">
                        {game.exclusive && (
                            <span
                                className="text-white text-xs font-rajdhani font-bold px-3 py-1 rounded-lg tracking-wide"
                                style={{ background: accentColor, boxShadow: accentGlow }}
                            >
                                PS EXCLUSIVE
                            </span>
                        )}
                        <span className="text-sm bg-ps-surface-2 border border-ps-border text-ps-secondary px-3 py-1 rounded-lg">
                            {game.genre}
                        </span>
                    </div>

                    <h1
                        className="font-rajdhani font-bold text-5xl md:text-7xl leading-none mb-6 drop-shadow-2xl"
                        style={{ color: 'white', textShadow: `0 0 40px ${accentColor}` }}
                    >
                        {game.title}
                    </h1>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex flex-col">
                            <span className="text-ps-secondary text-xs uppercase tracking-widest">Price</span>
                            <span
                                className="font-rajdhani font-bold text-4xl"
                                style={{ color: accentColor }}
                            >
                                ₹{game.price.toLocaleString()}
                            </span>
                        </div>

                        <motion.button
                            onClick={handleAddToCart}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="font-rajdhani font-bold text-lg px-7 py-3 rounded-xl tracking-wide flex items-center gap-2 text-white transition-all"
                            style={{
                                background: accentColor,
                                boxShadow: accentGlow,
                            }}
                        >
                            🛒 ADD TO CART
                        </motion.button>

                        <motion.button
                            onClick={handleFollow}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`font-rajdhani font-bold text-lg px-7 py-3 rounded-xl tracking-wide flex items-center gap-2 border-2 transition-all ${following
                                    ? 'text-white border-transparent'
                                    : 'bg-transparent text-foreground border-ps-border hover:border-foreground'
                                }`}
                            style={following ? { background: accentColor, borderColor: accentColor } : {}}
                        >
                            {following ? '✓ FOLLOWING' : '+ FOLLOW GAME'}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-6 md:px-14 py-10 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Left: Description + Reviews */}
                <div className="lg:col-span-2 space-y-12">

                    {/* About */}
                    <section>
                        <h2
                            className="font-rajdhani font-bold text-3xl mb-4 pb-2 border-b border-ps-border"
                            style={{ color: accentColor }}
                        >
                            About The Game
                        </h2>
                        <p className="text-foreground/90 font-inter text-base leading-relaxed mb-4">
                            {game.description}
                        </p>
                        <p className="text-foreground/70 font-inter text-sm leading-relaxed">
                            {game.longDescription}
                        </p>
                    </section>

                    {/* Game Info */}
                    <section className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-ps-surface border border-ps-border p-6 rounded-2xl">
                        {[
                            { label: 'Developer', value: game.developer },
                            { label: 'Publisher', value: game.publisher },
                            { label: 'Release Date', value: game.releaseDate },
                            { label: 'Players', value: game.players },
                            { label: 'Genre', value: game.genre },
                            { label: 'Rating', value: `${game.rating} / 5 ★` },
                        ].map(info => (
                            <div key={info.label}>
                                <p className="text-ps-secondary text-xs font-rajdhani font-semibold uppercase tracking-widest mb-1">
                                    {info.label}
                                </p>
                                <p className="font-semibold text-sm">{info.value}</p>
                            </div>
                        ))}
                    </section>

                    {/* User Reviews */}
                    <section>
                        <h2
                            className="font-rajdhani font-bold text-3xl mb-6 pb-2 border-b border-ps-border"
                            style={{ color: accentColor }}
                        >
                            Player Reviews
                        </h2>
                        <div className="space-y-4">
                            {game.reviews.map((review, i) => (
                                <motion.div
                                    key={i}
                                    className="ps-glass border border-ps-border rounded-2xl p-5"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="flex items-start gap-4">
                                        <img
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.avatarSeed}`}
                                            alt={review.user}
                                            className="w-12 h-12 rounded-xl bg-ps-surface-2 flex-shrink-0"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-rajdhani font-bold">{review.user}</span>
                                                    <span className="text-ps-secondary text-xs">{review.date}</span>
                                                </div>
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3, 4, 5].map(s => (
                                                        <span
                                                            key={s}
                                                            className="text-sm"
                                                            style={{ color: s <= review.rating ? accentColor : 'hsl(215 15% 40%)' }}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-foreground/80 font-inter text-sm leading-relaxed">
                                                "{review.comment}"
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right: System Requirements */}
                <div className="space-y-6">
                    <section
                        className="bg-ps-surface-2 border border-ps-border p-6 rounded-2xl ps-glass sticky top-24"
                        style={{ borderColor: `hsl(${game.themeColor} / 0.3)`, boxShadow: `0 0 20px hsl(${game.themeColor} / 0.1)` }}
                    >
                        <h2
                            className="font-rajdhani font-bold text-2xl mb-6"
                            style={{ color: accentColor }}
                        >
                            System Requirements
                        </h2>
                        <div className="space-y-4 font-inter">
                            {[
                                { label: 'OS', value: game.systemRequirements.os },
                                { label: 'Processor', value: game.systemRequirements.processor },
                                { label: 'Memory', value: game.systemRequirements.memory },
                                { label: 'Graphics', value: game.systemRequirements.graphics },
                                { label: 'Storage', value: game.systemRequirements.storage },
                            ].map((req, i, arr) => (
                                <div key={req.label}>
                                    <div className="flex flex-col">
                                        <span className="text-ps-secondary text-xs uppercase tracking-widest mb-1">
                                            {req.label}
                                        </span>
                                        <span className="text-sm font-medium">{req.value}</span>
                                    </div>
                                    {i < arr.length - 1 && <div className="w-full h-px bg-ps-border/40 mt-4" />}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </motion.div>
    );
}
