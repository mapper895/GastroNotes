import mongoose from "mongoose";
import { Folder } from "../models/folder.model.js";
import { Recipe } from "../models/recipe.model.js";

// Crear una nueva carpeta
export async function createFolder(req, res) {
  try {
    const { name, description } = req.body;
    const userId = req.user?._id;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "El nombre de la carpeta es requerido",
      });
    }

    const folder = await Folder.create({ name, description, user: userId });
    res.status(201).json({ success: true, folder });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "La carpeta ya existe" });
    }
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}

// Listar carpetas del usuario
export async function getFolders(req, res) {
  try {
    const userId = req.user?._id;
    const folders = await Folder.find({ user: userId }).sort("name");
    res.json({ success: true, folders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}

// Obtener carpeta y sus recetas asociadas
export async function getFolderWithRecipes(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const folder = await Folder.findOne({ _id: id, user: userId });
    if (!folder) {
      return res
        .status(404)
        .json({ success: false, message: "Carpeta no encontrada" });
    }

    const recipes = await Recipe.find({ folder: id, user: userId }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data: { folder, recipes } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}

// Actualizar carpeta
export async function updateFolder(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = req.user?._id;

    const folder = await Folder.findOneAndUpdate(
      { _id: id, user: userId },
      { name, description },
      { new: true }
    );
    if (!folder) {
      return res
        .status(404)
        .json({ success: false, message: "Carpeta no encontrada" });
    }
    res.json({ success: true, folder });
  } catch (error) {
    res.json({ success: false, message: "Error del servidor" });
  }
}

// Eliminar carpeta
export async function deleteFolder(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const folder = await Folder.findOneAndDelete({ _id: id, user: userId });
    if (!folder) {
      return res
        .status(404)
        .json({ success: false, message: "Carpeta no encontrada" });
    }

    // Limpiar la referencia de carpeta en las recetas asociadas
    await Recipe.updateMany(
      { folder: id, user: userId },
      { $unset: { folder: "" } }
    );

    res.json({ success: true, message: "Carpeta eliminada" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}

// Agregar receta a carpeta
export async function addRecipeToFolder(req, res) {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "No autorizado" });
    }

    const { id, recipeId } = req.params;

    const folder = await Folder.findOne({ _id: id, user: userId });
    if (!folder) {
      return res
        .status(404)
        .json({ success: false, message: "Carpeta no encontrada" });
    }

    const recipe = await Recipe.findOne({ _id: recipeId, user: userId });
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Receta no encontrada" });
    }

    recipe.folder = id;
    await recipe.save();

    res.json({
      success: true,
      message: "Receta agregada a la carpeta",
      recipe,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}

// Remover receta de carpeta
export async function removeRecipeFromFolder(req, res) {
  try {
    const { id, recipeId } = req.params;
    // Verificar que la receta sea del mismo usuario
    const userId = req.user?._id;
    const recipe = await Recipe.findOne({
      _id: recipeId,
      user: userId,
      folder: id,
    });
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Receta no encontrada en la carpeta especificada",
      });
    }

    recipe.folder = undefined;
    await recipe.save();

    res.json({
      success: true,
      message: "Receta removida de la carpeta",
      recipe,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}
