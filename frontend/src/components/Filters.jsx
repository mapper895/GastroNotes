import { CirclePlus } from "lucide-react";
import { useRecipeStore } from "../store/recipeStore";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Filters = () => {
  const { fetchRecipes } = useRecipeStore();
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const filters = {};
    if (activeFilter === "favorites") filters.favorite = true;
    fetchRecipes(filters);
  }, [activeFilter, fetchRecipes]);

  return (
    <div className="w-full flex md:flex-row md:justify-between md:px-5 flex-col items-center justify-center gap-5">
      <div className="flex items-center justify-center gap-5">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-5 py-2 border  rounded-xl transition ${
            activeFilter === "all"
              ? "border-secondary bg-secondary text-white"
              : "border-primary text-primary hover:bg-primary hover:text-white"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setActiveFilter("favorites")}
          className={`px-5 py-2 border rounded-xl transition ${
            activeFilter === "favorites"
              ? "border-secondary bg-secondary text-white"
              : "border-primary text-primary hover:bg-primary hover:text-white"
          }`}
        >
          Favoritos
        </button>
      </div>
      <Link
        to={"/create-recipe"}
        className="group flex items-center justify-center gap-2 px-5 py-2 border border-secondary rounded-xl cursor-pointer hover:bg-secondary hover:text-white transition"
      >
        <CirclePlus className="text-secondary group-hover:text-white transition" />
        <p>Nueva Receta</p>
      </Link>
    </div>
  );
};

export default Filters;
