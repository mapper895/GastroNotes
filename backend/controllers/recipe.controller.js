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
