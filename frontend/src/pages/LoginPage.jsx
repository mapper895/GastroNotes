import React, { useState } from "react";
import { useAuthStore } from "../store/authUser";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLogginIn } = useAuthStore();
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
    await login(form);
    if (useAuthStore.getState().user) {
      navigate("/");
    }
  };

  return (
    <div className="flex md:flex-row h-screen flex-col">
      {/* LOGIN FORM */}
      <div className="md:flex-1 md:order-1 order-2 flex-2/3 justify-between items-center flex flex-col p-5">
        {/* LOGIN NAVBAR */}
        <div className="w-full justify-between items-center px-5 hidden md:flex">
          {/* logo */}
          <div className="flex items-center gap-2">
            <img className="w-24" src="./gastronote_logo.png" alt="logo" />
            <h1 className="font-header font-semibold text-secondary text-2xl">
              GastroNotes
            </h1>
          </div>
          <Link
            to={"/register"}
            className="text-primary uppercase font-semibold text-xl"
          >
            Regístrate
          </Link>
        </div>
        {/* Formulario */}
        <div className="flex flex-col justify-between items-center md:w-md w-full md:gap-10 gap-5">
          <form className="w-full" onSubmit={handleSubmit}>
            {/* Input Text */}
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-base md:text-xl">¡Bienvenido de vuelta!</p>
              <h1 className="text-primary text-2xl md:text-3xl">
                Inicia sesión en tu cuenta
              </h1>
            </div>
            {/* Email Input */}
            <div className="flex flex-col gap-4 max-w-md mx-auto mt-8">
              <label htmlFor="email" className="text-primary">
                Email
              </label>
              <input
                type="email"
                className="border-b border-primary px-2 py-1 text-sm md:text-base focus:border-primary outline-none"
                name="email"
                placeholder="hello@gastronote.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            {/* Password Input */}
            <div className="relative flex flex-col gap-4 max-w-md mx-auto mt-8">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-primary">
                  Contraseña
                </label>
                <Link className="opacity-40 text-xs md:text-sm">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <input
                type={showPassword ? "text" : "password"}
                className="border-b border-primary px-2 py-1 text-sm md:text-base focus:border-primary outline-none"
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
              disabled={isLogginIn}
              className="bg-primary text-white px-4 py-2 rounded-2xl hover:opacity-60 cursor-pointer mt-10 w-1/2 mx-auto block"
            >
              {isLogginIn ? "Ingresando..." : "Iniciar sesión"}
            </button>
          </form>
          <Link
            to={"/register"}
            className="block text-center mt-4 text-sm md:text-base"
          >
            ¿Todavía no tienes cuenta?{" "}
            <span className="text-primary hover:opacity-60">Regístrate</span>
          </Link>
        </div>
        <Link className="opacity-60 text-xs md:text-base">
          Términos & condiciones
        </Link>
      </div>
      {/* LOGIN IMAGE */}
      <div className="h-1/3 md:h-auto relative md:flex-1 md:order-2 order-1 rounded-b-3xl md:rounded-none overflow-hidden">
        <img
          className="w-full h-full object-cover object-center"
          src="./login.jpg"
          alt="login-photo"
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

export default LoginPage;
