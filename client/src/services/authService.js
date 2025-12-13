import api from "../utils/api";

export const authService = {
  register: async (userData) => {
    try {
      const { data } = await api.post("/auth/register", userData);

      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      // 🔥 propagate error upward
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const { data } = await api.post("/auth/login", credentials);

      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      // 🔥 REQUIRED for toast to work
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getMe: async () => {
    try {
      const { data } = await api.get("/auth/me");
      return data;
    } catch {
      return null;
    }
  },
};
