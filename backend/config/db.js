import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connetDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("MongoDB connected: ", conn.connection.host);
  } catch (error) {
    console.log("Error en la conexion con MongoDB: " + error.message);
    process.exit(1);
  }
};
