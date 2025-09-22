import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "Todos los campos son requeridos" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "El correo no es válido" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "La contraseña debe tener más de 6 caracteres",
      });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "El correo ya está en uso" });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: "El nombre de usuario ya está en uso",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const PROFILE_PICS = [
      "/avatar1.png",
      "/avatar2.png",
      "/avatar3.png",
      "/avatar4.png",
    ];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image,
    });
    await newUser.save();

    generateTokenAndSetCookie(res, newUser._id);

    res.status(201).json({
      success: true,
      user: { ...newUser._doc, password: undefined },
      message: "Usuario creado exitosamente",
    });
  } catch (error) {
    if (error.code === 11000) {
      // E11000: duplicado en Mongo
      return res
        .status(400)
        .json({ success: false, message: "Correo o usuario ya está en uso" });
    }
    console.error("Error en signup:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Todos los campos son requeridos" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Credenciales inválidas" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Credenciales inválidas" });
    }

    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({
      success: true,
      user: { ...user._doc, password: "" },
      message: "Inicio de sesión exitoso",
    });
  } catch (error) {
    console.log("Error al iniciar sesión:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-gastronotes");
    res
      .status(200)
      .json({ success: true, message: "Cierre de sesión exitoso" });
  } catch (error) {
    console.log("Error in logout:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
}
