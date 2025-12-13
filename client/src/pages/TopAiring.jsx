import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { animeService } from "../services/animeService";
import AnimeCard from "../components/AnimeCard";
import toast from "react-hot-toast";

const TopAiring = () => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAnimes();
  }, [page]);

  const fetchAnimes = async () => {
    try {
      setLoading(true);
      const data = await animeService.getTopAiring(page, 25);
      setAnimes(data.data || []);
    } catch (error) {
      toast.error("Failed to load anime");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <TrendingUp className="w-8 h-8 text-primary-400" />
          <h1 className="text-4xl font-bold">Top Airing Anime</h1>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="aspect-[2/3] shimmer rounded-xl"></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {animes.map((anime, index) => (
                <motion.div
                  key={anime.mal_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AnimeCard anime={anime} />
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-12 space-x-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-6 py-3 bg-dark-200 rounded-lg font-semibold">
                Page {page}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TopAiring;
