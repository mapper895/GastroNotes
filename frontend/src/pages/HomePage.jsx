import React, { useEffect, useRef, useState } from "react";
import { useRecipeStore } from "../store/recipeStore";
import SidebarContent from "../components/Sidebar";
import {
  CircleUserRound,
  X,
  ChevronLeft,
  ChevronRight,
  Loader,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";

const HomePage = ({ user }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // móvil
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // desktop
  const { recipes, fetchRecipes, loading } = useRecipeStore();
  const [navbarOpacity, setNavbarOpacity] = useState(1);
  const mainContainerRef = useRef(null);

  // Detectar tamaño de pantalla
  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  // Scroll listener para cambiar opacidad del navbar
  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = (e) => {
      const currentScroll = isMobile
        ? mainContainerRef.current.scrollTop
        : window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 50) {
        setNavbarOpacity(0.6); // scroll hacia abajo
      } else {
        setNavbarOpacity(1); // scroll hacia arriba
      }
      lastScroll = currentScroll;
    };

    const container = isMobile ? mainContainerRef.current : window;
    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <div className="flex items-center justify-center relative">
      {/* ===== SIDEBAR DESKTOP ===== */}
      {!isMobile && (
        <div
          className={`fixed left-0 top-0 h-screen border-r border-primary bg-white flex flex-col justify-between transition-all duration-300
    ${isSidebarCollapsed ? "w-[80px]" : "w-[350px]"}`}
        >
          {/* BOTÓN COLAPSAR */}
          <div className="absolute top-1/2 right-[-15px] bg-white border border-primary rounded-full p-1 cursor-pointer z-20">
            {isSidebarCollapsed ? (
              <ChevronRight
                className="text-primary"
                onClick={() => setIsSidebarCollapsed(false)}
              />
            ) : (
              <ChevronLeft
                className="text-primary"
                onClick={() => setIsSidebarCollapsed(true)}
              />
            )}
          </div>

          {/* CONTENIDO SIDEBAR */}
          <SidebarContent collapsed={isSidebarCollapsed} />
        </div>
      )}

      {/* ===== SIDEBAR MOBILE ===== */}
      {isMobile && (
        <>
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black opacity-40 z-40"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}

          <div
            className={`fixed top-0 left-0 h-full w-[80%] max-w-[300px] bg-white border-r border-primary z-50 transform transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-4 border-b border-primary">
              <div className="flex gap-2 text-base items-center">
                <CircleUserRound /> <span>Hola username123!</span>
              </div>
              <X
                className="cursor-pointer text-primary"
                onClick={() => setIsSidebarOpen(false)}
              />
            </div>
            <div className="overflow-y-auto h-[calc(100%-60px)]">
              <SidebarContent collapsed={false} />
            </div>
          </div>
        </>
      )}

      {/* ===== MAIN CONTENT ===== */}
      <div
        ref={mainContainerRef}
        id="main-container"
        className={`w-full flex flex-col items-center gap-8 pb-10 min-h-screen transition-all duration-300
  ${!isMobile ? (isSidebarCollapsed ? "ml-[80px]" : "ml-[350px]") : ""}`}
      >
        {/* NAVBAR STICKY */}
        <div
          className="w-full sticky top-0 z-10 transition-opacity duration-300"
          style={{ opacity: navbarOpacity }}
        >
          <Navbar
            isMobile={isMobile}
            setIsSidebarOpen={setIsSidebarOpen}
            user={user}
          />
        </div>

        {/* HOME FILTER */}
        <Filters />

        {/* RECIPES CONTAINER */}
        {loading ? (
          <div className="w-full h-full">
            <div className="flex justify-center items-center bg-white h-full">
              <Loader className="animate-spin text-primary size-10" />
            </div>
          </div>
        ) : recipes.length === 0 ? (
          <p className="text-center text-gray-500">
            No hay recetas disponibles.
          </p>
        ) : (
          <div className="grid w-full 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-5 gap-5">
            {recipes.map((recipe, index) => (
              <div
                key={index}
                className=" h-[250px] flex flex-col gap-2 border border-primary rounded-4xl overflow-hidden"
              >
                <img
                  src={recipe.image === "" ? "/recipe_alt.jpg" : recipe.image}
                  alt="recipe-image"
                  className="w-full h-[150px] object-cover object-center"
                />
                <div className="flex flex-col justify-center px-2">
                  <h2 className="font-semibold text-xl text-center">
                    {recipe.title}
                  </h2>
                  <p className="text-sm opacity-60">{recipe.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
