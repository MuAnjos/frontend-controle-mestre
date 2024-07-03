import { Category } from "@/@types/interfaces/Category";
import React from "react";

interface CategoriesDropdownProps extends React.HTMLProps<HTMLSelectElement> {
  productCategory?: Category;
  categories: Category[]
}

export function CategoriesDropdown({
  categories,
  productCategory,
  ...props
}: CategoriesDropdownProps) {
  return (
    <div className="bg-white w-1/2 rounded-lg p-2">
      <label
        htmlFor="opcoes"
        className="block text-sm text-gray-500 font-semibold ml-1"
      >
        Categoria
      </label>
      <select
        name="categoriaId"
        id="opcoes"
        className="text-lg font-bold outline-none w-full"
        {...props}

      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.nome}
          </option>
        ))}
      </select>
    </div>
  );
}
