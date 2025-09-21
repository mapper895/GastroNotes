import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String, default: "" },
    ingredients: [{ type: String }],
    instructions: [{ type: String }],
    categories: [{ type: String }],
    rating: { type: Number, default: 0 },
    isFavorite: { type: Boolean, default: false },
    utensils: [{ type: String }],
    time: { type: Number, default: 0 },
    servings: { type: Number, default: 1 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
