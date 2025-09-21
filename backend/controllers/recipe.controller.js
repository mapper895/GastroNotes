import { User } from "../models/user.model.js";
import { Recipe } from "../models/recipe.model.js";

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
      image,
      ingredients,
      instructions,
      categories,
      utensils,
      time,
      servings,
    } = req.body;

    if (
      !title ||
      !Array.isArray(ingredients) ||
      !ingredients.length === 0 ||
      !Array.isArray(instructions) ||
      instructions.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "El titulo, los ingredientes y las instrucciones son obligatorios",
      });
    }

    const newRecipe = new Recipe({
      title,
      description,
      ...(image && { image }),
      ingredients,
      instructions,
      categories: categories || [],
      utensils: utensils || [],
      time: time || 0,
      servings: servings || 1,
      user: userId,
    });

    const savedRecipe = await newRecipe.save();
    await User.findByIdAndUpdate(userId, {
      $push: { recipes: savedRecipe._id },
    });

    res.status(201).json({ success: true, recipe: savedRecipe });
  } catch (error) {
    console.log("Error al crear la receta:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}

// Obtener todas las recetas de un usuario
export async function getUserRecipes(req, res) {
  try {
    const userId = req.user?._id;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    const recipes = await Recipe.find({ user: userId }).sort({ createdAt: -1 });

    if (!recipes || recipes.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No se encontraron recetas" });
    }

    res.status(200).json({ success: true, recipes });
  } catch (error) {
    console.log("Error al obtener las recetas del usuario:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}

// Actualizar una receta existente
export async function updateRecipe(req, res) {
  try {
    const recipeId = req.params.id;
    const userId = req.user?._id;
    const updateRecipeData = req.body;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Receta no encontrada" });
    }

    // Verificamos que la receta pertenezca al usuario autenticado
    if (recipe.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "No autorizado para actualizar esta receta",
      });
    }

    if (updateRecipeData.title) {
      recipe.title = updateRecipeData.title;
    }
    if (updateRecipeData.description) {
      recipe.description = updateRecipeData.description;
    }
    if (updateRecipeData.image) {
      recipe.image = updateRecipeData.image;
    }
    if (
      Array.isArray(updateRecipeData.ingredients) &&
      updateRecipeData.ingredients.length > 0
    ) {
      recipe.ingredients = updateRecipeData.ingredients;
    }
    if (
      Array.isArray(updateRecipeData.instructions) &&
      updateRecipeData.instructions.length > 0
    ) {
      recipe.instructions = updateRecipeData.instructions;
    }
    if (Array.isArray(updateRecipeData.categories)) {
      recipe.categories = updateRecipeData.categories;
    }
    if (Array.isArray(updateRecipeData.utensils)) {
      recipe.utensils = updateRecipeData.utensils;
    }
    if (typeof updateRecipeData.time === "number") {
      recipe.time = updateRecipeData.time;
    }
    if (typeof updateRecipeData.servings === "number") {
      recipe.servings = updateRecipeData.servings;
    }

    const updatedRecipe = await recipe.save();
    if (!updatedRecipe) {
      return res
        .status(400)
        .json({ success: false, message: "No se pudo actualizar la receta" });
    }

    res.status(200).json({ success: true, recipe: updatedRecipe });
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

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Receta no encontrada" });
    }

    // Verificamos que la receta pertenezca al usuario autenticado
    if (recipe.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "No autorizado para eliminar esta receta",
      });
    }

    await recipe.deleteOne();
    res.status(200).json({ success: true, message: "Receta eliminada" });
  } catch (error) {
    console.log("Error al eliminar la receta:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}
