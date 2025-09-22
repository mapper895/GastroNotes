import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createCategory);
router.get("/", protectRoute, getCategories);
router.put("/:id", protectRoute, updateCategory);
router.delete("/:id", protectRoute, deleteCategory);

export default router;
