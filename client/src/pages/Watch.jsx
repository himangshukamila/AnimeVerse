import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import {
  Heart,
  Plus,
  Share2,
  Star,
  Calendar,
  Clock,
  Film,
  TrendingUp,
} from "lucide-react";
import { animeService, getDummyVideoUrl } from "../services/animeService";
import { userService } from "../services/userService";
import { reviewService } from "../services/reviewService";
import { useAuthStore } from "../store/useAuthStore";
import AnimeSlider from "../components/AnimeSlider";
import toast from "react-hot-toast";

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const { isAuthenticated, user } = useAuthStore();

  const [anime, setAnime] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [recommendations, setRecommendations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [playedSeconds, setPlayedSeconds] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to watch anime");
      navigate("/login");
      return;
    }
    fetchAnimeDetails();
    fetchReviews();
  }, [id, isAuthenticated]);

  useEffect(() => {
    if (anime) {
      setVideoUrl(getDummyVideoUrl(id, currentEpisode));
    }
  }, [id, currentEpisode, anime]);

  const fetchAnimeDetails = async () => {
    try {
      setLoading(true);
      const data = await animeService.getAnimeById(id);
      setAnime(data.data);

      // Fetch episodes
      const episodesData = await animeService.getAnimeEpisodes(id);
      setEpisodes(episodesData.data || []);

      // Fetch recommendations
      const recsData = await animeService.getRecommendations(id);
      const recAnimes =
        recsData.data?.slice(0, 10).map((rec) => rec.entry) || [];
      setRecommendations(recAnimes);
    } catch (error) {
      console.error("Error fetching anime:", error);
      toast.error("Failed to load anime details");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const data = await reviewService.getAnimeReviews(id);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleAddToFavorites = async () => {
    try {
      await userService.addToFavorites({
        animeId: id,
        title: anime.title,
        image: anime.images?.jpg?.image_url,
      });
      toast.success("Added to favorites!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add");
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      await userService.addToWatchlist({
        animeId: id,
        title: anime.title,
        image: anime.images?.jpg?.image_url,
      });
      toast.success("Added to watchlist!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add");
    }
  };

  const handleProgress = (state) => {
    setPlayedSeconds(state.playedSeconds);

    // Update continue watching every 10 seconds
    if (Math.floor(state.playedSeconds) % 10 === 0) {
      updateContinueWatching(state.playedSeconds, state.loadedSeconds);
    }
  };

  const updateContinueWatching = async (timestamp, duration) => {
    try {
      await userService.updateContinueWatching({
        animeId: id,
        title: anime.title,
        image: anime.images?.jpg?.image_url,
        episode: currentEpisode,
        timestamp,
        duration,
      });
    } catch (error) {
      console.error("Error updating continue watching:", error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await reviewService.createReview({
        animeId: id,
        animeTitle: anime.title,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });
      toast.success("Review submitted!");
      setShowReviewForm(false);
      setReviewForm({ rating: 5, comment: "" });
      fetchReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    }
  };

  const handleLikeReview = async (reviewId) => {
    try {
      await reviewService.likeReview(reviewId);
      fetchReviews();
    } catch (error) {
      toast.error("Failed to like review");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="shimmer w-20 h-20 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading anime...</p>
        </div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-gray-400">Anime not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Video Player */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="video-player-container">
            <ReactPlayer
              ref={playerRef}
              url={videoUrl}
              controls
              playing
              width="100%"
              height="100%"
              onProgress={handleProgress}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Anime Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
                  <p className="text-gray-400">
                    {anime.title_english || anime.title_japanese}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAddToFavorites}
                    className="p-3 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAddToWatchlist}
                    className="p-3 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span>{anime.score || "N/A"}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Calendar className="w-5 h-5" />
                  <span>{anime.year || "N/A"}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Film className="w-5 h-5" />
                  <span>{anime.episodes || "?"} eps</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Clock className="w-5 h-5" />
                  <span>{anime.duration || "N/A"}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {anime.genres?.map((genre) => (
                  <span
                    key={genre.mal_id}
                    className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div>
                <h3 className="font-semibold mb-2">Synopsis</h3>
                <p className="text-gray-400 leading-relaxed">
                  {anime.synopsis}
                </p>
              </div>
            </motion.div>

            {/* Reviews Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Reviews</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold"
                >
                  Write Review
                </motion.button>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleSubmitReview}
                  className="mb-6 p-4 bg-dark-200 rounded-lg"
                >
                  <div className="mb-4">
                    <label className="block mb-2">
                      Rating: {reviewForm.rating}/10
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={reviewForm.rating}
                      onChange={(e) =>
                        setReviewForm({
                          ...reviewForm,
                          rating: parseInt(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                  </div>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, comment: e.target.value })
                    }
                    placeholder="Write your review..."
                    required
                    className="w-full px-4 py-3 bg-dark-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 mb-4"
                    rows="4"
                  />
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg font-semibold"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">
                    No reviews yet. Be the first!
                  </p>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      className="p-4 bg-dark-200 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{review.username}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                              <span>{review.rating}/10</span>
                            </div>
                            <span>•</span>
                            <span>
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleLikeReview(review._id)}
                          className="flex items-center space-x-1 text-gray-400 hover:text-primary-400"
                        >
                          <Heart className="w-4 h-4" />
                          <span>{review.likes}</span>
                        </button>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Episodes */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="font-bold text-xl mb-4">Episodes</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {anime.episodes ? (
                  [...Array(Math.min(anime.episodes, 24))].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentEpisode(i + 1)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        currentEpisode === i + 1
                          ? "bg-primary-500 text-white"
                          : "bg-dark-200 hover:bg-dark-100"
                      }`}
                    >
                      Episode {i + 1}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-4">
                    Episodes info not available
                  </p>
                )}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="font-bold text-xl mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="font-semibold">{anime.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="font-semibold">{anime.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Source:</span>
                  <span className="font-semibold">{anime.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Studios:</span>
                  <span className="font-semibold">
                    {anime.studios?.map((s) => s.name).join(", ") || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Popularity:</span>
                  <span className="font-semibold flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />#{anime.popularity}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <AnimeSlider title="You Might Also Like" animes={recommendations} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Watch;
