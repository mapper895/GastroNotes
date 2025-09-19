import express from "express";

import authRoutes from "./routes/auth.route.js";

const app = express();

app.use("/api/v1/auth", authRoutes);

app.listen(5000, () => {
  console.log("Servidor listo en el puerto 5000");
});
