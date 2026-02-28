export interface SystemRequirements {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
}

export interface Review {
    user: string;
    avatarSeed: string;
    rating: number;
    date: string;
    comment: string;
}

export interface Game {
    id: number;
    title: string;
    genre: string;
    price: number;
    rating: number;
    exclusive: boolean;
    image: string;
    bannerImage: string;
    themeColor: string;
    description: string;
    longDescription: string;
    developer: string;
    publisher: string;
    releaseDate: string;
    players: string;
    systemRequirements: SystemRequirements;
    reviews: Review[];
}

export const gamesData: Game[] = [
    {
        id: 1,
        title: "Spider-Man 2",
        genre: "Action",
        price: 3999,
        rating: 4.7,
        exclusive: true,
        image: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=800&q=80",
        bannerImage: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=1600&q=80",
        themeColor: "220 100% 50%",
        description: "Spider-Men Peter Parker and Miles Morales face the ultimate test of strength inside and outside the mask as they fight to save the city, each other and the ones they love, from the monstrous Venom.",
        longDescription: "Marvel's Spider-Man 2 is a 2023 action-adventure game developed by Insomniac Games. Set in an expansive open-world New York City, players switch between Peter Parker and Miles Morales, each boasting unique abilities and combat styles. The symbiote storyline takes dark and emotional turns as Peter bonds with the Venom suit, changing his personality and powers dramatically. The game features breathtaking slingshot mechanics, wing suit traversal, and an epic dual Spider-Man finale. With over 60 side missions, authentic NYC neighborhoods, and cinematic storytelling that rivals Marvel films, this is the definitive Spider-Man experience.",
        developer: "Insomniac Games",
        publisher: "Sony Interactive Entertainment",
        releaseDate: "October 20, 2023",
        players: "Single Player",
        systemRequirements: {
            os: "PlayStation 5",
            processor: "AMD Zen 2 8-core",
            memory: "16 GB GDDR6",
            graphics: "AMD RDNA 2",
            storage: "98 GB Minimum"
        },
        reviews: [
            { user: "NightOwl_PS", avatarSeed: "nightowl", rating: 5, date: "Nov 2023", comment: "Absolute masterpiece! The dual Spider-Man gameplay is insane. Switching between Peter and Miles on the fly feels seamless. The Venom boss fight alone is worth the price." },
            { user: "ArcticFox99", avatarSeed: "arctic", rating: 5, date: "Dec 2023", comment: "Best superhero game ever made. Period. The wingsuit traversal combined with web swinging is a game changer. Story had me emotional multiple times!" },
            { user: "ShadowRunner", avatarSeed: "shadow", rating: 4, date: "Jan 2024", comment: "Gorgeous game, fantastic gameplay. The symbiote suit changes up combat nicely. My only minor gripe is the game felt a bit short for such an epic setup." },
        ]
    },
    {
        id: 2,
        title: "God of War: Ragnarök",
        genre: "RPG",
        price: 4499,
        rating: 4.9,
        exclusive: true,
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
        bannerImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1600&q=80",
        themeColor: "0 80% 45%",
        description: "Fimbulwinter is well underway. Kratos and Atreus must journey to each of the Nine Realms in search of answers as Asgardian forces prepare for a prophesied battle that will end the world.",
        longDescription: "God of War Ragnarök is a 2022 action-adventure game developed by Santa Monica Studio. Continuing directly from God of War (2018), this epic sequel explores all Nine Norse Realms while delivering one of the most emotionally powerful father-son stories in gaming. Kratos and Atreus face the might of the Norse gods Odin and Thor, uncovering prophecies, alliances, and heartbreaking truths. The combat is deeper than ever with new Draupnir spear weapon, revamped shield mechanics, and Atreus playable sections. Boasting extraordinary environmental storytelling, zero loading screens, and a jaw-dropping finale, Ragnarök sets an unmatched benchmark for epic gaming narratives.",
        developer: "Santa Monica Studio",
        publisher: "Sony Interactive Entertainment",
        releaseDate: "November 9, 2022",
        players: "Single Player",
        systemRequirements: {
            os: "PlayStation 5",
            processor: "AMD Zen 2 8-core",
            memory: "16 GB GDDR6",
            graphics: "AMD RDNA 2",
            storage: "84 GB Minimum"
        },
        reviews: [
            { user: "GhostBlade42", avatarSeed: "ghostblade", rating: 5, date: "Nov 2022", comment: "I cried. I laughed. I screamed. This game is an emotional rollercoaster that no other franchise can replicate. Kratos's character arc is one of gaming's greatest." },
            { user: "VelvetStrike", avatarSeed: "velvet", rating: 5, date: "Dec 2022", comment: "Playing through all Nine Realms was breathtaking. The narrative depth, world-building, and combat refinements make this an absolute 10/10 experience." },
            { user: "CosmicDrift", avatarSeed: "cosmic", rating: 5, date: "Jan 2023", comment: "The Thor encounter in the opening blew my mind. Continued to awe me right to the very final moment. Buy it — you won't regret a single second." },
        ]
    },
    {
        id: 3,
        title: "Gran Turismo 7",
        genre: "Sports",
        price: 3499,
        rating: 4.3,
        exclusive: true,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        bannerImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
        themeColor: "215 100% 60%",
        description: "Whether you're a competitive or casual racer, collector, tuner, livery designer, or photographer – find your line with a staggering collection of game modes.",
        longDescription: "Gran Turismo 7 brings together the key elements of the franchise's history: the authenticity of a car simulation with 400+ meticulously crafted vehicles, the breadth of the car culture from motorsport to street cars, and the depth of GT's legendary customization system. Featuring 90+ legendary tracks from around the world, dynamic weather and time-of-day systems, and stunning SOPHY AI powered racing that adapts to your driving style. The GT Campaign offers rich single-player missions, while Sport Mode provides competitive online racing with esports-grade precision. The Scapes photo mode turns every car into a work of art.",
        developer: "Polyphony Digital",
        publisher: "Sony Interactive Entertainment",
        releaseDate: "March 4, 2022",
        players: "1–2 Players (Online: 2–20)",
        systemRequirements: {
            os: "PlayStation 5",
            processor: "AMD Zen 2 8-core",
            memory: "16 GB GDDR6",
            graphics: "AMD RDNA 2",
            storage: "110 GB Minimum"
        },
        reviews: [
            { user: "ArcticFox99", avatarSeed: "arctic", rating: 4, date: "Mar 2022", comment: "The attention to detail in every car is astounding. GT7 is a love letter to the automobile. The DualSense haptic feedback when braking on different surfaces is unmatched." },
            { user: "PixelProwler", avatarSeed: "pixel", rating: 4, date: "May 2022", comment: "Best looking racing game I've ever played. The livery editor keeps me busy for hours. Online sport mode has a fantastic community of clean racers." },
            { user: "NightOwl_PS", avatarSeed: "nightowl", rating: 5, date: "Aug 2022", comment: "I've played every GT since GT3 and this is the best one. The music, the cars, the tracks — pure automotive passion in game form." },
        ]
    },
    {
        id: 4,
        title: "Returnal",
        genre: "Indie",
        price: 2999,
        rating: 4.5,
        exclusive: true,
        image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&q=80",
        bannerImage: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1600&q=80",
        themeColor: "160 80% 40%",
        description: "Break the cycle as this award-winning third-person shooter brings bullet hell action to PC. Selene's roguelike odyssey arrives with a suite of graphical and performance-based enhancements.",
        longDescription: "Returnal is a 2021 third-person shooter roguelike developed by Housemarque. Players control Selene Vassos, an astronaut who crash-lands on the alien planet Atropos and becomes trapped in a deadly time loop. Each death resets the world but keeps Selene's memories, slowly unraveling an atmospheric mystery interwoven with her own psychological journey. The fast-paced bullet-hell combat demands precision, rewarding skill and experimentation with each loop. As a PS5 showcase title, Returnal makes extraordinary use of the DualSense's haptic feedback and adaptive triggers, creating a deeply physical combat experience. Its integration of psychological horror and roguelike mechanics is entirely unique.",
        developer: "Housemarque",
        publisher: "Sony Interactive Entertainment",
        releaseDate: "April 30, 2021",
        players: "1–2 Players (Online Co-op)",
        systemRequirements: {
            os: "Windows 10 64-bit",
            processor: "Intel Core i7-8700 or AMD Ryzen 7 2700X",
            memory: "16 GB RAM",
            graphics: "NVIDIA RTX 2070 Super",
            storage: "60 GB Available Space"
        },
        reviews: [
            { user: "ShadowRunner", avatarSeed: "shadow", rating: 5, date: "Apr 2021", comment: "The most innovative game of the PS5 launch era. Every death teaches you something and the world-building through environmental clues is absolutely genius." },
            { user: "CosmicDrift", avatarSeed: "cosmic", rating: 4, date: "Jun 2021", comment: "Brutally hard but impossibly satisfying. The DualSense integration remains the best in any PS5 game. The story is cryptic but deeply layered." },
            { user: "VelvetStrike", avatarSeed: "velvet", rating: 5, date: "Aug 2021", comment: "Hands down the best roguelike I've ever played. The bullet-hell gameplay loops are perfectly designed. I've done 40 runs and each one feels different." },
        ]
    },
    {
        id: 5,
        title: "Resident Evil 4",
        genre: "Horror",
        price: 3299,
        rating: 4.8,
        exclusive: false,
        image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800&q=80",
        bannerImage: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=1600&q=80",
        themeColor: "120 40% 20%",
        description: "Survival is just the beginning. Six years have passed since the biological disaster in Raccoon City. Leon S. Kennedy tracks the president's kidnapped daughter to a secluded European village.",
        longDescription: "Resident Evil 4 Remake is a 2023 survival horror game developed by Capcom. This stunning reimagining of the legendary 2005 original preserves the soul of the classic while delivering a modern horror gaming masterpiece. Leon S. Kennedy's mission to rescue Ashley Graham from a sinister Spanish village-turned-cult is tense, atmospheric, and action-packed. The knife parry system, crafting mechanics, and new Ashley AI partnership make for uniquely dynamic gameplay. The game balances horror dread, puzzle solving, and over-the-shoulder action perfectly. Set across three distinct European environments — village, castle, and island — each area feels like a contained horror movie in its own right.",
        developer: "Capcom",
        publisher: "Capcom",
        releaseDate: "March 24, 2023",
        players: "Single Player",
        systemRequirements: {
            os: "PlayStation 5 / Win 10",
            processor: "AMD Ryzen 5 3600",
            memory: "16 GB RAM",
            graphics: "AMD Radeon RX 6700 XT",
            storage: "70 GB Minimum"
        },
        reviews: [
            { user: "GhostBlade42", avatarSeed: "ghostblade", rating: 5, date: "Mar 2023", comment: "The village section alone is scarier than most horror games in their entirety. This remake faithfully enhances what made the original iconic without losing any of its magic." },
            { user: "PixelProwler", avatarSeed: "pixel", rating: 5, date: "Apr 2023", comment: "I've played the original dozens of times and this remake blew me away. Every nook and cranny is redesigned with such love and care. Luis and Leon dynamic is hilarious and authentic." },
            { user: "NightOwl_PS", avatarSeed: "nightowl", rating: 5, date: "May 2023", comment: "Capcom perfected their RE Engine formula with this. Perfect pacing, superb enemy design, and the most fluid combat in the series. A new generation's first encounter with gaming's greatest remake." },
        ]
    },
    {
        id: 6,
        title: "FIFA 24 (FC 24)",
        genre: "Sports",
        price: 2499,
        rating: 4.0,
        exclusive: false,
        image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&q=80",
        bannerImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1600&q=80",
        themeColor: "135 80% 35%",
        description: "EA SPORTS FC™ 24 marks a new era for The World's Game: 19,000+ fully licensed players, 700+ teams, and 30+ leagues in the most authentic football experience ever created.",
        longDescription: "EA Sports FC 24 marks the launch of a bold new era for the world's most popular football franchise. With HyperMotionV technology trained on data from over 180 professional matches, every player movement and interaction feels biomechanically authentic. Play in 30+ leagues including the Premier League, La Liga, Bundesliga, and Champions League with 19,000+ real players. The new Playstyles system gives superstars unique abilities matching their real-world strengths — whether it's Mbappe's Rapid sprint or Haaland's Finesse Strike. Ultimate Team, Career Mode, Pro Clubs, and Volta Football offer hundreds of hours of diverse gaming experiences. The game bridges football fans and gaming with a level of authenticity unrivaled in sports games.",
        developer: "EA Sports",
        publisher: "Electronic Arts",
        releaseDate: "September 29, 2023",
        players: "1–4 Players (Online: 2+)",
        systemRequirements: {
            os: "Windows 10 64-bit",
            processor: "Intel Core i5-6600K",
            memory: "8 GB RAM",
            graphics: "NVIDIA GeForce GTX 1050 Ti",
            storage: "100 GB Minimum"
        },
        reviews: [
            { user: "ArcticFox99", avatarSeed: "arctic", rating: 4, date: "Oct 2023", comment: "The new Playstyles system genuinely changes how top players feel on the pitch. Mbappe with his speed burst is terrifying. Ultimate Team grind is as addictive as ever." },
            { user: "VelvetStrike", avatarSeed: "velvet", rating: 4, date: "Nov 2023", comment: "Smoother gameplay than FIFA 23. HyperMotionV makes the premier league experience feel more authentic than ever. Career Mode with new tactics is surprisingly deep this year." },
            { user: "CosmicDrift", avatarSeed: "cosmic", rating: 3, date: "Dec 2023", comment: "Good game but feels evolutionary rather than revolutionary. Volta is still undercooked and FUT pack economy remains frustrating. Pro Clubs overhaul is excellent though." },
        ]
    },
    {
        id: 7,
        title: "Elden Ring",
        genre: "RPG",
        price: 3799,
        rating: 4.9,
        exclusive: false,
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
        bannerImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1600&q=80",
        themeColor: "45 90% 50%",
        description: "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
        longDescription: "Elden Ring is a 2022 action RPG developed by FromSoftware in collaboration with George R. R. Martin. Set in the Lands Between, a breathtaking open world of unprecedented scale, players explore six major regions — each with distinct biomes, dungeons, bosses, and lore. The game delivers FromSoftware's signature challenging combat with new mounted combat on Torrent, spirit summons, and a vast weaponry system with thousands of build combinations. The world is layered with intricate lore written by G.R.R. Martin, discoverable through item descriptions, NPC questlines, and environmental storytelling. With 165+ hours of content, breathtaking boss encounters like Margit, Radahn, and Malenia, and seamless drop-in-drop-out online co-op, Elden Ring redefines what open-world RPGs can achieve.",
        developer: "FromSoftware Inc.",
        publisher: "Bandai Namco Entertainment",
        releaseDate: "February 25, 2022",
        players: "1–4 Players (Online Co-op/PvP)",
        systemRequirements: {
            os: "Windows 10",
            processor: "Intel Core i7-8400",
            memory: "16 GB RAM",
            graphics: "NVIDIA GeForce GTX 1070",
            storage: "60 GB Available Space"
        },
        reviews: [
            { user: "GhostBlade42", avatarSeed: "ghostblade", rating: 5, date: "Feb 2022", comment: "Game of a generation. The open world exploration is addictive — every hilltop hides something spectacular. Even after 200 hours I keep finding new questlines and dungeons." },
            { user: "ShadowRunner", avatarSeed: "shadow", rating: 5, date: "Mar 2022", comment: "FromSoftware's magnum opus. The Malenia fight is the greatest boss encounter in gaming history. Dark Souls fans and newcomers alike will find extraordinary depth here." },
            { user: "PixelProwler", avatarSeed: "pixel", rating: 5, date: "Apr 2022", comment: "Went in skeptical, came out a complete convert. The lore George R.R. Martin helped craft raises this well above typical fantasy fare. An absolute triumph." },
        ]
    },
    {
        id: 8,
        title: "Horizon Forbidden West",
        genre: "Action",
        price: 3999,
        rating: 4.6,
        exclusive: true,
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
        bannerImage: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1600&q=80",
        themeColor: "200 70% 45%",
        description: "Join Aloy as she braves the Forbidden West — a majestic but dangerous frontier that conceals mysterious new threats. Explore distant lands, fight bigger and more awe-inspiring machines.",
        longDescription: "Horizon Forbidden West is a 2022 action RPG developed by Guerrilla Games. Aloy ventures into the perilous Forbidden West — a stunning vision of post-apocalyptic America's Pacific coast — to find the source of a deadly blight killing the land. The game expands enormously on the original with 6x surface area including dense jungles, submerged cities, and mountain ranges. New machine types are terrifying and beautiful, from massive Tremortusks to aquatic machines in fully explorable underwater environments. Aloy gains powerful new tools like the Pullcaster, Shield-Wing, and Shieldwing. Featuring dozens of memorable human tribes, a complex mystery about Earth's past, and breathtaking vistas that routinely stop you in your tracks.",
        developer: "Guerrilla Games",
        publisher: "Sony Interactive Entertainment",
        releaseDate: "February 18, 2022",
        players: "Single Player",
        systemRequirements: {
            os: "PlayStation 5",
            processor: "AMD Zen 2 8-core",
            memory: "16 GB GDDR6",
            graphics: "AMD RDNA 2",
            storage: "90 GB Minimum"
        },
        reviews: [
            { user: "CosmicDrift", avatarSeed: "cosmic", rating: 5, date: "Feb 2022", comment: "The underwater sections blew my mind. Guerrilla have created one of the most visually stunning open worlds ever made. Swimming through sunken San Francisco was breathtaking." },
            { user: "NightOwl_PS", avatarSeed: "nightowl", rating: 5, date: "Mar 2022", comment: "Everything Horizon Zero Dawn did, this does bigger and better. The new Tenakth tribe is one of my favorite factions in gaming. Machine combat remains the most satisfying in the genre." },
            { user: "ArcticFox99", avatarSeed: "arctic", rating: 4, date: "Apr 2022", comment: "A massive visual and gameplay leap over the original. I particularly loved the added melee depth and rope caster combos. The story keeps you guessing until the very end." },
        ]
    },
    {
        id: 9,
        title: "Ghost of Tsushima",
        genre: "Action",
        price: 2999,
        rating: 4.7,
        exclusive: true,
        image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
        bannerImage: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600&q=80",
        themeColor: "350 70% 40%",
        description: "In the late 13th century, the Mongol empire has laid waste to entire nations. Jin Sakai, one of the last surviving samurai, must do whatever it takes to protect what's left of his home.",
        longDescription: "Ghost of Tsushima is a 2020 open-world action-adventure developed by Sucker Punch Productions. Set during the 1274 Mongol invasion of Japan, Jin Sakai undergoes a profound transformation from honorable samurai to a cunning Ghost warrior. The game's feudal Japan is rendered with extraordinary artistic care — golden plains, crimson autumn forests, and ethereal firefly meadows guided by an ever-present guiding wind mechanic. Combat is a masterwork of choreography: precise sword stances, perfect parries, and stealth assassinations create deeply satisfying rhythm. The Legends multiplayer mode and Director's Cut Iki Island expansion add enormous replayability. Ghost of Tsushima is arguably PlayStation's most visually poetic and culturally respectful open-world game.",
        developer: "Sucker Punch Productions",
        publisher: "Sony Interactive Entertainment",
        releaseDate: "July 17, 2020",
        players: "1–4 Players (Online: Legends Mode)",
        systemRequirements: {
            os: "PlayStation 5",
            processor: "AMD Zen 2 8-core",
            memory: "16 GB GDDR6",
            graphics: "AMD RDNA 2",
            storage: "60 GB Minimum"
        },
        reviews: [
            { user: "GhostBlade42", avatarSeed: "ghostblade", rating: 5, date: "Jul 2020", comment: "The most cinematic game I have ever played. Guiding Wind navigation is revolutionary — no minimap needed! The standoff duels feel like stepping into an Akira Kurosawa film." },
            { user: "VelvetStrike", avatarSeed: "velvet", rating: 5, date: "Aug 2020", comment: "Breathtakingly beautiful every single second. The Kurosawa mode is genius. I took over 300 photos using the built-in camera mode. Pure artistic achievement in game form." },
            { user: "ShadowRunner", avatarSeed: "shadow", rating: 5, date: "Sep 2020", comment: "The samurai-to-ghost story arc is one of gaming's most emotionally engaging character evolutions. Legends co-op is fantastic fun and Iki Island is worth the price alone." },
        ]
    },
    {
        id: 10,
        title: "Celeste",
        genre: "Indie",
        price: 999,
        rating: 4.8,
        exclusive: false,
        image: "https://images.unsplash.com/photo-1490750967868-88df5691cc83?w=800&q=80",
        bannerImage: "https://images.unsplash.com/photo-1490750967868-88df5691cc83?w=1600&q=80",
        themeColor: "300 70% 50%",
        description: "Help Madeline survive her inner demons on her journey to the top of Celeste Mountain, in this super-tight platformer from the creators of TowerFall.",
        longDescription: "Celeste is a 2018 precision platformer developed by Maddy Makes Games. The game follows Madeline, a young woman battling severe anxiety and depression who decides to climb Celeste Mountain as a personal challenge. What appears to be a challenging platformer reveals itself to be a beautifully nuanced story about mental health, self-acceptance, and perseverance — topics rarely explored this authentically in gaming. Each screen is a hand-crafted puzzle requiring precise dashes, wall climbs, and timing. The game hides optional B-side chapters and a heart-pounding epilogue for completionists. BAFTA-award-winning Chiptune composer Lena Raine's soundtrack is one of gaming's finest. Celeste proves indie games can be as meaningful as any AAA title.",
        developer: "Maddy Makes Games",
        publisher: "Maddy Makes Games",
        releaseDate: "January 25, 2018",
        players: "Single Player",
        systemRequirements: {
            os: "Windows 7 or newer",
            processor: "Intel Core i3 M380",
            memory: "2 GB RAM",
            graphics: "Intel HD 4000",
            storage: "1 GB Available Space"
        },
        reviews: [
            { user: "PixelProwler", avatarSeed: "pixel", rating: 5, date: "Jan 2018", comment: "One of the most meaningful games I've ever played. The mental health narrative hit incredibly close to home. The B-sides will humble even the most experienced platformer veterans." },
            { user: "CosmicDrift", avatarSeed: "cosmic", rating: 5, date: "Feb 2018", comment: "Perfect game. Every death is your fault, every success feels earned. Lena Raine's soundtrack belongs in a museum. Indie GOTY and one of the best games ever made, simple as that." },
            { user: "NightOwl_PS", avatarSeed: "nightowl", rating: 5, date: "Mar 2018", comment: "Celeste changed how I think about games as art. The dialogue between Madeline and her dark side is remarkably mature. The assist mode shows incredible accessibility-forward design thinking." },
        ]
    },
    {
        id: 11,
        title: "Dead Space",
        genre: "Horror",
        price: 2799,
        rating: 4.5,
        exclusive: false,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
        bannerImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
        themeColor: "15 90% 30%",
        description: "The sci-fi survival horror classic returns completely rebuilt from the ground up to offer a deeper, more immersive experience set aboard the haunted USG Ishimura.",
        longDescription: "Dead Space (2023) is a remake of the acclaimed 2008 survival horror game, developed by Motive Studio and published by Electronic Arts. Isaac Clarke, an everyman engineer, receives a distress signal from the mining vessel USG Ishimura and discovers a nightmarish outbreak of grotesque alien creatures called Necromorphs. The remake rebuilds the entire game from scratch using the Frostbite engine, delivering photo-realistic lighting, physics-based gore, and a fully seamless zero-loading-screen experience aboard the haunted ship. Isaac's new voiced character adds emotional depth to his story. The strategic dismemberment combat system remains intact and more visceral than ever. New extended story sequences and optional areas enrich the original's already compelling mystery.",
        developer: "Motive Studio",
        publisher: "Electronic Arts",
        releaseDate: "January 27, 2023",
        players: "Single Player",
        systemRequirements: {
            os: "Windows 10 64-bit",
            processor: "AMD Ryzen 5 2600x",
            memory: "16 GB RAM",
            graphics: "AMD RX 6700 XT",
            storage: "50 GB Minimum"
        },
        reviews: [
            { user: "GhostBlade42", avatarSeed: "ghostblade", rating: 5, date: "Jan 2023", comment: "The Ishimura has never been more terrifying. Zero loading screen immersion combined with the new lighting makes even familiar rooms genuinely horrifying. Motive nailed it completely." },
            { user: "ShadowRunner", avatarSeed: "shadow", rating: 4, date: "Feb 2023", comment: "A respectful remake that improves the original while keeping its soul intact. Isaac's new voice performance adds so much to the horror experience. Strategic dismemberment is still terrifyingly satisfying." },
            { user: "ArcticFox99", avatarSeed: "arctic", rating: 5, date: "Mar 2023", comment: "I played the original in 2008 alone at midnight and was traumatized. This remake did the exact same thing to me 15 years later. Masterful horror craftsmanship throughout." },
        ]
    },
    {
        id: 12,
        title: "Bloodborne",
        genre: "RPG",
        price: 1999,
        rating: 4.9,
        exclusive: true,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
        bannerImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80",
        themeColor: "270 60% 35%",
        description: "Hunt your nightmares in the cursed city of Yharnam. Danger, death and madness lurk around every corner of this dark and horrific Victorian gothic world.",
        longDescription: "Bloodborne is a 2015 action RPG developed by FromSoftware exclusively for PlayStation. Set in the Gothic Victorian city of Yharnam, where a mysterious plague has transformed its citizens into horrific beasts, players control a hunter tasked with unraveling the city's bloodborne curse. Unlike FromSoftware's Souls games, Bloodborne rewards aggressive combat — a regain system lets you recover lost health by immediately attacking back, creating uniquely thrilling risk-reward momentum. The trick weapons transform between two distinct forms mid-combat, like the iconic Threaded Cane or Saw Cleaver. Yahar'gul, the Unseen Village and the Chalice Dungeons add enormous depth. Its Lovecraftian cosmic horror narrative, delivered through cryptic item descriptions and NPC lore, rewards obsessive world-building fans.",
        developer: "FromSoftware",
        publisher: "Sony Interactive Entertainment",
        releaseDate: "March 24, 2015",
        players: "Single Player (Online Co-op Available)",
        systemRequirements: {
            os: "PlayStation 4/5",
            processor: "Custom 8-core AMD",
            memory: "8 GB GDDR5",
            graphics: "Custom AMD Radeon",
            storage: "40 GB Minimum"
        },
        reviews: [
            { user: "NightOwl_PS", avatarSeed: "nightowl", rating: 5, date: "Mar 2015", comment: "Bloodborne is FromSoftware's darkest, most atmospheric, and arguably most brilliant work. The Gothic architecture of Yharnam — every narrow alley hides something that will kill you and look beautiful doing it." },
            { user: "VelvetStrike", avatarSeed: "velvet", rating: 5, date: "Apr 2015", comment: "The aggressive counter-health regain system transforms every fight into a balletic dance of risk and reward. Lady Maria and Father Gascoigne are among gaming's greatest boss designs." },
            { user: "CosmicDrift", avatarSeed: "cosmic", rating: 5, date: "May 2015", comment: "A decade later and still one of gaming's greatest achievements. The cosmic horror twist in the final acts is genuinely mind-expanding. No PS4/5 owner should ever skip Bloodborne." },
        ]
    },
    {
        id: 13,
        title: "Cyberpunk 2077",
        genre: "RPG",
        price: 2999,
        rating: 4.4,
        exclusive: false,
        image: "https://images.unsplash.com/photo-1542751110-97427bbecfd6?w=800&q=80",
        bannerImage: "https://images.unsplash.com/photo-1542751110-97427bbecfd6?w=1600&q=80",
        themeColor: "300 100% 55%",
        description: "In the sprawling dystopia of Night City, become V — a mercenary outlaw going after a one-of-a-kind implant that grants the key to immortality.",
        longDescription: "Cyberpunk 2077 is a 2020 open-world RPG from CD PROJEKT RED set in the dystopian megalopolis of Night City. Players embody V, a customizable mercenary navigating complex criminal underworld power struggles. The game features branching narrative paths tied to three distinct life-path origins — Nomad, Street Kid, or Corporate — dramatically changing early story and dialogue options. Night City is a vertical, layered metropolis filled with dense street life, mega-corporations, gang territories, and towering arcologies. The 2022 Phantom Liberty expansion and 2.0 patch overhaul completely transformed the game with improved police systems, skill trees, and combat AI. Johnny Silverhand, voiced by Keanu Reeves, provides sardonic commentary throughout as an AI ghost living inside V's head.",
        developer: "CD PROJEKT RED",
        publisher: "CD PROJEKT RED",
        releaseDate: "December 10, 2020",
        players: "Single Player",
        systemRequirements: {
            os: "Windows 10 64-bit",
            processor: "Intel Core i7-6700K",
            memory: "16 GB RAM",
            graphics: "NVIDIA GeForce GTX 1060 6GB",
            storage: "70 GB Available Space",
        },
        reviews: [
            { user: "NightOwl_PS", avatarSeed: "nightowl", rating: 5, date: "Oct 2022", comment: "Post-patch Cyberpunk is a completely different game. The depth of Night City is unmatched — I spent 20 hours just exploring before touching main missions. A redemption arc done right." },
            { user: "VelvetStrike", avatarSeed: "velvet", rating: 4, date: "Jan 2023", comment: "Phantom Liberty is outstanding — the spy-thriller story rivals the base game's best moments. The 2.0 skill tree overhaul makes every build feel genuinely distinct." },
            { user: "CosmicDrift", avatarSeed: "cosmic", rating: 5, date: "Sep 2023", comment: "Johnny Silverhand is one of gaming's most complex characters. The ending I chose left me genuinely emotional. Cyberpunk 2077 ultimately delivered on its original promise." },
        ]
    },
    {
        id: 14,
        title: "The Last of Us Part I",
        genre: "Action",
        price: 4999,
        rating: 4.9,
        exclusive: true,
        image: "https://images.unsplash.com/photo-1586892478025-2b5472316f22?w=800&q=80",
        bannerImage: "https://images.unsplash.com/photo-1586892478025-2b5472316f22?w=1600&q=80",
        themeColor: "30 80% 35%",
        description: "Experience the emotional story of Joel and Ellie in a world ravaged by a deadly fungal plague. A complete remake built from the ground up for PS5.",
        longDescription: "The Last of Us Part I is a 2022 ground-up remake of Naughty Dog's 2013 masterpiece, rebuilt entirely for PlayStation 5. Set in a post-pandemic America overrun by Clickers — humans infected by the Cordyceps brain fungus — smuggler Joel is tasked with escorting teenager Ellie across the fractured country. What unfolds is one of gaming's greatest character studies: a story of grief, sacrifice, and the moral compromises humans make for love. The remake dramatically enhances visual fidelity to match The Last of Us Part II standards, adds PS5 haptic feedback, improved AI enemy behavior, and expanded accessibility features. Every performance-captured animation, lighting scenario, and environmental detail has been rebuilt from scratch. The Grounded difficulty and speedrun modes add depth for returning players.",
        developer: "Naughty Dog",
        publisher: "Sony Interactive Entertainment",
        releaseDate: "September 2, 2022",
        players: "Single Player",
        systemRequirements: {
            os: "PlayStation 5",
            processor: "AMD Zen 2 8-core",
            memory: "16 GB GDDR6",
            graphics: "AMD RDNA 2",
            storage: "79 GB Minimum",
        },
        reviews: [
            { user: "GhostBlade42", avatarSeed: "ghostblade", rating: 5, date: "Sep 2022", comment: "I've played this game four times since 2013 and this remake made me cry again. The upgraded faces and animations make the performances hit even harder. Mandatory gaming experience." },
            { user: "ArcticFox99", avatarSeed: "arctic", rating: 5, date: "Oct 2022", comment: "The DualSense haptics during the listen mode sequences are subtle but atmospheric. The new lighting completely transforms already gorgeous environments. Naughty Dog set an impossible bar." },
            { user: "ShadowRunner", avatarSeed: "shadow", rating: 5, date: "Nov 2022", comment: "If you've never played TLOU before, do it now. If you've played it already, this remake provides a reason to experience this masterpiece all over again with modern eyes." },
        ]
    },
    {
        id: 15,
        title: "Demon's Souls",
        genre: "RPG",
        price: 3499,
        rating: 4.7,
        exclusive: true,
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
        bannerImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80",
        themeColor: "40 70% 45%",
        description: "The game that defined an era of challenge-driven RPGs returns as a ground-up PS5 remake. Explore Boletaria and face the fog of the Old One.",
        longDescription: "Demon's Souls is a 2020 remake developed by Bluepoint Games of FromSoftware's 2009 genre-defining RPG. Set in the fractured kingdom of Boletaria, consumed by a powerful magical Fog, players battle impossibly demanding demons across five interconnected worlds as a Slayer of Demons. The souls mechanic — drop all progress upon death, potentially losing it forever — creates tension unlike any other RPG. The remake completely rebuilds the game in photorealistic next-gen graphics while preserving the original's unforgiving design philosophy. New layouts for Stonefang and Tower of Latria have been subtly reworked for visual clarity. Being one of the first PS5 launch titles, it demonstrated the console's raw graphical power with extraordinary lighting, particle effects, and loading times measured in seconds. The world tendency system rewards dedicated exploration and choice across multiple playthroughs.",
        developer: "Bluepoint Games",
        publisher: "Sony Interactive Entertainment",
        releaseDate: "November 12, 2020",
        players: "1–4 Players (Online Co-op/PvP)",
        systemRequirements: {
            os: "PlayStation 5",
            processor: "AMD Zen 2 8-core",
            memory: "16 GB GDDR6",
            graphics: "AMD RDNA 2",
            storage: "66 GB Minimum",
        },
        reviews: [
            { user: "PixelProwler", avatarSeed: "pixel", rating: 5, date: "Nov 2020", comment: "Bluepoint's attention to every stone texture and light ray makes Boletaria feel genuinely mythological. Flamelurker gave me nightmares but the satisfaction of beating him? Unparalleled." },
            { user: "VelvetStrike", avatarSeed: "velvet", rating: 5, date: "Dec 2020", comment: "The best PS5 launch title by a massive margin. The loading times disappear entirely — death respawn is nearly instant, making the challenging gameplay loop feel tighter than ever." },
            { user: "CosmicDrift", avatarSeed: "cosmic", rating: 4, date: "Jan 2021", comment: "For souls veterans expecting the world tendency system to be explained — it isn't. For newcomers entering this brutal world for the first time, the atmosphere alone is worth the frustration." },
        ]
    },
    {
        id: 16,
        title: "Stray",
        genre: "Indie",
        price: 2499,
        rating: 4.6,
        exclusive: false,
        image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800&q=80",
        bannerImage: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=1600&q=80",
        themeColor: "35 90% 55%",
        description: "Play as a stray cat lost in a neon-lit cybercity, navigating its alleys and slums alongside a tiny robot companion to find your way back home.",
        longDescription: "Stray is a 2022 third-person cat adventure developed by BlueTwelve Studio. Players control an anonymous stray cat who falls into a walled post-apocalyptic cybercity populated entirely by robots and mutant bacteria called Zurks — all humans having died millennia ago. The city is a stunning vertical labyrinth of neon-drenched alleyways, cramped dwellings, and buzzing market bazaars. With a tiny robot companion named B-12 who translates robot languages and stores memories, the cat gradually uncovers the mystery of this underground civilization while searching for a way home. Stray's physics-accurate cat simulation — knocking things over, meowing, scratching walls, sleeping in robot laps — delighted millions of players and cat owners worldwide. The game excels at environmental storytelling and creating emotional attachment without dialogue.",
        developer: "BlueTwelve Studio",
        publisher: "Annapurna Interactive",
        releaseDate: "July 19, 2022",
        players: "Single Player",
        systemRequirements: {
            os: "Windows 10 64-bit",
            processor: "Intel Core i5-2300",
            memory: "8 GB RAM",
            graphics: "NVIDIA GeForce GTX 650 Ti",
            storage: "10 GB Available Space",
        },
        reviews: [
            { user: "ArcticFox99", avatarSeed: "arctic", rating: 5, date: "Jul 2022", comment: "I cried at the ending. For a game where you play as an anonymous cat, the emotional weight Stray manages to deliver is staggering. B-12 is one of gaming's most loveable companions." },
            { user: "NightOwl_PS", avatarSeed: "nightowl", rating: 5, date: "Aug 2022", comment: "The environmental design of this cybercity deserves a platinum award of its own. Every alley tells a story, every robot has a life. I explored every nook before advancing the story." },
            { user: "GhostBlade42", avatarSeed: "ghostblade", rating: 4, date: "Sep 2022", comment: "Beautifully intimate and refreshingly brief — completable in a single weekend. Meowing at robots never gets old. Full price is high for the length but the experience is genuinely precious." },
        ]
    },
    {
        id: 17,
        title: "Hogwarts Legacy",
        genre: "RPG",
        price: 3999,
        rating: 4.5,
        exclusive: false,
        image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
        bannerImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1600&q=80",
        themeColor: "250 70% 55%",
        description: "Experience Hogwarts in the 1800s. Your unwritten legacy begins as a fifth-year student who holds the key to an ancient secret threatening the wizarding world.",
        longDescription: "Hogwarts Legacy is a 2023 action RPG developed by Avalanche Software set in the 1800s Wizarding World, nearly a century before the Harry Potter novels. Players create a fully customizable witch or wizard who begins Hogwarts as an unusual fifth-year student possessing a rare ability to perceive and control ancient magic. The open world spans Hogwarts castle, Hogsmeade village, and an expansive Scottish highlands landscape packed with poacher camps, ancient dungeons, and magical creatures to rescue and breed. The spell combat system is spectacularly visual, combining dozens of spells in freeform sequences. Hogwarts castle itself is an extraordinary achievement in game design — every corridor, classroom, and hidden passage feels authentically constructed. Four distinct house playthroughs, relationship questlines with unique companions, and a sprawling 50+ hour experience make this a definitive wizarding world game.",
        developer: "Avalanche Software",
        publisher: "Warner Bros. Games",
        releaseDate: "February 10, 2023",
        players: "Single Player",
        systemRequirements: {
            os: "Windows 10 64-bit",
            processor: "Intel Core i7-8700K",
            memory: "16 GB RAM",
            graphics: "NVIDIA GeForce 1080 Ti",
            storage: "85 GB Available Space",
        },
        reviews: [
            { user: "ShadowRunner", avatarSeed: "shadow", rating: 5, date: "Feb 2023", comment: "As a lifelong Harry Potter fan, walking through Hogwarts for the first time was overwhelming. The Astronomy Tower at sunset, the Great Hall at Christmas — it's everything I ever dreamed of." },
            { user: "PixelProwler", avatarSeed: "pixel", rating: 4, date: "Mar 2023", comment: "The combat system is surprisingly deep — chaining spells with environmental hazards is incredibly satisfying. The main storyline is solid but the companion questlines are what truly shine." },
            { user: "VelvetStrike", avatarSeed: "velvet", rating: 5, date: "Apr 2023", comment: "I played Slytherin and the dialogue options that lean into cunning and ambition give the story a completely different flavor. Hogwarts Legacy rewards multiple playthroughs generously." },
        ]
    },
    {
        id: 18,
        title: "Ratchet & Clank: Rift Apart",
        genre: "Action",
        price: 3499,
        rating: 4.8,
        exclusive: true,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        bannerImage: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=1600&q=80",
        themeColor: "280 90% 60%",
        description: "Blast across dimensions with the intergalactic duo as they take on an evil emperor from another reality. New Lombax Rivet joins the adventure.",
        longDescription: "Ratchet & Clank: Rift Apart is a 2021 action-platformer developed by Insomniac Games exclusively for PlayStation 5. When Dr. Nefarious tears apart dimensional reality with a stolen rift tether, Ratchet and Clank are separated across multiple dimensions. They encounter Rivet — a female Lombax freedom fighter from a parallel universe — as a fully playable second protagonist with her own unique tools and story arc. The game is a masterpiece showcase of PS5's SSD technology: dimensional rifts enable near-instant transitions between completely different worlds mid-gameplay, with zero loading. Weapons like the Topiary Sprinkler and Hurlshot are imaginative and deeply satisfying. The DualSense adaptive triggers give each weapon a distinct tactile signature. Visually, Rift Apart achieves levels of detail and motion blur that routinely trigger disbelief about being a real-time game — cinema-grade lighting, particle effects, and subsurface scattering make every scene jaw-dropping.",
        developer: "Insomniac Games",
        publisher: "Sony Interactive Entertainment",
        releaseDate: "June 11, 2021",
        players: "Single Player",
        systemRequirements: {
            os: "PlayStation 5",
            processor: "AMD Zen 2 8-core",
            memory: "16 GB GDDR6",
            graphics: "AMD RDNA 2",
            storage: "42 GB Minimum",
        },
        reviews: [
            { user: "CosmicDrift", avatarSeed: "cosmic", rating: 5, date: "Jun 2021", comment: "The dimensional rift sequences are a jaw-dropping technical achievement. Passing through a rift into a completely different world with zero loading screen feels like actual magic." },
            { user: "ArcticFox99", avatarSeed: "arctic", rating: 5, date: "Jul 2021", comment: "Rivet is an instant gaming icon. Her chemistry with Clank in a bittersweet B-story grounds the dimensional chaos in genuine heart. The best Ratchet & Clank game ever made." },
            { user: "NightOwl_PS", avatarSeed: "nightowl", rating: 5, date: "Aug 2021", comment: "Insomniac made what looks like a Pixar film run at 60fps on PS5. The rainbow asteroid belt level alone is worth the purchase. Weaponry creativity is at an all-time series high." },
        ]
    },
];

