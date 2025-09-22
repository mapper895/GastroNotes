import express from "express";
import {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getUserRecipes,
  getRecipeById,
  toggleFavorite,
} from "../controllers/recipe.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createRecipe);
router.get("/", protectRoute, getUserRecipes);
router.get("/:id", protectRoute, getRecipeById);
router.put("/:id", protectRoute, updateRecipe);
router.delete("/:id", protectRoute, deleteRecipe);

router.patch("/:id/favorite", protectRoute, toggleFavorite);

export default router;
