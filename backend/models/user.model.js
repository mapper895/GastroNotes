import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: "" },
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  likedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

export const User = mongoose.model("User", userSchema);
