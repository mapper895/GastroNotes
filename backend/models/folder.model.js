import mongoose from "mongoose";

const folderSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

folderSchema.index(
  { name: 1, user: 1 },
  { unique: true, collation: { locale: "es", strength: 2 } }
);

export const Folder = mongoose.model("Folder", folderSchema);
