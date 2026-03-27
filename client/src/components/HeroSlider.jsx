import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, Star, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSlider = ({ slides = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [currentSlide, isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const handleWatch = (animeId) => {
    navigate(`/watch/${animeId}`);
  };

  if (!slides || slides.length === 0) {
    return (
      <div className="relative h-screen flex items-center justify-center bg-dark-100">
        <div className="text-center">
          <div className="shimmer w-20 h-20 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading The Content...</p>
        </div>
      </div>
    );
  }

  const currentAnime = slides[currentSlide];

  return (
    <div className="relative h-screen  mb-24 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0">
            <img
              src={
                currentAnime.images?.jpg?.large_image_url ||
                currentAnime.images?.jpg?.image_url
              }
              alt={currentAnime.title}
              className="w-full h-full  object-cover "
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-100 via-dark-100/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-transparent to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  {/* Badge */}
                  <div className="flex items-center space-x-3">
                    <span className="px-4 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                      NOW AIRING
                    </span>
                    {currentAnime.score && (
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-semibold">
                          {currentAnime.score}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                    {currentAnime.title}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    {currentAnime.year && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{currentAnime.year}</span>
                      </div>
                    )}
                    {currentAnime.episodes && (
                      <span>{currentAnime.episodes} Episodes</span>
                    )}
                    {currentAnime.rating && (
                      <span className="px-2 py-1 border border-gray-500 rounded">
                        {currentAnime.rating}
                      </span>
                    )}
                  </div>

                  {/* Synopsis */}
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3">
                    {currentAnime.synopsis}
                  </p>

                  {/* Genres */}
                  {currentAnime.genres && currentAnime.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {currentAnime.genres.slice(0, 4).map((genre) => (
                        <span
                          key={genre.mal_id}
                          className="px-3 py-1 bg-white/10 rounded-full text-xs"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Watch Button */}
                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleWatch(currentAnime.mal_id)}
                      className="px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg font-semibold text-lg flex items-center space-x-2 glow-button"
                    >
                      <Play className="w-6 h-6 fill-current" />
                      <span>Watch Now</span>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setIsAutoPlaying(false);
            }}
            className={`h-1 rounded-full transition-all ${
              index === currentSlide
                ? "w-12 bg-primary-400"
                : "w-8 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
