import { Category } from "@/@types/interfaces/Category";
import { getCategories } from "@/service/productsHttp";
import React, { useEffect, useState } from "react";

interface CategoriesDropdownProps extends React.HTMLProps<HTMLSelectElement> {
  register?: any;
  productCategory?: Category;
  update?: boolean
}

export function CategoriesDropdown({
  register,
  productCategory,
  update,
  ...props
}: CategoriesDropdownProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    async function fetchCategories() {
      const categories = await getCategories();
      setCategories(categories);
    }
    fetchCategories();
  }, []);

  return (
    <div className="bg-white w-1/2 rounded-lg p-2">
      <label
        htmlFor="opcoes"
        className="block text-sm text-gray-500 font-semibold ml-1"
      >
        Categoria
      </label>
      {categories.length > 0 && <select
        name="categoriaId"
        id="opcoes"
        className="text-lg font-bold outline-none w-full"
        {...props}
        {...register("categoriaId")}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.nome}
          </option>
        ))}
      </select>}
    </div>
  );
}
