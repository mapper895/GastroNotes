import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { Eye, EyeOff } from "lucide-react";

const SignupPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMouseDown = () => {
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(form);
    if (useAuthStore.getState().user) {
      navigate("/");
    }
  };

  return (
    <div className="flex md:flex-row h-screen flex-col">
      {/* Signup Form */}
      <div className="md:flex-1 md:order-1 order-2 flex-2/3 justify-between items-center flex flex-col p-5">
        {/* Signup Navbar */}
        <div className="w-full justify-between items-center px-5 hidden md:flex">
          {/* logo */}
          <div className="flex items-center gap-2">
            <img className="w-24" src="./gastronote_logo.png" alt="logo" />
            <h1 className="font-header font-semibold text-secondary text-2xl">
              GastroNotes
            </h1>
          </div>
          <Link
            to={"/login"}
            className="text-primary uppercase font-semibold text-xl"
          >
            Inicia Sesión
          </Link>
        </div>
        {/* Form */}
        <div className="flex flex-col justify-between items-center md:w-md w-full md:gap-10 gap-5">
          <form className="w-full" onSubmit={handleSubmit}>
            {/* Input Text */}
            <div className="flex flex-col items-center md:gap-4 text-center">
              <p className="text-base md:text-xl">¿Nuevo por aquí?</p>
              <h1 className="text-primary text-2xl md:text-3xl">
                Crea tu cuenta
              </h1>
            </div>
            {/* Username Input */}
            <div className="flex flex-col md:gap-4 max-w-md mx-auto mt-4">
              <label htmlFor="username" className="text-primary">
                Nombre de usuario
              </label>
              <input
                type="text"
                className="border-b border-primary px-2 py-1 text-sm md:text-base outline-none"
                name="username"
                placeholder="Username123"
                value={form.username}
                onChange={handleChange}
              />
            </div>
            {/* Email Input */}
            <div className="flex flex-col md:gap-4 max-w-md mx-auto mt-8">
              <label htmlFor="email" className="text-primary">
                Email
              </label>
              <input
                type="email"
                className="border-b border-primary px-2 py-1 text-sm md:text-base outline-none"
                name="email"
                placeholder="hello@gastronotes.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            {/* Password Input */}
            <div className="relative flex flex-col md:gap-4 max-w-md mx-auto mt-8">
              <label htmlFor="password" className="text-primary">
                Contraseña
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="border-b border-primary px-2 py-1 text-sm md:text-base outline-none"
                name="password"
                placeholder="******"
                value={form.password}
                onChange={handleChange}
              />
              {/* Icono para mostrar/ocultar contraseña */}
              <span
                onMouseDown={handleMouseDown} // Mostrar contraseña al presionar el mouse
                onMouseUp={handleMouseUp} // Ocultar la contraseña al soltar el mouse
                className="absolute bottom-2 right-2 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            <button
              type="submit"
              disabled={isSigningUp}
              className="bg-primary text-white px-4 py-2 rounded-2xl hover:opacity-60 cursor-pointer mt-10 w-1/2 mx-auto block"
            >
              {isSigningUp ? "Creando cuenta" : "Crear cuenta"}
            </button>
          </form>
        </div>
        <Link to={"/login"}>
          ¿Ya tienes cuenta?{" "}
          <span className="text-primary hover:opacity-60">Inicia Sesión</span>
        </Link>
        <Link className="opacity-60 text-xs md:text-base">
          Términos & Condiciones
        </Link>
      </div>
      {/* Signup image */}
      <div className="h-1/3 md:h-auto relative md:flex-1 md:order-2 order-1 rounded-b-3xl overflow-hidden">
        <img
          className="w-full h-full object-cover object-center"
          src="./signup.jpg"
          alt="register-photo"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute inset-0 flex justify-center items-end md:hidden">
          <div className="flex items-center gap-2">
            <img className="w-24" src="./gastronote_logo.png" alt="logo" />

            <h1 className="font-header font-semibold text-secondary text-2xl">
              GastroNotes
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
