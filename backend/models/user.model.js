import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  image: { type: String, default: "" },
  likedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

userSchema.index(
  { email: 1 },
  { unique: true, collation: { locale: "es", strength: 2 } }
);
userSchema.index(
  { username: 1 },
  { unique: true, collation: { locale: "es", strength: 2 } }
);

export const User = mongoose.model("User", userSchema);
