import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authUser";
import { useCategoryStore } from "../store/categoryStore";
import { useFolderStore } from "../store/folderStore";
import { useRecipeStore } from "../store/recipeStore";
import {
  Album,
  Book,
  BookPlus,
  File,
  Folder as FolderIcon,
  FolderOpen,
  FolderPlus,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ collapsed }) => {
  const { logout } = useAuthStore();
  const {
    folders,
    fetchFolders,
    getFolderWithRecipes,
    selectedFolder,
    folderRecipes,
    clearSelectedFolder,
    loading,
  } = useFolderStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { filters, setCategoryFilter } = useRecipeStore();

  const [categoriesOpen, setCategoriesOpen] = useState(true);

  useEffect(() => {
    fetchFolders();
    fetchCategories();
  }, []);

  const toggleFolder = async (folderId) => {
    if (selectedFolder?._id === folderId) {
      clearSelectedFolder();
      return;
    }
    await getFolderWithRecipes(folderId);
  };

  const toggleCategories = () => {
    setCategoriesOpen((prev) => !prev);
  };

  return (
    <aside className="flex flex-col justify-between h-full">
      <div>
        {!collapsed ? (
          <Link to={"/"} className="flex w-full justify-center items-center">
            <img className="w-20" src="./gastronote_logo.png" alt="logo" />
            <h1 className="font-header font-semibold text-secondary text-xl">
              GastroNotes
            </h1>
          </Link>
        ) : (
          <Link className="flex items-center justify-center">
            <img className="w-16" src="./gastronote_logo.png" alt="logo" />
          </Link>
        )}

        {/* === FOLDERS === */}
        <div className="flex flex-col gap-5 p-5 border-b border-primary">
          {folders.map((folder) => {
            const isOpen = selectedFolder?._id === folder._id;
            return (
              <div key={folder._id}>
                {/* Carpeta principal */}
                <div
                  onClick={() => toggleFolder(folder._id)}
                  className={`group flex items-center gap-2 cursor-pointer transition ${
                    collapsed ? "justify-center" : ""
                  } ${
                    isOpen
                      ? "text-secondary"
                      : "text-black hover:text-secondary"
                  }`}
                >
                  {isOpen ? (
                    <FolderOpen
                      className={`transition-colors ${
                        isOpen
                          ? "text-secondary"
                          : "text-black group-hover:text-secondary"
                      }`}
                    />
                  ) : (
                    <FolderIcon
                      className={`transition-colors ${
                        isOpen
                          ? "text-secondary"
                          : "text-black group-hover:text-secondary"
                      }`}
                    />
                  )}
                  {!collapsed && <p>{folder.name}</p>}
                </div>

                {/* Recetas dentro del folder */}
                {isOpen && !collapsed && (
                  <div className="flex flex-col gap-2 pl-8 mt-2">
                    {loading ? (
                      <p className="text-sm italic text-gray-400">
                        Cargando...
                      </p>
                    ) : folderRecipes.length > 0 ? (
                      folderRecipes.map((recipe) => (
                        <SidebarItem
                          key={recipe._id}
                          icon={<File size={20} />}
                          text={recipe.title}
                        />
                      ))
                    ) : (
                      <p className="text-sm italic text-gray-400">
                        No hay recetas
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Botón nueva carpeta */}
          <SidebarItem
            icon={<FolderPlus className="text-secondary" />}
            text="Nueva Carpeta"
            collapsed={collapsed}
          />
        </div>

        {/* === CATEGORIES === */}
        <div className="flex flex-col gap-5 p-5">
          <div
            onClick={toggleCategories}
            className={`group flex items-center gap-2 cursor-pointer transition ${
              collapsed ? "justify-center" : ""
            } ${
              categoriesOpen
                ? "text-secondary"
                : "text-black hover:text-secondary"
            }`}
          >
            <Album
              className={`transition-colors ${
                categoriesOpen
                  ? "text-secondary"
                  : "text-black group-hover:text-secondary"
              }`}
            />
            {!collapsed && <p>Categorías</p>}
          </div>

          {categoriesOpen && !collapsed && (
            <div className="flex flex-col gap-3 pl-8">
              {categories.map((category) => (
                <div
                  key={category._id}
                  onClick={() => setCategoryFilter(category._id)}
                  className={`group flex items-center gap-2 cursor-pointer transition ${
                    filters.categoryIds === category._id
                      ? "text-secondary"
                      : "hover:text-secondary"
                  }`}
                >
                  <Book
                    size={20}
                    className={`transition-colors ${
                      filters.categoryIds === category._id
                        ? "text-secondary"
                        : "text-black group-hover:text-secondary"
                    }`}
                  />
                  <p>{category.name}</p>
                </div>
              ))}
              <SidebarItem
                icon={<BookPlus size={20} className="text-secondary" />}
                text="Nueva Categoría"
              />
            </div>
          )}
        </div>
      </div>

      {/* === USER ACTIONS === */}
      {!collapsed && (
        <div className="flex flex-col gap-5 items-center py-4">
          <p>Tienes creadas 60 recetas</p>
          <p className="text-secondary cursor-pointer" onClick={logout}>
            Cerrar sesión
          </p>
        </div>
      )}
    </aside>
  );
};

const SidebarItem = ({ icon, text, collapsed }) => (
  <div
    className={`group flex items-center gap-2 cursor-pointer hover:text-secondary transition ${
      collapsed ? "justify-center" : ""
    }`}
  >
    <span className="group-hover:text-secondary">{icon}</span>
    {!collapsed && <p>{text}</p>}
  </div>
);

export default Sidebar;
