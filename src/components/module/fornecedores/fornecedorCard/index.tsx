import React from 'react'
import LapisLogo from '../../../../../public/svg/LapisLogo';
import { LixeiraLogo } from '../../../../../public/svg/LixeiraLogo';
import { Fornecedor } from '@/@types/interfaces/Fornecedor';

export function FornecedorCard({
    fornecedor,
    onDeleteClick,
    onUpdateClick,
}: {
    fornecedor: Fornecedor;
    onUpdateClick: (Fornecedor: Fornecedor) => void;
    onDeleteClick: () => void;
}) {
    return (
        <div className="flex items-center justify-center mb-4 drop-shadow-lg">
            <div className="flex justify-between w-full p-3.5 bg-white rounded-l-lg text-[#797979]">
                <div>
                    <p>
                        Nome: <span className="text-black">{fornecedor.nome}</span>
                    </p>
                    <p>
                        Email: <span className="text-black">{fornecedor.email}</span>
                    </p>
                </div>
                <div className="text-end">
                    <p>
                        CNPJ: <span className="text-black">{fornecedor.cnpj}</span>
                    </p>
                    {fornecedor.endereco && <p>
                        Cidade: <span className="text-black">
                            {fornecedor.endereco.cidade}
                        </span>
                    </p>}
                    {!fornecedor.endereco && <p>
                        Telefone: <span className="text-black lowercase">
                            {fornecedor.telefone}
                        </span>
                    </p>}
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
                    onClick={() => onUpdateClick(fornecedor)}
                >
                    <LapisLogo />
                </button>
            </div>
        </div>
    );
}
