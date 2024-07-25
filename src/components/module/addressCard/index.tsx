import { Endereco } from '@/@types/interfaces/Endereco';
import React from 'react';

export function AddressCard({ endereco, onClick }: { endereco: Endereco | undefined, onClick: () => void }) {
    return (
        <div className="bg-slate-100 w-2/5 px-4 py-4 flex gap-4 justify-between items-center rounded-lg">
            {endereco ? (
                <>
                    <div className="font-semibold">
                        <p className="text-sm">{endereco.rua} - n°{endereco.numero}</p>
                        <p className="text-xs">{endereco.bairro} - {endereco.cidade}</p>
                    </div>
                    <button onClick={onClick} type="button" className="hover:text-orange-600 font-bold text-sm">
                        Editar
                    </button>
                </>
            ) : (
                <>
                    <p className="text-slate-500 text-sm font-semibold">Nenhum Endereço Cadastrado</p>
                    <button onClick={onClick} type="button" className="hover:text-orange-600 font-bold text-sm">
                        Cadastrar
                    </button>
                </>
            )}
        </div>
    );
}