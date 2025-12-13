import axios from "axios";

const JIKAN_API = "https://api.jikan.moe/v4";

// Helper function to add delay to avoid rate limiting
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const animeService = {
  // Get top airing anime
  getTopAiring: async (page = 1, limit = 25) => {
    await delay(500);
    const response = await axios.get(`${JIKAN_API}/top/anime`, {
      params: {
        filter: "airing",
        page,
        limit,
      },
    });
    return response.data;
  },

  // Get seasonal anime (currently airing)
  getCurrentSeason: async () => {
    await delay(500);
    const response = await axios.get(`${JIKAN_API}/seasons/now`);
    return response.data;
  },

  // Get upcoming anime
  getUpcoming: async (page = 1) => {
    await delay(500);
    const response = await axios.get(`${JIKAN_API}/top/anime`, {
      params: {
        filter: "upcoming",
        page,
      },
    });
    return response.data;
  },

  // Get anime by ID
  getAnimeById: async (id) => {
    await delay(500);
    const response = await axios.get(`${JIKAN_API}/anime/${id}/full`);
    return response.data;
  },

  // Search anime
  searchAnime: async (query, page = 1, limit = 20) => {
    await delay(500);
    const response = await axios.get(`${JIKAN_API}/anime`, {
      params: {
        q: query,
        page,
        limit,
        order_by: "popularity",
      },
    });
    return response.data;
  },

  // Get anime recommendations
  getRecommendations: async (id) => {
    await delay(500);
    const response = await axios.get(
      `${JIKAN_API}/anime/${id}/recommendations`
    );
    return response.data;
  },

  // Get anime by genre
  getAnimeByGenre: async (genreId, page = 1) => {
    await delay(500);
    const response = await axios.get(`${JIKAN_API}/anime`, {
      params: {
        genres: genreId,
        page,
        order_by: "popularity",
      },
    });
    return response.data;
  },

  // Get popular anime (top rated)
  getPopularAnime: async (page = 1) => {
    await delay(500);
    const response = await axios.get(`${JIKAN_API}/top/anime`, {
      params: {
        filter: "bypopularity",
        page,
      },
    });
    return response.data;
  },
  // Inside your animeService object
  // ... existing code ...

  getNewReleases: async (page = 1) => {
    // This fetches the currently airing season (New Releases)
    const response = await fetch(
      `${JIKAN_API}/seasons/now?page=${page}&limit=25`
    );
    if (!response.ok) throw new Error("Failed to fetch new releases");
    return response.json();
  },

  // ... existing code ...
  // Get anime episodes
  getAnimeEpisodes: async (id, page = 1) => {
    await delay(500);
    const response = await axios.get(`${JIKAN_API}/anime/${id}/episodes`, {
      params: { page },
    });
    return response.data;
  },

  // Get anime characters
  getAnimeCharacters: async (id) => {
    await delay(500);
    const response = await axios.get(`${JIKAN_API}/anime/${id}/characters`);
    return response.data;
  },
};

// Dummy video URLs for demo
export const getDummyVideoUrl = (animeId, episode = 1) => {
  // Using sample video URLs (replace with your actual video sources)
  const dummyVideos = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  ];

  const index = (parseInt(animeId) + episode) % dummyVideos.length;
  return dummyVideos[index];
};
