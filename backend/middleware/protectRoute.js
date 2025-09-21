import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import { User } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req?.cookies["jwt-gastronotes"];

    if (!token) {
      return res.status(401).json({ success: false, message: "No autorizado" });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ success: false, message: "No autorizado" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error en protectRoute:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};
