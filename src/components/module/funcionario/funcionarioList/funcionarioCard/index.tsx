import React from 'react'
import LapisLogo from '../../../../../../public/svg/LapisLogo';
import { LixeiraLogo } from '../../../../../../public/svg/LixeiraLogo';
import { Funcionario } from '@/@types/interfaces/Funcionario';

export function FuncionarioCard({
    funcionario,
    onDeleteClick,
    onUpdateClick,
}: {
    funcionario: Funcionario;
    onUpdateClick: (funcionario: Funcionario) => void;
    onDeleteClick: () => void;
}) {
    return (
        <div className="flex items-center justify-center mb-4 drop-shadow-lg">
            <div className="flex justify-between w-full p-3.5 bg-white rounded-l-lg text-[#797979]">
                <div>
                    <p>
                        Nome: <span className="text-black">{funcionario.nome}</span>
                    </p>
                    <p>
                        Cargo: <span className="text-black capitalize">{funcionario.cargo.toLowerCase()}</span>
                    </p>
                </div>
                <div className="text-end">
                    <p>
                        CPF: <span className="text-black">{funcionario.cpf}</span>
                    </p>
                    {funcionario.endereco && <p>
                        Cidade: <span className="text-black">
                            {funcionario.endereco.cidade}
                        </span>
                    </p>}
                    {!funcionario.endereco && <p>
                        Telefone: <span className="text-black lowercase">
                            {funcionario.telefone}
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
                    onClick={() => onUpdateClick(funcionario)}
                >
                    <LapisLogo />
                </button>
            </div>
        </div>
    );
}
