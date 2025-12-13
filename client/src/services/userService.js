import api from "../utils/api";

export const userService = {
  // Subscription
  updateSubscription: async (plan) => {
    const response = await api.put("/users/subscription", { plan });
    return response.data;
  },

  // Favorites
  getFavorites: async () => {
    const response = await api.get("/users/favorites");
    return response.data;
  },

  addToFavorites: async (anime) => {
    const response = await api.post("/users/favorites", anime);
    return response.data;
  },

  removeFromFavorites: async (animeId) => {
    const response = await api.delete(`/users/favorites/${animeId}`);
    return response.data;
  },

  // Watchlist
  getWatchlist: async () => {
    const response = await api.get("/users/watchlist");
    return response.data;
  },

  addToWatchlist: async (anime) => {
    const response = await api.post("/users/watchlist", anime);
    return response.data;
  },

  removeFromWatchlist: async (animeId) => {
    const response = await api.delete(`/users/watchlist/${animeId}`);
    return response.data;
  },

  // Continue Watching
  getContinueWatching: async () => {
    const response = await api.get("/users/continue-watching");
    return response.data;
  },

  updateContinueWatching: async (data) => {
    const response = await api.post("/users/continue-watching", data);
    return response.data;
  },
};
