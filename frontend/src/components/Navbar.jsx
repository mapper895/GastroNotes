import { CircleUserRound, Menu, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRecipeStore } from "../store/recipeStore";

const Navbar = ({ isMobile, setIsSidebarOpen, user }) => {
  const { searchRecipes } = useRecipeStore();
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRecipes(search.trim());
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      const term = search.trim();
      if (term.length > 0) {
        searchRecipes(term);
      } else {
        searchRecipes(""); // si está vacío, traer todo
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <nav className="bg-primary w-full flex justify-center items-center p-5 text-white">
      <div className="w-full flex justify-between items-center">
        {isMobile ? (
          <Menu
            className="w-8 h-8 cursor-pointer"
            onClick={() => setIsSidebarOpen(true)}
          />
        ) : (
          <div className="flex gap-2 text-xl items-center">
            <CircleUserRound /> <span>Hola {user.username}!</span>
          </div>
        )}

        {/* Buscador */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-start gap-2 p-3 border border-white rounded-xl md:w-[300px] w-1/2"
        >
          <Search />
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none focus:border-none focus:ring-0"
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
