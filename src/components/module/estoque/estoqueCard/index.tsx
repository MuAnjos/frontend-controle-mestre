import React from 'react'
import LapisLogo from '../../../../../public/svg/LapisLogo';
import { LixeiraLogo } from '../../../../../public/svg/LixeiraLogo';
import { Estoque } from '@/@types/interfaces/Estoque';

export function EstoqueCard({
    estoque,
    onDeleteClick,
    onUpdateClick,
}: {
    estoque: Estoque;
    onUpdateClick: (estoque: Estoque) => void;
    onDeleteClick: () => void;
}) {
    return (
        <div className="flex items-center justify-center mb-4 drop-shadow-lg">
            <div className="flex justify-between w-full p-3.5 bg-white rounded-l-lg text-[#797979]">
                <div>
                    <p>
                        Nome: <span className="text-black">{estoque.nome}</span>
                    </p>
                    <p>
                        Produto: <span className="text-black">{estoque.produto.nome}</span>
                    </p>
                </div>
                <div className="text-end">
                    <p>
                        Quantidade: <span className="text-black lowercase">
                            {estoque.quantidade}
                        </span>
                    </p>
                </div>
            </div>
            <div>
                <button
                    className="flex w-full px-8 py-1 text-sm bg-red-600 rounded-tr-lg h-1/2 hover:bg-red-700"
                    onClick={onDeleteClick}
                >
                    <LixeiraLogo />
                </button>
                <button
                    className="flex w-full px-8 py-1 rounded-br-lg bg-slate-600 h-1/2 hover:bg-slate-700"
                    onClick={() => onUpdateClick(estoque)}
                >
                    <LapisLogo />
                </button>
            </div>
        </div>
    );
}
