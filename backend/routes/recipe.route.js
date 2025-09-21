import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getUserRecipes,
  updateRecipe,
} from "../controllers/recipe.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Ruta para crear una nueva receta
router.post("/create-recipe", protectRoute, createRecipe);
// Actualizar receta
router.put("/update-recipe/:id", protectRoute, updateRecipe);
// Eliminar receta
router.delete("/delete-recipe/:id", protectRoute, deleteRecipe);
// Ruta para obtener todas las recetas de un usuario
router.get("/user-recipes", protectRoute, getUserRecipes);

export default router;
