import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import { animeService } from "../services/animeService";
import AnimeCard from "../components/AnimeCard";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      searchAnimes();
    }
  }, [query]);

  const searchAnimes = async () => {
    try {
      setLoading(true);
      const data = await animeService.searchAnime(query);
      setAnimes(data.data || []);
    } catch (error) {
      console.error("Search error:", error);
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
          <SearchIcon className="w-8 h-8 text-primary-400" />
          <div>
            <h1 className="text-4xl font-bold">Search Results</h1>
            <p className="text-gray-400 mt-1">Showing results for "{query}"</p>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="aspect-[2/3] shimmer rounded-xl"></div>
            ))}
          </div>
        ) : animes.length === 0 ? (
          <div className="text-center py-20">
            <SearchIcon className="w-20 h-20 text-gray-600 mx-auto mb-4" />
            <p className="text-2xl text-gray-400 mb-4">No results found</p>
            <p className="text-gray-500">
              Try searching with different keywords
            </p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Search;
