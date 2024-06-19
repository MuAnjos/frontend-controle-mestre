import { Category } from "@/@types/interfaces/Category";
import { getCategories } from "@/service/productsHttp";
import { ChangeEvent, useEffect, useState } from "react";

export function CategoriesDropdown({
  productCategory,
}: {
  productCategory: Category;
}) {
  const [selectedValue, setSelectedValue] = useState(productCategory.id);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    async function fetchCategories() {
      const categories = await getCategories();
      setCategories(categories);
    }
    fetchCategories();
  }, []);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedValue(+e.currentTarget.value);
  }
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
        onChange={handleChange}
        value={selectedValue}
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
