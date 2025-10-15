import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  loading: false,
  filters: { favorite: false, categoryIds: null },

  fetchRecipes: async (overrideFilters) => {
    const filters = overrideFilters || get().filters;
    set({ loading: true });
    try {
      const params = new URLSearchParams();
      if (filters.favorite) params.append("favorite", true);
      if (filters.categoryIds)
        params.append("categoryIds", filters.categoryIds);

      const res = await axios.get(`/api/v1/recipe?${params.toString()}`);
      set({ recipes: res.data.recipes, loading: false });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error al obtener las recetas"
      );
      set({ loading: false });
    }
  },

  toggleFavoriteFilter: async () => {
    const { filters } = get();
    const newFilters = { ...filters, favorite: !filters.favorite };
    set({ filters: newFilters });
    await get().fetchRecipes(newFilters);
  },

  setCategoryFilter: async (categoryId) => {
    const { filters } = get();
    const newFilters = {
      ...filters,
      categoryIds: filters.categoryIds === categoryId ? null : categoryId,
    };
    set({ filters: newFilters });
    await get().fetchRecipes(newFilters);
  },

  clearFilters: async () => {
    const newFilters = { favorite: false, categoryIds: null };
    set({ filters: newFilters });
    await get().fetchRecipes(newFilters);
  },

  searchRecipes: async (searchTerm) => {
    set({ loading: true });
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);

      const res = await axios.get(`/api/v1/recipe?${params.toString()}`);
      set({ recipes: res.data.recipes, loading: false });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al buscar recetas");
      set({ loading: false });
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
