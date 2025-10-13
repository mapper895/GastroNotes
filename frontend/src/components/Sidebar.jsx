import React from "react";
import { useAuthStore } from "../store/authUser";
import {
  Album,
  Book,
  BookPlus,
  File,
  Folder,
  FolderOpen,
  FolderPlus,
} from "lucide-react";

const Sidebar = ({ collapsed }) => {
  const { logout } = useAuthStore();

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* FOLDER ORGANIZATION */}
        <div className="flex flex-col gap-5 p-5 border-b border-primary">
          <div className="flex flex-col gap-2">
            <SidebarItem
              icon={<FolderOpen className="text-secondary" />}
              text="Folder 1"
              collapsed={collapsed}
            />
            <div
              className={`flex flex-col gap-3 ${
                collapsed ? "hidden" : "pl-10"
              }`}
            >
              <SidebarItem
                icon={<File />}
                text="Receta 1"
                collapsed={collapsed}
              />
              <SidebarItem
                icon={<File />}
                text="Receta 2"
                collapsed={collapsed}
              />
              <SidebarItem
                icon={<File />}
                text="Receta 3"
                collapsed={collapsed}
              />
              <SidebarItem
                icon={<File />}
                text="Receta 4"
                collapsed={collapsed}
              />
            </div>
          </div>

          <SidebarItem
            icon={<Folder />}
            text="Folder 2"
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<Folder />}
            text="Folder 3"
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<FolderPlus />}
            text="Nuevo Folder"
            collapsed={collapsed}
          />
        </div>

        {/* CATEGORY ORGANIZATION */}
        <div className="flex flex-col gap-5 p-5">
          <SidebarItem
            icon={<Album />}
            text="Categorías"
            collapsed={collapsed}
          />
          <div
            className={`flex flex-col gap-3 ${collapsed ? "hidden" : "pl-10"}`}
          >
            <SidebarItem
              icon={<Book />}
              text="Categoría 1"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Book />}
              text="Categoría 2"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Book />}
              text="Categoría 3"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<BookPlus />}
              text="Nueva Categoría"
              collapsed={collapsed}
            />
          </div>
        </div>
      </div>

      {/* USER ACTIONS */}
      {!collapsed && (
        <div className="flex flex-col gap-5 items-center py-4">
          <p>Tienes creadas 60 recetas</p>
          <p className="text-secondary cursor-pointer" onClick={logout}>
            Cerrar sesión
          </p>
        </div>
      )}
    </div>
  );
};

const SidebarItem = ({ icon, text, collapsed }) => (
  <div
    className={`flex items-center gap-2 cursor-pointer hover:text-secondary transition ${
      collapsed ? "justify-center" : ""
    }`}
  >
    {icon}
    {!collapsed && <p>{text}</p>}
  </div>
);

export default Sidebar;
