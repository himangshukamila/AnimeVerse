import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";
import { userService } from "../services/userService";
import AnimeCard from "../components/AnimeCard";
import toast from "react-hot-toast";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const data = await userService.getFavorites();
      setFavorites(data);
    } catch (error) {
      toast.error("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (animeId) => {
    try {
      await userService.removeFromFavorites(animeId);
      setFavorites(favorites.filter((f) => f.animeId !== animeId));
      toast.success("Removed from favorites");
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
          <Heart className="w-8 h-8 text-red-500" />
          <h1 className="text-4xl font-bold">My Favorites</h1>
        </motion.div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Heart className="w-20 h-20 text-gray-600 mx-auto mb-4" />
            <p className="text-2xl text-gray-400 mb-4">No favorites yet</p>
            <p className="text-gray-500">
              Start adding anime to your favorites!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {favorites.map((fav, index) => {
              const anime = {
                mal_id: fav.animeId,
                title: fav.title,
                images: { jpg: { image_url: fav.image } },
              };
              return (
                <motion.div
                  key={fav.animeId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <AnimeCard anime={anime} />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemove(fav.animeId)}
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

export default Favorites;
