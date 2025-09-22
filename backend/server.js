import express from "express";

import authRoutes from "./routes/auth.route.js";
import recipeRoutes from "./routes/recipe.route.js";
import folderRoutes from "./routes/folder.route.js";
import categoryRoutes from "./routes/category.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connetDB } from "./config/db.js";
import cookieParser from "cookie-parser";

const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/recipe", recipeRoutes);
app.use("/api/v1/folder", folderRoutes);
app.use("/api/v1/category", categoryRoutes);

app.listen(PORT, () => {
  console.log("Servidor listo en el puerto", PORT);
  connetDB();
});
