import { motion } from "framer-motion";
import { Play, Star, Heart, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { userService } from "../services/userService";
import toast from "react-hot-toast";

const AnimeCard = ({ anime }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [isHovered, setIsHovered] = useState(false);

  const handleWatch = () => {
    if (!isAuthenticated) {
      toast.error("Please login to watch anime");
      navigate("/login");
      return;
    }
    navigate(`/watch/${anime.mal_id}`);
  };

  const handleAddToFavorites = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("Please login to add favorites");
      navigate("/login");
      return;
    }

    try {
      await userService.addToFavorites({
        animeId: anime.mal_id.toString(),
        title: anime.title,
        image: anime.images?.jpg?.image_url,
      });
      toast.success("Added to favorites!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add to favorites"
      );
    }
  };

  const handleAddToWatchlist = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("Please login to add to watchlist");
      navigate("/login");
      return;
    }

    try {
      await userService.addToWatchlist({
        animeId: anime.mal_id.toString(),
        title: anime.title,
        image: anime.images?.jpg?.image_url,
      });
      toast.success("Added to watchlist!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add to watchlist"
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
      onClick={handleWatch}
    >
      <div className="relative overflow-hidden rounded-xl bg-dark-200">
        {/* Image */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={
              anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url
            }
            alt={anime.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Hover Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute inset-0 flex items-center justify-center space-x-3"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWatch}
              className="p-3 bg-primary-500 rounded-full shadow-lg hover:bg-primary-600 transition-colors"
            >
              <Play className="w-6 h-6 fill-current" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToFavorites}
              className="p-3 bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-colors"
            >
              <Heart className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToWatchlist}
              className="p-3 bg-purple-500 rounded-full shadow-lg hover:bg-purple-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Score Badge */}
          {anime.score && (
            <div className="absolute top-3 right-3 flex items-center space-x-1 px-2 py-1 bg-black/70 rounded-lg backdrop-blur-sm">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs font-semibold">{anime.score}</span>
            </div>
          )}

          {/* Status Badge */}
          {anime.status && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-primary-500/80 rounded-lg backdrop-blur-sm">
              <span className="text-xs font-semibold">{anime.status}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary-400 transition-colors">
            {anime.title}
          </h3>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{anime.type || "TV"}</span>
            {anime.episodes && <span>{anime.episodes} eps</span>}
            {anime.year && <span>{anime.year}</span>}
          </div>

          {/* Genres */}
          {anime.genres && anime.genres.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {anime.genres.slice(0, 2).map((genre) => (
                <span
                  key={genre.mal_id}
                  className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-400"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AnimeCard;
