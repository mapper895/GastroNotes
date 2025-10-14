import { CircleUserRound, Menu, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRecipeStore } from "../store/recipeStore";

const Navbar = ({ isMobile, setIsSidebarOpen, user }) => {
  const { fetchRecipes } = useRecipeStore();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes({ search });
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.trim().length > 0) {
        fetchRecipes({ search });
      } else {
        fetchRecipes(); // si está vacío, traer todo
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
          onSubmit={handleSearch}
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
