import { useState } from "react";
import { useAuthStore } from "../store/authUser";
import { useNavigate, Link } from "react-router-dom";

function SignupPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { signup, error, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(form);
    if (useAuthStore.getState().user) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <p className="mt-4 text-sm text-center">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
