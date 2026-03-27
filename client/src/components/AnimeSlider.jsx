import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimeCard from "./AnimeCard";

const AnimeSlider = ({ title, animes = [], loading = false, viewAllLink }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -800 : 800;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-48 shimmer rounded"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="aspect-[2/3] shimmer rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!animes || animes.length === 0) {
    return null;
  }

  return (
    <div className="py-8  ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl md:text-3xl font-bold"
          >
            {title}
          </motion.h2>
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="text-sm text-gray-400 hover:text-primary-400 transition-colors mt-1"
            >
              View All
            </Link>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("left")}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("right")}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {animes.map((anime, index) => (
          <motion.div
            key={anime.mal_id || index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: Math.min(index * 0.08, 0.4) }}
            className="flex-shrink-0 w-48 md:w-56"
          >
            <AnimeCard anime={anime} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimeSlider;
