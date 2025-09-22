import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

categorySchema.index(
  { name: 1, user: 1 },
  { unique: true, collation: { locale: "es", strength: 2 } }
);

export const Category = mongoose.model("Category", categorySchema);
