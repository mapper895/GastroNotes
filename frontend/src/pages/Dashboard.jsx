import { useEffect } from "react";
import { useRecipeStore } from "../store/recipeStore";
import { useAuthStore } from "../store/authUser";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const { recipes, fetchRecipes, loading } = useRecipeStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchRecipes();
    }
  }, [user, fetchRecipes, navigate]);

  if (loading) return <p className="p-4">Cargando recetas...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bienvenido, {user?.username}</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="mb-6">
        <Link
          to="/create-recipe"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Nueva receta
        </Link>
      </div>

      <h2 className="text-xl font-semibold mb-4">Mis recetas</h2>
      {recipes.length === 0 ? (
        <p>No tienes recetas aún</p>
      ) : (
        <div className="space-y-3">
          {recipes.map((r) => (
            <div key={r._id} className="p-4 border rounded shadow-sm bg-white">
              <h3 className="font-bold text-lg">{r.title}</h3>
              <p className="text-gray-600">{r.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
