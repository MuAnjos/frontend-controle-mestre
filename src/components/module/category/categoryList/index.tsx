import { SearchBar } from "../../searchBar";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CategoryCard } from "../categoryCard";
import { Category } from "@/@types/interfaces/Category";
import { getCategories } from "@/service/categoriesHttp";

interface CategoryListProps {
    onAddClick: () => void;
    onDeleteClick: (category: Category) => void;
    onUpdateClick: (category: Category) => void;
}

export function CategoryList({
    onAddClick,
    onDeleteClick,
    onUpdateClick
}: CategoryListProps) {
    const [search, setSearch] = useState("");
    const { data: categories } = useQuery<Category[]>({
        queryFn: () => getCategories(),
        initialData: [],
        queryKey: ["categories"],
    });

    const filteredCategories = categories?.filter((product) =>
        product.nome.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="py-8">
            <div className="w-full flex justify-between">
                <button className="px-8 py-2 text-xl font-semibold text-white bg-orange-500 rounded-xl hover:bg-orange-600" onClick={onAddClick}>
                    Adicionar
                </button>
                <SearchBar onChange={(e) => setSearch(e.currentTarget.value)} className="w-2/3" />
            </div>
            <div className="mt-4 overflow-y-scroll max-h-[300px] no-scrollbar">
                {search.length > 0 && filteredCategories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        onDeleteClick={() => onDeleteClick(category)}
                        onUpdateClick={() => onUpdateClick(category)}
                        category={category}
                    />
                ))}
                {search.length === 0 && categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        onDeleteClick={() => onDeleteClick(category)}
                        onUpdateClick={() => onUpdateClick(category)}
                        category={category}
                    />
                ))}
            </div>
        </div>
    );
}
