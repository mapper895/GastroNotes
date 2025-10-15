import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useFolderStore = create((set, get) => ({
  folders: [],
  selectedFolder: null,
  folderRecipes: [],
  loading: false,

  //Obtener categorias del usuario
  fetchFolders: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/api/v1/folder");
      if (res.data.success) {
        set({ folders: res.data.folders });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al obtener carpetas");
    } finally {
      set({ loading: false });
    }
  },

  // Obtener recetas asociadas a un folder
  getFolderWithRecipes: async (folderId) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/api/v1/folder/${folderId}`);
      const { folder, recipes } = res.data.data;
      set({ selectedFolder: folder, folderRecipes: recipes });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error al obtener las recetas del folder"
      );
    } finally {
      set({ loading: false });
    }
  },

  clearSelectedFolder: () => set({ selectedFolder: null, folderRecipes: [] }),

  // Crear nueva carpeta
  createFolder: async (data) => {
    set({ loading: true });
    try {
      const res = await axios.post("/api/v1/folder", data);
      if (res.data.success) {
        set({ folders: [...get().folders, res.data.folder] });
      }
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al crear carpeta");
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  // Eliminar carpeta
  deleteFolder: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.delete(`/api/v1/folder/${id}`);
      if (res.data.success) {
        set({ folder: get().folders.filter((f) => f._id !== id) });
      }
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al eliminar carpeta");
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },
}));
