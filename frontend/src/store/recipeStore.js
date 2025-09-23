import axios from "axios";
import { create } from "zustand";

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  loading: false,
  error: null,

  fetchRecipes: async (filters = {}) => {
    try {
      set({ loading: true, error: null });
      const params = new URLSearchParams(filters).toString();
      const res = await axios.get(`/api/v1/recipe?${params}`);
      set({ recipes: res.data.recipes, loading: false });
    } catch (err) {
      set({ error: "Error al obtener recetas", loading: false });
    }
  },

  getRecipeById: async (id) => {
    try {
      const res = await axios.get(`/api/v1/recipe/${id}`);
      return res.data.recipe;
    } catch (err) {
      console.error("Error al obtener receta:", err);
    }
  },

  createRecipe: async (data) => {
    try {
      const res = await axios.post("/api/v1/recipe", data);
      set({ recipes: [...get().recipes, res.data.recipe] });
    } catch (err) {
      console.error("Error al crear receta:", err);
    }
  },

  updateRecipe: async (id, data) => {
    try {
      const res = await axios.put(`/api/v1/recipe/${id}`, data);
      set({
        recipes: get().recipes.map((r) => (r._id === id ? res.data.recipe : r)),
      });
    } catch (err) {
      console.error("Error al actualizar receta:", err);
    }
  },

  deleteRecipe: async (id) => {
    try {
      await axios.delete(`/api/v1/recipe/${id}`);
      set({ recipes: get().recipes.filter((r) => r._id !== id) });
    } catch (err) {
      console.error("Error al eliminar receta:", err);
    }
  },

  toggleFavorite: async (id) => {
    try {
      const res = await axios.patch(`/api/v1/recipe/${id}/favorite`);
      set({
        recipes: get().recipes.map((r) => (r._id === id ? res.data.recipe : r)),
      });
    } catch (err) {
      console.error("Error al marcar/desmarcar favorita:", err);
    }
  },
}));
