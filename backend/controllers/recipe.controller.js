import { User } from "../models/user.model.js";
import { Recipe } from "../models/recipe.model.js";

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
