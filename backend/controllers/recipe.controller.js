import { Category } from "../models/category.model.js";
import { Recipe } from "../models/recipe.model.js";
import { Folder } from "../models/folder.model.js";
import mongoose from "mongoose";

// Crear una nueva receta
export async function createRecipe(req, res) {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "No autorizado" });
    }

    const {
      title,
      description,
      ingredients,
      instructions,
      folder,
      categories,
      image,
      utensils,
      time,
      servings,
    } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "El título es obligatorio" });
    }

    // Validar folder si se envió
    if (folder) {
      if (!mongoose.isValidObjectId(folder)) {
        return res
          .status(400)
          .json({ success: false, message: "ID de carpeta inválido" });
      }
      const folderExists = await Folder.findOne({ _id: folder, user: userId });
      if (!folderExists) {
        return res
          .status(400)
          .json({ success: false, message: "Carpeta inválida" });
      }
    }

    // Validar categorías si se enviaron
    if (categories?.length) {
      const validIds = categories.filter((id) => mongoose.isValidObjectId(id));
      if (validIds.length !== categories.length) {
        return res
          .status(400)
          .json({ success: false, message: "IDs de categorías inválidos" });
      }

      const count = await Category.countDocuments({
        _id: { $in: validIds },
        user: userId,
      });
      if (count !== validIds.length) {
        return res
          .status(400)
          .json({ success: false, message: "Categorías inválidas" });
      }
    }

    // Crear receta
    const recipe = await Recipe.create({
      title,
      description,
      ingredients: ingredients || [],
      instructions: instructions || [],
      folder: folder || null, // si no se manda, queda null
      categories: categories || [],
      image: image || "",
      utensils: utensils || [],
      time: time || 0,
      servings: servings || 1,
      user: userId,
    });

    res.status(201).json({ success: true, recipe });
  } catch (error) {
    console.error("Error al crear la receta:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}

// Listar recetas con filtros
export async function getUserRecipes(req, res) {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "No autorizado" });
    }

    const { favorite, folderId, categoryIds, search } = req.query;
    const q = { user: userId };

    if (favorite === "true") {
      q.isFavorite = true;
    }
    if (
      folderId &&
      folderId !== "null" &&
      folderId !== "undefined" &&
      folderId !== ""
    ) {
      if (!mongoose.isValidObjectId(folderId)) {
        return res
          .status(400)
          .json({ success: false, message: "ID de carpeta inválido" });
      }
      const folderExists = await Folder.exists({ _id: folderId, user: userId });
      if (!folderExists) {
        return res
          .status(400)
          .json({ success: false, message: "Carpeta inválida" });
      }
      q.folder = folderId;
    }
    if (categoryIds) {
      const ids = categoryIds.split(",").filter(mongoose.isValidObjectId);
      if (!ids.length) {
        return res
          .status(400)
          .json({ success: false, message: "IDs de categorías inválidos" });
      }
      q.categories = { $all: ids };
    }
    if (search) {
      q.$text = { $search: search };
    }

    const recipes = await Recipe.find(q).sort({ createdAt: -1 });
    res.json({ success: true, recipes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}

// Obtener detalles de una receta
export async function getRecipeById(req, res) {
  try {
    const recipeId = req.params.id;
    const userId = req.user?._id;

    const recipe = await Recipe.findOne({ _id: recipeId, user: userId })
      .populate("categories", "name")
      .populate("folder", "name");

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Receta no encontrada" });
    }
    res.json({ success: true, recipe });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}

// Actualizar una receta existente
export async function updateRecipe(req, res) {
  try {
    const recipeId = req.params.id;
    const userId = req.user?._id;

    const recipe = await Recipe.findOneAndUpdate(
      { _id: recipeId, user: userId },
      req.body,
      { new: true }
    );

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Receta no encontrada" });
    }

    res.json({ success: true, recipe });
  } catch (error) {
    console.log("Error al actualizar la receta:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}

// Eliminar una receta existente
export async function deleteRecipe(req, res) {
  try {
    const recipeId = req.params.id;
    const userId = req.user?._id;

    const recipe = await Recipe.findOneAndDelete({
      _id: recipeId,
      user: userId,
    });
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Receta no encontrada" });
    }

    res.json({ success: true, message: "Receta eliminada" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}

// Marcar o desmarcar una receta como favorita
export async function toggleFavorite(req, res) {
  try {
    const recipeId = req.params.id;
    const userId = req.user?._id;

    const recipe = await Recipe.findOne({ _id: recipeId, user: userId });
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Receta no encontrada" });
    }

    recipe.isFavorite = !recipe.isFavorite;
    await recipe.save();

    res.json({ success: true, recipe });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}
