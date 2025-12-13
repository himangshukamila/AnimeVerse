import api from "../utils/api";

export const reviewService = {
  createReview: async (reviewData) => {
    const response = await api.post("/reviews", reviewData);
    return response.data;
  },

  getAnimeReviews: async (animeId) => {
    const response = await api.get(`/reviews/${animeId}`);
    return response.data;
  },

  updateReview: async (reviewId, reviewData) => {
    const response = await api.put(`/reviews/${reviewId}`, reviewData);
    return response.data;
  },

  deleteReview: async (reviewId) => {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
  },

  likeReview: async (reviewId) => {
    const response = await api.put(`/reviews/${reviewId}/like`);
    return response.data;
  },
};
