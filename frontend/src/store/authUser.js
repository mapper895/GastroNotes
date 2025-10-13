import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLogginIn: false,
  isLggingOut: false,
  isCheckingAuth: true,

  signup: async (credentials) => {
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Ocurrio un error al crear usuario"
      );
      set({ isSigningUp: false, user: null });
    }
  },
  login: async (credentials) => {
    set({ isLogginIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLogginIn: false });
    } catch (error) {
      set({ isLogginIn: false, user: null });
      toast.error(
        error.response?.data?.message || "Ocurrio un error al iniciar sesión"
      );
    }
  },
  logout: async () => {
    set({ isLggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLggingOut: false });
      toast.success("Cierre de sesión exitoso");
      console.log("Cierre de sesion exitoso");
    } catch (error) {
      set({ isLggingOut: false });
      toast.error(
        error.response?.data?.message || "Ocurrio un error al cerrar sesión"
      );
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },
}));
