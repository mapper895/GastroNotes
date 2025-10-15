import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useCategoryStore = create((set, get) => ({
  categories: [],
  loading: false,

  // Obtener categorias del usuario
  fetchCategories: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/api/v1/category");
      if (res.data.success) {
        set({ categories: res.data.categories });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error al obtener categorias"
      );
    } finally {
      set({ loading: false });
    }
  },

  // Crear una nueva categoria
  createCategory: async (data) => {
    set({ loading: true });
    try {
      const res = await axios.post("/api/v1/category", data);
      if (res.data.success) {
        set({ categories: [...get().categories, res.data.category] });
      }
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al crear categoria");
    } finally {
      set({ loading: false });
    }
  },

  // Eliminar categoria
  deleteCategory: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.delete(`/api/v1/category/${id}`);
      if (res.data.success) {
        set({ categories: [...get().categories.filter((c) => c._id !== id)] });
      }
      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error al eliminar categoria"
      );
    } finally {
      set({ loading: false });
    }
  },
}));
