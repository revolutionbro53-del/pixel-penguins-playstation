import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";

const baseNews = [
  {
    id: 1,
    title: "Spider-Man 2 DLC Out Now",
    date: "2026-02-25",
    excerpt:
      "Swing back into action with the brand new city expansion packed with missions and suits.",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
  },
  {
    id: 2,
    title: "PS Plus February Games Revealed",
    date: "2026-02-20",
    excerpt:
      "This month includes a diverse selection of titles across genres for subscribers.",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
  },
  {
    id: 3,
    title: "Horizon FW: Patch 1.15 Notes",
    date: "2026-02-18",
    excerpt:
      "Performance improvements on consoles and several bug fixes across quests and UI.",
    image:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&q=80",
  },
  {
    id: 4,
    title: "GT7 Track Update Incoming",
    date: "2026-02-15",
    excerpt: "New track DLC and cosmetic packs launching next week.",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
  },
  {
    id: 5,
    title: "PlayStation Store Sale",
    date: "2026-02-12",
    excerpt: "Huge discounts on top titles this weekend only.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
  {
    id: 6,
    title: "Indie Spotlight: Neon Drift",
    date: "2026-02-10",
    excerpt: "A fast-paced arcade racer making waves in player reviews.",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80",
  },
  {
    id: 7,
    title: "Developer Diary: Making Boss Encounters",
    date: "2026-02-08",
    excerpt:
      "Inside the design of challenging encounters and adaptive difficulty.",
    image:
      "https://images.unsplash.com/photo-1516534775068-bb57c9aedfa3?w=800&q=80",
  },
  {
    id: 8,
    title: "PSVR2 Tips & Tricks",
    date: "2026-02-05",
    excerpt: "How to optimize comfort and performance on PSVR2 headsets.",
    image:
      "https://images.unsplash.com/photo-1555699810-8394bc326805?w=800&q=80",
  },
  {
    id: 9,
    title: "Returnal: New Mode Revealed",
    date: "2026-02-03",
    excerpt: "A fresh gameplay mode focusing on exploration and discovery.",
    image:
      "https://images.unsplash.com/photo-1559862215-cd4628902249?w=800&q=80",
  },
  {
    id: 10,
    title: "System Update 12.4 Rolling Out",
    date: "2026-01-30",
    excerpt: "Stability and security updates, plus minor UX improvements.",
    image:
      "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&q=80",
  },
  {
    id: 11,
    title: "Esports: Winter Championship Results",
    date: "2026-01-28",
    excerpt: "Highlights from the championship and standout teams.",
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
  },
  {
    id: 12,
    title: "How to Stream from Console",
    date: "2026-01-25",
    excerpt: "A quick guide to streaming your gameplay with minimal setup.",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80",
  },
];

// generate additional mock articles to ensure there are plenty to scroll
const generated = Array.from({ length: 30 }, (_, i) => {
  const idx = baseNews.length + i + 1;
  const imageId = (i % 5) + 1;
  return {
    id: idx,
    title: `Mock Article ${idx}`,
    date: `2026-01-${(25 - (i % 20)).toString().padStart(2, "0")}`,
    excerpt: `This is a mock article number ${idx} used for testing the News page scrolling.`,
    image: `https://images.unsplash.com/photo-155${imageId}0745165-9bc0b252726f?w=800&q=80`,
  };
});

const sampleNews = [...baseNews, ...generated];

export default function News() {
  const {} = useApp();
  const [articles, setArticles] = useState(sampleNews);

  // placeholder for possible future fetch
  useEffect(() => {
    // fetch('/api/news')... fallback to sampleNews for now
  }, []);

  return (
    <div className="min-h-screen md:pt-16 px-4 md:px-8 lg:px-20">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="font-sst font-bold text-4xl mb-2">
          Latest News & Blogs
        </h1>
        <p className="text-ps-secondary mb-6">
          Stay up to date with the latest PlayStation headlines and developer
          blogs.
        </p>

        <div className="grid gap-6">
          {articles.map((article) => (
            <motion.article
              key={article.id}
              className="ps-card overflow-hidden"
              whileHover={{ y: -4 }}
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="font-sst font-bold text-2xl mb-2">
                  {article.title}
                </h2>
                <p className="text-ps-secondary text-sm mb-3">{article.date}</p>
                <p className="text-foreground">{article.excerpt}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
