import { CirclePlus } from "lucide-react";
import { useRecipeStore } from "../store/recipeStore";
import { Link } from "react-router-dom";
import React from "react";

const Filters = () => {
  const { filters, toggleFavoriteFilter, clearFilters } = useRecipeStore();

  return (
    <div className="w-full flex md:flex-row md:justify-between md:px-5 flex-col items-center justify-center gap-5">
      <div className="flex items-center justify-center gap-5">
        <button
          onClick={() => clearFilters()}
          className={`px-5 py-2 border  rounded-xl transition ${
            !filters.favorite && !filters.categoryIds
              ? "border-secondary bg-secondary text-white"
              : "border-primary text-primary hover:bg-primary hover:text-white"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => toggleFavoriteFilter()}
          className={`px-5 py-2 border rounded-xl transition ${
            filters.favorite
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
