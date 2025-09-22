import { Category } from "../models/category.model.js";

// Crear una nueva categoria
export async function createCategory(req, res) {
  try {
    const { name } = req.body;
    const userId = req.user?._id;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "El nombre de la categoria es requerido",
      });
    }

    const category = await Category.create({ name, user: userId });
    res.status(201).json({ success: true, category });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "La categoria ya existe" });
    }
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}

// Listar categorias del usuario
export async function getCategories(req, res) {
  try {
    const userId = req.user?._id;
    const categories = await Category.find({ user: userId }).sort("name");
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}

// Editar categoria
export async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user?._id;

    const category = await Category.findOneAndUpdate(
      { _id: id, user: userId },
      { name },
      { new: true }
    );
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Categoria no encontrada" });
    }

    res.json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}

// Eliminar categoria
export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const category = await Category.findOneAndDelete({ _id: id, user: userId });
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Categoria no encontrada" });
    }

    res.json({ success: true, message: "Categoria eliminada" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}
