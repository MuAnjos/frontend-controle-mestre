import React, { useState } from 'react'
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/service/categoriesHttp';
import { FilterOption } from './filterOption';
import { Category } from '@/@types/interfaces/Category';

interface CategoryFilterProps {
    selected: Category | undefined;
    onClick: (category: Category) => void;
}

export function CategoryFilter({ selected, onClick }: CategoryFilterProps) {
    const [showDropdown, setShowDropdown] = useState(false);
    const { data: categories } = useQuery<Category[]>({
        queryFn: getCategories,
        initialData: [],
        queryKey: ["categories"]
    });
    return (
        <div onClick={() => setShowDropdown(prev => !prev)} className="w-full relative my-2">
            <button className="absolute right-0 text-lg font-bold flex flex-row items-center">
                <span>
                    Categorias
                </span>
                <CaretDown
                    size={24}
                    className={`${showDropdown ? "rotate-180" : "rotate-0"} transition-[250ms] ease-in-out`}
                />
            </button>
            {showDropdown && (
                <div className="absolute  z-10 flex flex-col items-start gap-3 p-4 mt-1 bg-white rounded-lg shadow-2xl w-max min-w-[12rem] max-h-52 overflow-scroll right-0 top-7">
                    {categories.map((category) => (
                        <FilterOption
                            key={category.id}
                            label={category.nome}
                            value={String(category.id!)}
                            checked={selected?.id == category.id}
                            onClick={() => onClick(category)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
