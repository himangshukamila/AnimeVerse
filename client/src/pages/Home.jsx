import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // <--- 1. Added Link import
import { motion } from "framer-motion";
import HeroSlider from "../components/HeroSlider";
import AnimeSlider from "../components/AnimeSlider";
import { animeService } from "../services/animeService";
import { userService } from "../services/userService";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const Home = () => {
  const [heroAnimes, setHeroAnimes] = useState([]);
  const [trendingAnimes, setTrendingAnimes] = useState([]);
  const [topAiring, setTopAiring] = useState([]);
  const [popularAnimes, setPopularAnimes] = useState([]);
  const [newReleases, setNewReleases] = useState([]); // You already had this
  const [continueWatching, setContinueWatching] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchAnimes();
    if (isAuthenticated) {
      fetchContinueWatching();
    }
  }, [isAuthenticated]);

  const fetchAnimes = async () => {
    try {
      setLoading(true);

      // Fetch current season for hero slider (8-10 anime)
      const seasonData = await animeService.getCurrentSeason();
      setHeroAnimes(seasonData.data?.slice(0, 10) || []);

      // Fetch trending (top airing)
      const airingData = await animeService.getTopAiring(1, 20);
      setTopAiring(airingData.data || []);
      setTrendingAnimes(airingData.data?.slice(0, 15) || []);

      // Fetch popular anime
      const popularData = await animeService.getPopularAnime(1);
      setPopularAnimes(popularData.data?.slice(0, 15) || []);

      // <--- 2. Added Fetch for New Releases
      // Note: Make sure you added getNewReleases to your animeService.js as discussed previously
      const newReleasesData = await animeService.getNewReleases(1);
      setNewReleases(newReleasesData.data || []);
    } catch (error) {
      console.error("Error fetching animes:", error);
      toast.error("Failed to load anime data");
    } finally {
      setLoading(false);
    }
  };

  const fetchContinueWatching = async () => {
    try {
      const data = await userService.getContinueWatching();
      setContinueWatching(data || []);
    } catch (error) {
      console.error("Error fetching continue watching:", error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSlider slides={heroAnimes} />
      </motion.div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        {/* Continue Watching */}
        {isAuthenticated && continueWatching.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AnimeSlider
              title="Continue Watching"
              animes={continueWatching.map((item) => ({
                mal_id: item.animeId,
                title: item.title,
                images: { jpg: { image_url: item.image } },
                episodes: item.episode,
              }))}
            />
          </motion.div>
        )}

        {/* Trending Now */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AnimeSlider
            title="🔥 Trending Now"
            animes={trendingAnimes}
            loading={loading}
          />
        </motion.div>

        {/* <--- 3. Added New Releases Section Here */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="flex justify-between items-end mb-[-20px] px-1">
            {/* This empty div preserves layout since AnimeSlider has its own title logic, 
                 but if you want a "View All" button next to the title, we can add it here 
                 or customize AnimeSlider later. For now, we use the standard slider. */}
          </div>

          {/* We wrap it in a div to add the View All link manually if AnimeSlider doesn't support it naturally */}
          <div className="relative">
            <div className="absolute right-0 top-10 md:top-12 z-10 pr-4 md:pr-0">
              <Link
                to="/new-releases"
                className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                View All
              </Link>
            </div>
            <AnimeSlider
              title="✨ New Releases"
              animes={newReleases}
              loading={loading}
            />
          </div>
        </motion.div>

        {/* Top Airing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <AnimeSlider
            title="📺 Top Airing"
            animes={topAiring}
            loading={loading}
          />
        </motion.div>

        {/* Popular Anime */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <AnimeSlider
            title="⭐ Popular Anime"
            animes={popularAnimes}
            loading={loading}
          />
        </motion.div>

        {/* Call to Action */}
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="my-20 p-12 glass rounded-2xl text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Ready to Start Watching?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of anime fans and get unlimited access to the best
              anime content. Create your account today!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = "/register")}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg font-semibold text-lg glow-button"
            >
              Get Started Free
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
