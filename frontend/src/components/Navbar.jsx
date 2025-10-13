import { CircleUserRound, Menu, Search } from "lucide-react";
import React from "react";

const Navbar = ({ isMobile, setIsSidebarOpen, user }) => {
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
        <div className="flex items-center justify-start gap-2 p-3 border border-white rounded-xl md:w-[300px] w-1/2">
          <Search />
          <p>Buscar...</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
