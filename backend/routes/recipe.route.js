import express from "express";
import { createRecipe } from "../controllers/recipe.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create-recipe", protectRoute, createRecipe);

export default router;
