import express from "express";
import {
  createFolder,
  getFolders,
  getFolderWithRecipes,
  addRecipeToFolder,
  deleteFolder,
  removeRecipeFromFolder,
  updateFolder,
} from "../controllers/folder.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createFolder);
router.get("/", protectRoute, getFolders);
router.get("/:id", protectRoute, getFolderWithRecipes);
router.put("/:id", protectRoute, updateFolder);
router.delete("/:id", protectRoute, deleteFolder);

router.post("/:id/add-recipe/:recipeId", protectRoute, addRecipeToFolder);
router.delete(
  "/:id/remove-recipe/:recipeId",
  protectRoute,
  removeRecipeFromFolder
);

export default router;
