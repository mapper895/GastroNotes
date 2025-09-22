import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String },
    image: { type: String, default: "" },
    ingredients: [{ type: String, trim: true }],
    instructions: [{ type: String, trim: true }],
    utensils: [{ type: String, trim: true }],
    time: { type: Number, min: 0 },
    servings: { type: Number, min: 1, default: 1 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    isFavorite: { type: Boolean, default: false, index: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
  },
  { timestamps: true }
);

recipeSchema.index(
  { title: "text", description: "text", ingredients: "text" },
  { weights: { title: 5, ingredients: 3, description: 1 } }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
