import React from 'react'
import LapisLogo from '../../../../../public/svg/LapisLogo';
import { LixeiraLogo } from '../../../../../public/svg/LixeiraLogo';
import { Cliente } from '@/@types/interfaces/Cliente';
import { dateFormatter } from '@/util/formatter/dateFormatter';

export function ClienteCard({
    cliente,
    onDeleteClick,
    onUpdateClick,
}: {
    cliente: Cliente;
    onUpdateClick: (cliente: Cliente) => void;
    onDeleteClick: () => void;
}) {
    return (
        <div className="flex items-center justify-center mb-4 drop-shadow-lg">
            <div className="flex justify-between w-full p-3.5 bg-white rounded-l-lg text-[#797979]">
                <div>
                    <p>
                        Nome: <span className="text-black">{cliente.nome}</span>
                    </p>
                    <p>
                        Data De Nascimento: <span className="text-black">{dateFormatter(cliente.dataNascimento)}</span>
                    </p>
                </div>
                <div className="text-end">
                    <p>
                        CPF: <span className="text-black">{cliente.cpf}</span>
                    </p>
                    {cliente.endereco && <p>
                        Cidade: <span className="text-black">
                            {cliente.endereco.cidade}
                        </span>
                    </p>}
                    {!cliente.endereco && <p>
                        Sexo: <span className="text-black lowercase">
                            {cliente.sexo}
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
                    onClick={() => onUpdateClick(cliente)}
                >
                    <LapisLogo />
                </button>
            </div>
        </div>
    );
}
