import { CirclePlus } from "lucide-react";
import React from "react";

const Filters = () => {
  return (
    <div className="w-full flex md:flex-row md:justify-between md:px-5 flex-col items-center justify-center gap-5">
      <div className="flex items-center justify-center gap-10">
        <div className="px-5 py-2 border border-primary rounded-xl">Todos</div>
        <div className="px-5 py-2 border border-primary rounded-xl">
          Favoritos
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 px-5 py-2 border border-secondary rounded-xl">
        <CirclePlus className="text-secondary" />
        <p>Nueva Receta</p>
      </div>
    </div>
  );
};

export default Filters;
