import React from 'react'
import LapisLogo from '../../../../../public/svg/LapisLogo'
import { LixeiraLogo } from '../../../../../public/svg/LixeiraLogo'
import { Category } from '@/@types/interfaces/Category';

interface CategoryCard {
    category: Category;
    onDeleteClick: (category: Category) => void;
    onUpdateClick: (category: Category) => void;
}

export function CategoryCard({ category, onDeleteClick, onUpdateClick }: CategoryCard) {
    return <div className="flex items-center justify-center mb-4 drop-shadow-lg">
        <div className="flex justify-between w-full p-3.5 bg-white rounded-l-lg text-[#797979]">
            <div>
                <p>
                    Categoria: <span className="text-black">{category.nome}</span>
                </p>
                <p>
                    ID: <span className="text-black">{category.id}</span>
                </p>
            </div>
        </div>
        <div>
            <button
                className="flex w-full px-8 py-1 text-sm bg-red-600 rounded-tr-lg h-1/2 hover:bg-red-700"
                onClick={() => onDeleteClick(category)}
            >
                <LixeiraLogo />
            </button>
            <button
                className="flex w-full px-8 py-1 rounded-br-lg bg-slate-600 h-1/2 hover:bg-slate-700"
                onClick={() => onUpdateClick(category)}
            >
                <LapisLogo />
            </button>
        </div>
    </div>
}
