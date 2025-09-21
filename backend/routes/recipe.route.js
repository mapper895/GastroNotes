import express from "express";
import {
  createRecipe,
  getUserRecipes,
} from "../controllers/recipe.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Ruta para crear una nueva receta
router.post("/create-recipe", protectRoute, createRecipe);
// Ruta para obtener todas las recetas de un usuario
router.get("/user-recipes", protectRoute, getUserRecipes);

export default router;
