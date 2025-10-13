import { useState } from "react";
import { useRecipeStore } from "../store/recipeStore";
import { useNavigate } from "react-router-dom";

function CreateRecipePage() {
  const { createRecipe } = useRecipeStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    time: "",
    servings: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // convertir cadenas en arrays
    const payload = {
      ...form,
      ingredients: form.ingredients.split(",").map((i) => i.trim()),
      instructions: form.instructions.split("\n").map((i) => i.trim()),
      time: Number(form.time),
      servings: Number(form.servings),
    };

    await createRecipe(payload);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Crear nueva receta
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="text"
          name="ingredients"
          placeholder="Ingredientes (separados por coma)"
          value={form.ingredients}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <textarea
          name="instructions"
          placeholder="Instrucciones (una por línea)"
          value={form.instructions}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="number"
          name="time"
          placeholder="Tiempo en minutos"
          value={form.time}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="number"
          name="servings"
          placeholder="Porciones"
          value={form.servings}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Guardar receta
        </button>
      </form>
    </div>
  );
}

export default CreateRecipePage;
