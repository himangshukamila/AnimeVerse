import { create } from "zustand";
import { authService } from "../services/authService";

const storedUser = authService.getCurrentUser();

export const useAuthStore = create((set) => ({
  user: storedUser,
  isAuthenticated: !!storedUser,
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.login(credentials);

      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });

      return data.user;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        loading: false,
      });
      throw error;
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.register(userData);

      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });

      return data.user;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Registration failed",
        loading: false,
      });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  },

  updateUser: (userData) => {
    set({ user: userData });
    localStorage.setItem("user", JSON.stringify(userData));
  },

  clearError: () => set({ error: null }),
}));
