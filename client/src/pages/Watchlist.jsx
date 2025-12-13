import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { List, Trash2 } from "lucide-react";
import { userService } from "../services/userService";
import AnimeCard from "../components/AnimeCard";
import toast from "react-hot-toast";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const data = await userService.getWatchlist();
      setWatchlist(data);
    } catch (error) {
      toast.error("Failed to load watchlist");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (animeId) => {
    try {
      await userService.removeFromWatchlist(animeId);
      setWatchlist(watchlist.filter((w) => w.animeId !== animeId));
      toast.success("Removed from watchlist");
    } catch (error) {
      toast.error("Failed to remove");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="shimmer h-8 w-48 rounded mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="aspect-[2/3] shimmer rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <List className="w-8 h-8 text-purple-500" />
          <h1 className="text-4xl font-bold">My Watchlist</h1>
        </motion.div>

        {watchlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <List className="w-20 h-20 text-gray-600 mx-auto mb-4" />
            <p className="text-2xl text-gray-400 mb-4">No items in watchlist</p>
            <p className="text-gray-500">Add anime you want to watch later!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {watchlist.map((item, index) => {
              const anime = {
                mal_id: item.animeId,
                title: item.title,
                images: { jpg: { image_url: item.image } },
              };
              return (
                <motion.div
                  key={item.animeId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <AnimeCard anime={anime} />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemove(item.animeId)}
                    className="absolute top-2 right-2 p-2 bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
